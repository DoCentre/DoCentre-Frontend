const HOST = process.env.VUE_APP_HOST || "localhost";
const API_HOST = process.env.VUE_APP_API_HOST || "localhost";
const OAUTH_HOST = process.env.VUE_APP_OAUTH_HOST || "localhost";

module.exports = {
  transpileDependencies: ["vuetify"],

  devServer: {
    port: 5173,
    allowedHosts: [HOST],
    client: {
      overlay: {
        warnings: false,
        errors: false,
      },
    },
    proxy: {
      "/api": {
        target: "http://" + API_HOST + ":8080",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
      "/oauth": {
        target: "http://" + OAUTH_HOST + ":5273",
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
