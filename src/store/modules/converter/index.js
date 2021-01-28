export default {
  namespaced: true,
  state: {
    currencies: [],
    currencyOptions: [{
      label: "USD",
      value: "USD",
      disabled: false,
    },{
      label: "EUR",
      value: "EUR",
      disabled: false,
    },{
      label: "UAH",
      value: "UAH",
      disabled: false,
    },{
      label: "BTC",
      value: "BTC",
      disabled: false,
    },
    ]
  },
  getters: {
    getCurrencies: state => {
      return state.currencies;
    },
    getCurrencyOptions: state => {
      return state.currencyOptions;
    }
  },
  actions: {
    setCurrencies({ commit }, currencies) {
      commit("SET_CURRENCIES", currencies);
    },
    setCurrencyOptions({ commit }, currencyOptions) {
      commit("SET_CURRENCY_OPTIONS", currencyOptions);
    }
  },
  mutations: {
    ["SET_CURRENCIES"](state, currencies) {
      state.currencies = currencies;
    },
    ["SET_CURRENCY_OPTIONS"](state, currencyOptions) {
      state.currencyOptions = currencyOptions;
    }
  }
};
