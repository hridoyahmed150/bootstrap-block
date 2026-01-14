/**
 * Generate HTML for BS Accordion block
 */
export const generateAccordionHTML = (attributes) => {
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
        titlePadding = "",
        animationEnabled = false,
        animationName = "",
        animationDuration = 1000,
        animationDelay = 0,
        childAnimationEnabled = false,
        childAnimationInitialDelay = 0,
        childAnimationInterval = 0,
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
        borderRadius = "",
    } = attributes;

    // Use the unique block ID for styling
    // Generate unique ID if blockId is missing or default
    let uniqueId = blockId;
    if (!uniqueId || uniqueId === "bs-accordion-default") {
        // Generate a unique ID using timestamp and random number
        uniqueId = `bs-accordion-${Date.now()}-${Math.random()
            .toString(36)
            .substr(2, 9)}`;
    }

    // Generate accordion items HTML
    const generateAccordionItems = () => {
        return items
            .map((item, index) => {
                const itemId = `${uniqueId}-item-${index}`;
                const isOpen = item.isOpen ? "open" : "";

                // Build AOS attributes for child animation
                let aosAttributes = "";
                if (childAnimationEnabled) {
                    const childAnimationName = animationName || "fade-up";
                    const childDuration = animationDuration || 1000;
                    const delay =
                        childAnimationInitialDelay +
                        index * childAnimationInterval;

                    aosAttributes = ` data-aos="${childAnimationName}"`;
                    if (childDuration > 0) {
                        aosAttributes += ` data-aos-duration="${childDuration}"`;
                    }
                    if (delay > 0) {
                        aosAttributes += ` data-aos-delay="${delay}"`;
                    }
                }

                return `
				<div class="bs-accordion-item ${isOpen}" data-index="${index}"${aosAttributes}>
					${
                        item.imageUrl
                            ? `<div class="bs-accordion-image-wrapper">
						<img src="${item.imageUrl}" alt="" class="bs-accordion-image" data-item-index="${index}" />
					</div>`
                            : ""
                    }
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
							<span class="bs-accordion-icon-inner ${
                                iconStyle === "plus-minus"
                                    ? "bs-icon-plus-minus"
                                    : "bs-icon-chevron"
                            }">
								${
                                    iconStyle === "plus-minus"
                                        ? item.isOpen
                                            ? "−"
                                            : "+"
                                        : `<svg width="${
                                              iconSize || "24"
                                          }" height="${
                                              iconSize || "24"
                                          }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M6.5 11.6L12 16l5.5-4.4-.9-1.2L12 14l-4.5-3.6-1 1.2z" fill="currentColor"/>
										</svg>`
                                }
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
            })
            .join("");
    };

    // Generate inline styles (only dynamic colors and spacing)
    const generateStyles = () => {
        return `
            <style>
                #${uniqueId} {
                    --bs-accordion-item-padding: ${itemPadding || "unset"};
                    --bs-accordion-title-padding: ${titlePadding || "unset"};
                    ${
                        iconColor
                            ? `--bs-accordion-icon-color: ${iconColor};`
                            : ""
                    }
                    ${
                        iconBackgroundColor
                            ? `--bs-accordion-icon-bg-color: ${iconBackgroundColor};`
                            : ""
                    }
                    ${
                        iconBackgroundWidth
                            ? `--bs-accordion-icon-bg-width: ${iconBackgroundWidth};`
                            : ""
                    }
                    ${
                        iconBackgroundHeight
                            ? `--bs-accordion-icon-bg-height: ${iconBackgroundHeight};`
                            : ""
                    }
                    ${iconSize ? `--bs-accordion-icon-size: ${iconSize};` : ""}
                    ${
                        showIconBorder && iconBorderWidth
                            ? `--bs-accordion-icon-border-width: ${iconBorderWidth};`
                            : ""
                    }
                    ${
                        showIconBorder && iconBorderColor
                            ? `--bs-accordion-icon-border-color: ${iconBorderColor};`
                            : ""
                    }
                    ${
                        showIconBorder
                            ? `--bs-accordion-icon-border-style: ${iconBorderStyle};`
                            : ""
                    }
                    ${
                        showIconBorder && iconBorderRadius
                            ? `--bs-accordion-icon-border-radius: ${iconBorderRadius};`
                            : ""
                    }
                    ${
                        imageHeightOpen
                            ? `--bs-accordion-image-height-open: ${imageHeightOpen};`
                            : ""
                    }
                    ${
                        imageWidth
                            ? `--bs-accordion-image-width: ${imageWidth};`
                            : ""
                    }
                    ${
                        imageHeightClosed
                            ? `--bs-accordion-image-height-closed: ${imageHeightClosed};`
                            : ""
                    }
                    ${
                        titleFontSize
                            ? `--bs-accordion-title-font-size: ${titleFontSize};`
                            : ""
                    }
                    ${
                        showBorder && borderWidth
                            ? `--bs-accordion-border-width: ${borderWidth};`
                            : ""
                    }
                    ${
                        showBorder && borderColor
                            ? `--bs-accordion-border-color: ${borderColor};`
                            : ""
                    }
                    ${
                        showBorder
                            ? `--bs-accordion-border-style: ${borderStyle};`
                            : ""
                    }
                    ${
                        showBorder && borderTop
                            ? `--bs-accordion-border-top: ${borderTop};`
                            : ""
                    }
                    ${
                        showBorder && borderBottom
                            ? `--bs-accordion-border-bottom: ${borderBottom};`
                            : ""
                    }
                    ${
                        showBorder && borderLeft
                            ? `--bs-accordion-border-left: ${borderLeft};`
                            : ""
                    }
                    ${
                        showBorder && borderRight
                            ? `--bs-accordion-border-right: ${borderRight};`
                            : ""
                    }
                    ${
                        showBoxShadow && boxShadow
                            ? `--bs-accordion-box-shadow: ${boxShadow};`
                            : ""
                    }
                    ${
                        borderRadius
                            ? `--bs-accordion-border-radius: ${borderRadius};`
                            : ""
                    }
                }
				
				#${uniqueId} .bs-accordion-item {
					margin-bottom: ${itemSpacing}px !important;
					padding: ${itemPadding || "0"} !important;
					${
                        showBorder
                            ? borderTop ||
                              borderBottom ||
                              borderLeft ||
                              borderRight
                                ? `
						border-top: ${
                            borderTop
                                ? `${borderTop} ${borderStyle || "solid"} ${
                                      borderColor || "rgba(0, 0, 0, 0.1)"
                                  } !important`
                                : "none !important"
                        };
						border-bottom: ${
                            borderBottom
                                ? `${borderBottom} ${borderStyle || "solid"} ${
                                      borderColor || "rgba(0, 0, 0, 0.1)"
                                  } !important`
                                : "none !important"
                        };
						border-left: ${
                            borderLeft
                                ? `${borderLeft} ${borderStyle || "solid"} ${
                                      borderColor || "rgba(0, 0, 0, 0.1)"
                                  } !important`
                                : "none !important"
                        };
						border-right: ${
                            borderRight
                                ? `${borderRight} ${borderStyle || "solid"} ${
                                      borderColor || "rgba(0, 0, 0, 0.1)"
                                  } !important`
                                : "none !important"
                        };
					`
                                : `
						border-width: ${borderWidth || "1px"} !important;
						border-color: ${borderColor || "rgba(0, 0, 0, 0.1)"} !important;
						border-style: ${borderStyle || "solid"} !important;
					`
                            : "border: none !important;"
                    }
					${
                        showBoxShadow
                            ? `
						box-shadow: var(--bs-accordion-box-shadow, 0 2px 4px rgba(0, 0, 0, 0.1)) !important;
					`
                            : "box-shadow: none !important;"
                    }
					${borderRadius ? `border-radius: ${borderRadius} !important;` : ""}
				}
				
				#${uniqueId} .bs-accordion-item .bs-accordion-header {
					background-color: ${backgroundColor} !important;
					color: ${textColor} !important;
				}
				#${uniqueId} .bs-accordion-item {
					background-color: ${backgroundColor} !important;
					color: ${textColor} !important;
				}
				
				#${uniqueId} .bs-accordion-title,
				#${uniqueId} .bs-accordion-title-text {
					${
                        titleFontSize
                            ? `font-size: var(--bs-accordion-title-font-size) !important;`
                            : ""
                    }
					transition: font-size 0.3s ease !important;
				}
				
				#${uniqueId} .bs-accordion-item.open {
					background-color: ${activeBackgroundColor} !important;
				}
				
				#${uniqueId} .bs-accordion-item.open .bs-accordion-header {
					background-color: ${activeBackgroundColor} !important;
					color: ${activeTextColor} !important;
				}
				
				#${uniqueId} .bs-accordion-content {
					background-color: ${backgroundColor} !important;
					color: ${textColor} !important;
					transition: background-color 0.3s ease !important;
				}
				
				#${uniqueId} .bs-accordion-item.open .bs-accordion-content {
					background-color: ${activeBackgroundColor} !important;
					color: ${activeTextColor} !important;
				}
				
				#${uniqueId} .bs-accordion-icon {
					${iconColor ? `color: ${iconColor} !important;` : ""}
					${
                        iconBackgroundColor
                            ? `background-color: ${iconBackgroundColor} !important;`
                            : ""
                    }
					${iconBackgroundWidth ? `width: ${iconBackgroundWidth} !important;` : ""}
					${iconBackgroundHeight ? `height: ${iconBackgroundHeight} !important;` : ""}
					${
                        showIconBorder && iconBorderWidth
                            ? `
						border: ${iconBorderWidth} ${iconBorderStyle || "solid"} ${
                            iconBorderColor || "#000000"
                        } !important;
						${iconBorderRadius ? `border-radius: ${iconBorderRadius} !important;` : ""}
					`
                            : `border: none !important;`
                    }
				}
				${
                    iconSize
                        ? `#${uniqueId} .bs-accordion-icon-inner {
					${
                        iconStyle === "plus-minus"
                            ? `font-size: var(--bs-accordion-icon-size) !important;`
                            : ""
                    }
				}`
                        : ""
                }
				${
                    imageHeightOpen || imageWidth || imageHeightClosed
                        ? `
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
				}`
                        : ""
                }
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
					
						const headers = accordion.querySelectorAll('.bs-accordion-item');
						
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
					
					// Prevent clicks on interactive elements inside accordion body from toggling accordion
					const bodies = accordion.querySelectorAll('.bs-accordion-body');
					bodies.forEach(body => {
						body.addEventListener('click', function(e) {
							// Stop propagation for buttons, links, form elements, and other interactive elements
							const target = e.target;
							const isInteractive = target.tagName === 'BUTTON' || 
								target.tagName === 'A' || 
								target.tagName === 'INPUT' || 
								target.tagName === 'SELECT' || 
								target.tagName === 'TEXTAREA' ||
								target.closest('button') ||
								target.closest('a') ||
								target.closest('input') ||
								target.closest('select') ||
								target.closest('textarea');
							
							if (isInteractive) {
								e.stopPropagation();
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
