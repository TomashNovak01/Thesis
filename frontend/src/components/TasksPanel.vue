<template>
  <div class="panel">
    <header>
      <div style="display: flex; padding: 5px 10px;">
        <div style="margin-top: 15px;">{{ isCorrect ? "Полевые акты на согласование" : "Полевые акты" }}</div>
        <v-spacer />
        <v-btn v-if="isResearch" icon title="Создать полевой акт" @click="dialogResearch = !dialogResearch">
          <v-icon color="orange" icon="mdi-plus" />
        </v-btn>
      </div>
      <input type="text" class="search" placeholder="Поиск" v-model="search">
    </header>
    <v-divider />
    <table>
      <colgroup>
        <col />
        <col />
        <col />
        <col />
      </colgroup>
      <thead>
        <tr>
          <th>Задача</th>
          <th>№ скв</th>
          <th>Месторождение</th>
          <th>Согл?</th>
        </tr>
      </thead>
      <tbody v-if="researches">
        <template v-for="(research, index) of researches">
          <tr v-if="research &&
            (!search ||
              research.research_id.toString().trim().toLowerCase().includes(search.trim().toLowerCase()) ||
              research.well_name.trim().toLowerCase().includes(search.trim().toLowerCase()) ||
              research.oilfield.trim().toLowerCase().includes(search.trim().toLowerCase()))
            " :key="'research_' + index"
            :class="{ active__row: activeResearch === research.research_id, row_before_active: research.research_id === activeResearch - 1 }"
            @click.prevent="selectTask(research)">
            <td class="first">{{ research.research_id }}</td>
            <td>{{ research.well_name }}</td>
            <td>{{ research.oilfield }}</td>
            <td class="last">
              <icon v-if="research.id_status === 1" icon="mdi:close-thick" color="red" />
              <icon v-if="research.id_status === 2" icon="mdi:exclamation-thick" color="blue" />
              <icon v-if="research.id_status === 3" icon="mdi:plus-thick" color="green" />
            </td>
          </tr>
          <!-- <tr v-else :key="'no_research_' + index" class="noData">
            <td colspan="4">
              Данные отсутствуют
            </td>
          </tr> -->
        </template>
      </tbody>
    </table>
    <v-dialog v-model="dialogResearch" width="1000">
      <v-card>
        <v-card-title>Создание нового полевого акта</v-card-title>
        <v-card-text>
          <div>
            <v-text-field v-model.trim="v$.contractor.$model" label="Подрядчик" placeholder="Введите подрядчика"
              variant="outlined" clearable />
            <small v-for="error of v$.contractor.$errors" :key="error.$uid" class="error">
              {{ error.$message }}
            </small>
          </div>
          <div class="field">
            <v-text-field v-model.trim="v$.well_name.$model" label="Номер скважины" placeholder="Введите номер скважины"
              variant="outlined" clearable />
            <small v-for="error of v$.well_name.$errors" :key="error.$uid" class="error">
              {{ error.$message }}
            </small>
          </div>
          <div class="field">
            <v-text-field v-model.trim="v$.cluster.$model" label="Номер куста" placeholder="Введите номер куста"
              variant="outlined" clearable />
            <small v-for="error of v$.cluster.$errors" :key="error.$uid" class="error">
              {{ error.$message }}
            </small>
          </div>
          <div class="field">
            <v-text-field v-model.trim="v$.objects.$model" label="Номер пласта" placeholder="Введите номер пласта"
              variant="outlined" clearable />
            <small v-for="error of v$.objects.$errors" :key="error.$uid" class="error">
              {{ error.$message }}
            </small>
          </div>
          <div class="field">
            <v-text-field v-model.trim="v$.oilfield.$model" label="Месторождение" placeholder="Введите месторождение"
              variant="outlined" clearable />
            <small v-for="error of v$.oilfield.$errors" :key="error.$uid" class="error">
              {{ error.$message }}
            </small>
          </div>
          <v-card-actions>
            <v-spacer />
            <v-btn variant="outlined" color="blue" @click="saveResearch">Сохранить</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogStatistic" width="1000">
      <statistic-on-field-act :researches="researches" />
    </v-dialog>
    <footer v-if="!isCorrect">
      <v-btn icon title="Статистика по полевым актам" @click="dialogStatistic = true">
        <icon width="20" icon="akar-icons:statistic-up" color="orange" />
      </v-btn>
    </footer>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore } from "vuex";
import useVuelidate from '@vuelidate/core'
import { helpers, required } from "@vuelidate/validators"
import StatisticOnFieldAct from './StatisticOnFieldAct.vue';

export default {
  components: { StatisticOnFieldAct },
  props: {
    isResearch: {
      type: Boolean,
      default: false
    },
    isCorrect: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const store = useStore();

    const search = ref("");

    let newTask = ref({
      contractor: "",
      well_name: "",
      cluster: "",
      objects: "",
      oilfield: "",
      is_new: true
    });

    const rules = computed(() => ({
      contractor: { required: helpers.withMessage('Введите подрядчика', required) },
      well_name: { required: helpers.withMessage('Введите номер скважины', required) },
      cluster: { required: helpers.withMessage('Введите номер куста', required) },
      objects: { required: helpers.withMessage('Введите номер пласта', required) },
      oilfield: { required: helpers.withMessage('Введите месторождение', required) },
    }));

    const v$ = useVuelidate(rules, newTask);

    const researches = props.isCorrect ?
      computed(() => store.getters.getResearchesForApproval) :
      computed(() => store.getters.getResearches);

    const dialogResearch = ref(false);
    const dialogStatistic = ref(false);

    const activeResearch = ref(null);
    const selectTask = (research) => {
      activeResearch.value = research.research_id
      emit("selectTask", research);
    };

    const saveResearch = () => {
      v$.value.$touch();
      if (v$.value.$error) return;

      dialogResearch.value = false;
      store.dispatch("addResearch", newTask.value);
    };

    return {
      search,
      researches,
      v$,
      dialogResearch,
      dialogStatistic,
      activeResearch,
      saveResearch,
      selectTask
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

.search {
  width: 95%;
  margin-left: 10px;
  margin-top: 10px;
  padding: 5px 5px;
  border: 1px solid gray;
  border-radius: 5px;
}

.field {
  margin-top: 25px;
}

.panel {
  max-width: 312px;
  border-right: 1px solid orange;
  background: white;
}

table {
  margin-left: 5px;
  font-size: 12px;
  font-weight: 600;
  border-collapse: collapse;
  overflow: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
}

table td {
  padding: 0 10px;
  height: 25px;
  border: 1px solid #dddddd;
  text-align: center;
}


th {
  line-height: normal;
  min-width: 65px;
  color: gray;
  border: none;
  user-select: none;
  position: sticky;
  top: 0;
  background: var(--color-background);
  padding: 0 5px;
}

tbody tr:nth-child(2n) {
  background: #edeff2;
}

tbody tr:hover {
  background: #ffd16e !important;
  cursor: pointer;
}

.active__row td {
  border-top: 1px solid orange;
  border-bottom: 1px solid orange;
  background: #ffd16e4d;
}

.last {
  border-right: 1px solid #dddddd;
}

.row_before_active td {
  border-bottom: 1px solid orange;
}

footer {
  position: fixed;
  left: 0;
  bottom: 0;
  margin: 10px;
}
</style>