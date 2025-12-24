import { registerBlockType } from "@wordpress/blocks";
import {
    useBlockProps,
    InspectorControls,
    RichText,
    MediaUpload,
    MediaUploadCheck,
} from "@wordpress/block-editor";
import { generateFeatureCardsHTML } from "./template";
import {
    PanelBody,
    TextControl,
    TextareaControl,
    RangeControl,
    Button,
    ColorPicker,
    Popover,
    SelectControl,
    ToggleControl,
    __experimentalRepeaterControl as RepeaterControl,
} from "@wordpress/components";
import { useState } from "@wordpress/element";
import "./style.css";

registerBlockType("bootstrap-blocks/bs-feature-cards", {
    edit: ({ attributes, setAttributes, clientId }) => {
        const {
            items,
            columns,
            cardSpacing,
            hideCardGap,
            cardPadding,
            cardBorderRadius,
            cardBorderWidth,
            cardBorderStyle,
            cardBorderColor,
            iconSize,
            iconBorderRadius,
            iconPosition,
            iconBackgroundColor,
            cardBackgroundColor,
            textColor,
            cardHoverBackgroundColor,
            cardHoverTextColor,
            iconHoverBackgroundColor,
            blockId,
        } = attributes;

        const [iconColorPopoverOpen, setIconColorPopoverOpen] = useState(false);
        const [cardBgColorPopoverOpen, setCardBgColorPopoverOpen] =
            useState(false);
        const [textColorPopoverOpen, setTextColorPopoverOpen] = useState(false);
        const [cardHoverBgColorPopoverOpen, setCardHoverBgColorPopoverOpen] =
            useState(false);
        const [
            cardHoverTextColorPopoverOpen,
            setCardHoverTextColorPopoverOpen,
        ] = useState(false);
        const [iconHoverBgColorPopoverOpen, setIconHoverBgColorPopoverOpen] =
            useState(false);
        const [cardBorderColorPopoverOpen, setCardBorderColorPopoverOpen] =
            useState(false);
        // Per-card icon hover color popovers
        const [cardIconHoverColorPopovers, setCardIconHoverColorPopovers] =
            useState({});
        // HTML mode for title and description
        const [titleHtmlMode, setTitleHtmlMode] = useState({});
        const [descriptionHtmlMode, setDescriptionHtmlMode] = useState({});

        // Generate unique block ID if not exists
        if (!blockId) {
            setAttributes({ blockId: `bs-feature-cards-${clientId}` });
        }

        // Helper function to convert hex to CSS filter for SVG color change
        // Uses a more accurate algorithm for color conversion
        const hexToFilter = (hex) => {
            if (!hex) return "";
            // Remove # if present
            hex = hex.replace("#", "");
            // Convert hex to RGB (0-255)
            const r = parseInt(hex.substr(0, 2), 16);
            const g = parseInt(hex.substr(2, 2), 16);
            const b = parseInt(hex.substr(4, 2), 16);

            // Normalize RGB to 0-1
            const rNorm = r / 255;
            const gNorm = g / 255;
            const bNorm = b / 255;

            // Calculate HSL for more accurate color conversion
            const max = Math.max(rNorm, gNorm, bNorm);
            const min = Math.min(rNorm, gNorm, bNorm);
            const delta = max - min;

            let h = 0;
            if (delta !== 0) {
                if (max === rNorm) {
                    h = ((gNorm - bNorm) / delta) % 6;
                } else if (max === gNorm) {
                    h = (bNorm - rNorm) / delta + 2;
                } else {
                    h = (rNorm - gNorm) / delta + 4;
                }
            }
            h = h * 60;
            if (h < 0) h += 360;

            const s = max === 0 ? 0 : delta / max;
            const l = (max + min) / 2;

            // Improved filter calculation for better color accuracy
            // The formula: brightness(0) saturate(100%) invert(1) sepia(100%) saturate(X%) hue-rotate(Ydeg) brightness(Z%)

            // Calculate values
            const sepia = 100;
            // Saturation: significantly reduced to prevent color flickering
            // Much lower saturation values to prevent multiple colors showing
            const saturateValue =
                s > 0.1
                    ? Math.min(Math.round(s * 5000), 5000)
                    : Math.round(s * 2000);
            const hueRotate = Math.round(h);

            // Brightness: more accurate calculation based on lightness
            // Light colors need less brightness, dark colors need more
            let brightnessValue;
            if (l < 0.2) {
                // Very dark colors
                brightnessValue = Math.round(l * 250 + 40);
            } else if (l < 0.5) {
                // Medium dark colors
                brightnessValue = Math.round(l * 180 + 60);
            } else if (l < 0.8) {
                // Medium light colors
                brightnessValue = Math.round(l * 100 + 90);
            } else {
                // Very light colors
                brightnessValue = Math.round(l * 70 + 110);
            }

            return `brightness(0) saturate(100%) invert(1) sepia(${sepia}%) saturate(${saturateValue}%) hue-rotate(${hueRotate}deg) brightness(${brightnessValue}%)`;
        };

        const blockProps = useBlockProps({
            className: "bs-feature-cards-container",
        });

        // Add new item
        const addItem = () => {
            const newItem = {
                id: `item-${Date.now()}`,
                title: "New Feature",
                description: "Add your description here...",
                iconUrl: "",
                iconHoverColor: "",
            };
            setAttributes({
                items: [...items, newItem],
            });
        };

        // Remove item
        const removeItem = (index) => {
            const newItems = items.filter((_, i) => i !== index);
            setAttributes({ items: newItems });
        };

        // Update item
        const updateItem = (index, field, value) => {
            const newItems = [...items];
            newItems[index] = { ...newItems[index], [field]: value };
            setAttributes({ items: newItems });
        };

        // Update item image
        const updateItemImage = (index, imageUrl) => {
            updateItem(index, "iconUrl", imageUrl || "");
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody title="Layout Settings" initialOpen={true}>
                        <SelectControl
                            label="Columns"
                            value={columns}
                            options={[
                                { label: "1 Column", value: 1 },
                                { label: "2 Columns", value: 2 },
                                { label: "3 Columns", value: 3 },
                                { label: "4 Columns", value: 4 },
                            ]}
                            onChange={(value) =>
                                setAttributes({ columns: parseInt(value) })
                            }
                        />
                        <RangeControl
                            label="Card Spacing"
                            value={cardSpacing}
                            onChange={(value) =>
                                setAttributes({ cardSpacing: value })
                            }
                            min={0}
                            max={100}
                            step={1}
                            disabled={hideCardGap}
                        />
                        <ToggleControl
                            label="Hide Card Gap"
                            checked={hideCardGap}
                            onChange={(value) =>
                                setAttributes({ hideCardGap: value })
                            }
                            help={
                                hideCardGap
                                    ? "Card gap is hidden"
                                    : "Card gap is visible"
                            }
                        />
                        <TextControl
                            label="Card Padding (Optional)"
                            value={cardPadding || ""}
                            onChange={(value) =>
                                setAttributes({ cardPadding: value })
                            }
                            placeholder="e.g., 20px 30px"
                        />
                        <RangeControl
                            label="Card Border Radius (Optional)"
                            value={
                                cardBorderRadius
                                    ? parseInt(cardBorderRadius) || 0
                                    : undefined
                            }
                            onChange={(value) =>
                                setAttributes({
                                    cardBorderRadius: value ? `${value}px` : "",
                                })
                            }
                            min={0}
                            max={50}
                            step={1}
                            allowReset={true}
                        />
                        <RangeControl
                            label="Card Border Width (Optional)"
                            value={cardBorderWidth || 0}
                            onChange={(value) =>
                                setAttributes({
                                    cardBorderWidth: value || 0,
                                })
                            }
                            min={0}
                            max={20}
                            step={1}
                            allowReset={true}
                        />
                        {cardBorderWidth > 0 && (
                            <>
                                <SelectControl
                                    label="Card Border Style"
                                    value={cardBorderStyle}
                                    options={[
                                        { label: "Solid", value: "solid" },
                                        { label: "Dashed", value: "dashed" },
                                        { label: "Dotted", value: "dotted" },
                                        { label: "Double", value: "double" },
                                        { label: "Groove", value: "groove" },
                                        { label: "Ridge", value: "ridge" },
                                        { label: "Inset", value: "inset" },
                                        { label: "Outset", value: "outset" },
                                    ]}
                                    onChange={(value) =>
                                        setAttributes({
                                            cardBorderStyle: value,
                                        })
                                    }
                                />
                                <div style={{ marginBottom: "10px" }}>
                                    <label
                                        style={{
                                            display: "block",
                                            marginBottom: "5px",
                                            fontSize: "12px",
                                            fontWeight: "600",
                                        }}
                                    >
                                        Card Border Color
                                    </label>
                                    <div style={{ position: "relative" }}>
                                        <Button
                                            onClick={() =>
                                                setCardBorderColorPopoverOpen(
                                                    !cardBorderColorPopoverOpen
                                                )
                                            }
                                            variant="secondary"
                                            style={{
                                                width: "100%",
                                                height: "32px",
                                                backgroundColor:
                                                    cardBorderColor ||
                                                    "transparent",
                                                border: "1px solid #ddd",
                                            }}
                                        >
                                            {cardBorderColor || "Select"}
                                        </Button>
                                        {cardBorderColorPopoverOpen && (
                                            <Popover
                                                onClose={() =>
                                                    setCardBorderColorPopoverOpen(
                                                        false
                                                    )
                                                }
                                            >
                                                <ColorPicker
                                                    color={
                                                        cardBorderColor ||
                                                        undefined
                                                    }
                                                    onChangeComplete={(
                                                        value
                                                    ) => {
                                                        let colorValue = "";
                                                        if (
                                                            value.rgb &&
                                                            value.rgb.a !==
                                                                undefined &&
                                                            value.rgb.a < 1
                                                        ) {
                                                            colorValue = `rgba(${value.rgb.r}, ${value.rgb.g}, ${value.rgb.b}, ${value.rgb.a})`;
                                                        } else {
                                                            colorValue =
                                                                value.hex || "";
                                                        }
                                                        setAttributes({
                                                            cardBorderColor:
                                                                colorValue,
                                                        });
                                                    }}
                                                />
                                            </Popover>
                                        )}
                                    </div>
                                    {cardBorderColor && (
                                        <Button
                                            onClick={() =>
                                                setAttributes({
                                                    cardBorderColor: "#000000",
                                                })
                                            }
                                            variant="link"
                                            style={{
                                                marginTop: "4px",
                                                fontSize: "11px",
                                            }}
                                        >
                                            Reset
                                        </Button>
                                    )}
                                </div>
                            </>
                        )}
                        <SelectControl
                            label="Icon Position"
                            value={iconPosition}
                            options={[
                                { label: "Top", value: "top" },
                                { label: "Left", value: "left" },
                            ]}
                            onChange={(value) =>
                                setAttributes({ iconPosition: value })
                            }
                        />
                        <RangeControl
                            label="Icon Size (Optional)"
                            value={
                                iconSize ? parseInt(iconSize) || 0 : undefined
                            }
                            onChange={(value) =>
                                setAttributes({
                                    iconSize: value ? `${value}px` : "",
                                })
                            }
                            min={20}
                            max={100}
                            step={1}
                            allowReset={true}
                        />
                        <RangeControl
                            label="Icon Border Radius (Optional)"
                            value={
                                iconBorderRadius
                                    ? parseInt(iconBorderRadius) || 0
                                    : undefined
                            }
                            onChange={(value) =>
                                setAttributes({
                                    iconBorderRadius: value ? `${value}px` : "",
                                })
                            }
                            min={0}
                            max={50}
                            step={1}
                            allowReset={true}
                        />
                    </PanelBody>
                    <PanelBody title="Feature Cards" initialOpen={true}>
                        <div style={{ marginBottom: "16px" }}>
                            <h4
                                style={{
                                    marginTop: 0,
                                    marginBottom: "10px",
                                    fontSize: "12px",
                                    fontWeight: "600",
                                }}
                            >
                                Global Colors
                            </h4>
                            <div style={{ marginBottom: "10px" }}>
                                <label
                                    style={{
                                        display: "block",
                                        marginBottom: "5px",
                                        fontSize: "12px",
                                        fontWeight: "600",
                                    }}
                                >
                                    Icon Background Color
                                </label>
                                <div style={{ position: "relative" }}>
                                    <Button
                                        onClick={() =>
                                            setIconColorPopoverOpen(
                                                !iconColorPopoverOpen
                                            )
                                        }
                                        variant="secondary"
                                        style={{
                                            width: "100%",
                                            height: "32px",
                                            backgroundColor:
                                                iconBackgroundColor ||
                                                "transparent",
                                            border: "1px solid #ddd",
                                        }}
                                    >
                                        {iconBackgroundColor || "Select"}
                                    </Button>
                                    {iconColorPopoverOpen && (
                                        <Popover
                                            onClose={() =>
                                                setIconColorPopoverOpen(false)
                                            }
                                        >
                                            <ColorPicker
                                                color={
                                                    iconBackgroundColor ||
                                                    undefined
                                                }
                                                onChangeComplete={(value) => {
                                                    let colorValue = "";
                                                    if (
                                                        value.rgb &&
                                                        value.rgb.a !==
                                                            undefined &&
                                                        value.rgb.a < 1
                                                    ) {
                                                        colorValue = `rgba(${value.rgb.r}, ${value.rgb.g}, ${value.rgb.b}, ${value.rgb.a})`;
                                                    } else {
                                                        colorValue =
                                                            value.hex || "";
                                                    }
                                                    setAttributes({
                                                        iconBackgroundColor:
                                                            colorValue,
                                                    });
                                                }}
                                            />
                                        </Popover>
                                    )}
                                </div>
                                {iconBackgroundColor && (
                                    <Button
                                        onClick={() =>
                                            setAttributes({
                                                iconBackgroundColor: "#4CAF50",
                                            })
                                        }
                                        variant="link"
                                        style={{
                                            marginTop: "4px",
                                            fontSize: "11px",
                                        }}
                                    >
                                        Reset
                                    </Button>
                                )}
                            </div>
                            <div style={{ marginBottom: "10px" }}>
                                <label
                                    style={{
                                        display: "block",
                                        marginBottom: "5px",
                                        fontSize: "12px",
                                        fontWeight: "600",
                                    }}
                                >
                                    Card Background Color
                                </label>
                                <div style={{ position: "relative" }}>
                                    <Button
                                        onClick={() =>
                                            setCardBgColorPopoverOpen(
                                                !cardBgColorPopoverOpen
                                            )
                                        }
                                        variant="secondary"
                                        style={{
                                            width: "100%",
                                            height: "32px",
                                            backgroundColor:
                                                cardBackgroundColor ||
                                                "transparent",
                                            border: "1px solid #ddd",
                                        }}
                                    >
                                        {cardBackgroundColor || "Select"}
                                    </Button>
                                    {cardBgColorPopoverOpen && (
                                        <Popover
                                            onClose={() =>
                                                setCardBgColorPopoverOpen(false)
                                            }
                                        >
                                            <ColorPicker
                                                color={
                                                    cardBackgroundColor ||
                                                    undefined
                                                }
                                                onChangeComplete={(value) => {
                                                    let colorValue = "";
                                                    if (
                                                        value.rgb &&
                                                        value.rgb.a !==
                                                            undefined &&
                                                        value.rgb.a < 1
                                                    ) {
                                                        colorValue = `rgba(${value.rgb.r}, ${value.rgb.g}, ${value.rgb.b}, ${value.rgb.a})`;
                                                    } else {
                                                        colorValue =
                                                            value.hex || "";
                                                    }
                                                    setAttributes({
                                                        cardBackgroundColor:
                                                            colorValue,
                                                    });
                                                }}
                                            />
                                        </Popover>
                                    )}
                                </div>
                                {cardBackgroundColor && (
                                    <Button
                                        onClick={() =>
                                            setAttributes({
                                                cardBackgroundColor: "#ffffff",
                                            })
                                        }
                                        variant="link"
                                        style={{
                                            marginTop: "4px",
                                            fontSize: "11px",
                                        }}
                                    >
                                        Reset
                                    </Button>
                                )}
                            </div>
                            <div style={{ marginBottom: "10px" }}>
                                <label
                                    style={{
                                        display: "block",
                                        marginBottom: "5px",
                                        fontSize: "12px",
                                        fontWeight: "600",
                                    }}
                                >
                                    Text Color
                                </label>
                                <div style={{ position: "relative" }}>
                                    <Button
                                        onClick={() =>
                                            setTextColorPopoverOpen(
                                                !textColorPopoverOpen
                                            )
                                        }
                                        variant="secondary"
                                        style={{
                                            width: "100%",
                                            height: "32px",
                                            backgroundColor:
                                                textColor || "transparent",
                                            border: "1px solid #ddd",
                                        }}
                                    >
                                        {textColor || "Select"}
                                    </Button>
                                    {textColorPopoverOpen && (
                                        <Popover
                                            onClose={() =>
                                                setTextColorPopoverOpen(false)
                                            }
                                        >
                                            <ColorPicker
                                                color={textColor || undefined}
                                                onChangeComplete={(value) => {
                                                    let colorValue = "";
                                                    if (
                                                        value.rgb &&
                                                        value.rgb.a !==
                                                            undefined &&
                                                        value.rgb.a < 1
                                                    ) {
                                                        colorValue = `rgba(${value.rgb.r}, ${value.rgb.g}, ${value.rgb.b}, ${value.rgb.a})`;
                                                    } else {
                                                        colorValue =
                                                            value.hex || "";
                                                    }
                                                    setAttributes({
                                                        textColor: colorValue,
                                                    });
                                                }}
                                            />
                                        </Popover>
                                    )}
                                </div>
                                {textColor && (
                                    <Button
                                        onClick={() =>
                                            setAttributes({
                                                textColor: "#333333",
                                            })
                                        }
                                        variant="link"
                                        style={{
                                            marginTop: "4px",
                                            fontSize: "11px",
                                        }}
                                    >
                                        Reset
                                    </Button>
                                )}
                            </div>
                            <div style={{ marginBottom: "10px" }}>
                                <label
                                    style={{
                                        display: "block",
                                        marginBottom: "5px",
                                        fontSize: "12px",
                                        fontWeight: "600",
                                    }}
                                >
                                    Card Hover Background Color (Optional)
                                </label>
                                <div style={{ position: "relative" }}>
                                    <Button
                                        onClick={() =>
                                            setCardHoverBgColorPopoverOpen(
                                                !cardHoverBgColorPopoverOpen
                                            )
                                        }
                                        variant="secondary"
                                        style={{
                                            width: "100%",
                                            height: "32px",
                                            backgroundColor:
                                                cardHoverBackgroundColor ||
                                                "transparent",
                                            border: "1px solid #ddd",
                                        }}
                                    >
                                        {cardHoverBackgroundColor || "Select"}
                                    </Button>
                                    {cardHoverBgColorPopoverOpen && (
                                        <Popover
                                            onClose={() =>
                                                setCardHoverBgColorPopoverOpen(
                                                    false
                                                )
                                            }
                                        >
                                            <ColorPicker
                                                color={
                                                    cardHoverBackgroundColor ||
                                                    undefined
                                                }
                                                onChangeComplete={(value) => {
                                                    let colorValue = "";
                                                    if (
                                                        value.rgb &&
                                                        value.rgb.a !==
                                                            undefined &&
                                                        value.rgb.a < 1
                                                    ) {
                                                        colorValue = `rgba(${value.rgb.r}, ${value.rgb.g}, ${value.rgb.b}, ${value.rgb.a})`;
                                                    } else {
                                                        colorValue =
                                                            value.hex || "";
                                                    }
                                                    setAttributes({
                                                        cardHoverBackgroundColor:
                                                            colorValue,
                                                    });
                                                }}
                                            />
                                        </Popover>
                                    )}
                                </div>
                                {cardHoverBackgroundColor && (
                                    <Button
                                        onClick={() =>
                                            setAttributes({
                                                cardHoverBackgroundColor: "",
                                            })
                                        }
                                        variant="link"
                                        style={{
                                            marginTop: "4px",
                                            fontSize: "11px",
                                        }}
                                    >
                                        Clear
                                    </Button>
                                )}
                            </div>
                            <div style={{ marginBottom: "10px" }}>
                                <label
                                    style={{
                                        display: "block",
                                        marginBottom: "5px",
                                        fontSize: "12px",
                                        fontWeight: "600",
                                    }}
                                >
                                    Card Hover Text Color (Optional)
                                </label>
                                <div style={{ position: "relative" }}>
                                    <Button
                                        onClick={() =>
                                            setCardHoverTextColorPopoverOpen(
                                                !cardHoverTextColorPopoverOpen
                                            )
                                        }
                                        variant="secondary"
                                        style={{
                                            width: "100%",
                                            height: "32px",
                                            backgroundColor:
                                                cardHoverTextColor ||
                                                "transparent",
                                            border: "1px solid #ddd",
                                        }}
                                    >
                                        {cardHoverTextColor || "Select"}
                                    </Button>
                                    {cardHoverTextColorPopoverOpen && (
                                        <Popover
                                            onClose={() =>
                                                setCardHoverTextColorPopoverOpen(
                                                    false
                                                )
                                            }
                                        >
                                            <ColorPicker
                                                color={
                                                    cardHoverTextColor ||
                                                    undefined
                                                }
                                                onChangeComplete={(value) => {
                                                    let colorValue = "";
                                                    if (
                                                        value.rgb &&
                                                        value.rgb.a !==
                                                            undefined &&
                                                        value.rgb.a < 1
                                                    ) {
                                                        colorValue = `rgba(${value.rgb.r}, ${value.rgb.g}, ${value.rgb.b}, ${value.rgb.a})`;
                                                    } else {
                                                        colorValue =
                                                            value.hex || "";
                                                    }
                                                    setAttributes({
                                                        cardHoverTextColor:
                                                            colorValue,
                                                    });
                                                }}
                                            />
                                        </Popover>
                                    )}
                                </div>
                                {cardHoverTextColor && (
                                    <Button
                                        onClick={() =>
                                            setAttributes({
                                                cardHoverTextColor: "",
                                            })
                                        }
                                        variant="link"
                                        style={{
                                            marginTop: "4px",
                                            fontSize: "11px",
                                        }}
                                    >
                                        Clear
                                    </Button>
                                )}
                            </div>
                            <div style={{ marginBottom: "10px" }}>
                                <label
                                    style={{
                                        display: "block",
                                        marginBottom: "5px",
                                        fontSize: "12px",
                                        fontWeight: "600",
                                    }}
                                >
                                    Icon Hover Background Color (Optional)
                                </label>
                                <div style={{ position: "relative" }}>
                                    <Button
                                        onClick={() =>
                                            setIconHoverBgColorPopoverOpen(
                                                !iconHoverBgColorPopoverOpen
                                            )
                                        }
                                        variant="secondary"
                                        style={{
                                            width: "100%",
                                            height: "32px",
                                            backgroundColor:
                                                iconHoverBackgroundColor ||
                                                "transparent",
                                            border: "1px solid #ddd",
                                        }}
                                    >
                                        {iconHoverBackgroundColor || "Select"}
                                    </Button>
                                    {iconHoverBgColorPopoverOpen && (
                                        <Popover
                                            onClose={() =>
                                                setIconHoverBgColorPopoverOpen(
                                                    false
                                                )
                                            }
                                        >
                                            <ColorPicker
                                                color={
                                                    iconHoverBackgroundColor ||
                                                    undefined
                                                }
                                                onChangeComplete={(value) => {
                                                    let colorValue = "";
                                                    if (
                                                        value.rgb &&
                                                        value.rgb.a !==
                                                            undefined &&
                                                        value.rgb.a < 1
                                                    ) {
                                                        colorValue = `rgba(${value.rgb.r}, ${value.rgb.g}, ${value.rgb.b}, ${value.rgb.a})`;
                                                    } else {
                                                        colorValue =
                                                            value.hex || "";
                                                    }
                                                    setAttributes({
                                                        iconHoverBackgroundColor:
                                                            colorValue,
                                                    });
                                                }}
                                            />
                                        </Popover>
                                    )}
                                </div>
                                {iconHoverBackgroundColor && (
                                    <Button
                                        onClick={() =>
                                            setAttributes({
                                                iconHoverBackgroundColor: "",
                                            })
                                        }
                                        variant="link"
                                        style={{
                                            marginTop: "4px",
                                            fontSize: "11px",
                                        }}
                                    >
                                        Clear
                                    </Button>
                                )}
                            </div>
                        </div>
                        <div
                            style={{
                                marginTop: "16px",
                                paddingTop: "16px",
                                borderTop: "1px solid #eee",
                            }}
                        >
                            <h4
                                style={{
                                    marginTop: 0,
                                    marginBottom: "10px",
                                    fontSize: "12px",
                                    fontWeight: "600",
                                }}
                            >
                                Manage Cards
                            </h4>
                            {items.map((item, index) => (
                                <div
                                    key={item.id}
                                    style={{
                                        marginBottom: "20px",
                                        padding: "15px",
                                        border: "1px solid #ddd",
                                        borderRadius: "4px",
                                    }}
                                >
                                    <h4
                                        style={{
                                            marginTop: 0,
                                            marginBottom: "10px",
                                        }}
                                    >
                                        Card {index + 1}
                                    </h4>
                                    <div style={{ marginBottom: "10px" }}>
                                        <label
                                            style={{
                                                display: "block",
                                                marginBottom: "5px",
                                                fontWeight: "600",
                                                fontSize: "12px",
                                            }}
                                        >
                                            Icon (Optional)
                                        </label>
                                        <MediaUploadCheck>
                                            <MediaUpload
                                                onSelect={(media) =>
                                                    updateItemImage(
                                                        index,
                                                        media.url
                                                    )
                                                }
                                                allowedTypes={["image"]}
                                                value={item.iconUrl}
                                                render={({ open }) => (
                                                    <div>
                                                        {item.iconUrl ? (
                                                            <div
                                                                style={{
                                                                    display:
                                                                        "flex",
                                                                    alignItems:
                                                                        "center",
                                                                    gap: "8px",
                                                                    marginBottom:
                                                                        "8px",
                                                                }}
                                                            >
                                                                <img
                                                                    src={
                                                                        item.iconUrl
                                                                    }
                                                                    alt="Icon"
                                                                    style={{
                                                                        maxWidth:
                                                                            "60px",
                                                                        height: "auto",
                                                                        objectFit:
                                                                            "contain",
                                                                    }}
                                                                />
                                                                <div>
                                                                    <Button
                                                                        onClick={
                                                                            open
                                                                        }
                                                                        variant="secondary"
                                                                        size="small"
                                                                    >
                                                                        Change
                                                                    </Button>
                                                                    <Button
                                                                        onClick={() =>
                                                                            updateItemImage(
                                                                                index,
                                                                                ""
                                                                            )
                                                                        }
                                                                        variant="link"
                                                                        isDestructive
                                                                        size="small"
                                                                        style={{
                                                                            marginLeft:
                                                                                "4px",
                                                                        }}
                                                                    >
                                                                        Remove
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <Button
                                                                onClick={open}
                                                                variant="secondary"
                                                                size="small"
                                                            >
                                                                Select Icon
                                                            </Button>
                                                        )}
                                                    </div>
                                                )}
                                            />
                                        </MediaUploadCheck>
                                    </div>
                                    {item.iconUrl && (
                                        <div
                                            style={{
                                                marginBottom: "10px",
                                                marginTop: "10px",
                                            }}
                                        >
                                            <label
                                                style={{
                                                    display: "block",
                                                    marginBottom: "5px",
                                                    fontWeight: "600",
                                                    fontSize: "12px",
                                                }}
                                            >
                                                Icon Hover Color (Optional - For
                                                SVG)
                                            </label>
                                            <div
                                                style={{ position: "relative" }}
                                            >
                                                <Button
                                                    onClick={() =>
                                                        setCardIconHoverColorPopovers(
                                                            {
                                                                ...cardIconHoverColorPopovers,
                                                                [index]:
                                                                    !cardIconHoverColorPopovers[
                                                                        index
                                                                    ],
                                                            }
                                                        )
                                                    }
                                                    variant="secondary"
                                                    style={{
                                                        width: "100%",
                                                        height: "32px",
                                                        backgroundColor:
                                                            item.iconHoverColor ||
                                                            "transparent",
                                                        border: "1px solid #ddd",
                                                    }}
                                                >
                                                    {item.iconHoverColor ||
                                                        "Select"}
                                                </Button>
                                                {cardIconHoverColorPopovers[
                                                    index
                                                ] && (
                                                    <Popover
                                                        onClose={() =>
                                                            setCardIconHoverColorPopovers(
                                                                {
                                                                    ...cardIconHoverColorPopovers,
                                                                    [index]: false,
                                                                }
                                                            )
                                                        }
                                                    >
                                                        <ColorPicker
                                                            color={
                                                                item.iconHoverColor ||
                                                                undefined
                                                            }
                                                            onChangeComplete={(
                                                                value
                                                            ) => {
                                                                let colorValue =
                                                                    "";
                                                                if (
                                                                    value.rgb &&
                                                                    value.rgb
                                                                        .a !==
                                                                        undefined &&
                                                                    value.rgb
                                                                        .a < 1
                                                                ) {
                                                                    colorValue = `rgba(${value.rgb.r}, ${value.rgb.g}, ${value.rgb.b}, ${value.rgb.a})`;
                                                                } else {
                                                                    colorValue =
                                                                        value.hex ||
                                                                        "";
                                                                }
                                                                updateItem(
                                                                    index,
                                                                    "iconHoverColor",
                                                                    colorValue
                                                                );
                                                            }}
                                                        />
                                                    </Popover>
                                                )}
                                            </div>
                                            {item.iconHoverColor && (
                                                <Button
                                                    onClick={() =>
                                                        updateItem(
                                                            index,
                                                            "iconHoverColor",
                                                            ""
                                                        )
                                                    }
                                                    variant="link"
                                                    style={{
                                                        marginTop: "4px",
                                                        fontSize: "11px",
                                                    }}
                                                >
                                                    Clear
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "8px",
                                            marginTop: "10px",
                                        }}
                                    >
                                        <Button
                                            onClick={() => removeItem(index)}
                                            variant="link"
                                            isDestructive
                                            size="small"
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            <Button
                                onClick={addItem}
                                variant="primary"
                                style={{ marginTop: "10px" }}
                            >
                                Add Card
                            </Button>
                        </div>
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps}>
                    <div className="bs-feature-cards-editor">
                        <div
                            className="bs-feature-cards-grid"
                            style={{
                                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                                gap: hideCardGap ? "0px" : `${cardSpacing}px`,
                            }}
                        >
                            {items.map((item, index) => (
                                <div
                                    key={item.id}
                                    style={{ position: "relative" }}
                                >
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "10px",
                                            right: "10px",
                                            zIndex: 10,
                                            display: "flex",
                                            gap: "4px",
                                        }}
                                    >
                                        <Button
                                            onClick={() => removeItem(index)}
                                            variant="secondary"
                                            isDestructive
                                            size="small"
                                            style={{
                                                minWidth: "auto",
                                                padding: "4px 8px",
                                            }}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                    <div
                                        className={`bs-feature-card ${
                                            iconPosition === "left"
                                                ? "icon-left"
                                                : "icon-top"
                                        }`}
                                        style={{
                                            backgroundColor:
                                                cardBackgroundColor ||
                                                "#ffffff",
                                            color: textColor || "#333333",
                                            padding: cardPadding || undefined,
                                            borderRadius:
                                                cardBorderRadius || undefined,
                                            borderWidth:
                                                cardBorderWidth > 0
                                                    ? `${cardBorderWidth}px`
                                                    : undefined,
                                            borderStyle:
                                                cardBorderWidth > 0
                                                    ? cardBorderStyle || "solid"
                                                    : undefined,
                                            borderColor:
                                                cardBorderWidth > 0
                                                    ? cardBorderColor ||
                                                      "#000000"
                                                    : undefined,
                                        }}
                                        onMouseEnter={(e) => {
                                            if (cardHoverBackgroundColor) {
                                                e.currentTarget.style.backgroundColor =
                                                    cardHoverBackgroundColor;
                                            }
                                            if (cardHoverTextColor) {
                                                e.currentTarget.style.color =
                                                    cardHoverTextColor;
                                                const title =
                                                    e.currentTarget.querySelector(
                                                        ".bs-feature-card-title"
                                                    );
                                                const desc =
                                                    e.currentTarget.querySelector(
                                                        ".bs-feature-card-description"
                                                    );
                                                if (title)
                                                    title.style.color =
                                                        cardHoverTextColor;
                                                if (desc)
                                                    desc.style.color =
                                                        cardHoverTextColor;
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor =
                                                cardBackgroundColor ||
                                                "#ffffff";
                                            e.currentTarget.style.color =
                                                textColor || "#333333";
                                            const title =
                                                e.currentTarget.querySelector(
                                                    ".bs-feature-card-title"
                                                );
                                            const desc =
                                                e.currentTarget.querySelector(
                                                    ".bs-feature-card-description"
                                                );
                                            if (title)
                                                title.style.color =
                                                    textColor || "#333333";
                                            if (desc)
                                                desc.style.color =
                                                    textColor || "#333333";
                                        }}
                                    >
                                        {item.iconUrl && (
                                            <div
                                                className="bs-feature-card-icon"
                                                style={{
                                                    backgroundColor:
                                                        iconBackgroundColor ||
                                                        "#4CAF50",
                                                    borderRadius:
                                                        iconBorderRadius ||
                                                        undefined,
                                                    width:
                                                        iconSize || undefined,
                                                    height:
                                                        iconSize || undefined,
                                                }}
                                                onMouseEnter={(e) => {
                                                    if (
                                                        iconHoverBackgroundColor
                                                    ) {
                                                        e.currentTarget.style.backgroundColor =
                                                            iconHoverBackgroundColor;
                                                    }
                                                    // Use per-card icon hover color
                                                    if (item.iconHoverColor) {
                                                        const img =
                                                            e.currentTarget.querySelector(
                                                                "img"
                                                            );
                                                        const picture =
                                                            e.currentTarget.querySelector(
                                                                "picture"
                                                            );
                                                        const pictureImg =
                                                            e.currentTarget.querySelector(
                                                                "picture img"
                                                            );
                                                        const svg =
                                                            e.currentTarget.querySelector(
                                                                "svg"
                                                            );
                                                        if (img) {
                                                            img.style.filter =
                                                                hexToFilter(
                                                                    item.iconHoverColor
                                                                );
                                                        }
                                                        if (picture) {
                                                            picture.style.filter =
                                                                hexToFilter(
                                                                    item.iconHoverColor
                                                                );
                                                        }
                                                        if (pictureImg) {
                                                            pictureImg.style.filter =
                                                                hexToFilter(
                                                                    item.iconHoverColor
                                                                );
                                                        }
                                                        if (svg) {
                                                            svg.style.filter =
                                                                hexToFilter(
                                                                    item.iconHoverColor
                                                                );
                                                        }
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor =
                                                        iconBackgroundColor ||
                                                        "#4CAF50";
                                                    const img =
                                                        e.currentTarget.querySelector(
                                                            "img"
                                                        );
                                                    const picture =
                                                        e.currentTarget.querySelector(
                                                            "picture"
                                                        );
                                                    const pictureImg =
                                                        e.currentTarget.querySelector(
                                                            "picture img"
                                                        );
                                                    const svg =
                                                        e.currentTarget.querySelector(
                                                            "svg"
                                                        );
                                                    if (img) {
                                                        img.style.filter =
                                                            "none";
                                                    }
                                                    if (picture) {
                                                        picture.style.filter =
                                                            "none";
                                                    }
                                                    if (pictureImg) {
                                                        pictureImg.style.filter =
                                                            "none";
                                                    }
                                                    if (svg) {
                                                        svg.style.filter =
                                                            "none";
                                                    }
                                                }}
                                            >
                                                <img
                                                    src={item.iconUrl}
                                                    alt=""
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "contain",
                                                        padding: "12px",
                                                    }}
                                                />
                                            </div>
                                        )}
                                        <div className="bs-feature-card-content">
                                            <div
                                                style={{ marginBottom: "8px" }}
                                            >
                                                <Button
                                                    onClick={() =>
                                                        setTitleHtmlMode({
                                                            ...titleHtmlMode,
                                                            [index]:
                                                                !titleHtmlMode[
                                                                    index
                                                                ],
                                                        })
                                                    }
                                                    variant="secondary"
                                                    size="small"
                                                    style={{
                                                        marginBottom: "8px",
                                                    }}
                                                >
                                                    {titleHtmlMode[index]
                                                        ? "Visual Editor"
                                                        : "HTML Editor"}
                                                </Button>
                                            </div>
                                            {titleHtmlMode[index] ? (
                                                <TextareaControl
                                                    value={item.title || ""}
                                                    onChange={(value) =>
                                                        updateItem(
                                                            index,
                                                            "title",
                                                            value
                                                        )
                                                    }
                                                    placeholder="Enter title HTML here..."
                                                    rows={3}
                                                    style={{
                                                        fontFamily: "monospace",
                                                        fontSize: "12px",
                                                        marginBottom: "12px",
                                                    }}
                                                />
                                            ) : (
                                                <RichText
                                                    tagName="h3"
                                                    className="bs-feature-card-title"
                                                    value={item.title}
                                                    onChange={(value) =>
                                                        updateItem(
                                                            index,
                                                            "title",
                                                            value
                                                        )
                                                    }
                                                    placeholder="Enter title..."
                                                    allowedFormats={[
                                                        "core/bold",
                                                    ]}
                                                    style={{
                                                        color:
                                                            textColor ||
                                                            "#333333",
                                                        marginBottom: "12px",
                                                    }}
                                                />
                                            )}
                                            <div
                                                style={{ marginBottom: "8px" }}
                                            >
                                                <Button
                                                    onClick={() =>
                                                        setDescriptionHtmlMode({
                                                            ...descriptionHtmlMode,
                                                            [index]:
                                                                !descriptionHtmlMode[
                                                                    index
                                                                ],
                                                        })
                                                    }
                                                    variant="secondary"
                                                    size="small"
                                                    style={{
                                                        marginBottom: "8px",
                                                    }}
                                                >
                                                    {descriptionHtmlMode[index]
                                                        ? "Visual Editor"
                                                        : "HTML Editor"}
                                                </Button>
                                            </div>
                                            {descriptionHtmlMode[index] ? (
                                                <TextareaControl
                                                    value={
                                                        item.description || ""
                                                    }
                                                    onChange={(value) =>
                                                        updateItem(
                                                            index,
                                                            "description",
                                                            value
                                                        )
                                                    }
                                                    placeholder="Enter description HTML here..."
                                                    rows={6}
                                                    style={{
                                                        fontFamily: "monospace",
                                                        fontSize: "12px",
                                                        minHeight: "40px",
                                                        cursor: "text",
                                                        marginTop: "12px",
                                                        padding: "8px 0",
                                                        width: "100%",
                                                        display: "block",
                                                    }}
                                                />
                                            ) : (
                                                <RichText
                                                    tagName="div"
                                                    className="bs-feature-card-description"
                                                    value={
                                                        item.description || ""
                                                    }
                                                    onChange={(value) =>
                                                        updateItem(
                                                            index,
                                                            "description",
                                                            value
                                                        )
                                                    }
                                                    placeholder="Enter description (plain text or HTML)..."
                                                    allowedFormats={[
                                                        "core/bold",
                                                        "core/italic",
                                                        "core/link",
                                                    ]}
                                                    multiline="p"
                                                    style={{
                                                        color:
                                                            textColor ||
                                                            "#333333",
                                                        minHeight: "40px",
                                                        cursor: "text",
                                                        marginTop: "12px",
                                                        padding: "8px 0",
                                                        width: "100%",
                                                        display: "block",
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    minHeight: "200px",
                                    border: "2px dashed #ddd",
                                    borderRadius: "8px",
                                    padding: "20px",
                                }}
                            >
                                <Button
                                    onClick={addItem}
                                    variant="primary"
                                    size="large"
                                >
                                    + Add Card
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    },
    save: ({ attributes }) => {
        return (
            <div
                dangerouslySetInnerHTML={{
                    __html: generateFeatureCardsHTML(attributes),
                }}
            />
        );
    },
});
