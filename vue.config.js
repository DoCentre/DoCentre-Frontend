module.exports = {
  transpileDependencies: ["vuetify"],

  devServer: {
    port: 5173,
    allowedHosts: ["lab.codex.tw"],
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },

  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
  },
};
