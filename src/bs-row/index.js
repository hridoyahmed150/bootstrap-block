import { registerBlockType, createBlock } from '@wordpress/blocks';
import { useBlockProps, InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl, Button, TabPanel, ToggleControl, RangeControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { dispatch, select, useSelect } from '@wordpress/data';
import './style.css';

registerBlockType('bootstrap-blocks/bs-row', {
    edit({ attributes, setAttributes, clientId }) {
        const {
            className,
            containerClassName,
            rowAlignment,
            containerWidth,
            containerWidthCustom,
            rowAnimationEnabled,
            animationName,
            animationDuration,
            animationDelay,
            childAnimationEnabled,
            childAnimationInitialDelay,
            childAnimationInterval
        } = attributes;

        const [activeAlignmentTab, setActiveAlignmentTab] = useState('default');


        // Helper function to get effective alignment value with cascading inheritance
        const getEffectiveAlignmentValue = (breakpoint) => {
            const alignment = rowAlignment || { default: '', sm: '', md: '', lg: '', xl: '', xxl: '' };
            const breakpointOrder = ['default', 'sm', 'md', 'lg', 'xl', 'xxl'];
            const currentIndex = breakpointOrder.indexOf(breakpoint);
            
            // Start from the current breakpoint and work backwards to find the first set value
            for (let i = currentIndex; i >= 0; i--) {
                const bp = breakpointOrder[i];
                const value = alignment[bp];
                if (value !== undefined && value !== '') {
                    return value;
                }
            }
            
            return '';
        };

        // Helper function to generate Bootstrap alignment classes with smart breakpoint output
        const generateAlignmentClasses = () => {
            const alignment = rowAlignment || { default: '', sm: '', md: '', lg: '', xl: '', xxl: '' };
            const breakpointOrder = ['default', 'sm', 'md', 'lg', 'xl', 'xxl'];
            const classes = [];
            
            // Get effective values for all breakpoints
            const effectiveValues = breakpointOrder.map(bp => ({
                breakpoint: bp,
                value: getEffectiveAlignmentValue(bp)
            }));
            
            // Track previous value to only output classes when they differ
            let prevValue = '';
            
            effectiveValues.forEach(({ breakpoint, value }) => {
                // Only output class if value is not empty and differs from previous
                if (value !== '' && value !== prevValue) {
                    if (breakpoint === 'default') {
                        classes.push(`align-items-${value}`);
                    } else {
                        classes.push(`align-items-${breakpoint}-${value}`);
                    }
                }
                prevValue = value;
            });
            
            return classes.join(' ');
        };

        // Add a column (bs-column block)
        const addColumn = () => {
            dispatch('core/block-editor').insertBlocks(
                createBlock('bootstrap-blocks/bs-column', {}),
                undefined,
                clientId
            );
        };

        // Remove this row
        const removeThisRow = () => {
            dispatch('core/block-editor').removeBlock(clientId);
        };

        // Count columns and force re-render when count changes
        const columnCount = select('core/block-editor').getBlockOrder(clientId)?.length || 0;

        // Count rows in parent section to determine if Remove button should show (reactive)
        const totalRowCount = useSelect((select) => {
            const { getBlockRootClientId, getBlockOrder } = select('core/block-editor');
            const parentId = getBlockRootClientId(clientId);
            if (parentId) {
                const siblingRows = getBlockOrder(parentId);
                return siblingRows?.length || 1;
            }
            return 1;
        }, [clientId]);
        
        const showRemoveButton = totalRowCount > 1;

        // Update column widths when count changes
        useEffect(() => {
            const { updateBlockAttributes } = dispatch('core/block-editor');
            const childBlockIds = select('core/block-editor').getBlockOrder(clientId);
            
            // Calculate width for each column based on total count
            const calculateWidth = (totalColumns, columnIndex) => {
                if (totalColumns === 1) return 12;
                if (totalColumns === 2) return 6;
                if (totalColumns === 3) return 4;
                if (totalColumns === 4) return 3;
                if (totalColumns === 5) return columnIndex === 0 ? 7 : 5;
                if (totalColumns === 6) return 2;
                if (totalColumns === 7) return columnIndex === 0 ? 6 : 6;
                if (totalColumns === 8) return columnIndex === 0 ? 5 : 7;
                if (totalColumns === 9) return columnIndex === 0 ? 4 : 8;
                if (totalColumns === 10) return columnIndex === 0 ? 3 : 9;
                if (totalColumns === 11) return columnIndex === 0 ? 2 : 10;
                if (totalColumns === 12) return 1;
                return Math.floor(12 / totalColumns);
            };
            
            // Update each column block with calculated width
            childBlockIds.forEach((blockId, index) => {
                const calculatedWidth = calculateWidth(columnCount, index);
                updateBlockAttributes(blockId, { 
                    calculatedWidth: calculatedWidth
                });
            });
        }, [columnCount, clientId]);

        const alignmentClasses = generateAlignmentClasses();
        // Use native WordPress className for row, combined with alignment classes
        const rowClasses = ['row', alignmentClasses, className].filter(Boolean).join(' ').trim();

        return (
            <>
                <InspectorControls>
                    {/* Row Settings */}
                    <PanelBody title="Row Settings" initialOpen={true}>
                        {/* Row Alignment */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '12px', fontWeight: '600' }}>Row Alignment</label>
                            <TabPanel
                                className="bootstrap-spacing-tabs"
                                activeClass="active-tab"
                                onSelect={setActiveAlignmentTab}
                                tabs={[
                                    { name: 'default', title: 'Default' },
                                    { name: 'sm', title: 'SM' },
                                    { name: 'md', title: 'MD' },
                                    { name: 'lg', title: 'LG' },
                                    { name: 'xl', title: 'XL' },
                                    { name: 'xxl', title: 'XXL' }
                                ]}
                            >
                                {(tab) => {
                                    const currentAlignment = rowAlignment || { default: '', sm: '', md: '', lg: '', xl: '', xxl: '' };
                                    const currentValue = getEffectiveAlignmentValue(tab.name);
                                    
                                    return (
                                        <div>
                                            <SelectControl
                                                label="Alignment"
                                                value={currentValue}
                                                options={[
                                                    { label: 'Default / None', value: '' },
                                                    { label: 'Start', value: 'start' },
                                                    { label: 'Center', value: 'center' },
                                                    { label: 'End', value: 'end' }
                                                ]}
                                                onChange={(value) => {
                                                    const breakpointOrder = ['default', 'sm', 'md', 'lg', 'xl', 'xxl'];
                                                    const currentIndex = breakpointOrder.indexOf(tab.name);
                                                    const updates = { ...currentAlignment };
                                                    
                                                    // Update the current breakpoint
                                                    updates[tab.name] = value;
                                                    
                                                    // Cascade to all higher breakpoints
                                                    for (let i = currentIndex + 1; i < breakpointOrder.length; i++) {
                                                        const bp = breakpointOrder[i];
                                                        updates[bp] = value;
                                                    }
                                                    
                                                    setAttributes({ rowAlignment: updates });
                                                }}
                                            />
                                        </div>
                                    );
                                }}
                            </TabPanel>
                        </div>
                    </PanelBody>

                    {/* Container Settings */}
                    <PanelBody title="Container Settings" initialOpen={false}>
                        <SelectControl
                            label="Container Width"
                            value={containerWidth || 'full-width'}
                            options={[
                                { label: 'Full Width', value: 'full-width' },
                                { label: 'Wide (1400px)', value: 'wide' },
                                { label: 'Boxed (1200px)', value: 'boxed' },
                                { label: 'Custom', value: 'custom' }
                            ]}
                            onChange={(value) => setAttributes({ containerWidth: value })}
                        />
                        {containerWidth === 'custom' && (
                            <RangeControl
                                label="Custom Width (px)"
                                value={containerWidthCustom || 1200}
                                onChange={(value) => setAttributes({ containerWidthCustom: value })}
                                min={300}
                                max={2000}
                                step={10}
                            />
                        )}

                        {/* Custom Container Classes */}
                        <TextControl
                            label="Custom Container Classes"
                            value={containerClassName || ''}
                            onChange={(value) => setAttributes({ containerClassName: value })}
                        />
                    </PanelBody>

                    {/* Animation Settings */}
                    <PanelBody title="Animation" initialOpen={false}>
                        <ToggleControl
                            label="Enable Animation for Row"
                            checked={rowAnimationEnabled || false}
                            onChange={(value) => {
                                const updates = { rowAnimationEnabled: value };
                                // Auto-set defaults when enabling
                                if (value && !animationName) {
                                    updates.animationName = 'fade-up';
                                    updates.animationDuration = 1000;
                                    updates.animationDelay = 0;
                                }
                                setAttributes(updates);
                            }}
                        />

                        {rowAnimationEnabled && (
                            <>
                                <SelectControl
                                    label="Animation Name"
                                    value={animationName || ''}
                                    options={[
                                        { label: 'Select Animation', value: '' },
                                        { label: 'Fade Up', value: 'fade-up' },
                                        { label: 'Fade Down', value: 'fade-down' },
                                        { label: 'Fade Left', value: 'fade-left' },
                                        { label: 'Fade Right', value: 'fade-right' },
                                        { label: 'Zoom In', value: 'zoom-in' },
                                        { label: 'Zoom Out', value: 'zoom-out' }
                                    ]}
                                    onChange={(value) => setAttributes({ animationName: value })}
                                />
                                <RangeControl
                                    label="Duration (ms)"
                                    value={animationDuration || 1000}
                                    onChange={(value) => setAttributes({ animationDuration: value || 1000 })}
                                    min={100}
                                    max={3000}
                                    step={50}
                                />
                                <RangeControl
                                    label="Delay (ms)"
                                    value={animationDelay || 0}
                                    onChange={(value) => setAttributes({ animationDelay: value || 0 })}
                                    min={0}
                                    max={3000}
                                    step={50}
                                />
                            </>
                        )}

                        <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #ddd' }}>
                            <ToggleControl
                                label="Enable Child Animation"
                                checked={childAnimationEnabled || false}
                                onChange={(value) => {
                                    const updates = { childAnimationEnabled: value };
                                    // Auto-set defaults when enabling
                                    if (value && !animationName) {
                                        updates.animationName = 'fade-up';
                                        updates.animationDuration = 1000;
                                        updates.childAnimationInitialDelay = 0;
                                        updates.childAnimationInterval = 0;
                                    }
                                    setAttributes(updates);
                                }}
                            />

                            {childAnimationEnabled && (
                                <>
                                    <RangeControl
                                        label="Initial Delay (ms)"
                                        value={childAnimationInitialDelay || 0}
                                        onChange={(value) => setAttributes({ childAnimationInitialDelay: value || 0 })}
                                        min={0}
                                        max={3000}
                                        step={50}
                                    />
                                    <RangeControl
                                        label="Delay Interval (ms)"
                                        value={childAnimationInterval || 0}
                                        onChange={(value) => setAttributes({ childAnimationInterval: value || 0 })}
                                        min={0}
                                        max={1000}
                                        step={50}
                                    />
                                    <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
                                        Child animation will override column animation settings.
                                    </p>
                                </>
                            )}
                        </div>
                    </PanelBody>
                </InspectorControls>
                
                <div {...useBlockProps({ style: { position: 'relative' } })}>
                    {/* Remove button at the top right of the row, only in editor and only if more than one row exists */}
                    {showRemoveButton && (
                        <div style={{ position: 'absolute', top: '8px', right: '8px', zIndex: 10 }}>
                            <Button 
                                onClick={removeThisRow} 
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
                                Remove Row
                            </Button>
                        </div>
                    )}

                    {/* Controls for editor UI */}
                    <div style={{ marginBottom: '12px', padding: '8px 12px', backgroundColor: 'rgba(255, 179, 0, 0.1)', borderRadius: '4px' }}>
                        <div style={{ color: '#FFB300', fontWeight: 'bold', marginBottom: '4px', fontSize: '18px' }}>BS Row</div>
                        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                            <Button onClick={addColumn} isPrimary>
                                + Add Column
                            </Button>
                            <span style={{ color: '#FFB300' }}>Columns: {columnCount}</span>
                        </div>
                    </div>

                    {/* Container and Row structure */}
                    <div className={['container', containerClassName].filter(Boolean).join(' ').trim()}>
                        <div className={rowClasses}>
                            <InnerBlocks 
                                allowedBlocks={['bootstrap-blocks/bs-column']}
                                template={[
                                    ['bootstrap-blocks/bs-column', {}],
                                    ['bootstrap-blocks/bs-column', {}]
                                ]}
                                templateLock={false}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    },
    
    save({ attributes }) {
        const {
            className,
            containerClassName,
            rowAlignment,
            containerWidth,
            containerWidthCustom,
            rowAnimationEnabled,
            animationName,
            animationDuration,
            animationDelay,
            childAnimationEnabled,
            childAnimationInitialDelay,
            childAnimationInterval
        } = attributes;

        // Helper function to get effective alignment value with cascading inheritance
        const getEffectiveAlignmentValue = (breakpoint) => {
            const alignment = rowAlignment || { default: '', sm: '', md: '', lg: '', xl: '', xxl: '' };
            const breakpointOrder = ['default', 'sm', 'md', 'lg', 'xl', 'xxl'];
            const currentIndex = breakpointOrder.indexOf(breakpoint);
            
            for (let i = currentIndex; i >= 0; i--) {
                const bp = breakpointOrder[i];
                const value = alignment[bp];
                if (value !== undefined && value !== '') {
                    return value;
                }
            }
            
            return '';
        };

        // Helper function to generate Bootstrap alignment classes with smart breakpoint output
        const generateAlignmentClasses = () => {
            const alignment = rowAlignment || { default: '', sm: '', md: '', lg: '', xl: '', xxl: '' };
            const breakpointOrder = ['default', 'sm', 'md', 'lg', 'xl', 'xxl'];
            const classes = [];
            
            const effectiveValues = breakpointOrder.map(bp => ({
                breakpoint: bp,
                value: getEffectiveAlignmentValue(bp)
            }));
            
            let prevValue = '';
            
            effectiveValues.forEach(({ breakpoint, value }) => {
                if (value !== '' && value !== prevValue) {
                    if (breakpoint === 'default') {
                        classes.push(`align-items-${value}`);
                    } else {
                        classes.push(`align-items-${breakpoint}-${value}`);
                    }
                }
                prevValue = value;
            });
            
            return classes.join(' ');
        };

        const alignmentClasses = generateAlignmentClasses();
        // Use native WordPress className for row, combined with alignment classes
        const rowClasses = ['row', alignmentClasses, className].filter(Boolean).join(' ').trim();

        // Generate inline styles for container width
        const getContainerInlineStyles = () => {
            const styles = {};
            
            if (containerWidth === 'custom') {
                styles.maxWidth = `${containerWidthCustom || 1200}px`;
                styles.margin = '0 auto';
            } else if (containerWidth === 'wide') {
                styles.maxWidth = '1400px';
                styles.margin = '0 auto';
            } else if (containerWidth === 'boxed') {
                styles.maxWidth = '1200px';
                styles.margin = '0 auto';
            }
            // 'full-width' doesn't need any styles - container will use full width
            
            return Object.keys(styles).length > 0 ? styles : null;
        };
        
        const containerInlineStyles = getContainerInlineStyles();

        // Build AOS attributes for row animation (frontend only - AOS scripts/styles enqueued by theme)
        // Only apply row animation if child animation is NOT enabled
        const rowAosAttributes = {};
        // Use fade-up as default if animation is enabled but no name is set
        const effectiveAnimationName = (!childAnimationEnabled && rowAnimationEnabled) ? (animationName || 'fade-up') : '';
        const effectiveDuration = (!childAnimationEnabled && rowAnimationEnabled) ? (animationDuration || 1000) : 0;
        
        if (effectiveAnimationName) {
            rowAosAttributes['data-aos'] = effectiveAnimationName;
            if (effectiveDuration > 0) {
                rowAosAttributes['data-aos-duration'] = effectiveDuration;
            }
            // Only output delay if greater than 0
            if (animationDelay > 0) {
                rowAosAttributes['data-aos-delay'] = animationDelay;
            }
        }

        // Build child animation data attributes (for frontend JavaScript to apply to columns)
        // When child animation is enabled, row gets NO animation attributes - only column instructions
        const childAnimationAttributes = {};
        if (childAnimationEnabled) {
            const childAnimationName = animationName || 'fade-up';
            const childDuration = animationDuration || 1000;
            childAnimationAttributes['data-child-animation'] = 'true';
            childAnimationAttributes['data-child-animation-name'] = childAnimationName;
            if (childDuration > 0) {
                childAnimationAttributes['data-child-animation-duration'] = childDuration;
            }
            if (childAnimationInitialDelay !== undefined && childAnimationInitialDelay !== null) {
                childAnimationAttributes['data-child-animation-initial-delay'] = childAnimationInitialDelay;
            }
            if (childAnimationInterval > 0) {
                childAnimationAttributes['data-child-animation-interval'] = childAnimationInterval;
            }
        }

        // Combine container classes with custom container classes
        const containerClasses = ['container', containerClassName].filter(Boolean).join(' ').trim();

        return (
            <div className={containerClasses} style={containerInlineStyles || undefined}>
                <div className={rowClasses} {...rowAosAttributes} {...childAnimationAttributes}>
                    <InnerBlocks.Content />
                </div>
            </div>
        );
    },
});
