<?php
/**
 * Template for BS Video Background block
 * Replicates AWB exact video background behavior using Jarallax
 *
 * @var array $attributes Block attributes
 * @var string $content Block inner content
 * @var WP_Block $block Block instance
 */

if (!defined('ABSPATH')) {
    exit;
}

// Get attributes
$video_url = isset($attributes['videoURL']) ? $attributes['videoURL'] : '';
$video_poster = isset($attributes['videoPoster']) ? $attributes['videoPoster'] : '';
$video_start_time = isset($attributes['videoStartTime']) ? intval($attributes['videoStartTime']) : 0;
$video_end_time = isset($attributes['videoEndTime']) ? intval($attributes['videoEndTime']) : 0;
$video_volume = isset($attributes['videoVolume']) ? intval($attributes['videoVolume']) : 0;
$video_loop = isset($attributes['videoLoop']) ? (bool) $attributes['videoLoop'] : true;
$video_always_play = isset($attributes['videoAlwaysPlay']) ? (bool) $attributes['videoAlwaysPlay'] : true;
$min_height = isset($attributes['minHeight']) ? intval($attributes['minHeight']) : 400;
$overlay_color = isset($attributes['overlayColor']) ? $attributes['overlayColor'] : '';
$overlay_opacity = isset($attributes['overlayOpacity']) ? intval($attributes['overlayOpacity']) : 0;
$background_color = isset($attributes['backgroundColor']) ? $attributes['backgroundColor'] : '';
$padding = isset($attributes['padding']) ? $attributes['padding'] : '';
$margin = isset($attributes['margin']) ? $attributes['margin'] : '';

// Extract YouTube video ID from various URL formats
$youtube_video_id = '';
$has_video = false;

if (!empty($video_url)) {
    // Support: youtube.com/watch, youtu.be, youtube.com/embed, youtube.com/shorts
    if (preg_match('/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/', $video_url, $matches)) {
        $youtube_video_id = $matches[1];
        $has_video = true;
    }
}

// Build YouTube embed URL with proper parameters
$youtube_embed_url = '';
if ($has_video && $youtube_video_id) {
    $params = array(
        'autoplay' => '1',
        'mute' => '1',
        'loop' => $video_loop ? '1' : '0',
        'controls' => '0',
        'modestbranding' => '1',
        'rel' => '0',
        'iv_load_policy' => '3',
        'playsinline' => '1',
        'playlist' => $youtube_video_id, // Required for loop to work
    );

    if ($video_start_time > 0) {
        $params['start'] = $video_start_time;
    }

    if ($video_end_time > 0) {
        $params['end'] = $video_end_time;
    }

    $param_string = http_build_query($params);
    $youtube_embed_url = 'https://www.youtube.com/watch?v=' . $youtube_video_id . '&' . $param_string;
}

// Get poster image URL
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

