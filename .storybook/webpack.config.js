const path = require('path');

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

    return config;
};
