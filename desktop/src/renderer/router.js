import { createRouter, createWebHistory } from "vue-router";
import MainPage from "./pages/MainPage.vue";

const routes = [
  {
    path: "/",
    name: "MainPage",
    component: MainPage,
    meta: {
      title: "Полевой акт",
    },
  },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from) => {
    document.title = to.meta.title ? to.meta.title : "Редактор полевого акта";
});

export default router;
