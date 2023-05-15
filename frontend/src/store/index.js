import { createStore } from "vuex";
import contract from "./modules/contract";
import filed from "./modules/filed";
import remark from "./modules/remark";
import research from "./modules/research";
import template from "./modules/template";
import user from "./modules/user";

export default createStore({
  modules: {
    contract,
    filed,
    remark,
    research,
    template,
    user,
  },
});
