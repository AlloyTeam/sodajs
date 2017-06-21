var path = require("path");
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

var ENV = process.env.npm_lifecycle_event;

var config = {
    entry: {
        'soda': './src/index.js'
    },
    output: {
        filename: '[name].js',
        library: 'soda',
        path: path.resolve('./dist'),
        libraryTarget: 'umd'
    },

    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
      ]
    },


    resolve:{
        alias: {
        }
    }
};

if(ENV === 'build-min'){
    config = Object.assign(config, {
        entry: {
            'soda.min': './src/index.js'
        },

        plugins: [
            new UglifyJSPlugin()
        ]

    });
}

module.exports = config;
