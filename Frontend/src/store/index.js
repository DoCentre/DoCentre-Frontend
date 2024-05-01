import { createStore } from "vuex";
import login from "./modules/login";

const vuex = createStore({
  modules: { login },
});

export default vuex;
