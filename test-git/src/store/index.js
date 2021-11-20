import { createStore } from "vuex";

export default createStore({
  state: {
    modalShow: false,
  },
  mutations: {
    toggleModal(state) {
      state.modalShow = !state.modalShow;
    },
  },
  actions: {},
  modules: {},
});
