// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";

export default createVuetify({
  icons: {
    diagrammIcon: { component: () => import("../assets/diagrammIcon.vue") },
  },
});
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
