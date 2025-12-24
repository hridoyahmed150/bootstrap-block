/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/bs-feature-cards/index.js":
/*!***************************************!*\
  !*** ./src/bs-feature-cards/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./template */ "./src/bs-feature-cards/template.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./style.css */ "./src/bs-feature-cards/style.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);







(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)("bootstrap-blocks/bs-feature-cards", {
  edit: ({
    attributes,
    setAttributes,
    clientId
  }) => {
    const {
      items,
      columns,
      cardSpacing,
      cardPadding,
      cardBorderRadius,
      iconSize,
      iconBorderRadius,
      iconPosition,
      iconBackgroundColor,
      cardBackgroundColor,
      textColor,
      cardHoverBackgroundColor,
      cardHoverTextColor,
      iconHoverBackgroundColor,
      blockId
    } = attributes;
    const [iconColorPopoverOpen, setIconColorPopoverOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(false);
    const [cardBgColorPopoverOpen, setCardBgColorPopoverOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(false);
    const [textColorPopoverOpen, setTextColorPopoverOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(false);
    const [cardHoverBgColorPopoverOpen, setCardHoverBgColorPopoverOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(false);
    const [cardHoverTextColorPopoverOpen, setCardHoverTextColorPopoverOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(false);
    const [iconHoverBgColorPopoverOpen, setIconHoverBgColorPopoverOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(false);
    const [iconHoverColorPopoverOpen, setIconHoverColorPopoverOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(false);
    // Per-card icon hover color popovers
    const [cardIconHoverColorPopovers, setCardIconHoverColorPopovers] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)({});
    // HTML mode for title and description
    const [titleHtmlMode, setTitleHtmlMode] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)({});
    const [descriptionHtmlMode, setDescriptionHtmlMode] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)({});

    // Generate unique block ID if not exists
    if (!blockId) {
      setAttributes({
        blockId: `bs-feature-cards-${clientId}`
      });
    }

    // Helper function to convert hex to CSS filter for SVG color change
    // Uses a more accurate algorithm for color conversion
    const hexToFilter = hex => {
      if (!hex) return "";
      // Remove # if present
      hex = hex.replace("#", "");
      // Convert hex to RGB (0-255)
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);

      // Normalize RGB to 0-1
      const rNorm = r / 255;
      const gNorm = g / 255;
      const bNorm = b / 255;

      // Calculate HSL for more accurate color conversion
      const max = Math.max(rNorm, gNorm, bNorm);
      const min = Math.min(rNorm, gNorm, bNorm);
      const delta = max - min;
      let h = 0;
      if (delta !== 0) {
        if (max === rNorm) {
          h = (gNorm - bNorm) / delta % 6;
        } else if (max === gNorm) {
          h = (bNorm - rNorm) / delta + 2;
        } else {
          h = (rNorm - gNorm) / delta + 4;
        }
      }
      h = h * 60;
      if (h < 0) h += 360;
      const s = max === 0 ? 0 : delta / max;
      const l = (max + min) / 2;

      // Improved filter calculation for better color accuracy
      // The formula: brightness(0) saturate(100%) invert(1) sepia(100%) saturate(X%) hue-rotate(Ydeg) brightness(Z%)

      // Calculate values
      const sepia = 100;
      // Saturation: significantly reduced to prevent color flickering
      // Much lower saturation values to prevent multiple colors showing
      const saturateValue = s > 0.1 ? Math.min(Math.round(s * 5000), 5000) : Math.round(s * 2000);
      const hueRotate = Math.round(h);

      // Brightness: more accurate calculation based on lightness
      // Light colors need less brightness, dark colors need more
      let brightnessValue;
      if (l < 0.2) {
        // Very dark colors
        brightnessValue = Math.round(l * 250 + 40);
      } else if (l < 0.5) {
        // Medium dark colors
        brightnessValue = Math.round(l * 180 + 60);
      } else if (l < 0.8) {
        // Medium light colors
        brightnessValue = Math.round(l * 100 + 90);
      } else {
        // Very light colors
        brightnessValue = Math.round(l * 70 + 110);
      }
      return `brightness(0) saturate(100%) invert(1) sepia(${sepia}%) saturate(${saturateValue}%) hue-rotate(${hueRotate}deg) brightness(${brightnessValue}%)`;
    };
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
      className: "bs-feature-cards-container"
    });

    // Add new item
    const addItem = () => {
      const newItem = {
        id: `item-${Date.now()}`,
        title: "New Feature",
        description: "Add your description here...",
        iconUrl: "",
        iconHoverColor: ""
      };
      setAttributes({
        items: [...items, newItem]
      });
    };

    // Remove item
    const removeItem = index => {
      const newItems = items.filter((_, i) => i !== index);
      setAttributes({
        items: newItems
      });
    };

    // Update item
    const updateItem = (index, field, value) => {
      const newItems = [...items];
      newItems[index] = {
        ...newItems[index],
        [field]: value
      };
      setAttributes({
        items: newItems
      });
    };

    // Update item image
    const updateItemImage = (index, imageUrl) => {
      updateItem(index, "iconUrl", imageUrl || "");
    };
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
          title: "Layout Settings",
          initialOpen: true,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
            label: "Columns",
            value: columns,
            options: [{
              label: "1 Column",
              value: 1
            }, {
              label: "2 Columns",
              value: 2
            }, {
              label: "3 Columns",
              value: 3
            }, {
              label: "4 Columns",
              value: 4
            }],
            onChange: value => setAttributes({
              columns: parseInt(value)
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
            label: "Card Spacing",
            value: cardSpacing,
            onChange: value => setAttributes({
              cardSpacing: value
            }),
            min: 0,
            max: 100,
            step: 1
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
            label: "Card Padding (Optional)",
            value: cardPadding || "",
            onChange: value => setAttributes({
              cardPadding: value
            }),
            placeholder: "e.g., 20px 30px"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
            label: "Card Border Radius (Optional)",
            value: cardBorderRadius ? parseInt(cardBorderRadius) || 0 : undefined,
            onChange: value => setAttributes({
              cardBorderRadius: value ? `${value}px` : ""
            }),
            min: 0,
            max: 50,
            step: 1,
            allowReset: true
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
            label: "Icon Position",
            value: iconPosition,
            options: [{
              label: "Top",
              value: "top"
            }, {
              label: "Left",
              value: "left"
            }],
            onChange: value => setAttributes({
              iconPosition: value
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
            label: "Icon Size (Optional)",
            value: iconSize ? parseInt(iconSize) || 0 : undefined,
            onChange: value => setAttributes({
              iconSize: value ? `${value}px` : ""
            }),
            min: 20,
            max: 100,
            step: 1,
            allowReset: true
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
            label: "Icon Border Radius (Optional)",
            value: iconBorderRadius ? parseInt(iconBorderRadius) || 0 : undefined,
            onChange: value => setAttributes({
              iconBorderRadius: value ? `${value}px` : ""
            }),
            min: 0,
            max: 50,
            step: 1,
            allowReset: true
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
          title: "Feature Cards",
          initialOpen: true,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            style: {
              marginBottom: "16px"
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h4", {
              style: {
                marginTop: 0,
                marginBottom: "10px",
                fontSize: "12px",
                fontWeight: "600"
              },
              children: "Global Colors"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              style: {
                marginBottom: "10px"
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                style: {
                  display: "block",
                  marginBottom: "5px",
                  fontSize: "12px",
                  fontWeight: "600"
                },
                children: "Icon Background Color"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                style: {
                  position: "relative"
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
                  onClick: () => setIconColorPopoverOpen(!iconColorPopoverOpen),
                  variant: "secondary",
                  style: {
                    width: "100%",
                    height: "32px",
                    backgroundColor: iconBackgroundColor || "transparent",
                    border: "1px solid #ddd"
                  },
                  children: iconBackgroundColor || "Select"
                }), iconColorPopoverOpen && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Popover, {
                  onClose: () => setIconColorPopoverOpen(false),
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ColorPicker, {
                    color: iconBackgroundColor || undefined,
                    onChangeComplete: value => {
                      let colorValue = "";
                      if (value.rgb && value.rgb.a !== undefined && value.rgb.a < 1) {
                        colorValue = `rgba(${value.rgb.r}, ${value.rgb.g}, ${value.rgb.b}, ${value.rgb.a})`;
                      } else {
                        colorValue = value.hex || "";
                      }
                      setAttributes({
                        iconBackgroundColor: colorValue
                      });
                    }
                  })
                })]
              }), iconBackgroundColor && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
                onClick: () => setAttributes({
                  iconBackgroundColor: "#4CAF50"
                }),
                variant: "link",
                style: {
                  marginTop: "4px",
                  fontSize: "11px"
                },
                children: "Reset"
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              style: {
                marginBottom: "10px"
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                style: {
                  display: "block",
                  marginBottom: "5px",
                  fontSize: "12px",
                  fontWeight: "600"
                },
                children: "Card Background Color"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                style: {
                  position: "relative"
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
                  onClick: () => setCardBgColorPopoverOpen(!cardBgColorPopoverOpen),
                  variant: "secondary",
                  style: {
                    width: "100%",
                    height: "32px",
                    backgroundColor: cardBackgroundColor || "transparent",
                    border: "1px solid #ddd"
                  },
                  children: cardBackgroundColor || "Select"
                }), cardBgColorPopoverOpen && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Popover, {
                  onClose: () => setCardBgColorPopoverOpen(false),
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ColorPicker, {
                    color: cardBackgroundColor || undefined,
                    onChangeComplete: value => {
                      let colorValue = "";
                      if (value.rgb && value.rgb.a !== undefined && value.rgb.a < 1) {
                        colorValue = `rgba(${value.rgb.r}, ${value.rgb.g}, ${value.rgb.b}, ${value.rgb.a})`;
                      } else {
                        colorValue = value.hex || "";
                      }
                      setAttributes({
                        cardBackgroundColor: colorValue
                      });
                    }
                  })
                })]
              }), cardBackgroundColor && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
                onClick: () => setAttributes({
                  cardBackgroundColor: "#ffffff"
                }),
                variant: "link",
                style: {
                  marginTop: "4px",
                  fontSize: "11px"
                },
                children: "Reset"
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              style: {
                marginBottom: "10px"
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                style: {
                  display: "block",
                  marginBottom: "5px",
                  fontSize: "12px",
                  fontWeight: "600"
                },
                children: "Text Color"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                style: {
                  position: "relative"
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
                  onClick: () => setTextColorPopoverOpen(!textColorPopoverOpen),
                  variant: "secondary",
                  style: {
                    width: "100%",
                    height: "32px",
                    backgroundColor: textColor || "transparent",
                    border: "1px solid #ddd"
                  },
                  children: textColor || "Select"
                }), textColorPopoverOpen && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Popover, {
                  onClose: () => setTextColorPopoverOpen(false),
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ColorPicker, {
                    color: textColor || undefined,
                    onChangeComplete: value => {
                      let colorValue = "";
                      if (value.rgb && value.rgb.a !== undefined && value.rgb.a < 1) {
                        colorValue = `rgba(${value.rgb.r}, ${value.rgb.g}, ${value.rgb.b}, ${value.rgb.a})`;
                      } else {
                        colorValue = value.hex || "";
                      }
                      setAttributes({
                        textColor: colorValue
                      });
                    }
                  })
                })]
              }), textColor && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
                onClick: () => setAttributes({
                  textColor: "#333333"
                }),
                variant: "link",
                style: {
                  marginTop: "4px",
                  fontSize: "11px"
                },
                children: "Reset"
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              style: {
                marginBottom: "10px"
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                style: {
                  display: "block",
                  marginBottom: "5px",
                  fontSize: "12px",
                  fontWeight: "600"
                },
                children: "Card Hover Background Color (Optional)"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                style: {
                  position: "relative"
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
                  onClick: () => setCardHoverBgColorPopoverOpen(!cardHoverBgColorPopoverOpen),
                  variant: "secondary",
                  style: {
                    width: "100%",
                    height: "32px",
                    backgroundColor: cardHoverBackgroundColor || "transparent",
                    border: "1px solid #ddd"
                  },
                  children: cardHoverBackgroundColor || "Select"
                }), cardHoverBgColorPopoverOpen && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Popover, {
                  onClose: () => setCardHoverBgColorPopoverOpen(false),
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ColorPicker, {
                    color: cardHoverBackgroundColor || undefined,
                    onChangeComplete: value => {
                      let colorValue = "";
                      if (value.rgb && value.rgb.a !== undefined && value.rgb.a < 1) {
                        colorValue = `rgba(${value.rgb.r}, ${value.rgb.g}, ${value.rgb.b}, ${value.rgb.a})`;
                      } else {
                        colorValue = value.hex || "";
                      }
                      setAttributes({
                        cardHoverBackgroundColor: colorValue
                      });
                    }
                  })
                })]
              }), cardHoverBackgroundColor && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
                onClick: () => setAttributes({
                  cardHoverBackgroundColor: ""
                }),
                variant: "link",
                style: {
                  marginTop: "4px",
                  fontSize: "11px"
                },
                children: "Clear"
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              style: {
                marginBottom: "10px"
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                style: {
                  display: "block",
                  marginBottom: "5px",
                  fontSize: "12px",
                  fontWeight: "600"
                },
                children: "Card Hover Text Color (Optional)"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                style: {
                  position: "relative"
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
                  onClick: () => setCardHoverTextColorPopoverOpen(!cardHoverTextColorPopoverOpen),
                  variant: "secondary",
                  style: {
                    width: "100%",
                    height: "32px",
                    backgroundColor: cardHoverTextColor || "transparent",
                    border: "1px solid #ddd"
                  },
                  children: cardHoverTextColor || "Select"
                }), cardHoverTextColorPopoverOpen && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Popover, {
                  onClose: () => setCardHoverTextColorPopoverOpen(false),
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ColorPicker, {
                    color: cardHoverTextColor || undefined,
                    onChangeComplete: value => {
                      let colorValue = "";
                      if (value.rgb && value.rgb.a !== undefined && value.rgb.a < 1) {
                        colorValue = `rgba(${value.rgb.r}, ${value.rgb.g}, ${value.rgb.b}, ${value.rgb.a})`;
                      } else {
                        colorValue = value.hex || "";
                      }
                      setAttributes({
                        cardHoverTextColor: colorValue
                      });
                    }
                  })
                })]
              }), cardHoverTextColor && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
                onClick: () => setAttributes({
                  cardHoverTextColor: ""
                }),
                variant: "link",
                style: {
                  marginTop: "4px",
                  fontSize: "11px"
                },
                children: "Clear"
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              style: {
                marginBottom: "10px"
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                style: {
                  display: "block",
                  marginBottom: "5px",
                  fontSize: "12px",
                  fontWeight: "600"
                },
                children: "Icon Hover Background Color (Optional)"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                style: {
                  position: "relative"
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
                  onClick: () => setIconHoverBgColorPopoverOpen(!iconHoverBgColorPopoverOpen),
                  variant: "secondary",
                  style: {
                    width: "100%",
                    height: "32px",
                    backgroundColor: iconHoverBackgroundColor || "transparent",
                    border: "1px solid #ddd"
                  },
                  children: iconHoverBackgroundColor || "Select"
                }), iconHoverBgColorPopoverOpen && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Popover, {
                  onClose: () => setIconHoverBgColorPopoverOpen(false),
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ColorPicker, {
                    color: iconHoverBackgroundColor || undefined,
                    onChangeComplete: value => {
                      let colorValue = "";
                      if (value.rgb && value.rgb.a !== undefined && value.rgb.a < 1) {
                        colorValue = `rgba(${value.rgb.r}, ${value.rgb.g}, ${value.rgb.b}, ${value.rgb.a})`;
                      } else {
                        colorValue = value.hex || "";
                      }
                      setAttributes({
                        iconHoverBackgroundColor: colorValue
                      });
                    }
                  })
                })]
              }), iconHoverBackgroundColor && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
                onClick: () => setAttributes({
                  iconHoverBackgroundColor: ""
                }),
                variant: "link",
                style: {
                  marginTop: "4px",
                  fontSize: "11px"
                },
                children: "Clear"
              })]
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            style: {
              marginTop: "16px",
              paddingTop: "16px",
              borderTop: "1px solid #eee"
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h4", {
              style: {
                marginTop: 0,
                marginBottom: "10px",
                fontSize: "12px",
                fontWeight: "600"
              },
              children: "Manage Cards"
            }), items.map((item, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              style: {
                marginBottom: "20px",
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "4px"
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("h4", {
                style: {
                  marginTop: 0,
                  marginBottom: "10px"
                },
                children: ["Card ", index + 1]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                style: {
                  marginBottom: "10px"
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                  style: {
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "600",
                    fontSize: "12px"
                  },
                  children: "Icon (Optional)"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUploadCheck, {
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUpload, {
                    onSelect: media => updateItemImage(index, media.url),
                    allowedTypes: ["image"],
                    value: item.iconUrl,
                    render: ({
                      open
                    }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                      children: item.iconUrl ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "8px"
                        },
                        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("img", {
                          src: item.iconUrl,
                          alt: "Icon",
                          style: {
                            maxWidth: "60px",
                            height: "auto",
                            objectFit: "contain"
                          }
                        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
                            onClick: open,
                            variant: "secondary",
                            size: "small",
                            children: "Change"
                          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
                            onClick: () => updateItemImage(index, ""),
                            variant: "link",
                            isDestructive: true,
                            size: "small",
                            style: {
                              marginLeft: "4px"
                            },
                            children: "Remove"
                          })]
                        })]
                      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
                        onClick: open,
                        variant: "secondary",
                        size: "small",
                        children: "Select Icon"
                      })
                    })
                  })
                })]
              }), item.iconUrl && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                style: {
                  marginBottom: "10px",
                  marginTop: "10px"
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                  style: {
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "600",
                    fontSize: "12px"
                  },
                  children: "Icon Hover Color (Optional - For SVG)"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                  style: {
                    position: "relative"
                  },
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
                    onClick: () => setCardIconHoverColorPopovers({
                      ...cardIconHoverColorPopovers,
                      [index]: !cardIconHoverColorPopovers[index]
                    }),
                    variant: "secondary",
                    style: {
                      width: "100%",
                      height: "32px",
                      backgroundColor: item.iconHoverColor || "transparent",
                      border: "1px solid #ddd"
                    },
                    children: item.iconHoverColor || "Select"
                  }), cardIconHoverColorPopovers[index] && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Popover, {
                    onClose: () => setCardIconHoverColorPopovers({
                      ...cardIconHoverColorPopovers,
                      [index]: false
                    }),
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ColorPicker, {
                      color: item.iconHoverColor || undefined,
                      onChangeComplete: value => {
                        let colorValue = "";
                        if (value.rgb && value.rgb.a !== undefined && value.rgb.a < 1) {
                          colorValue = `rgba(${value.rgb.r}, ${value.rgb.g}, ${value.rgb.b}, ${value.rgb.a})`;
                        } else {
                          colorValue = value.hex || "";
                        }
                        updateItem(index, "iconHoverColor", colorValue);
                      }
                    })
                  })]
                }), item.iconHoverColor && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
                  onClick: () => updateItem(index, "iconHoverColor", ""),
                  variant: "link",
                  style: {
                    marginTop: "4px",
                    fontSize: "11px"
                  },
                  children: "Clear"
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                style: {
                  display: "flex",
                  gap: "8px",
                  marginTop: "10px"
                },
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
                  onClick: () => removeItem(index),
                  variant: "link",
                  isDestructive: true,
                  size: "small",
                  children: "Remove"
                })
              })]
            }, item.id)), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
              onClick: addItem,
              variant: "primary",
              style: {
                marginTop: "10px"
              },
              children: "Add Card"
            })]
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        ...blockProps,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          className: "bs-feature-cards-editor",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            className: "bs-feature-cards-grid",
            style: {
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
              gap: `${cardSpacing}px`
            },
            children: [items.map((item, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              style: {
                position: "relative"
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                style: {
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  zIndex: 10,
                  display: "flex",
                  gap: "4px"
                },
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
                  onClick: () => removeItem(index),
                  variant: "secondary",
                  isDestructive: true,
                  size: "small",
                  style: {
                    minWidth: "auto",
                    padding: "4px 8px"
                  },
                  children: "Remove"
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                className: `bs-feature-card ${iconPosition === "left" ? "icon-left" : "icon-top"}`,
                style: {
                  backgroundColor: cardBackgroundColor || "#ffffff",
                  color: textColor || "#333333",
                  padding: cardPadding || undefined,
                  borderRadius: cardBorderRadius || undefined
                },
                onMouseEnter: e => {
                  if (cardHoverBackgroundColor) {
                    e.currentTarget.style.backgroundColor = cardHoverBackgroundColor;
                  }
                  if (cardHoverTextColor) {
                    e.currentTarget.style.color = cardHoverTextColor;
                    const title = e.currentTarget.querySelector(".bs-feature-card-title");
                    const desc = e.currentTarget.querySelector(".bs-feature-card-description");
                    if (title) title.style.color = cardHoverTextColor;
                    if (desc) desc.style.color = cardHoverTextColor;
                  }
                },
                onMouseLeave: e => {
                  e.currentTarget.style.backgroundColor = cardBackgroundColor || "#ffffff";
                  e.currentTarget.style.color = textColor || "#333333";
                  const title = e.currentTarget.querySelector(".bs-feature-card-title");
                  const desc = e.currentTarget.querySelector(".bs-feature-card-description");
                  if (title) title.style.color = textColor || "#333333";
                  if (desc) desc.style.color = textColor || "#333333";
                },
                children: [item.iconUrl && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                  className: "bs-feature-card-icon",
                  style: {
                    backgroundColor: iconBackgroundColor || "#4CAF50",
                    borderRadius: iconBorderRadius || undefined,
                    width: iconSize || undefined,
                    height: iconSize || undefined
                  },
                  onMouseEnter: e => {
                    if (iconHoverBackgroundColor) {
                      e.currentTarget.style.backgroundColor = iconHoverBackgroundColor;
                    }
                    // Use per-card icon hover color
                    if (item.iconHoverColor) {
                      const img = e.currentTarget.querySelector("img");
                      const picture = e.currentTarget.querySelector("picture");
                      const pictureImg = e.currentTarget.querySelector("picture img");
                      const svg = e.currentTarget.querySelector("svg");
                      if (img) {
                        img.style.filter = hexToFilter(item.iconHoverColor);
                      }
                      if (picture) {
                        picture.style.filter = hexToFilter(item.iconHoverColor);
                      }
                      if (pictureImg) {
                        pictureImg.style.filter = hexToFilter(item.iconHoverColor);
                      }
                      if (svg) {
                        svg.style.filter = hexToFilter(item.iconHoverColor);
                      }
                    }
                  },
                  onMouseLeave: e => {
                    e.currentTarget.style.backgroundColor = iconBackgroundColor || "#4CAF50";
                    const img = e.currentTarget.querySelector("img");
                    const picture = e.currentTarget.querySelector("picture");
                    const pictureImg = e.currentTarget.querySelector("picture img");
                    const svg = e.currentTarget.querySelector("svg");
                    if (img) {
                      img.style.filter = "none";
                    }
                    if (picture) {
                      picture.style.filter = "none";
                    }
                    if (pictureImg) {
                      pictureImg.style.filter = "none";
                    }
                    if (svg) {
                      svg.style.filter = "none";
                    }
                  },
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("img", {
                    src: item.iconUrl,
                    alt: "",
                    style: {
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      padding: "12px"
                    }
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                  className: "bs-feature-card-content",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                    style: {
                      marginBottom: "8px"
                    },
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
                      onClick: () => setTitleHtmlMode({
                        ...titleHtmlMode,
                        [index]: !titleHtmlMode[index]
                      }),
                      variant: "secondary",
                      size: "small",
                      style: {
                        marginBottom: "8px"
                      },
                      children: titleHtmlMode[index] ? "Visual Editor" : "HTML Editor"
                    })
                  }), titleHtmlMode[index] ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextareaControl, {
                    value: item.title || "",
                    onChange: value => updateItem(index, "title", value),
                    placeholder: "Enter title HTML here...",
                    rows: 3,
                    style: {
                      fontFamily: "monospace",
                      fontSize: "12px",
                      marginBottom: "12px"
                    }
                  }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText, {
                    tagName: "h3",
                    className: "bs-feature-card-title",
                    value: item.title,
                    onChange: value => updateItem(index, "title", value),
                    placeholder: "Enter title...",
                    allowedFormats: ["core/bold"],
                    style: {
                      color: textColor || "#333333",
                      marginBottom: "12px"
                    }
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                    style: {
                      marginBottom: "8px"
                    },
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
                      onClick: () => setDescriptionHtmlMode({
                        ...descriptionHtmlMode,
                        [index]: !descriptionHtmlMode[index]
                      }),
                      variant: "secondary",
                      size: "small",
                      style: {
                        marginBottom: "8px"
                      },
                      children: descriptionHtmlMode[index] ? "Visual Editor" : "HTML Editor"
                    })
                  }), descriptionHtmlMode[index] ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextareaControl, {
                    value: item.description || "",
                    onChange: value => updateItem(index, "description", value),
                    placeholder: "Enter description HTML here...",
                    rows: 6,
                    style: {
                      fontFamily: "monospace",
                      fontSize: "12px",
                      minHeight: "40px",
                      cursor: "text",
                      marginTop: "12px",
                      padding: "8px 0",
                      width: "100%",
                      display: "block"
                    }
                  }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText, {
                    tagName: "div",
                    className: "bs-feature-card-description",
                    value: item.description || "",
                    onChange: value => updateItem(index, "description", value),
                    placeholder: "Enter description (plain text or HTML)...",
                    allowedFormats: ["core/bold", "core/italic", "core/link"],
                    multiline: "p",
                    style: {
                      color: textColor || "#333333",
                      minHeight: "40px",
                      cursor: "text",
                      marginTop: "12px",
                      padding: "8px 0",
                      width: "100%",
                      display: "block"
                    }
                  })]
                })]
              })]
            }, item.id)), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "200px",
                border: "2px dashed #ddd",
                borderRadius: "8px",
                padding: "20px"
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
                onClick: addItem,
                variant: "primary",
                size: "large",
                children: "+ Add Card"
              })
            })]
          })
        })
      })]
    });
  },
  save: ({
    attributes
  }) => {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      dangerouslySetInnerHTML: {
        __html: (0,_template__WEBPACK_IMPORTED_MODULE_2__.generateFeatureCardsHTML)(attributes)
      }
    });
  }
});

