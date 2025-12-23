/**
 * Generate HTML for BS NAP block
 */
export const generateNAPHTML = (attributes) => {
	const {
		locationTitle = '',
		mapEmbedUrl = '',
		mapPosition = 'right',
		items = []
	} = attributes;

	const uniqueId = 'bs-nap-container';

	return `
		<div class="bs-nap-container" id="${uniqueId}">
			<div class="row">
				<div class="bs-nap-left mb-4 mb-lg-0 col-12 col-lg-6 col-xl-5" style="order: ${mapPosition === 'right' ? 1 : 2}">
					<h3 class="bs-nap-title">${locationTitle}</h3>
					<div class="bs-nap-items">
						${items.map(item => `
							<div class="bs-nap-item">
								<div class="bs-nap-item-icon">
									${item.iconUrl ? 
										`<img src="${item.iconUrl}" alt="${item.title}" class="bs-nap-icon-image" />` :
										`<div class="bs-nap-icon-placeholder">No Icon</div>`
									}
								</div>
								<div class="bs-nap-item-content">
									<h4>${item.title}</h4>
									<p>${item.content}</p>
								</div>
							</div>
						`).join('')}
					</div>
				</div>
				
				<div class="bs-nap-right col-12 col-lg-6 col-xl-7" style="order: ${mapPosition === 'right' ? 2 : 1}">
					<div class="ratio ratio-16x9">
						<iframe 
							src="${mapEmbedUrl}" 
							title="Map"
							allowfullscreen
							loading="lazy"
							style="border: 0;"
						></iframe>
					</div>
				</div>
			</div>
		</div>
	`;
};
