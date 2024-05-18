import { loginUser } from "../../api/userApi";

const blankUserData = {
  id: null,
  username: "",
  identity: "",
  isLogin: false,
};

const getDefaultState = () => {
  return localStorage.getItem("username")
    ? {
        id: parseInt(localStorage.getItem("id")),
        username: localStorage.getItem("username"),
        identity: localStorage.getItem("identity"),
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
      localStorage.setItem("id", userData.user.id);
      localStorage.setItem("username", userData.user.username);
      localStorage.setItem("identity", userData.user.identity);
      localStorage.setItem("isLogin", true);
      commit("updateUserData", userData.user);
    }
  },
  logoutUser({ commit }) {
    localStorage.removeItem("id");
    localStorage.removeItem("username");
    localStorage.removeItem("identity");
    localStorage.removeItem("isLogin");
    commit("updateUserData", blankUserData);
  },
};

const mutations = {
  updateUserData(state, userData) {
    state.id = userData.id;
    state.username = userData.username;
    state.identity = userData.identity;
    state.isLogin = true;
  },
};

export default { namespaced: true, state, getters, actions, mutations };
