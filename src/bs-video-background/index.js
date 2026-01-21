import { registerBlockType } from "@wordpress/blocks";
import {
    useBlockProps,
    InspectorControls,
    InnerBlocks,
} from "@wordpress/block-editor";
import {
    PanelBody,
    TextControl,
    ToggleControl,
    SelectControl,
    RangeControl,
    Button,
} from "@wordpress/components";
import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import { useState, useEffect } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import "./style.css";

/**
 * Parse video URL and extract provider and video ID
 */
function parseVideoURL(url) {
    if (!url || !url.trim()) {
        return { isValid: false };
    }

    const trimmedUrl = url.trim();

    // YouTube URL patterns
    const youtubeMatch = trimmedUrl.match(
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/
    );
    if (youtubeMatch) {
        return { isValid: true, provider: "youtube", videoId: youtubeMatch[1] };
    }

    // Vimeo URL patterns
    const vimeoMatch = trimmedUrl.match(/vimeo\.com\/(?:.*\/)?(\d+)/);
    if (vimeoMatch) {
        return { isValid: true, provider: "vimeo", videoId: vimeoMatch[1] };
    }

    return { isValid: false };
}

/**
 * Get embed URL for preview (editor preview with autoplay and muted for better UX)
 */
function getEmbedURL(provider, videoId) {
    if (provider === "youtube" && videoId) {
        return `https://www.youtube.com/embed/${videoId}?rel=0&controls=0&modestbranding=1&autoplay=1&mute=1&loop=1&playlist=${videoId}&enablejsapi=1`;
    }
    if (provider === "vimeo" && videoId) {
        return `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1&loop=1&background=1`;
    }
    return null;
}

