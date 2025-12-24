/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/bs-service-area/index.js":
/*!**************************************!*\
  !*** ./src/bs-service-area/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./template */ "./src/bs-service-area/template.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./style.css */ "./src/bs-service-area/style.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);







(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('bootstrap-blocks/bs-service-area', {
  edit: ({
    attributes,
    setAttributes
  }) => {
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
      const newAreas = [...serviceAreas, {
        cityName: '',
        url: ''
      }];
      setAttributes({
        serviceAreas: newAreas
      });
    };
    const removeServiceArea = index => {
      const newAreas = serviceAreas.filter((_, i) => i !== index);
      setAttributes({
        serviceAreas: newAreas
      });
    };
    const updateServiceArea = (index, field, value) => {
      const newAreas = [...serviceAreas];
      newAreas[index] = {
        ...newAreas[index],
        [field]: value
      };
      setAttributes({
        serviceAreas: newAreas
      });
    };
    const moveServiceArea = (index, direction) => {
      const newAreas = [...serviceAreas];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex >= 0 && targetIndex < newAreas.length) {
        [newAreas[index], newAreas[targetIndex]] = [newAreas[targetIndex], newAreas[index]];
        setAttributes({
          serviceAreas: newAreas
        });
      }
    };

    // Get column classes based on ratio
    const getColumnClasses = () => {
      const ratios = {
        '8-4': {
          map: 'col-12 col-lg-8',
          list: 'col-12 col-lg-4'
        },
        '6-6': {
          map: 'col-12 col-lg-6',
          list: 'col-12 col-lg-6'
        },
        '5-7': {
          map: 'col-12 col-lg-5',
          list: 'col-12 col-lg-7'
        }
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
        return {
          map: 'col-12',
          list: 'col-12 d-none'
        };
      } else {
        // Only locations - full width
        return {
          map: 'col-12 d-none',
          list: 'col-12'
        };
      }
    };
    const responsiveColumns = getResponsiveColumnClasses();
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)({
        className: 'bs-servicearea-container'
      }),
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Map Settings', 'bootstrap-blocks'),
          initialOpen: true,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Google Maps Embed URL', 'bootstrap-blocks'),
            value: mapEmbedUrl,
            onChange: value => setAttributes({
              mapEmbedUrl: value
            }),
            help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Paste the Google Maps embed URL here', 'bootstrap-blocks'),
            __nextHasNoMarginBottom: true
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Map Position Right', 'bootstrap-blocks'),
            checked: mapPosition === 'right',
            onChange: value => setAttributes({
              mapPosition: value ? 'right' : 'left'
            }),
            help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Toggle to move map to the right side', 'bootstrap-blocks'),
            __nextHasNoMarginBottom: true
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Map to List Ratio', 'bootstrap-blocks'),
            value: mapListRatio,
            options: [{
              label: '2/3 - 1/3 (8/4 columns)',
              value: '8-4'
            }, {
              label: '1/2 - 1/2 (6/6 columns)',
              value: '6-6'
            }, {
              label: '5/12 - 7/12 (5/7 columns)',
              value: '5-7'
            }],
            onChange: value => setAttributes({
              mapListRatio: value
            }),
            help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select the width ratio between map and list', 'bootstrap-blocks'),
            __nextHasNoMarginBottom: true
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Style Settings', 'bootstrap-blocks'),
          initialOpen: false,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h3", {
            style: {
              marginTop: 0
            },
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Title Styles', 'bootstrap-blocks')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Color', 'bootstrap-blocks'),
            value: titleColor,
            onChange: value => setAttributes({
              titleColor: value
            }),
            help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Hex color code (e.g. #06AFE2)', 'bootstrap-blocks'),
            __nextHasNoMarginBottom: true
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background', 'bootstrap-blocks'),
            value: titleBackground,
            onChange: value => setAttributes({
              titleBackground: value
            }),
            help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Hex, RGB, or RGBA (e.g. rgba(0, 97, 166, 0.03))', 'bootstrap-blocks'),
            __nextHasNoMarginBottom: true
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h3", {
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Item Styles', 'bootstrap-blocks')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Color', 'bootstrap-blocks'),
            value: itemColor,
            onChange: value => setAttributes({
              itemColor: value
            }),
            help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Hex color code', 'bootstrap-blocks'),
            __nextHasNoMarginBottom: true
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background', 'bootstrap-blocks'),
            value: itemBackground,
            onChange: value => setAttributes({
              itemBackground: value
            }),
            help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Hex color code', 'bootstrap-blocks'),
            __nextHasNoMarginBottom: true
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h3", {
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Item Hover', 'bootstrap-blocks')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Color', 'bootstrap-blocks'),
            value: itemHoverColor,
            onChange: value => setAttributes({
              itemHoverColor: value
            }),
            help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Hex color code', 'bootstrap-blocks'),
            __nextHasNoMarginBottom: true
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background', 'bootstrap-blocks'),
            value: itemHoverBackground,
            onChange: value => setAttributes({
              itemHoverBackground: value
            }),
            help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Hex color code', 'bootstrap-blocks'),
            __nextHasNoMarginBottom: true
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Locations', 'bootstrap-blocks'),
          initialOpen: true,
          children: [serviceAreas.map((area, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            style: {
              border: '1px solid #ddd',
              padding: '12px',
              marginBottom: '8px',
              borderRadius: '4px',
              backgroundColor: '#f9f9f9'
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px'
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("strong", {
                children: ["Location ", index + 1]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ButtonGroup, {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
                  isSmall: true,
                  onClick: () => moveServiceArea(index, 'up'),
                  disabled: index === 0,
                  children: "\u2191"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
                  isSmall: true,
                  onClick: () => moveServiceArea(index, 'down'),
                  disabled: index === serviceAreas.length - 1,
                  children: "\u2193"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
                  isSmall: true,
                  isDestructive: true,
                  onClick: () => removeServiceArea(index),
                  disabled: serviceAreas.length === 1,
                  children: "\xD7"
                })]
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('City Name', 'bootstrap-blocks'),
              value: area.cityName,
              onChange: value => updateServiceArea(index, 'cityName', value),
              __nextHasNoMarginBottom: true
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('URL (Optional)', 'bootstrap-blocks'),
              value: area.url,
              onChange: value => updateServiceArea(index, 'url', value),
              help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Leave empty if no link needed', 'bootstrap-blocks'),
              __nextHasNoMarginBottom: true
            })]
          }, index)), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
            variant: "secondary",
            onClick: addServiceArea,
            style: {
              width: '100%',
              marginTop: '8px'
            },
            children: "+ Add Location"
          })]
        })]
      }), !hasMap && !hasLocations ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        style: {
          padding: '40px',
          textAlign: 'center',
          background: '#f0f0f0',
          border: '2px dashed #ccc',
          borderRadius: '8px'
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
          style: {
            margin: 0,
            color: '#666',
            fontSize: '16px'
          },
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Please add a map URL or at least one location to display the service area block.', 'bootstrap-blocks')
        })
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        className: "row",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          className: `${responsiveColumns.map} ${mapPosition === 'right' ? 'mt-4 mt-lg-0' : 'mb-4 mb-lg-0'}`,
          style: {
            order: mapPosition === 'right' ? 2 : 1
          },
          children: mapEmbedUrl ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            className: "ratio ratio-16x9",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("iframe", {
              src: mapEmbedUrl,
              style: {
                border: 0
              },
              allowFullScreen: "",
              loading: "lazy",
              referrerPolicy: "no-referrer-when-downgrade",
              title: "Service Area Map"
            })
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            className: "ratio ratio-16x9",
            style: {
              backgroundColor: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px dashed #ccc'
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
              style: {
                margin: 0,
                color: '#666'
              },
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add Google Maps Embed URL in block settings', 'bootstrap-blocks')
            })
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          className: responsiveColumns.list,
          style: {
            order: mapPosition === 'right' ? 1 : 2
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            className: "bs-servicearea-list",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h4", {
              children: "Service Area"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
              className: "bs-servicearea-items",
              children: serviceAreas.map((area, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                className: "bs-servicearea-item",
                children: area.url ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("a", {
                  href: area.url,
                  children: area.cityName || `Service Area ${index + 1}`
                }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
                  children: area.cityName || `Service Area ${index + 1}`
                })
              }, index))
            })]
          })
        })]
      })]
    });
  },
  save: ({
    attributes
  }) => {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      ..._wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps.save({
        className: 'bs-servicearea-container'
      }),
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        dangerouslySetInnerHTML: {
          __html: (0,_template__WEBPACK_IMPORTED_MODULE_4__.generateServiceAreaHTML)(attributes)
        }
      })
    });
  }
});

