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
    RangeControl,
    Button,
} from "@wordpress/components";
import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";
import "./style.css";

registerBlockType("bootstrap-blocks/bs-video-background", {
    edit({ attributes, setAttributes }) {
        const {
            videoURL = "",
            videoPoster = "",
            videoStartTime = 0,
            videoEndTime = 0,
            videoVolume = 0,
            videoLoop = true,
            videoAlwaysPlay = true,
            minHeight = 400,
            overlayColor = "",
            overlayOpacity = 0,
            backgroundColor = "",
            padding = "",
            margin = "",
        } = attributes;

        // Get poster image URL for sidebar preview
        const posterImageUrl = useSelect(
            (select) => {
                try {
                    if (!videoPoster || videoPoster === "") {
                        return null;
                    }

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
                } catch (e) {
                    console.error("Error fetching poster image URL:", e);
                }
                return null;
            },
            [videoPoster]
        );

        // Build editor styles
        const editorStyles = {
            minHeight: minHeight + "px",
            backgroundColor: backgroundColor || "#f0f0f0",
            position: "relative",
            padding: padding || "20px",
            margin: margin || "",
            overflow: "hidden",
        };

        // Parse video URL to get video ID for preview
        const parseVideoURL = (url) => {
            if (!url || !url.trim()) {
                return { isValid: false };
            }
            const trimmedUrl = url.trim();
            const youtubeMatch = trimmedUrl.match(
                /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
            );
            if (youtubeMatch) {
                return { isValid: true, videoId: youtubeMatch[1] };
            }
            return { isValid: false };
        };

        const parsedVideo = parseVideoURL(videoURL);
        const hasVideo = parsedVideo.isValid;
        const embedURL = hasVideo
            ? `https://www.youtube.com/embed/${parsedVideo.videoId}?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&rel=0&playsinline=1&playlist=${parsedVideo.videoId}`
            : null;

        const blockProps = useBlockProps({
            className: "bs-video-background-editor",
            style: editorStyles,
        });

        return (
            <>
                <InspectorControls>
                    <PanelBody title="Video Settings" initialOpen={true}>
                        <TextControl
                            label="Video URL"
                            value={videoURL}
                            onChange={(value) =>
                                setAttributes({ videoURL: value })
                            }
                            help="Enter YouTube URL (youtube.com/watch, youtu.be, youtube.com/embed, or youtube.com/shorts)"
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
                                            onError={(e) => {
                                                e.target.style.display = "none";
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
                                        onSelect={(media) => {
                                            try {
                                                setAttributes({
                                                    videoPoster: media.id
                                                        ? String(media.id)
                                                        : "",
                                                });
                                            } catch (e) {
                                                console.error(
                                                    "Error setting videoPoster attribute:",
                                                    e
                                                );
                                            }
                                        }}
                                        allowedTypes={["image"]}
                                        render={({ open }) => (
                                            <Button onClick={open} isSecondary>
                                                {videoPoster
                                                    ? "Replace Poster"
                                                    : "Select Poster Image"}
                                            </Button>
                                        )}
                                    />
                                    {videoPoster && (
                                        <Button
                                            onClick={() => {
                                                try {
                                                    setAttributes({
                                                        videoPoster: "",
                                                    });
                                                } catch (e) {
                                                    console.error(
                                                        "Error removing videoPoster attribute:",
                                                        e
                                                    );
                                                }
                                            }}
                                            isDestructive
                                            isSmall
                                        >
                                            Remove
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </MediaUploadCheck>
                    </PanelBody>

                    {videoURL && (
                        <PanelBody title="Video Controls" initialOpen={false}>
                            <RangeControl
                                label="Start Time (seconds)"
                                value={videoStartTime || 0}
                                onChange={(value) =>
                                    setAttributes({
                                        videoStartTime: value || 0,
                                    })
                                }
                                min={0}
                                max={3600}
                                step={1}
                            />
                            <RangeControl
                                label="End Time (seconds)"
                                value={videoEndTime || 0}
                                onChange={(value) =>
                                    setAttributes({
                                        videoEndTime: value || 0,
                                    })
                                }
                                min={0}
                                max={3600}
                                step={1}
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
                                checked={videoLoop || false}
                                onChange={(value) =>
                                    setAttributes({ videoLoop: value })
                                }
                            />
                            <ToggleControl
                                label="Always Play Video (Autoplay)"
                                checked={videoAlwaysPlay || false}
                                onChange={(value) =>
                                    setAttributes({ videoAlwaysPlay: value })
                                }
                                help="Video will attempt to autoplay on page load. May be blocked by browser policies if not muted."
                            />
                        </PanelBody>
                    )}

                    <PanelBody title="Layout & Spacing" initialOpen={false}>
                        <RangeControl
                            label="Minimum Height (px)"
                            value={minHeight || 400}
                            onChange={(value) =>
                                setAttributes({ minHeight: value || 400 })
                            }
                            min={100}
                            max={2000}
                            step={50}
                        />
                        <TextControl
                            label="Padding"
                            value={padding}
                            onChange={(value) =>
                                setAttributes({ padding: value })
                            }
                            placeholder="e.g., 20px 0"
                            help="CSS padding value (e.g., 20px, 1em 2em)"
                        />
                        <TextControl
                            label="Margin"
                            value={margin}
                            onChange={(value) =>
                                setAttributes({ margin: value })
                            }
                            placeholder="e.g., 20px 0"
                            help="CSS margin value (e.g., 20px, 1em 2em)"
                        />
                    </PanelBody>

                    <PanelBody title="Overlay" initialOpen={false}>
                        <TextControl
                            label="Overlay Color"
                            value={overlayColor}
                            onChange={(value) =>
                                setAttributes({ overlayColor: value })
                            }
                            placeholder="#000000"
                            help="Hex color code (e.g., #000000)"
                        />
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

                    <PanelBody title="Background" initialOpen={false}>
                        <TextControl
                            label="Background Color"
                            value={backgroundColor}
                            onChange={(value) =>
                                setAttributes({ backgroundColor: value })
                            }
                            placeholder="#ffffff"
                            help="Hex color code (e.g., #ffffff)"
                        />
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
                                        width: "177.77777778vh",
                                        height: "56.25vw",
                                        minWidth: "100%",
                                        minHeight: "100%",
                                        border: "none",
                                        pointerEvents: "none",
                                        transform: "translate(-50%, -50%) scale(1.1)",
                                        transformOrigin: "center center",
                                    }}
                                    title="Video Background Preview"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                            {/* Content */}
                            <div
                                style={{
                                    position: "relative",
                                    zIndex: 3,
                                    minHeight: "auto",
                                }}
                            >
                                <InnerBlocks />
                            </div>
                        </>
                    ) : (
                        <>
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
                                    Enter YouTube URL in the sidebar to add a video
                                    background.
                                </p>
                            </div>
                            <InnerBlocks />
                        </>
                    )}
                </div>
            </>
        );
    },

    save() {
        return null;
    },
});
