import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"
import btn from "./components/UI/btn.vue"

import "./assets/main.css";

const app = createApp(App);

app.use(router);
app.component("btn", btn)

app.mount("#app");
