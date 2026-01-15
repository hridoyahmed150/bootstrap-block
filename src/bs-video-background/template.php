<?php
/**
 * Template for BS Video Background block
 * Renders video background with Jarallax support
 *
 * @var array $attributes Block attributes
 * @var string $content Block inner content
 * @var WP_Block $block Block instance
 */

if (!defined('ABSPATH')) {
    exit;
}

$video_type = isset($attributes['videoType']) ? $attributes['videoType'] : 'yt_vm_video';
$video_url = isset($attributes['videoURL']) ? $attributes['videoURL'] : '';
$video_mp4 = isset($attributes['videoMp4']) ? $attributes['videoMp4'] : '';
$video_webm = isset($attributes['videoWebm']) ? $attributes['videoWebm'] : '';
$video_ogv = isset($attributes['videoOgv']) ? $attributes['videoOgv'] : '';
$video_poster = isset($attributes['videoPoster']) ? $attributes['videoPoster'] : '';
$video_start_time = isset($attributes['videoStartTime']) ? intval($attributes['videoStartTime']) : 0;
$video_end_time = isset($attributes['videoEndTime']) ? intval($attributes['videoEndTime']) : 0;
$video_volume = isset($attributes['videoVolume']) ? intval($attributes['videoVolume']) : 0;
$video_loop = isset($attributes['videoLoop']) ? (bool) $attributes['videoLoop'] : true;
$video_always_play = isset($attributes['videoAlwaysPlay']) ? (bool) $attributes['videoAlwaysPlay'] : false;
$video_mobile = isset($attributes['videoMobile']) ? (bool) $attributes['videoMobile'] : false;

$parallax = isset($attributes['parallax']) ? $attributes['parallax'] : '';
$parallax_speed = isset($attributes['parallaxSpeed']) ? floatval($attributes['parallaxSpeed']) : 0.5;
$parallax_mobile = isset($attributes['parallaxMobile']) ? (bool) $attributes['parallaxMobile'] : false;

$mouse_parallax = isset($attributes['mouseParallax']) ? (bool) $attributes['mouseParallax'] : false;
$mouse_parallax_size = isset($attributes['mouseParallaxSize']) ? intval($attributes['mouseParallaxSize']) : 30;
$mouse_parallax_speed = isset($attributes['mouseParallaxSpeed']) ? intval($attributes['mouseParallaxSpeed']) : 10000;

$overlay_color = isset($attributes['overlayColor']) ? $attributes['overlayColor'] : '';
$overlay_opacity = isset($attributes['overlayOpacity']) ? intval($attributes['overlayOpacity']) : 0;

$full_height = isset($attributes['fullHeight']) ? (bool) $attributes['fullHeight'] : false;
$full_height_align = isset($attributes['fullHeightAlign']) ? $attributes['fullHeightAlign'] : 'center';
$background_color = isset($attributes['backgroundColor']) ? $attributes['backgroundColor'] : '';

$wrapper_attributes = get_block_wrapper_attributes();
$wrapper_classes = 'bs-video-background';

// Add full height class
if ($full_height) {
    $wrapper_classes .= ' bs-video-background-full-height';
}

// Build data attributes for Jarallax
$data_attributes = '';

// Check if we have video
$has_video = false;
if ($video_type === 'yt_vm_video' && !empty($video_url)) {
    $has_video = true;
} elseif ($video_type === 'video' && (!empty($video_mp4) || !empty($video_webm) || !empty($video_ogv))) {
    $has_video = true;
}

// Determine parallax type - default to scroll for video backgrounds
$jarallax_type = 'scroll'; // Default for video
if (!empty($parallax) && in_array($parallax, ['scroll', 'scale', 'opacity', 'scroll-opacity', 'scale-opacity'])) {
    $jarallax_type = $parallax;
}

// Add data-jarallax attribute with type (required for Jarallax to initialize)
if ($has_video || !empty($parallax)) {
    $data_attributes .= ' data-jarallax="' . esc_attr($jarallax_type) . '"';
    // Add parallax speed
    if (!empty($parallax_speed)) {
        $data_attributes .= ' data-jarallax-speed="' . esc_attr($parallax_speed) . '"';
    } elseif ($has_video) {
        $data_attributes .= ' data-jarallax-speed="1"'; // Default speed for video
    }
}

