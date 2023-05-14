import axios from "axios";
import { toast } from "vue3-toastify";

export default {
  actions: {
    async fillResearches({ commit }) {
      try {
        await axios
          .get("http://localhost:8080/api/get_researches")
          .then((response) => commit("FILL_RESEARCHES", response.data));
      } catch (error) {
        toast.error("Ошибка при получении полевых актов");
        console.log(error);
      }
    },
    async addResearch({ state, commit }, research) {
      try {
        await axios
          .post(`http://localhost:8080/api/create_research`, research)
          .then((response) => commit("ADD_RESEARCH", response.data));

        toast.success("Вы успешно добавили полевой акт");
      } catch (error) {
        toast.error("Ошибка при добавление полевого акта");
        console.error(error);
      }
    },
    async changeResearch({ state, commit }, research) {
      try {
        await axios
          .put(
            `http://localhost:8080/api/update_research/${research.research_id}`,
            research
          )
          .then((response) => console.log(response));

        const index = state.researches.findIndex(
          (r) => r.research_id === research.research_id
        );

        commit("CHANGE_RESEARCH", { index, research });

        toast.success("Вы успешно изменили полевой акт");
      } catch (error) {
        toast.error("Ошибка при изменение полевого акта");
        console.error(error);
      }
    },
  },
  mutations: {
    FILL_RESEARCHES(state, researches) {
      state.researches = researches;
    },
    ADD_RESEARCH(state, research) {
      state.researches.push(research);
    },
    CHANGE_RESEARCH(state, { index, research }) {
      state.researches.splice(index, 1, research);
    },
  },
  state: {
    researches: [],
  },
  getters: {
    getResearches: (state) => state.researches,
    getResearchesForApproval: (state) => state.researches.filter((r) => r.id_status === 2)
  },
};
