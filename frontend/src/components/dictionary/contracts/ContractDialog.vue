<template>
  <v-card style="min-height: 450px">
    <v-card-title>
      {{ contract ? "Редактирование договора" : "Добавление договора" }}
    </v-card-title>
    <v-card-text>
      <v-text-field v-model.number="v$.value_full.$model" label="Полное наименование"
        placeholder="Введите полное наименование" variant="outlined" clearable />
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
import { toast } from "vue3-toastify";

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
    const contracts = computed(() => store.getters.getContracts);

    const dateFormat = (date) => dayjs(date).format("DD.MM.YYYY");

    const rules = computed(() => ({
      value_short: { required: helpers.withMessage('Введите укороченное наименование', required) },
      value_full: {},
      date: {},
    }));

    const v$ = useVuelidate(rules, editingContract);

    const saveContract = () => {
      v$.value.$touch();
      if (v$.value.$error) return;

      let today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const yyyy = today.getFullYear();

      const contract = {
        id_code: editingContract.id_code,
        value_short: editingContract.value_short,
        value_full: editingContract.value_full || `Договор №${editingContract.value_short}`,
        date: !!editingContract.date ? dayjs(editingContract.date).format("DD-MM-YYYY") : dd + "-" + mm + "-" + yyyy,
      }

      if (!!contracts.value.find((c) => c.value_full === contract.value_full && c.value_short === contract.value_short)) {
        toast.error("Контракт с такими наименованиями уже существует");
        return;
      }

      if (props.isEdit) store.dispatch("changeContract", contract);
      else store.dispatch("addContract", contract);

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