const path = require('path');
const MinimalSvtstoreWebpackPlugin = require('minimal-svgstore-webpack-plugin');

module.exports = async ({ config }) => {
    config.module.rules.push({
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, '../'),
    });

    config.module.rules.push( {
        test: /\.svg$/,
        use: 'minimal-svgstore-loader',
    });

    config.plugins.push(new MinimalSvtstoreWebpackPlugin({
        prefix: 'pb-story-icon-',
    }));

    return config;
};
