import Vue from "vue";
import App from "./App.vue";
import router from "./router";
//第三方套件
import axios from "axios";
import VueAxios from "vue-axios";
import "bootstrap";
Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

axios.defaults.withCredentials = true;

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
