import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl, SelectControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import './style.css';

/**
 * Parse video URL and extract provider and embed URL
 * @param {string} url - Video URL to parse
 * @returns {Object} { provider: 'youtube'|'vimeo'|null, embed: string, videoId: string }
 */
function parseVideoURL(url) {
    if (!url || !url.trim()) {
        return { provider: null, embed: '', videoId: '' };
    }

    const trimmedUrl = url.trim();

    // YouTube URL patterns
    const youtubeWatchMatch = trimmedUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    const youtubeEmbedMatch = trimmedUrl.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
    
    if (youtubeWatchMatch || youtubeEmbedMatch) {
        const videoId = (youtubeWatchMatch && youtubeWatchMatch[1]) || (youtubeEmbedMatch && youtubeEmbedMatch[1]);
        return {
            provider: 'youtube',
            embed: `https://www.youtube.com/embed/${videoId}?rel=0`,
            videoId: videoId
        };
    }

    // Vimeo URL patterns
    const vimeoMatch = trimmedUrl.match(/vimeo\.com\/(?:.*\/)?(\d+)/);
    const vimeoPlayerMatch = trimmedUrl.match(/player\.vimeo\.com\/video\/(\d+)/);
    
    if (vimeoMatch || vimeoPlayerMatch) {
        const videoId = (vimeoMatch && vimeoMatch[1]) || (vimeoPlayerMatch && vimeoPlayerMatch[1]);
        return {
            provider: 'vimeo',
            embed: `https://player.vimeo.com/video/${videoId}`,
            videoId: videoId
        };
    }

    return { provider: null, embed: '', videoId: '' };
}

