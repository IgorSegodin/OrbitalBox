const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const buildProps = getBuildProps();

const input = path.resolve(__dirname, "src");
const output = path.resolve(__dirname, buildProps.targetDirName || 'dist');


function getBuildProps() {
    const rawArgs = process.argv.slice(2);
    const props = {};

    rawArgs.forEach(a => {
        const arr = /--((?:\w|\d)+)=(.+)/g.exec(a);
        if (arr) {
            props[arr[1]] = arr[2];
        }
    });
    return props;
}

module.exports = {
    entry: {
        "App": "App.js"
    },
    resolve: {
        modules: [input, "node_modules"]
    },
    output: {
        path: output,
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    // devtool: 'inline-source-map',
    devtool: 'eval-source-map',
    mode: 'development',
    devServer: {
        contentBase: output,
        compress: false,
        host: "0.0.0.0",
        port: 8080
    },
    plugins: [
        new CleanWebpackPlugin([output]),
        new HtmlWebpackPlugin({
            title: 'Orbital box',
            inject: 'head',
            favicon: path.resolve(input, "favico.ico"),
            hash: true,
            template: path.resolve(input, "index.html")
        }),
        // new UglifyJSPlugin({
        // 	sourceMap: true
        // })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    }
};