import Vuex from "vuex";
import Vue from "vue";
import converter from "./modules/converter";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    converter
  }
});
