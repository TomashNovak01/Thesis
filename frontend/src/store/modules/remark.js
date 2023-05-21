import axios from "axios";
import { toast } from "vue3-toastify";

export default {
  actions: {
    async fillRemarks({ commit }) {
      try {
        await axios
          .get("http://localhost:8080/api/get_remarks")
          .then((response) => commit("FILL_REMARKS", response.data));
      } catch (error) {
        toast.error("Ошибка при получении сообщений");
        console.error(error);
      }
    },
    async addRemark({ commit }, remark) {
      try {
        console.log([...remark.entries()]);

        await axios
          .post(`http://localhost:8080/api/create_remark`, remark)
          .then((response) =>
            commit("ADD_REMARK", { id_code: response.id_code, ...remark })
          ).catch((error) => console.error(error));

        toast.success("Вы успешно отправили сообщение");
      } catch (error) {
        toast.error("Ошибка при отправки сообщения");
        console.error(error);
      }
    },
  },
  mutations: {
    FILL_REMARKS(state, remarks) {
      state.remarks = remarks;
    },
    ADD_REMARK(state, remark) {
      state.remarks.push(remark);
    },
  },
  state: {
    remarks: [],
  },
  getters: {
    getResearchRemarks: (state) =>
      state.remarks,
  },
};