/***/ }),

/***/ "./src/bs-service-area/style.css":
/*!***************************************!*\
  !*** ./src/bs-service-area/style.css ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/bs-service-area/template.js":
/*!*****************************************!*\
  !*** ./src/bs-service-area/template.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateServiceAreaHTML: () => (/* binding */ generateServiceAreaHTML)
/* harmony export */ });
const generateServiceAreaHTML = attributes => {
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
      '8-4': {
        map: 'col-12 col-lg-8',
        list: 'col-12 col-lg-4'
      },
      '6-6': {
        map: 'col-12 col-lg-6',
        list: 'col-12 col-lg-6'
      },
      '5-7': {
        map: 'col-12 col-lg-5',
        list: 'col-12 col-lg-7'
      }
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
      return {
        map: 'col-12',
        list: 'col-12 d-none'
      };
    } else {
      // Only locations - full width
      return {
        map: 'col-12 d-none',
        list: 'col-12'
      };
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
      return area.url ? `<div class="bs-servicearea-item"><a href="${area.url}">${cityName}</a></div>` : `<div class="bs-servicearea-item"><span>${cityName}</span></div>`;
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

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"bs-service-area": 0,
/******/ 			"./style-bs-service-area": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkbootstrap_blocks"] = globalThis["webpackChunkbootstrap_blocks"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-bs-service-area"], () => (__webpack_require__("./src/bs-service-area/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map