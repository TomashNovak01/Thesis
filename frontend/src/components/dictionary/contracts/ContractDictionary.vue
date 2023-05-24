<template>
  <div>
    <header>
      <div>Договоры полевого акта</div>
      <input type="text" class="search" placeholder="Поиск" v-model="search">
      <v-icon v-if="canEdit" color="orange" icon="mdi-plus" @click="editContract(null)" />
    </header>
    <v-divider />
    <styled-table>
      <colgroup>
        <col style="width: 3%" />
        <col />
        <col />
        <col style="width: 10%" />
        <col v-if="canEdit" style="width: 5%" />
        <col v-if="canEdit" style="width: 5%" />
      </colgroup>
      <thead>
        <tr>
          <th v-for="(header, index) of headers" :key="index + ' ' + header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(contract, index) of contracts">
          <tr v-if="contract && (
            !search ||
            contract.value_full.trim().toLowerCase().includes(search.trim().toLowerCase()) ||
            contract.value_short.trim().toLowerCase().includes(search.trim().toLowerCase())
          )" :key="'contract_' + index">
            <td>{{ index + 1 }}</td>
            <td>{{ contract.value_full }}</td>
            <td>{{ contract.value_short }}</td>
            <td>{{ dayjs(contract.date).format("DD.MM.YYYY") }}</td>
            <td v-if="canEdit">
              <v-btn icon variant="text" :title="'Редактировать договор ' + contract.value_short"
                @click="editContract(contract)" style="margin: 5px;">
                <icon color="blue" width="25" icon="material-symbols:edit-outline-sharp" />
              </v-btn>
            </td>
            <td v-if="canEdit">
              <v-btn icon variant="text" :title="'Удалить договор ' + contract.value_short"
                @click="showDeleteDialog(contract)" style="margin: 5px;">
                <icon color="red" width="25" icon="material-symbols:delete-forever" />
              </v-btn>
            </td>
          </tr>
        </template>
      </tbody>
    </styled-table>
    <v-dialog v-if="canEdit" v-model="editorDialog" max-width="1000">
      <contract-dialog :contract="editingContract" :is-edit="isEdit" @close="closeDialog" />
    </v-dialog>
    <v-dialog v-if="canEdit" v-model="deletingDialog" max-width="600">
      <v-card style="padding: 15px">
        <v-card-title>Вы действительно хотите удалить "{{ deletingContract.value_full }}"?</v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="outlined" @click="cancelDeleting">Отмена</v-btn>
          <v-btn variant="outlined" color="red" @click="deleteContract">Удалить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import StyledTable from '../../common/StyledTable.vue'
import ContractDialog from './ContractDialog.vue'
import dayjs from "dayjs"

export default {
  name: "ContractDictionary",
  props: {
    canEdit: {
      type: Boolean,
      default: false
    }
  },
  components: { StyledTable, ContractDialog },
  setup(props) {
    const headers = props.canEdit ? ["№", "Полное наименование", "Укороченное наименование", "Дата", "", ""] :
      ["№", "Полное наименование", "Укороченное наименование", "Дата"];

    const search = ref("")

    const store = useStore();
    const contracts = computed(() => store.getters.getContracts);

    const editorDialog = ref(false);
    const editingContract = ref(null);
    const isEdit = ref(false);

    const deletingDialog = ref(false);
    const deletingContract = ref({});

    const showDeleteDialog = (contract) => {
      deletingDialog.value = true;
      deletingContract.value = contract;
    };

    const cancelDeleting = () => {
      deletingDialog.value = false;
      deletingContract.value = {}
    };

    const deleteContract = () => {
      try {
        store.dispatch("deleteContract", deletingContract.value.id_code);
        deletingDialog.value = false;
      } catch (error) {
        console.log(error);
      }
    };

    const editContract = (contract = null) => {
      isEdit.value = !!contract ? true : false;

      editorDialog.value = true;
      editingContract.value = contract;
    };

    const closeDialog = () => editorDialog.value = false;

    return {
      headers,
      search,
      contracts,
      editContract,
      editingContract,
      editorDialog,
      isEdit,
      deleteContract,
      deletingContract,
      deletingDialog,
      cancelDeleting,
      showDeleteDialog,
      closeDialog,
      dayjs
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.5rem;
  height: 32px;
  font-size: 14pt;
}

.search {
  width: 50%;
  margin-bottom: 5px;
  padding: 5px 5px;
  border: 1px solid gray;
  border-radius: 5px;
}

table {
  margin-top: 20px;
}
</style>