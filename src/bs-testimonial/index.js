import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import { PanelBody, TextControl, TextareaControl, Button, RangeControl, ToggleControl, SelectControl } from '@wordpress/components';
import { generateTestimonialHTML } from './template';
import './style.css';

// Helper function to generate consistent Slick configuration
const generateSlickConfig = (slidesToShow, autoplay, autoplaySpeed, showArrows, showDots, responsive) => {
    // Create responsive config in descending order (larger to smaller breakpoints)
    const responsiveConfig = [];
    
    // Default responsive values
    const defaultResponsive = {
        desktop: { slidesToShow: 3, slidesToScroll: 1 },
        tablet: { slidesToShow: 2, slidesToScroll: 1 },
        mobile: { slidesToShow: 1, slidesToScroll: 1 }
    };
    
    // Parse responsive if it's a string (WordPress sometimes serializes objects as strings)
    let parsedResponsive = responsive;
    if (typeof responsive === 'string') {
        try {
            parsedResponsive = JSON.parse(responsive);
        } catch (e) {
            console.warn('Failed to parse responsive string:', responsive);
            parsedResponsive = defaultResponsive;
        }
    }
    
    // Use provided responsive or defaults
    const finalResponsive = parsedResponsive && Object.keys(parsedResponsive).length > 0 ? parsedResponsive : defaultResponsive;
    
    // Desktop breakpoint (1024px and below)
    if (finalResponsive.desktop && finalResponsive.desktop.slidesToShow !== undefined) {
        responsiveConfig.push({
            breakpoint: 1024,
            settings: {
                slidesToShow: finalResponsive.desktop.slidesToShow,
                slidesToScroll: finalResponsive.desktop.slidesToScroll || 1
            }
        });
    }
    
    // Tablet breakpoint (768px and below)
    if (finalResponsive.tablet && finalResponsive.tablet.slidesToShow !== undefined) {
        responsiveConfig.push({
            breakpoint: 768,
            settings: {
                slidesToShow: finalResponsive.tablet.slidesToShow,
                slidesToScroll: finalResponsive.tablet.slidesToScroll || 1
            }
        });
    }
    
    // Mobile breakpoint (600px and below)
    if (finalResponsive.mobile && finalResponsive.mobile.slidesToShow !== undefined) {
        responsiveConfig.push({
            breakpoint: 600,
            settings: {
                slidesToShow: finalResponsive.mobile.slidesToShow,
                slidesToScroll: finalResponsive.mobile.slidesToScroll || 1
            }
        });
    }

    const finalConfig = {
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
    
    return finalConfig;
};

registerBlockType('bootstrap-blocks/bs-testimonial', {
    edit({ attributes, setAttributes, clientId }) {
        const { uniqueId, testimonials, blockTitle, slidesToShow, autoplay, autoplaySpeed, showArrows, showDots, sliderStyle, responsive, wordLimit, showDate, showRating, slideBackground, titleColor, textColor, borderColor, borderWidth, borderRadius, slideGap, arrowTheme, dotColor, dotActiveColor } = attributes;
        const blockProps = useBlockProps();
        
        // State for active responsive tab
        const [activeTab, setActiveTab] = useState('mobile');

        // Generate unique ID based on clientId
        useEffect(() => {
            const generatedId = 'emg-bs-testimonial-' + clientId.replace(/[^a-zA-Z0-9]/g, '');
            if (uniqueId !== generatedId) {
                setAttributes({ uniqueId: generatedId });
            }
        }, [clientId, setAttributes, uniqueId]);

        // Initialize responsive values if not set (only on mount)
        useEffect(() => {
            if (!responsive || Object.keys(responsive).length === 0) {
                const defaultResponsive = {
                    mobile: { slidesToShow: 1, slidesToScroll: 1, minWidth: 600 },
                    tablet: { slidesToShow: 2, slidesToScroll: 1, minWidth: 768 },
                    desktop: { slidesToShow: 3, slidesToScroll: 1, minWidth: 1024 }
                };
                setAttributes({ responsive: defaultResponsive });
            }
        }, [clientId]); // Only run when clientId changes (new block)

        // Add new testimonial
        const addTestimonial = () => {
            const newTestimonial = {
                id: `testimonial-${Date.now()}`,
                name: 'New Customer',
                company: 'Company Name',
                text: 'Enter testimonial text here...'
            };
            setAttributes({
                testimonials: [...(testimonials || []), newTestimonial]
            });
        };

        // Update testimonial
        const updateTestimonial = (index, field, value) => {
            const updatedTestimonials = [...(testimonials || [])];
            updatedTestimonials[index] = {
                ...updatedTestimonials[index],
                [field]: value
            };
            setAttributes({ testimonials: updatedTestimonials });
        };

        // Remove testimonial
        const removeTestimonial = (index) => {
            const updatedTestimonials = (testimonials || []).filter((_, i) => i !== index);
            setAttributes({ testimonials: updatedTestimonials });
        };

        // Update responsive value
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

        // Breakpoint tabs
        const breakpoints = [
            { name: 'mobile', label: 'Mobile', minWidth: 600 },
            { name: 'tablet', label: 'Tablet', minWidth: 768 },
            { name: 'desktop', label: 'Desktop', minWidth: 1024 }
        ];

        return (
            <>
                <InspectorControls>
                    <PanelBody title="Slider Settings" initialOpen={false}>
                        <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: '600' }}>Slider Configuration</h4>
                        <RangeControl
                            label="Slides to Show"
                            value={slidesToShow || 3}
                            onChange={(value) => setAttributes({ slidesToShow: value })}
                            min={1}
                            max={6}
                        />
                        <ToggleControl
                            label="Autoplay"
                            checked={autoplay}
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
                        <SelectControl
                            label="Slider Style"
                            value={sliderStyle}
                            options={[
                                { label: 'Default', value: 'default' },
                                { label: 'Card Style', value: 'card' },
                                { label: 'Minimal', value: 'minimal' }
                            ]}
                            onChange={(value) => setAttributes({ sliderStyle: value })}
                        />
                        
                        <h4 style={{ margin: '16px 0 12px 0', fontSize: '13px', fontWeight: '600' }}>Content Settings</h4>
                        <RangeControl
                            label="Word Limit (before 'Read More')"
                            value={wordLimit}
                            onChange={(value) => setAttributes({ wordLimit: value })}
                            min={5}
                            max={200}
                            help="Set the number of words to show before displaying 'Read More' button"
                        />
                        <ToggleControl
                            label="Show Rating Stars"
                            checked={showRating}
                            onChange={(value) => setAttributes({ showRating: value })}
                            help="Toggle the display of 5-star rating"
                        />
                        <ToggleControl
                            label="Show Date"
                            checked={showDate}
                            onChange={(value) => setAttributes({ showDate: value })}
                            help="Toggle the display of testimonial date"
                        />
                    </PanelBody>
                    <PanelBody title="Style Settings" initialOpen={false}>
                        <div style={{ marginBottom: '16px' }}>
                            <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: '600' }}>Colors</h4>
                            <div style={{ marginBottom: '16px' }}>
                                <TextControl
                                    label="Slide Background Color"
                                    value={slideBackground || '#ffffff'}
                                    onChange={(value) => setAttributes({ slideBackground: value })}
                                    placeholder="#ffffff"
                                    help="Enter hex color code (e.g., #ffffff)"
                                />
                                <TextControl
                                    label="Title Color"
                                    value={titleColor || '#333333'}
                                    onChange={(value) => setAttributes({ titleColor: value })}
                                    placeholder="#333333"
                                    help="Enter hex color code (e.g., #333333)"
                                />
                                <TextControl
                                    label="Text Color"
                                    value={textColor || '#666666'}
                                    onChange={(value) => setAttributes({ textColor: value })}
                                    placeholder="#666666"
                                    help="Enter hex color code (e.g., #666666)"
                                />
                            </div>
                            
                            <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: '600' }}>Border & Spacing</h4>
                            <div style={{ marginBottom: '16px' }}>
                                <TextControl
                                    label="Border Color"
                                    value={borderColor || '#e0e0e0'}
                                    onChange={(value) => setAttributes({ borderColor: value })}
                                    placeholder="#e0e0e0"
                                    help="Enter hex color code (e.g., #e0e0e0)"
                                />
                                <RangeControl
                                    label="Border Width (px)"
                                    value={borderWidth || 1}
                                    onChange={(value) => setAttributes({ borderWidth: value })}
                                    min={0}
                                    max={10}
                                />
                            </div>
                            
                            <RangeControl
                                label="Border Radius (px)"
                                value={borderRadius || 8}
                                onChange={(value) => setAttributes({ borderRadius: value })}
                                min={0}
                                max={50}
                            />
                            <RangeControl
                                label="Slide Gap (px)"
                                value={slideGap || 20}
                                onChange={(value) => setAttributes({ slideGap: value })}
                                min={0}
                                max={50}
                            />
                        </div>
                    </PanelBody>
                    <PanelBody title="Navigation Settings" initialOpen={false}>
                        <div style={{ marginBottom: '16px' }}>
                            <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: '600' }}>Navigation Controls</h4>
                            <ToggleControl
                                label="Show Arrows"
                                checked={showArrows}
                                onChange={(value) => setAttributes({ showArrows: value })}
                            />
                            <ToggleControl
                                label="Show Dots"
                                checked={showDots}
                                onChange={(value) => setAttributes({ showDots: value })}
                            />
                            
                            <h4 style={{ margin: '16px 0 12px 0', fontSize: '13px', fontWeight: '600' }}>Arrow Styling</h4>
                            <SelectControl
                                label="Arrow Color Theme"
                                value={arrowTheme || 'light'}
                                options={[
                                    { label: 'Light Theme', value: 'light' },
                                    { label: 'Dark Theme', value: 'dark' }
                                ]}
                                onChange={(value) => setAttributes({ arrowTheme: value })}
                                help="Choose between light or dark arrow icons"
                            />
                            
                            <h4 style={{ margin: '16px 0 12px 0', fontSize: '13px', fontWeight: '600' }}>Dot Styling</h4>
                            <TextControl
                                label="Dots Color"
                                value={dotColor || '#D0D7E0'}
                                onChange={(value) => setAttributes({ dotColor: value })}
                                placeholder="#D0D7E0"
                                help="Enter hex color code (e.g., #D0D7E0)"
                            />
                            <TextControl
                                label="Dot Active Color"
                                value={dotActiveColor || '#007cba'}
                                onChange={(value) => setAttributes({ dotActiveColor: value })}
                                placeholder="#007cba"
                                help="Enter hex color code (e.g., #007cba)"
                            />
                        </div>
                    </PanelBody>
                    <PanelBody title="Responsive Settings" initialOpen={false}>
                        <div style={{ marginBottom: '16px' }}>
                            <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
                                {breakpoints.map((bp) => (
                                    <button
                                        key={bp.name}
                                        onClick={() => setActiveTab(bp.name)}
                                        style={{
                                            padding: '6px 10px',
                                            border: '1px solid #ddd',
                                            background: activeTab === bp.name ? '#007cba' : '#fff',
                                            color: activeTab === bp.name ? '#fff' : '#333',
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
                            {breakpoints.map((bp) => (
                                <div key={bp.name} style={{ display: activeTab === bp.name ? 'block' : 'none' }}>
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
                        </div>
                    </PanelBody>
                </InspectorControls>
                
                <div {...blockProps}>
                    <div style={{
                        padding: '20px',
                        border: '2px dashed #ccc',
                        textAlign: 'center',
                        backgroundColor: '#f9f9f9'
                    }}>
                        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                            <h3 style={{ margin: '0 0 10px 0', color: '#007cba' }}>📝 Testimonial Slider</h3>
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '10px 15px',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '6px',
                            marginBottom: '20px',
                            fontSize: '12px',
                            color: '#666'
                        }}>
                            <span>📊 {(testimonials || []).length} testimonial{(testimonials || []).length !== 1 ? 's' : ''}</span>
                            <span>🎛️ {slidesToShow || 3} slides • {autoplay ? 'Auto' : 'Manual'}</span>
                            <span>📱 {responsive?.mobile?.slidesToShow || 1} | {responsive?.tablet?.slidesToShow || 2} | {responsive?.desktop?.slidesToShow || 3}</span>
                        </div>

                        {/* Add Button */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginBottom: '20px'
                        }}>
                            <Button onClick={addTestimonial} isPrimary>
                                Add Testimonial
                            </Button>
                        </div>

                        <div style={{ textAlign: 'left' }}>
                            {(testimonials || []).map((testimonial, index) => (
                                <div key={testimonial.id} style={{ 
                                    border: '1px solid #e1e5e9', 
                                    padding: '20px', 
                                    margin: '10px 0',
                                    backgroundColor: '#fff',
                                    borderRadius: '8px',
                                    position: 'relative',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                }}>
                                    {/* Delete button in top right corner */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '10px',
                                        right: '10px'
                                    }}>
                                        <Button 
                                            onClick={() => removeTestimonial(index)}
                                            isDestructive
                                            isSmall
                                            style={{ 
                                                padding: '4px 8px',
                                                fontSize: '11px',
                                                minHeight: 'auto'
                                            }}
                                        >
                                            ✕
                                        </Button>
                                    </div>

                                    {/* Avatar at top center */}
                                    <div style={{
                                        textAlign: 'center',
                                        marginBottom: '15px',
                                        marginTop: '10px'
                                    }}>
                                        <div style={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '50%',
                                            backgroundColor: '#007cba',
                                            color: '#fff',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '20px',
                                            fontWeight: 'bold'
                                        }}>
                                            {testimonial.name.charAt(0).toUpperCase()}
                                        </div>
                                    </div>

                                    {/* Full width input fields */}
                                    <div style={{ width: '100%' }}>
                                        <TextControl
                                            label="Name"
                                            value={testimonial.name}
                                            onChange={(value) => updateTestimonial(index, 'name', value)}
                                            style={{ marginBottom: '10px', width: '100%' }}
                                        />
                                        <TextControl
                                            label="Company"
                                            value={testimonial.company}
                                            onChange={(value) => updateTestimonial(index, 'company', value)}
                                            style={{ marginBottom: '10px', width: '100%' }}
                                        />
                                        <TextareaControl
                                            label="Testimonial Text"
                                            value={testimonial.text}
                                            onChange={(value) => updateTestimonial(index, 'text', value)}
                                            rows={3}
                                            style={{ marginBottom: '10px', width: '100%' }}
                                        />
                                        <TextControl
                                            label="Date"
                                            value={testimonial.date || ''}
                                            onChange={(value) => updateTestimonial(index, 'date', value)}
                                            placeholder="MM-DD-YYYY"
                                            style={{ width: '100%' }}
                                        />
                                    </div>
                                </div>
                            ))}
                            
                            {(testimonials || []).length === 0 && (
                                <div style={{
                                    textAlign: 'center',
                                    padding: '40px 20px',
                                    color: '#999',
                                    fontSize: '14px',
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '8px',
                                    border: '2px dashed #ddd'
                                }}>
                                    <p style={{ margin: '0 0 10px 0' }}>📝 No testimonials added yet</p>
                                    <p style={{ margin: '0', fontSize: '12px' }}>Click "Add" to create your first testimonial</p>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Hidden template for validation - same as save function */}
                    <div style={{ display: 'none' }}>
                        <div
                            dangerouslySetInnerHTML={{ 
                                __html: generateTestimonialHTML({
                                    uniqueId,
                                    blockTitle,
                                    testimonials: testimonials || [],
                                    slickConfig: generateSlickConfig(slidesToShow || 3, autoplay, autoplaySpeed, showArrows, showDots, responsive),
                                    slideBackground,
                                    titleColor,
                                    textColor,
                                    borderColor,
                                    borderWidth,
                                    borderRadius,
                                    slideGap,
                                    arrowTheme,
                                    dotColor,
                                    dotActiveColor,
                                    sliderStyle,
                                    wordLimit,
                                    showDate,
                                    showRating
                                })
                            }}
                        />
                    </div>
                </div>
            </>
        );
    },

    save({ attributes }) {
        const { 
            uniqueId, 
            testimonials, 
            blockTitle, 
            slidesToShow,
            autoplay,
            autoplaySpeed,
            showArrows,
            showDots, 
            sliderStyle, 
            responsive,
            wordLimit,
            showDate,
            showRating,
            slideBackground,
            titleColor,
            textColor,
            borderColor,
            borderWidth,
            borderRadius,
            slideGap,
            arrowTheme,
            dotColor,
            dotActiveColor
        } = attributes;
        
        const blockProps = useBlockProps.save();

        // Generate Slick slider configuration using helper function
        // Use the user's "Slides to Show" setting as the main value
        const slickConfig = generateSlickConfig(slidesToShow || 3, autoplay, autoplaySpeed, showArrows, showDots, responsive);

        // Use the template to generate HTML
        const templateData = {
            uniqueId,
            blockTitle,
            testimonials: testimonials || [],
            slickConfig,
            slideBackground,
            titleColor,
            textColor,
            borderColor,
            borderWidth,
            borderRadius,
            slideGap,
            arrowTheme,
            dotColor,
            dotActiveColor,
            sliderStyle,
            wordLimit,
            showDate,
            showRating
        };

        return (
            <div 
                {...blockProps}
                dangerouslySetInnerHTML={{ 
                    __html: generateTestimonialHTML(templateData) 
                }}
            />
        );
    },

    // Handle legacy markup with 2/2/2 responsive values
    deprecated: [
        {
            attributes: {
                uniqueId: { type: 'string', default: '' },
                testimonials: { type: 'array', default: [] },
                blockTitle: { type: 'string', default: '' },
                slidesToShow: { type: 'number', default: 3 },
                autoplay: { type: 'boolean', default: true },
                autoplaySpeed: { type: 'number', default: 3000 },
                showArrows: { type: 'boolean', default: false },
                showDots: { type: 'boolean', default: true },
                sliderStyle: { type: 'string', default: 'default' },
                responsive: { type: 'object', default: {} },
                wordLimit: { type: 'number', default: 20 },
                showDate: { type: 'boolean', default: false },
                showRating: { type: 'boolean', default: true },
                slideBackground: { type: 'string', default: '#ffffff' },
                titleColor: { type: 'string', default: '#333333' },
                textColor: { type: 'string', default: '#666666' },
                borderColor: { type: 'string', default: '#e0e0e0' },
                borderWidth: { type: 'number', default: 1 },
                borderRadius: { type: 'number', default: 8 },
                slideGap: { type: 'number', default: 20 },
                arrowTheme: { type: 'string', default: 'light' },
                dotColor: { type: 'string', default: '#D0D7E0' },
                dotActiveColor: { type: 'string', default: '#007cba' }
            },

            save({ attributes }) {
                const {
                    uniqueId, testimonials, blockTitle,
                    autoplay, autoplaySpeed, showArrows, showDots,
                    sliderStyle, wordLimit, showDate, showRating,
                    slideBackground, titleColor, textColor,
                    borderColor, borderWidth, borderRadius, slideGap,
                    arrowTheme, dotColor, dotActiveColor
                } = attributes;

                // Legacy 2/2/2 responsive config (matching existing post content)
                const legacyResponsive = {
                    desktop: { slidesToShow: 2, slidesToScroll: 1 },
                    tablet: { slidesToShow: 2, slidesToScroll: 1 },
                    mobile: { slidesToShow: 2, slidesToScroll: 1 }
                };

                const slickConfig = {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    fade: false,
                    dots: showDots,
                    autoplay,
                    autoplaySpeed,
                    arrows: showArrows,
                    infinite: true,
                    responsive: [
                        { breakpoint: 1024, settings: legacyResponsive.desktop },
                        { breakpoint: 768, settings: legacyResponsive.tablet },
                        { breakpoint: 600, settings: legacyResponsive.mobile }
                    ]
                };

                const blockProps = useBlockProps.save();
                const templateData = {
                    uniqueId, blockTitle,
                    testimonials: testimonials || [],
                    slickConfig, slideBackground, titleColor, textColor,
                    borderColor, borderWidth, borderRadius, slideGap,
                    arrowTheme, dotColor, dotActiveColor, sliderStyle,
                    wordLimit, showDate, showRating
                };

                return (
                    <div {...blockProps}
                        dangerouslySetInnerHTML={{ __html: generateTestimonialHTML(templateData) }}
                    />
                );
            }
        }
    ]
});