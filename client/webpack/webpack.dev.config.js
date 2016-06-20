const webpack = require('webpack');
const config = require('./webpack.config.js');

config.watch = true;
config.devtool = 'cheap-module-eval-source-map';

config.plugins.push(new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify('development'),
    },
}));

module.exports = config;
