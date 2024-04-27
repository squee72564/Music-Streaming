const path = require('path')

module.exports = {
    entry: './src/index.jsx',
    output: {
        filename: 'js-bundle.js',
        path: path.resolve(__dirname, '../backend/static_files/js/'),
    },
    module : {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
}