import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { PanelBody, TextControl, TextareaControl, TabPanel, RangeControl, ToggleControl, SelectControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import './style.css';

registerBlockType('emg/bs-wrapper', {
    edit({ attributes, setAttributes, clientId }) {
        const {
            className,
            customCSS,
            uniqueId,
            default: defaultSpacing,
            sm,
            md,
            lg,
            xl,
            xxl,
            wrapperAnimationEnabled,
            wrapperAnimationName,
            wrapperAnimationDuration,
            wrapperAnimationDelay
        } = attributes;

        const [activePaddingTab, setActivePaddingTab] = useState('default');

        // Generate unique ID based on clientId
        useEffect(() => {
            const generatedId = 'emg-bs-wrapper-' + clientId.replace(/[^a-zA-Z0-9]/g, '');
            if (uniqueId !== generatedId) {
                setAttributes({ uniqueId: generatedId });
            }
        }, [clientId, setAttributes]);

        // Add CSS for textarea min-height in inspector sidebar
        useEffect(() => {
            const styleId = 'bs-wrapper-textarea-style';
            
            // Remove existing style if any
            const existingStyle = document.getElementById(styleId);
            if (existingStyle) {
                existingStyle.remove();
            }
            
            // Create and inject style with multiple selectors
            const style = document.createElement('style');
            style.id = styleId;
            style.innerHTML = `
                .bs-wrapper-custom-css-wrapper textarea,
                .bs-wrapper-custom-css-wrapper .components-textarea-control__input,
                .interface-interface-skeleton__sidebar .bs-wrapper-custom-css-wrapper textarea,
                .edit-post-sidebar .bs-wrapper-custom-css-wrapper textarea,
                .block-editor-block-inspector .bs-wrapper-custom-css-wrapper textarea,
                .components-panel .bs-wrapper-custom-css-wrapper textarea,
                .interface-interface-skeleton__sidebar .components-textarea-control textarea,
                .edit-post-sidebar .components-textarea-control textarea {
                    min-height: 280px !important;
                    height: auto !important;
                }
            `;
            document.head.appendChild(style);
            
            // Also directly set min-height on textarea after a short delay to ensure DOM is ready
            const timer = setTimeout(() => {
                const textareas = document.querySelectorAll('.bs-wrapper-custom-css-wrapper textarea, .bs-wrapper-custom-css-wrapper .components-textarea-control__input');
                textareas.forEach(textarea => {
                    if (textarea && textarea.style) {
                        textarea.style.minHeight = '280px';
                        textarea.style.height = 'auto';
                    }
                });
            }, 100);
            
            // Cleanup on unmount
            return () => {
                clearTimeout(timer);
                const styleToRemove = document.getElementById(styleId);
                if (styleToRemove) {
                    styleToRemove.remove();
                }
            };
        }, [customCSS]); // Re-run when customCSS changes to catch newly rendered textarea

        // Helper function to get effective spacing value with cascading inheritance (copied from BS Row)
        const getEffectiveValue = (breakpoint, property) => {
            const breakpoints = { default: defaultSpacing, sm, md, lg, xl, xxl };
            const breakpointOrder = ['default', 'sm', 'md', 'lg', 'xl', 'xxl'];
            const currentIndex = breakpointOrder.indexOf(breakpoint);
            
            // Start from the current breakpoint and work backwards to find the first set value
            for (let i = currentIndex; i >= 0; i--) {
                const bp = breakpointOrder[i];
                const bpData = breakpoints[bp];
                if (bpData && bpData[property] !== undefined) {
                    return bpData[property];
                }
            }
            
            return 0;
        };

        // Parse nested CSS syntax (selector@property: value;)
        // Supports: wrapper CSS, selector CSS, hover states, and media queries
        // Shared function for both editor and save
        const parseNestedCSS = (cssString, wrapperClass) => {
            if (!cssString || !cssString.trim()) {
                return '';
            }

            // Split CSS into individual rules
            const rules = cssString.split(';').map(r => r.trim()).filter(r => r);
            
            // Storage structures
            const wrapperRules = []; // Wrapper-level CSS (no @, no hover, no media)
            const selectorRules = {}; // selector@property -> [properties]
            const hoverRules = {}; // hover:selector@property -> [properties]
            const mediaRules = {}; // media|breakpoint -> { selector: [properties] or 'wrapper': [properties] }

            // Sanitize helper function
            const sanitize = (str) => {
                return str.replace(/<\/?style[^>]*>/gi, '')
                          .replace(/<\/?script[^>]*>/gi, '')
                          .replace(/javascript:/gi, '');
            };

            // Sanitize selector helper
            const sanitizeSelector = (str) => {
                return str.replace(/[^a-zA-Z0-9\s.#:\-_]/g, '');
            };

            // Parse each rule
            rules.forEach(rule => {
                rule = rule.trim();
                if (!rule) return;

                // Check for media query: media|breakpoint:...
                if (rule.startsWith('media|')) {
                    const afterMedia = rule.substring(6); // Remove 'media|'
                    const colonIndex = afterMedia.indexOf(':');
                    if (colonIndex === -1) return;
                    
                    const breakpoint = afterMedia.substring(0, colonIndex).trim();
                    const rest = afterMedia.substring(colonIndex + 1).trim();
                    
                    // Check if media query has selector or is wrapper-level
                    const atIndex = rest.indexOf('@');
                    
                    if (atIndex === -1) {
                        // Wrapper-level media query: media|991:padding-left:20px;
                        if (!mediaRules[breakpoint]) {
                            mediaRules[breakpoint] = {};
                        }
                        if (!mediaRules[breakpoint]['wrapper']) {
                            mediaRules[breakpoint]['wrapper'] = [];
                        }
                        const sanitized = sanitize(rest);
                        if (sanitized) {
                            mediaRules[breakpoint]['wrapper'].push(sanitized);
                        }
                    } else {
                        // Selector-level media query: media|991:h1@font-size:62px;
                        const selector = rest.substring(0, atIndex).trim();
                        const property = rest.substring(atIndex + 1).trim();
                        
                        if (!selector || !property) return;
                        
                        const sanitizedSelector = sanitizeSelector(selector);
                        const sanitizedProperty = sanitize(property);
                        
                        if (!sanitizedSelector || !sanitizedProperty) return;
                        
                        if (!mediaRules[breakpoint]) {
                            mediaRules[breakpoint] = {};
                        }
                        if (!mediaRules[breakpoint][sanitizedSelector]) {
                            mediaRules[breakpoint][sanitizedSelector] = [];
                        }
                        mediaRules[breakpoint][sanitizedSelector].push(sanitizedProperty);
                    }
                    return;
                }

                // Check for hover: hover:selector@property or hover:property (wrapper hover)
                if (rule.startsWith('hover:')) {
                    const afterHover = rule.substring(6).trim(); // Remove 'hover:'
                    const atIndex = afterHover.indexOf('@');
                    
                    if (atIndex === -1) {
                        // Wrapper hover: hover:opacity:0.5;
                        if (!hoverRules['wrapper']) {
                            hoverRules['wrapper'] = [];
                        }
                        const sanitized = sanitize(afterHover);
                        if (sanitized) {
                            hoverRules['wrapper'].push(sanitized);
                        }
                    } else {
                        // Selector hover: hover:h1@color:black; or hover:.heading@color:red;
                        const selector = afterHover.substring(0, atIndex).trim();
                        const property = afterHover.substring(atIndex + 1).trim();
                        
                        if (!selector || !property) return;
                        
                        const sanitizedSelector = sanitizeSelector(selector);
                        const sanitizedProperty = sanitize(property);
                        
                        if (!sanitizedSelector || !sanitizedProperty) return;
                        
                        if (!hoverRules[sanitizedSelector]) {
                            hoverRules[sanitizedSelector] = [];
                        }
                        hoverRules[sanitizedSelector].push(sanitizedProperty);
                    }
                    return;
                }

                // Check for selector syntax: selector@property
                const atIndex = rule.indexOf('@');
                
                if (atIndex === -1) {
                    // Wrapper-level CSS: padding-left: 20px;
                    const sanitized = sanitize(rule);
                    if (sanitized) {
                        wrapperRules.push(sanitized);
                    }
                    return;
                }

                // Selector-specific CSS: h1@font-size: 82px;
                const selector = rule.substring(0, atIndex).trim();
                const property = rule.substring(atIndex + 1).trim();

                if (!selector || !property) return;

                const sanitizedSelector = sanitizeSelector(selector);
                const sanitizedProperty = sanitize(property);

                if (!sanitizedSelector || !sanitizedProperty) return;

                if (!selectorRules[sanitizedSelector]) {
                    selectorRules[sanitizedSelector] = [];
                }
                selectorRules[sanitizedSelector].push(sanitizedProperty);
            });

            // Build CSS output
            let output = '';
            
            // 1. Wrapper-level CSS
            if (wrapperRules.length > 0) {
                output += `.${wrapperClass} {\n`;
                wrapperRules.forEach(prop => {
                    output += `    ${prop};\n`;
                });
                output += `}\n\n`;
            }

            // 2. Selector-specific CSS
            Object.keys(selectorRules).forEach(selector => {
                output += `.${wrapperClass} ${selector} {\n`;
                selectorRules[selector].forEach(prop => {
                    output += `    ${prop};\n`;
                });
                output += `}\n\n`;
            });

            // 3. Hover rules
            Object.keys(hoverRules).forEach(key => {
                if (key === 'wrapper') {
                    // Wrapper hover
                    output += `.${wrapperClass}:hover {\n`;
                    hoverRules[key].forEach(prop => {
                        output += `    ${prop};\n`;
                    });
                    output += `}\n\n`;
                } else {
                    // Selector hover: hover:h1@color:black -> .wrapper-class h1:hover
                    output += `.${wrapperClass} ${key}:hover {\n`;
                    hoverRules[key].forEach(prop => {
                        output += `    ${prop};\n`;
                    });
                    output += `}\n\n`;
                }
            });

            // 4. Media queries
            Object.keys(mediaRules).sort((a, b) => parseInt(a) - parseInt(b)).forEach(breakpoint => {
                const breakpointRules = mediaRules[breakpoint];
                output += `@media screen and (max-width: ${breakpoint}px) {\n`;
                
                // Wrapper-level media query rules
                if (breakpointRules['wrapper']) {
                    output += `    .${wrapperClass} {\n`;
                    breakpointRules['wrapper'].forEach(prop => {
                        output += `        ${prop};\n`;
                    });
                    output += `    }\n`;
                }
                
                // Selector-level media query rules
                Object.keys(breakpointRules).forEach(selector => {
                    if (selector === 'wrapper') return; // Already handled
                    
                    output += `    .${wrapperClass} ${selector} {\n`;
                    breakpointRules[selector].forEach(prop => {
                        output += `        ${prop};\n`;
                    });
                    output += `    }\n`;
                });
                
                output += `}\n\n`;
            });

            return output;
        };

        // Helper function to handle cascading inheritance when updating values (copied from BS Row)
        const updateSpacingValue = (breakpoint, property, value) => {
            const breakpointOrder = ['default', 'sm', 'md', 'lg', 'xl', 'xxl'];
            const currentIndex = breakpointOrder.indexOf(breakpoint);
            const updates = {};
            
            // Update the current breakpoint
            const currentBreakpoint = breakpoint === 'default' ? defaultSpacing : attributes[breakpoint];
            updates[breakpoint] = {
                ...currentBreakpoint,
                [property]: value
            };
            
            // Cascade to all higher breakpoints
            for (let i = currentIndex + 1; i < breakpointOrder.length; i++) {
                const bp = breakpointOrder[i];
                const bpData = attributes[bp];
                // Always cascade to higher breakpoints
                updates[bp] = {
                    ...bpData,
                    [property]: value
                };
            }
            
            setAttributes(updates);
        };

        // Generate CSS for editor preview (adapted from BS Row)
        const generateEditorCSS = () => {
            const wrapperClass = uniqueId || 'emg-bs-wrapper-default';
            let css = '';
            
            // Base spacing (default breakpoint)
            const paddingTop = getEffectiveValue('default', 'paddingTop');
            const paddingRight = getEffectiveValue('default', 'paddingRight');
            const paddingBottom = getEffectiveValue('default', 'paddingBottom');
            const paddingLeft = getEffectiveValue('default', 'paddingLeft');
            const marginTop = getEffectiveValue('default', 'marginTop');
            const marginRight = getEffectiveValue('default', 'marginRight');
            const marginBottom = getEffectiveValue('default', 'marginBottom');
            const marginLeft = getEffectiveValue('default', 'marginLeft');
            
            if (paddingTop > 0) css += `.${wrapperClass} { padding-top: ${Math.round(paddingTop * (1/3))}px; }\n`;
            if (paddingRight > 0) css += `.${wrapperClass} { padding-right: ${Math.round(paddingRight * (1/3))}px; }\n`;
            if (paddingBottom > 0) css += `.${wrapperClass} { padding-bottom: ${Math.round(paddingBottom * (1/3))}px; }\n`;
            if (paddingLeft > 0) css += `.${wrapperClass} { padding-left: ${Math.round(paddingLeft * (1/3))}px; }\n`;
            if (marginTop > 0) css += `.${wrapperClass} { margin-top: ${Math.round(marginTop * (1/3))}px; }\n`;
            if (marginRight > 0) css += `.${wrapperClass} { margin-right: ${Math.round(marginRight * (1/3))}px; }\n`;
            if (marginBottom > 0) css += `.${wrapperClass} { margin-bottom: ${Math.round(marginBottom * (1/3))}px; }\n`;
            if (marginLeft > 0) css += `.${wrapperClass} { margin-left: ${Math.round(marginLeft * (1/3))}px; }\n`;
            
            // Custom CSS - parse nested syntax if @ symbol is present
            if (customCSS) {
                css += parseNestedCSS(customCSS, wrapperClass);
            }
            
            return css;
        };

        const editorCSS = generateEditorCSS();
        const wrapperClassName = uniqueId || 'emg-bs-wrapper-default';
        // Combine wrapper class with native WordPress className
        const combinedClassName = [wrapperClassName, className].filter(Boolean).join(' ').trim();

        return (
            <>
                <style dangerouslySetInnerHTML={{ __html: editorCSS }} />
                <InspectorControls>
                    <PanelBody title="Wrapper Settings" initialOpen={true}>
                        <div className="bs-wrapper-custom-css-wrapper" style={{ minHeight: '280px' }}>
                            <style dangerouslySetInnerHTML={{ __html: `
                                .bs-wrapper-custom-css-wrapper textarea,
                                .bs-wrapper-custom-css-wrapper .components-textarea-control__input {
                                    min-height: 280px !important;
                                }
                            ` }} />
                            <TextareaControl
                                label="Custom CSS"
                                value={customCSS || ''}
                                onChange={(value) => setAttributes({ customCSS: value })}
                                help="Supports wrapper CSS, selectors, hover states, and media queries. Examples: padding-left: 20px; h1@font-size: 82px; hover:h1@color:black; media|991:h1@font-size:62px;"
                                rows={4}
                            />
                        </div>
                        
                        {/* Responsive Padding Settings (copied from BS Row) */}
                        <PanelBody title="Padding" initialOpen={true}>
                            <TabPanel
                                className="bootstrap-spacing-tabs"
                                activeClass="active-tab"
                                onSelect={setActivePaddingTab}
                                tabs={[
                                    { name: 'default', title: 'Default' },
                                    { name: 'sm', title: 'SM' },
                                    { name: 'md', title: 'MD' },
                                    { name: 'lg', title: 'LG' },
                                    { name: 'xl', title: 'XL' },
                                    { name: 'xxl', title: 'XXL' }
                                ]}
                            >
                                {(tab) => (
                                    <div>
                                        <RangeControl
                                            label="Top"
                                            value={getEffectiveValue(tab.name, 'paddingTop')}
                                            onChange={(value) => {
                                                const breakpointOrder = ['default', 'sm', 'md', 'lg', 'xl', 'xxl'];
                                                const currentIndex = breakpointOrder.indexOf(tab.name);
                                                const updates = {};
                                                
                                                // Update the current breakpoint
                                                const currentBreakpoint = tab.name === 'default' ? defaultSpacing : attributes[tab.name];
                                                updates[tab.name] = {
                                                    ...currentBreakpoint,
                                                    paddingTop: value
                                                };
                                                
                                                // Cascade to all higher breakpoints
                                                for (let i = currentIndex + 1; i < breakpointOrder.length; i++) {
                                                    const bp = breakpointOrder[i];
                                                    const bpData = attributes[bp];
                                                    // Always cascade to higher breakpoints
                                                    updates[bp] = {
                                                        ...bpData,
                                                        paddingTop: value
                                                    };
                                                }
                                                
                                                setAttributes(updates);
                                            }}
                                            min={0}
                                            max={200}
                                        />
                                        <RangeControl
                                            label="Right"
                                            value={getEffectiveValue(tab.name, 'paddingRight')}
                                            onChange={(value) => {
                                                const breakpointOrder = ['default', 'sm', 'md', 'lg', 'xl', 'xxl'];
                                                const currentIndex = breakpointOrder.indexOf(tab.name);
                                                const updates = {};
                                                
                                                // Update the current breakpoint
                                                const currentBreakpoint = tab.name === 'default' ? defaultSpacing : attributes[tab.name];
                                                updates[tab.name] = {
                                                    ...currentBreakpoint,
                                                    paddingRight: value
                                                };
                                                
                                                // Cascade to all higher breakpoints
                                                for (let i = currentIndex + 1; i < breakpointOrder.length; i++) {
                                                    const bp = breakpointOrder[i];
                                                    const bpData = attributes[bp];
                                                    // Always cascade to higher breakpoints
                                                    updates[bp] = {
                                                        ...bpData,
                                                        paddingRight: value
                                                    };
                                                }
                                                
                                                setAttributes(updates);
                                            }}
                                            min={0}
                                            max={200}
                                        />
                                        <RangeControl
                                            label="Bottom"
                                            value={getEffectiveValue(tab.name, 'paddingBottom')}
                                            onChange={(value) => {
                                                const breakpointOrder = ['default', 'sm', 'md', 'lg', 'xl', 'xxl'];
                                                const currentIndex = breakpointOrder.indexOf(tab.name);
                                                const updates = {};
                                                
                                                // Update the current breakpoint
                                                const currentBreakpoint = tab.name === 'default' ? defaultSpacing : attributes[tab.name];
                                                updates[tab.name] = {
                                                    ...currentBreakpoint,
                                                    paddingBottom: value
                                                };
                                                
                                                // Cascade to all higher breakpoints
                                                for (let i = currentIndex + 1; i < breakpointOrder.length; i++) {
                                                    const bp = breakpointOrder[i];
                                                    const bpData = attributes[bp];
                                                    // Always cascade to higher breakpoints
                                                    updates[bp] = {
                                                        ...bpData,
                                                        paddingBottom: value
                                                    };
                                                }
                                                
                                                setAttributes(updates);
                                            }}
                                            min={0}
                                            max={200}
                                        />
                                        <RangeControl
                                            label="Left"
                                            value={getEffectiveValue(tab.name, 'paddingLeft')}
                                            onChange={(value) => {
                                                const breakpointOrder = ['default', 'sm', 'md', 'lg', 'xl', 'xxl'];
                                                const currentIndex = breakpointOrder.indexOf(tab.name);
                                                const updates = {};
                                                
                                                // Update the current breakpoint
                                                const currentBreakpoint = tab.name === 'default' ? defaultSpacing : attributes[tab.name];
                                                updates[tab.name] = {
                                                    ...currentBreakpoint,
                                                    paddingLeft: value
                                                };
                                                
                                                // Cascade to all higher breakpoints
                                                for (let i = currentIndex + 1; i < breakpointOrder.length; i++) {
                                                    const bp = breakpointOrder[i];
                                                    const bpData = attributes[bp];
                                                    // Always cascade to higher breakpoints
                                                    updates[bp] = {
                                                        ...bpData,
                                                        paddingLeft: value
                                                    };
                                                }
                                                
                                                setAttributes(updates);
                                            }}
                                            min={0}
                                            max={200}
                                        />
                                    </div>
                                )}
                            </TabPanel>
                        </PanelBody>
                    </PanelBody>

                    {/* Animation Settings */}
                    <PanelBody title="Animation" initialOpen={false}>
                        <ToggleControl
                            label="Enable Animation"
                            checked={wrapperAnimationEnabled || false}
                            onChange={(value) => {
                                const updates = { wrapperAnimationEnabled: value };
                                // Auto-set defaults when enabling
                                if (value && !wrapperAnimationName) {
                                    updates.wrapperAnimationName = 'fade-up';
                                    updates.wrapperAnimationDuration = 1000;
                                    updates.wrapperAnimationDelay = 0;
                                }
                                setAttributes(updates);
                            }}
                        />

                        {wrapperAnimationEnabled && (
                            <>
                                <SelectControl
                                    label="Animation Name"
                                    value={wrapperAnimationName || ''}
                                    options={[
                                        { label: 'Select Animation', value: '' },
                                        { label: 'Fade Up', value: 'fade-up' },
                                        { label: 'Fade Down', value: 'fade-down' },
                                        { label: 'Fade Left', value: 'fade-left' },
                                        { label: 'Fade Right', value: 'fade-right' },
                                        { label: 'Zoom In', value: 'zoom-in' },
                                        { label: 'Zoom Out', value: 'zoom-out' }
                                    ]}
                                    onChange={(value) => setAttributes({ wrapperAnimationName: value })}
                                />
                                <RangeControl
                                    label="Duration (ms)"
                                    value={wrapperAnimationDuration || 1000}
                                    onChange={(value) => setAttributes({ wrapperAnimationDuration: value || 1000 })}
                                    min={100}
                                    max={3000}
                                    step={50}
                                />
                                <RangeControl
                                    label="Delay (ms)"
                                    value={wrapperAnimationDelay || 0}
                                    onChange={(value) => setAttributes({ wrapperAnimationDelay: value || 0 })}
                                    min={0}
                                    max={3000}
                                    step={50}
                                />
                            </>
                        )}
                    </PanelBody>
                </InspectorControls>
                
                <div {...useBlockProps({ className: combinedClassName })}>
                    <InnerBlocks 
                        allowedBlocks={true}
                        template={[]}
                        templateLock={false}
                    />
                </div>
            </>
        );
    },
    
    save({ attributes }) {
        const {
            className,
            customCSS,
            uniqueId,
            default: defaultSpacing,
            sm,
            md,
            lg,
            xl,
            xxl,
            wrapperAnimationEnabled,
            wrapperAnimationName,
            wrapperAnimationDuration,
            wrapperAnimationDelay
        } = attributes;

        // Helper function to get effective spacing value with cascading inheritance (copied from BS Row)
        const getEffectiveValue = (breakpoint, property) => {
            const breakpoints = { default: defaultSpacing, sm, md, lg, xl, xxl };
            const breakpointOrder = ['default', 'sm', 'md', 'lg', 'xl', 'xxl'];
            const currentIndex = breakpointOrder.indexOf(breakpoint);
            
            // Start from the current breakpoint and work backwards to find the first set value
            for (let i = currentIndex; i >= 0; i--) {
                const bp = breakpointOrder[i];
                const bpData = breakpoints[bp];
                if (bpData && bpData[property] !== undefined) {
                    return bpData[property];
                }
            }
            
            return 0;
        };

        // Parse nested CSS syntax (selector@property: value;)
        // Supports: wrapper CSS, selector CSS, hover states, and media queries
        const parseNestedCSS = (cssString, wrapperClass) => {
            if (!cssString || !cssString.trim()) {
                return '';
            }

            // Split CSS into individual rules
            const rules = cssString.split(';').map(r => r.trim()).filter(r => r);
            
            // Storage structures
            const wrapperRules = []; // Wrapper-level CSS (no @, no hover, no media)
            const selectorRules = {}; // selector@property -> [properties]
            const hoverRules = {}; // hover:selector@property -> [properties]
            const mediaRules = {}; // media|breakpoint -> { selector: [properties] or 'wrapper': [properties] }

            // Sanitize helper function
            const sanitize = (str) => {
                return str.replace(/<\/?style[^>]*>/gi, '')
                          .replace(/<\/?script[^>]*>/gi, '')
                          .replace(/javascript:/gi, '');
            };

            // Sanitize selector helper
            const sanitizeSelector = (str) => {
                return str.replace(/[^a-zA-Z0-9\s.#:\-_]/g, '');
            };

            // Parse each rule
            rules.forEach(rule => {
                rule = rule.trim();
                if (!rule) return;

                // Check for media query: media|breakpoint:...
                if (rule.startsWith('media|')) {
                    const afterMedia = rule.substring(6); // Remove 'media|'
                    const colonIndex = afterMedia.indexOf(':');
                    if (colonIndex === -1) return;
                    
                    const breakpoint = afterMedia.substring(0, colonIndex).trim();
                    const rest = afterMedia.substring(colonIndex + 1).trim();
                    
                    // Check if media query has selector or is wrapper-level
                    const atIndex = rest.indexOf('@');
                    
                    if (atIndex === -1) {
                        // Wrapper-level media query: media|991:padding-left:20px;
                        if (!mediaRules[breakpoint]) {
                            mediaRules[breakpoint] = {};
                        }
                        if (!mediaRules[breakpoint]['wrapper']) {
                            mediaRules[breakpoint]['wrapper'] = [];
                        }
                        const sanitized = sanitize(rest);
                        if (sanitized) {
                            mediaRules[breakpoint]['wrapper'].push(sanitized);
                        }
                    } else {
                        // Selector-level media query: media|991:h1@font-size:62px;
                        const selector = rest.substring(0, atIndex).trim();
                        const property = rest.substring(atIndex + 1).trim();
                        
                        if (!selector || !property) return;
                        
                        const sanitizedSelector = sanitizeSelector(selector);
                        const sanitizedProperty = sanitize(property);
                        
                        if (!sanitizedSelector || !sanitizedProperty) return;
                        
                        if (!mediaRules[breakpoint]) {
                            mediaRules[breakpoint] = {};
                        }
                        if (!mediaRules[breakpoint][sanitizedSelector]) {
                            mediaRules[breakpoint][sanitizedSelector] = [];
                        }
                        mediaRules[breakpoint][sanitizedSelector].push(sanitizedProperty);
                    }
                    return;
                }

                // Check for hover: hover:selector@property or hover:property (wrapper hover)
                if (rule.startsWith('hover:')) {
                    const afterHover = rule.substring(6).trim(); // Remove 'hover:'
                    const atIndex = afterHover.indexOf('@');
                    
                    if (atIndex === -1) {
                        // Wrapper hover: hover:opacity:0.5;
                        if (!hoverRules['wrapper']) {
                            hoverRules['wrapper'] = [];
                        }
                        const sanitized = sanitize(afterHover);
                        if (sanitized) {
                            hoverRules['wrapper'].push(sanitized);
                        }
                    } else {
                        // Selector hover: hover:h1@color:black; or hover:.heading@color:red;
                        const selector = afterHover.substring(0, atIndex).trim();
                        const property = afterHover.substring(atIndex + 1).trim();
                        
                        if (!selector || !property) return;
                        
                        const sanitizedSelector = sanitizeSelector(selector);
                        const sanitizedProperty = sanitize(property);
                        
                        if (!sanitizedSelector || !sanitizedProperty) return;
                        
                        if (!hoverRules[sanitizedSelector]) {
                            hoverRules[sanitizedSelector] = [];
                        }
                        hoverRules[sanitizedSelector].push(sanitizedProperty);
                    }
                    return;
                }

                // Check for selector syntax: selector@property
                const atIndex = rule.indexOf('@');
                
                if (atIndex === -1) {
                    // Wrapper-level CSS: padding-left: 20px;
                    const sanitized = sanitize(rule);
                    if (sanitized) {
                        wrapperRules.push(sanitized);
                    }
                    return;
                }

                // Selector-specific CSS: h1@font-size: 82px;
                const selector = rule.substring(0, atIndex).trim();
                const property = rule.substring(atIndex + 1).trim();

                if (!selector || !property) return;

                const sanitizedSelector = sanitizeSelector(selector);
                const sanitizedProperty = sanitize(property);

                if (!sanitizedSelector || !sanitizedProperty) return;

                if (!selectorRules[sanitizedSelector]) {
                    selectorRules[sanitizedSelector] = [];
                }
                selectorRules[sanitizedSelector].push(sanitizedProperty);
            });

            // Build CSS output
            let output = '';
            
            // 1. Wrapper-level CSS
            if (wrapperRules.length > 0) {
                output += `.${wrapperClass} {\n`;
                wrapperRules.forEach(prop => {
                    output += `    ${prop};\n`;
                });
                output += `}\n\n`;
            }

            // 2. Selector-specific CSS
            Object.keys(selectorRules).forEach(selector => {
                output += `.${wrapperClass} ${selector} {\n`;
                selectorRules[selector].forEach(prop => {
                    output += `    ${prop};\n`;
                });
                output += `}\n\n`;
            });

            // 3. Hover rules
            Object.keys(hoverRules).forEach(key => {
                if (key === 'wrapper') {
                    // Wrapper hover
                    output += `.${wrapperClass}:hover {\n`;
                    hoverRules[key].forEach(prop => {
                        output += `    ${prop};\n`;
                    });
                    output += `}\n\n`;
                } else {
                    // Selector hover: hover:h1@color:black -> .wrapper-class h1:hover
                    output += `.${wrapperClass} ${key}:hover {\n`;
                    hoverRules[key].forEach(prop => {
                        output += `    ${prop};\n`;
                    });
                    output += `}\n\n`;
                }
            });

            // 4. Media queries
            Object.keys(mediaRules).sort((a, b) => parseInt(a) - parseInt(b)).forEach(breakpoint => {
                const breakpointRules = mediaRules[breakpoint];
                output += `@media screen and (max-width: ${breakpoint}px) {\n`;
                
                // Wrapper-level media query rules
                if (breakpointRules['wrapper']) {
                    output += `    .${wrapperClass} {\n`;
                    breakpointRules['wrapper'].forEach(prop => {
                        output += `        ${prop};\n`;
                    });
                    output += `    }\n`;
                }
                
                // Selector-level media query rules
                Object.keys(breakpointRules).forEach(selector => {
                    if (selector === 'wrapper') return; // Already handled
                    
                    output += `    .${wrapperClass} ${selector} {\n`;
                    breakpointRules[selector].forEach(prop => {
                        output += `        ${prop};\n`;
                    });
                    output += `    }\n`;
                });
                
                output += `}\n\n`;
            });

            return output;
        };

        // Generate CSS for frontend (adapted from BS Row)
        const generateCSS = () => {
            const wrapperClass = uniqueId || 'emg-bs-wrapper-default';
            let css = '';
            
            // Base spacing (default breakpoint)
            const paddingTop = getEffectiveValue('default', 'paddingTop');
            const paddingRight = getEffectiveValue('default', 'paddingRight');
            const paddingBottom = getEffectiveValue('default', 'paddingBottom');
            const paddingLeft = getEffectiveValue('default', 'paddingLeft');
            const marginTop = getEffectiveValue('default', 'marginTop');
            const marginRight = getEffectiveValue('default', 'marginRight');
            const marginBottom = getEffectiveValue('default', 'marginBottom');
            const marginLeft = getEffectiveValue('default', 'marginLeft');
            
            if (paddingTop > 0) css += `.${wrapperClass} { padding-top: ${paddingTop}px; }\n`;
            if (paddingRight > 0) css += `.${wrapperClass} { padding-right: ${paddingRight}px; }\n`;
            if (paddingBottom > 0) css += `.${wrapperClass} { padding-bottom: ${paddingBottom}px; }\n`;
            if (paddingLeft > 0) css += `.${wrapperClass} { padding-left: ${paddingLeft}px; }\n`;
            if (marginTop > 0) css += `.${wrapperClass} { margin-top: ${marginTop}px; }\n`;
            if (marginRight > 0) css += `.${wrapperClass} { margin-right: ${marginRight}px; }\n`;
            if (marginBottom > 0) css += `.${wrapperClass} { margin-bottom: ${marginBottom}px; }\n`;
            if (marginLeft > 0) css += `.${wrapperClass} { margin-left: ${marginLeft}px; }\n`;
            
            // Responsive breakpoints
            const breakpoints = [
                { name: 'sm', minWidth: '576px' },
                { name: 'md', minWidth: '768px' },
                { name: 'lg', minWidth: '992px' },
                { name: 'xl', minWidth: '1200px' },
                { name: 'xxl', minWidth: '1400px' }
            ];
            
            let prevPaddingTop = getEffectiveValue('default', 'paddingTop');
            let prevPaddingRight = getEffectiveValue('default', 'paddingRight');
            let prevPaddingBottom = getEffectiveValue('default', 'paddingBottom');
            let prevPaddingLeft = getEffectiveValue('default', 'paddingLeft');
            let prevMarginTop = getEffectiveValue('default', 'marginTop');
            let prevMarginRight = getEffectiveValue('default', 'marginRight');
            let prevMarginBottom = getEffectiveValue('default', 'marginBottom');
            let prevMarginLeft = getEffectiveValue('default', 'marginLeft');
            
            // Skip default breakpoint (already handled above) and process responsive breakpoints
            breakpoints.forEach(({ name, minWidth }) => {
                const paddingTop = getEffectiveValue(name, 'paddingTop');
                const paddingRight = getEffectiveValue(name, 'paddingRight');
                const paddingBottom = getEffectiveValue(name, 'paddingBottom');
                const paddingLeft = getEffectiveValue(name, 'paddingLeft');
                const marginTop = getEffectiveValue(name, 'marginTop');
                const marginRight = getEffectiveValue(name, 'marginRight');
                const marginBottom = getEffectiveValue(name, 'marginBottom');
                const marginLeft = getEffectiveValue(name, 'marginLeft');
                
                // Check if any values are different from the previous breakpoint
                const hasDifferentValues = 
                    paddingTop !== prevPaddingTop || paddingRight !== prevPaddingRight ||
                    paddingBottom !== prevPaddingBottom || paddingLeft !== prevPaddingLeft ||
                    marginTop !== prevMarginTop || marginRight !== prevMarginRight ||
                    marginBottom !== prevMarginBottom || marginLeft !== prevMarginLeft;
                
                if (hasDifferentValues) {
                    css += `@media screen and (min-width: ${minWidth}) {\n`;
                    css += `    .${wrapperClass} {\n`;
                    
                    if (paddingTop !== prevPaddingTop) css += `        padding-top: ${paddingTop}px;\n`;
                    if (paddingRight !== prevPaddingRight) css += `        padding-right: ${paddingRight}px;\n`;
                    if (paddingBottom !== prevPaddingBottom) css += `        padding-bottom: ${paddingBottom}px;\n`;
                    if (paddingLeft !== prevPaddingLeft) css += `        padding-left: ${paddingLeft}px;\n`;
                    if (marginTop !== prevMarginTop) css += `        margin-top: ${marginTop}px;\n`;
                    if (marginRight !== prevMarginRight) css += `        margin-right: ${marginRight}px;\n`;
                    if (marginBottom !== prevMarginBottom) css += `        margin-bottom: ${marginBottom}px;\n`;
                    if (marginLeft !== prevMarginLeft) css += `        margin-left: ${marginLeft}px;\n`;
                    
                    css += `    }\n`;
                    css += `}\n\n`;
                }
                
                // Update previous values for next iteration
                prevPaddingTop = paddingTop;
                prevPaddingRight = paddingRight;
                prevPaddingBottom = paddingBottom;
                prevPaddingLeft = paddingLeft;
                prevMarginTop = marginTop;
                prevMarginRight = marginRight;
                prevMarginBottom = marginBottom;
                prevMarginLeft = marginLeft;
            });
            
            // Custom CSS - parse nested syntax if @ symbol is present
            if (customCSS) {
                css += parseNestedCSS(customCSS, wrapperClass);
            }
            
            return css;
        };

        const wrapperClassName = uniqueId || 'emg-bs-wrapper-default';
        // Combine wrapper class with native WordPress className
        const combinedClassName = [wrapperClassName, className].filter(Boolean).join(' ').trim();
        const css = generateCSS();

        // Build AOS attributes for wrapper animation
        const wrapperAosAttributes = {};
        // Use fade-up as default if animation is enabled but no name is set
        const effectiveAnimationName = wrapperAnimationEnabled ? (wrapperAnimationName || 'fade-up') : '';
        const effectiveDuration = wrapperAnimationEnabled ? (wrapperAnimationDuration || 1000) : 0;
        
        if (effectiveAnimationName) {
            wrapperAosAttributes['data-aos'] = effectiveAnimationName;
            if (effectiveDuration > 0) {
                wrapperAosAttributes['data-aos-duration'] = effectiveDuration;
            }
            // Only output delay if greater than 0
            if (wrapperAnimationDelay > 0) {
                wrapperAosAttributes['data-aos-delay'] = wrapperAnimationDelay;
            }
        }

        return (
            <div className={combinedClassName} {...wrapperAosAttributes}>
                <InnerBlocks.Content />
                {css && (
                    <style dangerouslySetInnerHTML={{ __html: css }} />
                )}
            </div>
        );
    },
});