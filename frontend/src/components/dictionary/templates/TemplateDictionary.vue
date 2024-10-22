<template>
  <div>
    <header>
      <div>Шаблоны полевого акта</div>
      <input type="text" class="search" placeholder="Поиск" v-model.trim="search" />
      <v-icon v-if="canEdit" color="orange" icon="mdi-plus" @click="editTemplate(null)" />
    </header>
    <v-divider />
    <styled-table>
      <colgroup>
        <col style="width: 3%" />
        <col />
        <col style="width: 5%" />
        <col v-if="canEdit" style="width: 5%" />
        <col v-if="canEdit" style="width: 5%" />
      </colgroup>
      <thead>
        <tr>
          <th v-for="(header, index) of headers" :key="index + ' ' + header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, index) of templates">
          <template v-if="!search || item.template.name.trim().toLowerCase().includes(search.trim().toLowerCase())">
            <tr v-if="item" :key="'template_' + index">
              <td>{{ index + 1 }}</td>
              <td>{{ item.template.name }}</td>
              <td>
                <v-icon color="orange" @click="item.isShown = !item.isShown">
                  {{ item.isShown ? "mdi-chevron-up" : "mdi-chevron-down" }}
                </v-icon>
              </td>
              <td v-if="canEdit">
                <v-btn icon variant="text" :title="'Редактировать шаблон ' + item.template.name"
                  @click="editTemplate(item.template)" style="margin: 5px;">
                  <icon color="blue" width="25" icon="material-symbols:edit-outline-sharp" />
                </v-btn>
              </td>
              <td v-if="canEdit">
                <v-btn icon variant="text" :title="'Удалить шаблон ' + item.template.name"
                  @click="showDeleteDialog(item.template)" style="margin: 5px;">
                  <icon color="red" width="25" icon="material-symbols:delete-forever" />
                </v-btn>
              </td>
            </tr>
            <template v-if="item.isShown">
              <tr v-for="(field, i) in item.template.fields" :key="'template_' + index + '_field_' + i">
                <td colspan="5" style="text-align: left !important; padding: 0 15px;">{{ field.value_full }}</td>
              </tr>
            </template>
          </template>
        </template>
      </tbody>
    </styled-table>
    <v-dialog v-if="canEdit" v-model="editorDialog" max-width="1000">
      <template-dialog :template="editingTemplate" :is-edit="isEdit" @close="closeDialog" />
    </v-dialog>
    <v-dialog v-if="canEdit" v-model="deletingDialog" max-width="600">
      <v-card style="padding: 15px">
        <v-card-title>Вы действительно хотите удалить "{{ deletingTemplate.name }}"?</v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="outlined" @click="cancelDeleting">Отмена</v-btn>
          <v-btn variant="outlined" color="red" @click="deleteTemplate">Удалить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ref, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import StyledTable from '../../common/StyledTable.vue'
import TemplateDialog from "./TemplateDialog.vue";

export default {
  name: "TemplateDictionary",
  props: {
    canEdit: {
      type: Boolean,
      default: false
    }
  },
  components: { StyledTable, TemplateDialog },
  setup(props) {
    const headers = props.canEdit ? ["№", "Наименование", "", "", ""] : ["№", "Наименование", ""];

    const search = ref("");

    const templates = ref([]);

    const store = useStore();
    const res = computed(() => store.getters.getTemplates);

    const updateTemplates = () => {
      templates.value = [];
      for (let i = 0; i < res.value.length; i++) {
        templates.value.push({ template: res.value[i], isShown: false });
      }
    }

    const isEdit = ref(false);
    const editorDialog = ref(false);
    const editingTemplate = ref(null);

    const editTemplate = (template = null) => {
      isEdit.value = !!template ? true : false;

      editorDialog.value = true;
      editingTemplate.value = template;
    };


    const deletingDialog = ref(false);
    const deletingTemplate = ref({});

    const showDeleteDialog = (template) => {
      deletingDialog.value = true;
      deletingTemplate.value = template;
    };

    const cancelDeleting = () => {
      deletingDialog.value = false;
      deletingTemplate.value = {}
    };

    const deleteTemplate = () => {
      try {
        console.log(deletingTemplate);
        store.dispatch("deleteTemplate", deletingTemplate.value.id_code);
        deletingDialog.value = false;
        updateTemplates();
      } catch (error) {
        console.log(error);
      }
    };

    const closeDialog = () => {
      editorDialog.value = false;
      updateTemplates();
    }

    watchEffect(() => updateTemplates());

    return {
      search,
      isEdit,
      editorDialog,
      editingTemplate,
      headers,
      templates,
      editTemplate,
      showDeleteDialog,
      cancelDeleting,
      deleteTemplate,
      deletingTemplate,
      deletingDialog,
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