registerBlockType("bootstrap-blocks/bs-video-background", {
    edit({ attributes, setAttributes }) {
        const {
            videoType = "yt_vm_video",
            videoURL = "",
            videoMp4 = "",
            videoWebm = "",
            videoOgv = "",
            videoPoster = "",
            videoStartTime = 0,
            videoEndTime = 0,
            videoVolume = 0,
            videoLoop = true,
            videoAlwaysPlay = false,
            videoMobile = false,
            videoPlayOnlyVisible = false,
            parallax = "",
            parallaxSpeed = 0.5,
            parallaxMobile = false,
            mouseParallax = false,
            mouseParallaxSize = 30,
            mouseParallaxSpeed = 10000,
            overlayColor = "",
            overlayOpacity = 0,
            fullHeight = false,
            fullHeightAlign = "center",
            backgroundColor = "",
            padding = "",
            margin = "",
        } = attributes;

        const [parsedVideo, setParsedVideo] = useState(() =>
            parseVideoURL(videoURL)
        );

        // Update parsed video when videoURL changes
        useEffect(() => {
            const parsed = parseVideoURL(videoURL);
            setParsedVideo(parsed);
        }, [videoURL]);

        const hasVideo =
            (videoType === "yt_vm_video" && videoURL && parsedVideo.isValid) ||
            (videoType === "video" && (videoMp4 || videoWebm || videoOgv));

        const embedURL =
            hasVideo && parsedVideo.isValid
                ? getEmbedURL(parsedVideo.provider, parsedVideo.videoId)
                : null;

        // Get poster image URL for sidebar preview
        const posterImageUrl = useSelect(
            (select) => {
                if (!videoPoster || videoPoster === "") {
                    return null;
                }

                // Parse media ID (handle both string and number)
                let mediaId = null;
                if (
                    typeof videoPoster === "string" &&
                    /^\d+$/.test(videoPoster)
                ) {
                    mediaId = parseInt(videoPoster, 10);
                } else if (typeof videoPoster === "number") {
                    mediaId = videoPoster;
                }

                if (mediaId && typeof mediaId === "number") {
                    const media = select("core").getMedia(mediaId);
                    if (media && media.source_url) {
                        return media.source_url;
                    }
                }

                return null;
            },
            [videoPoster]
        );

        // Build editor styles
        const editorStyles = {
            minHeight: fullHeight ? "400px" : "300px",
            backgroundColor: backgroundColor || "#f0f0f0",
            position: "relative",
            padding: padding || "20px",
            margin: margin || "",
            overflow: "hidden",
        };

        const blockProps = useBlockProps({
            className: "bs-video-background-editor",
            style: editorStyles,
        });

        return (
            <>
                <InspectorControls>
                    {/* Video Settings */}
                    <PanelBody title="Video Settings" initialOpen={true}>
                        <SelectControl
                            label="Video Type"
                            value={videoType}
                            options={[
                                {
                                    label: "YouTube / Vimeo",
                                    value: "yt_vm_video",
                                },
                                { label: "Local Video", value: "video" },
                            ]}
                            onChange={(value) =>
                                setAttributes({ videoType: value })
                            }
                        />

                        {videoType === "yt_vm_video" && (
                            <>
                                <TextControl
                                    label="Video URL"
                                    value={videoURL}
                                    onChange={(value) =>
                                        setAttributes({ videoURL: value })
                                    }
                                    help={
                                        parsedVideo.isValid
                                            ? `Valid ${parsedVideo.provider} URL`
                                            : "Enter YouTube or Vimeo URL. Examples: https://www.youtube.com/watch?v=VIDEO_ID or https://vimeo.com/VIDEO_ID"
                                    }
                                    placeholder="https://www.youtube.com/watch?v=..."
                                />

                                <MediaUploadCheck>
                                    <div style={{ marginTop: "15px" }}>
                                        <p>Poster Image (Optional)</p>
                                        {posterImageUrl && (
                                            <div
                                                style={{
                                                    marginBottom: "10px",
                                                    border: "1px solid #ddd",
                                                    borderRadius: "4px",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                <img
                                                    src={posterImageUrl}
                                                    alt="Poster preview"
                                                    style={{
                                                        width: "100%",
                                                        height: "auto",
                                                        maxHeight: "150px",
                                                        objectFit: "contain",
                                                        display: "block",
                                                    }}
                                                />
                                            </div>
                                        )}
                                        <div
                                            style={{
                                                display: "flex",
                                                gap: "8px",
                                            }}
                                        >
                                            <MediaUpload
                                                onSelect={(media) =>
                                                    setAttributes({
                                                        videoPoster: media.id
                                                            ? String(media.id)
                                                            : "",
                                                    })
                                                }
                                                allowedTypes={["image"]}
                                                render={({ open }) => (
                                                    <Button
                                                        onClick={open}
                                                        isSecondary
                                                    >
                                                        {videoPoster
                                                            ? "Replace Poster"
                                                            : "Select Poster Image"}
                                                    </Button>
                                                )}
                                            />
                                            {videoPoster && (
                                                <Button
                                                    onClick={() =>
                                                        setAttributes({
                                                            videoPoster: "",
                                                        })
                                                    }
                                                    isDestructive
                                                    isSmall
                                                >
                                                    Remove
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </MediaUploadCheck>
                            </>
                        )}

                        {videoType === "video" && (
                            <>
                                <MediaUploadCheck>
                                    <div>
                                        <p>Video MP4</p>
                                        <MediaUpload
                                            onSelect={(media) =>
                                                setAttributes({
                                                    videoMp4: media.id,
                                                })
                                            }
                                            allowedTypes={["video"]}
                                            render={({ open }) => (
                                                <Button
                                                    onClick={open}
                                                    isSecondary
                                                >
                                                    {videoMp4
                                                        ? "Replace MP4 Video"
                                                        : "Select MP4 Video"}
                                                </Button>
                                            )}
                                        />
                                        {videoMp4 && (
                                            <Button
                                                onClick={() =>
                                                    setAttributes({
                                                        videoMp4: "",
                                                    })
                                                }
                                                isDestructive
                                                isSmall
                                                style={{ marginLeft: "10px" }}
                                            >
                                                Remove
                                            </Button>
                                        )}
                                    </div>
                                    <div style={{ marginTop: "15px" }}>
                                        <p>Video WebM (Optional)</p>
                                        <MediaUpload
                                            onSelect={(media) =>
                                                setAttributes({
                                                    videoWebm: media.id,
                                                })
                                            }
                                            allowedTypes={["video"]}
                                            render={({ open }) => (
                                                <Button
                                                    onClick={open}
                                                    isSecondary
                                                >
                                                    {videoWebm
                                                        ? "Replace WebM Video"
                                                        : "Select WebM Video"}
                                                </Button>
                                            )}
                                        />
                                        {videoWebm && (
                                            <Button
                                                onClick={() =>
                                                    setAttributes({
                                                        videoWebm: "",
                                                    })
                                                }
                                                isDestructive
                                                isSmall
                                                style={{ marginLeft: "10px" }}
                                            >
                                                Remove
                                            </Button>
                                        )}
                                    </div>
                                    <div style={{ marginTop: "15px" }}>
                                        <p>Video OGV (Optional)</p>
                                        <MediaUpload
                                            onSelect={(media) =>
                                                setAttributes({
                                                    videoOgv: media.id,
                                                })
                                            }
                                            allowedTypes={["video"]}
                                            render={({ open }) => (
                                                <Button
                                                    onClick={open}
                                                    isSecondary
                                                >
                                                    {videoOgv
                                                        ? "Replace OGV Video"
                                                        : "Select OGV Video"}
                                                </Button>
                                            )}
                                        />
                                        {videoOgv && (
                                            <Button
                                                onClick={() =>
                                                    setAttributes({
                                                        videoOgv: "",
                                                    })
                                                }
                                                isDestructive
                                                isSmall
                                                style={{ marginLeft: "10px" }}
                                            >
                                                Remove
                                            </Button>
                                        )}
                                    </div>
                                    <div style={{ marginTop: "15px" }}>
                                        <p>Poster Image (Optional)</p>
                                        {posterImageUrl && (
                                            <div
                                                style={{
                                                    marginBottom: "10px",
                                                    border: "1px solid #ddd",
                                                    borderRadius: "4px",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                <img
                                                    src={posterImageUrl}
                                                    alt="Poster preview"
                                                    style={{
                                                        width: "100%",
                                                        height: "auto",
                                                        maxHeight: "150px",
                                                        objectFit: "contain",
                                                        display: "block",
                                                    }}
                                                />
                                            </div>
                                        )}
                                        <div
                                            style={{
                                                display: "flex",
                                                gap: "8px",
                                            }}
                                        >
                                            <MediaUpload
                                                onSelect={(media) =>
                                                    setAttributes({
                                                        videoPoster: media.id
                                                            ? String(media.id)
                                                            : "",
                                                    })
                                                }
                                                allowedTypes={["image"]}
                                                render={({ open }) => (
                                                    <Button
                                                        onClick={open}
                                                        isSecondary
                                                    >
                                                        {videoPoster
                                                            ? "Replace Poster"
                                                            : "Select Poster Image"}
                                                    </Button>
                                                )}
                                            />
                                            {videoPoster && (
                                                <Button
                                                    onClick={() =>
                                                        setAttributes({
                                                            videoPoster: "",
                                                        })
                                                    }
                                                    isDestructive
                                                    isSmall
                                                >
                                                    Remove
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </MediaUploadCheck>
                            </>
                        )}
                    </PanelBody>

                    {/* Video Controls */}
                    {hasVideo && (
                        <PanelBody title="Video Controls" initialOpen={false}>
                            <ToggleControl
                                label="Play Only When Visible"
                                checked={videoPlayOnlyVisible || false}
                                onChange={(value) =>
                                    setAttributes({
                                        videoPlayOnlyVisible: value,
                                    })
                                }
                                help={
                                    videoPlayOnlyVisible
                                        ? "Video will only play when it's visible on screen"
                                        : "Video will play immediately on page load (default)"
                                }
                            />
                            <RangeControl
                                label="Start Time (seconds)"
                                value={videoStartTime || 0}
                                onChange={(value) =>
                                    setAttributes({
                                        videoStartTime: value || 0,
                                    })
                                }
                                min={0}
                                max={600}
                                step={1}
                            />
                            <RangeControl
                                label="End Time (seconds)"
                                value={videoEndTime || 0}
                                onChange={(value) =>
                                    setAttributes({ videoEndTime: value || 0 })
                                }
                                min={0}
                                max={600}
                                step={1}
                                help="0 = play until end"
                            />
                            <RangeControl
                                label="Volume (0-100)"
                                value={videoVolume || 0}
                                onChange={(value) =>
                                    setAttributes({ videoVolume: value || 0 })
                                }
                                min={0}
                                max={100}
                                step={1}
                            />
                            <ToggleControl
                                label="Loop Video"
                                checked={videoLoop !== false}
                                onChange={(value) =>
                                    setAttributes({ videoLoop: value })
                                }
                            />
                            <ToggleControl
                                label="Always Play"
                                checked={videoAlwaysPlay || false}
                                onChange={(value) =>
                                    setAttributes({ videoAlwaysPlay: value })
                                }
                                help="Keep video playing even when not in viewport"
                            />
                            <ToggleControl
                                label="Show on Mobile"
                                checked={videoMobile || false}
                                onChange={(value) =>
                                    setAttributes({ videoMobile: value })
                                }
                            />
                        </PanelBody>
                    )}

                    {/* Parallax Settings */}
                    <PanelBody title="Parallax Effects" initialOpen={false}>
                        <SelectControl
                            label="Parallax Type"
                            value={parallax || ""}
                            options={[
                                { label: "None", value: "" },
                                { label: "Scroll", value: "scroll" },
                                { label: "Scale", value: "scale" },
                                { label: "Opacity", value: "opacity" },
                                {
                                    label: "Scroll + Opacity",
                                    value: "scroll-opacity",
                                },
                                {
                                    label: "Scale + Opacity",
                                    value: "scale-opacity",
                                },
                            ]}
                            onChange={(value) =>
                                setAttributes({ parallax: value || "" })
                            }
                        />
                        {parallax && (
                            <>
                                <RangeControl
                                    label="Parallax Speed"
                                    value={parallaxSpeed || 0.5}
                                    onChange={(value) =>
                                        setAttributes({
                                            parallaxSpeed: value || 0.5,
                                        })
                                    }
                                    min={0.1}
                                    max={2}
                                    step={0.1}
                                />
                                <ToggleControl
                                    label="Enable on Mobile"
                                    checked={parallaxMobile || false}
                                    onChange={(value) =>
                                        setAttributes({ parallaxMobile: value })
                                    }
                                />
                            </>
                        )}
                    </PanelBody>

                    {/* Mouse Parallax */}
                    <PanelBody title="Mouse Parallax" initialOpen={false}>
                        <ToggleControl
                            label="Enable Mouse Parallax"
                            checked={mouseParallax || false}
                            onChange={(value) =>
                                setAttributes({ mouseParallax: value })
                            }
                        />
                        {mouseParallax && (
                            <>
                                <RangeControl
                                    label="Parallax Size"
                                    value={mouseParallaxSize || 30}
                                    onChange={(value) =>
                                        setAttributes({
                                            mouseParallaxSize: value || 30,
                                        })
                                    }
                                    min={1}
                                    max={100}
                                    step={1}
                                />
                                <RangeControl
                                    label="Parallax Speed"
                                    value={mouseParallaxSpeed || 10000}
                                    onChange={(value) =>
                                        setAttributes({
                                            mouseParallaxSpeed: value || 10000,
                                        })
                                    }
                                    min={1000}
                                    max={20000}
                                    step={1000}
                                />
                            </>
                        )}
                    </PanelBody>

                    {/* Overlay Settings */}
                    <PanelBody title="Overlay" initialOpen={false}>
                        <div>
                            <p>Overlay Color</p>
                            <input
                                type="color"
                                value={overlayColor || "#000000"}
                                onChange={(e) =>
                                    setAttributes({
                                        overlayColor: e.target.value,
                                    })
                                }
                                style={{ width: "100%", height: "40px" }}
                            />
                        </div>
                        <RangeControl
                            label="Overlay Opacity (%)"
                            value={overlayOpacity || 0}
                            onChange={(value) =>
                                setAttributes({ overlayOpacity: value || 0 })
                            }
                            min={0}
                            max={100}
                            step={1}
                        />
                    </PanelBody>

                    {/* Spacing Settings */}
                    <PanelBody title="Spacing" initialOpen={false}>
                        <TextControl
                            label="Padding"
                            value={padding || ""}
                            onChange={(value) =>
                                setAttributes({ padding: value })
                            }
                            placeholder="e.g., 20px or 20px 30px"
                            help="CSS padding values (e.g., 20px, 20px 30px, 10px 20px 30px 40px)"
                        />
                        <TextControl
                            label="Margin"
                            value={margin || ""}
                            onChange={(value) =>
                                setAttributes({ margin: value })
                            }
                            placeholder="e.g., 20px or 20px auto"
                            help="CSS margin values (e.g., 20px, 20px auto, 10px 20px 30px 40px)"
                        />
                    </PanelBody>

                    {/* Layout Settings */}
                    <PanelBody title="Layout" initialOpen={false}>
                        <ToggleControl
                            label="Full Height"
                            checked={fullHeight || false}
                            onChange={(value) =>
                                setAttributes({ fullHeight: value })
                            }
                            help="Make section full viewport height"
                        />
                        {fullHeight && (
                            <SelectControl
                                label="Vertical Alignment"
                                value={fullHeightAlign || "center"}
                                options={[
                                    { label: "Top", value: "flex-start" },
                                    { label: "Center", value: "center" },
                                    { label: "Bottom", value: "flex-end" },
                                ]}
                                onChange={(value) =>
                                    setAttributes({ fullHeightAlign: value })
                                }
                            />
                        )}
                        <div style={{ marginTop: "15px" }}>
                            <p>Background Color</p>
                            <input
                                type="color"
                                value={backgroundColor || "#ffffff"}
                                onChange={(e) =>
                                    setAttributes({
                                        backgroundColor: e.target.value,
                                    })
                                }
                                style={{ width: "100%", height: "40px" }}
                            />
                        </div>
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps}>
                    {hasVideo && embedURL ? (
                        <>
                            {/* Video Preview - Cover entire container like background */}
                            <div
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    width: "100%",
                                    height: "100%",
                                    zIndex: 1,
                                    overflow: "hidden",
                                    backgroundColor: "#000",
                                }}
                            >
                                <iframe
                                    src={embedURL}
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        width: "177.77777778vh" /* 16:9 aspect ratio for portrait containers */,
                                        height: "56.25vw" /* 16:9 aspect ratio for landscape containers */,
                                        minWidth: "100%",
                                        minHeight: "100%",
                                        border: "none",
                                        pointerEvents: "none",
                                        transform:
                                            "translate(-50%, -50%) scale(1.1)",
                                        transformOrigin: "center center",
                                    }}
                                    title="Video Background Preview"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                            {/* Overlay indicator */}
                            {overlayOpacity > 0 && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundColor:
                                            overlayColor || "#000000",
                                        opacity: (overlayOpacity || 0) / 100,
                                        zIndex: 2,
                                        pointerEvents: "none",
                                    }}
                                />
                            )}
                            {/* Content */}
                            <div
                                style={{
                                    position: "relative",
                                    zIndex: 3,
                                    minHeight: fullHeight ? "400px" : "auto",
                                }}
                            >
                                <InnerBlocks />
                            </div>
                        </>
                    ) : videoType === "video" &&
                      (videoMp4 || videoWebm || videoOgv) ? (
                        <>
                            <div
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: "#000",
                                    opacity: 0.7,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#fff",
                                    fontSize: "14px",
                                    zIndex: 1,
                                }}
                            >
                                Local Video Background
                            </div>
                            <div
                                style={{
                                    position: "relative",
                                    zIndex: 2,
                                    minHeight: fullHeight ? "400px" : "auto",
                                }}
                            >
                                <InnerBlocks />
                            </div>
                        </>
                    ) : (
                        <div
                            style={{
                                textAlign: "center",
                                padding: "40px 20px",
                                color: "#666",
                            }}
                        >
                            <p style={{ margin: 0, fontWeight: "bold" }}>
                                BS Video Background Block
                            </p>
                            <p style={{ margin: "10px 0 0", fontSize: "14px" }}>
                                Configure video settings in the sidebar to add a
                                video background.
                            </p>
                            <InnerBlocks />
                        </div>
                    )}
                </div>
            </>
        );
    },

    save() {
        return <InnerBlocks.Content />;
    },
});
