import mutations from "../mutations";
import axios from "@/plugins/axios";

const { AUTH, TOKEN, USER } = mutations;

const userStore = {
  namespaced: true,
  state: {
    auth: false,
    token: "",
    user: {},
  },
  getters: {
    auth: ({ auth }) => auth,
    token: ({ token }) => token,
    user: ({ user }) => user,
  },
  mutations: {
    [AUTH](state, auth) {
      state.auth = auth;
    },
    [TOKEN](state, token) {
      state.token = token;
    },
    [USER](state, user) {
      state.user = user;
    },
  },
  actions: {
    authenticate({ commit, dispatch }, token) {
      if (token) {
        commit(AUTH, true);
        commit(TOKEN, token);

        dispatch("fetchUserDetails");
      }
    },
    async logout({ commit }) {
      commit(AUTH, false);
      commit(TOKEN, "");
      commit(USER, {});
      localStorage.removeItem("token");

      await axios.post("/api/v1/auth/logout");
    },
    async fetchAccessToken({ commit }) {
      const token = localStorage.getItem("token");

      if (token) {
        commit(AUTH, true);
        commit(TOKEN, token);
      }
    },
    async fetchUserDetails({ state, commit }) {
      try {
        if (state.auth) {
          const response = await axios.get("/api/v1/user");

          if (response.data) {
            commit(USER, response.data);
          }
        } else {
          commit(USER, {});
        }
      } catch (error) {
        console.log(error);
      }
    },
    clearUserAuth({ commit }) {
      commit(AUTH, false);
      commit(TOKEN, "");
      commit(USER, {});
      localStorage.removeItem("token");
    },
  },
};

export default userStore;
