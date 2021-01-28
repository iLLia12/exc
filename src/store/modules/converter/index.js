export default {
  namespaced: true,
  state: {
    currencies: []
  },
  getters: {
    getCurrencies: state => {
      return state.currencies;
    }
  },
  actions: {
    setCurrencies({ commit }, currencies) {
      commit("SET_CURRENCIES", currencies);
    }
  },
  mutations: {
    ["SET_CURRENCIES"](state, currencies) {
      state.currencies = currencies;
    }
  }
};
