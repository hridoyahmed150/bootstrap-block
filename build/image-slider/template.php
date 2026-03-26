<?php
/**
 * Template for Image Slider block
 * Renders images as Slick slider on frontend. No inline <script>.
 *
 * @var array    $attributes Block attributes
 * @var string   $content    Block inner content (unused; we use MediaUpload)
 * @var WP_Block $block      Block instance
 */

if (!defined('ABSPATH')) {
    exit;
}

$images   = isset($attributes['images']) && is_array($attributes['images']) ? $attributes['images'] : [];
$slides_d = isset($attributes['slidesToShow']) ? (int) $attributes['slidesToShow'] : 3;
$slides_t = isset($attributes['slidesToShowTablet']) ? (int) $attributes['slidesToShowTablet'] : 2;
$slides_m = isset($attributes['slidesToShowMobile']) ? (int) $attributes['slidesToShowMobile'] : 1;
$gap      = isset($attributes['gap']) ? (int) $attributes['gap'] : 16;
$radius   = isset($attributes['borderRadius']) ? (int) $attributes['borderRadius'] : 0;
$arrows   = isset($attributes['arrows']) ? (bool) $attributes['arrows'] : true;
$dots     = isset($attributes['dots']) ? (bool) $attributes['dots'] : true;
$autoplay = isset($attributes['autoplay']) ? (bool) $attributes['autoplay'] : false;
$autoplay_s = isset($attributes['autoplaySpeed']) ? (int) $attributes['autoplaySpeed'] : 3000;
$equal_height = isset($attributes['equalHeight']) ? (bool) $attributes['equalHeight'] : false;
$image_height = isset($attributes['imageHeight']) ? (int) $attributes['imageHeight'] : 300;
$arrow_position = isset($attributes['arrowPosition']) ? $attributes['arrowPosition'] : 'outside';
$arrow_color = isset($attributes['arrowColor']) ? $attributes['arrowColor'] : '#333333';
$arrow_bg_color = isset($attributes['arrowBgColor']) ? $attributes['arrowBgColor'] : '#ffffff';
$arrow_size = isset($attributes['arrowSize']) ? (int) $attributes['arrowSize'] : 40;
$arrow_padding = isset($attributes['arrowPadding']) ? (int) $attributes['arrowPadding'] : 10;
$arrow_offset = isset($attributes['arrowOffset']) ? (int) $attributes['arrowOffset'] : 16;
$arrow_prev = isset($attributes['arrowPrevImage']) && is_array($attributes['arrowPrevImage']) ? $attributes['arrowPrevImage'] : [];
$arrow_next = isset($attributes['arrowNextImage']) && is_array($attributes['arrowNextImage']) ? $attributes['arrowNextImage'] : [];
$arrow_prev_id = isset($arrow_prev['id']) ? (int) $arrow_prev['id'] : 0;
$arrow_next_id = isset($arrow_next['id']) ? (int) $arrow_next['id'] : 0;
$arrow_prev_url = '';
$arrow_next_url = '';
// Get URL from stored url field or fetch from attachment ID
if (!empty($arrow_prev['url']) && filter_var($arrow_prev['url'], FILTER_VALIDATE_URL)) {
    $arrow_prev_url = $arrow_prev['url'];
} elseif ($arrow_prev_id > 0) {
    $arrow_prev_url = wp_get_attachment_image_url($arrow_prev_id, 'full');
}
if (!empty($arrow_next['url']) && filter_var($arrow_next['url'], FILTER_VALIDATE_URL)) {
    $arrow_next_url = $arrow_next['url'];
} elseif ($arrow_next_id > 0) {
    $arrow_next_url = wp_get_attachment_image_url($arrow_next_id, 'full');
}
$arrow_same_image = isset($attributes['arrowSameImage']) ? (bool) $attributes['arrowSameImage'] : false;
if ($arrow_same_image && $arrow_prev_url) {
    $arrow_next_url = $arrow_prev_url;
}
$dot_color = isset($attributes['dotColor']) ? $attributes['dotColor'] : '#D0D7E0';
$dot_active_color = isset($attributes['dotActiveColor']) ? $attributes['dotActiveColor'] : '#007cba';
$dot_size = isset($attributes['dotSize']) ? (int) $attributes['dotSize'] : 12;
$layout_mode = isset($attributes['layoutMode']) ? $attributes['layoutMode'] : 'normal';
$center_padding_d = isset($attributes['centerPaddingDesktop']) ? $attributes['centerPaddingDesktop'] : '25%';
$center_padding_t = isset($attributes['centerPaddingTablet']) ? $attributes['centerPaddingTablet'] : '18%';
$center_padding_m = isset($attributes['centerPaddingMobile']) ? $attributes['centerPaddingMobile'] : '10%';

