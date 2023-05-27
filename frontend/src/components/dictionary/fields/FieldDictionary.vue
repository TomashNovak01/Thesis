<template>
  <div>
    <header>
      <div>Поля полевого акта</div>
      <input type="text" class="search" placeholder="Поиск" v-model.trim="search" />
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
        <template v-for="(field, index) of fields">
          <tr v-if="field && (
            !search ||
            field.value_full.trim().toLowerCase().includes(search.trim().toLowerCase()) ||
            field.value_short.trim().toLowerCase().includes(search.trim().toLowerCase())
          )" :key="'field_' + index">
            <td>{{ index + 1 }}</td>
            <td>{{ field.value_full }}</td>
            <td>{{ field.value_short }}</td>
            <td>{{ field.sequence }}</td>
            <td>{{ field.block_id }}</td>
            <td>{{ field.unit }}</td>
            <td v-if="canEdit">
              <v-btn icon variant="text" :title="'Редактировать поле ' + field.value_full" @click="editField(field)"
                style="margin: 5px;">
                <icon color="blue" width="25" icon="material-symbols:edit-outline-sharp" />
              </v-btn>
            </td>
            <td v-if="canEdit">
              <v-btn icon variant="text" :title="'Удалить поле ' + field.value_full" @click="showDeleteDialog(field)"
                style="margin: 5px;">
                <icon color="red" width="25" icon="material-symbols:delete-forever" />
              </v-btn>
            </td>
          </tr>
        </template>
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
import { ref, computed } from "vue";
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

    const search = ref("");

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
      isEdit.value = !!field ? true : false;

      editorDialog.value = true;
      editingField.value = field;
    };

    const closeDialog = () => editorDialog.value = false;

    return {
      headers,
      search,
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