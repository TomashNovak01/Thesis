<template>
  <v-card style="min-height: 450px">
    <v-card-title>
      {{ contract ? "Редактирование договора" : "Добавление договора" }}
    </v-card-title>
    <v-card-text>
      <div>
        <v-text-field v-model.number="v$.value_full.$model" label="Полное наименование"
          placeholder="Введите полное наименование" variant="outlined" clearable />
        <small v-for="error in v$.value_full.$errors" :key="error.$uid" class="error">
          {{ error.$message }}
        </small>
      </div>
      <div class="contract">
        <v-text-field v-model.trim="v$.value_short.$model" label="Укороченное наименование"
          placeholder="Введите укороченное наименование" variant="outlined" clearable />
        <small v-for="error of v$.value_short.$errors" :key="error.$uid" class="error">
          {{ error.$message }}
        </small>
      </div>
      <div class="contract">
        <VueDatePicker v-model="v$.date.$model" :format="dateFormat" teleport-center />
        <small v-for="error in v$.date.$errors" :key="error.$uid" class="error">
          {{ error.$message }}
        </small>
      </div>
      <br>
      <br>
      <br>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="outlined" color="blue" @click="saveContract">Сохранить</v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
import { useStore } from "vuex";
import { reactive, computed } from 'vue';
import useVuelidate from '@vuelidate/core'
import { helpers, required } from "@vuelidate/validators"
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import dayjs from "dayjs"

export default {
  props: {
    contract: {
      type: Object,
      default: null
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  components: { VueDatePicker },
  setup(props, { emit }) {
    let editingContract = reactive(
      JSON.parse(JSON.stringify(props.contract ||
      {
        value_short: "",
        value_full: "",
        date: ""
      }
      ))
    );

    const store = useStore();

    const dateFormat = (date) => dayjs(date).format("DD.MM.YYYY");

    const rules = computed(() => ({
      value_short: { required: helpers.withMessage('Введите укороченное наименование', required) },
      value_full: { required: helpers.withMessage('Введите полное наименование', required) },
      date: { required: helpers.withMessage('Выберите дату', required) },
    }));

    const v$ = useVuelidate(rules, editingContract);

    const saveContract = () => {
      v$.value.$touch();
      if (v$.value.$error) return;

      if (props.isEdit) store.dispatch("changeContract", {
        id_code: editingContract.id_code,
        value_short: editingContract.value_short,
        value_full: editingContract.value_full,
        date: dayjs(editingContract.date).format("DD.MM.YYYY"),
      });
      else store.dispatch("addContract", {
        value_short: editingContract.value_short,
        value_full: editingContract.value_full,
        date: dayjs(editingContract.date).format("DD.MM.YYYY"),
      });

      emit("close");
    };

    return { dateFormat, v$, saveContract }
  }
}
</script>

<style scoped>
.error {
  color: red;
  font-size: initial;
  font-weight: initial;
}

.contract {
  margin-top: 25px;
}
</style>