const path = require('path');

module.exports = {
    entry: './game.ts',
    resolve: {
        modules: [
            "node_modules",
            path.resolve(__dirname, "src")
        ],
        extensions: [".ts",".js", ".json", ".jsx", ".css"],
    },
    output:{
        path: path.resolve(__dirname,'./dist'),
        publicPath: '/',
        filename: 'game.js',
        chunkFilename: 'lib/[name].[chunkhash:8].js',
    },
    module: {
        rules:
          [
            {
              test: /\.ts?$/,
              loader: 'ts-loader'
            },
          ]
    },
   
};