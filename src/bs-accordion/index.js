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
    ToggleControl,
    SelectControl,
    RangeControl,
    Button,
    ColorPicker,
    TextareaControl,
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
            iconBackgroundColor,
        } = attributes;

        // Generate unique block ID if not exists
        if (!blockId) {
            setAttributes({ blockId: `bs-accordion-${clientId}` });
        }

        // State to track HTML mode for each item
        const [htmlMode, setHtmlMode] = useState({});

        const blockProps = useBlockProps({
            className: "bs-accordion-container",
        });

        // Toggle HTML mode for a specific item
        const toggleHtmlMode = (index) => {
            setHtmlMode({
                ...htmlMode,
                [index]: !htmlMode[index],
            });
        };

        // Add new accordion item
        const addItem = () => {
            const newItem = {
                id: `item-${Date.now()}`,
                title: "New Accordion Item",
                content: "Add your content here...",
                imageUrl: "",
                isOpen: false,
            };
            setAttributes({
                items: [...items, newItem],
            });
        };

        // Update item image
        const updateItemImage = (index, imageUrl) => {
            const newItems = [...items];
            newItems[index].imageUrl = imageUrl;
            setAttributes({ items: newItems });
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
                                Icon Background Color
                            </label>
                            <input
                                type="color"
                                value={iconBackgroundColor || "#000000"}
                                onChange={(e) =>
                                    setAttributes({
                                        iconBackgroundColor: e.target.value,
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
                    </PanelBody>

                    <PanelBody title="Accordion Items" initialOpen={true}>
                        {items.map((item, index) => (
                            <div
                                key={item.id}
                                style={{
                                    border: "1px solid #ddd",
                                    padding: "15px",
                                    marginBottom: "10px",
                                    borderRadius: "4px",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: "10px",
                                    }}
                                >
                                    <strong>Item {index + 1}</strong>
                                </div>

                                <div style={{ marginBottom: "15px" }}>
                                    <label
                                        style={{
                                            display: "block",
                                            marginBottom: "5px",
                                            fontWeight: "600",
                                        }}
                                    >
                                        Image
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
                                                                gap: "10px",
                                                                marginBottom:
                                                                    "10px",
                                                            }}
                                                        >
                                                            <img
                                                                src={
                                                                    item.imageUrl
                                                                }
                                                                alt="Accordion"
                                                                style={{
                                                                    width: "80px",
                                                                    height: "60px",
                                                                    objectFit:
                                                                        "cover",
                                                                    borderRadius:
                                                                        "4px",
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
                                                                    Change Image
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
                                                                            "5px",
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
                                    display: "flex",
                                    gap: "20px",
                                    alignItems: "flex-start",
                                }}
                            >
                                {item.imageUrl && (
                                    <div
                                        className="bs-accordion-image"
                                        style={{
                                            flexShrink: 0,
                                            width: "200px",
                                            height: item.isOpen
                                                ? "300px"
                                                : "120px",
                                            transition: "height 0.3s ease",
                                            overflow: "hidden",
                                            borderRadius: "8px",
                                        }}
                                    >
                                        <img
                                            src={item.imageUrl}
                                            alt="Accordion"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </div>
                                )}
                                <div
                                    style={{
                                        flex: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
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
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            padding: "16px 20px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <div className="bs-accordion-title">
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
                                            />
                                        </div>
                                        <div
                                            className="bs-accordion-icon"
                                            style={{
                                                backgroundColor:
                                                    iconBackgroundColor ||
                                                    "#000000",
                                                color: "#ffffff",
                                                width: "32px",
                                                height: "32px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                borderRadius: "4px",
                                                fontSize: "20px",
                                                fontWeight: "bold",
                                                flexShrink: 0,
                                            }}
                                        >
                                            {iconStyle === "plus-minus"
                                                ? item.isOpen
                                                    ? "−"
                                                    : "+"
                                                : item.isOpen
                                                ? "⌄"
                                                : "⌃"}
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
                                                style={{
                                                    marginBottom: "8px",
                                                    display: "flex",
                                                    justifyContent: "flex-end",
                                                }}
                                            >
                                                <Button
                                                    isSmall
                                                    variant={
                                                        htmlMode[index]
                                                            ? "primary"
                                                            : "secondary"
                                                    }
                                                    onClick={() =>
                                                        toggleHtmlMode(index)
                                                    }
                                                    icon={
                                                        htmlMode[index]
                                                            ? "editor-code"
                                                            : "editor-code"
                                                    }
                                                >
                                                    {htmlMode[index]
                                                        ? "Visual"
                                                        : "HTML"}
                                                </Button>
                                            </div>
                                            {htmlMode[index] ? (
                                                <TextareaControl
                                                    value={item.content}
                                                    onChange={(value) =>
                                                        updateItemContent(
                                                            index,
                                                            value
                                                        )
                                                    }
                                                    placeholder="Enter HTML content here... You can add buttons, links, or any HTML."
                                                    rows={8}
                                                    style={{
                                                        fontFamily: "monospace",
                                                        fontSize: "13px",
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
                                                    placeholder="Enter accordion content... Click HTML button to add custom HTML/buttons."
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
