/**
 * Generate HTML for BS Feature Cards block
 */

// Helper function to convert hex to CSS filter for SVG color change
// Uses a more accurate algorithm for color conversion
const hexToFilter = (hex) => {
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
            h = ((gNorm - bNorm) / delta) % 6;
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
    const saturateValue =
        s > 0.1 ? Math.min(Math.round(s * 5000), 5000) : Math.round(s * 2000);
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
									max-width: 100%;
									max-height: 100%;
									object-fit: contain;
									padding: 8px;
									display: block;
									box-sizing: border-box;
								" />
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
                ${items
                    .map((item, index) => {
                        // Use per-card icon hover color
                        if (!item.iconHoverColor) return "";
                        return `
                    #${uniqueId} .bs-feature-card:nth-child(${
                        index + 1
                    }):hover .bs-feature-card-icon img,
                    #${uniqueId} .bs-feature-card:nth-child(${
                        index + 1
                    }):hover .bs-feature-card-icon picture,
                    #${uniqueId} .bs-feature-card:nth-child(${
                        index + 1
                    }):hover .bs-feature-card-icon picture img,
                    #${uniqueId} .bs-feature-card:nth-child(${
                        index + 1
                    }):hover .bs-feature-card-icon svg,
                    #${uniqueId} .bs-feature-card:nth-child(${
                        index + 1
                    }):hover .bs-feature-card-icon picture source {
                        filter: ${hexToFilter(item.iconHoverColor)} !important;
                        -webkit-filter: ${hexToFilter(
                            item.iconHoverColor
                        )} !important;
                    }
                `;
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
	`;
};
