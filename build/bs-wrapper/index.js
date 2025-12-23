/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/bs-wrapper/index.js":
/*!*********************************!*\
  !*** ./src/bs-wrapper/index.js ***!
  \*********************************/
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
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style.css */ "./src/bs-wrapper/style.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);






(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('emg/bs-wrapper', {
  edit({
    attributes,
    setAttributes,
    clientId
  }) {
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
    const [activePaddingTab, setActivePaddingTab] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)('default');

    // Generate unique ID based on clientId
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
      const generatedId = 'emg-bs-wrapper-' + clientId.replace(/[^a-zA-Z0-9]/g, '');
      if (uniqueId !== generatedId) {
        setAttributes({
          uniqueId: generatedId
        });
      }
    }, [clientId, setAttributes]);

    // Add CSS for textarea min-height in inspector sidebar
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
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
      const breakpoints = {
        default: defaultSpacing,
        sm,
        md,
        lg,
        xl,
        xxl
      };
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
      const sanitize = str => {
        return str.replace(/<\/?style[^>]*>/gi, '').replace(/<\/?script[^>]*>/gi, '').replace(/javascript:/gi, '');
      };

      // Sanitize selector helper
      const sanitizeSelector = str => {
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
      if (paddingTop > 0) css += `.${wrapperClass} { padding-top: ${Math.round(paddingTop * (1 / 3))}px; }\n`;
      if (paddingRight > 0) css += `.${wrapperClass} { padding-right: ${Math.round(paddingRight * (1 / 3))}px; }\n`;
      if (paddingBottom > 0) css += `.${wrapperClass} { padding-bottom: ${Math.round(paddingBottom * (1 / 3))}px; }\n`;
      if (paddingLeft > 0) css += `.${wrapperClass} { padding-left: ${Math.round(paddingLeft * (1 / 3))}px; }\n`;
      if (marginTop > 0) css += `.${wrapperClass} { margin-top: ${Math.round(marginTop * (1 / 3))}px; }\n`;
      if (marginRight > 0) css += `.${wrapperClass} { margin-right: ${Math.round(marginRight * (1 / 3))}px; }\n`;
      if (marginBottom > 0) css += `.${wrapperClass} { margin-bottom: ${Math.round(marginBottom * (1 / 3))}px; }\n`;
      if (marginLeft > 0) css += `.${wrapperClass} { margin-left: ${Math.round(marginLeft * (1 / 3))}px; }\n`;

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
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("style", {
        dangerouslySetInnerHTML: {
          __html: editorCSS
        }
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
          title: "Wrapper Settings",
          initialOpen: true,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
            className: "bs-wrapper-custom-css-wrapper",
            style: {
              minHeight: '280px'
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("style", {
              dangerouslySetInnerHTML: {
                __html: `
                                .bs-wrapper-custom-css-wrapper textarea,
                                .bs-wrapper-custom-css-wrapper .components-textarea-control__input {
                                    min-height: 280px !important;
                                }
                            `
              }
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextareaControl, {
              label: "Custom CSS",
              value: customCSS || '',
              onChange: value => setAttributes({
                customCSS: value
              }),
              help: "Supports wrapper CSS, selectors, hover states, and media queries. Examples: padding-left: 20px; h1@font-size: 82px; hover:h1@color:black; media|991:h1@font-size:62px;",
              rows: 4
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
            title: "Padding",
            initialOpen: true,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TabPanel, {
              className: "bootstrap-spacing-tabs",
              activeClass: "active-tab",
              onSelect: setActivePaddingTab,
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
              children: tab => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
                  label: "Top",
                  value: getEffectiveValue(tab.name, 'paddingTop'),
                  onChange: value => {
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
                  },
                  min: 0,
                  max: 200
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
                  label: "Right",
                  value: getEffectiveValue(tab.name, 'paddingRight'),
                  onChange: value => {
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
                  },
                  min: 0,
                  max: 200
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
                  label: "Bottom",
                  value: getEffectiveValue(tab.name, 'paddingBottom'),
                  onChange: value => {
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
                  },
                  min: 0,
                  max: 200
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
                  label: "Left",
                  value: getEffectiveValue(tab.name, 'paddingLeft'),
                  onChange: value => {
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
                  },
                  min: 0,
                  max: 200
                })]
              })
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
          title: "Animation",
          initialOpen: false,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
            label: "Enable Animation",
            checked: wrapperAnimationEnabled || false,
            onChange: value => {
              const updates = {
                wrapperAnimationEnabled: value
              };
              // Auto-set defaults when enabling
              if (value && !wrapperAnimationName) {
                updates.wrapperAnimationName = 'fade-up';
                updates.wrapperAnimationDuration = 1000;
                updates.wrapperAnimationDelay = 0;
              }
              setAttributes(updates);
            }
          }), wrapperAnimationEnabled && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
              label: "Animation Name",
              value: wrapperAnimationName || '',
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
                wrapperAnimationName: value
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
              label: "Duration (ms)",
              value: wrapperAnimationDuration || 1000,
              onChange: value => setAttributes({
                wrapperAnimationDuration: value || 1000
              }),
              min: 100,
              max: 3000,
              step: 50
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
              label: "Delay (ms)",
              value: wrapperAnimationDelay || 0,
              onChange: value => setAttributes({
                wrapperAnimationDelay: value || 0
              }),
              min: 0,
              max: 3000,
              step: 50
            })]
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
          className: combinedClassName
        }),
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks, {
          allowedBlocks: true,
          template: [],
          templateLock: false
        })
      })]
    });
  },
  save({
    attributes
  }) {
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
      const breakpoints = {
        default: defaultSpacing,
        sm,
        md,
        lg,
        xl,
        xxl
      };
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
      const sanitize = str => {
        return str.replace(/<\/?style[^>]*>/gi, '').replace(/<\/?script[^>]*>/gi, '').replace(/javascript:/gi, '');
      };

      // Sanitize selector helper
      const sanitizeSelector = str => {
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
      const breakpoints = [{
        name: 'sm',
        minWidth: '576px'
      }, {
        name: 'md',
        minWidth: '768px'
      }, {
        name: 'lg',
        minWidth: '992px'
      }, {
        name: 'xl',
        minWidth: '1200px'
      }, {
        name: 'xxl',
        minWidth: '1400px'
      }];
      let prevPaddingTop = getEffectiveValue('default', 'paddingTop');
      let prevPaddingRight = getEffectiveValue('default', 'paddingRight');
      let prevPaddingBottom = getEffectiveValue('default', 'paddingBottom');
      let prevPaddingLeft = getEffectiveValue('default', 'paddingLeft');
      let prevMarginTop = getEffectiveValue('default', 'marginTop');
      let prevMarginRight = getEffectiveValue('default', 'marginRight');
      let prevMarginBottom = getEffectiveValue('default', 'marginBottom');
      let prevMarginLeft = getEffectiveValue('default', 'marginLeft');

      // Skip default breakpoint (already handled above) and process responsive breakpoints
      breakpoints.forEach(({
        name,
        minWidth
      }) => {
        const paddingTop = getEffectiveValue(name, 'paddingTop');
        const paddingRight = getEffectiveValue(name, 'paddingRight');
        const paddingBottom = getEffectiveValue(name, 'paddingBottom');
        const paddingLeft = getEffectiveValue(name, 'paddingLeft');
        const marginTop = getEffectiveValue(name, 'marginTop');
        const marginRight = getEffectiveValue(name, 'marginRight');
        const marginBottom = getEffectiveValue(name, 'marginBottom');
        const marginLeft = getEffectiveValue(name, 'marginLeft');

        // Check if any values are different from the previous breakpoint
        const hasDifferentValues = paddingTop !== prevPaddingTop || paddingRight !== prevPaddingRight || paddingBottom !== prevPaddingBottom || paddingLeft !== prevPaddingLeft || marginTop !== prevMarginTop || marginRight !== prevMarginRight || marginBottom !== prevMarginBottom || marginLeft !== prevMarginLeft;
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
    const effectiveAnimationName = wrapperAnimationEnabled ? wrapperAnimationName || 'fade-up' : '';
    const effectiveDuration = wrapperAnimationEnabled ? wrapperAnimationDuration || 1000 : 0;
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
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      className: combinedClassName,
      ...wrapperAosAttributes,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, {}), css && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("style", {
        dangerouslySetInnerHTML: {
          __html: css
        }
      })]
    });
  }
});

/***/ }),

/***/ "./src/bs-wrapper/style.css":
/*!**********************************!*\
  !*** ./src/bs-wrapper/style.css ***!
  \**********************************/
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
/******/ 			"bs-wrapper": 0,
/******/ 			"./style-bs-wrapper": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-bs-wrapper"], () => (__webpack_require__("./src/bs-wrapper/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map