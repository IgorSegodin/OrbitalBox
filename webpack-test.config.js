const path = require('path');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const input = path.resolve(__dirname, "src");
const test_input = path.resolve(__dirname, "test");
const test_output = path.resolve(__dirname, 'test_dist');

module.exports = {
    entry: 'all-test.js',
    resolve: {
        modules: [input, test_input, "node_modules"]
    },
    output: {
        path: test_output,
        filename: 'testBundle.js'
    },
    mode: 'development',
    target: 'node',
    externals: [nodeExternals()],
    node: {
        fs: 'empty'
    },
    plugins: [
        new CleanWebpackPlugin([test_output]),
        new WebpackShellPlugin({
            onBuildExit: "mocha " + path.resolve(test_output, "testBundle.js")
        })
    ]
};