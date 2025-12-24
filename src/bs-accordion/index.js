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
            imageHeightOpen,
            imageWidth,
            imageHeightClosed,
            titleFontSize,
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

    save: ({ attributes }) => {
        const blockProps = useBlockProps.save({
            className: "bs-accordion-container",
        });

        return (
            <div
                {...blockProps}
                dangerouslySetInnerHTML={{
                    __html: generateAccordionHTML(attributes),
                }}
            />
        );
    },
});
