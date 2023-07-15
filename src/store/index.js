import { createStore } from "vuex";
import user from "@/store/modules/user";
import movie from "@/store/modules/movie"

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    movie
  },
});
