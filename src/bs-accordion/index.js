import { registerBlockType } from '@wordpress/blocks';
import { 
	useBlockProps, 
	InspectorControls,
	RichText,
	BlockControls
} from '@wordpress/block-editor';
import { generateAccordionHTML } from './template';
import { 
	PanelBody, 
	TextControl, 
	ToggleControl,
	SelectControl,
	RangeControl,
	Button,
	ColorPicker,
	__experimentalRepeaterControl as RepeaterControl
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import './style.css';

registerBlockType('bootstrap-blocks/bs-accordion', {
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
			blockId
		} = attributes;

		// Generate unique block ID if not exists
		if (!blockId) {
			setAttributes({ blockId: `bs-accordion-${clientId}` });
		}

		const blockProps = useBlockProps({
			className: 'bs-accordion-container'
		});

		// Add new accordion item
		const addItem = () => {
			const newItem = {
				id: `item-${Date.now()}`,
				title: 'New Accordion Item',
				content: 'Add your content here...',
				isOpen: false
			};
			setAttributes({
				items: [...items, newItem]
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
				[newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
				setAttributes({ items: newItems });
			}
		};

		// Move item down
		const moveItemDown = (index) => {
			if (index < items.length - 1) {
				const newItems = [...items];
				[newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
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
							onChange={(value) => setAttributes({ allowMultipleOpen: value })}
							help="Allow multiple accordion items to be open at the same time"
						/>
						<ToggleControl
							label="Show Numbering"
							checked={showNumbering}
							onChange={(value) => setAttributes({ showNumbering: value })}
							help="Display numbers before each accordion title"
						/>
						<SelectControl
							label="Icon Style"
							value={iconStyle}
							options={[
								{ label: 'Plus/Minus', value: 'plus-minus' },
								{ label: 'Chevron', value: 'chevron' }
							]}
							onChange={(value) => setAttributes({ iconStyle: value })}
						/>
					</PanelBody>

					<PanelBody title="Style Settings" initialOpen={false}>
						<div style={{ marginBottom: '16px' }}>
							<label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
								Default Colors
							</label>
							<div style={{ display: 'flex', gap: '16px' }}>
								<div>
									<label style={{ display: 'block', marginBottom: '4px', fontSize: '12px' }}>
										Background
									</label>
									<input
										type="color"
										value={backgroundColor}
										onChange={(e) => setAttributes({ backgroundColor: e.target.value })}
										style={{ width: '40px', height: '30px', border: 'none', borderRadius: '4px' }}
									/>
								</div>
								<div>
									<label style={{ display: 'block', marginBottom: '4px', fontSize: '12px' }}>
										Text
									</label>
									<input
										type="color"
										value={textColor}
										onChange={(e) => setAttributes({ textColor: e.target.value })}
										style={{ width: '40px', height: '30px', border: 'none', borderRadius: '4px' }}
									/>
								</div>
							</div>
						</div>

						<div style={{ marginBottom: '16px' }}>
							<label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
								Active Item Colors
							</label>
							<div style={{ display: 'flex', gap: '16px' }}>
								<div>
									<label style={{ display: 'block', marginBottom: '4px', fontSize: '12px' }}>
										Background
									</label>
									<input
										type="color"
										value={activeBackgroundColor}
										onChange={(e) => setAttributes({ activeBackgroundColor: e.target.value })}
										style={{ width: '40px', height: '30px', border: 'none', borderRadius: '4px' }}
									/>
								</div>
								<div>
									<label style={{ display: 'block', marginBottom: '4px', fontSize: '12px' }}>
										Text
									</label>
									<input
										type="color"
										value={activeTextColor}
										onChange={(e) => setAttributes({ activeTextColor: e.target.value })}
										style={{ width: '40px', height: '30px', border: 'none', borderRadius: '4px' }}
									/>
								</div>
							</div>
						</div>

						<div style={{ marginBottom: '16px' }}>
							<label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
								Item Spacing
							</label>
							<RangeControl
								value={itemSpacing}
								onChange={(value) => setAttributes({ itemSpacing: value })}
								min={0}
								max={50}
								step={1}
								help="Space between accordion items (0-50px)"
							/>
						</div>

					</PanelBody>
				</InspectorControls>

				<div {...blockProps}>
					<div className="bs-accordion-editor">
						{items.map((item, index) => (
							<div 
								key={item.id} 
								className={`bs-accordion-item ${item.isOpen ? 'open' : ''}`}
								style={{ marginBottom: `${itemSpacing}px` }}
							>
								<div 
									className="bs-accordion-header"
									onClick={() => toggleItem(index)}
									style={{
										backgroundColor: item.isOpen ? activeBackgroundColor : backgroundColor,
										color: item.isOpen ? activeTextColor : textColor
									}}
								>
									<div className="bs-accordion-title">
										{showNumbering && <span className="bs-accordion-number">{index + 1}.</span>}
										<RichText
											tagName="span"
											value={item.title}
											onChange={(value) => updateItemTitle(index, value)}
											placeholder="Enter accordion title..."
											allowedFormats={['core/bold', 'core/italic']}
										/>
									</div>
									<div className="bs-accordion-icon">
										{iconStyle === 'plus-minus' ? (
											item.isOpen ? '−' : '+'
										) : (
											item.isOpen ? '⌄' : '⌃'
										)}
									</div>
								</div>
								
								{item.isOpen && (
									<div 
										className="bs-accordion-body"
										style={{
											backgroundColor: backgroundColor,
											color: textColor
										}}
									>
										<RichText
											tagName="div"
											value={item.content}
											onChange={(value) => updateItemContent(index, value)}
											placeholder="Enter accordion content..."
											allowedFormats={['core/bold', 'core/italic', 'core/link', 'core/strikethrough']}
										/>
									</div>
								)}

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
			className: 'bs-accordion-container'
		});

		return (
			<div {...blockProps} dangerouslySetInnerHTML={{
				__html: generateAccordionHTML(attributes)
			}} />
		);
	}
});
