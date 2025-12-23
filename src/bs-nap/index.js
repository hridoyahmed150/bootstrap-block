import { registerBlockType } from '@wordpress/blocks';
import { 
	useBlockProps, 
	InspectorControls,
	RichText,
	MediaUpload,
	MediaUploadCheck,
	MediaPlaceholder
} from '@wordpress/block-editor';
import { generateNAPHTML } from './template';
import { 
	PanelBody, 
	TextControl, 
	Button, 
	IconButton,
	RangeControl,
	SelectControl,
	ToggleControl,
	__experimentalRepeaterControl as RepeaterControl,
	__experimentalRepeaterControlItem as RepeaterControlItem
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import './style.css';

registerBlockType('bootstrap-blocks/bs-nap', {
	edit: ({ attributes, setAttributes }) => {
		const {
			locationTitle,
			mapEmbedUrl,
			mapPosition,
			items
		} = attributes;

		const blockProps = useBlockProps({
			className: 'bs-nap-block'
		});

		// Add new item
		const addItem = () => {
			const newItem = {
				id: `item-${Date.now()}`,
				iconUrl: '',
				title: 'New Item',
				content: 'Enter content here'
			};
			setAttributes({
				items: [...items, newItem]
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

		return (
			<>
				<InspectorControls>
					<PanelBody title="Location Settings" initialOpen={true}>
						<TextControl
							label="Location Title"
							value={locationTitle}
							onChange={(value) => setAttributes({ locationTitle: value })}
							__nextHasNoMarginBottom={true}
						/>
					</PanelBody>

					<PanelBody title="Map Settings" initialOpen={true}>
						<TextControl
							label="Map Embed URL"
							value={mapEmbedUrl}
							onChange={(value) => setAttributes({ mapEmbedUrl: value })}
							help="Paste the embed URL from Google Maps or other map services"
							__nextHasNoMarginBottom={true}
						/>

						<ToggleControl
							label="Map Position Left"
							checked={mapPosition === 'left'}
							onChange={(value) => setAttributes({ mapPosition: value ? 'left' : 'right' })}
							help="Toggle to move map to the left side"
							__nextHasNoMarginBottom={true}
						/>
					</PanelBody>

					<PanelBody title="Contact Items" initialOpen={true}>
						{items.map((item, index) => (
							<div key={item.id} style={{ 
								border: '1px solid #ddd', 
								padding: '15px', 
								marginBottom: '10px',
								borderRadius: '4px'
							}}>
								<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
									<strong>Item {index + 1}</strong>
									<IconButton
										icon="trash"
										onClick={() => removeItem(index)}
										label="Remove Item"
										isDestructive
									/>
								</div>
								
								<div style={{ marginBottom: '15px' }}>
									<label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Icon Image</label>
									<MediaUploadCheck>
										<MediaUpload
											onSelect={(media) => updateItem(index, 'iconUrl', media.url)}
											allowedTypes={['image']}
											value={item.iconUrl}
											render={({ open }) => (
												<div>
													{item.iconUrl ? (
														<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
															<img 
																src={item.iconUrl} 
																alt="Icon" 
																style={{ width: '44px', height: '44px', objectFit: 'contain' }}
															/>
															<Button onClick={open} variant="secondary" size="small">
																Change Icon
															</Button>
															<Button 
																onClick={() => updateItem(index, 'iconUrl', '')} 
																variant="link" 
																isDestructive
																size="small"
															>
																Remove
															</Button>
														</div>
													) : (
														<Button onClick={open} variant="secondary">
															Select Icon Image
														</Button>
													)}
												</div>
											)}
										/>
									</MediaUploadCheck>
								</div>
								
								<TextControl
									label="Title"
									value={item.title}
									onChange={(value) => updateItem(index, 'title', value)}
									__nextHasNoMarginBottom={true}
								/>
								
								<div style={{ marginBottom: '15px' }}>
									<label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Content</label>
									<RichText
										tagName="p"
										value={item.content}
										onChange={(value) => updateItem(index, 'content', value)}
										allowedFormats={['core/bold', 'core/italic', 'core/link', 'core/strikethrough']}
										placeholder="Enter content here..."
										style={{ minHeight: '80px' }}
									/>
									<p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
										You can use HTML tags like &lt;br&gt;, &lt;span&gt;, &lt;a&gt;, etc.
									</p>
								</div>
							</div>
						))}
						
						<Button 
							variant="primary" 
							onClick={addItem}
							icon="plus"
						>
							Add New Item
						</Button>
					</PanelBody>
				</InspectorControls>

				<div {...blockProps}>
					<div className="bs-nap-container">
						<div className="row">
							<div className="bs-nap-left col-12 col-lg-6 col-xl-5" style={{ order: mapPosition === 'right' ? 1 : 2 }}>
								<h3 className="bs-nap-title">{locationTitle}</h3>
								<div className="bs-nap-items">
									{items.map((item, index) => (
										<div key={item.id} className="bs-nap-item">
											<div className="bs-nap-item-icon">
												{item.iconUrl ? (
													<img 
														src={item.iconUrl} 
														alt={item.title} 
														style={{ width: '44px', height: '44px', objectFit: 'contain' }}
													/>
												) : (
													<div style={{ 
														width: '44px', 
														height: '44px', 
														backgroundColor: '#f0f0f0', 
														display: 'flex', 
														alignItems: 'center', 
														justifyContent: 'center',
														borderRadius: '4px',
														color: '#999',
														fontSize: '12px'
													}}>
														No Icon
													</div>
												)}
											</div>
											<div className="bs-nap-item-content">
												<h4>{item.title}</h4>
												<RichText.Content value={item.content} />
											</div>
										</div>
									))}
								</div>
							</div>
							
							<div className="bs-nap-right col-12 col-lg-6 col-xl-7" style={{ order: mapPosition === 'right' ? 2 : 1 }}>
								<div className="ratio ratio-16x9">
									<iframe 
										src={mapEmbedUrl} 
										title="Map"
										allowFullScreen
										loading="lazy"
										style={{ border: 0 }}
									></iframe>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	},

	save: ({ attributes }) => {
		const {
			locationTitle,
			mapEmbedUrl,
			bootstrapVersion,
			embedRatio,
			items
		} = attributes;

		const blockProps = useBlockProps.save({
			className: 'bs-nap-container'
		});

		return (
			<div {...blockProps} dangerouslySetInnerHTML={{
				__html: generateNAPHTML(attributes)
			}} />
		);
	}
});
