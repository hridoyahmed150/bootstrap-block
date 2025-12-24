/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/bs-video/index.js":
/*!*******************************!*\
  !*** ./src/bs-video/index.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style.css */ "./src/bs-video/style.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);






/**
 * Parse video URL and extract provider and embed URL
 * @param {string} url - Video URL to parse
 * @returns {Object} { provider: 'youtube'|'vimeo'|null, embed: string, videoId: string }
 */

function parseVideoURL(url) {
  if (!url || !url.trim()) {
    return {
      provider: null,
      embed: '',
      videoId: ''
    };
  }
  const trimmedUrl = url.trim();

  // YouTube URL patterns
  const youtubeWatchMatch = trimmedUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  const youtubeEmbedMatch = trimmedUrl.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
  if (youtubeWatchMatch || youtubeEmbedMatch) {
    const videoId = youtubeWatchMatch && youtubeWatchMatch[1] || youtubeEmbedMatch && youtubeEmbedMatch[1];
    return {
      provider: 'youtube',
      embed: `https://www.youtube.com/embed/${videoId}?rel=0`,
      videoId: videoId
    };
  }

  // Vimeo URL patterns
  const vimeoMatch = trimmedUrl.match(/vimeo\.com\/(?:.*\/)?(\d+)/);
  const vimeoPlayerMatch = trimmedUrl.match(/player\.vimeo\.com\/video\/(\d+)/);
  if (vimeoMatch || vimeoPlayerMatch) {
    const videoId = vimeoMatch && vimeoMatch[1] || vimeoPlayerMatch && vimeoPlayerMatch[1];
    return {
      provider: 'vimeo',
      embed: `https://player.vimeo.com/video/${videoId}`,
      videoId: videoId
    };
  }
  return {
    provider: null,
    embed: '',
    videoId: ''
  };
}
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('bootstrap-blocks/bs-video', {
  edit({
    attributes,
    setAttributes
  }) {
    const {
      videoURL,
      embedURL,
      provider,
      bootstrapVersion,
      aspectRatio,
      videoTitle,
      lazyLoad,
      autoplay
    } = attributes;
    const [parsedVideo, setParsedVideo] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(() => parseVideoURL(videoURL));

    // Update parsed video when videoURL changes
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
      const parsed = parseVideoURL(videoURL);
      setParsedVideo(parsed);

      // Update embed URL and provider if valid
      if (parsed.provider && parsed.embed) {
        setAttributes({
          embedURL: parsed.embed,
          provider: parsed.provider
        });
      } else {
        setAttributes({
          embedURL: '',
          provider: ''
        });
      }
    }, [videoURL, setAttributes]);

    // Build iframe src with optional autoplay
    const getIframeSrc = () => {
      if (!embedURL) return '';
      let src = embedURL;

      // Add autoplay parameter for supported providers
      if (autoplay) {
        if (provider === 'youtube') {
          src += src.includes('?') ? '&autoplay=1' : '?autoplay=1';
        } else if (provider === 'vimeo') {
          src += src.includes('?') ? '&autoplay=1' : '?autoplay=1';
        }
      }
      return src;
    };
    const iframeSrc = getIframeSrc();
    const hasValidVideo = provider && embedURL;

    // Bootstrap 4 ratio mapping
    const getBootstrap4Ratio = ratio => {
      const mapping = {
        '16x9': '16by9',
        '4x3': '4by3',
        '21x9': '21by9',
        '1x1': '1by1'
      };
      return mapping[ratio] || '16by9';
    };
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
      className: hasValidVideo ? 'bs-video-block' : 'bs-video-block bs-video-block-empty'
    });
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
          title: "Video Settings",
          initialOpen: true,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
            label: "Video URL",
            value: videoURL || '',
            onChange: value => setAttributes({
              videoURL: value
            }),
            help: "Enter YouTube or Vimeo video URL. Examples: https://www.youtube.com/watch?v=VIDEO_ID or https://vimeo.com/VIDEO_ID"
          }), hasValidVideo && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
              label: "Video Title",
              value: videoTitle || 'Video',
              onChange: value => setAttributes({
                videoTitle: value || 'Video'
              }),
              help: "Accessible title for the video iframe"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
              label: "Aspect Ratio",
              value: aspectRatio || '16x9',
              options: [{
                label: '16:9',
                value: '16x9'
              }, {
                label: '4:3',
                value: '4x3'
              }, {
                label: '21:9',
                value: '21x9'
              }, {
                label: '1:1',
                value: '1x1'
              }],
              onChange: value => setAttributes({
                aspectRatio: value
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
              label: "Use Bootstrap 5",
              checked: bootstrapVersion !== false,
              onChange: value => setAttributes({
                bootstrapVersion: value
              }),
              help: bootstrapVersion ? "Using Bootstrap 5 ratio classes" : "Using Bootstrap 4 embed-responsive classes"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
              label: "Lazy Load",
              checked: lazyLoad || false,
              onChange: value => setAttributes({
                lazyLoad: value
              }),
              help: "Load video only when it's about to enter the viewport"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
              label: "Autoplay",
              checked: autoplay || false,
              onChange: value => setAttributes({
                autoplay: value
              }),
              help: "Automatically play video when page loads (may not work on mobile)"
            })]
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        ...blockProps,
        children: !hasValidVideo ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
          style: {
            padding: '40px 20px',
            textAlign: 'center',
            border: '2px dashed #ccc',
            borderRadius: '4px',
            backgroundColor: '#f9f9f9'
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("p", {
            style: {
              margin: 0,
              color: '#666'
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("strong", {
              children: "BS Video Block"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("br", {}), "Enter a YouTube or Vimeo URL in the sidebar to embed a video."]
          })
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
          children: bootstrapVersion ?
          /*#__PURE__*/
          // Bootstrap 5
          (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
            className: `ratio ratio-${aspectRatio || '16x9'}`,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("iframe", {
              src: iframeSrc,
              title: videoTitle || 'Video',
              allowFullScreen: true,
              loading: lazyLoad ? 'lazy' : 'eager',
              frameBorder: "0",
              allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            })
          }) :
          /*#__PURE__*/
          // Bootstrap 4
          (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
            className: `embed-responsive embed-responsive-${getBootstrap4Ratio(aspectRatio || '16x9')}`,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("iframe", {
              className: "embed-responsive-item",
              src: iframeSrc,
              title: videoTitle || 'Video',
              allowFullScreen: true,
              loading: lazyLoad ? 'lazy' : 'eager',
              frameBorder: "0",
              allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            })
          })
        })
      })]
    });
  },
  save({
    attributes
  }) {
    const {
      embedURL,
      provider,
      bootstrapVersion,
      aspectRatio,
      videoTitle,
      lazyLoad,
      autoplay
    } = attributes;
    if (!provider || !embedURL) {
      return null;
    }

    // Build iframe src with optional autoplay
    let iframeSrc = embedURL;
    if (autoplay) {
      if (provider === 'youtube') {
        iframeSrc += iframeSrc.includes('?') ? '&autoplay=1' : '?autoplay=1';
      } else if (provider === 'vimeo') {
        iframeSrc += iframeSrc.includes('?') ? '&autoplay=1' : '?autoplay=1';
      }
    }

    // Bootstrap 4 ratio mapping
    const getBootstrap4Ratio = ratio => {
      const mapping = {
        '16x9': '16by9',
        '4x3': '4by3',
        '21x9': '21by9',
        '1x1': '1by1'
      };
      return mapping[ratio] || '16by9';
    };
    if (bootstrapVersion) {
      // Bootstrap 5
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: `ratio ratio-${aspectRatio || '16x9'}`,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("iframe", {
          src: iframeSrc,
          title: videoTitle || 'Video',
          allowFullScreen: true,
          loading: lazyLoad ? 'lazy' : 'eager',
          frameBorder: "0",
          allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        })
      });
    } else {
      // Bootstrap 4
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: `embed-responsive embed-responsive-${getBootstrap4Ratio(aspectRatio || '16x9')}`,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("iframe", {
          className: "embed-responsive-item",
          src: iframeSrc,
          title: videoTitle || 'Video',
          allowFullScreen: true,
          loading: lazyLoad ? 'lazy' : 'eager',
          frameBorder: "0",
          allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        })
      });
    }
  }
});

/***/ }),

/***/ "./src/bs-video/style.css":
/*!********************************!*\
  !*** ./src/bs-video/style.css ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

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
/******/ 			"bs-video": 0,
/******/ 			"./style-bs-video": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-bs-video"], () => (__webpack_require__("./src/bs-video/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map