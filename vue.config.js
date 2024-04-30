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
      "/oauth": {
        target: "http://localhost:5273",
        changeOrigin: true,
        pathRewrite: {
          "^/oauth": "",
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
