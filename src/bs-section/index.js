import { registerBlockType, createBlock } from "@wordpress/blocks";
import {
    useBlockProps,
    InspectorControls,
    InnerBlocks,
    MediaUpload,
    MediaUploadCheck,
} from "@wordpress/block-editor";
import {
    PanelBody,
    TextControl,
    SelectControl,
    Button,
    ColorPicker,
    RangeControl,
    TabPanel,
} from "@wordpress/components";
import { useState, useEffect } from "@wordpress/element";
import { dispatch, select } from "@wordpress/data";
import "./style.css";

registerBlockType("bootstrap-blocks/bs-section", {
    edit({ attributes, setAttributes, clientId }) {
        const {
            uniqueId,
            className,
            backgroundType,
            backgroundColor,
            backgroundImageUrl,
            backgroundImageId,
            backgroundImageSize,
            backgroundImagePosition,
            backgroundImageRepeat,
            gradientType,
            gradientDirection,
            gradientColor1,
            gradientColor2,
            gradientStop1,
            gradientStop2,
            overlayType,
            overlayColor,
            overlayOpacity,
            default: defaultSpacing,
            sm,
            md,
            lg,
            xl,
            xxl,
        } = attributes;

        const [activePaddingTab, setActivePaddingTab] = useState("default");
        const [activeMarginTab, setActiveMarginTab] = useState("default");

        // Helper function to get effective spacing value with cascading inheritance
        const getEffectiveValue = (breakpoint, property) => {
            const breakpoints = {
                default: defaultSpacing,
                sm,
                md,
                lg,
                xl,
                xxl,
            };
            const breakpointOrder = ["default", "sm", "md", "lg", "xl", "xxl"];
            const currentIndex = breakpointOrder.indexOf(breakpoint);

            // Start from the current breakpoint and work backwards to find the first set value
            for (let i = currentIndex; i >= 0; i--) {
                const bp = breakpointOrder[i];
                const bpData = breakpoints[bp];
                if (bpData && bpData[property] !== undefined) {
                    return bpData[property];
                }
            }

            return 0;
        };

        // Helper function to handle cascading inheritance when updating values
        const updateSpacingValue = (breakpoint, property, value) => {
            const breakpointOrder = ["default", "sm", "md", "lg", "xl", "xxl"];
            const currentIndex = breakpointOrder.indexOf(breakpoint);
            const updates = {};

            // Update the current breakpoint
            const currentBreakpoint =
                breakpoint === "default"
                    ? defaultSpacing
                    : attributes[breakpoint];
            updates[breakpoint] = {
                ...currentBreakpoint,
                [property]: value,
            };

            // Cascade to all higher breakpoints
            for (let i = currentIndex + 1; i < breakpointOrder.length; i++) {
                const bp = breakpointOrder[i];
                const bpData = attributes[bp];
                updates[bp] = {
                    ...bpData,
                    [property]: value,
                };
            }

            setAttributes(updates);
        };

        // Helper function to generate background styles
        const getBackgroundStyles = () => {
            const styles = {};

            if (backgroundType === "color" && backgroundColor) {
                styles.backgroundColor = backgroundColor;
            } else if (backgroundType === "image" && backgroundImageUrl) {
                styles.backgroundImage = `url(${backgroundImageUrl})`;
                styles.backgroundSize = backgroundImageSize;
                styles.backgroundPosition = backgroundImagePosition;
                styles.backgroundRepeat = backgroundImageRepeat;
            } else if (backgroundType === "gradient") {
                if (gradientType === "linear") {
                    styles.background = `linear-gradient(${gradientDirection}, ${gradientColor1} ${gradientStop1}%, ${gradientColor2} ${gradientStop2}%)`;
                } else {
                    styles.background = `radial-gradient(circle, ${gradientColor1} ${gradientStop1}%, ${gradientColor2} ${gradientStop2}%)`;
                }
            }

            return styles;
        };

        // Generate unique ID based on clientId
        useEffect(() => {
            const generatedId =
                "emg-bs-sec-" + clientId.replace(/[^a-zA-Z0-9]/g, "");
            if (uniqueId !== generatedId) {
                setAttributes({ uniqueId: generatedId });
            }
        }, [clientId, uniqueId, setAttributes]);

        // Add a row (bs-row block)
        const addRow = () => {
            dispatch("core/block-editor").insertBlocks(
                createBlock("bootstrap-blocks/bs-row", {}),
                undefined,
                clientId
            );
        };

        // Count rows and force re-render when count changes
        const rowCount =
            select("core/block-editor").getBlockOrder(clientId)?.length || 0;

        // Generate responsive styles for editor preview
        const getResponsiveStyles = () => {
            // Use 1/3 of actual values for editor display
            const editorScale = 1 / 3;

            const styles = {
                paddingTop: `${Math.round(
                    getEffectiveValue(activePaddingTab, "paddingTop") *
                        editorScale
                )}px`,
                paddingRight: `${Math.round(
                    getEffectiveValue(activePaddingTab, "paddingRight") *
                        editorScale
                )}px`,
                paddingBottom: `${Math.round(
                    getEffectiveValue(activePaddingTab, "paddingBottom") *
                        editorScale
                )}px`,
                paddingLeft: `${Math.round(
                    getEffectiveValue(activePaddingTab, "paddingLeft") *
                        editorScale
                )}px`,
                ...getBackgroundStyles(),
            };

            // Only add margin styles if values are greater than 0
            const marginTop = getEffectiveValue(activeMarginTab, "marginTop");
            const marginRight = getEffectiveValue(
                activeMarginTab,
                "marginRight"
            );
            const marginBottom = getEffectiveValue(
                activeMarginTab,
                "marginBottom"
            );
            const marginLeft = getEffectiveValue(activeMarginTab, "marginLeft");

            if (marginTop > 0)
                styles.marginTop = `${Math.round(marginTop * editorScale)}px`;
            if (marginRight > 0)
                styles.marginRight = `${Math.round(
                    marginRight * editorScale
                )}px`;
            if (marginBottom > 0)
                styles.marginBottom = `${Math.round(
                    marginBottom * editorScale
                )}px`;
            if (marginLeft > 0)
                styles.marginLeft = `${Math.round(marginLeft * editorScale)}px`;

            // Overlay requires position relative
            if (overlayType === "color") {
                styles.position = "relative";
            }

            return styles;
        };

        const blockStyle = getResponsiveStyles();
        const uniqueClassName =
            uniqueId || "emg-bs-sec-" + clientId.replace(/[^a-zA-Z0-9]/g, "");

        // Generate CSS for editor preview
        const generateEditorCSS = () => {
            let css = `.${uniqueClassName} {\n`;

            // Base spacing (default breakpoint)
            const paddingTop = getEffectiveValue("default", "paddingTop");
            const paddingRight = getEffectiveValue("default", "paddingRight");
            const paddingBottom = getEffectiveValue("default", "paddingBottom");
            const paddingLeft = getEffectiveValue("default", "paddingLeft");
            const marginTop = getEffectiveValue("default", "marginTop");
            const marginRight = getEffectiveValue("default", "marginRight");
            const marginBottom = getEffectiveValue("default", "marginBottom");
            const marginLeft = getEffectiveValue("default", "marginLeft");

            if (paddingTop > 0)
                css += `    padding-top: ${Math.round(
                    paddingTop * (1 / 3)
                )}px;\n`;
            if (paddingRight > 0)
                css += `    padding-right: ${Math.round(
                    paddingRight * (1 / 3)
                )}px;\n`;
            if (paddingBottom > 0)
                css += `    padding-bottom: ${Math.round(
                    paddingBottom * (1 / 3)
                )}px;\n`;
            if (paddingLeft > 0)
                css += `    padding-left: ${Math.round(
                    paddingLeft * (1 / 3)
                )}px;\n`;
            if (marginTop > 0)
                css += `    margin-top: ${Math.round(
                    marginTop * (1 / 3)
                )}px;\n`;
            if (marginRight > 0)
                css += `    margin-right: ${Math.round(
                    marginRight * (1 / 3)
                )}px;\n`;
            if (marginBottom > 0)
                css += `    margin-bottom: ${Math.round(
                    marginBottom * (1 / 3)
                )}px;\n`;
            if (marginLeft > 0)
                css += `    margin-left: ${Math.round(
                    marginLeft * (1 / 3)
                )}px;\n`;

            // Background styles
            if (backgroundType === "color" && backgroundColor) {
                css += `    background-color: ${backgroundColor};\n`;
            } else if (backgroundType === "image" && backgroundImageUrl) {
                css += `    background-image: url('${backgroundImageUrl}');\n`;
                css += `    background-size: ${backgroundImageSize};\n`;
                css += `    background-position: ${backgroundImagePosition};\n`;
                css += `    background-repeat: ${backgroundImageRepeat};\n`;
            } else if (backgroundType === "gradient") {
                if (gradientType === "linear") {
                    css += `    background: linear-gradient(${gradientDirection}, ${gradientColor1} ${gradientStop1}%, ${gradientColor2} ${gradientStop2}%);\n`;
                } else {
                    css += `    background: radial-gradient(circle, ${gradientColor1} ${gradientStop1}%, ${gradientColor2} ${gradientStop2}%);\n`;
                }
            }

            // Overlay
            if (overlayType === "color") {
                css += `    position: relative;\n`;
            }

            // Default text shadow for better visibility in editor
            css += `    text-shadow: 0 0 1px rgba(0, 0, 0, 0.5);\n`;

            css += `}\n\n`;

            // Text shadow for all text elements within the block (editor only)
            css += `.${uniqueClassName} * {\n`;
            css += `    text-shadow: 0 0 1px rgba(0, 0, 0, 0.5);\n`;
            css += `}\n\n`;

            return css;
        };

        const editorCSS = generateEditorCSS();

        return (
            <>
                <style dangerouslySetInnerHTML={{ __html: editorCSS }} />
                <InspectorControls>
                    {/* Background Settings */}
                    <PanelBody title="Background" initialOpen={false}>
                        <div style={{ marginBottom: "16px" }}>
                            <label
                                style={{
                                    display: "block",
                                    marginBottom: "8px",
                                    fontWeight: "600",
                                }}
                            >
                                Background Type
                            </label>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "8px",
                                }}
                            >
                                <label
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        cursor: "pointer",
                                    }}
                                >
                                    <input
                                        type="radio"
                                        name="backgroundType"
                                        value="none"
                                        checked={backgroundType === "none"}
                                        onChange={(e) =>
                                            setAttributes({
                                                backgroundType: e.target.value,
                                            })
                                        }
                                        style={{ margin: 0 }}
                                    />
                                    <span>None</span>
                                </label>
                                <label
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        cursor: "pointer",
                                    }}
                                >
                                    <input
                                        type="radio"
                                        name="backgroundType"
                                        value="color"
                                        checked={backgroundType === "color"}
                                        onChange={(e) =>
                                            setAttributes({
                                                backgroundType: e.target.value,
                                            })
                                        }
                                        style={{ margin: 0 }}
                                    />
                                    <span>Color</span>
                                </label>
                                <label
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        cursor: "pointer",
                                    }}
                                >
                                    <input
                                        type="radio"
                                        name="backgroundType"
                                        value="image"
                                        checked={backgroundType === "image"}
                                        onChange={(e) =>
                                            setAttributes({
                                                backgroundType: e.target.value,
                                            })
                                        }
                                        style={{ margin: 0 }}
                                    />
                                    <span>Image</span>
                                </label>
                                <label
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        cursor: "pointer",
                                    }}
                                >
                                    <input
                                        type="radio"
                                        name="backgroundType"
                                        value="gradient"
                                        checked={backgroundType === "gradient"}
                                        onChange={(e) =>
                                            setAttributes({
                                                backgroundType: e.target.value,
                                            })
                                        }
                                        style={{ margin: 0 }}
                                    />
                                    <span>Gradient</span>
                                </label>
                            </div>
                        </div>

                        {backgroundType === "color" && (
                            <div>
                                <label>Background Color</label>
                                <ColorPicker
                                    color={backgroundColor}
                                    onChangeComplete={(value) =>
                                        setAttributes({
                                            backgroundColor: value.hex,
                                        })
                                    }
                                    disableAlpha
                                />
                            </div>
                        )}

                        {backgroundType === "image" && (
                            <div>
                                <MediaUploadCheck>
                                    <MediaUpload
                                        onSelect={(media) => {
                                            setAttributes({
                                                backgroundImageUrl: media.url,
                                                backgroundImageId: media.id,
                                            });
                                        }}
                                        allowedTypes={["image"]}
                                        value={backgroundImageId}
                                        render={({ open }) => (
                                            <Button onClick={open} isPrimary>
                                                {backgroundImageUrl
                                                    ? "Replace Image"
                                                    : "Select Image"}
                                            </Button>
                                        )}
                                    />
                                </MediaUploadCheck>

                                {backgroundImageUrl && (
                                    <div style={{ marginTop: "10px" }}>
                                        <SelectControl
                                            label="Image Size"
                                            value={backgroundImageSize}
                                            options={[
                                                {
                                                    label: "Cover",
                                                    value: "cover",
                                                },
                                                {
                                                    label: "Contain",
                                                    value: "contain",
                                                },
                                                {
                                                    label: "Auto",
                                                    value: "auto",
                                                },
                                            ]}
                                            onChange={(value) =>
                                                setAttributes({
                                                    backgroundImageSize: value,
                                                })
                                            }
                                        />
                                        <SelectControl
                                            label="Image Position"
                                            value={backgroundImagePosition}
                                            options={[
                                                {
                                                    label: "Center Center",
                                                    value: "center center",
                                                },
                                                {
                                                    label: "Top Left",
                                                    value: "top left",
                                                },
                                                {
                                                    label: "Top Right",
                                                    value: "top right",
                                                },
                                                {
                                                    label: "Bottom Left",
                                                    value: "bottom left",
                                                },
                                                {
                                                    label: "Bottom Right",
                                                    value: "bottom right",
                                                },
                                            ]}
                                            onChange={(value) =>
                                                setAttributes({
                                                    backgroundImagePosition:
                                                        value,
                                                })
                                            }
                                        />
                                        <SelectControl
                                            label="Image Repeat"
                                            value={backgroundImageRepeat}
                                            options={[
                                                {
                                                    label: "No Repeat",
                                                    value: "no-repeat",
                                                },
                                                {
                                                    label: "Repeat",
                                                    value: "repeat",
                                                },
                                                {
                                                    label: "Repeat X",
                                                    value: "repeat-x",
                                                },
                                                {
                                                    label: "Repeat Y",
                                                    value: "repeat-y",
                                                },
                                            ]}
                                            onChange={(value) =>
                                                setAttributes({
                                                    backgroundImageRepeat:
                                                        value,
                                                })
                                            }
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        {backgroundType === "gradient" && (
                            <div>
                                <SelectControl
                                    label="Gradient Type"
                                    value={gradientType}
                                    options={[
                                        { label: "Linear", value: "linear" },
                                        { label: "Radial", value: "radial" },
                                    ]}
                                    onChange={(value) =>
                                        setAttributes({ gradientType: value })
                                    }
                                />
                                <SelectControl
                                    label="Gradient Direction"
                                    value={gradientDirection}
                                    options={[
                                        {
                                            label: "To Right",
                                            value: "to right",
                                        },
                                        { label: "To Left", value: "to left" },
                                        {
                                            label: "To Bottom",
                                            value: "to bottom",
                                        },
                                        { label: "To Top", value: "to top" },
                                        {
                                            label: "To Bottom Right",
                                            value: "to bottom right",
                                        },
                                        {
                                            label: "To Bottom Left",
                                            value: "to bottom left",
                                        },
                                    ]}
                                    onChange={(value) =>
                                        setAttributes({
                                            gradientDirection: value,
                                        })
                                    }
                                />
                                <div
                                    style={{
                                        display: "flex",
                                        gap: "10px",
                                        marginTop: "10px",
                                    }}
                                >
                                    <div>
                                        <label>Color 1</label>
                                        <ColorPicker
                                            color={gradientColor1}
                                            onChangeComplete={(value) =>
                                                setAttributes({
                                                    gradientColor1: value.hex,
                                                })
                                            }
                                            disableAlpha
                                        />
                                        <RangeControl
                                            label="Stop 1 (%)"
                                            value={gradientStop1}
                                            onChange={(value) =>
                                                setAttributes({
                                                    gradientStop1: value,
                                                })
                                            }
                                            min={0}
                                            max={100}
                                        />
                                    </div>
                                    <div>
                                        <label>Color 2</label>
                                        <ColorPicker
                                            color={gradientColor2}
                                            onChangeComplete={(value) =>
                                                setAttributes({
                                                    gradientColor2: value.hex,
                                                })
                                            }
                                            disableAlpha
                                        />
                                        <RangeControl
                                            label="Stop 2 (%)"
                                            value={gradientStop2}
                                            onChange={(value) =>
                                                setAttributes({
                                                    gradientStop2: value,
                                                })
                                            }
                                            min={0}
                                            max={100}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </PanelBody>

                    {/* Overlay Settings */}
                    <PanelBody title="Overlay" initialOpen={false}>
                        <SelectControl
                            label="Overlay Type"
                            value={overlayType}
                            options={[
                                { label: "None", value: "none" },
                                { label: "Color Overlay", value: "color" },
                            ]}
                            onChange={(value) =>
                                setAttributes({ overlayType: value })
                            }
                        />

                        {overlayType === "color" && (
                            <div>
                                <label>Overlay Color</label>
                                <ColorPicker
                                    color={overlayColor}
                                    onChangeComplete={(value) =>
                                        setAttributes({
                                            overlayColor: value.hex,
                                        })
                                    }
                                    disableAlpha
                                />
                                <RangeControl
                                    label="Overlay Opacity (%)"
                                    value={overlayOpacity}
                                    onChange={(value) =>
                                        setAttributes({ overlayOpacity: value })
                                    }
                                    min={0}
                                    max={100}
                                />
                            </div>
                        )}
                    </PanelBody>

                    {/* Responsive Padding Settings */}
                    <PanelBody title="Padding" initialOpen={true}>
                        <TabPanel
                            className="bootstrap-spacing-tabs"
                            activeClass="active-tab"
                            onSelect={setActivePaddingTab}
                            tabs={[
                                { name: "default", title: "Default" },
                                { name: "sm", title: "SM" },
                                { name: "md", title: "MD" },
                                { name: "lg", title: "LG" },
                                { name: "xl", title: "XL" },
                                { name: "xxl", title: "XXL" },
                            ]}
                        >
                            {(tab) => (
                                <div>
                                    <RangeControl
                                        label="Top"
                                        value={getEffectiveValue(
                                            tab.name,
                                            "paddingTop"
                                        )}
                                        onChange={(value) => {
                                            const breakpointOrder = [
                                                "default",
                                                "sm",
                                                "md",
                                                "lg",
                                                "xl",
                                                "xxl",
                                            ];
                                            const currentIndex =
                                                breakpointOrder.indexOf(
                                                    tab.name
                                                );
                                            const updates = {};

                                            const currentBreakpoint =
                                                tab.name === "default"
                                                    ? defaultSpacing
                                                    : attributes[tab.name];
                                            updates[tab.name] = {
                                                ...currentBreakpoint,
                                                paddingTop: value,
                                            };

                                            for (
                                                let i = currentIndex + 1;
                                                i < breakpointOrder.length;
                                                i++
                                            ) {
                                                const bp = breakpointOrder[i];
                                                const bpData = attributes[bp];
                                                updates[bp] = {
                                                    ...bpData,
                                                    paddingTop: value,
                                                };
                                            }

                                            setAttributes(updates);
                                        }}
                                        min={0}
                                        max={500}
                                    />
                                    <RangeControl
                                        label="Right"
                                        value={getEffectiveValue(
                                            tab.name,
                                            "paddingRight"
                                        )}
                                        onChange={(value) => {
                                            const breakpointOrder = [
                                                "default",
                                                "sm",
                                                "md",
                                                "lg",
                                                "xl",
                                                "xxl",
                                            ];
                                            const currentIndex =
                                                breakpointOrder.indexOf(
                                                    tab.name
                                                );
                                            const updates = {};

                                            const currentBreakpoint =
                                                tab.name === "default"
                                                    ? defaultSpacing
                                                    : attributes[tab.name];
                                            updates[tab.name] = {
                                                ...currentBreakpoint,
                                                paddingRight: value,
                                            };

                                            for (
                                                let i = currentIndex + 1;
                                                i < breakpointOrder.length;
                                                i++
                                            ) {
                                                const bp = breakpointOrder[i];
                                                const bpData = attributes[bp];
                                                updates[bp] = {
                                                    ...bpData,
                                                    paddingRight: value,
                                                };
                                            }

                                            setAttributes(updates);
                                        }}
                                        min={0}
                                        max={500}
                                    />
                                    <RangeControl
                                        label="Bottom"
                                        value={getEffectiveValue(
                                            tab.name,
                                            "paddingBottom"
                                        )}
                                        onChange={(value) => {
                                            const breakpointOrder = [
                                                "default",
                                                "sm",
                                                "md",
                                                "lg",
                                                "xl",
                                                "xxl",
                                            ];
                                            const currentIndex =
                                                breakpointOrder.indexOf(
                                                    tab.name
                                                );
                                            const updates = {};

                                            const currentBreakpoint =
                                                tab.name === "default"
                                                    ? defaultSpacing
                                                    : attributes[tab.name];
                                            updates[tab.name] = {
                                                ...currentBreakpoint,
                                                paddingBottom: value,
                                            };

                                            for (
                                                let i = currentIndex + 1;
                                                i < breakpointOrder.length;
                                                i++
                                            ) {
                                                const bp = breakpointOrder[i];
                                                const bpData = attributes[bp];
                                                updates[bp] = {
                                                    ...bpData,
                                                    paddingBottom: value,
                                                };
                                            }

                                            setAttributes(updates);
                                        }}
                                        min={0}
                                        max={500}
                                    />
                                    <RangeControl
                                        label="Left"
                                        value={getEffectiveValue(
                                            tab.name,
                                            "paddingLeft"
                                        )}
                                        onChange={(value) => {
                                            const breakpointOrder = [
                                                "default",
                                                "sm",
                                                "md",
                                                "lg",
                                                "xl",
                                                "xxl",
                                            ];
                                            const currentIndex =
                                                breakpointOrder.indexOf(
                                                    tab.name
                                                );
                                            const updates = {};

                                            const currentBreakpoint =
                                                tab.name === "default"
                                                    ? defaultSpacing
                                                    : attributes[tab.name];
                                            updates[tab.name] = {
                                                ...currentBreakpoint,
                                                paddingLeft: value,
                                            };

                                            for (
                                                let i = currentIndex + 1;
                                                i < breakpointOrder.length;
                                                i++
                                            ) {
                                                const bp = breakpointOrder[i];
                                                const bpData = attributes[bp];
                                                updates[bp] = {
                                                    ...bpData,
                                                    paddingLeft: value,
                                                };
                                            }

                                            setAttributes(updates);
                                        }}
                                        min={0}
                                        max={500}
                                    />
                                </div>
                            )}
                        </TabPanel>
                    </PanelBody>

                    {/* Responsive Margin Settings */}
                    <PanelBody title="Margin" initialOpen={false}>
                        <TabPanel
                            className="bootstrap-spacing-tabs"
                            activeClass="active-tab"
                            onSelect={setActiveMarginTab}
                            tabs={[
                                { name: "default", title: "Default" },
                                { name: "sm", title: "SM" },
                                { name: "md", title: "MD" },
                                { name: "lg", title: "LG" },
                                { name: "xl", title: "XL" },
                                { name: "xxl", title: "XXL" },
                            ]}
                        >
                            {(tab) => (
                                <div>
                                    <RangeControl
                                        label="Top"
                                        value={getEffectiveValue(
                                            tab.name,
                                            "marginTop"
                                        )}
                                        onChange={(value) =>
                                            updateSpacingValue(
                                                tab.name,
                                                "marginTop",
                                                value
                                            )
                                        }
                                        min={0}
                                        max={200}
                                    />
                                    <RangeControl
                                        label="Right"
                                        value={getEffectiveValue(
                                            tab.name,
                                            "marginRight"
                                        )}
                                        onChange={(value) =>
                                            updateSpacingValue(
                                                tab.name,
                                                "marginRight",
                                                value
                                            )
                                        }
                                        min={0}
                                        max={200}
                                    />
                                    <RangeControl
                                        label="Bottom"
                                        value={getEffectiveValue(
                                            tab.name,
                                            "marginBottom"
                                        )}
                                        onChange={(value) =>
                                            updateSpacingValue(
                                                tab.name,
                                                "marginBottom",
                                                value
                                            )
                                        }
                                        min={0}
                                        max={200}
                                    />
                                    <RangeControl
                                        label="Left"
                                        value={getEffectiveValue(
                                            tab.name,
                                            "marginLeft"
                                        )}
                                        onChange={(value) =>
                                            updateSpacingValue(
                                                tab.name,
                                                "marginLeft",
                                                value
                                            )
                                        }
                                        min={0}
                                        max={200}
                                    />
                                </div>
                            )}
                        </TabPanel>
                    </PanelBody>
                </InspectorControls>

                <div
                    {...useBlockProps({
                        className: uniqueClassName,
                        style: blockStyle,
                    })}
                >
                    {/* Editor header */}
                    <div
                        style={{
                            marginBottom: "12px",
                            padding: "8px 12px",
                            backgroundColor: "rgba(0, 124, 186, 0.1)",
                            borderRadius: "4px",
                            maxWidth: "95%",
                            marginRight: "auto",
                            marginLeft: "auto",
                        }}
                    >
                        <div
                            style={{
                                color: "#007cba",
                                fontWeight: "bold",
                                marginBottom: "4px",
                                fontSize: "16px",
                            }}
                        >
                            BS Section
                        </div>
                        <div
                            style={{
                                display: "flex",
                                gap: "15px",
                                alignItems: "center",
                            }}
                        >
                            <Button onClick={addRow} isPrimary>
                                + Add Row
                            </Button>
                            <span style={{ color: "#007cba" }}>
                                Rows: {rowCount}
                            </span>
                        </div>
                    </div>

                    {/* InnerBlocks for BS Row blocks */}
                    <InnerBlocks
                        allowedBlocks={["bootstrap-blocks/bs-row"]}
                        template={[["bootstrap-blocks/bs-row", {}]]}
                        templateLock={false}
                    />
                </div>
            </>
        );
    },

    save({ attributes }) {
        const {
            uniqueId,
            className,
            backgroundType,
            backgroundColor,
            backgroundImageUrl,
            backgroundImageSize,
            backgroundImagePosition,
            backgroundImageRepeat,
            gradientType,
            gradientDirection,
            gradientColor1,
            gradientColor2,
            gradientStop1,
            gradientStop2,
            overlayType,
            overlayColor,
            overlayOpacity,
            default: defaultSpacing,
            sm,
            md,
            lg,
            xl,
            xxl,
        } = attributes;

        // Helper function to get effective spacing value with cascading inheritance
        const getEffectiveValue = (breakpoint, property) => {
            const breakpoints = {
                default: defaultSpacing,
                sm,
                md,
                lg,
                xl,
                xxl,
            };
            const breakpointOrder = ["default", "sm", "md", "lg", "xl", "xxl"];
            const currentIndex = breakpointOrder.indexOf(breakpoint);

            for (let i = currentIndex; i >= 0; i--) {
                const bp = breakpointOrder[i];
                const bpData = breakpoints[bp];
                if (bpData && bpData[property] !== undefined) {
                    return bpData[property];
                }
            }

            return 0;
        };

        // Helper function to generate CSS styles
        const generateCSS = () => {
            const uniqueClassName = uniqueId || "emg-bs-sec-default";
            let css = `.${uniqueClassName} {\n`;

            // Base spacing (default breakpoint)
            const paddingTop = getEffectiveValue("default", "paddingTop");
            const paddingRight = getEffectiveValue("default", "paddingRight");
            const paddingBottom = getEffectiveValue("default", "paddingBottom");
            const paddingLeft = getEffectiveValue("default", "paddingLeft");
            const marginTop = getEffectiveValue("default", "marginTop");
            const marginRight = getEffectiveValue("default", "marginRight");
            const marginBottom = getEffectiveValue("default", "marginBottom");
            const marginLeft = getEffectiveValue("default", "marginLeft");

            if (paddingTop > 0) css += `    padding-top: ${paddingTop}px;\n`;
            if (paddingRight > 0)
                css += `    padding-right: ${paddingRight}px;\n`;
            if (paddingBottom > 0)
                css += `    padding-bottom: ${paddingBottom}px;\n`;
            if (paddingLeft > 0) css += `    padding-left: ${paddingLeft}px;\n`;
            if (marginTop > 0) css += `    margin-top: ${marginTop}px;\n`;
            if (marginRight > 0) css += `    margin-right: ${marginRight}px;\n`;
            if (marginBottom > 0)
                css += `    margin-bottom: ${marginBottom}px;\n`;
            if (marginLeft > 0) css += `    margin-left: ${marginLeft}px;\n`;

            // Background styles
            if (backgroundType === "color" && backgroundColor) {
                css += `    background-color: ${backgroundColor};\n`;
            } else if (backgroundType === "image" && backgroundImageUrl) {
                css += `    background-image: url('${backgroundImageUrl}');\n`;
                css += `    background-size: ${backgroundImageSize};\n`;
                css += `    background-position: ${backgroundImagePosition};\n`;
                css += `    background-repeat: ${backgroundImageRepeat};\n`;
            } else if (backgroundType === "gradient") {
                if (gradientType === "linear") {
                    css += `    background: linear-gradient(${gradientDirection}, ${gradientColor1} ${gradientStop1}%, ${gradientColor2} ${gradientStop2}%);\n`;
                } else {
                    css += `    background: radial-gradient(circle, ${gradientColor1} ${gradientStop1}%, ${gradientColor2} ${gradientStop2}%);\n`;
                }
            }

            // Overlay
            if (overlayType === "color") {
                css += `    position: relative;\n`;
            }

            css += `}\n\n`;

            // Overlay pseudo-element
            if (overlayType === "color") {
                css += `.${uniqueClassName}::before {\n`;
                css += `    content: '';\n`;
                css += `    position: absolute;\n`;
                css += `    top: 0;\n`;
                css += `    left: 0;\n`;
                css += `    right: 0;\n`;
                css += `    bottom: 0;\n`;
                css += `    background-color: ${overlayColor};\n`;
                css += `    opacity: ${overlayOpacity / 100};\n`;
                css += `    z-index: 1;\n`;
                css += `    pointer-events: none;\n`;
                css += `}\n\n`;

                css += `.${uniqueClassName} > * {\n`;
                css += `    position: relative;\n`;
                css += `    z-index: 2;\n`;
                css += `}\n\n`;
            }

            // Responsive breakpoints with smart CSS generation
            const breakpoints = [
                { name: "default", minWidth: null },
                { name: "sm", minWidth: "576px" },
                { name: "md", minWidth: "768px" },
                { name: "lg", minWidth: "992px" },
                { name: "xl", minWidth: "1200px" },
                { name: "xxl", minWidth: "1400px" },
            ];

            let prevPaddingTop = getEffectiveValue("default", "paddingTop");
            let prevPaddingRight = getEffectiveValue("default", "paddingRight");
            let prevPaddingBottom = getEffectiveValue(
                "default",
                "paddingBottom"
            );
            let prevPaddingLeft = getEffectiveValue("default", "paddingLeft");
            let prevMarginTop = getEffectiveValue("default", "marginTop");
            let prevMarginRight = getEffectiveValue("default", "marginRight");
            let prevMarginBottom = getEffectiveValue("default", "marginBottom");
            let prevMarginLeft = getEffectiveValue("default", "marginLeft");

            breakpoints.slice(1).forEach(({ name, minWidth }) => {
                const paddingTop = getEffectiveValue(name, "paddingTop");
                const paddingRight = getEffectiveValue(name, "paddingRight");
                const paddingBottom = getEffectiveValue(name, "paddingBottom");
                const paddingLeft = getEffectiveValue(name, "paddingLeft");
                const marginTop = getEffectiveValue(name, "marginTop");
                const marginRight = getEffectiveValue(name, "marginRight");
                const marginBottom = getEffectiveValue(name, "marginBottom");
                const marginLeft = getEffectiveValue(name, "marginLeft");

                const hasDifferentValues =
                    paddingTop !== prevPaddingTop ||
                    paddingRight !== prevPaddingRight ||
                    paddingBottom !== prevPaddingBottom ||
                    paddingLeft !== prevPaddingLeft ||
                    marginTop !== prevMarginTop ||
                    marginRight !== prevMarginRight ||
                    marginBottom !== prevMarginBottom ||
                    marginLeft !== prevMarginLeft;

                if (hasDifferentValues) {
                    css += `@media screen and (min-width: ${minWidth}) {\n`;
                    css += `    .${uniqueClassName} {\n`;

                    if (paddingTop !== prevPaddingTop)
                        css += `        padding-top: ${paddingTop}px;\n`;
                    if (paddingRight !== prevPaddingRight)
                        css += `        padding-right: ${paddingRight}px;\n`;
                    if (paddingBottom !== prevPaddingBottom)
                        css += `        padding-bottom: ${paddingBottom}px;\n`;
                    if (paddingLeft !== prevPaddingLeft)
                        css += `        padding-left: ${paddingLeft}px;\n`;
                    if (marginTop !== prevMarginTop)
                        css += `        margin-top: ${marginTop}px;\n`;
                    if (marginRight !== prevMarginRight)
                        css += `        margin-right: ${marginRight}px;\n`;
                    if (marginBottom !== prevMarginBottom)
                        css += `        margin-bottom: ${marginBottom}px;\n`;
                    if (marginLeft !== prevMarginLeft)
                        css += `        margin-left: ${marginLeft}px;\n`;

                    css += `    }\n`;
                    css += `}\n\n`;
                }

                prevPaddingTop = paddingTop;
                prevPaddingRight = paddingRight;
                prevPaddingBottom = paddingBottom;
                prevPaddingLeft = paddingLeft;
                prevMarginTop = marginTop;
                prevMarginRight = marginRight;
                prevMarginBottom = marginBottom;
                prevMarginLeft = marginLeft;
            });

            return css;
        };

        const uniqueClassName = uniqueId || "emg-bs-sec-default";
        const css = generateCSS();

        return (
            <>
                <div className={`${uniqueClassName} ${className || ""}`.trim()}>
                    {overlayType === "color" && (
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: overlayColor,
                                opacity: overlayOpacity / 100,
                                zIndex: 1,
                                pointerEvents: "none",
                            }}
                        />
                    )}
                    <InnerBlocks.Content />
                </div>
                <style dangerouslySetInnerHTML={{ __html: css }} />
            </>
        );
    },
});
