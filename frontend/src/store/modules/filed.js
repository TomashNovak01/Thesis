import axios from "axios";
import { toast } from "vue3-toastify";

export default {
  actions: {
    async fillFields({ commit }) {
      try {
        await axios
          .get("http://localhost:8080/api/get_fields")
          .then((response) => commit("FILL_FIELDS", response.data));
      } catch (error) {
        toast.error("Ошибка при получении полей");
        console.error(error);
      }
    },
    async deleteField({ state, commit }, id_code) {
      try {
        await axios
          .delete(`http://localhost:8080/api/delete_field/${id_code}`)
          .then((response) => console.log(response));

        const index = state.fields.findIndex((f) => f.id_code === id_code);
        commit("DELETE_FIELD", index);

        toast.success("Вы успешно удалили поле");
      } catch (error) {
        toast.error("Ошибка при удаление поля");
        console.error(error);
      }
    },
    async addField({ commit }, field) {
      try {
        await axios
          .post(`http://localhost:8080/api/create_field`, field)
          .then((response) =>
            commit("ADD_FIELD", { id_code: response.data.id_code, ...field })
          );

        toast.success("Вы успешно добавили поле");
      } catch (error) {
        toast.error("Ошибка при добавление поля");
        console.error(error);
      }
    },
    async changeField({ state, commit }, field) {
      try {
        await axios
          .put(`http://localhost:8080/api/update_field/${field.id_code}`, field)
          .then((response) => console.log(response));

        const index = state.fields.findIndex(
          (f) => f.id_code === field.id_code
        );
        commit("CHANGE_FIELD", { index: index, field: field });

        toast.success("Вы успешно изменили поле");
      } catch (error) {
        toast.error("Ошибка при изменение поля");
        console.error(error);
      }
    },
  },
  mutations: {
    FILL_FIELDS(state, fields) {
      state.fields = fields;
    },
    DELETE_FIELD(state, index) {
      state.fields.splice(index, 1);
    },
    ADD_FIELD(state, field) {
      state.fields.push(field);
    },
    CHANGE_FIELD(state, { index, field }) {
      state.fields.splice(index, 1, field);
    },
  },
  state: {
    fields: [],
  },
  getters: {
    getFields: (state) => state.fields.sort((a, b) => a.sequence - b.sequence),
  },
};
