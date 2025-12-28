/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/bs-accordion/index.js":
/*!***********************************!*\
  !*** ./src/bs-accordion/index.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./template */ "./src/bs-accordion/template.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./style.css */ "./src/bs-accordion/style.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);







(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)("bootstrap-blocks/bs-accordion", {
  edit: ({
    attributes,
    setAttributes,
    clientId
  }) => {
    const {
      items,
      allowMultipleOpen,
      showNumbering,
      iconStyle,
      backgroundColor,
      textColor,
      activeBackgroundColor,
      activeTextColor,
      itemSpacing,
      blockId,
      itemPadding,
      iconColor,
      iconBackgroundColor,
      iconBackgroundWidth,
      iconBackgroundHeight,
      iconSize,
      showIconBorder,
      iconBorderWidth,
      iconBorderColor,
      iconBorderStyle,
      iconBorderRadius,
      imageHeightOpen,
      imageWidth,
      imageHeightClosed,
      titleFontSize,
      titlePadding,
      showBorder,
      borderWidth,
      borderColor,
      borderStyle,
      borderTop,
      borderBottom,
      borderLeft,
      borderRight,
      showBoxShadow,
      boxShadow,
      borderRadius
    } = attributes;
    const [iconColorPopoverOpen, setIconColorPopoverOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(false);
    const [iconBgColorPopoverOpen, setIconBgColorPopoverOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(false);
    const [htmlMode, setHtmlMode] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)({});

    // Generate unique block ID if not exists
    if (!blockId) {
      setAttributes({
        blockId: `bs-accordion-${clientId}`
      });
    }
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
      className: "bs-accordion-container"
    });

    // Add new accordion item
    const addItem = () => {
      const newItem = {
        id: `item-${Date.now()}`,
        title: "New Accordion Item",
        content: "Add your content here...",
        isOpen: false
      };
      setAttributes({
        items: [...items, newItem]
      });
    };

    // Remove accordion item
    const removeItem = index => {
      const newItems = items.filter((_, i) => i !== index);
      setAttributes({
        items: newItems
      });
    };

    // Update item title
    const updateItemTitle = (index, title) => {
      const newItems = [...items];
      newItems[index].title = title;
      setAttributes({
        items: newItems
      });
    };

    // Update item content
    const updateItemContent = (index, content) => {
      const newItems = [...items];
      newItems[index].content = content;
      setAttributes({
        items: newItems
      });
    };

    // Update item image
    const updateItemImage = (index, imageUrl) => {
      const newItems = [...items];
      if (!newItems[index].imageUrl) {
        newItems[index].imageUrl = "";
      }
      if (!newItems[index].imageHeightClosed) {
        newItems[index].imageHeightClosed = "";
      }
      if (!newItems[index].imageHeightOpen) {
        newItems[index].imageHeightOpen = "";
      }
      newItems[index].imageUrl = imageUrl || "";
      setAttributes({
        items: newItems
      });
    };

    // Update item image height
    const updateItemImageHeight = (index, type, value) => {
      const newItems = [...items];
      newItems[index][`imageHeight${type}`] = value ? `${value}px` : "";
      setAttributes({
        items: newItems
      });
    };

    // Update item image width
    const updateItemImageWidth = (index, value) => {
      const newItems = [...items];
      if (!newItems[index].imageWidth) {
        newItems[index].imageWidth = "";
      }
      newItems[index].imageWidth = value ? `${value}px` : "";
      setAttributes({
        items: newItems
      });
    };

    // Toggle item open/closed state
    const toggleItem = index => {
      const newItems = [...items];
      if (!allowMultipleOpen) {
        // Close all other items
        newItems.forEach((item, i) => {
          if (i !== index) {
            item.isOpen = false;
          }
        });
      }

      // Toggle current item
      newItems[index].isOpen = !newItems[index].isOpen;
      setAttributes({
        items: newItems
      });
    };

    // Move item up
    const moveItemUp = index => {
      if (index > 0) {
        const newItems = [...items];
        [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
        setAttributes({
          items: newItems
        });
      }
    };

    // Move item down
    const moveItemDown = index => {
      if (index < items.length - 1) {
        const newItems = [...items];
        [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
        setAttributes({
          items: newItems
        });
      }
    };
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
          title: "Behavior Settings",
          initialOpen: true,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
            label: "Allow Multiple Open",
            checked: allowMultipleOpen,
            onChange: value => setAttributes({
              allowMultipleOpen: value
            }),
            help: "Allow multiple accordion items to be open at the same time"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
            label: "Show Numbering",
            checked: showNumbering,
            onChange: value => setAttributes({
              showNumbering: value
            }),
            help: "Display numbers before each accordion title"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
            label: "Icon Style",
            value: iconStyle,
            options: [{
              label: "Plus/Minus",
              value: "plus-minus"
            }, {
              label: "Chevron",
              value: "chevron"
            }],
            onChange: value => setAttributes({
              iconStyle: value
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
          title: "Style Settings",
          initialOpen: false,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            style: {
              marginBottom: "16px"
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
              style: {
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold"
              },
              children: "Default Colors"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              style: {
                display: "flex",
                gap: "16px"
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                  style: {
                    display: "block",
                    marginBottom: "4px",
                    fontSize: "12px"
                  },
                  children: "Background"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                  type: "color",
                  value: backgroundColor,
                  onChange: e => setAttributes({
                    backgroundColor: e.target.value
                  }),
                  style: {
                    width: "40px",
                    height: "30px",
                    border: "none",
                    borderRadius: "4px"
                  }
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                  style: {
                    display: "block",
                    marginBottom: "4px",
                    fontSize: "12px"
                  },
                  children: "Text"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                  type: "color",
                  value: textColor,
                  onChange: e => setAttributes({
                    textColor: e.target.value
                  }),
                  style: {
                    width: "40px",
                    height: "30px",
                    border: "none",
                    borderRadius: "4px"
                  }
                })]
              })]
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            style: {
              marginBottom: "16px"
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
              style: {
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold"
              },
              children: "Active Item Colors"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              style: {
                display: "flex",
                gap: "16px"
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                  style: {
                    display: "block",
                    marginBottom: "4px",
                    fontSize: "12px"
                  },
                  children: "Background"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                  type: "color",
                  value: activeBackgroundColor,
                  onChange: e => setAttributes({
                    activeBackgroundColor: e.target.value
                  }),
                  style: {
                    width: "40px",
                    height: "30px",
                    border: "none",
                    borderRadius: "4px"
                  }
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                  style: {
                    display: "block",
                    marginBottom: "4px",
                    fontSize: "12px"
                  },
                  children: "Text"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                  type: "color",
                  value: activeTextColor,
                  onChange: e => setAttributes({
                    activeTextColor: e.target.value
                  }),
                  style: {
                    width: "40px",
                    height: "30px",
                    border: "none",
                    borderRadius: "4px"
                  }
                })]
              })]
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            style: {
              marginBottom: "16px"
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
              style: {
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold"
              },
              children: "Item Spacing"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
              value: itemSpacing,
              onChange: value => setAttributes({
                itemSpacing: value
              }),
              min: 0,
              max: 50,
              step: 1,
              help: "Space between accordion items (0-50px)"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            style: {
              marginBottom: "16px"
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
              style: {
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold"
              },
              children: "Item Padding (Optional)"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
              value: itemPadding || "",
              onChange: value => setAttributes({
                itemPadding: value
              }),
              placeholder: "e.g., 16px 20px"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            style: {
              marginBottom: "16px"
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
              style: {
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold"
              },
              children: "Icon Colors (Optional)"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              style: {
                display: "flex",
                gap: "12px"
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                style: {
                  flex: 1
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                  style: {
                    display: "block",
                    marginBottom: "4px",
                    fontSize: "12px"
                  },
                  children: "Icon Color"
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
                      backgroundColor: iconColor || "transparent",
                      border: "1px solid #ddd"
                    },
                    children: iconColor || "Select"
                  }), iconColorPopoverOpen && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Popover, {
                    onClose: () => setIconColorPopoverOpen(false),
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ColorPicker, {
                      color: iconColor || undefined,
                      onChangeComplete: value => {
                        let colorValue = "";
                        if (value.rgb && value.rgb.a !== undefined && value.rgb.a < 1) {
                          colorValue = `rgba(${value.rgb.r}, ${value.rgb.g}, ${value.rgb.b}, ${value.rgb.a})`;
                        } else {
                          colorValue = value.hex || "";
                        }
                        setAttributes({
                          iconColor: colorValue
                        });
                      }
                    })
                  })]
                }), iconColor && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
                  onClick: () => setAttributes({
                    iconColor: ""
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
                  flex: 1
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                  style: {
                    display: "block",
                    marginBottom: "4px",
                    fontSize: "12px"
                  },
                  children: "Background Color"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                  style: {
                    position: "relative"
                  },
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
                    onClick: () => setIconBgColorPopoverOpen(!iconBgColorPopoverOpen),
                    variant: "secondary",
                    style: {
                      width: "100%",
                      height: "32px",
                      backgroundColor: iconBackgroundColor || "transparent",
                      border: "1px solid #ddd"
                    },
                    children: iconBackgroundColor || "Select"
                  }), iconBgColorPopoverOpen && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Popover, {
                    onClose: () => setIconBgColorPopoverOpen(false),
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
                    iconBackgroundColor: ""
                  }),
                  variant: "link",
                  style: {
                    marginTop: "4px",
                    fontSize: "11px"
                  },
                  children: "Clear"
                })]
              })]
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            style: {
              marginBottom: "16px"
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
              label: "Icon Background Width (Optional)",
              value: iconBackgroundWidth ? parseInt(iconBackgroundWidth) || 0 : undefined,
              onChange: value => setAttributes({
                iconBackgroundWidth: value ? `${value}px` : ""
              }),
              min: 0,
              max: 200,
              step: 1,
              allowReset: true
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            style: {
              marginBottom: "16px"
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
              label: "Icon Background Height (Optional)",
              value: iconBackgroundHeight ? parseInt(iconBackgroundHeight) || 0 : undefined,
              onChange: value => setAttributes({
                iconBackgroundHeight: value ? `${value}px` : ""
              }),
              min: 0,
              max: 200,
              step: 1,
              allowReset: true
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              style: {
                marginTop: "16px",
                paddingTop: "16px",
                borderTop: "1px solid #eee"
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
                label: "Show Icon Border",
                checked: showIconBorder,
                onChange: value => setAttributes({
                  showIconBorder: value
                })
              }), showIconBorder && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
                  label: "Icon Border Width (Optional)",
                  value: iconBorderWidth ? parseInt(iconBorderWidth) || 0 : undefined,
                  onChange: value => setAttributes({
                    iconBorderWidth: value ? `${value}px` : ""
                  }),
                  min: 0,
                  max: 10,
                  step: 1,
                  allowReset: true
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
                    children: "Icon Border Color (Optional)"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                    type: "color",
                    value: iconBorderColor || "#000000",
                    onChange: e => setAttributes({
                      iconBorderColor: e.target.value
                    }),
                    style: {
                      width: "100%",
                      height: "32px",
                      border: "1px solid #ddd",
                      borderRadius: "4px"
                    }
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
                  label: "Icon Border Style (Optional)",
                  value: iconBorderStyle,
                  options: [{
                    label: "Solid",
                    value: "solid"
                  }, {
                    label: "Dashed",
                    value: "dashed"
                  }, {
                    label: "Dotted",
                    value: "dotted"
                  }, {
                    label: "Double",
                    value: "double"
                  }, {
                    label: "None",
                    value: "none"
                  }],
                  onChange: value => setAttributes({
                    iconBorderStyle: value
                  })
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
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
              label: "Icon Size (Optional)",
              value: iconSize ? parseInt(iconSize) || 0 : undefined,
              onChange: value => setAttributes({
                iconSize: value ? `${value}px` : ""
              }),
              min: 8,
              max: 100,
              step: 1,
              allowReset: true
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            style: {
              marginBottom: "16px",
              marginTop: "24px",
              paddingTop: "16px",
              borderTop: "1px solid #ddd"
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h3", {
              style: {
                marginTop: 0,
                marginBottom: "12px",
                fontSize: "13px",
                fontWeight: "600"
              },
              children: "Title Settings"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
              label: "Title Font Size (Optional)",
              value: titleFontSize ? parseInt(titleFontSize) || 0 : undefined,
              onChange: value => setAttributes({
                titleFontSize: value ? `${value}px` : ""
              }),
              min: 10,
              max: 50,
              step: 1,
              allowReset: true
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
              label: "Title Padding (Optional)",
              value: titlePadding || "",
              onChange: value => setAttributes({
                titlePadding: value || ""
              }),
              placeholder: "e.g., 16px 20px or 16px",
              help: "Set padding for accordion title (header). Use CSS format like '16px 20px' or '16px'."
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            style: {
              marginBottom: "16px",
              marginTop: "24px",
              paddingTop: "16px",
              borderTop: "1px solid #ddd"
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h3", {
              style: {
                marginTop: 0,
                marginBottom: "12px",
                fontSize: "13px",
                fontWeight: "600"
              },
              children: "Image Settings"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
              label: "Image Width (Optional)",
              value: imageWidth ? parseInt(imageWidth) || 0 : undefined,
              onChange: value => setAttributes({
                imageWidth: value ? `${value}px` : ""
              }),
              min: 0,
              max: 500,
              step: 1,
              allowReset: true
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
              label: "Image Height - Closed State (Optional)",
              value: imageHeightClosed ? parseInt(imageHeightClosed) || 0 : undefined,
              onChange: value => setAttributes({
                imageHeightClosed: value ? `${value}px` : ""
              }),
              min: 0,
              max: 500,
              step: 1,
              allowReset: true
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
              label: "Image Height - Open State (Optional)",
              value: imageHeightOpen ? parseInt(imageHeightOpen) || 0 : undefined,
              onChange: value => setAttributes({
                imageHeightOpen: value ? `${value}px` : ""
              }),
              min: 0,
              max: 500,
              step: 1,
              allowReset: true
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            style: {
              marginBottom: "16px",
              marginTop: "24px",
              paddingTop: "16px",
              borderTop: "1px solid #ddd"
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h3", {
              style: {
                marginTop: 0,
                marginBottom: "12px",
                fontSize: "13px",
                fontWeight: "600"
              },
              children: "Border & Shadow Settings"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
              label: "Show Border",
              checked: showBorder,
              onChange: value => setAttributes({
                showBorder: value
              })
            }), showBorder && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
                label: "Border Width (Optional)",
                value: borderWidth ? parseInt(borderWidth) || 0 : undefined,
                onChange: value => setAttributes({
                  borderWidth: value ? `${value}px` : ""
                }),
                min: 0,
                max: 20,
                step: 1,
                allowReset: true
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
                  children: "Border Color (Optional)"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                  type: "color",
                  value: borderColor || "#000000",
                  onChange: e => setAttributes({
                    borderColor: e.target.value
                  }),
                  style: {
                    width: "100%",
                    height: "32px",
                    border: "1px solid #ddd",
                    borderRadius: "4px"
                  }
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
                label: "Border Style (Optional)",
                value: borderStyle,
                options: [{
                  label: "Solid",
                  value: "solid"
                }, {
                  label: "Dashed",
                  value: "dashed"
                }, {
                  label: "Dotted",
                  value: "dotted"
                }, {
                  label: "Double",
                  value: "double"
                }, {
                  label: "None",
                  value: "none"
                }],
                onChange: value => setAttributes({
                  borderStyle: value
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                style: {
                  marginTop: "16px"
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h4", {
                  style: {
                    marginTop: 0,
                    marginBottom: "10px",
                    fontSize: "12px",
                    fontWeight: "600"
                  },
                  children: "Individual Border Sides (Optional)"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
                  label: "Border Top",
                  value: borderTop ? parseInt(borderTop) || 0 : undefined,
                  onChange: value => setAttributes({
                    borderTop: value ? `${value}px` : ""
                  }),
                  min: 0,
                  max: 20,
                  step: 1,
                  allowReset: true
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
                  label: "Border Bottom",
                  value: borderBottom ? parseInt(borderBottom) || 0 : undefined,
                  onChange: value => setAttributes({
                    borderBottom: value ? `${value}px` : ""
                  }),
                  min: 0,
                  max: 20,
                  step: 1,
                  allowReset: true
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
                  label: "Border Left",
                  value: borderLeft ? parseInt(borderLeft) || 0 : undefined,
                  onChange: value => setAttributes({
                    borderLeft: value ? `${value}px` : ""
                  }),
                  min: 0,
                  max: 20,
                  step: 1,
                  allowReset: true
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
                  label: "Border Right",
                  value: borderRight ? parseInt(borderRight) || 0 : undefined,
                  onChange: value => setAttributes({
                    borderRight: value ? `${value}px` : ""
                  }),
                  min: 0,
                  max: 20,
                  step: 1,
                  allowReset: true
                })]
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              style: {
                marginTop: "16px"
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
                label: "Show Box Shadow",
                checked: showBoxShadow,
                onChange: value => setAttributes({
                  showBoxShadow: value
                })
              }), showBoxShadow && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
                label: "Box Shadow (Optional)",
                value: boxShadow || "",
                onChange: value => setAttributes({
                  boxShadow: value
                }),
                placeholder: "e.g., 0 2px 4px rgba(0,0,0,0.1)",
                help: "Enter CSS box-shadow value"
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
              style: {
                marginTop: "16px"
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
                label: "Border Radius (Optional)",
                value: borderRadius ? parseInt(borderRadius) || 0 : undefined,
                onChange: value => setAttributes({
                  borderRadius: value ? `${value}px` : ""
                }),
                min: 0,
                max: 50,
                step: 1,
                allowReset: true,
                help: "Rounded corners for accordion items"
              })
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
          title: "Item Images",
          initialOpen: false,
          children: items.map((item, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
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
              children: ["Item ", index + 1]
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
                children: "Image (Optional)"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUploadCheck, {
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUpload, {
                  onSelect: media => updateItemImage(index, media.url),
                  allowedTypes: ["image"],
                  value: item.imageUrl,
                  render: ({
                    open
                  }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                    children: item.imageUrl ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                      style: {
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "8px"
                      },
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("img", {
                        src: item.imageUrl,
                        alt: "Item",
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
                      children: "Select Image"
                    })
                  })
                })
              })]
            })]
          }, item.id))
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        ...blockProps,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          className: "bs-accordion-editor",
          children: [items.map((item, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            className: `bs-accordion-item ${item.isOpen ? "open" : ""}`,
            style: {
              marginBottom: `${itemSpacing}px`,
              padding: itemPadding || undefined,
              ...(showBorder ? borderTop || borderBottom || borderLeft || borderRight ? {
                borderTop: borderTop ? `${borderTop} ${borderStyle} ${borderColor || "rgba(0, 0, 0, 0.1)"}` : "none",
                borderBottom: borderBottom ? `${borderBottom} ${borderStyle} ${borderColor || "rgba(0, 0, 0, 0.1)"}` : "none",
                borderLeft: borderLeft ? `${borderLeft} ${borderStyle} ${borderColor || "rgba(0, 0, 0, 0.1)"}` : "none",
                borderRight: borderRight ? `${borderRight} ${borderStyle} ${borderColor || "rgba(0, 0, 0, 0.1)"}` : "none"
              } : {
                border: `${borderWidth || "1px"} ${borderStyle} ${borderColor || "rgba(0, 0, 0, 0.1)"}`
              } : {
                border: "none"
              }),
              boxShadow: showBoxShadow ? boxShadow || "0 2px 4px rgba(0, 0, 0, 0.1)" : "none",
              borderRadius: borderRadius || undefined
            },
            children: [item.imageUrl && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
              className: "bs-accordion-image-wrapper",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("img", {
                src: item.imageUrl,
                alt: "",
                className: "bs-accordion-image",
                style: {
                  height: item.isOpen ? imageHeightOpen || "auto" : imageHeightClosed || "auto",
                  width: imageWidth || "auto"
                }
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              className: "bs-accordion-content-wrapper",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                className: "bs-accordion-header",
                onClick: () => toggleItem(index),
                style: {
                  backgroundColor: item.isOpen ? activeBackgroundColor : backgroundColor,
                  color: item.isOpen ? activeTextColor : textColor,
                  padding: titlePadding || undefined
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                  className: "bs-accordion-title",
                  style: {
                    fontSize: titleFontSize || undefined
                  },
                  children: [showNumbering && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("span", {
                    className: "bs-accordion-number",
                    children: [index + 1, "."]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText, {
                    tagName: "span",
                    value: item.title,
                    onChange: value => updateItemTitle(index, value),
                    placeholder: "Enter accordion title...",
                    allowedFormats: ["core/bold", "core/italic"],
                    style: {
                      fontSize: titleFontSize || undefined
                    }
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                  className: "bs-accordion-icon",
                  style: {
                    backgroundColor: iconBackgroundColor || undefined,
                    width: iconBackgroundWidth || undefined,
                    height: iconBackgroundHeight || undefined,
                    ...(showIconBorder ? {
                      border: `${iconBorderWidth || "1px"} ${iconBorderStyle} ${iconBorderColor || "#000000"}`,
                      borderRadius: iconBorderRadius || undefined
                    } : {})
                  },
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
                    className: `bs-accordion-icon-inner ${iconStyle === "plus-minus" ? "bs-icon-plus-minus" : "bs-icon-chevron"}`,
                    style: {
                      color: iconColor || undefined,
                      fontSize: iconStyle === "plus-minus" && iconSize ? iconSize : undefined
                    },
                    children: iconStyle === "plus-minus" ? item.isOpen ? "−" : "+" : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("svg", {
                      width: iconSize || "24",
                      height: iconSize || "24",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("path", {
                        d: "M6.5 11.6L12 16l5.5-4.4-.9-1.2L12 14l-4.5-3.6-1 1.2z",
                        fill: "currentColor"
                      })
                    })
                  })
                })]
              }), item.isOpen && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                className: "bs-accordion-body",
                style: {
                  backgroundColor: backgroundColor,
                  color: textColor
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                  style: {
                    marginBottom: "10px"
                  },
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
                    onClick: () => setHtmlMode({
                      ...htmlMode,
                      [index]: !htmlMode[index]
                    }),
                    variant: "secondary",
                    size: "small",
                    style: {
                      marginBottom: "10px"
                    },
                    children: htmlMode[index] ? "Visual Editor" : "HTML Editor"
                  })
                }), htmlMode[index] ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextareaControl, {
                  value: item.content || "",
                  onChange: value => updateItemContent(index, value),
                  placeholder: "Enter HTML code here...",
                  rows: 8,
                  style: {
                    fontFamily: "monospace",
                    fontSize: "12px"
                  }
                }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText, {
                  tagName: "div",
                  value: item.content,
                  onChange: value => updateItemContent(index, value),
                  placeholder: "Enter accordion content...",
                  allowedFormats: ["core/bold", "core/italic", "core/link", "core/strikethrough"]
                })]
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              className: "bs-accordion-controls",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
                icon: "arrow-up-alt2",
                onClick: () => moveItemUp(index),
                disabled: index === 0,
                label: "Move Up"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
                icon: "arrow-down-alt2",
                onClick: () => moveItemDown(index),
                disabled: index === items.length - 1,
                label: "Move Down"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
                icon: "trash",
                onClick: () => removeItem(index),
                label: "Remove Item",
                isDestructive: true
              })]
            })]
          }, item.id)), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
            icon: "plus-alt2",
            onClick: addItem,
            className: "bs-accordion-add-item",
            children: "Add Accordion Item"
          })]
        })
      })]
    });
  },
  save: ({
    attributes,
    clientId
  }) => {
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
      className: "bs-accordion-container"
    });

    // Ensure blockId is unique - use clientId if blockId is missing
    const finalAttributes = {
      ...attributes,
      blockId: attributes.blockId || `bs-accordion-${clientId}`
    };
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      ...blockProps,
      dangerouslySetInnerHTML: {
        __html: (0,_template__WEBPACK_IMPORTED_MODULE_2__.generateAccordionHTML)(finalAttributes)
      }
    });
  }
});

