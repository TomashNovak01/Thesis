import axios from "axios";
import { toast } from "vue3-toastify";

export default {
  actions: {
    async fillUsers({commit}) {
      try {
        await axios
          .get("http://localhost:8080/api/get_users")
          .then((response) => commit("FILL_USERS", response.data));
      } catch (error) {
        toast.error("Ошибка при получении пользователей");
        console.log(error);
      }
    }
  },
  mutations: {
    FILL_USERS(state, users) {
      state.users = users
    }
  },
  state: {
    users: [],
  },
  getters: {
    getUsers: (state) => state.users
  },
};
