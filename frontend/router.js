import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "PageAuthorization",
    component: () => import("./pages/Authorization.vue"),
    meta: {
      title: "Авторизация",
    },
  },
  {
    path: "/dictionary",
    name: "PageDictionary",
    component: () => import("./pages/Dictionary.vue"),
    meta: {
      title: "Справочники",
    },
  },
  {
    path: "/fieldact",
    name: "PageFiledAct",
    component: () => import("./pages/FieldAct.vue"),
    meta: {
      title: "Полевой Акт",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
