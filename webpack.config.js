var path = require("path");
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var es3ifyPlugin = require('es3ify-webpack-plugin');

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
        { test: /\.js$/,  loader: "babel-loader" }
      ]
    },

    node: {
        fs: "empty"
    },

    resolve:{
        alias: {
        }
    }
};

switch(ENV){
    // soda
    case 'build-uncom':
        config = Object.assign(config, {
            plugins: [
                new es3ifyPlugin()
            ]

        });
        break;

    //soda.min
    case 'build-min':
        config = Object.assign(config, {
            entry: {
                'soda.min': './src/index.js'
            },

            plugins: [
                new es3ifyPlugin(),
                new UglifyJSPlugin({
                  mangle: {
                    screw_ie8: false
                  },
                  mangleProperties: {
                    screw_ie8: false,
                    //ignore_quoted: true      // do not mangle quoted properties and object keys
                  },
                  compress: {
                    screw_ie8: false, 
                    //properties: false // optional: don't convert foo["bar"] to foo.bar
                  },
                  output: {
                    screw_ie8: false         
                  }

                })
            ]

        });

        break;


   // soda-all.js
   case 'build-node-uncom':
        config = Object.assign(config, {
            entry: {
                'soda.node': './node/index.js'
            },

            plugins: [
            ]

        });

        break;

   // soda-all.min
   case 'build-node-min':
        config = Object.assign(config, {
            entry: {
                'soda.node.min': './node/index.js'
            },
            plugins: [
                new UglifyJSPlugin()
            ]
        });

        break;
 

   case 'build-test':
        config = Object.assign(config, {
            entry: {
                'test.soda': './test/index.js'
            },
            resolve:{
                alias: {
                    './../node' : path.resolve(__dirname, "./dist/soda.js")
                }
            }
        });

        config.output.path = path.resolve('./test');

        break;

   case 'build-node-test':
        config = Object.assign(config, {
            entry: {
                'test.soda.node': './test/index.js'
            },
            resolve:{
                /*
                alias: {
                    './../node' : path.resolve(__dirname, "./dist/soda.js")
                }
                */
            }
        });

        config.output.path = path.resolve('./test');

        break;

}

module.exports = config;
