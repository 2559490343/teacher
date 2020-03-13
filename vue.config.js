
module.exports = {
    devServer: {
        port: 8099, // 端口号
        host: 'localhost',
        open: true, //配置自动启动浏览器
        proxy: {//设置代理处理跨域问题
            '/api': {
                target: 'http://39.108.209.99:8080/',
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