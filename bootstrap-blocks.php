<?php
/*
Plugin Name: Bootstrap Blocks
Description: Provides custom Gutenberg blocks styled with Bootstrap.
Version: 1.0.2
Author: Himel Kazi
Author URI: https://www.linkedin.com/in/itshimelkazi/
*/

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

// Plugin activation hook.
function bootstrap_blocks_activate()
{
    // Activation code here.
}
register_activation_hook(__FILE__, 'bootstrap_blocks_activate');

// Plugin deactivation hook.
function bootstrap_blocks_deactivate()
{
    // Deactivation code here.
}
register_deactivation_hook(__FILE__, 'bootstrap_blocks_deactivate');

// Enqueue Bootstrap CSS only on post/page edit screens
function bootstrap_blocks_admin_enqueue_scripts()
{
    // Only load on post/page edit screens where Gutenberg editor is active
    $screen = get_current_screen();
    if (!$screen || !in_array($screen->base, array('post', 'post-new'))) {
        return;
    }

    // Only load for post types that support the editor
    if (!post_type_supports($screen->post_type, 'editor')) {
        return;
    }

    // Enqueue Slick slider in admin for editor preview
    bootstrap_blocks_enqueue_slick_slider();

    wp_enqueue_style(
        'bootstrap-css',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
        array(),
        '5.3.0'
    );

    // Enqueue editor styles for optimized blocks
    wp_enqueue_style('bootstrap-blocks-bs-service-area-style');
    wp_enqueue_style('bootstrap-blocks-bs-accordion-style');

    // Add custom admin CSS for editor width override
    wp_add_inline_style('bootstrap-css', '
        .editor-styles-wrapper :where(.wp-block),
        .editor-styles-wrapper .wp-block,
        .block-editor-block-list__layout .wp-block,
        .block-editor-block-list__layout .wp-block[data-type="bootstrap-blocks/bs-section"],
        .block-editor-block-list__layout .wp-block[data-type="bootstrap-blocks/bs-row"],
        .block-editor-block-list__layout .wp-block[data-type="bootstrap-blocks/bs-column"],
        .block-editor-block-list__layout .wp-block[data-type="bootstrap-blocks/bs-testimonial"],
        .block-editor-block-list__layout .wp-block[data-type="bootstrap-blocks/bs-nap"],
        .block-editor-block-list__layout .wp-block[data-type="bootstrap-blocks/bs-accordion"],
        .block-editor-block-list__layout .wp-block[data-type="bootstrap-blocks/bs-service-area"] {
            max-width: 90% !important;
        }
    ');
}
add_action('admin_enqueue_scripts', 'bootstrap_blocks_admin_enqueue_scripts');

// Simple function to enqueue Slick slider from theme
function bootstrap_blocks_enqueue_slick_slider()
{
    // Check if Slick is already enqueued by theme
    if (wp_script_is('slick', 'enqueued') || wp_script_is('slick', 'registered')) {
        return; // Theme already handles Slick
    }

    // Get theme directory
    $theme_url = get_stylesheet_directory_uri();
    $libs_dir = $theme_url . '/assets/libs';

    // Register and enqueue Slick CSS
    wp_register_style('slick-main', $libs_dir . '/slick/slick.css', array(), null, 'all');
    wp_register_style('slick-theme', $libs_dir . '/slick/slick-theme.css', array(), null, 'all');

    wp_enqueue_style('slick-main');
    wp_enqueue_style('slick-theme');

    // Register and enqueue Slick JS
    wp_register_script('slick', $libs_dir . '/slick/slick.min.js', array('jquery'), null, true);
    wp_enqueue_script('slick');
}


// Enqueue frontend scripts
function bootstrap_blocks_enqueue_scripts()
{
    // Enqueue Slick slider if available
    bootstrap_blocks_enqueue_slick_slider();

    // Conditionally enqueue styles for optimized blocks
    if (has_block('bootstrap-blocks/bs-service-area')) {
        wp_enqueue_style('bootstrap-blocks-bs-service-area-style');
    }

    if (has_block('bootstrap-blocks/bs-accordion')) {
        wp_enqueue_style('bootstrap-blocks-bs-accordion-style');
    }

    // Enqueue AOS if data-aos attributes exist (frontend only)
    if (!is_admin()) {
        global $post;
        if ($post && (strpos($post->post_content, 'data-aos=') !== false || strpos($post->post_content, 'animationEnabled') !== false) && !wp_script_is('aos', 'enqueued')) {
            $plugin_url = plugin_dir_url(__FILE__);
            wp_enqueue_style('aos', $plugin_url . 'assets/aos/aos.css', array(), '2.3.4');
            wp_enqueue_script('aos', $plugin_url . 'assets/aos/aos.js', array(), '2.3.4', true);
            wp_add_inline_script('aos', 'document.addEventListener("DOMContentLoaded",function(){if(typeof AOS!=="undefined")AOS.init({once:true,offset:0,delay:0})});');
        }
    }

    // Add global JavaScript for Read More functionality and Map initialization
    wp_add_inline_script('jquery', '
        document.addEventListener("DOMContentLoaded", function() {
            // Handle Read More functionality for all testimonial blocks
            document.addEventListener("click", function(e) {
                if (e.target.classList.contains("testimonial-read-more")) {
                    const readMoreBtn = e.target;
                    const container = readMoreBtn.parentElement;
                    const shortText = container.querySelector(".testimonial-text-short");
                    const fullText = container.querySelector(".testimonial-text-full");
                    
                    if (shortText && fullText) {
                        if (shortText.style.display !== "none") {
                            shortText.style.display = "none";
                            fullText.style.display = "inline";
                            readMoreBtn.textContent = "Read less";
                        } else {
                            shortText.style.display = "inline";
                            fullText.style.display = "none";
                            readMoreBtn.textContent = "Read more";
                        }
                    }
                }
            });
            
        });
    ');
}
add_action('wp_enqueue_scripts', 'bootstrap_blocks_enqueue_scripts');

// Initialize plugin.
function bootstrap_blocks_init()
{
    // Register bs-section block
    $bs_section_dir = plugin_dir_path(__FILE__) . 'build/bs-section/';
    $bs_section_url = plugin_dir_url(__FILE__) . 'build/bs-section/';

    register_block_type($bs_section_dir, [
        'editor_script' => 'bootstrap-blocks-bs-section-editor',
        'style' => 'bootstrap-blocks-bs-section-style',
    ]);

    wp_register_script(
        'bootstrap-blocks-bs-section-editor',
        $bs_section_url . 'index.js',
        array(
            'wp-blocks',
            'wp-element',
            'wp-block-editor',
            'wp-components',
            'wp-i18n',
            'wp-data'
        ),
        file_exists($bs_section_dir . 'index.js') ? filemtime($bs_section_dir . 'index.js') : '1.0.0'
    );

    wp_register_style(
        'bootstrap-blocks-bs-section-style',
        plugin_dir_url(__FILE__) . 'build/style-bs-section.css',
        array(),
        file_exists(plugin_dir_path(__FILE__) . 'build/style-bs-section.css') ? filemtime(plugin_dir_path(__FILE__) . 'build/style-bs-section.css') : '1.0.0'
    );

    // Register bs-row block
    $bs_row_dir = plugin_dir_path(__FILE__) . 'build/bs-row/';
    $bs_row_url = plugin_dir_url(__FILE__) . 'build/bs-row/';

    register_block_type($bs_row_dir, [
        'editor_script' => 'bootstrap-blocks-bs-row-editor',
        'style' => 'bootstrap-blocks-bs-row-style',
    ]);

    wp_register_script(
        'bootstrap-blocks-bs-row-editor',
        $bs_row_url . 'index.js',
        array(
            'wp-blocks',
            'wp-element',
            'wp-block-editor',
            'wp-components',
            'wp-i18n',
            'wp-data'
        ),
        file_exists($bs_row_dir . 'index.js') ? filemtime($bs_row_dir . 'index.js') : '1.0.0'
    );

    wp_register_style(
        'bootstrap-blocks-bs-row-style',
        plugin_dir_url(__FILE__) . 'build/style-bs-row.css',
        array(),
        file_exists(plugin_dir_path(__FILE__) . 'build/style-bs-row.css') ? filemtime(plugin_dir_path(__FILE__) . 'build/style-bs-row.css') : '1.0.0'
    );

    // Register bs-column block
    $bs_column_dir = plugin_dir_path(__FILE__) . 'build/bs-column/';
    $bs_column_url = plugin_dir_url(__FILE__) . 'build/bs-column/';

    register_block_type($bs_column_dir, [
        'editor_script' => 'bootstrap-blocks-bs-column-editor',
        'style' => 'bootstrap-blocks-bs-column-style',
    ]);

    wp_register_script(
        'bootstrap-blocks-bs-column-editor',
        $bs_column_url . 'index.js',
        array(
            'wp-blocks',
            'wp-element',
            'wp-block-editor',
            'wp-components',
            'wp-i18n',
            'wp-data'
        ),
        file_exists($bs_column_dir . 'index.js') ? filemtime($bs_column_dir . 'index.js') : '1.0.0'
    );

    wp_register_style(
        'bootstrap-blocks-bs-column-style',
        plugin_dir_url(__FILE__) . 'build/style-bs-column.css',
        array(),
        file_exists(plugin_dir_path(__FILE__) . 'build/style-bs-column.css') ? filemtime(plugin_dir_path(__FILE__) . 'build/style-bs-column.css') : '1.0.0'
    );

    // Register bs-testimonial block
    $bs_testimonial_dir = plugin_dir_path(__FILE__) . 'build/bs-testimonial/';
    $bs_testimonial_url = plugin_dir_url(__FILE__) . 'build/bs-testimonial/';

    register_block_type($bs_testimonial_dir, [
        'editor_script' => 'bootstrap-blocks-bs-testimonial-editor',
        'style' => 'bootstrap-blocks-bs-testimonial-style',
    ]);

    wp_register_script(
        'bootstrap-blocks-bs-testimonial-editor',
        $bs_testimonial_url . 'index.js',
        array(
            'wp-blocks',
            'wp-element',
            'wp-block-editor',
            'wp-components',
            'wp-i18n',
            'wp-data'
        ),
        file_exists($bs_testimonial_dir . 'index.js') ? filemtime($bs_testimonial_dir . 'index.js') : '1.0.0'
    );

    wp_register_style(
        'bootstrap-blocks-bs-testimonial-style',
        plugin_dir_url(__FILE__) . 'build/style-bs-testimonial.css',
        array(),
        file_exists(plugin_dir_path(__FILE__) . 'build/style-bs-testimonial.css') ? filemtime(plugin_dir_path(__FILE__) . 'build/style-bs-testimonial.css') : '1.0.0'
    );

    // Register bs-nap block
    $bs_nap_dir = plugin_dir_path(__FILE__) . 'build/bs-nap/';
    $bs_nap_url = plugin_dir_url(__FILE__) . 'build/bs-nap/';

    register_block_type($bs_nap_dir, [
        'editor_script' => 'bootstrap-blocks-bs-nap-editor',
        'style' => 'bootstrap-blocks-bs-nap-style',
    ]);

    wp_register_script(
        'bootstrap-blocks-bs-nap-editor',
        $bs_nap_url . 'index.js',
        array(
            'wp-blocks',
            'wp-element',
            'wp-block-editor',
            'wp-components',
            'wp-i18n',
            'wp-data'
        ),
        file_exists($bs_nap_dir . 'index.js') ? filemtime($bs_nap_dir . 'index.js') : '1.0.0'
    );

    wp_register_style(
        'bootstrap-blocks-bs-nap-style',
        plugin_dir_url(__FILE__) . 'build/style-bs-nap.css',
        array(),
        file_exists(plugin_dir_path(__FILE__) . 'build/style-bs-nap.css') ? filemtime(plugin_dir_path(__FILE__) . 'build/style-bs-nap.css') : '1.0.0'
    );

    // BS Accordion Block
    $bs_accordion_dir = plugin_dir_path(__FILE__) . 'build/bs-accordion/';
    $bs_accordion_url = plugin_dir_url(__FILE__) . 'build/bs-accordion/';

    register_block_type($bs_accordion_dir, [
        'editor_script' => 'bootstrap-blocks-bs-accordion-editor',
    ]);

    wp_register_script(
        'bootstrap-blocks-bs-accordion-editor',
        $bs_accordion_url . 'index.js',
        array(
            'wp-blocks',
            'wp-element',
            'wp-block-editor',
            'wp-components',
            'wp-i18n',
            'wp-data'
        ),
        file_exists($bs_accordion_dir . 'index.js') ? filemtime($bs_accordion_dir . 'index.js') : '1.0.0'
    );

    wp_register_style(
        'bootstrap-blocks-bs-accordion-style',
        plugin_dir_url(__FILE__) . 'build/style-bs-accordion.css',
        array(),
        file_exists(plugin_dir_path(__FILE__) . 'build/style-bs-accordion.css') ? filemtime(plugin_dir_path(__FILE__) . 'build/style-bs-accordion.css') : '1.0.0'
    );

    // BS Service Area Block
    $bs_service_area_dir = plugin_dir_path(__FILE__) . 'build/bs-service-area/';
    $bs_service_area_url = plugin_dir_url(__FILE__) . 'build/bs-service-area/';

    register_block_type($bs_service_area_dir, [
        'editor_script' => 'bootstrap-blocks-bs-service-area-editor',
    ]);

    wp_register_script(
        'bootstrap-blocks-bs-service-area-editor',
        $bs_service_area_url . 'index.js',
        array(
            'wp-blocks',
            'wp-element',
            'wp-block-editor',
            'wp-components',
            'wp-i18n',
            'wp-data'
        ),
        file_exists($bs_service_area_dir . 'index.js') ? filemtime($bs_service_area_dir . 'index.js') : '1.0.0'
    );

    wp_register_style(
        'bootstrap-blocks-bs-service-area-style',
        plugin_dir_url(__FILE__) . 'build/style-bs-service-area.css',
        array(),
        file_exists(plugin_dir_path(__FILE__) . 'build/style-bs-service-area.css') ? filemtime(plugin_dir_path(__FILE__) . 'build/style-bs-service-area.css') : '1.0.0'
    );

    // Register BS Wrapper block
    $bs_wrapper_dir = plugin_dir_path(__FILE__) . 'build/bs-wrapper/';
    $bs_wrapper_url = plugin_dir_url(__FILE__) . 'build/bs-wrapper/';

    register_block_type($bs_wrapper_dir, [
        'editor_script' => 'bootstrap-blocks-bs-wrapper-editor',
        'style' => 'bootstrap-blocks-bs-wrapper-style',
    ]);

    wp_register_script(
        'bootstrap-blocks-bs-wrapper-editor',
        $bs_wrapper_url . 'index.js',
        array(
            'wp-blocks',
            'wp-element',
            'wp-block-editor',
            'wp-components',
            'wp-i18n',
            'wp-data'
        ),
        file_exists($bs_wrapper_dir . 'index.js') ? filemtime($bs_wrapper_dir . 'index.js') : '1.0.0'
    );

    wp_register_style(
        'bootstrap-blocks-bs-wrapper-style',
        plugin_dir_url(__FILE__) . 'build/style-bs-wrapper.css',
        array(),
        file_exists(plugin_dir_path(__FILE__) . 'build/style-bs-wrapper.css') ? filemtime(plugin_dir_path(__FILE__) . 'build/style-bs-wrapper.css') : '1.0.0'
    );

    // Register BS Video block
    $bs_video_dir = plugin_dir_path(__FILE__) . 'build/bs-video/';
    $bs_video_url = plugin_dir_url(__FILE__) . 'build/bs-video/';

    register_block_type($bs_video_dir, [
        'editor_script' => 'bootstrap-blocks-bs-video-editor',
        'style' => 'bootstrap-blocks-bs-video-style',
    ]);

    wp_register_script(
        'bootstrap-blocks-bs-video-editor',
        $bs_video_url . 'index.js',
        array(
            'wp-blocks',
            'wp-element',
            'wp-block-editor',
            'wp-components',
            'wp-i18n'
        ),
        file_exists($bs_video_dir . 'index.js') ? filemtime($bs_video_dir . 'index.js') : '1.0.0'
    );

    wp_register_style(
        'bootstrap-blocks-bs-video-style',
        plugin_dir_url(__FILE__) . 'build/style-bs-video.css',
        array(),
        file_exists(plugin_dir_path(__FILE__) . 'build/style-bs-video.css') ? filemtime(plugin_dir_path(__FILE__) . 'build/style-bs-video.css') : '1.0.0'
    );

    // Register BS Feature Cards block
    $bs_feature_cards_dir = plugin_dir_path(__FILE__) . 'build/bs-feature-cards/';
    $bs_feature_cards_url = plugin_dir_url(__FILE__) . 'build/bs-feature-cards/';

    register_block_type($bs_feature_cards_dir, [
        'editor_script' => 'bootstrap-blocks-bs-feature-cards-editor',
        'style' => 'bootstrap-blocks-bs-feature-cards-style',
    ]);

    wp_register_script(
        'bootstrap-blocks-bs-feature-cards-editor',
        $bs_feature_cards_url . 'index.js',
        array(
            'wp-blocks',
            'wp-element',
            'wp-block-editor',
            'wp-components',
            'wp-i18n',
            'wp-data'
        ),
        file_exists($bs_feature_cards_dir . 'index.js') ? filemtime($bs_feature_cards_dir . 'index.js') : '1.0.0'
    );

    wp_register_style(
        'bootstrap-blocks-bs-feature-cards-style',
        plugin_dir_url(__FILE__) . 'build/style-bs-feature-cards.css',
        array(),
        file_exists(plugin_dir_path(__FILE__) . 'build/style-bs-feature-cards.css') ? filemtime(plugin_dir_path(__FILE__) . 'build/style-bs-feature-cards.css') : '1.0.0'
    );
}
add_action('init', 'bootstrap_blocks_init');

/**
 * Apply child animation attributes to columns when row has child animation enabled
 * 
 * @param string $block_content The block content.
 * @param array  $block         The block data.
 * @return string Modified block content.
 */
function bootstrap_blocks_apply_child_animation($block_content, $block)
{
    // Only process bootstrap-blocks/bs-row blocks
    if ($block['blockName'] !== 'bootstrap-blocks/bs-row') {
        return $block_content;
    }

    // Check if child animation is enabled
    $child_animation_enabled = isset($block['attrs']['childAnimationEnabled']) && $block['attrs']['childAnimationEnabled'];

    if (!$child_animation_enabled) {
        return $block_content;
    }

    // Get child animation settings (use defaults if not set)
    $animation_name = isset($block['attrs']['animationName']) ? $block['attrs']['animationName'] : '';
    // Use fade-up as default if animation is enabled but no name is set
    if (empty($animation_name)) {
        $animation_name = 'fade-up';
    }
    $animation_duration = isset($block['attrs']['animationDuration']) ? intval($block['attrs']['animationDuration']) : 1000;
    $initial_delay = isset($block['attrs']['childAnimationInitialDelay']) ? intval($block['attrs']['childAnimationInitialDelay']) : 0;
    $interval = isset($block['attrs']['childAnimationInterval']) ? intval($block['attrs']['childAnimationInterval']) : 0;

    // Remove animation attributes and child animation data attributes from row
    $block_content = preg_replace(
        '/\s+data-aos="[^"]*"/',
        '',
        $block_content
    );
    $block_content = preg_replace(
        '/\s+data-aos-duration="[^"]*"/',
        '',
        $block_content
    );
    $block_content = preg_replace(
        '/\s+data-aos-delay="[^"]*"/',
        '',
        $block_content
    );
    // Remove child animation data attributes (not needed in output, filter handles it)
    $block_content = preg_replace(
        '/\s+data-child-animation="[^"]*"/',
        '',
        $block_content
    );
    $block_content = preg_replace(
        '/\s+data-child-animation-[^=]*="[^"]*"/',
        '',
        $block_content
    );

    // Find all column divs within the row
    // Pattern: <div class="col-X"> or <div class="col-XX"> or any column with col- class
    $column_index = 0;
    $block_content = preg_replace_callback(
        '/<div\s+class="[^"]*\bcol-[^"]*"[^>]*>/i',
        function ($matches) use (&$column_index, $animation_name, $animation_duration, $initial_delay, $interval) {
            // Calculate delay for this column
            $delay = $initial_delay + ($column_index * $interval);

            // Remove any existing animation attributes from column (override column's own animation)
            $column_html = $matches[0];
            $column_html = preg_replace('/\s+data-aos[^=]*="[^"]*"/', '', $column_html);
            $column_html = preg_replace('/\s+data-aos-duration="[^"]*"/', '', $column_html);
            $column_html = preg_replace('/\s+data-aos-delay="[^"]*"/', '', $column_html);

            // Build animation attributes from row's child animation settings
            $aos_attrs = ' data-aos="' . esc_attr($animation_name) . '"';

            if ($animation_duration > 0) {
                $aos_attrs .= ' data-aos-duration="' . esc_attr($animation_duration) . '"';
            }

            // Only output delay if greater than 0
            if ($delay > 0) {
                $aos_attrs .= ' data-aos-delay="' . esc_attr($delay) . '"';
            }

            // Add animation attributes before closing >
            $column_html = str_replace('>', $aos_attrs . '>', $column_html);

            $column_index++;

            return $column_html;
        },
        $block_content
    );

    return $block_content;
}
add_filter('render_block', 'bootstrap_blocks_apply_child_animation', 10, 2);