// Build slick config based on layout mode
if ($layout_mode === 'center-peek') {
    // Center-peek mode: centerMode with configurable padding
    $slick_config = [
        'slidesToShow'   => 1,
        'slidesToScroll' => 1,
        'infinite'       => true,
        'fade'           => false,
        'centerMode'     => true,
        'centerPadding'  => $center_padding_d,
        'dots'           => $dots,
        'arrows'         => $arrows,
        'autoplay'       => $autoplay,
        'autoplaySpeed'  => $autoplay_s,
        'responsive'     => [
            [ 'breakpoint' => 1024, 'settings' => [ 'centerPadding' => $center_padding_t ] ],
            [ 'breakpoint' => 600,  'settings' => [ 'centerPadding' => $center_padding_m ] ],
        ],
    ];
} else {
    // Normal mode: standard multi-slide configuration
    $slick_config = [
        'slidesToShow'   => $slides_d,
        'slidesToScroll' => 1,
        'infinite'       => true,
        'fade'           => false,
        'dots'           => $dots,
        'arrows'         => $arrows,
        'autoplay'       => $autoplay,
        'autoplaySpeed'  => $autoplay_s,
        'responsive'     => [
            [ 'breakpoint' => 1024, 'settings' => [ 'slidesToShow' => $slides_t, 'slidesToScroll' => 1 ] ],
            [ 'breakpoint' => 600,  'settings' => [ 'slidesToShow' => $slides_m, 'slidesToScroll' => 1 ] ],
        ],
    ];
}

$wrapper_class = 'bs-image-slider';
if ($equal_height) {
    $wrapper_class .= ' bs-image-slider-equal-height';
}
if ($arrow_position === 'inside') {
    $wrapper_class .= ' bs-image-slider-arrows-inside';
}
if ($dots) {
    $wrapper_class .= ' bs-image-slider-has-dots';
}
if ($arrow_prev_url) {
    $wrapper_class .= ' bs-arrow-prev-custom';
}
if ($arrow_next_url) {
    $wrapper_class .= ' bs-arrow-next-custom';
}
if ($arrow_same_image && ($arrow_prev_url || $arrow_next_url)) {
    $wrapper_class .= ' bs-arrow-same-image';
}

$wrapper_style = '--bs-is-gap: ' . $gap . 'px; --bs-is-radius: ' . $radius . 'px;';
if ($equal_height) {
    $wrapper_style .= ' --bs-is-height: ' . $image_height . 'px;';
}
$wrapper_style .= ' --bs-arrow-color: ' . esc_attr($arrow_color) . ';';
$wrapper_style .= ' --bs-arrow-bg: ' . esc_attr($arrow_bg_color) . ';';
$wrapper_style .= ' --bs-arrow-size: ' . $arrow_size . 'px;';
$wrapper_style .= ' --bs-arrow-padding: ' . $arrow_padding . 'px;';
$wrapper_style .= ' --bs-arrow-offset: ' . $arrow_offset . 'px;';
if ($arrow_prev_url) {
    $wrapper_style .= ' --bs-arrow-prev-url: url(' . esc_url($arrow_prev_url) . ');';
}
if ($arrow_next_url) {
    $wrapper_style .= ' --bs-arrow-next-url: url(' . esc_url($arrow_next_url) . ');';
}
$wrapper_style .= ' --bs-dot-color: ' . esc_attr($dot_color) . ';';
$wrapper_style .= ' --bs-dot-active: ' . esc_attr($dot_active_color) . ';';
$wrapper_style .= ' --bs-dot-size: ' . $dot_size . 'px;';

$extra = [
    'class'             => $wrapper_class,
    'style'             => $wrapper_style,
    'data-slick-config' => wp_json_encode($slick_config),
];
$wrapper_attrs = get_block_wrapper_attributes($extra, $block);

if (empty($images)) {
    echo '<div ' . $wrapper_attrs . '><p class="bs-image-slider-empty">' . esc_html__('Add images in the block settings.', 'bootstrap-blocks') . '</p></div>';
    return;
}
?>
<div <?php echo $wrapper_attrs; ?>>
    <?php foreach ($images as $img) : ?>
        <?php
        $url = isset($img['url']) ? $img['url'] : '';
        $id  = isset($img['id']) ? (int) $img['id'] : 0;
        $alt = isset($img['alt']) ? $img['alt'] : '';
        if (empty($url) && $id) {
            $url = wp_get_attachment_image_url($id, 'full');
        }
        if (empty($url)) {
            continue;
        }
        ?>
        <div class="bs-image-slider-slide">
            <img src="<?php echo esc_url($url); ?>" alt="<?php echo esc_attr($alt); ?>" loading="lazy" />
        </div>
    <?php endforeach; ?>
</div>
<?php
if (!function_exists('bootstrap_blocks_image_slider_maybe_inline')) {
    function bootstrap_blocks_image_slider_maybe_inline() {
        static $done = false;
        if ($done) {
            return;
        }
        $done = true;
        $js   = '(function(){if(typeof window.jQuery==="undefined"||!window.jQuery.fn.slick)return;window.jQuery(document).ready(function($){$(".bs-image-slider").each(function(){var $el=$(this);if($el.hasClass("slick-initialized"))return;if($el.find(".bs-image-slider-slide").length===0)return;var cfg=$el.data("slick-config");if(cfg)$el.slick(cfg);});});})();';
        wp_add_inline_script('slick', $js, 'after');
    }
}
bootstrap_blocks_image_slider_maybe_inline();
