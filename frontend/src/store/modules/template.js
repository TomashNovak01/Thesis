import axios from "axios";
import { toast } from "vue3-toastify";

export default {
  actions: {
    async fillTemplates({ commit }) {
      try {
        await axios
          .get("http://localhost:8080/api/get_templates")
          .then((response) => commit("FILL_TEMPLATES", response.data));
      } catch (error) {
        toast.error("Ошибка при получении шаблонов");
        console.log(error);
      }
    },
    async deleteTemplate({ state, commit }, id_code) {
      try {
        console.log(id_code);
        await axios
          .delete(`http://localhost:8080/api/delete_template/${id_code}`)
          .then((response) => console.log(response));

        const index = state.templates.findIndex((t) => t.id_code === id_code);
        commit("DELETE_TEMPLATE", index);

        toast.success("Вы успешно удалили шаблон");
      } catch (error) {
        toast.error("Ошибка при удаление шаблона");
        console.error(error);
      }
    },
    async addTemplate({ state, commit }, template) {
      try {
        await axios
          .post(`http://localhost:8080/api/create_template`, template)
          .then((response) =>
            commit("ADD_TEMPLATE", {
              id_code: response.data.id_code,
              ...template,
            })
          );

        toast.success("Вы успешно добавили шаблон");
      } catch (error) {
        toast.error("Ошибка при добавление шаблона");
        console.error(error);
      }
    },
    async changeTemplate({ state, commit }, template) {
      try {
        await axios
          .put(
            `http://localhost:8080/api/update_template/${template.id_code}`,
            template
          )
          .then((response) => console.log(response));

        const index = state.templates.findIndex(
          (f) => f.id_code === template.id_code
        );
        commit("CHANGE_TEMPLATE", { index: index, template: template });
        toast.success("Вы успешно изменили шаблон");
      } catch (error) {
        toast.error("Ошибка при изменение шаблона");
        console.error(error);
      }
    },
  },
  mutations: {
    FILL_TEMPLATES(state, templates) {
      state.templates = templates;
    },
    DELETE_TEMPLATE(state, index) {
      state.templates.splice(index, 1);
    },
    ADD_TEMPLATE(state, template) {
      state.templates.push(template);
    },
    CHANGE_TEMPLATE(state, { index, template }) {
      state.templates.splice(index, 1, template);
    },
  },
  state: {
    templates: [],
  },
  getters: {
    getTemplates: (state) => state.templates,
  },
};
