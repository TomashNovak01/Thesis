<template>
  <v-card>
    <v-card-title>
      {{ field ? "Редактирование поля" : "Добавление поля" }}
    </v-card-title>
    <v-card-text>
      <div>
        <v-text-field v-model.trim="v$.value_full.$model" label="Полное наименование"
          placeholder="Введите полное наименование" variant="outlined" clearable />
        <small v-for="error of v$.value_full.$errors" :key="error.$uid" class="error">
          {{ error.$message }}
        </small>
      </div>
      <div class="field">
        <v-text-field v-model.trim="v$.value_short.$model" label="Укороченное наименование"
          placeholder="Введите укороченное наименование" variant="outlined" clearable />
        <small v-for="error of v$.value_short.$errors" :key="error.$uid" class="error">
          {{ error.$message }}
        </small>
      </div>
      <div class="field">
        <v-text-field v-model.number="v$.sequence.$model" label="Порядковый номер" placeholder="Введите порядковый номер"
          variant="outlined" clearable />
        <small v-for="error in v$.sequence.$errors" :key="error.$uid" class="error">
          {{ error.$message }}
        </small>
      </div>
      <div class="field">
        <v-autocomplete v-model.number="v$.block_id.$model" clearable label="Номер блока"
          placeholder="Выберите номер блока" :items="blocks" variant="outlined" />
        <small v-for="error of v$.block_id.$errors" :key="error.$uid" class="error">
          {{ error.$message }}
        </small>
      </div>
      <div class="field">
        <v-text-field v-model.trim="v$.unit.$model" label="Единица измерения" placeholder="Введите единицу измерения"
          clearable variant="outlined" />
        <small v-for="error of v$.unit.$errors" :key="error.$uid" class="error">
          {{ error.$message }}
        </small>
      </div>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="outlined" color="blue" @click="saveField">Сохранить</v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
import { useStore } from "vuex";
import { reactive, computed } from 'vue';
import useVuelidate from '@vuelidate/core'
import { helpers, required } from "@vuelidate/validators"

export default {
  props: {
    field: {
      type: Object,
      default: null
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const blocks = [10, 20, 30, 40, 50];
    let editingField = reactive(
      JSON.parse(JSON.stringify(props.field ||
      {
        value_short: "",
        value_full: "",
        sequence: 0,
        block_id: 0,
        unit: "",
      }
      ))
    );

    const isMoreZero = (value) => value !== 0;
    const rules = computed(() => ({
      value_short: { required: helpers.withMessage('Введите укороченное наименование', required) },
      value_full: { required: helpers.withMessage('Введите полное наименование', required) },
      sequence: { required: helpers.withMessage('Введите порядковый номер', required) },
      block_id: {
        required: helpers.withMessage('Введите номер блока', required),
        isMoreZero: helpers.withMessage('Номер блока не может быть 0', isMoreZero)
      },
      unit: { required: helpers.withMessage('Введите единицу измерения', required) },
    }));

    const v$ = useVuelidate(rules, editingField);

    const store = useStore();

    const saveField = () => {
      v$.value.$touch();
      if (v$.value.$error) return;

      if (props.isEdit) store.dispatch("changeField", editingField)
      else store.dispatch("addField", editingField);

      emit("close");
    }

    return { blocks, v$, saveField }
  }
}
</script>

<style scoped>
.error {
  color: red;
  font-size: initial;
  font-weight: initial;
}

.field {
  margin-top: 25px;
}
</style>