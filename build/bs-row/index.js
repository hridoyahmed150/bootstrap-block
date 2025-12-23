/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/bs-row/index.js":
/*!*****************************!*\
  !*** ./src/bs-row/index.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./style.css */ "./src/bs-row/style.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);







(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('bootstrap-blocks/bs-row', {
  edit({
    attributes,
    setAttributes,
    clientId
  }) {
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
    const [activeAlignmentTab, setActiveAlignmentTab] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)('default');

    // Helper function to get effective alignment value with cascading inheritance
    const getEffectiveAlignmentValue = breakpoint => {
      const alignment = rowAlignment || {
        default: '',
        sm: '',
        md: '',
        lg: '',
        xl: '',
        xxl: ''
      };
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
      const alignment = rowAlignment || {
        default: '',
        sm: '',
        md: '',
        lg: '',
        xl: '',
        xxl: ''
      };
      const breakpointOrder = ['default', 'sm', 'md', 'lg', 'xl', 'xxl'];
      const classes = [];

      // Get effective values for all breakpoints
      const effectiveValues = breakpointOrder.map(bp => ({
        breakpoint: bp,
        value: getEffectiveAlignmentValue(bp)
      }));

      // Track previous value to only output classes when they differ
      let prevValue = '';
      effectiveValues.forEach(({
        breakpoint,
        value
      }) => {
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
      (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.dispatch)('core/block-editor').insertBlocks((0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.createBlock)('bootstrap-blocks/bs-column', {}), undefined, clientId);
    };

    // Remove this row
    const removeThisRow = () => {
      (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.dispatch)('core/block-editor').removeBlock(clientId);
    };

    // Count columns and force re-render when count changes
    const columnCount = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.select)('core/block-editor').getBlockOrder(clientId)?.length || 0;

    // Count rows in parent section to determine if Remove button should show (reactive)
    const totalRowCount = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
      const {
        getBlockRootClientId,
        getBlockOrder
      } = select('core/block-editor');
      const parentId = getBlockRootClientId(clientId);
      if (parentId) {
        const siblingRows = getBlockOrder(parentId);
        return siblingRows?.length || 1;
      }
      return 1;
    }, [clientId]);
    const showRemoveButton = totalRowCount > 1;

    // Update column widths when count changes
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
      const {
        updateBlockAttributes
      } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.dispatch)('core/block-editor');
      const childBlockIds = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.select)('core/block-editor').getBlockOrder(clientId);

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
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
          title: "Row Settings",
          initialOpen: true,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            style: {
              marginBottom: '20px'
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
              style: {
                display: 'block',
                marginBottom: '12px',
                fontWeight: '600'
              },
              children: "Row Alignment"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TabPanel, {
              className: "bootstrap-spacing-tabs",
              activeClass: "active-tab",
              onSelect: setActiveAlignmentTab,
              tabs: [{
                name: 'default',
                title: 'Default'
              }, {
                name: 'sm',
                title: 'SM'
              }, {
                name: 'md',
                title: 'MD'
              }, {
                name: 'lg',
                title: 'LG'
              }, {
                name: 'xl',
                title: 'XL'
              }, {
                name: 'xxl',
                title: 'XXL'
              }],
              children: tab => {
                const currentAlignment = rowAlignment || {
                  default: '',
                  sm: '',
                  md: '',
                  lg: '',
                  xl: '',
                  xxl: ''
                };
                const currentValue = getEffectiveAlignmentValue(tab.name);
                return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
                    label: "Alignment",
                    value: currentValue,
                    options: [{
                      label: 'Default / None',
                      value: ''
                    }, {
                      label: 'Start',
                      value: 'start'
                    }, {
                      label: 'Center',
                      value: 'center'
                    }, {
                      label: 'End',
                      value: 'end'
                    }],
                    onChange: value => {
                      const breakpointOrder = ['default', 'sm', 'md', 'lg', 'xl', 'xxl'];
                      const currentIndex = breakpointOrder.indexOf(tab.name);
                      const updates = {
                        ...currentAlignment
                      };

                      // Update the current breakpoint
                      updates[tab.name] = value;

                      // Cascade to all higher breakpoints
                      for (let i = currentIndex + 1; i < breakpointOrder.length; i++) {
                        const bp = breakpointOrder[i];
                        updates[bp] = value;
                      }
                      setAttributes({
                        rowAlignment: updates
                      });
                    }
                  })
                });
              }
            })]
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
          title: "Container Settings",
          initialOpen: false,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
            label: "Container Width",
            value: containerWidth || 'full-width',
            options: [{
              label: 'Full Width',
              value: 'full-width'
            }, {
              label: 'Wide (1400px)',
              value: 'wide'
            }, {
              label: 'Boxed (1200px)',
              value: 'boxed'
            }, {
              label: 'Custom',
              value: 'custom'
            }],
            onChange: value => setAttributes({
              containerWidth: value
            })
          }), containerWidth === 'custom' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
            label: "Custom Width (px)",
            value: containerWidthCustom || 1200,
            onChange: value => setAttributes({
              containerWidthCustom: value
            }),
            min: 300,
            max: 2000,
            step: 10
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
            label: "Custom Container Classes",
            value: containerClassName || '',
            onChange: value => setAttributes({
              containerClassName: value
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
          title: "Animation",
          initialOpen: false,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
            label: "Enable Animation for Row",
            checked: rowAnimationEnabled || false,
            onChange: value => {
              const updates = {
                rowAnimationEnabled: value
              };
              // Auto-set defaults when enabling
              if (value && !animationName) {
                updates.animationName = 'fade-up';
                updates.animationDuration = 1000;
                updates.animationDelay = 0;
              }
              setAttributes(updates);
            }
          }), rowAnimationEnabled && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
              label: "Animation Name",
              value: animationName || '',
              options: [{
                label: 'Select Animation',
                value: ''
              }, {
                label: 'Fade Up',
                value: 'fade-up'
              }, {
                label: 'Fade Down',
                value: 'fade-down'
              }, {
                label: 'Fade Left',
                value: 'fade-left'
              }, {
                label: 'Fade Right',
                value: 'fade-right'
              }, {
                label: 'Zoom In',
                value: 'zoom-in'
              }, {
                label: 'Zoom Out',
                value: 'zoom-out'
              }],
              onChange: value => setAttributes({
                animationName: value
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
              label: "Duration (ms)",
              value: animationDuration || 1000,
              onChange: value => setAttributes({
                animationDuration: value || 1000
              }),
              min: 100,
              max: 3000,
              step: 50
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
              label: "Delay (ms)",
              value: animationDelay || 0,
              onChange: value => setAttributes({
                animationDelay: value || 0
              }),
              min: 0,
              max: 3000,
              step: 50
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            style: {
              marginTop: '20px',
              paddingTop: '20px',
              borderTop: '1px solid #ddd'
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
              label: "Enable Child Animation",
              checked: childAnimationEnabled || false,
              onChange: value => {
                const updates = {
                  childAnimationEnabled: value
                };
                // Auto-set defaults when enabling
                if (value && !animationName) {
                  updates.animationName = 'fade-up';
                  updates.animationDuration = 1000;
                  updates.childAnimationInitialDelay = 0;
                  updates.childAnimationInterval = 0;
                }
                setAttributes(updates);
              }
            }), childAnimationEnabled && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
                label: "Initial Delay (ms)",
                value: childAnimationInitialDelay || 0,
                onChange: value => setAttributes({
                  childAnimationInitialDelay: value || 0
                }),
                min: 0,
                max: 3000,
                step: 50
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
                label: "Delay Interval (ms)",
                value: childAnimationInterval || 0,
                onChange: value => setAttributes({
                  childAnimationInterval: value || 0
                }),
                min: 0,
                max: 1000,
                step: 50
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
                style: {
                  fontSize: '12px',
                  color: '#666',
                  marginTop: '10px'
                },
                children: "Child animation will override column animation settings."
              })]
            })]
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
          style: {
            position: 'relative'
          }
        }),
        children: [showRemoveButton && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          style: {
            position: 'absolute',
            top: '8px',
            right: '8px',
            zIndex: 10
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
            onClick: removeThisRow,
            isDestructive: true,
            isSmall: true,
            style: {
              backgroundColor: '#dc3545',
              color: '#ffffff',
              border: '2px solid #ffffff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
              fontWeight: '600',
              textShadow: '0 1px 2px rgba(0,0,0,0.5)'
            },
            children: "Remove Row"
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          style: {
            marginBottom: '12px',
            padding: '8px 12px',
            backgroundColor: 'rgba(255, 179, 0, 0.1)',
            borderRadius: '4px'
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            style: {
              color: '#FFB300',
              fontWeight: 'bold',
              marginBottom: '4px',
              fontSize: '18px'
            },
            children: "BS Row"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            style: {
              display: 'flex',
              gap: '15px',
              alignItems: 'center'
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
              onClick: addColumn,
              isPrimary: true,
              children: "+ Add Column"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("span", {
              style: {
                color: '#FFB300'
              },
              children: ["Columns: ", columnCount]
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          className: ['container', containerClassName].filter(Boolean).join(' ').trim(),
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            className: rowClasses,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks, {
              allowedBlocks: ['bootstrap-blocks/bs-column'],
              template: [['bootstrap-blocks/bs-column', {}], ['bootstrap-blocks/bs-column', {}]],
              templateLock: false
            })
          })
        })]
      })]
    });
  },
  save({
    attributes
  }) {
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
    const getEffectiveAlignmentValue = breakpoint => {
      const alignment = rowAlignment || {
        default: '',
        sm: '',
        md: '',
        lg: '',
        xl: '',
        xxl: ''
      };
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
      const alignment = rowAlignment || {
        default: '',
        sm: '',
        md: '',
        lg: '',
        xl: '',
        xxl: ''
      };
      const breakpointOrder = ['default', 'sm', 'md', 'lg', 'xl', 'xxl'];
      const classes = [];
      const effectiveValues = breakpointOrder.map(bp => ({
        breakpoint: bp,
        value: getEffectiveAlignmentValue(bp)
      }));
      let prevValue = '';
      effectiveValues.forEach(({
        breakpoint,
        value
      }) => {
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
    const effectiveAnimationName = !childAnimationEnabled && rowAnimationEnabled ? animationName || 'fade-up' : '';
    const effectiveDuration = !childAnimationEnabled && rowAnimationEnabled ? animationDuration || 1000 : 0;
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
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      className: containerClasses,
      style: containerInlineStyles || undefined,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        className: rowClasses,
        ...rowAosAttributes,
        ...childAnimationAttributes,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, {})
      })
    });
  }
});

/***/ }),

/***/ "./src/bs-row/style.css":
/*!******************************!*\
  !*** ./src/bs-row/style.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

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
/******/ 			"bs-row": 0,
/******/ 			"./style-bs-row": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-bs-row"], () => (__webpack_require__("./src/bs-row/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map