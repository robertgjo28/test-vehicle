import { createStore } from "vuex";

export default createStore({
  state: {
    currentItem: {},
    editedItem: {},
  },
  mutations: {
    GET_CURRENT_ITEM(state, payload) {
      state.currentItem = payload;
    },
    GET_CHANGED_ITEM(state, payload) {
      state.currentItem = payload;
    },
  },
  actions: {
    GET_CURRENT_ITEM({ commit }, payload) {
      commit("GET_CURRENT_ITEM", payload);
    },
    GET_CHANGED_ITEM({ commit }, payload) {
      commit("GET_CHANGED_ITEM", payload);
    },
  },
  modules: {},
});
