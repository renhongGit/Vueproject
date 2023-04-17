import Vue from "vue";
import VueRouter from "vue-router";
// import HomeView from "../views/HomeView.vue";

import Login from "@/components/pages/Login";
import Dashboard from "@/components/Dashboard";
import Products from "@/components/pages/Products";
import Orders from "@/components/pages/Orders";
import Coupons from "@/components/pages/Coupons";
import CustomerOrders from "@/components/pages/CustomerOrders";
import CustomerCheckout from "@/components/pages/CustomerCheckout";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: "login",
  },
  // {
  //   path: "/",
  //   name: "home",
  //   component: HomeView,
  //   meta: { requiresAuth: true },
  // },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/admin",
    name: "Dashboard",
    component: Dashboard,
    children: [
      {
        path: "products",
        name: "Products",
        component: Products,
        meta: { requiresAuth: true },
      },
      {
        path: "orders",
        name: "Orders",
        component: Orders,
        meta: { requiresAuth: true },
      },
      {
        path: "coupons",
        name: "Coupons",
        component: Coupons,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/",
    name: "customer_dashboard",
    component: Dashboard,
    children: [
      {
        path: "customer_orders",
        name: "CustomerOrders",
        component: CustomerOrders,
      },
      {
        path: "customer_checkout/:orderId",
        name: "CustomerCheckout",
        component: CustomerCheckout,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
