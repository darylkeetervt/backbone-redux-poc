const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
    mode: 'development',
    watch: true,
    entry: './src',
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            '@babel/plugin-proposal-object-rest-spread',
                            '@babel/plugin-proposal-class-properties'
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new LiveReloadPlugin()
    ]
};
