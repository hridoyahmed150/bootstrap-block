/**
 * Generate HTML for BS Feature Cards block
 */

// Helper function to convert hex to CSS filter for SVG color change
const hexToFilter = (hex) => {
    if (!hex) return "";
    // Remove # if present
    hex = hex.replace("#", "");
    // Convert hex to RGB
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    // Calculate filter values for color change
    // Using a more accurate method for color conversion
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    const hue = Math.round(
        (Math.atan2(g - b, r - (g + b) / 2) * 180) / Math.PI
    );
    return `brightness(0) saturate(100%) invert(${
        brightness > 128 ? "1" : "0"
    }) sepia(100%) saturate(10000%) hue-rotate(${hue}deg)`;
};

export const generateFeatureCardsHTML = (attributes) => {
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
        iconHoverColor = "",
        blockId = "bs-feature-cards-default",
    } = attributes;

    // Use the unique block ID for styling
    const uniqueId = blockId;

    // Generate feature cards HTML
    const generateFeatureCards = () => {
        return items
            .map((item) => {
                return `
				<div class="bs-feature-card ${
                    iconPosition === "left" ? "icon-left" : "icon-top"
                }" style="
					background-color: ${cardBackgroundColor};
					color: ${textColor};
					${cardPadding ? `padding: ${cardPadding};` : ""}
					${cardBorderRadius ? `border-radius: ${cardBorderRadius};` : ""}
				">
					${
                        item.iconUrl
                            ? `<div class="bs-feature-card-icon" style="
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
									object-fit: contain;
									padding: 12px;
									display: block;
								" />
							</div>`
                            : ""
                    }
					<div class="bs-feature-card-content">
						<h3 class="bs-feature-card-title" style="color: ${textColor}; transition: color 0.3s ease;">
							${item.title || ""}
						</h3>
						<div class="bs-feature-card-description" style="color: ${textColor}; transition: color 0.3s ease;">
							${item.description || ""}
						</div>
					</div>
				</div>
			`;
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
                    gap: ${cardSpacing}px;
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
                ${
                    iconHoverColor
                        ? `
                    #${uniqueId} .bs-feature-card:hover .bs-feature-card-icon img,
                    #${uniqueId} .bs-feature-card:hover .bs-feature-card-icon picture,
                    #${uniqueId} .bs-feature-card:hover .bs-feature-card-icon picture img {
                        filter: ${hexToFilter(iconHoverColor)} !important;
                    }
                `
                        : ""
                }

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
	`;
};
