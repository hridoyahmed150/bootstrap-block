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
$video_always_play = isset($attributes['videoAlwaysPlay']) ? (bool) $attributes['videoAlwaysPlay'] : true;
$video_mobile = isset($attributes['videoMobile']) ? (bool) $attributes['videoMobile'] : false;
$video_play_only_visible = isset($attributes['videoPlayOnlyVisible']) ? (bool) $attributes['videoPlayOnlyVisible'] : false;

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

// Determine parallax type - default parallax is DISABLED
// Only enable parallax if explicitly set
$jarallax_type = '';
$parallax_enabled = false;
if (!empty($parallax) && in_array($parallax, ['scroll', 'scale', 'opacity', 'scroll-opacity', 'scale-opacity'])) {
    $jarallax_type = $parallax;
    $parallax_enabled = true;
}

// Add data-jarallax attribute (required for Jarallax to initialize video backgrounds)
// NO parallax mode - use Jarallax ONLY for video rendering
if ($has_video) {
    // Add data-jarallax for initialization (required for video backgrounds)
    // Do NOT add parallax type - this ensures no parallax movement
    $data_attributes .= ' data-jarallax';

    // Explicitly disable parallax to prevent any scroll movement
    $data_attributes .= ' data-disable-parallax="true"';
} elseif ($parallax_enabled) {
    // For non-video backgrounds, add parallax type if set
    $data_attributes .= ' data-jarallax="' . esc_attr($jarallax_type) . '"';
    if (!empty($parallax_speed)) {
        $data_attributes .= ' data-jarallax-speed="' . esc_attr($parallax_speed) . '"';
    }
}

// Video type - use data-video-src according to Jarallax docs
// For YouTube: Build URL with all required autoplay params
if ($video_type === 'yt_vm_video' && !empty($video_url)) {
    // Parse YouTube URL and build embed URL with autoplay params
    $youtube_video_id = '';
    $is_youtube = false;

    // Extract YouTube video ID
    if (preg_match('/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/', $video_url, $matches)) {
        $youtube_video_id = $matches[1];
        $is_youtube = true;
    } elseif (preg_match('/vimeo\.com\/(?:video\/)?(\d+)/', $video_url, $matches)) {
        // Vimeo - use as is, Jarallax will handle it
        $data_attributes .= ' data-video-src="' . esc_attr($video_url) . '"';
    }

    // Build YouTube embed URL with all required params for autoplay
    if ($is_youtube && $youtube_video_id) {
        $youtube_embed_url = 'https://www.youtube.com/watch?v=' . $youtube_video_id;
        $data_attributes .= ' data-video-src="' . esc_attr($youtube_embed_url) . '"';
    }
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
        // According to Jarallax docs: data-video-src for self-hosted videos
        // Format: mp4:url,webm:url,ogv:url
        $data_attributes .= ' data-video-src="' . esc_attr($videos) . '"';
    }
}

