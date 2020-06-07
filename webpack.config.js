const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => ({
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/build/',
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './public/index.html' }),
    ],
    mode: "development",
    module: {
        rules: [],
    },
    devtool: "inline-source-map",
    devServer: {
        public: 'localhost:4200',
        host: '0.0.0.0',
        contentBase: path.join(__dirname, '/'),
        inline: true,
        clientLogLevel: 'error',
        open: true,
        openPage: 'public/',
        compress: true,
        port: 4200,
    },
});
