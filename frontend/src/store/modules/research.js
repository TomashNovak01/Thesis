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

        // commit("ADD_RESEARCH", {
        //   research_id:
        //     state.researches[state.researches.length - 1].research_id + 1,
        //   is_new: true,
        //   contractor: research.contractor,
        //   well_name: research.well_name,
        //   cluster: research.cluster,
        //   objects: research.objects,
        //   oilfield: research.oilfield,
        //   grp_date: null,
        //   contract_number: null,
        //   contract_date: null,
        //   client_role: null,
        //   client_person: null,
        //   executer_role: null,
        //   executer_person: null,
        //   shop_role: null,
        //   shop_person: null,
        //   data: [],
        // });

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
    researches: [
      {
        research_id: 1120,
        is_new: false,
        contractor: "т. подрядчик",
        well_name: "т. скв. 1234",
        cluster: "т. к. 1534",
        objects: "т. п. 7541",
        oilfield: "т. месторождение",
        grp_date: "20.03.2020",
        contract_number: "Договор 1",
        contract_date: "12.03.2023",
        client_role: null,
        client_person: null,
        executer_role: null,
        executer_person: null,
        shop_role: null,
        shop_person: null,
        f_propant_mass_nkt: 0,
        data: [
          {
            id: 0,
            id_code: 4,
            research_id: 1120,
            title:
              "БАЗОВАЯ СЕРВИСНАЯ СТАВКА (минимальный необходимый набор ресурсов для ГРП)",
            unit: "опер.",
            mb_before_fracturing: 1,
            mb_after_fracturing: 2,
            mb_frac: 3,
            design: 4,
            redesign: 5,
            fact: 6,
            to_pay: 7,
            block_id: 10,
            sequence: 10,
            is_editable: 1,
            is_title_editable: 0,
          },
          {
            id: 1,
            id_code: 1,
            research_id: 1120,
            title: "Хим. машина",
            unit: "опер.",
            mb_before_fracturing: 0,
            mb_after_fracturing: 0,
            mb_frac: 0,
            design: 0,
            redesign: 0,
            fact: 0,
            to_pay: 0,
            sequence: 60,
            block_id: 20,
            is_editable: 1,
            is_title_editable: 0,
          },
          {
            id: 2,
            id_code: 3,
            research_id: 1120,
            title: "Вакуумная установка",
            unit: "опер.",
            mb_before_fracturing: 0,
            mb_after_fracturing: 0,
            mb_frac: 0,
            design: 0,
            redesign: 0,
            fact: 0,
            to_pay: 0,
            sequence: 70,
            block_id: 20,
            is_editable: 1,
            is_title_editable: 0,
          },
          {
            id: 3,
            id_code: 6,
            research_id: 1120,
            title: "Гелант",
            unit: "кг/л",
            mb_before_fracturing: 0,
            mb_after_fracturing: 0,
            mb_frac: 0,
            design: 0,
            redesign: 0,
            fact: 0,
            to_pay: 0,
            sequence: 610,
            block_id: 40,
            is_editable: 0,
            is_title_editable: 0,
          },
        ],
      },
    ],
  },
  getters: {
    getResearches: (state) => state.researches,
  },
};
