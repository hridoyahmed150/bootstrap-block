import { registerBlockType } from "@wordpress/blocks";
import {
    useBlockProps,
    InspectorControls,
    MediaUpload,
    MediaUploadCheck,
} from "@wordpress/block-editor";
import {
    PanelBody,
    RangeControl,
    ToggleControl,
    SelectControl,
} from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";
import "./style.css";

registerBlockType("bootstrap-blocks/image-slider", {
    edit({ attributes, setAttributes }) {
        const {
            images = [],
            slidesToShow = 3,
            slidesToShowTablet = 2,
            slidesToShowMobile = 1,
            gap = 16,
            borderRadius = 0,
            arrows = true,
            dots = true,
            autoplay = false,
            autoplaySpeed = 3000,
            equalHeight = false,
            imageHeight = 300,
            arrowPosition = "outside",
            arrowStyle = "chevron",
            arrowColor = "#333333",
            arrowBgColor = "#ffffff",
            arrowSize = 40,
            arrowPadding = 10,
            arrowOffset = 16,
            arrowPrevImage = { id: 0, url: "" },
            arrowNextImage = { id: 0, url: "" },
            arrowSameImage = false,
            dotColor = "#D0D7E0",
            dotActiveColor = "#007cba",
            dotSize = 12,
        } = attributes;

        const blockProps = useBlockProps({
            className: "bs-image-slider-editor",
        });

        // Get full image URLs from WordPress media library (slider + arrow images)
        const imageUrls = useSelect(
            (select) => {
                const getMedia = select("core").getMedia;
                const acc = {};
                const fetch = (id, fallbackUrl) => {
                    if (!id) return;
                    try {
                        const m = getMedia(id);
                        if (m?.source_url) acc[id] = m.source_url;
                        else if (fallbackUrl) acc[id] = fallbackUrl;
                    } catch (e) {
                        if (fallbackUrl) acc[id] = fallbackUrl;
                    }
                };
                images.forEach((img) => {
                    if (img.id) fetch(img.id, img.url);
                    else if (img.url)
                        acc["temp-" + images.indexOf(img)] = img.url;
                });
                if (arrowPrevImage?.id)
                    fetch(arrowPrevImage.id, arrowPrevImage.url);
                if (arrowNextImage?.id)
                    fetch(arrowNextImage.id, arrowNextImage.url);
                return acc;
            },
            [images, arrowPrevImage, arrowNextImage],
        );
        const sliderUrls = images.reduce((a, img, i) => {
            if (img.id) a[img.id] = imageUrls[img.id] || img.url || "";
            else if (img.url) a["temp-" + i] = img.url;
            return a;
        }, {});
        const resolveArrowUrl = (obj) => {
            if (!obj) return "";
            if (obj.url) return obj.url;
            if (obj.id && imageUrls[obj.id]) return imageUrls[obj.id];
            return "";
        };

        const onSelect = (mediaList) => {
            // MediaUpload with multiple returns all selected items
            // Map to our format - use source_url if available, fallback to url
            const next = mediaList.map((m) => ({
                id: m.id,
                url: m.source_url || m.url || "",
                alt: m.alt || m.title || "",
            }));
            setAttributes({ images: next });
        };

        const removeImage = (index) => {
            const next = images.filter((_, i) => i !== index);
            setAttributes({ images: next });
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody
                        title={__("Slider settings", "bootstrap-blocks")}
                        initialOpen={true}
                    >
                        <RangeControl
                            label={__("Slides (desktop)", "bootstrap-blocks")}
                            value={slidesToShow}
                            onChange={(v) => setAttributes({ slidesToShow: v })}
                            min={1}
                            max={8}
                        />
                        <RangeControl
                            label={__("Slides (tablet)", "bootstrap-blocks")}
                            value={slidesToShowTablet}
                            onChange={(v) =>
                                setAttributes({ slidesToShowTablet: v })
                            }
                            min={1}
                            max={6}
                        />
                        <RangeControl
                            label={__("Slides (mobile)", "bootstrap-blocks")}
                            value={slidesToShowMobile}
                            onChange={(v) =>
                                setAttributes({ slidesToShowMobile: v })
                            }
                            min={1}
                            max={4}
                        />
                        <RangeControl
                            label={__("Gap (px)", "bootstrap-blocks")}
                            value={gap}
                            onChange={(v) => setAttributes({ gap: v })}
                            min={0}
                            max={64}
                        />
                        <RangeControl
                            label={__("Border radius (px)", "bootstrap-blocks")}
                            value={borderRadius}
                            onChange={(v) => setAttributes({ borderRadius: v })}
                            min={0}
                            max={48}
                        />
                        <ToggleControl
                            label={__("Equal height", "bootstrap-blocks")}
                            checked={equalHeight}
                            onChange={(v) => setAttributes({ equalHeight: v })}
                            help={__(
                                "Make all images the same height",
                                "bootstrap-blocks",
                            )}
                        />
                        {equalHeight && (
                            <RangeControl
                                label={__(
                                    "Image height (px)",
                                    "bootstrap-blocks",
                                )}
                                value={imageHeight}
                                onChange={(v) =>
                                    setAttributes({ imageHeight: v })
                                }
                                min={100}
                                max={800}
                                step={10}
                            />
                        )}
                        <ToggleControl
                            label={__("Arrows", "bootstrap-blocks")}
                            checked={arrows}
                            onChange={(v) => setAttributes({ arrows: v })}
                        />
                        <ToggleControl
                            label={__("Dots", "bootstrap-blocks")}
                            checked={dots}
                            onChange={(v) => setAttributes({ dots: v })}
                        />
                        <ToggleControl
                            label={__("Autoplay", "bootstrap-blocks")}
                            checked={autoplay}
                            onChange={(v) => setAttributes({ autoplay: v })}
                        />
                        {autoplay && (
                            <RangeControl
                                label={__(
                                    "Autoplay speed (ms)",
                                    "bootstrap-blocks",
                                )}
                                value={autoplaySpeed}
                                onChange={(v) =>
                                    setAttributes({ autoplaySpeed: v })
                                }
                                min={1000}
                                max={10000}
                                step={500}
                            />
                        )}
                    </PanelBody>
                    {arrows && (
                        <PanelBody
                            title={__("Arrow styling", "bootstrap-blocks")}
                            initialOpen={false}
                        >
                            <SelectControl
                                label={__("Arrow position", "bootstrap-blocks")}
                                value={arrowPosition}
                                options={[
                                    {
                                        label: __(
                                            "Outside",
                                            "bootstrap-blocks",
                                        ),
                                        value: "outside",
                                    },
                                    {
                                        label: __("Inside", "bootstrap-blocks"),
                                        value: "inside",
                                    },
                                ]}
                                onChange={(v) =>
                                    setAttributes({ arrowPosition: v })
                                }
                            />
                            <div style={{ marginBottom: "16px" }}>
                                <label
                                    style={{
                                        display: "block",
                                        marginBottom: "8px",
                                        fontSize: "13px",
                                        fontWeight: 600,
                                    }}
                                >
                                    {__("Arrow color", "bootstrap-blocks")}
                                </label>
                                <input
                                    type="color"
                                    value={arrowColor}
                                    onChange={(e) =>
                                        setAttributes({
                                            arrowColor: e.target.value,
                                        })
                                    }
                                    style={{
                                        width: "100%",
                                        height: "40px",
                                        cursor: "pointer",
                                    }}
                                />
                            </div>
                            <div style={{ marginBottom: "16px" }}>
                                <label
                                    style={{
                                        display: "block",
                                        marginBottom: "8px",
                                        fontSize: "13px",
                                        fontWeight: 600,
                                    }}
                                >
                                    {__("Arrow background", "bootstrap-blocks")}
                                </label>
                                <input
                                    type="color"
                                    value={arrowBgColor}
                                    onChange={(e) =>
                                        setAttributes({
                                            arrowBgColor: e.target.value,
                                        })
                                    }
                                    style={{
                                        width: "100%",
                                        height: "40px",
                                        cursor: "pointer",
                                    }}
                                />
                            </div>
                            <RangeControl
                                label={__(
                                    "Arrow size (px)",
                                    "bootstrap-blocks",
                                )}
                                value={arrowSize}
                                onChange={(v) =>
                                    setAttributes({ arrowSize: v })
                                }
                                min={5}
                                max={80}
                                step={2}
                            />
                            <RangeControl
                                label={__(
                                    "Arrow padding (px)",
                                    "bootstrap-blocks",
                                )}
                                value={arrowPadding}
                                onChange={(v) =>
                                    setAttributes({ arrowPadding: v })
                                }
                                min={0}
                                max={24}
                                step={1}
                                help={__(
                                    "Padding inside arrow background",
                                    "bootstrap-blocks",
                                )}
                            />
                            {arrowPosition === "outside" && (
                                <RangeControl
                                    label={__(
                                        "Outside distance (px)",
                                        "bootstrap-blocks",
                                    )}
                                    value={arrowOffset}
                                    onChange={(v) =>
                                        setAttributes({ arrowOffset: v })
                                    }
                                    min={0}
                                    max={80}
                                    step={2}
                                    help={__(
                                        "How far arrows sit from slider edge",
                                        "bootstrap-blocks",
                                    )}
                                />
                            )}
                            <ToggleControl
                                label={__(
                                    "Use same image for both arrows",
                                    "bootstrap-blocks",
                                )}
                                checked={arrowSameImage}
                                onChange={(v) =>
                                    setAttributes({ arrowSameImage: v })
                                }
                                help={__(
                                    "One upload for prev & next; prev is flipped.",
                                    "bootstrap-blocks",
                                )}
                            />
                            <div
                                style={{
                                    marginTop: "16px",
                                    marginBottom: "8px",
                                    fontSize: "13px",
                                    fontWeight: 600,
                                }}
                            >
                                {__(
                                    "Arrow images (optional)",
                                    "bootstrap-blocks",
                                )}
                            </div>
                            <MediaUploadCheck>
                                {arrowSameImage ? (
                                    <div style={{ marginBottom: "12px" }}>
                                        <label
                                            style={{
                                                display: "block",
                                                marginBottom: "6px",
                                                fontSize: "12px",
                                            }}
                                        >
                                            {__(
                                                "Arrow image",
                                                "bootstrap-blocks",
                                            )}
                                        </label>
                                        <MediaUpload
                                            onSelect={(m) =>
                                                setAttributes({
                                                    arrowPrevImage: {
                                                        id: m.id,
                                                        url:
                                                            m.source_url ||
                                                            m.url ||
                                                            "",
                                                    },
                                                    arrowNextImage: {
                                                        id: m.id,
                                                        url:
                                                            m.source_url ||
                                                            m.url ||
                                                            "",
                                                    },
                                                })
                                            }
                                            allowedTypes={["image"]}
                                            value={
                                                arrowPrevImage?.id || undefined
                                            }
                                            render={({ open }) => (
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "8px",
                                                    }}
                                                >
                                                    {resolveArrowUrl(
                                                        arrowPrevImage,
                                                    ) && (
                                                        <img
                                                            src={resolveArrowUrl(
                                                                arrowPrevImage,
                                                            )}
                                                            alt=""
                                                            style={{
                                                                maxWidth:
                                                                    "48px",
                                                                maxHeight:
                                                                    "48px",
                                                                objectFit:
                                                                    "contain",
                                                            }}
                                                        />
                                                    )}
                                                    <button
                                                        type="button"
                                                        className="components-button is-secondary is-small"
                                                        onClick={open}
                                                    >
                                                        {arrowPrevImage?.id
                                                            ? __(
                                                                  "Replace",
                                                                  "bootstrap-blocks",
                                                              )
                                                            : __(
                                                                  "Upload",
                                                                  "bootstrap-blocks",
                                                              )}
                                                    </button>
                                                    {arrowPrevImage?.id && (
                                                        <button
                                                            type="button"
                                                            className="components-button is-destructive is-small"
                                                            onClick={() =>
                                                                setAttributes({
                                                                    arrowPrevImage:
                                                                        {
                                                                            id: 0,
                                                                            url: "",
                                                                        },
                                                                    arrowNextImage:
                                                                        {
                                                                            id: 0,
                                                                            url: "",
                                                                        },
                                                                })
                                                            }
                                                        >
                                                            {__(
                                                                "Remove",
                                                                "bootstrap-blocks",
                                                            )}
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        />
                                    </div>
                                ) : (
                                    <>
                                        <div style={{ marginBottom: "12px" }}>
                                            <label
                                                style={{
                                                    display: "block",
                                                    marginBottom: "6px",
                                                    fontSize: "12px",
                                                }}
                                            >
                                                {__(
                                                    "Previous (left) arrow",
                                                    "bootstrap-blocks",
                                                )}
                                            </label>
                                            <MediaUpload
                                                onSelect={(m) =>
                                                    setAttributes({
                                                        arrowPrevImage: {
                                                            id: m.id,
                                                            url:
                                                                m.source_url ||
                                                                m.url ||
                                                                "",
                                                        },
                                                    })
                                                }
                                                allowedTypes={["image"]}
                                                value={
                                                    arrowPrevImage?.id ||
                                                    undefined
                                                }
                                                render={({ open }) => (
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            gap: "8px",
                                                        }}
                                                    >
                                                        {resolveArrowUrl(
                                                            arrowPrevImage,
                                                        ) && (
                                                            <img
                                                                src={resolveArrowUrl(
                                                                    arrowPrevImage,
                                                                )}
                                                                alt=""
                                                                style={{
                                                                    maxWidth:
                                                                        "48px",
                                                                    maxHeight:
                                                                        "48px",
                                                                    objectFit:
                                                                        "contain",
                                                                }}
                                                            />
                                                        )}
                                                        <button
                                                            type="button"
                                                            className="components-button is-secondary is-small"
                                                            onClick={open}
                                                        >
                                                            {arrowPrevImage?.id
                                                                ? __(
                                                                      "Replace",
                                                                      "bootstrap-blocks",
                                                                  )
                                                                : __(
                                                                      "Upload",
                                                                      "bootstrap-blocks",
                                                                  )}
                                                        </button>
                                                        {arrowPrevImage?.id && (
                                                            <button
                                                                type="button"
                                                                className="components-button is-destructive is-small"
                                                                onClick={() =>
                                                                    setAttributes(
                                                                        {
                                                                            arrowPrevImage:
                                                                                {
                                                                                    id: 0,
                                                                                    url: "",
                                                                                },
                                                                        },
                                                                    )
                                                                }
                                                            >
                                                                {__(
                                                                    "Remove",
                                                                    "bootstrap-blocks",
                                                                )}
                                                            </button>
                                                        )}
                                                    </div>
                                                )}
                                            />
                                        </div>
                                        <div style={{ marginBottom: "12px" }}>
                                            <label
                                                style={{
                                                    display: "block",
                                                    marginBottom: "6px",
                                                    fontSize: "12px",
                                                }}
                                            >
                                                {__(
                                                    "Next (right) arrow",
                                                    "bootstrap-blocks",
                                                )}
                                            </label>
                                            <MediaUpload
                                                onSelect={(m) =>
                                                    setAttributes({
                                                        arrowNextImage: {
                                                            id: m.id,
                                                            url:
                                                                m.source_url ||
                                                                m.url ||
                                                                "",
                                                        },
                                                    })
                                                }
                                                allowedTypes={["image"]}
                                                value={
                                                    arrowNextImage?.id ||
                                                    undefined
                                                }
                                                render={({ open }) => (
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            gap: "8px",
                                                        }}
                                                    >
                                                        {resolveArrowUrl(
                                                            arrowNextImage,
                                                        ) && (
                                                            <img
                                                                src={resolveArrowUrl(
                                                                    arrowNextImage,
                                                                )}
                                                                alt=""
                                                                style={{
                                                                    maxWidth:
                                                                        "48px",
                                                                    maxHeight:
                                                                        "48px",
                                                                    objectFit:
                                                                        "contain",
                                                                }}
                                                            />
                                                        )}
                                                        <button
                                                            type="button"
                                                            className="components-button is-secondary is-small"
                                                            onClick={open}
                                                        >
                                                            {arrowNextImage?.id
                                                                ? __(
                                                                      "Replace",
                                                                      "bootstrap-blocks",
                                                                  )
                                                                : __(
                                                                      "Upload",
                                                                      "bootstrap-blocks",
                                                                  )}
                                                        </button>
                                                        {arrowNextImage?.id && (
                                                            <button
                                                                type="button"
                                                                className="components-button is-destructive is-small"
                                                                onClick={() =>
                                                                    setAttributes(
                                                                        {
                                                                            arrowNextImage:
                                                                                {
                                                                                    id: 0,
                                                                                    url: "",
                                                                                },
                                                                        },
                                                                    )
                                                                }
                                                            >
                                                                {__(
                                                                    "Remove",
                                                                    "bootstrap-blocks",
                                                                )}
                                                            </button>
                                                        )}
                                                    </div>
                                                )}
                                            />
                                        </div>
                                    </>
                                )}
                            </MediaUploadCheck>
                        </PanelBody>
                    )}
                    {dots && (
                        <PanelBody
                            title={__("Dot styling", "bootstrap-blocks")}
                            initialOpen={false}
                        >
                            <div style={{ marginBottom: "16px" }}>
                                <label
                                    style={{
                                        display: "block",
                                        marginBottom: "8px",
                                        fontSize: "13px",
                                        fontWeight: 600,
                                    }}
                                >
                                    {__("Dot color", "bootstrap-blocks")}
                                </label>
                                <input
                                    type="color"
                                    value={dotColor}
                                    onChange={(e) =>
                                        setAttributes({
                                            dotColor: e.target.value,
                                        })
                                    }
                                    style={{
                                        width: "100%",
                                        height: "40px",
                                        cursor: "pointer",
                                    }}
                                />
                            </div>
                            <div style={{ marginBottom: "16px" }}>
                                <label
                                    style={{
                                        display: "block",
                                        marginBottom: "8px",
                                        fontSize: "13px",
                                        fontWeight: 600,
                                    }}
                                >
                                    {__("Active dot color", "bootstrap-blocks")}
                                </label>
                                <input
                                    type="color"
                                    value={dotActiveColor}
                                    onChange={(e) =>
                                        setAttributes({
                                            dotActiveColor: e.target.value,
                                        })
                                    }
                                    style={{
                                        width: "100%",
                                        height: "40px",
                                        cursor: "pointer",
                                    }}
                                />
                            </div>
                            <RangeControl
                                label={__("Dot size (px)", "bootstrap-blocks")}
                                value={dotSize}
                                onChange={(v) => setAttributes({ dotSize: v })}
                                min={6}
                                max={24}
                                step={1}
                            />
                        </PanelBody>
                    )}
                </InspectorControls>
                <div {...blockProps}>
                    <div
                        className={`bs-image-slider-editor-list ${
                            equalHeight ? "bs-image-slider-equal-height" : ""
                        }`}
                        style={{
                            "--bs-is-gap": gap + "px",
                            "--bs-is-radius": borderRadius + "px",
                            ...(equalHeight
                                ? { "--bs-is-height": imageHeight + "px" }
                                : {}),
                        }}
                    >
                        {images.length > 0 ? (
                            <>
                                {images.map((img, i) => {
                                    // Get image URL from our useSelect hook or fallback
                                    const imageUrl =
                                        sliderUrls[img.id] ||
                                        sliderUrls["temp-" + i] ||
                                        img.url ||
                                        "";
                                    if (!imageUrl) return null;

                                    return (
                                        <div
                                            key={`img-${img.id || i}-${i}`}
                                            className="bs-image-slider-editor-slide"
                                        >
                                            <img
                                                src={imageUrl}
                                                alt={img.alt || ""}
                                                style={{
                                                    borderRadius:
                                                        borderRadius + "px",
                                                    ...(equalHeight
                                                        ? {
                                                              height:
                                                                  imageHeight +
                                                                  "px",
                                                              objectFit:
                                                                  "cover",
                                                          }
                                                        : {}),
                                                }}
                                            />
                                            <button
                                                type="button"
                                                className="bs-image-slider-remove"
                                                onClick={() => removeImage(i)}
                                                aria-label={__(
                                                    "Remove image",
                                                    "bootstrap-blocks",
                                                )}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    );
                                })}
                                <MediaUploadCheck>
                                    <MediaUpload
                                        onSelect={(mediaList) => {
                                            // When adding, merge with existing (don't replace)
                                            const newImages = mediaList.map(
                                                (m) => ({
                                                    id: m.id,
                                                    url:
                                                        m.source_url ||
                                                        m.url ||
                                                        "",
                                                    alt: m.alt || m.title || "",
                                                }),
                                            );
                                            const existingIds = new Set(
                                                images.map((img) => img.id),
                                            );
                                            const toAdd = newImages.filter(
                                                (img) =>
                                                    !existingIds.has(img.id),
                                            );
                                            if (toAdd.length > 0) {
                                                setAttributes({
                                                    images: [
                                                        ...images,
                                                        ...toAdd,
                                                    ],
                                                });
                                            }
                                        }}
                                        allowedTypes={["image"]}
                                        multiple
                                        render={({ open }) => (
                                            <button
                                                type="button"
                                                className="bs-image-slider-add"
                                                onClick={open}
                                            >
                                                +{" "}
                                                {__(
                                                    "Add images",
                                                    "bootstrap-blocks",
                                                )}
                                            </button>
                                        )}
                                    />
                                </MediaUploadCheck>
                            </>
                        ) : (
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={onSelect}
                                    allowedTypes={["image"]}
                                    multiple
                                    value={[]}
                                    render={({ open }) => (
                                        <button
                                            type="button"
                                            className="bs-image-slider-placeholder"
                                            onClick={open}
                                        >
                                            {__(
                                                "Upload images",
                                                "bootstrap-blocks",
                                            )}
                                        </button>
                                    )}
                                />
                            </MediaUploadCheck>
                        )}
                    </div>
                </div>
            </>
        );
    },
    save() {
        return null;
    },
});
