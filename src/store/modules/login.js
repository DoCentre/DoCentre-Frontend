import { loginUser } from "../../api/userApi";

const blankUserData = {
  id: null,
  username: "",
  identity: "",
  email: "",
  isLogin: false,
};

const getDefaultState = () => {
  return sessionStorage.getItem("username")
    ? {
        id: parseInt(sessionStorage.getItem("id")),
        username: sessionStorage.getItem("username"),
        identity: sessionStorage.getItem("identity"),
        email: sessionStorage.getItem("email"),
        isLogin: true,
      }
    : blankUserData;
};

const state = getDefaultState();

const getters = {};

const actions = {
  async loginUser({ commit }, loginData) {
    const userData = await loginUser(loginData.username, loginData.password);

    if (userData !== null) {
      sessionStorage.setItem("id", userData.id);
      sessionStorage.setItem("username", userData.username);
      sessionStorage.setItem("identity", userData.identity);
      sessionStorage.setItem("email", userData.email);
      commit("updateUserData", userData);
    }
  },
  logoutUser({ commit }) {
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("identity");
    sessionStorage.removeItem("email");
    commit("updateUserData", blankUserData);
  },
};

const mutations = {
  updateUserData(state, userData) {
    state.id = userData.id;
    state.username = userData.username;
    state.identity = userData.identity;
    state.email = userData.email;
    state.isLogin = true;
  },
};

export default { namespaced: true, state, getters, actions, mutations };
