var path = require('path');
var webpack = require('webpack');

var config = {
    entry: './client/src/streamfield.entry.js',
    output: {
      libraryTarget: 'var',
      library: 'StreamFieldReact',
      path: 'streamfield_alt/static/streamfield_alt/js/',
      filename: 'streamfield.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    plugins: [],
    // externals: {
    //     react: 'React',
    //     'react-dom': 'ReactDOM',
    // }
};

config.plugins.push(new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify('production'),
    },
}));

module.exports = config;
