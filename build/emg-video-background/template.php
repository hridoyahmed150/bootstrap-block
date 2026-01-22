<?php
$video_url = $attributes['videoURL'] ?? '';
$min_height = $attributes['minHeight'] ?? 400;

preg_match(
    '/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/',
    $video_url,
    $match
);
$video_id = $match[1] ?? '';

if (!$video_id)
    return;
?>

<section class="bs-video-bg" style="min-height:<?php echo esc_attr($min_height); ?>px"
    data-video-id="<?php echo esc_attr($video_id); ?>">

    <div class="bs-video-bg-poster"
        style="background-image:url('https://img.youtube.com/vi/<?php echo esc_attr($video_id); ?>/maxresdefault.jpg')">
    </div>

    <div class="bs-video-bg-iframe"></div>

    <div class="bs-video-bg-content">
        <?php echo $content; ?>
    </div>
</section>

<script>
    (function () {

        const blocks = document.querySelectorAll('.bs-video-bg');
        if (!blocks.length) return;

        let apiLoading = false;

        function loadYT(callback) {
            if (window.YT && window.YT.Player) {
                callback();
                return;
            }

            // Preserve existing handler (CRITICAL)
            const prev = window.onYouTubeIframeAPIReady;
            window.onYouTubeIframeAPIReady = function () {
                if (prev) prev();
                callback();
            };

            if (!apiLoading) {
                apiLoading = true;
                const s = document.createElement('script');
                s.src = 'https://www.youtube.com/iframe_api';
                document.head.appendChild(s);
            }
        }

        function initBlock(block) {
            if (block.dataset.ready) return;
            block.dataset.ready = '1';

            const id = block.dataset.videoId;
            const holder = block.querySelector('.bs-video-bg-iframe');
            const poster = block.querySelector('.bs-video-bg-poster');

            const player = new YT.Player(holder, {
                videoId: id,
                playerVars: {
                    autoplay: 1,
                    mute: 1,
                    controls: 0,
                    rel: 0,
                    playsinline: 1,
                    modestbranding: 1,
                    loop: 1,
                    playlist: id
                },
                events: {
                    onReady(e) {
                        e.target.mute();
                        e.target.playVideo();

                        // HARD fallback (AWB trick)
                        setTimeout(() => {
                            poster.style.opacity = '0';
                            resize(block);
                        }, 800);
                    },
                    onStateChange(e) {
                        if (e.data === YT.PlayerState.PLAYING) {
                            poster.style.opacity = '0';
                            resize(block);
                        }
                    }
                }
            });
        }

        function resize(block) {
            const iframe = block.querySelector('iframe');
            if (!iframe) return;

            const w = block.offsetWidth;
            const h = block.offsetHeight;
            const r = 16 / 9;

            let iw, ih;
            if (w / h > r) {
                iw = w;
                ih = w / r;
            } else {
                ih = h;
                iw = h * r;
            }

            iframe.style.position = 'absolute';
            iframe.style.width = iw + 'px';
            iframe.style.height = ih + 'px';
            iframe.style.top = '50%';
            iframe.style.left = '50%';
            iframe.style.transform = 'translate(-50%, -50%)';
            iframe.style.pointerEvents = 'none';
        }

        loadYT(() => {
            blocks.forEach(initBlock);
            window.addEventListener('resize', () =>
                blocks.forEach(resize)
            );
        });

    })();
</script>