const path = require('path');
const miniCss = require('mini-css-extract-plugin');
const loader = require('sass-loader');

module.exports = {
    entry: ['./src/index.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    devServer: {
        contentBase: path.resolve(__dirname, "public"),
        watchContentBase: true,
        open: true,
        port: 1338,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                loader: 'babel-loader',
                },
            },
            {
                test:/\.(s*)css$/,
                use: [
                    miniCss.loader,
                    'css-loader?url=false',
                    'postcss-loader',
                    'sass-loader?sourceMap',
                ],
            },
        ]
    },
    plugins: [
        new miniCss({
           filename: './css/styles.min.css',
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devtool: 'source-map',
};