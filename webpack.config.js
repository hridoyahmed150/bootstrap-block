const defaultConfig = require('@wordpress/scripts/config/webpack.config');

module.exports = {
    ...defaultConfig,
    entry: {
        'bs-section': './src/bs-section/index.js',
        'bs-row': './src/bs-row/index.js',
        'bs-column': './src/bs-column/index.js',
        'bs-testimonial': './src/bs-testimonial/index.js',
        'bs-nap': './src/bs-nap/index.js',
        'bs-accordion': './src/bs-accordion/index.js',
        'bs-service-area': './src/bs-service-area/index.js',
        'bs-wrapper': './src/bs-wrapper/index.js',
        'bs-video': './src/bs-video/index.js'
    },
    output: {
        ...defaultConfig.output,
        filename: '[name]/index.js',
        path: __dirname + '/build',
    },
}; 