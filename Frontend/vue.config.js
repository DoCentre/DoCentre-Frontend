const HOST = process.env.VUE_APP_HOST || "localhost";

module.exports = {
  transpileDependencies: ["vuetify"],

  devServer: {
    port: 5173,
    allowedHosts: [HOST],
    proxy: {
      "/api": {
        target: "http://" + HOST + ":8080",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
      "/oauth": {
        target: "http://" + HOST + ":5273",
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
