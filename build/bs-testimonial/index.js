/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/bs-testimonial/index.js":
/*!*************************************!*\
  !*** ./src/bs-testimonial/index.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./template */ "./src/bs-testimonial/template.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./style.css */ "./src/bs-testimonial/style.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);








// Helper function to generate consistent Slick configuration

const generateSlickConfig = (slidesToShow, autoplay, autoplaySpeed, showArrows, showDots, responsive) => {
  // Create responsive config in descending order (larger to smaller breakpoints)
  const responsiveConfig = [];

  // Default responsive values
  const defaultResponsive = {
    desktop: {
      slidesToShow: 3,
      slidesToScroll: 1
    },
    tablet: {
      slidesToShow: 2,
      slidesToScroll: 1
    },
    mobile: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
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
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('bootstrap-blocks/bs-testimonial', {
  edit({
    attributes,
    setAttributes,
    clientId
  }) {
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
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)();

    // State for active responsive tab
    const [activeTab, setActiveTab] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)('mobile');

    // Generate unique ID based on clientId
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
      const generatedId = 'emg-bs-testimonial-' + clientId.replace(/[^a-zA-Z0-9]/g, '');
      if (uniqueId !== generatedId) {
        setAttributes({
          uniqueId: generatedId
        });
      }
    }, [clientId, setAttributes, uniqueId]);

    // Initialize responsive values if not set (only on mount)
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
      if (!responsive || Object.keys(responsive).length === 0) {
        const defaultResponsive = {
          mobile: {
            slidesToShow: 1,
            slidesToScroll: 1,
            minWidth: 600
          },
          tablet: {
            slidesToShow: 2,
            slidesToScroll: 1,
            minWidth: 768
          },
          desktop: {
            slidesToShow: 3,
            slidesToScroll: 1,
            minWidth: 1024
          }
        };
        setAttributes({
          responsive: defaultResponsive
        });
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
      setAttributes({
        testimonials: updatedTestimonials
      });
    };

    // Remove testimonial
    const removeTestimonial = index => {
      const updatedTestimonials = (testimonials || []).filter((_, i) => i !== index);
      setAttributes({
        testimonials: updatedTestimonials
      });
    };

    // Update responsive value
    const updateResponsiveValue = (breakpoint, field, value) => {
      const updatedResponsive = {
        ...responsive
      };
      if (!updatedResponsive[breakpoint]) {
        updatedResponsive[breakpoint] = {};
      }
      updatedResponsive[breakpoint][field] = value;
      setAttributes({
        responsive: updatedResponsive
      });
    };

    // Get default responsive values
    const getDefaultResponsiveValue = (breakpoint, field) => {
      const defaults = {
        mobile: {
          slidesToShow: 1,
          slidesToScroll: 1
        },
        tablet: {
          slidesToShow: 2,
          slidesToScroll: 1
        },
        desktop: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      };
      return defaults[breakpoint]?.[field] || 1;
    };

    // Breakpoint tabs
    const breakpoints = [{
      name: 'mobile',
      label: 'Mobile',
      minWidth: 600
    }, {
      name: 'tablet',
      label: 'Tablet',
      minWidth: 768
    }, {
      name: 'desktop',
      label: 'Desktop',
      minWidth: 1024
    }];
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
          title: "Slider Settings",
          initialOpen: false,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("h4", {
            style: {
              margin: '0 0 12px 0',
              fontSize: '13px',
              fontWeight: '600'
            },
            children: "Slider Configuration"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
            label: "Slides to Show",
            value: slidesToShow || 3,
            onChange: value => setAttributes({
              slidesToShow: value
            }),
            min: 1,
            max: 6
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
            label: "Autoplay",
            checked: autoplay,
            onChange: value => setAttributes({
              autoplay: value
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
            label: "Autoplay Speed (seconds)",
            value: Math.round((autoplaySpeed || 3000) / 1000),
            onChange: value => setAttributes({
              autoplaySpeed: value * 1000
            }),
            min: 1,
            max: 10,
            step: 1
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
            label: "Slider Style",
            value: sliderStyle,
            options: [{
              label: 'Default',
              value: 'default'
            }, {
              label: 'Card Style',
              value: 'card'
            }, {
              label: 'Minimal',
              value: 'minimal'
            }],
            onChange: value => setAttributes({
              sliderStyle: value
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("h4", {
            style: {
              margin: '16px 0 12px 0',
              fontSize: '13px',
              fontWeight: '600'
            },
            children: "Content Settings"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
            label: "Word Limit (before 'Read More')",
            value: wordLimit,
            onChange: value => setAttributes({
              wordLimit: value
            }),
            min: 5,
            max: 200,
            help: "Set the number of words to show before displaying 'Read More' button"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
            label: "Show Rating Stars",
            checked: showRating,
            onChange: value => setAttributes({
              showRating: value
            }),
            help: "Toggle the display of 5-star rating"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
            label: "Show Date",
            checked: showDate,
            onChange: value => setAttributes({
              showDate: value
            }),
            help: "Toggle the display of testimonial date"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
          title: "Style Settings",
          initialOpen: false,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
            style: {
              marginBottom: '16px'
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("h4", {
              style: {
                margin: '0 0 12px 0',
                fontSize: '13px',
                fontWeight: '600'
              },
              children: "Colors"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
              style: {
                marginBottom: '16px'
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
                label: "Slide Background Color",
                value: slideBackground || '#ffffff',
                onChange: value => setAttributes({
                  slideBackground: value
                }),
                placeholder: "#ffffff",
                help: "Enter hex color code (e.g., #ffffff)"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
                label: "Title Color",
                value: titleColor || '#333333',
                onChange: value => setAttributes({
                  titleColor: value
                }),
                placeholder: "#333333",
                help: "Enter hex color code (e.g., #333333)"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
                label: "Text Color",
                value: textColor || '#666666',
                onChange: value => setAttributes({
                  textColor: value
                }),
                placeholder: "#666666",
                help: "Enter hex color code (e.g., #666666)"
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("h4", {
              style: {
                margin: '0 0 12px 0',
                fontSize: '13px',
                fontWeight: '600'
              },
              children: "Border & Spacing"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
              style: {
                marginBottom: '16px'
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
                label: "Border Color",
                value: borderColor || '#e0e0e0',
                onChange: value => setAttributes({
                  borderColor: value
                }),
                placeholder: "#e0e0e0",
                help: "Enter hex color code (e.g., #e0e0e0)"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
                label: "Border Width (px)",
                value: borderWidth || 1,
                onChange: value => setAttributes({
                  borderWidth: value
                }),
                min: 0,
                max: 10
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
              label: "Border Radius (px)",
              value: borderRadius || 8,
              onChange: value => setAttributes({
                borderRadius: value
              }),
              min: 0,
              max: 50
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
              label: "Slide Gap (px)",
              value: slideGap || 20,
              onChange: value => setAttributes({
                slideGap: value
              }),
              min: 0,
              max: 50
            })]
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
          title: "Navigation Settings",
          initialOpen: false,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
            style: {
              marginBottom: '16px'
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("h4", {
              style: {
                margin: '0 0 12px 0',
                fontSize: '13px',
                fontWeight: '600'
              },
              children: "Navigation Controls"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
              label: "Show Arrows",
              checked: showArrows,
              onChange: value => setAttributes({
                showArrows: value
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
              label: "Show Dots",
              checked: showDots,
              onChange: value => setAttributes({
                showDots: value
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("h4", {
              style: {
                margin: '16px 0 12px 0',
                fontSize: '13px',
                fontWeight: '600'
              },
              children: "Arrow Styling"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
              label: "Arrow Color Theme",
              value: arrowTheme || 'light',
              options: [{
                label: 'Light Theme',
                value: 'light'
              }, {
                label: 'Dark Theme',
                value: 'dark'
              }],
              onChange: value => setAttributes({
                arrowTheme: value
              }),
              help: "Choose between light or dark arrow icons"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("h4", {
              style: {
                margin: '16px 0 12px 0',
                fontSize: '13px',
                fontWeight: '600'
              },
              children: "Dot Styling"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
              label: "Dots Color",
              value: dotColor || '#D0D7E0',
              onChange: value => setAttributes({
                dotColor: value
              }),
              placeholder: "#D0D7E0",
              help: "Enter hex color code (e.g., #D0D7E0)"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
              label: "Dot Active Color",
              value: dotActiveColor || '#007cba',
              onChange: value => setAttributes({
                dotActiveColor: value
              }),
              placeholder: "#007cba",
              help: "Enter hex color code (e.g., #007cba)"
            })]
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
          title: "Responsive Settings",
          initialOpen: false,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
            style: {
              marginBottom: '16px'
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
              style: {
                display: 'flex',
                gap: '6px',
                marginBottom: '12px'
              },
              children: breakpoints.map(bp => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("button", {
                onClick: () => setActiveTab(bp.name),
                style: {
                  padding: '6px 10px',
                  border: '1px solid #ddd',
                  background: activeTab === bp.name ? '#007cba' : '#fff',
                  color: activeTab === bp.name ? '#fff' : '#333',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '500'
                },
                children: bp.label
              }, bp.name))
            }), breakpoints.map(bp => {
              var _responsive$bp$name$s, _responsive$bp$name$s2;
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
                style: {
                  display: activeTab === bp.name ? 'block' : 'none'
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
                  label: `Slides to Show (${bp.label})`,
                  value: (_responsive$bp$name$s = responsive?.[bp.name]?.slidesToShow) !== null && _responsive$bp$name$s !== void 0 ? _responsive$bp$name$s : getDefaultResponsiveValue(bp.name, 'slidesToShow'),
                  onChange: value => updateResponsiveValue(bp.name, 'slidesToShow', value),
                  min: 1,
                  max: 6
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
                  label: `Slides to Scroll (${bp.label})`,
                  value: (_responsive$bp$name$s2 = responsive?.[bp.name]?.slidesToScroll) !== null && _responsive$bp$name$s2 !== void 0 ? _responsive$bp$name$s2 : getDefaultResponsiveValue(bp.name, 'slidesToScroll'),
                  onChange: value => updateResponsiveValue(bp.name, 'slidesToScroll', value),
                  min: 1,
                  max: 3
                })]
              }, bp.name);
            })]
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
        ...blockProps,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
          style: {
            padding: '20px',
            border: '2px dashed #ccc',
            textAlign: 'center',
            backgroundColor: '#f9f9f9'
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
            style: {
              textAlign: 'center',
              marginBottom: '20px'
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("h3", {
              style: {
                margin: '0 0 10px 0',
                color: '#007cba'
              },
              children: "\uD83D\uDCDD Testimonial Slider"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 15px',
              backgroundColor: '#f8f9fa',
              borderRadius: '6px',
              marginBottom: '20px',
              fontSize: '12px',
              color: '#666'
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("span", {
              children: ["\uD83D\uDCCA ", (testimonials || []).length, " testimonial", (testimonials || []).length !== 1 ? 's' : '']
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("span", {
              children: ["\uD83C\uDF9B\uFE0F ", slidesToShow || 3, " slides \u2022 ", autoplay ? 'Auto' : 'Manual']
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("span", {
              children: ["\uD83D\uDCF1 ", responsive?.mobile?.slidesToShow || 1, " | ", responsive?.tablet?.slidesToShow || 2, " | ", responsive?.desktop?.slidesToShow || 3]
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
            style: {
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '20px'
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
              onClick: addTestimonial,
              isPrimary: true,
              children: "Add Testimonial"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
            style: {
              textAlign: 'left'
            },
            children: [(testimonials || []).map((testimonial, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
              style: {
                border: '1px solid #e1e5e9',
                padding: '20px',
                margin: '10px 0',
                backgroundColor: '#fff',
                borderRadius: '8px',
                position: 'relative',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
                style: {
                  position: 'absolute',
                  top: '10px',
                  right: '10px'
                },
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
                  onClick: () => removeTestimonial(index),
                  isDestructive: true,
                  isSmall: true,
                  style: {
                    padding: '4px 8px',
                    fontSize: '11px',
                    minHeight: 'auto'
                  },
                  children: "\u2715"
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
                style: {
                  textAlign: 'center',
                  marginBottom: '15px',
                  marginTop: '10px'
                },
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
                  style: {
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
                  },
                  children: testimonial.name.charAt(0).toUpperCase()
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
                style: {
                  width: '100%'
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
                  label: "Name",
                  value: testimonial.name,
                  onChange: value => updateTestimonial(index, 'name', value),
                  style: {
                    marginBottom: '10px',
                    width: '100%'
                  }
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
                  label: "Company",
                  value: testimonial.company,
                  onChange: value => updateTestimonial(index, 'company', value),
                  style: {
                    marginBottom: '10px',
                    width: '100%'
                  }
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextareaControl, {
                  label: "Testimonial Text",
                  value: testimonial.text,
                  onChange: value => updateTestimonial(index, 'text', value),
                  rows: 3,
                  style: {
                    marginBottom: '10px',
                    width: '100%'
                  }
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
                  label: "Date",
                  value: testimonial.date || '',
                  onChange: value => updateTestimonial(index, 'date', value),
                  placeholder: "MM-DD-YYYY",
                  style: {
                    width: '100%'
                  }
                })]
              })]
            }, testimonial.id)), (testimonials || []).length === 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
              style: {
                textAlign: 'center',
                padding: '40px 20px',
                color: '#999',
                fontSize: '14px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '2px dashed #ddd'
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("p", {
                style: {
                  margin: '0 0 10px 0'
                },
                children: "\uD83D\uDCDD No testimonials added yet"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("p", {
                style: {
                  margin: '0',
                  fontSize: '12px'
                },
                children: "Click \"Add\" to create your first testimonial"
              })]
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
          style: {
            display: 'none'
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
            dangerouslySetInnerHTML: {
              __html: (0,_template__WEBPACK_IMPORTED_MODULE_5__.generateTestimonialHTML)({
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
            }
          })
        })]
      })]
    });
  },
  save({
    attributes
  }) {
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
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save();

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
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
      ...blockProps,
      dangerouslySetInnerHTML: {
        __html: (0,_template__WEBPACK_IMPORTED_MODULE_5__.generateTestimonialHTML)(templateData)
      }
    });
  },
  // Handle legacy markup with 2/2/2 responsive values
  deprecated: [{
    attributes: {
      uniqueId: {
        type: 'string',
        default: ''
      },
      testimonials: {
        type: 'array',
        default: []
      },
      blockTitle: {
        type: 'string',
        default: ''
      },
      slidesToShow: {
        type: 'number',
        default: 3
      },
      autoplay: {
        type: 'boolean',
        default: true
      },
      autoplaySpeed: {
        type: 'number',
        default: 3000
      },
      showArrows: {
        type: 'boolean',
        default: false
      },
      showDots: {
        type: 'boolean',
        default: true
      },
      sliderStyle: {
        type: 'string',
        default: 'default'
      },
      responsive: {
        type: 'object',
        default: {}
      },
      wordLimit: {
        type: 'number',
        default: 20
      },
      showDate: {
        type: 'boolean',
        default: false
      },
      showRating: {
        type: 'boolean',
        default: true
      },
      slideBackground: {
        type: 'string',
        default: '#ffffff'
      },
      titleColor: {
        type: 'string',
        default: '#333333'
      },
      textColor: {
        type: 'string',
        default: '#666666'
      },
      borderColor: {
        type: 'string',
        default: '#e0e0e0'
      },
      borderWidth: {
        type: 'number',
        default: 1
      },
      borderRadius: {
        type: 'number',
        default: 8
      },
      slideGap: {
        type: 'number',
        default: 20
      },
      arrowTheme: {
        type: 'string',
        default: 'light'
      },
      dotColor: {
        type: 'string',
        default: '#D0D7E0'
      },
      dotActiveColor: {
        type: 'string',
        default: '#007cba'
      }
    },
    save({
      attributes
    }) {
      const {
        uniqueId,
        testimonials,
        blockTitle,
        autoplay,
        autoplaySpeed,
        showArrows,
        showDots,
        sliderStyle,
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

      // Legacy 2/2/2 responsive config (matching existing post content)
      const legacyResponsive = {
        desktop: {
          slidesToShow: 2,
          slidesToScroll: 1
        },
        tablet: {
          slidesToShow: 2,
          slidesToScroll: 1
        },
        mobile: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
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
        responsive: [{
          breakpoint: 1024,
          settings: legacyResponsive.desktop
        }, {
          breakpoint: 768,
          settings: legacyResponsive.tablet
        }, {
          breakpoint: 600,
          settings: legacyResponsive.mobile
        }]
      };
      const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save();
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
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
        ...blockProps,
        dangerouslySetInnerHTML: {
          __html: (0,_template__WEBPACK_IMPORTED_MODULE_5__.generateTestimonialHTML)(templateData)
        }
      });
    }
  }]
});

/***/ }),

/***/ "./src/bs-testimonial/style.css":
/*!**************************************!*\
  !*** ./src/bs-testimonial/style.css ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/bs-testimonial/template.js":
/*!****************************************!*\
  !*** ./src/bs-testimonial/template.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateCardTemplate: () => (/* binding */ generateCardTemplate),
/* harmony export */   generateMinimalTemplate: () => (/* binding */ generateMinimalTemplate),
/* harmony export */   generateTestimonialHTML: () => (/* binding */ generateTestimonialHTML)
/* harmony export */ });
/**
 * BS Testimonial Slider HTML Template
 * 
 * This file contains the HTML template for the testimonial slider output.
 * You can modify the HTML structure here while keeping the data intact.
 * 
 * Available data variables:
 * - uniqueId: Unique identifier for the block
 * - blockTitle: Title of the testimonial block
 * - testimonials: Array of testimonial objects
 * - slickConfig: Slick slider configuration object
 * - sliderStyle: Current slider style (default, card, minimal)
 * - slideBackground: Background color for slides
 * - titleColor: Color for testimonial titles
 * - textColor: Color for testimonial text
 * - borderColor: Border color for slides
 * - borderWidth: Border width in pixels
 * - borderRadius: Border radius in pixels
 * - slideGap: Gap between slides in pixels
 */

// Helper function to get random background color for customer thumb
const getRandomBackgroundColor = name => {
  // Use name to generate consistent color for same person
  const colors = ['#2C3E50',
  // Dark Blue Gray
  '#E74C3C',
  // Dark Red
  '#8E44AD',
  // Dark Purple
  '#27AE60',
  // Dark Green
  '#F39C12',
  // Dark Orange
  '#34495E',
  // Dark Gray Blue
  '#D35400',
  // Dark Brown Orange
  '#2980B9',
  // Dark Blue
  '#16A085',
  // Dark Teal
  '#7F8C8D',
  // Dark Gray
  '#C0392B',
  // Dark Red
  '#8B4513',
  // Dark Brown
  '#2F4F4F',
  // Dark Slate Gray
  '#8B008B',
  // Dark Magenta
  '#006400' // Dark Green
  ];

  // Generate consistent index based on name
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

// Helper function to truncate text and generate Read More functionality
const generateReadMoreText = (text, wordLimit, testimonialId, uniqueId, textColor = '#666666') => {
  const words = text.split(' ');
  const limit = wordLimit || 20;
  if (words.length <= limit) {
    return `<div class="p mb-0 lh-15" style="font-size:16px; color: ${textColor};">${text}</div>`;
  }
  const truncatedText = words.slice(0, limit).join(' ');
  const remainingText = words.slice(limit).join(' ');
  return `
        <div class="p mb-0 lh-15" style="font-size:16px; color: ${textColor};">
            <span class="testimonial-text-short">${truncatedText}</span>
            <span class="testimonial-text-full" style="display: none;">${text}</span>
            <span class="testimonial-read-more" style="color: #007cba; cursor: pointer; text-decoration: underline;" data-testimonial-id="${testimonialId}" data-block-id="${uniqueId}">Read more</span>
        </div>
    `;
};
const generateTestimonialHTML = data => {
  const {
    uniqueId,
    blockTitle,
    testimonials,
    slickConfig,
    sliderStyle,
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
  } = data;

  // Generate individual testimonial HTML
  const testimonialSlides = testimonials.map((testimonial, index) => `
        <div class="bsb-review" style="
            background-color: ${slideBackground || '#ffffff'};
            border: ${borderWidth || 1}px solid ${borderColor || '#e0e0e0'};
            border-radius: ${borderRadius || 8}px;
            margin: 0 ${(slideGap || 20) / 2}px;
        ">
            <div class="d-flex align-items-center justify-content-start mb-3">
                <span class="customer-thumb mr-2 me-2" style="background-color: ${getRandomBackgroundColor(testimonial.name)};">
                    ${testimonial.name.charAt(0).toUpperCase()}
                </span>
                <div class="customer-info">
                    <h6 class="font-700 lh-13 mb-0" style="color: ${titleColor || '#333333'};">
                        ${testimonial.name}
                    </h6>
                </div>
            </div>

            ${showRating !== false ? `<div class="rating-star mb-2"></div>` : ''}

            ${generateReadMoreText(testimonial.text, wordLimit, `testimonial-${uniqueId}-${index}`, uniqueId, textColor)}
            
            ${showDate !== false && testimonial.date ? `
                <div class="testimonial-date mt-2" style="font-size:14px; color: ${textColor || '#666666'};">
                    ${testimonial.date}
                </div>
            ` : ''}
        </div>
    `).join('');

  // Wrap testimonials in Slick slider container with theme class
  const themeClass = `bs-theme-${arrowTheme || 'light'}`;
  return `
        <div class="bsb-slider-nav bsb-reviews ${themeClass} ${uniqueId}">
            ${testimonialSlides}
        </div>
        <style>
            .${uniqueId}.bsb-reviews .slick-dots li button {
                background-color: ${dotColor || '#D0D7E0'} !important;
            }
            .${uniqueId}.bsb-reviews .slick-dots li.slick-active button {
                background-color: ${dotActiveColor || '#007cba'} !important;
            }
        </style>
        <script>
            jQuery(document).ready(function($) {
                if ($.fn.slick) {
                    $('.${uniqueId}').slick(${JSON.stringify(slickConfig)});
                }
            });
        </script>
    `;
};

/**
 * Alternative template examples you can use:
 */

// Minimal template
const generateMinimalTemplate = data => {
  const {
    uniqueId,
    testimonials,
    slickConfig
  } = data;
  return `
        <div class="testimonial-minimal ${uniqueId}" data-slick-config='${JSON.stringify(slickConfig)}'>
            ${testimonials.map(testimonial => `
                <div class="testimonial-item">
                    <p class="testimonial-quote">"${testimonial.text}"</p>
                    <div class="testimonial-author">
                        <strong>${testimonial.name}</strong> - ${testimonial.company}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
};

// Card template
const generateCardTemplate = data => {
  const {
    uniqueId,
    blockTitle,
    testimonials,
    slickConfig
  } = data;
  return `
        <div class="testimonial-cards ${uniqueId}" data-slick-config='${JSON.stringify(slickConfig)}'>
            ${blockTitle ? `<h3 class="testimonial-section-title">${blockTitle}</h3>` : ''}
            <div class="testimonial-grid">
                ${testimonials.map(testimonial => `
                    <div class="testimonial-card">
                        <div class="card-header">
                            <div class="author-avatar">
                                ${testimonial.avatar ? `<img src="${testimonial.avatar}" alt="${testimonial.name}" />` : `<span class="avatar-initial">${testimonial.name.charAt(0).toUpperCase()}</span>`}
                            </div>
                            <div class="author-info">
                                <h4>${testimonial.name}</h4>
                                <p>${testimonial.company}</p>
                            </div>
                        </div>
                        <div class="card-content">
                            <blockquote>"${testimonial.text}"</blockquote>
                        </div>
                        ${testimonial.date ? `<div class="card-footer"><small>${testimonial.date}</small></div>` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
};

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"bs-testimonial": 0,
/******/ 			"./style-bs-testimonial": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkbootstrap_blocks"] = globalThis["webpackChunkbootstrap_blocks"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-bs-testimonial"], () => (__webpack_require__("./src/bs-testimonial/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map