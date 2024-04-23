const path = require('path')

module.exports = {
    entry: './assets/index.js',
    output: {
        filename: 'js-bundle.js',
        path: path.resolve(__dirname, '../backend/static/'),
    },
    module : {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: { presets: ['@babel/preset-env', '@babel/preset-react'] },
            },
        ]
    }
}