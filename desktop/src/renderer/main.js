import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"
import componentsUI from "./components/UI";

import "./assets/main.css";

const app = createApp(App);

componentsUI.forEach((component) => {
  app.component(component.name, component);
});

app.use(router);

app.mount("#app");
