import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { PanelBody, TextControl, TabPanel, Button, ToggleControl, RangeControl, SelectControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { dispatch, select } from '@wordpress/data';
import './style.css';

// Helper function to generate Slick slider configuration (from BS Testimonial)
const generateSlickConfig = (slidesToShow, autoplay, autoplaySpeed, showArrows, showDots, responsive) => {
    const responsiveConfig = [];
    
    const defaultResponsive = {
        desktop: { slidesToShow: 3, slidesToScroll: 1 },
        tablet: { slidesToShow: 2, slidesToScroll: 1 },
        mobile: { slidesToShow: 1, slidesToScroll: 1 }
    };
    
    let parsedResponsive = responsive;
    if (typeof responsive === 'string') {
        try {
            parsedResponsive = JSON.parse(responsive);
        } catch (e) {
            console.warn('Failed to parse responsive string:', responsive);
            parsedResponsive = defaultResponsive;
        }
    }
    
    const finalResponsive = parsedResponsive && Object.keys(parsedResponsive).length > 0 ? parsedResponsive : defaultResponsive;
    
    if (finalResponsive.desktop && finalResponsive.desktop.slidesToShow !== undefined) {
        responsiveConfig.push({
            breakpoint: 1024,
            settings: {
                slidesToShow: finalResponsive.desktop.slidesToShow,
                slidesToScroll: finalResponsive.desktop.slidesToScroll || 1
            }
        });
    }
    
    if (finalResponsive.tablet && finalResponsive.tablet.slidesToShow !== undefined) {
        responsiveConfig.push({
            breakpoint: 768,
            settings: {
                slidesToShow: finalResponsive.tablet.slidesToShow,
                slidesToScroll: finalResponsive.tablet.slidesToScroll || 1
            }
        });
    }
    
    if (finalResponsive.mobile && finalResponsive.mobile.slidesToShow !== undefined) {
        responsiveConfig.push({
            breakpoint: 600,
            settings: {
                slidesToShow: finalResponsive.mobile.slidesToShow,
                slidesToScroll: finalResponsive.mobile.slidesToScroll || 1
            }
        });
    }

    return {
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        fade: false,
        dots: showDots,
        autoplay: autoplay,
        autoplaySpeed: autoplaySpeed,
        arrows: showArrows,
        infinite: true,
        responsive: responsiveConfig
    };
};

// Global state for breakpoint persistence
window.bootstrapBlocksGlobalState = window.bootstrapBlocksGlobalState || {
    lastSelectedBreakpoint: 'default',
    listeners: []
};

// Event system for breakpoint changes
const addBreakpointListener = (callback) => {
    window.bootstrapBlocksGlobalState.listeners.push(callback);
    return () => {
        const index = window.bootstrapBlocksGlobalState.listeners.indexOf(callback);
        if (index > -1) {
            window.bootstrapBlocksGlobalState.listeners.splice(index, 1);
        }
    };
};

const notifyBreakpointChange = (breakpoint) => {
    window.bootstrapBlocksGlobalState.lastSelectedBreakpoint = breakpoint;
    window.bootstrapBlocksGlobalState.listeners.forEach(callback => callback(breakpoint));
};

// Helper functions moved outside component
const getParentRowClientId = (clientId) => {
    const { getBlockRootClientId } = select('core/block-editor');
    let parentId = getBlockRootClientId(clientId);
    
    // Walk up the tree to find the Bootstrap Row block
    while (parentId) {
        const { getBlock } = select('core/block-editor');
        const parentBlock = getBlock(parentId);
        if (parentBlock && parentBlock.name === 'bootstrap-blocks/bs-row') {
            return parentId;
        }
        parentId = getBlockRootClientId(parentId);
    }
    return null;
};

const calculateColumnWidth = (totalColumns, columnIndex) => {
    if (totalColumns === 1) return 12;
    if (totalColumns === 2) return 6;
    if (totalColumns === 3) return 4;
    if (totalColumns === 4) return 3;
    if (totalColumns === 5) return columnIndex === 0 ? 7 : 5; // 7+5 = 12
    if (totalColumns === 6) return 2;
    if (totalColumns === 7) return columnIndex === 0 ? 6 : 6; // 6+6 = 12, but we need 7 columns
    if (totalColumns === 8) return columnIndex === 0 ? 5 : 7; // 5+7 = 12
    if (totalColumns === 9) return columnIndex === 0 ? 4 : 8; // 4+8 = 12
    if (totalColumns === 10) return columnIndex === 0 ? 3 : 9; // 3+9 = 12
    if (totalColumns === 11) return columnIndex === 0 ? 2 : 10; // 2+10 = 12
    if (totalColumns === 12) return 1;
    
    // For more than 12 columns, distribute evenly
    return Math.floor(12 / totalColumns);
};

// Helper function to get effective value for a breakpoint based on cascading inheritance
const getEffectiveValue = (breakpoint, attributes, calculatedDefault) => {
    const breakpointOrder = ['default', 'sm', 'md', 'lg', 'xl', 'xxl'];
    const currentIndex = breakpointOrder.indexOf(breakpoint);
    
    // Find the highest set value below or at the current breakpoint
    for (let i = currentIndex; i >= 0; i--) {
        const bp = breakpointOrder[i];
        const value = attributes[bp]?.width || 0;
        
        if (value > 0) {
            return value;
        }
        
        // For default breakpoint, use calculated value if no custom value
        if (bp === 'default' && calculatedDefault) {
            return calculatedDefault;
        }
    }
    
    return 0;
};

// Helper function to get calculated default value
const getCalculatedDefault = (clientId) => {
    const parentRowId = getParentRowClientId(clientId);
    if (parentRowId) {
        const { getBlockOrder } = select('core/block-editor');
        const columnOrder = getBlockOrder(parentRowId);
        const totalColumns = columnOrder.length;
        const columnIndex = columnOrder.indexOf(clientId);
        return calculateColumnWidth(totalColumns, columnIndex);
    }
    return 6; // fallback
};

registerBlockType('bootstrap-blocks/bs-column', {
    edit({ attributes, setAttributes, clientId, isSelected }) {
        const { 
            className, sm, md, lg, xl, xxl, calculatedWidth, 
            colAnimationEnabled, colAnimationName, colAnimationDuration, colAnimationDelay,
            sliderEnabled, uniqueId, slidesToShow, autoplay, autoplaySpeed, showArrows, showDots, responsive
        } = attributes;
        const [activeTab, setActiveTab] = useState(window.bootstrapBlocksGlobalState.lastSelectedBreakpoint);
        const [isSettingsOpen, setIsSettingsOpen] = useState(false);
        const [isBeingEdited, setIsBeingEdited] = useState(false);
        
        // Auto-open settings panel when column is selected
        useEffect(() => {
            if (isSelected) {
                setIsSettingsOpen(true);
                // Restore the last selected breakpoint when switching to this column
                const currentBreakpoint = window.bootstrapBlocksGlobalState.lastSelectedBreakpoint;
                setActiveTab(currentBreakpoint);
            }
        }, [isSelected]);
        
        // Listen for breakpoint changes from other columns
        useEffect(() => {
            const removeListener = addBreakpointListener((breakpoint) => {
                if (isSelected) {
                    setActiveTab(breakpoint);
                }
            });
            return removeListener;
        }, [isSelected]);
        
        // Update breakpoint function
        const updateBreakpoint = (breakpoint) => {
            setActiveTab(breakpoint);
            notifyBreakpointChange(breakpoint);
        };
        
        // Generate unique ID for slider when enabled
        useEffect(() => {
            if (sliderEnabled && !uniqueId) {
                const generatedId = 'emg-bs-column-slider-' + clientId.replace(/[^a-zA-Z0-9]/g, '');
                setAttributes({ uniqueId: generatedId });
            }
        }, [sliderEnabled, clientId, uniqueId, setAttributes]);

        // Initialize responsive values if not set (only on mount)
        useEffect(() => {
            if (sliderEnabled && (!responsive || Object.keys(responsive).length === 0)) {
                const defaultResponsive = {
                    mobile: { slidesToShow: 1, slidesToScroll: 1, minWidth: 600 },
                    tablet: { slidesToShow: 2, slidesToScroll: 1, minWidth: 768 },
                    desktop: { slidesToShow: 3, slidesToScroll: 1, minWidth: 1024 }
                };
                setAttributes({ responsive: defaultResponsive });
            }
        }, [clientId]); // Only run when clientId changes (new block)

        // Update responsive value helper
        const updateResponsiveValue = (breakpoint, field, value) => {
            const updatedResponsive = { ...responsive };
            if (!updatedResponsive[breakpoint]) {
                updatedResponsive[breakpoint] = {};
            }
            updatedResponsive[breakpoint][field] = value;
            setAttributes({ responsive: updatedResponsive });
        };

        // Get default responsive values
        const getDefaultResponsiveValue = (breakpoint, field) => {
            const defaults = {
                mobile: { slidesToShow: 1, slidesToScroll: 1 },
                tablet: { slidesToShow: 2, slidesToScroll: 1 },
                desktop: { slidesToShow: 3, slidesToScroll: 1 }
            };
            return defaults[breakpoint]?.[field] || 1;
        };

        // Slider breakpoint tabs
        const sliderBreakpoints = [
            { name: 'mobile', label: 'Mobile', minWidth: 600 },
            { name: 'tablet', label: 'Tablet', minWidth: 768 },
            { name: 'desktop', label: 'Desktop', minWidth: 1024 }
        ];
        const [activeSliderTab, setActiveSliderTab] = useState('mobile');

        // Get block count to track InnerBlocks changes for slider reinitialization
        const blockOrder = select('core/block-editor').getBlockOrder(clientId);
        const blockCount = blockOrder?.length || 0;

        // Editor slider initialization
        useEffect(() => {
            if (!sliderEnabled || !uniqueId) return;

            // Wait for DOM to be ready and jQuery/Slick to be available
            const initSlider = () => {
                if (typeof jQuery === 'undefined' || !jQuery.fn.slick) {
                    // Retry after a short delay if jQuery/Slick not ready
                    setTimeout(initSlider, 100);
                    return;
                }

                const $ = jQuery;
                const sliderElement = $(`.${uniqueId}`);
                
                if (sliderElement.length === 0) {
                    // Slider container not yet rendered, retry
                    setTimeout(initSlider, 100);
                    return;
                }

                // Destroy existing slider instance if any
                if (sliderElement.hasClass('slick-initialized')) {
                    sliderElement.slick('unslick');
                }

                // Generate slider config
                const slickConfig = generateSlickConfig(
                    slidesToShow || 3,
                    autoplay !== false,
                    autoplaySpeed || 3000,
                    showArrows || false,
                    showDots !== false,
                    responsive
                );

                // Initialize slider
                sliderElement.slick(slickConfig);
            };

            // Initialize after a short delay to ensure DOM is ready
            const timeoutId = setTimeout(initSlider, 300);

            // Cleanup function
            return () => {
                clearTimeout(timeoutId);
                if (typeof jQuery !== 'undefined' && jQuery.fn.slick) {
                    const $ = jQuery;
                    const sliderElement = $(`.${uniqueId}`);
                    if (sliderElement.length > 0 && sliderElement.hasClass('slick-initialized')) {
                        sliderElement.slick('unslick');
                    }
                }
            };
        }, [sliderEnabled, uniqueId, slidesToShow, autoplay, autoplaySpeed, showArrows, showDots, responsive, blockCount]);

        // Generate Bootstrap classes for the column
        const getColumnClasses = () => {
            const classes = [];
            const calculatedDefault = getCalculatedDefault(clientId);
            
            // For backend editor, use XXL breakpoint values to show desktop layout
            const effectiveXXL = getEffectiveValue('xxl', attributes, calculatedDefault);
            const effectiveXL = getEffectiveValue('xl', attributes, calculatedDefault);
            const effectiveLG = getEffectiveValue('lg', attributes, calculatedDefault);
            const effectiveMD = getEffectiveValue('md', attributes, calculatedDefault);
            const effectiveSM = getEffectiveValue('sm', attributes, calculatedDefault);
            const effectiveDefault = getEffectiveValue('default', attributes, calculatedDefault);
            
            // Use XXL value for the main col- class in editor (shows desktop layout)
            if (effectiveXXL > 0) {
                classes.push(`col-${effectiveXXL}`);
            } else if (effectiveXL > 0) {
                classes.push(`col-${effectiveXL}`);
            } else if (effectiveLG > 0) {
                classes.push(`col-${effectiveLG}`);
            } else if (effectiveMD > 0) {
                classes.push(`col-${effectiveMD}`);
            } else if (effectiveSM > 0) {
                classes.push(`col-${effectiveSM}`);
            } else {
                classes.push(`col-${effectiveDefault}`);
            }
            
            return classes.join(' ');
        };

        // Update column width or offset
        const updateColumn = (breakpoint, field, value) => {
            const newValue = parseInt(value) || 0;
            setAttributes({
                [breakpoint]: {
                    ...attributes[breakpoint],
                    [field]: newValue
                }
            });
        };

        // Remove this column
        const removeThisColumn = () => {
            dispatch('core/block-editor').removeBlock(clientId);
        };

        // Check if parent row has child animation enabled
        const parentRowId = getParentRowClientId(clientId);
        let parentRowHasChildAnimation = false;
        if (parentRowId) {
            const { getBlock } = select('core/block-editor');
            const parentRowBlock = getBlock(parentRowId);
            if (parentRowBlock && parentRowBlock.attributes) {
                parentRowHasChildAnimation = parentRowBlock.attributes.childAnimationEnabled || false;
            }
        }

        return (
            <>
                <InspectorControls>
                    <PanelBody 
                        title="Grid Settings" 
                        initialOpen={isSettingsOpen}
                        opened={isSettingsOpen}
                        onToggle={() => setIsSettingsOpen(!isSettingsOpen)}
                    >
                        <TabPanel
                            key={`tabpanel-${activeTab}`}
                            className="bootstrap-column-tabs"
                            activeClass="active-tab"
                            onSelect={updateBreakpoint}
                            initialTabName={activeTab}
                            tabs={[
                                { name: 'default', title: 'Default' },
                                { name: 'sm', title: 'SM' },
                                { name: 'md', title: 'MD' },
                                { name: 'lg', title: 'LG' },
                                { name: 'xl', title: 'XL' },
                                { name: 'xxl', title: 'XXL' },
                            ]}
                        >
                            {(tab) => (
                                <div>
                                    <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                                        <TextControl
                                            label="Columns"
                                            type="number"
                                            min="0"
                                            max="12"
                                            value={(() => {
                                                const calculatedDefault = getCalculatedDefault(clientId);
                                                return getEffectiveValue(tab.name, attributes, calculatedDefault);
                                            })()}
                                            onChange={(value) => {
                                                const newValue = parseInt(value) || 0;
                                                
                                                // Set editing state
                                                setIsBeingEdited(true);
                                                
                                                // Update the current breakpoint
                                                updateColumn(tab.name, 'width', newValue);
                                                
                                                // Clear inheritance for higher breakpoints
                                                const breakpointOrder = ['default', 'sm', 'md', 'lg', 'xl', 'xxl'];
                                                const currentIndex = breakpointOrder.indexOf(tab.name);
                                                
                                                // Clear values for all breakpoints above the current one
                                                const updates = {};
                                                for (let i = currentIndex + 1; i < breakpointOrder.length; i++) {
                                                    const bp = breakpointOrder[i];
                                                    updates[bp] = { width: 0, offset: attributes[bp]?.offset || 0 };
                                                }
                                                
                                                if (Object.keys(updates).length > 0) {
                                                    setAttributes(updates);
                                                }
                                                
                                                // Force re-render to update the display
                                                // No longer needed with global state approach
                                                
                                                // Clear editing state after a short delay
                                                setTimeout(() => setIsBeingEdited(false), 1000);
                                            }}
                                            style={{ flex: 1 }}
                                        />
                                        <TextControl
                                            label="Offset"
                                            type="number"
                                            min="0"
                                            max="11"
                                            value={attributes[tab.name]?.offset || 0}
                                            onChange={(value) => {
                                                setIsBeingEdited(true);
                                                updateColumn(tab.name, 'offset', value);
                                                setTimeout(() => setIsBeingEdited(false), 1000);
                                            }}
                                            style={{ flex: 1 }}
                                        />
                                    </div>
                                    
                                    <div style={{ 
                                        padding: '10px', 
                                        backgroundColor: '#f8f9fa',
                                        borderRadius: '4px',
                                        textAlign: 'center',
                                        fontSize: '12px'
                                    }}>
                                        <strong>Current: {(() => {
                                            const calculatedDefault = getCalculatedDefault(clientId);
                                            return getEffectiveValue(tab.name, attributes, calculatedDefault);
                                        })()}/12</strong>
                                    </div>
                                </div>
                            )}
                        </TabPanel>
                    </PanelBody>

                    {/* Animation Settings */}
                    <PanelBody title="Animation" initialOpen={false}>
                        {parentRowHasChildAnimation ? (
                            <div style={{ padding: '12px', backgroundColor: '#f0f0f1', borderRadius: '4px', fontSize: '13px', color: '#50575e' }}>
                                <strong>Animation controlled by parent Row block</strong>
                                <p style={{ margin: '8px 0 0 0', fontSize: '12px' }}>
                                    The parent Row block has child animation enabled. Column animation settings are overridden.
                                </p>
                            </div>
                        ) : (
                            <>
                                <ToggleControl
                                    label="Enable Animation"
                                    checked={colAnimationEnabled || false}
                                    onChange={(value) => {
                                        const updates = { colAnimationEnabled: value };
                                        // Auto-set defaults when enabling
                                        if (value && !colAnimationName) {
                                            updates.colAnimationName = 'fade-up';
                                            updates.colAnimationDuration = 1000;
                                            updates.colAnimationDelay = 0;
                                        }
                                        setAttributes(updates);
                                    }}
                                />

                                {colAnimationEnabled && (
                                    <>
                                        <SelectControl
                                            label="Animation Name"
                                            value={colAnimationName || ''}
                                            options={[
                                                { label: 'Select Animation', value: '' },
                                                { label: 'Fade Up', value: 'fade-up' },
                                                { label: 'Fade Down', value: 'fade-down' },
                                                { label: 'Fade Left', value: 'fade-left' },
                                                { label: 'Fade Right', value: 'fade-right' },
                                                { label: 'Zoom In', value: 'zoom-in' },
                                                { label: 'Zoom Out', value: 'zoom-out' }
                                            ]}
                                            onChange={(value) => setAttributes({ colAnimationName: value })}
                                        />
                                        <RangeControl
                                            label="Duration (ms)"
                                            value={colAnimationDuration || 1000}
                                            onChange={(value) => setAttributes({ colAnimationDuration: value || 1000 })}
                                            min={100}
                                            max={3000}
                                            step={50}
                                        />
                                        <RangeControl
                                            label="Delay (ms)"
                                            value={colAnimationDelay || 0}
                                            onChange={(value) => setAttributes({ colAnimationDelay: value || 0 })}
                                            min={0}
                                            max={3000}
                                            step={50}
                                        />
                                    </>
                                )}
                            </>
                        )}
                    </PanelBody>

                    {/* Slider Settings */}
                    <PanelBody title="Slider Settings" initialOpen={false}>
                        <ToggleControl
                            label="Enable Slider"
                            checked={sliderEnabled || false}
                            onChange={(value) => setAttributes({ sliderEnabled: value })}
                        />

                        {sliderEnabled && (
                            <>
                                <h4 style={{ margin: '16px 0 12px 0', fontSize: '13px', fontWeight: '600' }}>Slider Configuration</h4>
                                <RangeControl
                                    label="Slides to Show"
                                    value={slidesToShow || 3}
                                    onChange={(value) => setAttributes({ slidesToShow: value })}
                                    min={1}
                                    max={6}
                                />
                                <ToggleControl
                                    label="Autoplay"
                                    checked={autoplay !== false}
                                    onChange={(value) => setAttributes({ autoplay: value })}
                                />
                                <RangeControl
                                    label="Autoplay Speed (seconds)"
                                    value={Math.round((autoplaySpeed || 3000) / 1000)}
                                    onChange={(value) => setAttributes({ autoplaySpeed: value * 1000 })}
                                    min={1}
                                    max={10}
                                    step={1}
                                />
                                <ToggleControl
                                    label="Show Arrows"
                                    checked={showArrows || false}
                                    onChange={(value) => setAttributes({ showArrows: value })}
                                />
                                <ToggleControl
                                    label="Show Dots"
                                    checked={showDots !== false}
                                    onChange={(value) => setAttributes({ showDots: value })}
                                />
                                
                                <h4 style={{ margin: '16px 0 12px 0', fontSize: '13px', fontWeight: '600' }}>Responsive Settings</h4>
                                <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
                                    {sliderBreakpoints.map((bp) => (
                                        <button
                                            key={bp.name}
                                            onClick={() => setActiveSliderTab(bp.name)}
                                            style={{
                                                padding: '6px 10px',
                                                border: '1px solid #ddd',
                                                background: activeSliderTab === bp.name ? '#007cba' : '#fff',
                                                color: activeSliderTab === bp.name ? '#fff' : '#333',
                                                cursor: 'pointer',
                                                borderRadius: '4px',
                                                fontSize: '12px',
                                                fontWeight: '500'
                                            }}
                                        >
                                            {bp.label}
                                        </button>
                                    ))}
                                </div>
                                {sliderBreakpoints.map((bp) => (
                                    <div key={bp.name} style={{ display: activeSliderTab === bp.name ? 'block' : 'none' }}>
                                        <RangeControl
                                            label={`Slides to Show (${bp.label})`}
                                            value={responsive?.[bp.name]?.slidesToShow ?? getDefaultResponsiveValue(bp.name, 'slidesToShow')}
                                            onChange={(value) => updateResponsiveValue(bp.name, 'slidesToShow', value)}
                                            min={1}
                                            max={6}
                                        />
                                        <RangeControl
                                            label={`Slides to Scroll (${bp.label})`}
                                            value={responsive?.[bp.name]?.slidesToScroll ?? getDefaultResponsiveValue(bp.name, 'slidesToScroll')}
                                            onChange={(value) => updateResponsiveValue(bp.name, 'slidesToScroll', value)}
                                            min={1}
                                            max={3}
                                        />
                                    </div>
                                ))}
                            </>
                        )}
                    </PanelBody>
                </InspectorControls>
                {/* Editor-only wrapper for controls if needed */}
                <div {...useBlockProps({ 
                    className: `${getColumnClasses()} ${isBeingEdited ? 'column-being-edited' : ''}`,
                    style: {
                        minHeight: '50px',
                        border: isSelected ? '2px solid #007cba' : '2px dashed #ccc',
                        borderBottom: isSelected ? '4px solid #007cba' : '2px dashed #ccc',
                        padding: '10px',
                        backgroundColor: 'transparent',
                        position: 'relative',
                        transition: 'all 0.2s ease'
                    }
                })}>
                    {sliderEnabled && uniqueId ? (
                        <div className={`bsb-slider-nav ${uniqueId}`}>
                            <InnerBlocks 
                                template={[
                                    ['core/paragraph', { placeholder: 'Type or add blocks…' }]
                                ]}
                                templateLock={false}
                            />
                        </div>
                    ) : (
                        <InnerBlocks 
                            template={[
                                ['core/paragraph', { placeholder: 'Type or add blocks…' }]
                            ]}
                            templateLock={false}
                        />
                    )}
                    {/* Remove button at the bottom of the column, only in editor */}
                    <div style={{ textAlign: 'center', marginTop: '12px' }}>
                        <Button 
                            onClick={removeThisColumn} 
                            isDestructive 
                            isSmall
                            style={{
                                backgroundColor: '#dc3545',
                                color: '#ffffff',
                                border: '2px solid #ffffff',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                fontWeight: '600',
                                textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                            }}
                        >
                            Remove Column
                        </Button>
                    </div>
                </div>
            </>
        );
    },
    
    save({ attributes }) {
        const { 
            className, default: defaultWidth, sm, md, lg, xl, xxl, calculatedWidth, 
            colAnimationEnabled, colAnimationName, colAnimationDuration, colAnimationDelay,
            sliderEnabled, uniqueId, slidesToShow, autoplay, autoplaySpeed, showArrows, showDots, responsive
        } = attributes;

        // Generate Bootstrap classes for the column
        const getColumnClasses = () => {
            const classes = [];
            
            // For save function, use calculated width or custom width
            const customWidth = defaultWidth?.width || 0;
            
            if (customWidth > 0) {
                // Use custom width if set
                classes.push(`col-${customWidth}`);
            } else {
                // Use calculated width from parent row
                classes.push(`col-${calculatedWidth || 6}`);
            }
            
            // Add other breakpoint classes if they have values
            const breakpoints = [
                { name: 'sm', value: sm, prefix: 'sm' },
                { name: 'md', value: md, prefix: 'md' },
                { name: 'lg', value: lg, prefix: 'lg' },
                { name: 'xl', value: xl, prefix: 'xl' },
                { name: 'xxl', value: xxl, prefix: 'xxl' }
            ];
            
            breakpoints.forEach(({ name, value, prefix }) => {
                const width = value?.width || 0;
                const offset = value?.offset || 0;
                
                if (width > 0) {
                    classes.push(`col-${prefix}-${width}`);
                }
                
                if (offset > 0) {
                    classes.push(`offset-${prefix}-${offset}`);
                }
            });
            
            return classes.join(' ');
        };

        // Build AOS attributes for column animation
        const colAosAttributes = {};
        // Use fade-up as default if animation is enabled but no name is set
        const effectiveAnimationName = colAnimationEnabled ? (colAnimationName || 'fade-up') : '';
        const effectiveDuration = colAnimationEnabled ? (colAnimationDuration || 1000) : 0;
        
        if (effectiveAnimationName) {
            colAosAttributes['data-aos'] = effectiveAnimationName;
            if (effectiveDuration > 0) {
                colAosAttributes['data-aos-duration'] = effectiveDuration;
            }
            // Only output delay if greater than 0
            if (colAnimationDelay > 0) {
                colAosAttributes['data-aos-delay'] = colAnimationDelay;
            }
        }

        // Generate Slick slider configuration if slider is enabled
        const slickConfig = sliderEnabled ? generateSlickConfig(
            slidesToShow || 3,
            autoplay !== false,
            autoplaySpeed || 3000,
            showArrows || false,
            showDots !== false,
            responsive
        ) : null;

        const sliderUniqueId = sliderEnabled ? (uniqueId || 'emg-bs-column-slider-default') : null;

        // Build column className with slider classes if enabled
        const columnClasses = [
            getColumnClasses(),
            sliderEnabled ? `bsb-slider-nav ${sliderUniqueId}` : '',
            className || ''
        ].filter(Boolean).join(' ');

        return (
            <>
                <div className={columnClasses} {...colAosAttributes}>
                    <InnerBlocks.Content />
                </div>
                {sliderEnabled && (
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `jQuery(document).ready(function($) {
                                if ($.fn.slick && $('.${sliderUniqueId}').length) {
                                    $('.${sliderUniqueId}').slick(${JSON.stringify(slickConfig).replace(/</g, '\\u003c')});
                                }
                            });`
                        }}
                    />
                )}
            </>
        );
    },
});