/**
 * Generate HTML for BS Accordion block
 */
export const generateAccordionHTML = (attributes) => {
	const {
		items = [],
		allowMultipleOpen = true,
		showNumbering = true,
		iconStyle = 'plus-minus',
		backgroundColor = '#EAF9FF',
		textColor = '#333333',
		activeBackgroundColor = '#34B0E3',
		activeTextColor = '#ffffff',
		itemSpacing = 8,
		blockId = 'bs-accordion-default',
		iconBackgroundColor = '#000000'
	} = attributes;

	// Use the unique block ID for styling
	const uniqueId = blockId;

	// Generate accordion items HTML
	const generateAccordionItems = () => {
		return items.map((item, index) => {
			const itemId = `${uniqueId}-item-${index}`;
			const isOpen = item.isOpen ? 'open' : '';
			const imageUrl = item.imageUrl || '';
			
			return `
				<div class="bs-accordion-item ${isOpen}" data-index="${index}" style="display: flex; gap: 20px; align-items: flex-start;">
					${imageUrl ? `
						<div class="bs-accordion-image" style="flex-shrink: 0; width: 200px; height: ${item.isOpen ? '300px' : '120px'}; transition: height 0.3s ease; overflow: hidden; border-radius: 8px;">
							<img src="${imageUrl}" alt="Accordion" style="width: 100%; height: 100%; object-fit: cover;" />
						</div>
					` : ''}
					<div style="flex: 1; display: flex; flex-direction: column;">
						<button 
							class="bs-accordion-header" 
							type="button"
							aria-expanded="${item.isOpen}"
							aria-controls="${itemId}-body"
							data-index="${index}"
							style="display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; cursor: pointer; border: none; width: 100%;"
						>
							<div class="bs-accordion-title">
								${showNumbering ? `<span class="bs-accordion-number">${index + 1}.</span>` : ''}
								<span class="bs-accordion-title-text">${item.title}</span>
							</div>
							<div class="bs-accordion-icon" style="background-color: ${iconBackgroundColor}; color: #ffffff; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 4px; font-size: 20px; font-weight: bold; flex-shrink: 0;">
								${iconStyle === 'plus-minus' ? 
									(item.isOpen ? '−' : '+') : 
									(item.isOpen ? '⌄' : '⌃')
								}
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
		}).join('');
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
						// Set initial image heights
						updateIcons();
					}
					
					// Function to update icons and image heights based on open/closed state
					function updateIcons() {
						accordion.querySelectorAll('.bs-accordion-item').forEach((item, index) => {
							const header = item.querySelector('.bs-accordion-header');
							const icon = header.querySelector('.bs-accordion-icon');
							const image = item.querySelector('.bs-accordion-image');
							const isOpen = item.classList.contains('open');
							
							if (icon) {
								if ('${iconStyle}' === 'plus-minus') {
									icon.textContent = isOpen ? '−' : '+';
								} else {
									icon.textContent = isOpen ? '⌄' : '⌃';
								}
							}
							
							// Update image height
							if (image) {
								image.style.height = isOpen ? '300px' : '120px';
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
										// Update icons and image heights for closed items
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
									// Update icons and image heights after class change
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
									// Update icons and image heights after class change
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
