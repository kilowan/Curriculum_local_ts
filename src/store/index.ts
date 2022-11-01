import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    identifier: 1,
  },
  mutations: {
    ADD(state) {
      state.identifier++;
    },
    LOAD(state, value) {
      state.identifier = value;
    },
    RESET(state) {
      state.identifier = 1;
    },
  },
  actions: {
    getIdentifier({ dispatch }) {
      const identifier = this.state.identifier;
      dispatch("add");
      return identifier;
    },
    add({ commit }) {
      commit("ADD");
    },
    reset({ commit }) {
      commit("RESET");
    },
    loadIdentifier({ commit }, identifier: number) {
      if (identifier >= this.state.identifier) commit("LOAD", identifier + 1);
    },
    resetId({ commit }) {
      commit("RESET");
    },
  },
  modules: {},
});
