import { createApp } from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import VueToastify from "vue-toastify";
import store from "./store";
import router from "../router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";

import "vue3-toastify/dist/index.css"
import "./assets/theme.css";

loadFonts();

createApp(App)
    .use(Vuelidate)
    .use(store)
    .use(vuetify)
    .use(router)
    .use(VueToastify)
    .mount("#app");
