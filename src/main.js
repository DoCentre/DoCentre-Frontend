import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://lab.codex.tw:5173/";
axios.defaults.headers.post["Content-Type"] = "application/json";

loadFonts();

createApp(App).use(router).use(store).use(vuetify).mount("#app");