registerBlockType('bootstrap-blocks/bs-video', {
    edit({ attributes, setAttributes }) {
        const {
            videoURL,
            embedURL,
            provider,
            bootstrapVersion,
            aspectRatio,
            videoTitle,
            lazyLoad,
            autoplay
        } = attributes;

        const [parsedVideo, setParsedVideo] = useState(() => parseVideoURL(videoURL));

        // Update parsed video when videoURL changes
        useEffect(() => {
            const parsed = parseVideoURL(videoURL);
            setParsedVideo(parsed);
            
            // Update embed URL and provider if valid
            if (parsed.provider && parsed.embed) {
                setAttributes({
                    embedURL: parsed.embed,
                    provider: parsed.provider
                });
            } else {
                setAttributes({
                    embedURL: '',
                    provider: ''
                });
            }
        }, [videoURL, setAttributes]);

        // Build iframe src with optional autoplay
        const getIframeSrc = () => {
            if (!embedURL) return '';
            
            let src = embedURL;
            
            // Add autoplay parameter for supported providers
            if (autoplay) {
                if (provider === 'youtube') {
                    src += src.includes('?') ? '&autoplay=1' : '?autoplay=1';
                } else if (provider === 'vimeo') {
                    src += src.includes('?') ? '&autoplay=1' : '?autoplay=1';
                }
            }
            
            return src;
        };

        const iframeSrc = getIframeSrc();
        const hasValidVideo = provider && embedURL;
        
        // Bootstrap 4 ratio mapping
        const getBootstrap4Ratio = (ratio) => {
            const mapping = {
                '16x9': '16by9',
                '4x3': '4by3',
                '21x9': '21by9',
                '1x1': '1by1'
            };
            return mapping[ratio] || '16by9';
        };

        const blockProps = useBlockProps({
            className: hasValidVideo ? 'bs-video-block' : 'bs-video-block bs-video-block-empty'
        });

        return (
            <>
                <InspectorControls>
                    <PanelBody title="Video Settings" initialOpen={true}>
                        <TextControl
                            label="Video URL"
                            value={videoURL || ''}
                            onChange={(value) => setAttributes({ videoURL: value })}
                            help="Enter YouTube or Vimeo video URL. Examples: https://www.youtube.com/watch?v=VIDEO_ID or https://vimeo.com/VIDEO_ID"
                        />
                        
                        {hasValidVideo && (
                            <>
                                <TextControl
                                    label="Video Title"
                                    value={videoTitle || 'Video'}
                                    onChange={(value) => setAttributes({ videoTitle: value || 'Video' })}
                                    help="Accessible title for the video iframe"
                                />
                                
                                <SelectControl
                                    label="Aspect Ratio"
                                    value={aspectRatio || '16x9'}
                                    options={[
                                        { label: '16:9', value: '16x9' },
                                        { label: '4:3', value: '4x3' },
                                        { label: '21:9', value: '21x9' },
                                        { label: '1:1', value: '1x1' }
                                    ]}
                                    onChange={(value) => setAttributes({ aspectRatio: value })}
                                />
                                
                                <ToggleControl
                                    label="Use Bootstrap 5"
                                    checked={bootstrapVersion !== false}
                                    onChange={(value) => setAttributes({ bootstrapVersion: value })}
                                    help={bootstrapVersion ? "Using Bootstrap 5 ratio classes" : "Using Bootstrap 4 embed-responsive classes"}
                                />
                                
                                <ToggleControl
                                    label="Lazy Load"
                                    checked={lazyLoad || false}
                                    onChange={(value) => setAttributes({ lazyLoad: value })}
                                    help="Load video only when it's about to enter the viewport"
                                />
                                
                                <ToggleControl
                                    label="Autoplay"
                                    checked={autoplay || false}
                                    onChange={(value) => setAttributes({ autoplay: value })}
                                    help="Automatically play video when page loads (may not work on mobile)"
                                />
                            </>
                        )}
                    </PanelBody>
                </InspectorControls>
                
                <div {...blockProps}>
                    {!hasValidVideo ? (
                        <div style={{
                            padding: '40px 20px',
                            textAlign: 'center',
                            border: '2px dashed #ccc',
                            borderRadius: '4px',
                            backgroundColor: '#f9f9f9'
                        }}>
                            <p style={{ margin: 0, color: '#666' }}>
                                <strong>BS Video Block</strong><br />
                                Enter a YouTube or Vimeo URL in the sidebar to embed a video.
                            </p>
                        </div>
                    ) : (
                        <>
                            {bootstrapVersion ? (
                                // Bootstrap 5
                                <div 
                                    className={`ratio ratio-${aspectRatio || '16x9'}`}
                                >
                                    <iframe
                                        src={iframeSrc}
                                        title={videoTitle || 'Video'}
                                        allowFullScreen
                                        loading={lazyLoad ? 'lazy' : 'eager'}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    />
                                </div>
                            ) : (
                                // Bootstrap 4
                                <div 
                                    className={`embed-responsive embed-responsive-${getBootstrap4Ratio(aspectRatio || '16x9')}`}
                                >
                                    <iframe
                                        className="embed-responsive-item"
                                        src={iframeSrc}
                                        title={videoTitle || 'Video'}
                                        allowFullScreen
                                        loading={lazyLoad ? 'lazy' : 'eager'}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </>
        );
    },

    save({ attributes }) {
        const {
            embedURL,
            provider,
            bootstrapVersion,
            aspectRatio,
            videoTitle,
            lazyLoad,
            autoplay
        } = attributes;

        if (!provider || !embedURL) {
            return null;
        }

        // Build iframe src with optional autoplay
        let iframeSrc = embedURL;
        if (autoplay) {
            if (provider === 'youtube') {
                iframeSrc += iframeSrc.includes('?') ? '&autoplay=1' : '?autoplay=1';
            } else if (provider === 'vimeo') {
                iframeSrc += iframeSrc.includes('?') ? '&autoplay=1' : '?autoplay=1';
            }
        }

        // Bootstrap 4 ratio mapping
        const getBootstrap4Ratio = (ratio) => {
            const mapping = {
                '16x9': '16by9',
                '4x3': '4by3',
                '21x9': '21by9',
                '1x1': '1by1'
            };
            return mapping[ratio] || '16by9';
        };

        if (bootstrapVersion) {
            // Bootstrap 5
            return (
                <div className={`ratio ratio-${aspectRatio || '16x9'}`}>
                    <iframe
                        src={iframeSrc}
                        title={videoTitle || 'Video'}
                        allowFullScreen
                        loading={lazyLoad ? 'lazy' : 'eager'}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                </div>
            );
        } else {
            // Bootstrap 4
            return (
                <div className={`embed-responsive embed-responsive-${getBootstrap4Ratio(aspectRatio || '16x9')}`}>
                    <iframe
                        className="embed-responsive-item"
                        src={iframeSrc}
                        title={videoTitle || 'Video'}
                        allowFullScreen
                        loading={lazyLoad ? 'lazy' : 'eager'}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                </div>
            );
        }
    },
});

