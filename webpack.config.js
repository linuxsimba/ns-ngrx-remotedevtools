const webpack = require("@nativescript/webpack");
const { NormalModuleReplacementPlugin } = require('webpack');

module.exports = (env) => {
	webpack.init(env);

	// Learn how to customize:
	// https://docs.nativescript.org/webpack

  webpack.chainWebpack(config => {
    config.plugin('NormalModuleReplacementPlugin').use(NormalModuleReplacementPlugin, [
      /^ws$/, "nativescript-websockets"
    ])
  })

	return webpack.resolveConfig();
};


