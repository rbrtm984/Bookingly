const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: './client/src/app.tsx', 
    output: {
        path: path.resolve(__dirname, 'client/dist'),
        filename: 'bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
        template: "./client/src/index.html", // to import index.html file inside index.js
    })],
    devServer: {
        static: {
            directory: path.join(__dirname, 'client/src'),
        },
        port: 8080,
        proxy: {
            '/api': {
            target: 'http://localhost:3000',
            pathRewrite: { '^/api': '' },
            changeOrigin: true
    }}},
    module: {
        rules: [{
            test: /\.jsx?/, 
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader', 
                options: {
                    presets: [['@babel/preset-env', {targets: "defaults"}], 
                    ['@babel/preset-react', {targets:"defaults"}]]}
                }},
            {
            test: /\.css$/, // styles files
            use: ["style-loader", "css-loader"], 
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
}