/***/ }),

/***/ "./src/bs-feature-cards/style.css":
/*!****************************************!*\
  !*** ./src/bs-feature-cards/style.css ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/bs-feature-cards/template.js":
/*!******************************************!*\
  !*** ./src/bs-feature-cards/template.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateFeatureCardsHTML: () => (/* binding */ generateFeatureCardsHTML)
/* harmony export */ });
/**
 * Generate HTML for BS Feature Cards block
 */

// Helper function to convert hex to CSS filter for SVG color change
// Uses a more accurate algorithm for color conversion
const hexToFilter = hex => {
  if (!hex) return "";
  // Remove # if present
  hex = hex.replace("#", "");
  // Convert hex to RGB (0-255)
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Normalize RGB to 0-1
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  // Calculate HSL for more accurate color conversion
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;
  let h = 0;
  if (delta !== 0) {
    if (max === rNorm) {
      h = (gNorm - bNorm) / delta % 6;
    } else if (max === gNorm) {
      h = (bNorm - rNorm) / delta + 2;
    } else {
      h = (rNorm - gNorm) / delta + 4;
    }
  }
  h = h * 60;
  if (h < 0) h += 360;
  const s = max === 0 ? 0 : delta / max;
  const l = (max + min) / 2;

  // Improved filter calculation for better color accuracy
  // The formula: brightness(0) saturate(100%) invert(1) sepia(100%) saturate(X%) hue-rotate(Ydeg) brightness(Z%)

  // Calculate values
  const sepia = 100;
  // Saturation: significantly reduced to prevent color flickering
  // Much lower saturation values to prevent multiple colors showing
  const saturateValue = s > 0.1 ? Math.min(Math.round(s * 5000), 5000) : Math.round(s * 2000);
  const hueRotate = Math.round(h);

  // Brightness: more accurate calculation based on lightness
  // Light colors need less brightness, dark colors need more
  let brightnessValue;
  if (l < 0.2) {
    // Very dark colors
    brightnessValue = Math.round(l * 250 + 40);
  } else if (l < 0.5) {
    // Medium dark colors
    brightnessValue = Math.round(l * 180 + 60);
  } else if (l < 0.8) {
    // Medium light colors
    brightnessValue = Math.round(l * 100 + 90);
  } else {
    // Very light colors
    brightnessValue = Math.round(l * 70 + 110);
  }
  return `brightness(0) saturate(100%) invert(1) sepia(${sepia}%) saturate(${saturateValue}%) hue-rotate(${hueRotate}deg) brightness(${brightnessValue}%)`;
};
const generateFeatureCardsHTML = attributes => {
  const {
    items = [],
    columns = 3,
    cardSpacing = 20,
    cardPadding = "",
    cardBorderRadius = "",
    iconSize = "",
    iconBorderRadius = "",
    iconPosition = "top",
    iconBackgroundColor = "#4CAF50",
    cardBackgroundColor = "#ffffff",
    textColor = "#333333",
    cardHoverBackgroundColor = "",
    cardHoverTextColor = "",
    iconHoverBackgroundColor = "",
    blockId = "bs-feature-cards-default"
  } = attributes;

  // Use the unique block ID for styling
  const uniqueId = blockId;

  // Generate feature cards HTML
  const generateFeatureCards = () => {
    return items.map(item => {
      return `
				<div class="bs-feature-card ${iconPosition === "left" ? "icon-left" : "icon-top"}" style="
					background-color: ${cardBackgroundColor};
					color: ${textColor};
					${cardPadding ? `padding: ${cardPadding};` : ""}
					${cardBorderRadius ? `border-radius: ${cardBorderRadius};` : ""}
				">
					${item.iconUrl ? `<div class="bs-feature-card-icon" style="
								background-color: ${iconBackgroundColor};
								${iconBorderRadius ? `border-radius: ${iconBorderRadius};` : ""}
								${iconSize ? `width: ${iconSize}; height: ${iconSize};` : ""}
								display: flex;
								align-items: center;
								justify-content: center;
							">
								<img src="${item.iconUrl}" alt="" style="
									width: 100%;
									height: 100%;
									max-width: 100%;
									max-height: 100%;
									object-fit: contain;
									padding: 8px;
									display: block;
									box-sizing: border-box;
								" />
							</div>` : ""}
					<div class="bs-feature-card-content">
						${item.title ? item.title.trim().startsWith("<") ? `<div class="bs-feature-card-title" style="color: ${textColor}; transition: color 0.3s ease;">${item.title}</div>` : `<h3 class="bs-feature-card-title" style="color: ${textColor}; transition: color 0.3s ease;">${item.title}</h3>` : ""}
						${item.description ? `<div class="bs-feature-card-description" style="color: ${textColor}; transition: color 0.3s ease;">${item.description}</div>` : ""}
					</div>
				</div>
			`;
    }).join("");
  };

  // Generate inline styles
  const generateStyles = () => {
    return `
            <style>
                #${uniqueId} .bs-feature-cards-grid {
                    display: grid;
                    grid-template-columns: repeat(${columns}, 1fr);
                    gap: ${cardSpacing}px;
                }

                #${uniqueId} .bs-feature-card {
                    transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease, color 0.3s ease;
                }

                #${uniqueId} .bs-feature-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                    ${cardHoverBackgroundColor ? `background-color: ${cardHoverBackgroundColor} !important;` : ""}
                    ${cardHoverTextColor ? `color: ${cardHoverTextColor} !important;` : ""}
                }
                ${cardHoverTextColor ? `
                    #${uniqueId} .bs-feature-card:hover .bs-feature-card-title,
                    #${uniqueId} .bs-feature-card:hover .bs-feature-card-description,
                    #${uniqueId} .bs-feature-card:hover .bs-feature-card-content,
                    #${uniqueId} .bs-feature-card:hover .bs-feature-card-content * {
                        color: ${cardHoverTextColor} !important;
                    }
                ` : ""}
                ${iconHoverBackgroundColor ? `
                    #${uniqueId} .bs-feature-card:hover .bs-feature-card-icon {
                        background-color: ${iconHoverBackgroundColor} !important;
                    }
                ` : ""}
                ${items.map((item, index) => {
      // Use per-card icon hover color
      if (!item.iconHoverColor) return "";
      return `
                    #${uniqueId} .bs-feature-card:nth-child(${index + 1}):hover .bs-feature-card-icon img,
                    #${uniqueId} .bs-feature-card:nth-child(${index + 1}):hover .bs-feature-card-icon picture,
                    #${uniqueId} .bs-feature-card:nth-child(${index + 1}):hover .bs-feature-card-icon picture img,
                    #${uniqueId} .bs-feature-card:nth-child(${index + 1}):hover .bs-feature-card-icon svg,
                    #${uniqueId} .bs-feature-card:nth-child(${index + 1}):hover .bs-feature-card-icon picture source {
                        filter: ${hexToFilter(item.iconHoverColor)} !important;
                        -webkit-filter: ${hexToFilter(item.iconHoverColor)} !important;
                    }
                `;
    }).join("")}

                @media (max-width: 768px) {
                    #${uniqueId} .bs-feature-cards-grid {
                        grid-template-columns: 1fr;
                    }
                }

                @media (min-width: 769px) and (max-width: 1024px) {
                    #${uniqueId} .bs-feature-cards-grid {
                        grid-template-columns: repeat(${columns > 2 ? 2 : columns}, 1fr);
                    }
                }
            </style>
        `;
  };
  return `
		<div id="${uniqueId}" class="bs-feature-cards">
			${generateStyles()}
			<div class="bs-feature-cards-grid">
				${generateFeatureCards()}
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
/******/ 			"bs-feature-cards": 0,
/******/ 			"./style-bs-feature-cards": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-bs-feature-cards"], () => (__webpack_require__("./src/bs-feature-cards/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map