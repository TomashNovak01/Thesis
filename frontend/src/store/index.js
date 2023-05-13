import { createStore } from "vuex";
import user from "./modules/user";
import filed from "./modules/filed";
import template from "./modules/template";
import contract from "./modules/contract";
import research from "./modules/research";

export default createStore({
  modules: {
    user,
    filed,
    template,
    contract,
    research
  },
});
