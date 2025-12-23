export const generateServiceAreaHTML = (attributes) => {
	const {
		mapEmbedUrl = '',
		serviceAreas = [],
		titleColor = '#06AFE2',
		titleBackground = 'rgba(0, 97, 166, 0.03)',
		itemColor = '#000000',
		itemBackground = '#ffffff',
		itemHoverColor = '#ffffff',
		itemHoverBackground = '#06AFE2',
		mapPosition = 'left',
		mapListRatio = '8-4'
	} = attributes;

	// Generate unique ID for this block instance
	const uniqueId = 'bs-servicearea-container';

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

	// If both are missing, return empty
	if (!hasMap && !hasLocations) {
		return '';
	}

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

	// Generate inline styles for custom colors
	const generateStyles = () => {
		return `
			<style>
				#${uniqueId} .bs-servicearea-list h4 {
					color: ${titleColor};
					background: ${titleBackground};
				}
				
				#${uniqueId} .bs-servicearea-item a,
				#${uniqueId} .bs-servicearea-item span {
					color: ${itemColor};
					background-color: ${itemBackground};
				}
				
				#${uniqueId} .bs-servicearea-item a:hover {
					color: ${itemHoverColor};
					background-color: ${itemHoverBackground};
				}
			</style>
		`;
	};

	// Generate service areas list
	const generateServiceAreasList = () => {
		return serviceAreas.map((area, index) => {
			const cityName = area.cityName || `Service Area ${index + 1}`;
			return area.url ? 
				`<div class="bs-servicearea-item"><a href="${area.url}">${cityName}</a></div>` :
				`<div class="bs-servicearea-item"><span>${cityName}</span></div>`;
		}).join('');
	};

	// Generate map iframe
	const generateMapIframe = () => {
		if (!mapEmbedUrl) {
			return '';
		}

		return `
			<div class="ratio ratio-16x9">
				<iframe
					src="${mapEmbedUrl}"
					style="border: 0;"
					allowfullscreen=""
					loading="lazy"
					referrerpolicy="no-referrer-when-downgrade"
					title="Service Area Map"
				></iframe>
			</div>
		`;
	};

	return `
		${generateStyles()}
		<div class="row" id="${uniqueId}">
			<!-- Map Section -->
			<div class="${responsiveColumns.map} ${mapPosition === 'right' ? 'mt-4 mt-lg-0' : 'mb-4 mb-lg-0'}" style="order: ${mapPosition === 'right' ? 2 : 1}">
				${generateMapIframe()}
			</div>

			<!-- Service Area List -->
			<div class="${responsiveColumns.list}" style="order: ${mapPosition === 'right' ? 1 : 2}">
				<div class="bs-servicearea-list">
					<h4>Service Area</h4>
					<div class="bs-servicearea-items">
						${generateServiceAreasList()}
					</div>
				</div>
			</div>
		</div>
	`;
};
