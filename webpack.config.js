var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './streamfield_alt/static/streamfield_alt/streamfield.js',
    output: {
      libraryTarget: 'var',
      library: 'StreamFieldReact',
      path: 'streamfield_alt/static/streamfield_alt/compiled/',
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
    // externals: {
    //     react: 'React',
    //     'react-dom': 'ReactDOM',
    // }
}
