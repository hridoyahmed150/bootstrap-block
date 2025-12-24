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
    } = attributes;

    // Use the unique block ID for styling
    const uniqueId = blockId;

    // Generate accordion items HTML
    const generateAccordionItems = () => {
        return items
            .map((item, index) => {
                const itemId = `${uniqueId}-item-${index}`;
                const isOpen = item.isOpen ? "open" : "";

                return `
				<div class="bs-accordion-item ${isOpen}" data-index="${index}">
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
                }
				
				#${uniqueId} .bs-accordion-item {
					margin-bottom: ${itemSpacing}px;
					padding: var(--bs-accordion-item-padding);
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
				
				${
                    iconColor
                        ? `#${uniqueId} .bs-accordion-icon { color: var(--bs-accordion-icon-color); }`
                        : ""
                }
				${
                    iconSize
                        ? `#${uniqueId} .bs-accordion-icon-inner {
					${iconStyle === "plus-minus" ? `font-size: var(--bs-accordion-icon-size);` : ""}
				}`
                        : ""
                }
				${
                    iconBackgroundColor ||
                    iconBackgroundWidth ||
                    iconBackgroundHeight
                        ? `
				#${uniqueId} .bs-accordion-icon {
					${
                        iconBackgroundColor
                            ? `background-color: var(--bs-accordion-icon-bg-color);`
                            : ""
                    }
					${iconBackgroundWidth ? `width: var(--bs-accordion-icon-bg-width);` : ""}
					${iconBackgroundHeight ? `height: var(--bs-accordion-icon-bg-height);` : ""}
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
							const iconInner = icon ? icon.querySelector('.bs-accordion-icon-inner') : null;
							const isOpen = item.classList.contains('open');
							
							if (iconInner) {
								if ('${iconStyle}' === 'plus-minus') {
									iconInner.textContent = isOpen ? '−' : '+';
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
									
									// Set to none after animation for dynamic content
									setTimeout(() => {
										if (item.classList.contains('open')) {
											body.style.maxHeight = 'none';
										}
									}, 400);
								});
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
