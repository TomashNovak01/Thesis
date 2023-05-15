<template>
  <v-card>
    <v-card-title style="display: flex">
      Добавление полей в полевой акт
      <v-spacer />
      <v-btn variant="outlined" color="blue" @click="addFields">Добавить</v-btn>
    </v-card-title>
    <v-card-text>
      <template v-for="(field, index) of fields">
        <v-checkbox v-if="field && !fieldInData.find((f) => f.id_code === field.id_code)" :key="'field_' + index"
          color="orange" :model-value="!!newFields.find((f) => f.id_code === field.id_code)" :label="field.value_full"
          class="field" @click="toggle(field)">
        </v-checkbox>
        <v-checkbox v-else :key="'field_checked_' + index" :model-value="true" :label="field.value_full" class="field"
          disabled>
        </v-checkbox>
        <v-divider v-if="field.block_id !== (fields[index + 1] || { block_id: field.block_id }).block_id"
          :key="'divider_' + index" />
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
import { useStore } from "vuex";
import { ref, computed } from 'vue';

export default {
  props: {
    fieldInData: {
      type: Array,
      require: true
    },
    research: {
      type: Number,
      require: true
    }
  },
  setup(props, { emit }) {
    const store = useStore();
    const fields = computed(() => store.getters.getFields);

    const newFields = ref([]);

    const toggle = (field) => {
      const index = newFields.value.findIndex((f) => f.id_code === field.id_code);

      if (index === -1) newFields.value.push(field);
      else newFields.value.splice(index, 1);

      newFields.value.sort((a, b) => a.sequence - b.sequence);
    }

    const addFields = () => {
      for (let i = 0; i < newFields.value.length; i++) {
        props.fieldInData.push({
          id: newFields.value.length + 1,
          id_code: newFields.value[i].id_code,
          research_id: props.research,
          title: newFields.value[i].value_full,
          unit: newFields.value[i].unit,
          mb_before_fracturing: 0,
          mb_after_fracturing: 0,
          mb_frac: 0,
          design: 0,
          redesign: 0,
          fact: 0,
          to_pay: 0,
          sequence: newFields.value[i].sequence,
          block_id: newFields.value[i].block_id,
          is_editable: 1,
          is_title_editable: 0,
        });
      }

      props.fieldInData.sort((a, b) => a.sequence - b.sequence);
      newFields.value = [];

      emit("close");
    }

    return {
      fields,
      newFields,
      toggle,
      addFields
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