// Video type - use data-jarallax-video for Jarallax
if ($video_type === 'yt_vm_video' && !empty($video_url)) {
    $data_attributes .= ' data-jarallax-video="' . esc_attr($video_url) . '"';
} elseif ($video_type === 'video') {
    // Build local video string
    $videos = '';
    if (!empty($video_mp4)) {
        $mp4_url = is_numeric($video_mp4) ? wp_get_attachment_url($video_mp4) : $video_mp4;
        if ($mp4_url) {
            $videos .= 'mp4:' . esc_url($mp4_url);
        }
    }
    if (!empty($video_webm)) {
        $webm_url = is_numeric($video_webm) ? wp_get_attachment_url($video_webm) : $video_webm;
        if ($webm_url) {
            if ($videos) {
                $videos .= ',';
            }
            $videos .= 'webm:' . esc_url($webm_url);
        }
    }
    if (!empty($video_ogv)) {
        $ogv_url = is_numeric($video_ogv) ? wp_get_attachment_url($video_ogv) : $video_ogv;
        if ($ogv_url) {
            if ($videos) {
                $videos .= ',';
            }
            $videos .= 'ogv:' . esc_url($ogv_url);
        }
    }
    if ($videos) {
        $data_attributes .= ' data-jarallax-video="' . esc_attr($videos) . '"';
    }
}

// Video controls - use data-jarallax-* attributes for Jarallax
if ($has_video) {
    if ($video_start_time > 0) {
        $data_attributes .= ' data-jarallax-video-start-time="' . esc_attr($video_start_time) . '"';
    }
    if ($video_end_time > 0) {
        $data_attributes .= ' data-jarallax-video-end-time="' . esc_attr($video_end_time) . '"';
    }
    if ($video_volume >= 0) {
        $data_attributes .= ' data-jarallax-video-volume="' . esc_attr($video_volume) . '"';
    }
    if ($video_loop) {
        $data_attributes .= ' data-jarallax-video-loop="true"';
    }
}

// Get padding and margin from attributes
$padding = isset($attributes['padding']) ? $attributes['padding'] : '';
$margin = isset($attributes['margin']) ? $attributes['margin'] : '';

// Build inline styles
$inline_styles = '';
if (!empty($background_color)) {
    $inline_styles .= 'background-color: ' . esc_attr($background_color) . ';';
}
if (!empty($padding)) {
    $inline_styles .= 'padding: ' . esc_attr($padding) . ';';
}
if (!empty($margin)) {
    $inline_styles .= 'margin: ' . esc_attr($margin) . ';';
}
if ($full_height) {
    $inline_styles .= 'min-height: 100vh;';
    if (!empty($full_height_align)) {
        $inline_styles .= 'display: flex; align-items: ' . esc_attr($full_height_align) . ';';
    }
}

// Overlay styles
$overlay_style = '';
if (!empty($overlay_color) && $overlay_opacity > 0) {
    $overlay_rgb = '';
    if (preg_match('/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i', $overlay_color, $matches)) {
        $overlay_rgb = hexdec($matches[1]) . ',' . hexdec($matches[2]) . ',' . hexdec($matches[3]);
    } elseif (preg_match('/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/', $overlay_color, $matches)) {
        $overlay_rgb = $matches[1] . ',' . $matches[2] . ',' . $matches[3];
    }
    if ($overlay_rgb) {
        $overlay_opacity_decimal = $overlay_opacity / 100;
        $overlay_style = 'background-color: rgba(' . $overlay_rgb . ', ' . $overlay_opacity_decimal . ');';
    }
}

?>
<div <?php echo $wrapper_attributes; ?> 
     class="<?php echo esc_attr($wrapper_classes); ?>" 
     <?php if ($inline_styles) : ?>style="<?php echo esc_attr($inline_styles); ?>"<?php endif; ?>
     <?php echo $data_attributes; ?>>
    <?php if ($overlay_style) : ?>
        <div class="bs-video-background-overlay" style="<?php echo esc_attr($overlay_style); ?>"></div>
    <?php endif; ?>
    <div class="bs-video-background-content">
        <?php echo $content; ?>
    </div>
</div>
