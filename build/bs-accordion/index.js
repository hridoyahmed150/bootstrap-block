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
      blockId
    } = attributes;

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
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        ...blockProps,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          className: "bs-accordion-editor",
          children: [items.map((item, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            className: `bs-accordion-item ${item.isOpen ? "open" : ""}`,
            style: {
              marginBottom: `${itemSpacing}px`
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              className: "bs-accordion-header",
              onClick: () => toggleItem(index),
              style: {
                backgroundColor: item.isOpen ? activeBackgroundColor : backgroundColor,
                color: item.isOpen ? activeTextColor : textColor
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                className: "bs-accordion-title",
                children: [showNumbering && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("span", {
                  className: "bs-accordion-number",
                  children: [index + 1, "."]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText, {
                  tagName: "span",
                  value: item.title,
                  onChange: value => updateItemTitle(index, value),
                  placeholder: "Enter accordion title...",
                  allowedFormats: ["core/bold", "core/italic"]
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                className: "bs-accordion-icon",
                children: iconStyle === "plus-minus" ? item.isOpen ? "−" : "+" : item.isOpen ? "⌄" : "⌃"
              })]
            }), item.isOpen && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
              className: "bs-accordion-body",
              style: {
                backgroundColor: backgroundColor,
                color: textColor
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText, {
                tagName: "div",
                value: item.content,
                onChange: value => updateItemContent(index, value),
                placeholder: "Enter accordion content...",
                allowedFormats: ["core/bold", "core/italic", "core/link", "core/strikethrough"]
              })
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
    attributes
  }) => {
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
      className: "bs-accordion-container"
    });
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      ...blockProps,
      dangerouslySetInnerHTML: {
        __html: (0,_template__WEBPACK_IMPORTED_MODULE_2__.generateAccordionHTML)(attributes)
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
    itemPaddingTop,
    itemPaddingBottom,
    itemPaddingLeft,
    itemPaddingRight,
    iconBackgroundColor,
    iconColor,
    iconWidth,
    iconHeight,
    imageWidth,
    imageHeightClosed,
    imageHeightOpen
  } = attributes;

  // Use the unique block ID for styling
  const uniqueId = blockId;

  // Generate accordion items HTML
  const generateAccordionItems = () => {
    return items.map((item, index) => {
      const itemId = `${uniqueId}-item-${index}`;
      const isOpen = item.isOpen ? "open" : "";
      const imageUrl = item.imageUrl || null;
      const itemPaddingStyle = (itemPaddingTop !== null ? `padding-top: ${itemPaddingTop}px; ` : "") + (itemPaddingBottom !== null ? `padding-bottom: ${itemPaddingBottom}px; ` : "") + (itemPaddingLeft !== null ? `padding-left: ${itemPaddingLeft}px; ` : "") + (itemPaddingRight !== null ? `padding-right: ${itemPaddingRight}px; ` : "");
      const itemLayoutStyle = imageUrl ? `display: flex; gap: 20px; align-items: flex-start; ${itemPaddingStyle}` : itemPaddingStyle;
      const imageStyle = imageUrl && imageWidth !== null ? `width: ${imageWidth}px; ` : "";
      const imageHeightValue = item.isOpen ? imageHeightOpen !== null ? imageHeightOpen : null : imageHeightClosed !== null ? imageHeightClosed : null;
      const imageHeightStyle = imageUrl && imageHeightValue !== null ? `height: ${imageHeightValue}px; ` : "";
      const iconStyleAttr = (iconBackgroundColor === "transparent" ? "background: transparent; " : iconBackgroundColor ? `background-color: ${iconBackgroundColor}; ` : "") + (iconColor ? `color: ${iconColor}; ` : "") + (iconWidth !== null ? `width: ${iconWidth}px; ` : "") + (iconHeight !== null ? `height: ${iconHeight}px; ` : "");
      const iconDisplayStyle = iconWidth !== null || iconHeight !== null ? "display: flex; align-items: center; justify-content: center; " : "";
      return `
				<div class="bs-accordion-item ${isOpen}" data-index="${index}"${itemLayoutStyle ? ` style="${itemLayoutStyle}"` : ""}>
					${imageUrl ? `
						<div class="bs-accordion-image" style="${imageStyle}${imageHeightStyle}transition: height 0.3s ease; overflow: hidden; border-radius: 8px; flex-shrink: 0;">
							<img src="${imageUrl}" alt="Accordion" style="width: 100%; height: 100%; object-fit: cover;" />
						</div>
					` : ""}
					<div${imageUrl ? ' style="flex: 1; display: flex; flex-direction: column;"' : ""}>
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
							<div class="bs-accordion-icon"${iconStyleAttr || iconDisplayStyle ? ` style="${iconStyleAttr}${iconDisplayStyle}"` : ""}>
								${iconStyle === "plus-minus" ? item.isOpen ? "−" : "+" : item.isOpen ? "⌄" : "⌃"}
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
				#${uniqueId} .bs-accordion-item {
					margin-bottom: ${itemSpacing}px;
				}
				
				#${uniqueId} .bs-accordion-header {
					background-color: ${backgroundColor};
					color: ${textColor};
				}
				
				#${uniqueId} .bs-accordion-item.open {
					background-color: ${activeBackgroundColor};
				}
				
				#${uniqueId} .bs-accordion-item.open .bs-accordion-header {
					background-color: transparent;
					color: ${activeTextColor};
				}
				
				#${uniqueId} .bs-accordion-content {
					background-color: ${backgroundColor};
					color: ${textColor};
				}
				
				#${uniqueId} .bs-accordion-item.open .bs-accordion-content {
					background-color: ${activeBackgroundColor};
					color: ${activeTextColor};
				}
				
				#${uniqueId} .bs-accordion-icon {
					transform-origin: center center;
					transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
				}
				
				#${uniqueId} .bs-accordion-item.open .bs-accordion-icon {
					transform: rotate(180deg);
				}
				
				@media (max-width: 768px) {
					#${uniqueId} .bs-accordion-item {
						flex-direction: column !important;
					}
					
					#${uniqueId} .bs-accordion-image {
						width: 100% !important;
					}
				}
			</style>
		`;
  };

  // Generate JavaScript for accordion functionality
  const generateJavaScript = () => {
    return `
			<script>
				(function() {
					function initAccordion() {
						const accordion = document.getElementById('${uniqueId}');
						if (!accordion) {
							console.log('Accordion not found with ID: ${uniqueId}');
							return;
						}
					
					const headers = accordion.querySelectorAll('.bs-accordion-header');
					const allowMultipleOpen = ${allowMultipleOpen};
					
					// Function to calculate proper height
					function getAccordionHeight(body) {
						// Get the content div inside body
						const content = body.querySelector('.bs-accordion-content');
						if (content) {
							// Return the scrollHeight of the content plus padding
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
						accordion.querySelectorAll('.bs-accordion-item').forEach((item, index) => {
							const header = item.querySelector('.bs-accordion-header');
							const icon = header.querySelector('.bs-accordion-icon');
							const isOpen = item.classList.contains('open');
							
							if (icon) {
								if ('${iconStyle}' === 'plus-minus') {
									icon.textContent = isOpen ? '−' : '+';
								} else {
									icon.textContent = isOpen ? '⌄' : '⌃';
								}
							}
						});
					}
					
					headers.forEach(header => {
						header.addEventListener('click', function() {
							const index = parseInt(this.dataset.index);
							const item = this.closest('.bs-accordion-item');
							const body = item.querySelector('.bs-accordion-body');
							const isOpen = item.classList.contains('open');
							
							// Update ARIA attributes
							this.setAttribute('aria-expanded', !isOpen);
							
							if (!allowMultipleOpen && !isOpen) {
								// Close all other items
								headers.forEach(otherHeader => {
									const otherIndex = parseInt(otherHeader.dataset.index);
									if (otherIndex !== index) {
										const otherItem = otherHeader.closest('.bs-accordion-item');
										const otherBody = otherItem.querySelector('.bs-accordion-body');
										
										otherItem.classList.remove('open');
										otherHeader.setAttribute('aria-expanded', 'false');
										otherBody.style.maxHeight = '0';
										// Update icons for closed items
										setTimeout(updateIcons, 50);
										// Update image height for closed items
										const otherImage = otherItem.querySelector('.bs-accordion-image');
										if (otherImage && ${imageHeightClosed !== null ? imageHeightClosed : "null"} !== null) {
											otherImage.style.height = ${imageHeightClosed !== null ? imageHeightClosed : "null"} + 'px';
										}
									}
								});
							}
							
							// Toggle current item
							if (isOpen) {
								// Closing: set current height first, then animate to 0
								body.style.maxHeight = body.scrollHeight + 'px';
								
								// Force reflow to ensure the height is applied
								body.offsetHeight;
								
								// Now animate to 0
								requestAnimationFrame(() => {
									body.style.maxHeight = '0';
									item.classList.remove('open');
									// Update icons after class change
									setTimeout(updateIcons, 50);
								});
							} else {
								// Opening: first set maxHeight to 0, add class, then animate
								body.style.maxHeight = '0';
								item.classList.add('open');
								
								// Calculate exact height (with open state applied)
								const content = body.querySelector('.bs-accordion-content');
								const height = content ? content.scrollHeight : body.scrollHeight;
								
								// Force reflow
								body.offsetHeight;
								
								// Animate to calculated height
								requestAnimationFrame(() => {
									body.style.maxHeight = height + 'px';
									// Update icons after class change
									setTimeout(updateIcons, 50);
									
									// Update image height
									const image = item.querySelector('.bs-accordion-image');
									if (image && ${imageHeightOpen !== null ? imageHeightOpen : "null"} !== null) {
										image.style.height = ${imageHeightOpen !== null ? imageHeightOpen : "null"} + 'px';
									}
									
									// Set to none after animation for dynamic content
									setTimeout(() => {
										if (item.classList.contains('open')) {
											body.style.maxHeight = 'none';
										}
									}, 400);
								});
							} else {
								// Update image height when closing
								const image = item.querySelector('.bs-accordion-image');
								if (image && ${imageHeightClosed !== null ? imageHeightClosed : "null"} !== null) {
									image.style.height = ${imageHeightClosed !== null ? imageHeightClosed : "null"} + 'px';
								}
							}
						});
					});
					
					// Set initial heights and icons after a short delay to ensure content is rendered
					setTimeout(() => {
						setInitialHeights();
						updateIcons();
					}, 100);
					
					// Also set heights on window resize
					window.addEventListener('resize', setInitialHeights);
					}
					
					// Initialize when DOM is ready
					if (document.readyState === 'loading') {
						document.addEventListener('DOMContentLoaded', initAccordion);
					} else {
						initAccordion();
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