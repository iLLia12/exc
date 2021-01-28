import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";

Vue.config.productionTip = false;

import ElementUI from "element-ui";
Vue.use(ElementUI);

import "element-ui/lib/theme-chalk/index.css";
import "@/assets/scss/main.scss";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
