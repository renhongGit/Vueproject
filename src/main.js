import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./bus";
import currencyFilter from "./filter/currency";
//第三方套件
import axios from "axios";
import VueAxios from "vue-axios";
import "bootstrap";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.component("Loading", Loading);
axios.defaults.withCredentials = true;
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
