/**
 * BS Testimonial Slider HTML Template
 *
 * This file contains the HTML template for the testimonial slider output.
 * You can modify the HTML structure here while keeping the data intact.
 *
 * Available data variables:
 * - uniqueId: Unique identifier for the block
 * - blockTitle: Title of the testimonial block
 * - testimonials: Array of testimonial objects
 * - slickConfig: Slick slider configuration object
 * - sliderStyle: Current slider style (default, card, minimal)
 * - slideBackground: Background color for slides
 * - titleColor: Color for testimonial titles
 * - textColor: Color for testimonial text
 * - borderColor: Border color for slides
 * - borderWidth: Border width in pixels
 * - borderRadius: Border radius in pixels
 * - slideGap: Gap between slides in pixels
 */

// Helper function to get random background color for customer thumb
const getRandomBackgroundColor = (name) => {
    // Use name to generate consistent color for same person
    const colors = [
        "#2C3E50", // Dark Blue Gray
        "#E74C3C", // Dark Red
        "#8E44AD", // Dark Purple
        "#27AE60", // Dark Green
        "#F39C12", // Dark Orange
        "#34495E", // Dark Gray Blue
        "#D35400", // Dark Brown Orange
        "#2980B9", // Dark Blue
        "#16A085", // Dark Teal
        "#7F8C8D", // Dark Gray
        "#C0392B", // Dark Red
        "#8B4513", // Dark Brown
        "#2F4F4F", // Dark Slate Gray
        "#8B008B", // Dark Magenta
        "#006400", // Dark Green
    ];

    // Generate consistent index based on name
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
};

// Helper function to truncate text and generate Read More functionality
const generateReadMoreText = (
    text,
    wordLimit,
    testimonialId,
    uniqueId,
    textColor = "#666666"
) => {
    const words = text.split(" ");
    const limit = wordLimit || 20;

    if (words.length <= limit) {
        return `<div class="p mb-0 lh-15" style="font-size:16px; color: ${textColor};">${text}</div>`;
    }

    const truncatedText = words.slice(0, limit).join(" ");
    const remainingText = words.slice(limit).join(" ");

    return `
        <div class="p mb-0 lh-15" style="font-size:16px; color: ${textColor};">
            <span class="testimonial-text-short">${truncatedText}</span>
            <span class="testimonial-text-full" style="display: none;">${text}</span>
            <span class="testimonial-read-more" style="color: #007cba; cursor: pointer; text-decoration: underline;" data-testimonial-id="${testimonialId}" data-block-id="${uniqueId}">Read more</span>
        </div>
    `;
};

export const generateTestimonialHTML = (data) => {
    const {
        uniqueId,
        blockTitle,
        testimonials,
        slickConfig,
        sliderStyle,
        wordLimit,
        showDate,
        showRating,
        slideBackground,
        titleColor,
        textColor,
        borderColor,
        borderWidth,
        borderRadius,
        slideGap,
        arrowTheme,
        dotColor,
        dotActiveColor,
    } = data;

    // Generate individual testimonial HTML
    const testimonialSlides = testimonials
        .map(
            (testimonial, index) => `
        <div class="bsb-review" style="
            background-color: ${slideBackground || "#ffffff"};
            border: ${borderWidth || 1}px solid ${borderColor || "#e0e0e0"};
            border-radius: ${borderRadius || 8}px;
            margin: 0 ${(slideGap || 20) / 2}px;
        ">
            <div class="d-flex align-items-center justify-content-start mb-2">
                <span class="customer-thumb mr-2 me-2" style="background-color: ${getRandomBackgroundColor(
                    testimonial.name
                )};">
                    ${testimonial.name.charAt(0).toUpperCase()}
                </span>
                <div class="customer-info">
                    <h6 class="font-700 lh-13 mb-0" style="color: ${
                        titleColor || "#333333"
                    };">
                        ${testimonial.name}
                    </h6>
                </div>
            </div>

            ${showRating !== false ? `<div class="rating-star"></div>` : ""}

            ${generateReadMoreText(
                testimonial.text,
                wordLimit,
                `testimonial-${uniqueId}-${index}`,
                uniqueId,
                textColor
            )}
            
            ${
                showDate !== false && testimonial.date
                    ? `
                <div class="testimonial-date mt-2" style="font-size:14px; color: ${
                    textColor || "#666666"
                };">
                    ${testimonial.date}
                </div>
            `
                    : ""
            }
        </div>
    `
        )
        .join("");

    // Wrap testimonials in Slick slider container with theme class
    const themeClass = `bs-theme-${arrowTheme || "light"}`;
    return `
        <div class="bsb-slider-nav bsb-reviews ${themeClass} ${uniqueId}">
            ${testimonialSlides}
        </div>
        <style>
            .${uniqueId}.bsb-reviews .slick-dots li button {
                background-color: ${dotColor || "#D0D7E0"} !important;
            }
            .${uniqueId}.bsb-reviews .slick-dots li.slick-active button {
                background-color: ${dotActiveColor || "#007cba"} !important;
            }
        </style>
        <script>
            jQuery(document).ready(function($) {
                if ($.fn.slick) {
                    $('.${uniqueId}').slick(${JSON.stringify(slickConfig)});
                }
            });
        </script>
    `;
};

/**
 * Alternative template examples you can use:
 */

// Minimal template
export const generateMinimalTemplate = (data) => {
    const { uniqueId, testimonials, slickConfig } = data;

    return `
        <div class="testimonial-minimal ${uniqueId}" data-slick-config='${JSON.stringify(
            slickConfig
        )}'>
            ${testimonials
                .map(
                    (testimonial) => `
                <div class="testimonial-item">
                    <p class="testimonial-quote">"${testimonial.text}"</p>
                    <div class="testimonial-author">
                        <strong>${testimonial.name}</strong> - ${testimonial.company}
                    </div>
                </div>
            `
                )
                .join("")}
        </div>
    `;
};

// Card template
export const generateCardTemplate = (data) => {
    const { uniqueId, blockTitle, testimonials, slickConfig } = data;

    return `
        <div class="testimonial-cards ${uniqueId}" data-slick-config='${JSON.stringify(
            slickConfig
        )}'>
            ${
                blockTitle
                    ? `<h3 class="testimonial-section-title">${blockTitle}</h3>`
                    : ""
            }
            <div class="testimonial-grid">
                ${testimonials
                    .map(
                        (testimonial) => `
                    <div class="testimonial-card">
                        <div class="card-header">
                            <div class="author-avatar">
                                ${
                                    testimonial.avatar
                                        ? `<img src="${testimonial.avatar}" alt="${testimonial.name}" />`
                                        : `<span class="avatar-initial">${testimonial.name
                                              .charAt(0)
                                              .toUpperCase()}</span>`
                                }
                            </div>
                            <div class="author-info">
                                <h4>${testimonial.name}</h4>
                                <p>${testimonial.company}</p>
                            </div>
                        </div>
                        <div class="card-content">
                            <blockquote>"${testimonial.text}"</blockquote>
                        </div>
                        ${
                            testimonial.date
                                ? `<div class="card-footer"><small>${testimonial.date}</small></div>`
                                : ""
                        }
                    </div>
                `
                    )
                    .join("")}
            </div>
        </div>
    `;
};