// Use YouTube thumbnail if no poster provided
if (empty($poster_image_url) && $has_video && $youtube_video_id) {
    $poster_image_url = 'https://img.youtube.com/vi/' . $youtube_video_id . '/maxresdefault.jpg';
}

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
if ($min_height > 0) {
    $inline_styles .= 'min-height: ' . esc_attr($min_height) . 'px;';
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

// Generate unique block ID
$block_id = isset($block->attributes['anchor']) && !empty($block->attributes['anchor'])
    ? $block->attributes['anchor']
    : 'bs-video-bg-' . wp_unique_id();

// Build Jarallax options as JSON. Parallax OFF by default.
$jarallax_options = array(
    'type' => 'scroll',
    'speed' => 1,
    'disableParallax' => true,
    'videoSrc' => $youtube_embed_url,
    'videoStartTime' => $video_start_time,
    'videoEndTime' => $video_end_time,
    'videoVolume' => $video_volume,
    'videoLoop' => $video_loop,
    'videoPlayOnlyVisible' => !$video_always_play,
    'imgSize' => 'cover',
    'imgPosition' => '50% 50%',
);

if (!empty($poster_image_url)) {
    $jarallax_options['imgSrc'] = $poster_image_url;
}

$jarallax_options_json = json_encode($jarallax_options);

?>
<div <?php echo get_block_wrapper_attributes(); ?> class="bs-video-background" <?php if ($inline_styles): ?>style="<?php echo esc_attr($inline_styles); ?>" <?php endif; ?> id="<?php echo esc_attr($block_id); ?>">
    <div class="bs-video-background-content">
        <div class="bs-video-background-inner-content">
            <?php
            if (!empty($content)) {
                echo $content;
            }
            ?>
        </div>
    </div>
    <div class="bs-video-background-wrap">
        <?php if ($overlay_style): ?>
            <div class="bs-video-background-overlay" style="<?php echo esc_attr($overlay_style); ?>"></div>
        <?php endif; ?>
        <?php if ($has_video): ?>
            <div class="bs-video-background-inner" data-jarallax-video="<?php echo esc_attr($youtube_embed_url); ?>"
                data-disable-parallax="true">
                <?php if (!empty($poster_image_url)): ?>
                    <?php if ($poster_attachment_id): ?>
                        <?php echo wp_get_attachment_image(
                            $poster_attachment_id,
                            'full',
                            false,
                            array(
                                'class' => 'jarallax-img',
                                'style' => 'object-fit: cover; object-position: center center;',
                            )
                        ); ?>
                    <?php else: ?>
                        <img src="<?php echo esc_url($poster_image_url); ?>" class="jarallax-img" alt=""
                            style="object-fit: cover; object-position: center center;" />
                    <?php endif; ?>
                <?php endif; ?>
            </div>
        <?php endif; ?>
    </div>
</div>

<?php if ($has_video): ?>
    <script>
        (function () {
            var block = document.getElementById('<?php echo esc_js($block_id); ?>');
            if (!block) return;

            var inner = block.querySelector('.bs-video-background-inner');
            if (!inner) return;

            // Wait for Jarallax to be available
            function initJarallax() {
                if (typeof window.jarallax === 'undefined') {
                    setTimeout(initJarallax, 100);
                    return;
                }

                // Initialize Jarallax with options (parallax OFF by default)
                var options = <?php echo $jarallax_options_json; ?>;
                options.disableParallax = true;

                window.jarallax(inner, options);

                // Force parallax OFF: Jarallax video mode often ignores disableParallax
                var inst = inner.jarallax || inner.jarallaxInstance;
                if (inst) {
                    inst.options.disableParallax = true;
                    inst.onScroll = function () { };
                }

                function forceNoParallax() {
                    var container = block.querySelector('.jarallax-container');
                    if (container) {
                        container.style.setProperty('position', 'absolute', 'important');
                        container.style.setProperty('transform', 'none', 'important');
                        container.style.setProperty('will-change', 'auto', 'important');
                        container.style.setProperty('top', '0', 'important');
                        container.style.setProperty('left', '0', 'important');
                        container.style.setProperty('right', '0', 'important');
                        container.style.setProperty('bottom', '0', 'important');
                    }
                }
                forceNoParallax();
                var noParallaxInterval = setInterval(forceNoParallax, 150);
                setTimeout(function () { clearInterval(noParallaxInterval); }, 3000);

                // Watch for video iframe insertion
                var checkInterval = setInterval(function () {
                    var iframe = inner.querySelector('iframe.jarallax-video');
                    if (iframe) {
                        clearInterval(checkInterval);

                        // Ensure iframe has proper attributes
                        iframe.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
                        iframe.setAttribute('allowfullscreen', '');
                        iframe.setAttribute('tabindex', '-1');
                        iframe.setAttribute('aria-hidden', 'true');

                        // Hide poster when video starts playing
                        var poster = inner.querySelector('.jarallax-img');
                        if (poster) {
                            var hidePoster = function () {
                                if (poster && !poster.classList.contains('jarallax-img-hidden')) {
                                    poster.classList.add('jarallax-img-hidden');
                                }
                            };

                            // Listen for YouTube ready/playing events
                            var messageHandler = function (event) {
                                try {
                                    var origin = event.origin || '';
                                    if (origin.indexOf('youtube') === -1 && origin.indexOf('youtube-nocookie') === -1) {
                                        return;
                                    }

                                    var data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

                                    if (data && typeof data === 'object' && data.event) {
                                        if (data.event === 'onReady' ||
                                            (data.event === 'onStateChange' && data.info &&
                                                (data.info.playerState === 1 || data.info.playerState === 3))) {
                                            hidePoster();
                                        }
                                    }
                                } catch (e) {
                                    // Not a YouTube message
                                }
                            };

                            window.addEventListener('message', messageHandler, true);

                            // Fallback: hide after delay
                            setTimeout(hidePoster, 2000);
                        }
                    }
                }, 100);

                setTimeout(function () {
                    clearInterval(checkInterval);
                }, 5000);
            }

            // Initialize when DOM is ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', function () {
                    setTimeout(initJarallax, 100);
                });
            } else {
                setTimeout(initJarallax, 100);
            }
        })();
    </script>
<?php endif; ?>