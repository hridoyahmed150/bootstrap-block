/**
 * Generate HTML for BS Feature Cards block
 */

export const generateFeatureCardsHTML = (attributes) => {
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
        blockId = "bs-feature-cards-default",
    } = attributes;

    // Use the unique block ID for styling
    const uniqueId = blockId;

    // Generate feature cards HTML
    const generateFeatureCards = () => {
        return items
            .map((item) => {
                const cardContent = `
					<div class="bs-feature-card ${
                        iconPosition === "left" ? "icon-left" : "icon-top"
                    }" style="
						background-color: ${cardBackgroundColor};
						color: ${textColor};
						${cardPadding ? `padding: ${cardPadding};` : ""}
						${cardBorderRadius ? `border-radius: ${cardBorderRadius};` : ""}
						${cardBorderWidth > 0 ? `border-width: ${cardBorderWidth}px;` : ""}
						${cardBorderWidth > 0 ? `border-style: ${cardBorderStyle};` : ""}
						${cardBorderWidth > 0 ? `border-color: ${cardBorderColor};` : ""}
					">
						${
                            item.iconUrl
                                ? `<div class="bs-feature-card-icon" style="
									background-color: ${iconBackgroundColor};
									${iconBorderRadius ? `border-radius: ${iconBorderRadius};` : ""}
									${iconContainerWidth ? `width: ${iconContainerWidth} !important;` : ""}
									${iconContainerHeight ? `height: ${iconContainerHeight} !important;` : ""}
									display: flex;
									align-items: center;
									justify-content: center;
								">
									${
                                        item.iconUrl
                                            .toLowerCase()
                                            .endsWith(".svg")
                                            ? `<img src="${
                                                  item.iconUrl
                                              }" alt="" class="bs-svg-icon" data-svg-url="${
                                                  item.iconUrl
                                              }" data-icon-color="${
                                                  item.iconColor || ""
                                              }" data-icon-hover-color="${
                                                  item.iconHoverColor || ""
                                              }" style="
												${
                                                    iconSize
                                                        ? `width: ${iconSize} !important; height: ${iconSize} !important;`
                                                        : "width: 100%; height: 100%;"
                                                }
												${!iconSize ? "max-width: 100%; max-height: 100%;" : ""}
												object-fit: contain;
												display: block;
												box-sizing: border-box;
											" />`
                                            : `<img src="${
                                                  item.iconUrl
                                              }" alt="" style="
												${
                                                    iconSize
                                                        ? `width: ${iconSize} !important; height: ${iconSize} !important;`
                                                        : "width: 100%; height: 100%;"
                                                }
												${!iconSize ? "max-width: 100%; max-height: 100%;" : ""}
												object-fit: contain;
												display: block;
												box-sizing: border-box;
											" />`
                                    }
								</div>`
                                : ""
                        }
						<div class="bs-feature-card-content">
							${
                                item.title
                                    ? item.title.trim().startsWith("<")
                                        ? `<div class="bs-feature-card-title" style="color: ${textColor}; transition: color 0.3s ease;">${item.title}</div>`
                                        : `<h3 class="bs-feature-card-title" style="color: ${textColor}; transition: color 0.3s ease;">${item.title}</h3>`
                                    : ""
                            }
							${
                                item.description
                                    ? `<div class="bs-feature-card-description" style="color: ${textColor}; transition: color 0.3s ease;">${item.description}</div>`
                                    : ""
                            }
						</div>
					</div>
				`;

                // Wrap in <a> tag if linkUrl is provided
                if (item.linkUrl && item.linkUrl.trim() !== "") {
                    return `<a href="${item.linkUrl}" class="bs-feature-card-link" style="text-decoration: none; display: block; color: inherit;">${cardContent}</a>`;
                }

                return cardContent;
            })
            .join("");
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
                    ${
                        cardHoverBackgroundColor
                            ? `background-color: ${cardHoverBackgroundColor} !important;`
                            : ""
                    }
                    ${
                        cardHoverTextColor
                            ? `color: ${cardHoverTextColor} !important;`
                            : ""
                    }
                }
                ${
                    cardHoverTextColor
                        ? `
                    #${uniqueId} .bs-feature-card:hover .bs-feature-card-title,
                    #${uniqueId} .bs-feature-card:hover .bs-feature-card-description,
                    #${uniqueId} .bs-feature-card:hover .bs-feature-card-content,
                    #${uniqueId} .bs-feature-card:hover .bs-feature-card-content * {
                        color: ${cardHoverTextColor} !important;
                    }
                `
                        : ""
                }
                ${
                    iconHoverBackgroundColor
                        ? `
                    #${uniqueId} .bs-feature-card:hover .bs-feature-card-icon {
                        background-color: ${iconHoverBackgroundColor} !important;
                    }
                `
                        : ""
                }
                ${items
                    .map((item, index) => {
                        // Only apply fill for SVG icons
                        if (
                            !item.iconUrl ||
                            !item.iconUrl.toLowerCase().endsWith(".svg")
                        ) {
                            return "";
                        }
                        let styles = "";
                        // Default icon fill color (not hover)
                        if (item.iconColor) {
                            styles += `
                    #${uniqueId} .bs-feature-card:nth-child(${
                        index + 1
                    }) .bs-feature-card-icon svg,
                    #${uniqueId} .bs-feature-card:nth-child(${
                        index + 1
                    }) .bs-feature-card-icon svg * {
                        fill: ${item.iconColor} !important;
                    }
                `;
                        }
                        // Icon hover fill color
                        if (item.iconHoverColor) {
                            styles += `
                    #${uniqueId} .bs-feature-card:nth-child(${
                        index + 1
                    }):hover .bs-feature-card-icon svg,
                    #${uniqueId} .bs-feature-card:nth-child(${
                        index + 1
                    }):hover .bs-feature-card-icon svg * {
                        fill: ${item.iconHoverColor} !important;
                    }
                `;
                        }
                        return styles;
                    })
                    .join("")}

                @media (max-width: 768px) {
                    #${uniqueId} .bs-feature-cards-grid {
                        grid-template-columns: 1fr;
                    }
                }

                @media (min-width: 769px) and (max-width: 1024px) {
                    #${uniqueId} .bs-feature-cards-grid {
                        grid-template-columns: repeat(${
                            columns > 2 ? 2 : columns
                        }, 1fr);
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
