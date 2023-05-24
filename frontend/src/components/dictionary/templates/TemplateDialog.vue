<template>
  <v-card>
    <v-card-title style="display: flex">
      {{ template ? "Редактирование шаблона" : "Добавление шаблона" }}
      <v-spacer />
      <v-btn variant="outlined" color="blue" @click="saveTemplate">Сохранить</v-btn>
    </v-card-title>
    <v-card-text>
      <v-text-field v-model.trim="v$.name.$model" label="Наименование" placeholder="Введите наименование"
        variant="outlined" clearable />
      <small v-for="error of v$.name.$errors" :key="error.$uid" class="error">
        {{ error.$message }}
      </small>
      <div>
        <small v-for="error of v$.fields.$errors" :key="error.$uid" class="error">
          {{ error.$message }}
        </small>
        <div class="fields">
          <template v-for="(field, index) of fields" >
            <v-checkbox v-if="field" :key="'field_' + index" color="orange" :model-value="!!editingTemplate.fields.find((f) => f.id_code === field.id_code)"
              :label="field.value_full" class="field" @click="toggle(field, editingTemplate.fields)">
            </v-checkbox>
            <v-divider v-if="field.block_id !== (fields[index + 1] || { block_id: field.block_id }).block_id"
              :key="'divider_' + index" />
          </template>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { useStore } from "vuex";
import { reactive, computed } from 'vue';
import useVuelidate from '@vuelidate/core'
import { helpers, required } from "@vuelidate/validators"
import { toast } from "vue3-toastify";

export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    template: {
      type: Object,
      default: null
    }
  },
  setup(props, { emit }) {
    let editingTemplate = reactive(
      JSON.parse(JSON.stringify(props.template ||
      {
        name: "",
        fields: []
      }
      ))
    );

    const isThereField = () => editingTemplate.fields.length !== 0;
    const rules = computed(() => ({
      name: { required: helpers.withMessage('Введите наименование', required) },
      fields: { isThereField: helpers.withMessage('Выберите поле', isThereField) }
    }));

    const v$ = useVuelidate(rules, editingTemplate);

    const store = useStore();
    const templates = computed(() => store.getters.getTemplates);
    const fields = computed(() => store.getters.getFields);

    const toggle = (field, template) => {
      const index = template.findIndex((f) => f.id_code === field.id_code);

      if (index === -1) template.push(field);
      else template.splice(index, 1);

      template.sort((a, b) => a.sequence - b.sequence);
    }

    const saveTemplate = () => {
      v$.value.$touch();
      if (v$.value.$error) return;

      if (!!templates.value.find((t) => t.name === editingTemplate.name)) {
        toast.error("Шаблон с таким названием уже существует");
        return;
      }

      if (props.isEdit) store.dispatch("changeTemplate", editingTemplate)
      else store.dispatch("addTemplate", editingTemplate);

      emit("close");
    }

    return {
      v$,
      fields,
      editingTemplate,
      toggle,
      saveTemplate
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
  font-size: initial;
  font-weight: initial;
}

.fields {
  max-height: calc(90vh - 151px);
  overflow: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
}

.field {
  height: 35px;
}
</style>