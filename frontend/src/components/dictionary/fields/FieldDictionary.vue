<template>
  <div>
    <header>
      <div>Поля полевого акта</div>
      <v-icon v-if="canEdit" color="orange" icon="mdi-plus" @click="editField(null)" />
    </header>
    <v-divider />
    <styled-table>
      <colgroup>
        <col style="width: 3%" />
        <col />
        <col />
        <col style="width: 10%" />
        <col style="width: 10%" />
        <col style="width: 10%" />
        <col v-if="canEdit" style="width: 4%" />
        <col v-if="canEdit" style="width: 4%" />
      </colgroup>
      <thead>
        <tr>
          <th v-for="(header, index) of headers" :key="index + ' ' + header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(field, index) of fields" :key="'field_' + index">
          <td>{{ index + 1 }}</td>
          <td>{{ field.value_full }}</td>
          <td>{{ field.value_short }}</td>
          <td>{{ field.sequence }}</td>
          <td>{{ field.block_id }}</td>
          <td>{{ field.unit }}</td>
          <td v-if="canEdit">
            <v-icon color="blue" icon="mdi-wrench" @click="editField(field)" />
          </td>
          <td v-if="canEdit">
            <v-icon color="red" icon="mdi-minus-circle" @click="showDeleteDialog(field)" />
          </td>
        </tr>
      </tbody>
    </styled-table>
    <v-dialog v-if="canEdit" v-model="editorDialog" max-width="1000">
      <field-dialog :field="editingField" :is-edit="isEdit" @close="closeDialog" />
    </v-dialog>
    <v-dialog v-if="canEdit" v-model="deletingDialog" max-width="600">
      <v-card style="padding: 15px">
        <v-card-title>Вы действительно хотите удалить "{{ deletingField.value_full }}"?</v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="outlined" @click="cancelDeleting">Отмена</v-btn>
          <v-btn variant="outlined" color="red" @click="deleteField">Удалить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import StyledTable from '../../common/StyledTable.vue'
import FieldDialog from './FieldDialog.vue';

export default {
  name: "FieldDictionary",
  props: {
    canEdit: {
      type: Boolean,
      default: false
    }
  },
  components: { StyledTable, FieldDialog },
  setup(props) {
    onMounted(() => store.dispatch("fillFields"))

    const headers = props.canEdit ? [
      "№",
      "Полное наименование",
      "Укороченное наименование",
      "Порядковый номер",
      "Номер блока",
      "Ед. изм.",
      "",
      ""
    ] : [
      "№",
      "Полное наименование",
      "Укороченное наименование",
      "Порядковый номер",
      "Номер блока",
      "Ед. изм."
    ];

    const store = useStore();
    const fields = computed(() => store.getters.getFields);

    const editorDialog = ref(false);
    const editingField = ref(null);
    const isEdit = ref(false);

    const deletingDialog = ref(false);
    const deletingField = ref({});

    const showDeleteDialog = (field) => {
      deletingDialog.value = true;
      deletingField.value = field;
    };

    const cancelDeleting = () => {
      deletingDialog.value = false;
      deletingField.value = {}
    };

    const deleteField = () => {
      try {
        store.dispatch("deleteField", deletingField.value.id_code);
        deletingDialog.value = false;
      } catch (error) {
        console.log(error);
      }
    };

    const editField = (field = null) => {
      if (field) isEdit.value = true;
      editorDialog.value = true;
      editingField.value = field;
    };

    const closeDialog = () => editorDialog.value = false;

    return {
      headers,
      fields,
      editorDialog,
      editingField,
      isEdit,
      deletingDialog,
      deletingField,
      editField,
      showDeleteDialog,
      deleteField,
      cancelDeleting,
      closeDialog
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

table {
  margin-top: 20px;
}
</style>