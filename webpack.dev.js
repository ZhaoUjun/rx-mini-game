const commonConfig=require('./webpack.common')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const patterns=[
    {
        from:'./game.json',to:'./game.json'
    }
]
module.exports={
    mode:'development',
    ...commonConfig,
    devtool: 'source-map',
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    plugins: [
        new CopyWebpackPlugin([ ...patterns ])
    ],
}