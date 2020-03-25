const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
module.exports = {
    configureWebpack: config => {
        const plugins = [];

        // Begin 生成 gzip 压缩文件
        plugins.push(
            new CompressionWebpackPlugin({
                filename: "[path].gz[query]",
                algorithm: "gzip",
                test: productionGzipExtensions,
                threshold: 10240,
                minRatio: 0.8
            })
        );
        // End 生成 gzip 压缩文件

        config.plugins = [...config.plugins, ...plugins];
    },
    devServer: {
        port: 8099, // 端口号
        host: 'localhost',
        open: true, //配置自动启动浏览器
        proxy: {//设置代理处理跨域问题
            '/api': {
                target: 'https://class.dvan.top:8080/',
                ws: false,
                changOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
    },
    publicPath: './'
}