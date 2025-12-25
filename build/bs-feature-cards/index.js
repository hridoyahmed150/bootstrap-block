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
      hideCardGap,
      cardPadding,
      cardBorderRadius,
      cardBorderWidth,
      cardBorderStyle,
      cardBorderColor,
      iconSize,
      iconContainerWidth,
      iconContainerHeight,
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
    const [cardBorderColorPopoverOpen, setCardBorderColorPopoverOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(false);
    // Per-card icon color popovers
    const [cardIconColorPopovers, setCardIconColorPopovers] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)({});
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
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
      className: "bs-feature-cards-container"
    });

    // Convert SVG images to inline SVG and apply fill
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
      const timeoutId = setTimeout(() => {
        items.forEach((item, index) => {
          if (item.iconUrl && item.iconUrl.toLowerCase().endsWith(".svg")) {
            const iconContainer = document.querySelector(`.bs-feature-cards-editor .bs-feature-card:nth-child(${index + 1}) .bs-feature-card-icon`);
            if (iconContainer) {
              const img = iconContainer.querySelector("img");
              const object = iconContainer.querySelector("object");
              const existingSvg = iconContainer.querySelector("svg");

              // Skip if already converted
              if (existingSvg) return;

              // Convert object tag to inline SVG
              if (object) {
                object.addEventListener("load", function () {
                  try {
                    const objectDoc = object.contentDocument;
                    if (objectDoc) {
                      const svg = objectDoc.querySelector("svg");
                      if (svg) {
                        const clonedSvg = svg.cloneNode(true);

                        // Apply default fill color
                        if (item.iconColor) {
                          clonedSvg.setAttribute("fill", item.iconColor);
                          const paths = clonedSvg.querySelectorAll("*");
                          paths.forEach(path => {
                            if (!path.getAttribute("fill") || path.getAttribute("fill") === "none") {
                              path.setAttribute("fill", item.iconColor);
                            }
                          });
                        }
                        clonedSvg.setAttribute("style", object.getAttribute("style") || "");
                        clonedSvg.setAttribute("width", "100%");
                        clonedSvg.setAttribute("height", "100%");
                        object.parentNode.replaceChild(clonedSvg, object);

                        // Set up hover
                        const card = iconContainer.closest(".bs-feature-card");
                        if (item.iconHoverColor && card) {
                          card.addEventListener("mouseenter", function () {
                            clonedSvg.setAttribute("fill", item.iconHoverColor);
                            const paths = clonedSvg.querySelectorAll("*");
                            paths.forEach(path => {
                              if (!path.getAttribute("fill") || path.getAttribute("fill") === "none") {
                                path.setAttribute("fill", item.iconHoverColor);
                              }
                            });
                          });
                          card.addEventListener("mouseleave", function () {
                            const defaultColor = item.iconColor || "";
                            clonedSvg.setAttribute("fill", defaultColor);
                            const paths = clonedSvg.querySelectorAll("*");
                            paths.forEach(path => {
                              if (!path.getAttribute("fill") || path.getAttribute("fill") === "none") {
                                path.setAttribute("fill", defaultColor);
                              }
                            });
                          });
                        }
                      }
                    }
                  } catch (e) {
                    // Cross-origin, use fetch
                    fetch(item.iconUrl).then(response => response.text()).then(svgText => {
                      const parser = new DOMParser();
                      const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
                      const svgElement = svgDoc.querySelector("svg");
                      if (!svgElement) return;
                      if (item.iconColor) {
                        svgElement.setAttribute("fill", item.iconColor);
                        const paths = svgElement.querySelectorAll("*");
                        paths.forEach(path => {
                          if (!path.getAttribute("fill") || path.getAttribute("fill") === "none") {
                            path.setAttribute("fill", item.iconColor);
                          }
                        });
                      }
                      svgElement.setAttribute("style", object.getAttribute("style") || "");
                      svgElement.setAttribute("width", "100%");
                      svgElement.setAttribute("height", "100%");
                      object.parentNode.replaceChild(svgElement, object);
                      const card = iconContainer.closest(".bs-feature-card");
                      if (item.iconHoverColor && card) {
                        card.addEventListener("mouseenter", function () {
                          svgElement.setAttribute("fill", item.iconHoverColor);
                          const paths = svgElement.querySelectorAll("*");
                          paths.forEach(path => {
                            if (!path.getAttribute("fill") || path.getAttribute("fill") === "none") {
                              path.setAttribute("fill", item.iconHoverColor);
                            }
                          });
                        });
                        card.addEventListener("mouseleave", function () {
                          const defaultColor = item.iconColor || "";
                          svgElement.setAttribute("fill", defaultColor);
                          const paths = svgElement.querySelectorAll("*");
                          paths.forEach(path => {
                            if (!path.getAttribute("fill") || path.getAttribute("fill") === "none") {
                              path.setAttribute("fill", defaultColor);
                            }
                          });
                        });
                      }
                    }).catch(error => console.error("Error loading SVG:", error));
                  }
                });
              }

              // Convert img tag to inline SVG
              if (img && !object) {
                fetch(item.iconUrl).then(response => response.text()).then(svgText => {
                  const parser = new DOMParser();
                  const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
                  const svgElement = svgDoc.querySelector("svg");
                  if (!svgElement) return;
                  if (item.iconColor) {
                    svgElement.setAttribute("fill", item.iconColor);
                    const paths = svgElement.querySelectorAll("*");
                    paths.forEach(path => {
                      if (!path.getAttribute("fill") || path.getAttribute("fill") === "none") {
                        path.setAttribute("fill", item.iconColor);
                      }
                    });
                  }
                  svgElement.setAttribute("style", img.getAttribute("style") || "");
                  svgElement.setAttribute("width", "100%");
                  svgElement.setAttribute("height", "100%");
                  img.parentNode.replaceChild(svgElement, img);
                  const card = iconContainer.closest(".bs-feature-card");
                  if (item.iconHoverColor && card) {
                    card.addEventListener("mouseenter", function () {
                      svgElement.setAttribute("fill", item.iconHoverColor);
                      const paths = svgElement.querySelectorAll("*");
                      paths.forEach(path => {
                        if (!path.getAttribute("fill") || path.getAttribute("fill") === "none") {
                          path.setAttribute("fill", item.iconHoverColor);
                        }
                      });
                    });
                    card.addEventListener("mouseleave", function () {
                      const defaultColor = item.iconColor || "";
                      svgElement.setAttribute("fill", defaultColor);
                      const paths = svgElement.querySelectorAll("*");
                      paths.forEach(path => {
                        if (!path.getAttribute("fill") || path.getAttribute("fill") === "none") {
                          path.setAttribute("fill", defaultColor);
                        }
                      });
                    });
                  }
                }).catch(error => console.error("Error loading SVG:", error));
              }
            }
          }
        });
      }, 100);
      return () => clearTimeout(timeoutId);
    }, [items]);

    // Add new item
    const addItem = () => {
      const newItem = {
        id: `item-${Date.now()}`,
        title: "New Feature",
        description: "Add your description here...",
        iconUrl: "",
        iconColor: "",
        iconHoverColor: "",
        linkUrl: ""
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
            step: 1,
            disabled: hideCardGap
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
            label: "Hide Card Gap",
            checked: hideCardGap,
            onChange: value => setAttributes({
              hideCardGap: value
            }),
            help: hideCardGap ? "Card gap is hidden" : "Card gap is visible"
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
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
            label: "Card Border Width (Optional)",
            value: cardBorderWidth || 0,
            onChange: value => setAttributes({
              cardBorderWidth: value || 0
            }),
            min: 0,
            max: 20,
            step: 1,
            allowReset: true
          }), cardBorderWidth > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
              label: "Card Border Style",
              value: cardBorderStyle,
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
                label: "Groove",
                value: "groove"
              }, {
                label: "Ridge",
                value: "ridge"
              }, {
                label: "Inset",
                value: "inset"
              }, {
                label: "Outset",
                value: "outset"
              }],
              onChange: value => setAttributes({
                cardBorderStyle: value
              })
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
                children: "Card Border Color"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                style: {
                  position: "relative"
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
                  onClick: () => setCardBorderColorPopoverOpen(!cardBorderColorPopoverOpen),
                  variant: "secondary",
                  style: {
                    width: "100%",
                    height: "32px",
                    backgroundColor: cardBorderColor || "transparent",
                    border: "1px solid #ddd"
                  },
                  children: cardBorderColor || "Select"
                }), cardBorderColorPopoverOpen && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Popover, {
                  onClose: () => setCardBorderColorPopoverOpen(false),
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ColorPicker, {
                    color: cardBorderColor || undefined,
                    onChangeComplete: value => {
                      let colorValue = "";
                      if (value.rgb && value.rgb.a !== undefined && value.rgb.a < 1) {
                        colorValue = `rgba(${value.rgb.r}, ${value.rgb.g}, ${value.rgb.b}, ${value.rgb.a})`;
                      } else {
                        colorValue = value.hex || "";
                      }
                      setAttributes({
                        cardBorderColor: colorValue
                      });
                    }
                  })
                })]
              }), cardBorderColor && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
                onClick: () => setAttributes({
                  cardBorderColor: "#000000"
                }),
                variant: "link",
                style: {
                  marginTop: "4px",
                  fontSize: "11px"
                },
                children: "Reset"
              })]
            })]
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
            allowReset: true,
            help: "Size of the icon image"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
            label: "Icon Container Width (Optional)",
            value: iconContainerWidth ? parseInt(iconContainerWidth) || 0 : undefined,
            onChange: value => setAttributes({
              iconContainerWidth: value ? `${value}px` : ""
            }),
            min: 20,
            max: 200,
            step: 1,
            allowReset: true,
            help: "Width of the icon container (div with background)"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
            label: "Icon Container Height (Optional)",
            value: iconContainerHeight ? parseInt(iconContainerHeight) || 0 : undefined,
            onChange: value => setAttributes({
              iconContainerHeight: value ? `${value}px` : ""
            }),
            min: 20,
            max: 200,
            step: 1,
            allowReset: true,
            help: "Height of the icon container (div with background)"
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
              }), item.iconUrl && item.iconUrl.toLowerCase().endsWith(".svg") && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
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
                    children: "Icon Color (Optional - For SVG)"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                    style: {
                      position: "relative"
                    },
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
                      onClick: () => setCardIconColorPopovers({
                        ...cardIconColorPopovers,
                        [index]: !cardIconColorPopovers[index]
                      }),
                      variant: "secondary",
                      style: {
                        width: "100%",
                        height: "32px",
                        backgroundColor: item.iconColor || "transparent",
                        border: "1px solid #ddd"
                      },
                      children: item.iconColor || "Select"
                    }), cardIconColorPopovers[index] && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Popover, {
                      onClose: () => setCardIconColorPopovers({
                        ...cardIconColorPopovers,
                        [index]: false
                      }),
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ColorPicker, {
                        color: item.iconColor || undefined,
                        onChangeComplete: value => {
                          let colorValue = "";
                          if (value.rgb && value.rgb.a !== undefined && value.rgb.a < 1) {
                            colorValue = `rgba(${value.rgb.r}, ${value.rgb.g}, ${value.rgb.b}, ${value.rgb.a})`;
                          } else {
                            colorValue = value.hex || "";
                          }
                          updateItem(index, "iconColor", colorValue);
                        }
                      })
                    })]
                  }), item.iconColor && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
                    onClick: () => updateItem(index, "iconColor", ""),
                    variant: "link",
                    style: {
                      marginTop: "4px",
                      fontSize: "11px"
                    },
                    children: "Clear"
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
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
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                style: {
                  marginTop: "12px",
                  marginBottom: "10px"
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                  style: {
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "600",
                    fontSize: "12px"
                  },
                  children: "Card Link URL (Optional)"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
                  value: item.linkUrl || "",
                  onChange: value => updateItem(index, "linkUrl", value),
                  placeholder: "https://example.com",
                  style: {
                    width: "100%"
                  }
                }), item.linkUrl && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
                  onClick: () => updateItem(index, "linkUrl", ""),
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
              gap: hideCardGap ? "0px" : `${cardSpacing}px`
            },
            children: [items.map((item, index) => {
              const cardContent = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                className: `bs-feature-card ${iconPosition === "left" ? "icon-left" : "icon-top"}`,
                style: {
                  backgroundColor: cardBackgroundColor || "#ffffff",
                  color: textColor || "#333333",
                  padding: cardPadding || undefined,
                  borderRadius: cardBorderRadius || undefined,
                  borderWidth: cardBorderWidth > 0 ? `${cardBorderWidth}px` : undefined,
                  borderStyle: cardBorderWidth > 0 ? cardBorderStyle || "solid" : undefined,
                  borderColor: cardBorderWidth > 0 ? cardBorderColor || "#000000" : undefined
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
                    ...(iconContainerWidth && {
                      width: iconContainerWidth
                    }),
                    ...(iconContainerHeight && {
                      height: iconContainerHeight
                    })
                  },
                  onMouseEnter: e => {
                    if (iconHoverBackgroundColor) {
                      e.currentTarget.style.backgroundColor = iconHoverBackgroundColor;
                    }
                    // Use per-card icon hover color (for SVG)
                    if (item.iconHoverColor && item.iconUrl.toLowerCase().endsWith(".svg")) {
                      const svg = e.currentTarget.querySelector("svg");
                      const object = e.currentTarget.querySelector("object");
                      if (svg) {
                        svg.setAttribute("fill", item.iconHoverColor);
                        const paths = svg.querySelectorAll("*");
                        paths.forEach(path => {
                          if (!path.getAttribute("fill") || path.getAttribute("fill") === "none") {
                            path.setAttribute("fill", item.iconHoverColor);
                          }
                        });
                      }
                      // Also handle object tag SVG
                      if (object) {
                        try {
                          const objectDoc = object.contentDocument;
                          if (objectDoc) {
                            const objectSvg = objectDoc.querySelector("svg");
                            if (objectSvg) {
                              objectSvg.setAttribute("fill", item.iconHoverColor);
                              const objectPaths = objectSvg.querySelectorAll("*");
                              objectPaths.forEach(path => {
                                if (!path.getAttribute("fill") || path.getAttribute("fill") === "none") {
                                  path.setAttribute("fill", item.iconHoverColor);
                                }
                              });
                            }
                          }
                        } catch (e) {
                          // Cross-origin restriction
                        }
                      }
                    }
                  },
                  onMouseLeave: e => {
                    e.currentTarget.style.backgroundColor = iconBackgroundColor || "#4CAF50";
                    // Restore default fill color for SVG
                    if (item.iconUrl.toLowerCase().endsWith(".svg")) {
                      const svg = e.currentTarget.querySelector("svg");
                      const object = e.currentTarget.querySelector("object");
                      if (svg) {
                        const defaultColor = item.iconColor || "";
                        svg.setAttribute("fill", defaultColor);
                        const paths = svg.querySelectorAll("*");
                        paths.forEach(path => {
                          if (!path.getAttribute("fill") || path.getAttribute("fill") === "none") {
                            path.setAttribute("fill", defaultColor);
                          }
                        });
                      }
                      // Also handle object tag SVG
                      if (object) {
                        try {
                          const objectDoc = object.contentDocument;
                          if (objectDoc) {
                            const objectSvg = objectDoc.querySelector("svg");
                            if (objectSvg) {
                              const defaultColor = item.iconColor || "";
                              objectSvg.setAttribute("fill", defaultColor);
                              const objectPaths = objectSvg.querySelectorAll("*");
                              objectPaths.forEach(path => {
                                if (!path.getAttribute("fill") || path.getAttribute("fill") === "none") {
                                  path.setAttribute("fill", defaultColor);
                                }
                              });
                            }
                          }
                        } catch (e) {
                          // Cross-origin restriction
                        }
                      }
                    }
                  },
                  children: item.iconUrl.toLowerCase().endsWith(".svg") ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("object", {
                    type: "image/svg+xml",
                    data: item.iconUrl,
                    style: {
                      width: iconSize || "100%",
                      height: iconSize || "100%",
                      maxWidth: iconSize ? "none" : "100%",
                      maxHeight: iconSize ? "none" : "100%",
                      objectFit: "contain"
                    },
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("img", {
                      src: item.iconUrl,
                      alt: "",
                      style: {
                        width: iconSize || "100%",
                        height: iconSize || "100%",
                        maxWidth: iconSize ? "none" : "100%",
                        maxHeight: iconSize ? "none" : "100%",
                        objectFit: "contain"
                      }
                    })
                  }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("img", {
                    src: item.iconUrl,
                    alt: "",
                    style: {
                      width: iconSize || "100%",
                      height: iconSize || "100%",
                      maxWidth: iconSize ? "none" : "100%",
                      maxHeight: iconSize ? "none" : "100%",
                      objectFit: "contain"
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
              });
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
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
                }), item.linkUrl && item.linkUrl.trim() !== "" ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("a", {
                  href: item.linkUrl,
                  className: "bs-feature-card-link",
                  style: {
                    textDecoration: "none",
                    display: "block",
                    color: "inherit"
                  },
                  onClick: e => {
                    // Prevent navigation in editor
                    e.preventDefault();
                  },
                  children: cardContent
                }) : cardContent]
              }, item.id);
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
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