/***/ }),

/***/ "./src/bs-accordion/style.css":
/*!************************************!*\
  !*** ./src/bs-accordion/style.css ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/bs-accordion/template.js":
/*!**************************************!*\
  !*** ./src/bs-accordion/template.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateAccordionHTML: () => (/* binding */ generateAccordionHTML)
/* harmony export */ });
/**
 * Generate HTML for BS Accordion block
 */
const generateAccordionHTML = attributes => {
  const {
    items = [],
    allowMultipleOpen = true,
    showNumbering = true,
    iconStyle = "plus-minus",
    backgroundColor = "#EAF9FF",
    textColor = "#333333",
    activeBackgroundColor = "#34B0E3",
    activeTextColor = "#ffffff",
    itemSpacing = 8,
    blockId = "bs-accordion-default",
    itemPadding = "",
    iconColor = "",
    iconBackgroundColor = "",
    iconBackgroundWidth = "",
    iconBackgroundHeight = "",
    iconSize = "",
    showIconBorder = false,
    iconBorderWidth = "",
    iconBorderColor = "",
    iconBorderStyle = "solid",
    iconBorderRadius = "",
    imageHeightOpen = "",
    imageWidth = "",
    imageHeightClosed = "",
    titleFontSize = "",
    showBorder = false,
    borderWidth = "",
    borderColor = "",
    borderStyle = "solid",
    borderTop = "",
    borderBottom = "",
    borderLeft = "",
    borderRight = "",
    showBoxShadow = true,
    boxShadow = "",
    borderRadius = ""
  } = attributes;

  // Use the unique block ID for styling
  // Generate unique ID if blockId is missing or default
  let uniqueId = blockId;
  if (!uniqueId || uniqueId === "bs-accordion-default") {
    // Generate a unique ID using timestamp and random number
    uniqueId = `bs-accordion-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Generate accordion items HTML
  const generateAccordionItems = () => {
    return items.map((item, index) => {
      const itemId = `${uniqueId}-item-${index}`;
      const isOpen = item.isOpen ? "open" : "";
      return `
				<div class="bs-accordion-item ${isOpen}" data-index="${index}">
					${item.imageUrl ? `<div class="bs-accordion-image-wrapper">
						<img src="${item.imageUrl}" alt="" class="bs-accordion-image" data-item-index="${index}" />
					</div>` : ""}
					<div class="bs-accordion-content-wrapper">
					<button 
						class="bs-accordion-header" 
						type="button"
						aria-expanded="${item.isOpen}"
						aria-controls="${itemId}-body"
						data-index="${index}"
					>
						<div class="bs-accordion-title">
							${showNumbering ? `<span class="bs-accordion-number">${index + 1}.</span>` : ""}
							<span class="bs-accordion-title-text">${item.title}</span>
						</div>
						<div class="bs-accordion-icon">
							<span class="bs-accordion-icon-inner ${iconStyle === "plus-minus" ? "bs-icon-plus-minus" : "bs-icon-chevron"}">
								${iconStyle === "plus-minus" ? item.isOpen ? "−" : "+" : `<svg width="${iconSize || "24"}" height="${iconSize || "24"}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M6.5 11.6L12 16l5.5-4.4-.9-1.2L12 14l-4.5-3.6-1 1.2z" fill="currentColor"/>
										</svg>`}
							</span>
						</div>
					</button>
					
					<div 
						class="bs-accordion-body ${isOpen}" 
						id="${itemId}-body"
					>
						<div class="bs-accordion-content">
							${item.content}
						</div>
					</div>
					</div>
				</div>
			`;
    }).join("");
  };

  // Generate inline styles (only dynamic colors and spacing)
  const generateStyles = () => {
    return `
            <style>
                #${uniqueId} {
                    --bs-accordion-item-padding: ${itemPadding || "unset"};
                    ${iconColor ? `--bs-accordion-icon-color: ${iconColor};` : ""}
                    ${iconBackgroundColor ? `--bs-accordion-icon-bg-color: ${iconBackgroundColor};` : ""}
                    ${iconBackgroundWidth ? `--bs-accordion-icon-bg-width: ${iconBackgroundWidth};` : ""}
                    ${iconBackgroundHeight ? `--bs-accordion-icon-bg-height: ${iconBackgroundHeight};` : ""}
                    ${iconSize ? `--bs-accordion-icon-size: ${iconSize};` : ""}
                    ${showIconBorder && iconBorderWidth ? `--bs-accordion-icon-border-width: ${iconBorderWidth};` : ""}
                    ${showIconBorder && iconBorderColor ? `--bs-accordion-icon-border-color: ${iconBorderColor};` : ""}
                    ${showIconBorder ? `--bs-accordion-icon-border-style: ${iconBorderStyle};` : ""}
                    ${showIconBorder && iconBorderRadius ? `--bs-accordion-icon-border-radius: ${iconBorderRadius};` : ""}
                    ${imageHeightOpen ? `--bs-accordion-image-height-open: ${imageHeightOpen};` : ""}
                    ${imageWidth ? `--bs-accordion-image-width: ${imageWidth};` : ""}
                    ${imageHeightClosed ? `--bs-accordion-image-height-closed: ${imageHeightClosed};` : ""}
                    ${titleFontSize ? `--bs-accordion-title-font-size: ${titleFontSize};` : ""}
                    ${showBorder && borderWidth ? `--bs-accordion-border-width: ${borderWidth};` : ""}
                    ${showBorder && borderColor ? `--bs-accordion-border-color: ${borderColor};` : ""}
                    ${showBorder ? `--bs-accordion-border-style: ${borderStyle};` : ""}
                    ${showBorder && borderTop ? `--bs-accordion-border-top: ${borderTop};` : ""}
                    ${showBorder && borderBottom ? `--bs-accordion-border-bottom: ${borderBottom};` : ""}
                    ${showBorder && borderLeft ? `--bs-accordion-border-left: ${borderLeft};` : ""}
                    ${showBorder && borderRight ? `--bs-accordion-border-right: ${borderRight};` : ""}
                    ${showBoxShadow && boxShadow ? `--bs-accordion-box-shadow: ${boxShadow};` : ""}
                    ${borderRadius ? `--bs-accordion-border-radius: ${borderRadius};` : ""}
                }
				
				#${uniqueId} .bs-accordion-item {
					margin-bottom: ${itemSpacing}px !important;
					padding: ${itemPadding || "0"} !important;
					${showBorder ? borderTop || borderBottom || borderLeft || borderRight ? `
						border-top: ${borderTop ? `${borderTop} ${borderStyle || "solid"} ${borderColor || "rgba(0, 0, 0, 0.1)"} !important` : "none !important"};
						border-bottom: ${borderBottom ? `${borderBottom} ${borderStyle || "solid"} ${borderColor || "rgba(0, 0, 0, 0.1)"} !important` : "none !important"};
						border-left: ${borderLeft ? `${borderLeft} ${borderStyle || "solid"} ${borderColor || "rgba(0, 0, 0, 0.1)"} !important` : "none !important"};
						border-right: ${borderRight ? `${borderRight} ${borderStyle || "solid"} ${borderColor || "rgba(0, 0, 0, 0.1)"} !important` : "none !important"};
					` : `
						border-width: ${borderWidth || "1px"} !important;
						border-color: ${borderColor || "rgba(0, 0, 0, 0.1)"} !important;
						border-style: ${borderStyle || "solid"} !important;
					` : "border: none !important;"}
					${showBoxShadow ? `
						box-shadow: var(--bs-accordion-box-shadow, 0 2px 4px rgba(0, 0, 0, 0.1)) !important;
					` : "box-shadow: none !important;"}
					${borderRadius ? `border-radius: ${borderRadius} !important;` : ""}
				}
				
				#${uniqueId} .bs-accordion-item .bs-accordion-header {
					background-color: ${backgroundColor} !important;
					color: ${textColor} !important;
					transition: all 0.3s ease !important;
				}
				#${uniqueId} .bs-accordion-item {
					background-color: ${backgroundColor} !important;
					color: ${textColor} !important;
					
				}
				
				#${uniqueId} .bs-accordion-title,
				#${uniqueId} .bs-accordion-title-text {
					${titleFontSize ? `font-size: var(--bs-accordion-title-font-size) !important;` : ""}
				}
				
				#${uniqueId} .bs-accordion-item.open {
					background-color: ${activeBackgroundColor} !important;
					
				}
				
				#${uniqueId} .bs-accordion-item.open .bs-accordion-header {
					background-color: ${activeBackgroundColor} !important;
					color: ${activeTextColor} !important;
					transition: all 0.3s ease !important;
				}
				
				#${uniqueId} .bs-accordion-content {
					background-color: ${backgroundColor} !important;
					color: ${textColor} !important;
				}
				
				#${uniqueId} .bs-accordion-item.open .bs-accordion-content {
					background-color: ${activeBackgroundColor} !important;
					color: ${activeTextColor} !important;
				}
				
				#${uniqueId} .bs-accordion-icon {
					${iconColor ? `color: ${iconColor} !important;` : ""}
					${iconBackgroundColor ? `background-color: ${iconBackgroundColor} !important;` : ""}
					${iconBackgroundWidth ? `width: ${iconBackgroundWidth} !important;` : ""}
					${iconBackgroundHeight ? `height: ${iconBackgroundHeight} !important;` : ""}
					${showIconBorder && iconBorderWidth ? `
						border: ${iconBorderWidth} ${iconBorderStyle || "solid"} ${iconBorderColor || "#000000"} !important;
						${iconBorderRadius ? `border-radius: ${iconBorderRadius} !important;` : ""}
					` : `border: none !important;`}
				}
				${iconSize ? `#${uniqueId} .bs-accordion-icon-inner {
					${iconStyle === "plus-minus" ? `font-size: var(--bs-accordion-icon-size) !important;` : ""}
				}` : ""}
				${imageHeightOpen || imageWidth || imageHeightClosed ? `
				#${uniqueId} .bs-accordion-image,
				#${uniqueId} .bs-accordion-image picture,
				#${uniqueId} .bs-accordion-image img {
					${imageWidth ? `width: var(--bs-accordion-image-width);` : ""}
					transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
				}
				#${uniqueId} .bs-accordion-item.open .bs-accordion-image,
				#${uniqueId} .bs-accordion-item.open .bs-accordion-image picture,
				#${uniqueId} .bs-accordion-item.open .bs-accordion-image img {
					${imageHeightOpen ? `height: var(--bs-accordion-image-height-open);` : ""}
				}
				#${uniqueId} .bs-accordion-item:not(.open) .bs-accordion-image,
				#${uniqueId} .bs-accordion-item:not(.open) .bs-accordion-image picture,
				#${uniqueId} .bs-accordion-item:not(.open) .bs-accordion-image img {
					${imageHeightClosed ? `height: var(--bs-accordion-image-height-closed);` : ""}
				}` : ""}
			</style>
		`;
  };

  // Generate JavaScript for accordion functionality
  const generateJavaScript = () => {
    return `
			<script>
				(function() {
					const accordionId = '${uniqueId}';
					const allowMultipleOpen = ${allowMultipleOpen};
					const iconStyle = '${iconStyle}';
					const imageHeightOpen = '${imageHeightOpen || ""}';
					const imageHeightClosed = '${imageHeightClosed || ""}';
					const imageWidth = '${imageWidth || ""}';
					
					// Initialize this specific accordion
					function initThisAccordion() {
						const accordion = document.getElementById(accordionId);
						if (!accordion) {
							return;
						}
						
						// Check if already initialized
						if (accordion.dataset.bsInitialized === 'true') {
							return;
						}
						
						// Mark as initialized
						accordion.dataset.bsInitialized = 'true';
					
						const headers = accordion.querySelectorAll('.bs-accordion-header');
						
						// Function to calculate proper height
						function getAccordionHeight(body) {
							const content = body.querySelector('.bs-accordion-content');
							if (content) {
								return content.scrollHeight;
							}
							return body.scrollHeight;
						}
						
						// Function to set initial heights
						function setInitialHeights() {
							accordion.querySelectorAll('.bs-accordion-item.open .bs-accordion-body').forEach(body => {
								const height = getAccordionHeight(body);
								body.style.maxHeight = height + 'px';
							});
						}
						
						// Function to update icons based on open/closed state
						function updateIcons() {
							accordion.querySelectorAll('.bs-accordion-item').forEach((item) => {
								const header = item.querySelector('.bs-accordion-header');
								const icon = header ? header.querySelector('.bs-accordion-icon') : null;
								const iconInner = icon ? icon.querySelector('.bs-accordion-icon-inner') : null;
								const isOpen = item.classList.contains('open');
								
								if (iconInner && iconStyle === 'plus-minus') {
									iconInner.textContent = isOpen ? '−' : '+';
								}
							});
						}
						
						// Function to update image heights
						function updateImageHeights() {
							accordion.querySelectorAll('.bs-accordion-item').forEach((itemEl) => {
								const imageWrapper = itemEl.querySelector('.bs-accordion-image');
								if (imageWrapper) {
									const isOpen = itemEl.classList.contains('open');
									
									const picture = imageWrapper.querySelector('picture');
									const img = picture ? picture.querySelector('img') : imageWrapper.querySelector('img') || imageWrapper;
									
									const elementsToUpdate = [imageWrapper];
									if (picture) elementsToUpdate.push(picture);
									if (img) elementsToUpdate.push(img);
									
									elementsToUpdate.forEach((el) => {
										if (isOpen && imageHeightOpen) {
											el.style.height = imageHeightOpen;
										} else if (!isOpen && imageHeightClosed) {
											el.style.height = imageHeightClosed;
										}
										if (imageWidth) {
											el.style.width = imageWidth;
										}
									});
								}
							});
						}
						
						// Add click handlers to headers
						headers.forEach(header => {
							header.addEventListener('click', function(e) {
								e.preventDefault();
								e.stopPropagation();
								
								const index = parseInt(this.dataset.index);
								const item = this.closest('.bs-accordion-item');
								if (!item) return;
								
								const body = item.querySelector('.bs-accordion-body');
								if (!body) return;
								
								const isOpen = item.classList.contains('open');
								
								// Update ARIA attributes
								this.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
								
								if (!allowMultipleOpen && !isOpen) {
									// Close all other items in THIS accordion only
									headers.forEach(otherHeader => {
										const otherIndex = parseInt(otherHeader.dataset.index);
										if (otherIndex !== index) {
											const otherItem = otherHeader.closest('.bs-accordion-item');
											const otherBody = otherItem ? otherItem.querySelector('.bs-accordion-body') : null;
											
											if (otherItem && otherBody) {
												otherItem.classList.remove('open');
												otherHeader.setAttribute('aria-expanded', 'false');
												otherBody.style.maxHeight = '0';
											}
										}
									});
								}
								
								// Toggle current item
								if (isOpen) {
									// Closing: set current height first, then animate to 0
									body.style.maxHeight = body.scrollHeight + 'px';
									body.offsetHeight; // Force reflow
									
									requestAnimationFrame(() => {
										body.style.maxHeight = '0';
										item.classList.remove('open');
										setTimeout(() => {
											updateIcons();
											updateImageHeights();
										}, 50);
									});
								} else {
									// Opening: first set maxHeight to 0, add class, then animate
									body.style.maxHeight = '0';
									item.classList.add('open');
									
									const content = body.querySelector('.bs-accordion-content');
									const height = content ? content.scrollHeight : body.scrollHeight;
									
									body.offsetHeight; // Force reflow
									
									requestAnimationFrame(() => {
										body.style.maxHeight = height + 'px';
										setTimeout(() => {
											updateIcons();
											updateImageHeights();
										}, 50);
										
										setTimeout(() => {
											if (item.classList.contains('open')) {
												body.style.maxHeight = 'none';
											}
										}, 400);
									});
								}
							});
						});
						
						// Set initial heights and icons after a short delay
						setTimeout(() => {
							setInitialHeights();
							updateIcons();
							updateImageHeights();
						}, 100);
					}
					
					// Initialize when DOM is ready - multiple ways to ensure it runs
					function runInit() {
						// Try immediate init
						initThisAccordion();
						
						// Also try after a small delay to catch late-loading content
						setTimeout(initThisAccordion, 50);
						setTimeout(initThisAccordion, 200);
					}
					
					if (document.readyState === 'loading') {
						document.addEventListener('DOMContentLoaded', runInit);
					} else {
						runInit();
					}
					
					// Also listen for when the element appears (for dynamic content)
					if (typeof MutationObserver !== 'undefined') {
						const observer = new MutationObserver(function(mutations) {
							const accordion = document.getElementById(accordionId);
							if (accordion && accordion.dataset.bsInitialized !== 'true') {
								initThisAccordion();
							}
						});
						
						observer.observe(document.body, {
							childList: true,
							subtree: true
						});
					}
				})();
			</script>
		`;
  };
  return `
		<div class="bs-accordion" id="${uniqueId}" data-allow-multiple="${allowMultipleOpen}">
			${generateAccordionItems()}
		</div>
		${generateStyles()}
		${generateJavaScript()}
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
/******/ 			"bs-accordion": 0,
/******/ 			"./style-bs-accordion": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-bs-accordion"], () => (__webpack_require__("./src/bs-accordion/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map