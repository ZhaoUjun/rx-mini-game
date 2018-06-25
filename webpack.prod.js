const commonConfig=require('./webpack.common')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const patterns=[
    {
        from:'./game.json',to:'./game.json'
    }
]
module.exports={
    mode:'production',
    ...commonConfig,
    // optimization: {
    //     minimize: true
    // },
    plugins: [
        new CopyWebpackPlugin([ ...patterns ]),
        new CleanWebpackPlugin([
            'dist/**.js',
            'dist/**.js.map',
        ])
    ],
}