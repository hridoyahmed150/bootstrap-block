import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl, Button, ButtonGroup, ToggleControl } from '@wordpress/components';
import { generateServiceAreaHTML } from './template';
import './style.css';

registerBlockType('bootstrap-blocks/bs-service-area', {
	edit: ({ attributes, setAttributes }) => {
		const { 
			mapEmbedUrl, 
			serviceAreas,
			titleColor,
			titleBackground,
			itemColor,
			itemBackground,
			itemHoverColor,
			itemHoverBackground,
			mapPosition,
			mapListRatio
		} = attributes;

		const addServiceArea = () => {
			const newAreas = [...serviceAreas, { cityName: '', url: '' }];
			setAttributes({ serviceAreas: newAreas });
		};

		const removeServiceArea = (index) => {
			const newAreas = serviceAreas.filter((_, i) => i !== index);
			setAttributes({ serviceAreas: newAreas });
		};

		const updateServiceArea = (index, field, value) => {
			const newAreas = [...serviceAreas];
			newAreas[index] = { ...newAreas[index], [field]: value };
			setAttributes({ serviceAreas: newAreas });
		};

		const moveServiceArea = (index, direction) => {
			const newAreas = [...serviceAreas];
			const targetIndex = direction === 'up' ? index - 1 : index + 1;
			
			if (targetIndex >= 0 && targetIndex < newAreas.length) {
				[newAreas[index], newAreas[targetIndex]] = [newAreas[targetIndex], newAreas[index]];
				setAttributes({ serviceAreas: newAreas });
			}
		};


		// Get column classes based on ratio
		const getColumnClasses = () => {
			const ratios = {
				'8-4': { map: 'col-12 col-lg-8', list: 'col-12 col-lg-4' },
				'6-6': { map: 'col-12 col-lg-6', list: 'col-12 col-lg-6' },
				'5-7': { map: 'col-12 col-lg-5', list: 'col-12 col-lg-7' }
			};
			return ratios[mapListRatio] || ratios['8-4'];
		};

		const columnClasses = getColumnClasses();

		// Check if we have content to display
		const hasMap = mapEmbedUrl && mapEmbedUrl.trim() !== '';
		const hasLocations = serviceAreas && serviceAreas.length > 0 && serviceAreas.some(area => area.cityName && area.cityName.trim() !== '');

		// Determine column classes based on what content is available
		const getResponsiveColumnClasses = () => {
			if (hasMap && hasLocations) {
				// Both present - use selected ratio
				return columnClasses;
			} else if (hasMap && !hasLocations) {
				// Only map - full width
				return { map: 'col-12', list: 'col-12 d-none' };
			} else {
				// Only locations - full width
				return { map: 'col-12 d-none', list: 'col-12' };
			}
		};

		const responsiveColumns = getResponsiveColumnClasses();

		return (
			<div {...useBlockProps({ className: 'bs-servicearea-container' })}>
				<InspectorControls>
					<PanelBody title={__('Map Settings', 'bootstrap-blocks')} initialOpen={true}>
						<TextControl
							label={__('Google Maps Embed URL', 'bootstrap-blocks')}
							value={mapEmbedUrl}
							onChange={(value) => setAttributes({ mapEmbedUrl: value })}
							help={__('Paste the Google Maps embed URL here', 'bootstrap-blocks')}
							__nextHasNoMarginBottom={true}
						/>

						<ToggleControl
							label={__('Map Position Right', 'bootstrap-blocks')}
							checked={mapPosition === 'right'}
							onChange={(value) => setAttributes({ mapPosition: value ? 'right' : 'left' })}
							help={__('Toggle to move map to the right side', 'bootstrap-blocks')}
							__nextHasNoMarginBottom={true}
						/>

						<SelectControl
							label={__('Map to List Ratio', 'bootstrap-blocks')}
							value={mapListRatio}
							options={[
								{ label: '2/3 - 1/3 (8/4 columns)', value: '8-4' },
								{ label: '1/2 - 1/2 (6/6 columns)', value: '6-6' },
								{ label: '5/12 - 7/12 (5/7 columns)', value: '5-7' }
							]}
							onChange={(value) => setAttributes({ mapListRatio: value })}
							help={__('Select the width ratio between map and list', 'bootstrap-blocks')}
							__nextHasNoMarginBottom={true}
						/>

					</PanelBody>

					<PanelBody title={__('Style Settings', 'bootstrap-blocks')} initialOpen={false}>
						<h3 style={{ marginTop: 0 }}>{__('Title Styles', 'bootstrap-blocks')}</h3>
						<TextControl
							label={__('Color', 'bootstrap-blocks')}
							value={titleColor}
							onChange={(value) => setAttributes({ titleColor: value })}
							help={__('Hex color code (e.g. #06AFE2)', 'bootstrap-blocks')}
							__nextHasNoMarginBottom={true}
						/>
						
						<TextControl
							label={__('Background', 'bootstrap-blocks')}
							value={titleBackground}
							onChange={(value) => setAttributes({ titleBackground: value })}
							help={__('Hex, RGB, or RGBA (e.g. rgba(0, 97, 166, 0.03))', 'bootstrap-blocks')}
							__nextHasNoMarginBottom={true}
						/>

						<h3>{__('Item Styles', 'bootstrap-blocks')}</h3>
						<TextControl
							label={__('Color', 'bootstrap-blocks')}
							value={itemColor}
							onChange={(value) => setAttributes({ itemColor: value })}
							help={__('Hex color code', 'bootstrap-blocks')}
							__nextHasNoMarginBottom={true}
						/>
						
						<TextControl
							label={__('Background', 'bootstrap-blocks')}
							value={itemBackground}
							onChange={(value) => setAttributes({ itemBackground: value })}
							help={__('Hex color code', 'bootstrap-blocks')}
							__nextHasNoMarginBottom={true}
						/>

						<h3>{__('Item Hover', 'bootstrap-blocks')}</h3>
						<TextControl
							label={__('Color', 'bootstrap-blocks')}
							value={itemHoverColor}
							onChange={(value) => setAttributes({ itemHoverColor: value })}
							help={__('Hex color code', 'bootstrap-blocks')}
							__nextHasNoMarginBottom={true}
						/>
						
						<TextControl
							label={__('Background', 'bootstrap-blocks')}
							value={itemHoverBackground}
							onChange={(value) => setAttributes({ itemHoverBackground: value })}
							help={__('Hex color code', 'bootstrap-blocks')}
							__nextHasNoMarginBottom={true}
						/>
					</PanelBody>

					<PanelBody title={__('Locations', 'bootstrap-blocks')} initialOpen={true}>
						{serviceAreas.map((area, index) => (
							<div key={index} style={{ 
								border: '1px solid #ddd', 
								padding: '12px', 
								marginBottom: '8px',
								borderRadius: '4px',
								backgroundColor: '#f9f9f9'
							}}>
								<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
									<strong>Location {index + 1}</strong>
									<ButtonGroup>
										<Button
											isSmall
											onClick={() => moveServiceArea(index, 'up')}
											disabled={index === 0}
										>
											↑
										</Button>
										<Button
											isSmall
											onClick={() => moveServiceArea(index, 'down')}
											disabled={index === serviceAreas.length - 1}
										>
											↓
										</Button>
										<Button
											isSmall
											isDestructive
											onClick={() => removeServiceArea(index)}
											disabled={serviceAreas.length === 1}
										>
											×
										</Button>
									</ButtonGroup>
								</div>
								
								<TextControl
									label={__('City Name', 'bootstrap-blocks')}
									value={area.cityName}
									onChange={(value) => updateServiceArea(index, 'cityName', value)}
									__nextHasNoMarginBottom={true}
								/>
								
								<TextControl
									label={__('URL (Optional)', 'bootstrap-blocks')}
									value={area.url}
									onChange={(value) => updateServiceArea(index, 'url', value)}
									help={__('Leave empty if no link needed', 'bootstrap-blocks')}
									__nextHasNoMarginBottom={true}
								/>
							</div>
						))}
						
						<Button
							variant="secondary"
							onClick={addServiceArea}
							style={{ width: '100%', marginTop: '8px' }}
						>
							+ Add Location
						</Button>
					</PanelBody>
				</InspectorControls>

				{!hasMap && !hasLocations ? (
					<div style={{ padding: '40px', textAlign: 'center', background: '#f0f0f0', border: '2px dashed #ccc', borderRadius: '8px' }}>
						<p style={{ margin: 0, color: '#666', fontSize: '16px' }}>
							{__('Please add a map URL or at least one location to display the service area block.', 'bootstrap-blocks')}
						</p>
					</div>
				) : (
					<div className="row">
						{/* Map Section */}
						<div className={`${responsiveColumns.map} ${mapPosition === 'right' ? 'mt-4 mt-lg-0' : 'mb-4 mb-lg-0'}`} style={{ order: mapPosition === 'right' ? 2 : 1 }}>
						{mapEmbedUrl ? (
							<div className="ratio ratio-16x9">
								<iframe
									src={mapEmbedUrl}
									style={{ border: 0 }}
									allowFullScreen=""
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
									title="Service Area Map"
								/>
							</div>
						) : (
							<div className="ratio ratio-16x9" style={{ 
								backgroundColor: '#f0f0f0', 
								display: 'flex', 
								alignItems: 'center', 
								justifyContent: 'center',
								border: '2px dashed #ccc'
							}}>
								<p style={{ margin: 0, color: '#666' }}>
									{__('Add Google Maps Embed URL in block settings', 'bootstrap-blocks')}
								</p>
							</div>
						)}
					</div>

					{/* Service Area List */}
					<div className={responsiveColumns.list} style={{ order: mapPosition === 'right' ? 1 : 2 }}>
						<div className="bs-servicearea-list">
							<h4>Service Area</h4>
							<div className="bs-servicearea-items">
								{serviceAreas.map((area, index) => (
									<div key={index} className="bs-servicearea-item">
										{area.url ? (
											<a href={area.url}>{area.cityName || `Service Area ${index + 1}`}</a>
										) : (
											<span>{area.cityName || `Service Area ${index + 1}`}</span>
										)}
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
				)}
			</div>
		);
	},

	save: ({ attributes }) => {
		return (
			<div {...useBlockProps.save({ className: 'bs-servicearea-container' })}>
				<div dangerouslySetInnerHTML={{ __html: generateServiceAreaHTML(attributes) }} />
			</div>
		);
	}
});
