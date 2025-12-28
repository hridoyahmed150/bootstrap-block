import { registerBlockType } from "@wordpress/blocks";
import {
    useBlockProps,
    InspectorControls,
    RichText,
    BlockControls,
    MediaUpload,
    MediaUploadCheck,
} from "@wordpress/block-editor";
import { generateAccordionHTML } from "./template";
import {
    PanelBody,
    TextControl,
    TextareaControl,
    ToggleControl,
    SelectControl,
    RangeControl,
    Button,
    ColorPicker,
    Popover,
    __experimentalRepeaterControl as RepeaterControl,
} from "@wordpress/components";
import { useState } from "@wordpress/element";
import "./style.css";

registerBlockType("bootstrap-blocks/bs-accordion", {
    edit: ({ attributes, setAttributes, clientId }) => {
        const {
            items,
            allowMultipleOpen,
            showNumbering,
            iconStyle,
            backgroundColor,
            textColor,
            activeBackgroundColor,
            activeTextColor,
            itemSpacing,
            blockId,
            itemPadding,
            iconColor,
            iconBackgroundColor,
            iconBackgroundWidth,
            iconBackgroundHeight,
            iconSize,
            showIconBorder,
            iconBorderWidth,
            iconBorderColor,
            iconBorderStyle,
            iconBorderRadius,
            imageHeightOpen,
            imageWidth,
            imageHeightClosed,
            titleFontSize,
            titlePadding,
            showBorder,
            borderWidth,
            borderColor,
            borderStyle,
            borderTop,
            borderBottom,
            borderLeft,
            borderRight,
            showBoxShadow,
            boxShadow,
            borderRadius,
        } = attributes;

        const [iconColorPopoverOpen, setIconColorPopoverOpen] = useState(false);
        const [iconBgColorPopoverOpen, setIconBgColorPopoverOpen] =
            useState(false);
        const [htmlMode, setHtmlMode] = useState({});

        // Generate unique block ID if not exists
        if (!blockId) {
            setAttributes({ blockId: `bs-accordion-${clientId}` });
        }

        const blockProps = useBlockProps({
            className: "bs-accordion-container",
        });

        // Add new accordion item
        const addItem = () => {
            const newItem = {
                id: `item-${Date.now()}`,
                title: "New Accordion Item",
                content: "Add your content here...",
                isOpen: false,
            };
            setAttributes({
                items: [...items, newItem],
            });
        };

        // Remove accordion item
        const removeItem = (index) => {
            const newItems = items.filter((_, i) => i !== index);
            setAttributes({ items: newItems });
        };

        // Update item title
        const updateItemTitle = (index, title) => {
            const newItems = [...items];
            newItems[index].title = title;
            setAttributes({ items: newItems });
        };

        // Update item content
        const updateItemContent = (index, content) => {
            const newItems = [...items];
            newItems[index].content = content;
            setAttributes({ items: newItems });
        };

        // Update item image
        const updateItemImage = (index, imageUrl) => {
            const newItems = [...items];
            if (!newItems[index].imageUrl) {
                newItems[index].imageUrl = "";
            }
            if (!newItems[index].imageHeightClosed) {
                newItems[index].imageHeightClosed = "";
            }
            if (!newItems[index].imageHeightOpen) {
                newItems[index].imageHeightOpen = "";
            }
            newItems[index].imageUrl = imageUrl || "";
            setAttributes({ items: newItems });
        };

        // Update item image height
        const updateItemImageHeight = (index, type, value) => {
            const newItems = [...items];
            newItems[index][`imageHeight${type}`] = value ? `${value}px` : "";
            setAttributes({ items: newItems });
        };

        // Update item image width
        const updateItemImageWidth = (index, value) => {
            const newItems = [...items];
            if (!newItems[index].imageWidth) {
                newItems[index].imageWidth = "";
            }
            newItems[index].imageWidth = value ? `${value}px` : "";
            setAttributes({ items: newItems });
        };

        // Toggle item open/closed state
        const toggleItem = (index) => {
            const newItems = [...items];

            if (!allowMultipleOpen) {
                // Close all other items
                newItems.forEach((item, i) => {
                    if (i !== index) {
                        item.isOpen = false;
                    }
                });
            }

            // Toggle current item
            newItems[index].isOpen = !newItems[index].isOpen;
            setAttributes({ items: newItems });
        };

        // Move item up
        const moveItemUp = (index) => {
            if (index > 0) {
                const newItems = [...items];
                [newItems[index - 1], newItems[index]] = [
                    newItems[index],
                    newItems[index - 1],
                ];
                setAttributes({ items: newItems });
            }
        };

        // Move item down
        const moveItemDown = (index) => {
            if (index < items.length - 1) {
                const newItems = [...items];
                [newItems[index], newItems[index + 1]] = [
                    newItems[index + 1],
                    newItems[index],
                ];
                setAttributes({ items: newItems });
            }
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody title="Behavior Settings" initialOpen={true}>
                        <ToggleControl
                            label="Allow Multiple Open"
                            checked={allowMultipleOpen}
                            onChange={(value) =>
                                setAttributes({ allowMultipleOpen: value })
                            }
                            help="Allow multiple accordion items to be open at the same time"
                        />
                        <ToggleControl
                            label="Show Numbering"
                            checked={showNumbering}
                            onChange={(value) =>
                                setAttributes({ showNumbering: value })
                            }
                            help="Display numbers before each accordion title"
                        />
                        <SelectControl
                            label="Icon Style"
                            value={iconStyle}
                            options={[
                                { label: "Plus/Minus", value: "plus-minus" },
                                { label: "Chevron", value: "chevron" },
                            ]}
                            onChange={(value) =>
                                setAttributes({ iconStyle: value })
                            }
                        />
                    </PanelBody>

                    <PanelBody title="Style Settings" initialOpen={false}>
                        <div style={{ marginBottom: "16px" }}>
                            <label
                                style={{
                                    display: "block",
                                    marginBottom: "8px",
                                    fontWeight: "bold",
                                }}
                            >
                                Default Colors
                            </label>
                            <div style={{ display: "flex", gap: "16px" }}>
                                <div>
                                    <label
                                        style={{
                                            display: "block",
                                            marginBottom: "4px",
                                            fontSize: "12px",
                                        }}
                                    >
                                        Background
                                    </label>
                                    <input
                                        type="color"
                                        value={backgroundColor}
                                        onChange={(e) =>
                                            setAttributes({
                                                backgroundColor: e.target.value,
                                            })
                                        }
                                        style={{
                                            width: "40px",
                                            height: "30px",
                                            border: "none",
                                            borderRadius: "4px",
                                        }}
                                    />
                                </div>
                                <div>
                                    <label
                                        style={{
                                            display: "block",
                                            marginBottom: "4px",
                                            fontSize: "12px",
                                        }}
                                    >
                                        Text
                                    </label>
                                    <input
                                        type="color"
                                        value={textColor}
                                        onChange={(e) =>
                                            setAttributes({
                                                textColor: e.target.value,
                                            })
                                        }
                                        style={{
                                            width: "40px",
                                            height: "30px",
                                            border: "none",
                                            borderRadius: "4px",
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={{ marginBottom: "16px" }}>
                            <label
                                style={{
                                    display: "block",
                                    marginBottom: "8px",
                                    fontWeight: "bold",
                                }}
                            >
                                Active Item Colors
                            </label>
                            <div style={{ display: "flex", gap: "16px" }}>
                                <div>
                                    <label
                                        style={{
                                            display: "block",
                                            marginBottom: "4px",
                                            fontSize: "12px",
                                        }}
                                    >
                                        Background
                                    </label>
                                    <input
                                        type="color"
                                        value={activeBackgroundColor}
                                        onChange={(e) =>
                                            setAttributes({
                                                activeBackgroundColor:
                                                    e.target.value,
                                            })
                                        }
                                        style={{
                                            width: "40px",
                                            height: "30px",
                                            border: "none",
                                            borderRadius: "4px",
                                        }}
                                    />
                                </div>
                                <div>
                                    <label
                                        style={{
                                            display: "block",
                                            marginBottom: "4px",
                                            fontSize: "12px",
                                        }}
                                    >
                                        Text
                                    </label>
                                    <input
                                        type="color"
                                        value={activeTextColor}
                                        onChange={(e) =>
                                            setAttributes({
                                                activeTextColor: e.target.value,
                                            })
                                        }
                                        style={{
                                            width: "40px",
                                            height: "30px",
                                            border: "none",
                                            borderRadius: "4px",
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={{ marginBottom: "16px" }}>
                            <label
                                style={{
                                    display: "block",
                                    marginBottom: "8px",
                                    fontWeight: "bold",
                                }}
                            >
                                Item Spacing
                            </label>
                            <RangeControl
                                value={itemSpacing}
                                onChange={(value) =>
                                    setAttributes({ itemSpacing: value })
                                }
                                min={0}
                                max={50}
                                step={1}
                                help="Space between accordion items (0-50px)"
                            />
                        </div>

                        <div style={{ marginBottom: "16px" }}>
                            <label
                                style={{
                                    display: "block",
                                    marginBottom: "8px",
                                    fontWeight: "bold",
                                }}
                            >
                                Item Padding (Optional)
                            </label>
                            <TextControl
                                value={itemPadding || ""}
                                onChange={(value) =>
                                    setAttributes({ itemPadding: value })
                                }
                                placeholder="e.g., 16px 20px"
                            />
                        </div>

                        <div style={{ marginBottom: "16px" }}>
                            <label
                                style={{
                                    display: "block",
                                    marginBottom: "8px",
                                    fontWeight: "bold",
                                }}
                            >
                                Icon Colors (Optional)
                            </label>
                            <div
                                style={{
                                    display: "flex",
                                    gap: "12px",
                                }}
                            >
                                <div style={{ flex: 1 }}>
                                    <label
                                        style={{
                                            display: "block",
                                            marginBottom: "4px",
                                            fontSize: "12px",
                                        }}
                                    >
                                        Icon Color
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
                                                    iconColor || "transparent",
                                                border: "1px solid #ddd",
                                            }}
                                        >
                                            {iconColor || "Select"}
                                        </Button>
                                        {iconColorPopoverOpen && (
                                            <Popover
                                                onClose={() =>
                                                    setIconColorPopoverOpen(
                                                        false
                                                    )
                                                }
                                            >
                                                <ColorPicker
                                                    color={
                                                        iconColor || undefined
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
                                                            iconColor:
                                                                colorValue,
                                                        });
                                                    }}
                                                />
                                            </Popover>
                                        )}
                                    </div>
                                    {iconColor && (
                                        <Button
                                            onClick={() =>
                                                setAttributes({
                                                    iconColor: "",
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
                                <div style={{ flex: 1 }}>
                                    <label
                                        style={{
                                            display: "block",
                                            marginBottom: "4px",
                                            fontSize: "12px",
                                        }}
                                    >
                                        Background Color
                                    </label>
                                    <div style={{ position: "relative" }}>
                                        <Button
                                            onClick={() =>
                                                setIconBgColorPopoverOpen(
                                                    !iconBgColorPopoverOpen
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
                                        {iconBgColorPopoverOpen && (
                                            <Popover
                                                onClose={() =>
                                                    setIconBgColorPopoverOpen(
                                                        false
                                                    )
                                                }
                                            >
                                                <ColorPicker
                                                    color={
                                                        iconBackgroundColor ||
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
                                                    iconBackgroundColor: "",
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
                        </div>

                        <div style={{ marginBottom: "16px" }}>
                            <RangeControl
                                label="Icon Background Width (Optional)"
                                value={
                                    iconBackgroundWidth
                                        ? parseInt(iconBackgroundWidth) || 0
                                        : undefined
                                }
                                onChange={(value) =>
                                    setAttributes({
                                        iconBackgroundWidth: value
                                            ? `${value}px`
                                            : "",
                                    })
                                }
                                min={0}
                                max={200}
                                step={1}
                                allowReset={true}
                            />
                        </div>

                        <div style={{ marginBottom: "16px" }}>
                            <RangeControl
                                label="Icon Background Height (Optional)"
                                value={
                                    iconBackgroundHeight
                                        ? parseInt(iconBackgroundHeight) || 0
                                        : undefined
                                }
                                onChange={(value) =>
                                    setAttributes({
                                        iconBackgroundHeight: value
                                            ? `${value}px`
                                            : "",
                                    })
                                }
                                min={0}
                                max={200}
                                step={1}
                                allowReset={true}
                            />
                            <div
                                style={{
                                    marginTop: "16px",
                                    paddingTop: "16px",
                                    borderTop: "1px solid #eee",
                                }}
                            >
                                <ToggleControl
                                    label="Show Icon Border"
                                    checked={showIconBorder}
                                    onChange={(value) =>
                                        setAttributes({ showIconBorder: value })
                                    }
                                />
                                {showIconBorder && (
                                    <>
                                        <RangeControl
                                            label="Icon Border Width (Optional)"
                                            value={
                                                iconBorderWidth
                                                    ? parseInt(
                                                          iconBorderWidth
                                                      ) || 0
                                                    : undefined
                                            }
                                            onChange={(value) =>
                                                setAttributes({
                                                    iconBorderWidth: value
                                                        ? `${value}px`
                                                        : "",
                                                })
                                            }
                                            min={0}
                                            max={10}
                                            step={1}
                                            allowReset={true}
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
                                                Icon Border Color (Optional)
                                            </label>
                                            <input
                                                type="color"
                                                value={
                                                    iconBorderColor || "#000000"
                                                }
                                                onChange={(e) =>
                                                    setAttributes({
                                                        iconBorderColor:
                                                            e.target.value,
                                                    })
                                                }
                                                style={{
                                                    width: "100%",
                                                    height: "32px",
                                                    border: "1px solid #ddd",
                                                    borderRadius: "4px",
                                                }}
                                            />
                                        </div>
                                        <SelectControl
                                            label="Icon Border Style (Optional)"
                                            value={iconBorderStyle}
                                            options={[
                                                {
                                                    label: "Solid",
                                                    value: "solid",
                                                },
                                                {
                                                    label: "Dashed",
                                                    value: "dashed",
                                                },
                                                {
                                                    label: "Dotted",
                                                    value: "dotted",
                                                },
                                                {
                                                    label: "Double",
                                                    value: "double",
                                                },
                                                {
                                                    label: "None",
                                                    value: "none",
                                                },
                                            ]}
                                            onChange={(value) =>
                                                setAttributes({
                                                    iconBorderStyle: value,
                                                })
                                            }
                                        />
                                        <RangeControl
                                            label="Icon Border Radius (Optional)"
                                            value={
                                                iconBorderRadius
                                                    ? parseInt(
                                                          iconBorderRadius
                                                      ) || 0
                                                    : undefined
                                            }
                                            onChange={(value) =>
                                                setAttributes({
                                                    iconBorderRadius: value
                                                        ? `${value}px`
                                                        : "",
                                                })
                                            }
                                            min={0}
                                            max={50}
                                            step={1}
                                            allowReset={true}
                                        />
                                    </>
                                )}
                            </div>
                            <RangeControl
                                label="Icon Size (Optional)"
                                value={
                                    iconSize
                                        ? parseInt(iconSize) || 0
                                        : undefined
                                }
                                onChange={(value) =>
                                    setAttributes({
                                        iconSize: value ? `${value}px` : "",
                                    })
                                }
                                min={8}
                                max={100}
                                step={1}
                                allowReset={true}
                            />
                        </div>

                        <div
                            style={{
                                marginBottom: "16px",
                                marginTop: "24px",
                                paddingTop: "16px",
                                borderTop: "1px solid #ddd",
                            }}
                        >
                            <h3
                                style={{
                                    marginTop: 0,
                                    marginBottom: "12px",
                                    fontSize: "13px",
                                    fontWeight: "600",
                                }}
                            >
                                Title Settings
                            </h3>
                            <RangeControl
                                label="Title Font Size (Optional)"
                                value={
                                    titleFontSize
                                        ? parseInt(titleFontSize) || 0
                                        : undefined
                                }
                                onChange={(value) =>
                                    setAttributes({
                                        titleFontSize: value
                                            ? `${value}px`
                                            : "",
                                    })
                                }
                                min={10}
                                max={50}
                                step={1}
                                allowReset={true}
                            />
                            <TextControl
                                label="Title Padding (Optional)"
                                value={titlePadding || ""}
                                onChange={(value) =>
                                    setAttributes({
                                        titlePadding: value || "",
                                    })
                                }
                                placeholder="e.g., 16px 20px or 16px"
                                help="Set padding for accordion title (header). Use CSS format like '16px 20px' or '16px'."
                            />
                        </div>

                        <div
                            style={{
                                marginBottom: "16px",
                                marginTop: "24px",
                                paddingTop: "16px",
                                borderTop: "1px solid #ddd",
                            }}
                        >
                            <h3
                                style={{
                                    marginTop: 0,
                                    marginBottom: "12px",
                                    fontSize: "13px",
                                    fontWeight: "600",
                                }}
                            >
                                Image Settings
                            </h3>
                            <RangeControl
                                label="Image Width (Optional)"
                                value={
                                    imageWidth
                                        ? parseInt(imageWidth) || 0
                                        : undefined
                                }
                                onChange={(value) =>
                                    setAttributes({
                                        imageWidth: value ? `${value}px` : "",
                                    })
                                }
                                min={0}
                                max={500}
                                step={1}
                                allowReset={true}
                            />
                            <RangeControl
                                label="Image Height - Closed State (Optional)"
                                value={
                                    imageHeightClosed
                                        ? parseInt(imageHeightClosed) || 0
                                        : undefined
                                }
                                onChange={(value) =>
                                    setAttributes({
                                        imageHeightClosed: value
                                            ? `${value}px`
                                            : "",
                                    })
                                }
                                min={0}
                                max={500}
                                step={1}
                                allowReset={true}
                            />
                            <RangeControl
                                label="Image Height - Open State (Optional)"
                                value={
                                    imageHeightOpen
                                        ? parseInt(imageHeightOpen) || 0
                                        : undefined
                                }
                                onChange={(value) =>
                                    setAttributes({
                                        imageHeightOpen: value
                                            ? `${value}px`
                                            : "",
                                    })
                                }
                                min={0}
                                max={500}
                                step={1}
                                allowReset={true}
                            />
                        </div>

                        <div
                            style={{
                                marginBottom: "16px",
                                marginTop: "24px",
                                paddingTop: "16px",
                                borderTop: "1px solid #ddd",
                            }}
                        >
                            <h3
                                style={{
                                    marginTop: 0,
                                    marginBottom: "12px",
                                    fontSize: "13px",
                                    fontWeight: "600",
                                }}
                            >
                                Border & Shadow Settings
                            </h3>
                            <ToggleControl
                                label="Show Border"
                                checked={showBorder}
                                onChange={(value) =>
                                    setAttributes({ showBorder: value })
                                }
                            />
                            {showBorder && (
                                <>
                                    <RangeControl
                                        label="Border Width (Optional)"
                                        value={
                                            borderWidth
                                                ? parseInt(borderWidth) || 0
                                                : undefined
                                        }
                                        onChange={(value) =>
                                            setAttributes({
                                                borderWidth: value
                                                    ? `${value}px`
                                                    : "",
                                            })
                                        }
                                        min={0}
                                        max={20}
                                        step={1}
                                        allowReset={true}
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
                                            Border Color (Optional)
                                        </label>
                                        <input
                                            type="color"
                                            value={borderColor || "#000000"}
                                            onChange={(e) =>
                                                setAttributes({
                                                    borderColor: e.target.value,
                                                })
                                            }
                                            style={{
                                                width: "100%",
                                                height: "32px",
                                                border: "1px solid #ddd",
                                                borderRadius: "4px",
                                            }}
                                        />
                                    </div>
                                    <SelectControl
                                        label="Border Style (Optional)"
                                        value={borderStyle}
                                        options={[
                                            { label: "Solid", value: "solid" },
                                            {
                                                label: "Dashed",
                                                value: "dashed",
                                            },
                                            {
                                                label: "Dotted",
                                                value: "dotted",
                                            },
                                            {
                                                label: "Double",
                                                value: "double",
                                            },
                                            { label: "None", value: "none" },
                                        ]}
                                        onChange={(value) =>
                                            setAttributes({
                                                borderStyle: value,
                                            })
                                        }
                                    />
                                    <div style={{ marginTop: "16px" }}>
                                        <h4
                                            style={{
                                                marginTop: 0,
                                                marginBottom: "10px",
                                                fontSize: "12px",
                                                fontWeight: "600",
                                            }}
                                        >
                                            Individual Border Sides (Optional)
                                        </h4>
                                        <RangeControl
                                            label="Border Top"
                                            value={
                                                borderTop
                                                    ? parseInt(borderTop) || 0
                                                    : undefined
                                            }
                                            onChange={(value) =>
                                                setAttributes({
                                                    borderTop: value
                                                        ? `${value}px`
                                                        : "",
                                                })
                                            }
                                            min={0}
                                            max={20}
                                            step={1}
                                            allowReset={true}
                                        />
                                        <RangeControl
                                            label="Border Bottom"
                                            value={
                                                borderBottom
                                                    ? parseInt(borderBottom) ||
                                                      0
                                                    : undefined
                                            }
                                            onChange={(value) =>
                                                setAttributes({
                                                    borderBottom: value
                                                        ? `${value}px`
                                                        : "",
                                                })
                                            }
                                            min={0}
                                            max={20}
                                            step={1}
                                            allowReset={true}
                                        />
                                        <RangeControl
                                            label="Border Left"
                                            value={
                                                borderLeft
                                                    ? parseInt(borderLeft) || 0
                                                    : undefined
                                            }
                                            onChange={(value) =>
                                                setAttributes({
                                                    borderLeft: value
                                                        ? `${value}px`
                                                        : "",
                                                })
                                            }
                                            min={0}
                                            max={20}
                                            step={1}
                                            allowReset={true}
                                        />
                                        <RangeControl
                                            label="Border Right"
                                            value={
                                                borderRight
                                                    ? parseInt(borderRight) || 0
                                                    : undefined
                                            }
                                            onChange={(value) =>
                                                setAttributes({
                                                    borderRight: value
                                                        ? `${value}px`
                                                        : "",
                                                })
                                            }
                                            min={0}
                                            max={20}
                                            step={1}
                                            allowReset={true}
                                        />
                                    </div>
                                </>
                            )}
                            <div style={{ marginTop: "16px" }}>
                                <ToggleControl
                                    label="Show Box Shadow"
                                    checked={showBoxShadow}
                                    onChange={(value) =>
                                        setAttributes({ showBoxShadow: value })
                                    }
                                />
                                {showBoxShadow && (
                                    <TextControl
                                        label="Box Shadow (Optional)"
                                        value={boxShadow || ""}
                                        onChange={(value) =>
                                            setAttributes({ boxShadow: value })
                                        }
                                        placeholder="e.g., 0 2px 4px rgba(0,0,0,0.1)"
                                        help="Enter CSS box-shadow value"
                                    />
                                )}
                            </div>
                            <div style={{ marginTop: "16px" }}>
                                <RangeControl
                                    label="Border Radius (Optional)"
                                    value={
                                        borderRadius
                                            ? parseInt(borderRadius) || 0
                                            : undefined
                                    }
                                    onChange={(value) =>
                                        setAttributes({
                                            borderRadius: value
                                                ? `${value}px`
                                                : "",
                                        })
                                    }
                                    min={0}
                                    max={50}
                                    step={1}
                                    allowReset={true}
                                    help="Rounded corners for accordion items"
                                />
                            </div>
                        </div>
                    </PanelBody>
                    <PanelBody title="Item Images" initialOpen={false}>
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
                                    Item {index + 1}
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
                                        Image (Optional)
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
                                            value={item.imageUrl}
                                            render={({ open }) => (
                                                <div>
                                                    {item.imageUrl ? (
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                alignItems:
                                                                    "center",
                                                                gap: "8px",
                                                                marginBottom:
                                                                    "8px",
                                                            }}
                                                        >
                                                            <img
                                                                src={
                                                                    item.imageUrl
                                                                }
                                                                alt="Item"
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
                                                            Select Image
                                                        </Button>
                                                    )}
                                                </div>
                                            )}
                                        />
                                    </MediaUploadCheck>
                                </div>
                            </div>
                        ))}
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps}>
                    <div className="bs-accordion-editor">
                        {items.map((item, index) => (
                            <div
                                key={item.id}
                                className={`bs-accordion-item ${
                                    item.isOpen ? "open" : ""
                                }`}
                                style={{
                                    marginBottom: `${itemSpacing}px`,
                                    padding: itemPadding || undefined,
                                    ...(showBorder
                                        ? borderTop ||
                                          borderBottom ||
                                          borderLeft ||
                                          borderRight
                                            ? {
                                                  borderTop: borderTop
                                                      ? `${borderTop} ${borderStyle} ${
                                                            borderColor ||
                                                            "rgba(0, 0, 0, 0.1)"
                                                        }`
                                                      : "none",
                                                  borderBottom: borderBottom
                                                      ? `${borderBottom} ${borderStyle} ${
                                                            borderColor ||
                                                            "rgba(0, 0, 0, 0.1)"
                                                        }`
                                                      : "none",
                                                  borderLeft: borderLeft
                                                      ? `${borderLeft} ${borderStyle} ${
                                                            borderColor ||
                                                            "rgba(0, 0, 0, 0.1)"
                                                        }`
                                                      : "none",
                                                  borderRight: borderRight
                                                      ? `${borderRight} ${borderStyle} ${
                                                            borderColor ||
                                                            "rgba(0, 0, 0, 0.1)"
                                                        }`
                                                      : "none",
                                              }
                                            : {
                                                  border: `${
                                                      borderWidth || "1px"
                                                  } ${borderStyle} ${
                                                      borderColor ||
                                                      "rgba(0, 0, 0, 0.1)"
                                                  }`,
                                              }
                                        : { border: "none" }),
                                    boxShadow: showBoxShadow
                                        ? boxShadow ||
                                          "0 2px 4px rgba(0, 0, 0, 0.1)"
                                        : "none",
                                    borderRadius: borderRadius || undefined,
                                }}
                            >
                                {item.imageUrl && (
                                    <div className="bs-accordion-image-wrapper">
                                        <img
                                            src={item.imageUrl}
                                            alt=""
                                            className="bs-accordion-image"
                                            style={{
                                                height: item.isOpen
                                                    ? imageHeightOpen || "auto"
                                                    : imageHeightClosed ||
                                                      "auto",
                                                width: imageWidth || "auto",
                                            }}
                                        />
                                    </div>
                                )}
                                <div className="bs-accordion-content-wrapper">
                                    <div
                                        className="bs-accordion-header"
                                        onClick={() => toggleItem(index)}
                                        style={{
                                            backgroundColor: item.isOpen
                                                ? activeBackgroundColor
                                                : backgroundColor,
                                            color: item.isOpen
                                                ? activeTextColor
                                                : textColor,
                                            padding: titlePadding || undefined,
                                        }}
                                    >
                                        <div
                                            className="bs-accordion-title"
                                            style={{
                                                fontSize:
                                                    titleFontSize || undefined,
                                            }}
                                        >
                                            {showNumbering && (
                                                <span className="bs-accordion-number">
                                                    {index + 1}.
                                                </span>
                                            )}
                                            <RichText
                                                tagName="span"
                                                value={item.title}
                                                onChange={(value) =>
                                                    updateItemTitle(
                                                        index,
                                                        value
                                                    )
                                                }
                                                placeholder="Enter accordion title..."
                                                allowedFormats={[
                                                    "core/bold",
                                                    "core/italic",
                                                ]}
                                                style={{
                                                    fontSize:
                                                        titleFontSize ||
                                                        undefined,
                                                }}
                                            />
                                        </div>
                                        <div
                                            className="bs-accordion-icon"
                                            style={{
                                                backgroundColor:
                                                    iconBackgroundColor ||
                                                    undefined,
                                                width:
                                                    iconBackgroundWidth ||
                                                    undefined,
                                                height:
                                                    iconBackgroundHeight ||
                                                    undefined,
                                                ...(showIconBorder
                                                    ? {
                                                          border: `${
                                                              iconBorderWidth ||
                                                              "1px"
                                                          } ${iconBorderStyle} ${
                                                              iconBorderColor ||
                                                              "#000000"
                                                          }`,
                                                          borderRadius:
                                                              iconBorderRadius ||
                                                              undefined,
                                                      }
                                                    : {}),
                                            }}
                                        >
                                            <span
                                                className={`bs-accordion-icon-inner ${
                                                    iconStyle === "plus-minus"
                                                        ? "bs-icon-plus-minus"
                                                        : "bs-icon-chevron"
                                                }`}
                                                style={{
                                                    color:
                                                        iconColor || undefined,
                                                    fontSize:
                                                        iconStyle ===
                                                            "plus-minus" &&
                                                        iconSize
                                                            ? iconSize
                                                            : undefined,
                                                }}
                                            >
                                                {iconStyle === "plus-minus" ? (
                                                    item.isOpen ? (
                                                        "−"
                                                    ) : (
                                                        "+"
                                                    )
                                                ) : (
                                                    <svg
                                                        width={iconSize || "24"}
                                                        height={
                                                            iconSize || "24"
                                                        }
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M6.5 11.6L12 16l5.5-4.4-.9-1.2L12 14l-4.5-3.6-1 1.2z"
                                                            fill="currentColor"
                                                        />
                                                    </svg>
                                                )}
                                            </span>
                                        </div>
                                    </div>

                                    {item.isOpen && (
                                        <div
                                            className="bs-accordion-body"
                                            style={{
                                                backgroundColor:
                                                    backgroundColor,
                                                color: textColor,
                                            }}
                                        >
                                            <div
                                                style={{ marginBottom: "10px" }}
                                            >
                                                <Button
                                                    onClick={() =>
                                                        setHtmlMode({
                                                            ...htmlMode,
                                                            [index]:
                                                                !htmlMode[
                                                                    index
                                                                ],
                                                        })
                                                    }
                                                    variant="secondary"
                                                    size="small"
                                                    style={{
                                                        marginBottom: "10px",
                                                    }}
                                                >
                                                    {htmlMode[index]
                                                        ? "Visual Editor"
                                                        : "HTML Editor"}
                                                </Button>
                                            </div>
                                            {htmlMode[index] ? (
                                                <TextareaControl
                                                    value={item.content || ""}
                                                    onChange={(value) =>
                                                        updateItemContent(
                                                            index,
                                                            value
                                                        )
                                                    }
                                                    placeholder="Enter HTML code here..."
                                                    rows={8}
                                                    style={{
                                                        fontFamily: "monospace",
                                                        fontSize: "12px",
                                                    }}
                                                />
                                            ) : (
                                                <RichText
                                                    tagName="div"
                                                    value={item.content}
                                                    onChange={(value) =>
                                                        updateItemContent(
                                                            index,
                                                            value
                                                        )
                                                    }
                                                    placeholder="Enter accordion content..."
                                                    allowedFormats={[
                                                        "core/bold",
                                                        "core/italic",
                                                        "core/link",
                                                        "core/strikethrough",
                                                    ]}
                                                />
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="bs-accordion-controls">
                                    <Button
                                        icon="arrow-up-alt2"
                                        onClick={() => moveItemUp(index)}
                                        disabled={index === 0}
                                        label="Move Up"
                                    />
                                    <Button
                                        icon="arrow-down-alt2"
                                        onClick={() => moveItemDown(index)}
                                        disabled={index === items.length - 1}
                                        label="Move Down"
                                    />
                                    <Button
                                        icon="trash"
                                        onClick={() => removeItem(index)}
                                        label="Remove Item"
                                        isDestructive
                                    />
                                </div>
                            </div>
                        ))}

                        <Button
                            icon="plus-alt2"
                            onClick={addItem}
                            className="bs-accordion-add-item"
                        >
                            Add Accordion Item
                        </Button>
                    </div>
                </div>
            </>
        );
    },

    save: ({ attributes, clientId }) => {
        const blockProps = useBlockProps.save({
            className: "bs-accordion-container",
        });

        // Ensure blockId is unique - use clientId if blockId is missing
        const finalAttributes = {
            ...attributes,
            blockId: attributes.blockId || `bs-accordion-${clientId}`,
        };

        return (
            <div
                {...blockProps}
                dangerouslySetInnerHTML={{
                    __html: generateAccordionHTML(finalAttributes),
                }}
            />
        );
    },
});
