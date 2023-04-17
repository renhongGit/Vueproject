import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./bus";
import currencyFilter from "./filter/currency";

import axios from "axios";
import VueAxios from "vue-axios";

import "bootstrap";

import VeeValidate, { Validator } from "vee-validate"; //匯入檔案
import TW from "vee-validate/dist/locale/zh_TW"; //匯入語言包

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
axios.defaults.withCredentials = true;

Vue.use(VeeValidate); //啟用API
Validator.localize("zh-TW", TW); //啟用語言包

Vue.component("Loading", Loading);

Vue.filter("currency", currencyFilter);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

// 導航守衛
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_API}/api/user/check
    `;
    axios.post(api).then((response) => {
      console.log(response.data);
      if (response.data.success) {
        next();
      } else {
        next({
          path: "/login",
        });
      }
    });
  } else {
    next();
  }
  return false;
});
