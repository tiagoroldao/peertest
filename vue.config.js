module.exports = {
    lintOnSave: false,
    publicPath: process.env.NODE_ENV === 'production'
        ? '/peertest/'
        : '/',
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'development') {
            config.devtool = 'eval-source-map';
            config.output.devtoolFallbackModuleFilenameTemplate = 'webpack:///[resource-path]?[hash]';
            config.output.devtoolModuleFilenameTemplate = (info) => {
                const isVue = info.resourcePath.match(/\.vue$/);
                const isScript = info.identifier.match(/type=script/);
                return isVue && !isScript
                    ? `webpack-vue:///${info.resourcePath}`
                    : `webpack-generated:///${info.resourcePath}?${info.hash}`;
            };
        }
    },
};