const generateFeatureCardsHTML = attributes => {
  const {
    items = [],
    columns = 3,
    cardSpacing = 20,
    hideCardGap = false,
    cardPadding = "",
    cardBorderRadius = "",
    cardBorderWidth = 0,
    cardBorderStyle = "solid",
    cardBorderColor = "#000000",
    iconSize = "",
    iconContainerWidth = "",
    iconContainerHeight = "",
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
      const cardContent = `
					<div class="bs-feature-card ${iconPosition === "left" ? "icon-left" : "icon-top"}" style="
						background-color: ${cardBackgroundColor};
						color: ${textColor};
						${cardPadding ? `padding: ${cardPadding};` : ""}
						${cardBorderRadius ? `border-radius: ${cardBorderRadius};` : ""}
						${cardBorderWidth > 0 ? `border-width: ${cardBorderWidth}px;` : ""}
						${cardBorderWidth > 0 ? `border-style: ${cardBorderStyle};` : ""}
						${cardBorderWidth > 0 ? `border-color: ${cardBorderColor};` : ""}
					">
						${item.iconUrl ? `<div class="bs-feature-card-icon" style="
									background-color: ${iconBackgroundColor};
									${iconBorderRadius ? `border-radius: ${iconBorderRadius};` : ""}
									${iconContainerWidth ? `width: ${iconContainerWidth} !important;` : ""}
									${iconContainerHeight ? `height: ${iconContainerHeight} !important;` : ""}
									display: flex;
									align-items: center;
									justify-content: center;
								">
									${item.iconUrl.toLowerCase().endsWith(".svg") ? `<img src="${item.iconUrl}" alt="" class="bs-svg-icon" data-svg-url="${item.iconUrl}" data-icon-color="${item.iconColor || ""}" data-icon-hover-color="${item.iconHoverColor || ""}" style="
												${iconSize ? `width: ${iconSize} !important; height: ${iconSize} !important;` : "width: 100%; height: 100%;"}
												${!iconSize ? "max-width: 100%; max-height: 100%;" : ""}
												object-fit: contain;
												display: block;
												box-sizing: border-box;
											" />` : `<img src="${item.iconUrl}" alt="" style="
												${iconSize ? `width: ${iconSize} !important; height: ${iconSize} !important;` : "width: 100%; height: 100%;"}
												${!iconSize ? "max-width: 100%; max-height: 100%;" : ""}
												object-fit: contain;
												display: block;
												box-sizing: border-box;
											" />`}
								</div>` : ""}
						<div class="bs-feature-card-content">
							${item.title ? item.title.trim().startsWith("<") ? `<div class="bs-feature-card-title" style="color: ${textColor}; transition: color 0.3s ease;">${item.title}</div>` : `<h3 class="bs-feature-card-title" style="color: ${textColor}; transition: color 0.3s ease;">${item.title}</h3>` : ""}
							${item.description ? `<div class="bs-feature-card-description" style="color: ${textColor}; transition: color 0.3s ease;">${item.description}</div>` : ""}
						</div>
					</div>
				`;

      // Wrap in <a> tag if linkUrl is provided
      if (item.linkUrl && item.linkUrl.trim() !== "") {
        return `<a href="${item.linkUrl}" class="bs-feature-card-link" style="text-decoration: none; display: block; color: inherit;">${cardContent}</a>`;
      }
      return cardContent;
    }).join("");
  };

  // Generate inline styles
  const generateStyles = () => {
    return `
            <style>
                #${uniqueId} .bs-feature-cards-grid {
                    display: grid;
                    grid-template-columns: repeat(${columns}, 1fr);
                    gap: ${hideCardGap ? "0px" : `${cardSpacing}px`};
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
      // Only apply fill for SVG icons
      if (!item.iconUrl || !item.iconUrl.toLowerCase().endsWith(".svg")) {
        return "";
      }
      let styles = "";
      // Default icon fill color (not hover)
      if (item.iconColor) {
        styles += `
                    #${uniqueId} .bs-feature-card:nth-child(${index + 1}) .bs-feature-card-icon svg,
                    #${uniqueId} .bs-feature-card:nth-child(${index + 1}) .bs-feature-card-icon svg * {
                        fill: ${item.iconColor} !important;
                    }
                `;
      }
      // Icon hover fill color
      if (item.iconHoverColor) {
        styles += `
                    #${uniqueId} .bs-feature-card:nth-child(${index + 1}):hover .bs-feature-card-icon svg,
                    #${uniqueId} .bs-feature-card:nth-child(${index + 1}):hover .bs-feature-card-icon svg * {
                        fill: ${item.iconHoverColor} !important;
                    }
                `;
      }
      return styles;
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
		<script>
		(function() {
			const container = document.getElementById('${uniqueId}');
			if (!container) return;
			
			const svgIcons = container.querySelectorAll('.bs-svg-icon');
			svgIcons.forEach(function(img) {
				const svgUrl = img.getAttribute('data-svg-url');
				const iconColor = img.getAttribute('data-icon-color');
				const iconHoverColor = img.getAttribute('data-icon-hover-color');
				
				if (!svgUrl) return;
				
				fetch(svgUrl)
					.then(response => response.text())
					.then(svgText => {
						const parser = new DOMParser();
						const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
						const svgElement = svgDoc.querySelector('svg');
						
						if (!svgElement) return;
						
						// Apply default fill color
						if (iconColor) {
							svgElement.setAttribute('fill', iconColor);
							const paths = svgElement.querySelectorAll('*');
							paths.forEach(function(path) {
								if (!path.getAttribute('fill') || path.getAttribute('fill') === 'none') {
									path.setAttribute('fill', iconColor);
								}
							});
						}
						
						// Set up hover color
						const iconContainer = img.closest('.bs-feature-card-icon');
						const card = img.closest('.bs-feature-card');
						
						if (iconHoverColor && card) {
							card.addEventListener('mouseenter', function() {
								svgElement.setAttribute('fill', iconHoverColor);
								const paths = svgElement.querySelectorAll('*');
								paths.forEach(function(path) {
									if (!path.getAttribute('fill') || path.getAttribute('fill') === 'none') {
										path.setAttribute('fill', iconHoverColor);
									}
								});
							});
							
							card.addEventListener('mouseleave', function() {
								const defaultColor = iconColor || '';
								svgElement.setAttribute('fill', defaultColor);
								const paths = svgElement.querySelectorAll('*');
								paths.forEach(function(path) {
									if (!path.getAttribute('fill') || path.getAttribute('fill') === 'none') {
										path.setAttribute('fill', defaultColor);
									}
								});
							});
						}
						
						// Replace img with inline SVG
						svgElement.setAttribute('width', '100%');
						svgElement.setAttribute('height', '100%');
						svgElement.setAttribute('style', img.getAttribute('style'));
						svgElement.classList.add('bs-inline-svg');
						
						img.parentNode.replaceChild(svgElement, img);
					})
					.catch(function(error) {
						console.error('Error loading SVG:', error);
					});
			});
		})();
		</script>
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