var path = require("path");

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'soda.js',
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