// Video controls - use data-video-* attributes according to Jarallax docs
// Note: Jarallax uses data-video-* prefix, not data-jarallax-video-*
if ($has_video) {
    if ($video_start_time > 0) {
        $data_attributes .= ' data-video-start-time="' . esc_attr($video_start_time) . '"';
    }
    if ($video_end_time > 0) {
        $data_attributes .= ' data-video-end-time="' . esc_attr($video_end_time) . '"';
    }
    if ($video_volume >= 0) {
        $data_attributes .= ' data-video-volume="' . esc_attr($video_volume) . '"';
    }
    if ($video_loop) {
        $data_attributes .= ' data-video-loop="true"';
    }
    // Video always play - force autoplay immediately
    if ($video_always_play) {
        $data_attributes .= ' data-video-always-play="true"';
    }

    // Video mobile support
    if ($video_mobile) {
        $data_attributes .= ' data-video-mobile="true"';
    }
    // Video play only visible - default false (plays immediately)
    if ($video_play_only_visible) {
        $data_attributes .= ' data-video-play-only-visible="true"';
    } else {
        $data_attributes .= ' data-video-play-only-visible="false"';
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

// Get poster image URL for manual rendering (like AWB does for instant display)
$poster_image_url = '';
$poster_attachment_id = 0;
if (!empty($video_poster)) {
    if (is_numeric($video_poster)) {
        $poster_attachment_id = intval($video_poster);
        $poster_image_url = wp_get_attachment_image_url($poster_attachment_id, 'full');
    } else {
        $poster_image_url = $video_poster;
    }
}

// Add image background attributes when poster image is present
$image_background_attributes = '';
if (!empty($poster_image_url)) {
    $image_background_attributes .= ' data-image-background-position="50% 50%"';
    $image_background_attributes .= ' data-image-background-size="cover"';
}

// Add CSS to prevent parallax movement (force absolute positioning)
$anti_parallax_css = '';
if ($has_video && !$parallax_enabled) {
    $anti_parallax_css = '<style>
        .bs-video-background-wrap .jarallax-container,
        .bs-video-background-wrap .jarallax-video {
            position: absolute !important;
            transform: none !important;
            will-change: auto !important;
        }
        .bs-video-background-wrap .jarallax-container {
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
        }
    </style>';
}

?>
<?php echo $anti_parallax_css; ?>
<div <?php echo $wrapper_attributes; ?> class="<?php echo esc_attr($wrapper_classes); ?>" <?php if ($inline_styles): ?>style="<?php echo esc_attr($inline_styles); ?>" <?php endif; ?>>
    <div class="bs-video-background-wrap" <?php echo $data_attributes; ?><?php echo $image_background_attributes; ?>>
        <?php if ($overlay_style): ?>
            <div class="bs-video-background-overlay" style="<?php echo esc_attr($overlay_style); ?>"></div>
        <?php endif; ?>
        <?php if ($has_video && !empty($poster_image_url)): ?>
            <?php
            // Render poster image inside an inner div (like AWB's nk-awb-inner)
            // Jarallax will automatically find this image with class jarallax-img and move it to jarallax-container
            ?>
            <div class="bs-video-background-inner">
                <?php
                if ($poster_attachment_id) {
                    echo wp_get_attachment_image(
                        $poster_attachment_id,
                        'full',
                        false,
                        array(
                            'class' => 'jarallax-img',
                            'fetchpriority' => 'high',
                            'decoding' => 'async',
                        )
                    );
                } else {
                    ?>
                    <img src="<?php echo esc_url($poster_image_url); ?>" class="jarallax-img" alt="" fetchpriority="high"
                        decoding="async" />
                    <?php
                }
                ?>
            </div>
        <?php endif; ?>
    </div>
    <div class="bs-video-background-content">
        <?php echo $content; ?>
    </div>
</div>
<?php if ($has_video && !$parallax_enabled): ?>
    <script>
        (function () {
            // AWB-style enhancement: Ensure iframe has proper attributes after load
            // Do NOT reinitialize Jarallax - assume it's already initialized globally
            function enhanceVideoIframe() {
                var containers = document.querySelectorAll('.bs-video-background-wrap[data-video-src]');

                containers.forEach(function (container) {
                    var iframe = container.querySelector('iframe.jarallax-video');
                    if (!iframe) {
                        // Iframe not ready yet, retry
                        setTimeout(enhanceVideoIframe, 100);
                        return;
                    }

                    // Ensure iframe has proper allow attributes for autoplay (AWB-style)
                    if (iframe) {
                        iframe.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
                    }

                    // For YouTube: Ensure URL has all required params for autoplay
                    if (iframe && iframe.src && (iframe.src.includes('youtube.com') || iframe.src.includes('youtube-nocookie.com'))) {
                        var src = iframe.src;
                        var needsUpdate = false;
                        var newSrc = src;

                        // Add required params if missing
                        var requiredParams = {
                            'autoplay': '1',
                            'mute': '1',
                            'loop': '1',
                            'controls': '0',
                            'playsinline': '1',
                            'rel': '0',
                            'modestbranding': '1'
                        };

                        for (var param in requiredParams) {
                            var regex = new RegExp('[&?]' + param + '=[^&]*');
                            if (!regex.test(newSrc)) {
                                newSrc += (newSrc.includes('?') ? '&' : '?') + param + '=' + requiredParams[param];
                                needsUpdate = true;
                            }
                        }

                        // For loop, also add playlist parameter with video ID
                        if (needsUpdate && !newSrc.includes('playlist=')) {
                            var videoIdMatch = newSrc.match(/[?&]v=([a-zA-Z0-9_-]+)/);
                            if (videoIdMatch && videoIdMatch[1]) {
                                newSrc += '&playlist=' + videoIdMatch[1];
                            }
                        }

                        if (needsUpdate) {
                            iframe.src = newSrc;
                        }
                    }
                });
            }

            // Run after DOM is ready and Jarallax has initialized
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', function () {
                    setTimeout(enhanceVideoIframe, 500);
                });
            } else {
                setTimeout(enhanceVideoIframe, 500);
            }

            // Also run after a delay to catch late-loaded iframes
            setTimeout(enhanceVideoIframe, 1000);
        })();
    </script>
<?php endif; ?>