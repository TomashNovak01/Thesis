import axios from "axios";
import { toast } from "vue3-toastify";

export default {
  actions: {
    async fillContracts({ commit }) {
      try {
        await axios
          .get("http://localhost:8080/api/get_contracts")
          .then((response) => commit("FILL_CONTRACTS", response.data));
      } catch (error) {
        toast.error("Ошибка при получении договоров");
        console.error(error);
      }
    },
    async deleteContract({ state, commit }, id_code) {
      try {
        await axios
          .delete(`http://localhost:8080/api/delete_contract/${id_code}`)
          .then((response) => console.log(response));

        const index = state.contracts.findIndex((c) => c.id_code === id_code);
        commit("DELETE_CONTRACT", index);

        toast.success("Вы успешно удалили договор");
      } catch (error) {
        toast.error("Ошибка при удаление договора");
        console.error(error);
      }
    },
    async addContract({ commit }, contract) {
      try {
        await axios
          .post(`http://localhost:8080/api/create_contract`, contract)
          .then((response) =>
            commit("ADD_CONTRACT", {
              id_code: response.data.id_code,
              ...contract,
            })
          );

        toast.success("Вы успешно добавили договор");
      } catch (error) {
        toast.error("Ошибка при добавление договора");
        console.error(error);
      }
    },
    async changeContract({ state, commit }, contract) {
      try {
        await axios
          .put(
            `http://localhost:8080/api/update_contract/${contract.id_code}`,
            contract
          )
          .then((response) => console.log(response));

        const index = state.contracts.findIndex(
          (c) => c.id_code === contract.id_code
        );
        commit("CHANGE_CONTRACT", { index: index, contract: contract });

        toast.success("Вы успешно изменили договор");
      } catch (error) {
        toast.error("Ошибка при изменение договора");
        console.error(error);
      }
    },
  },
  mutations: {
    FILL_CONTRACTS(state, contracts) {
      state.contracts = contracts;
    },
    DELETE_CONTRACT(state, index) {
      state.contracts.splice(index, 1);
    },
    ADD_CONTRACT(state, contract) {
      state.contracts.push(contract);
    },
    CHANGE_CONTRACT(state, { index, contract }) {
      state.contracts.splice(index, 1, contract);
    },
  },
  state: {
    contracts: [],
  },
  getters: {
    getContracts: (state) => state.contracts,
  },
};
