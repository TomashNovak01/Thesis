<template>
  <div class="printField">
    <table class="fieldAct__table">
      <colgroup>
        <col span="1" style="width: 91px;">
        <col span="1" style="width: 91px;">
        <col span="1" style="width: 91px;">
        <col span="1" style="width: 91px;">
        <col span="1" style="width: 91px;">
        <col span="1" style="width: 91px;">
        <col span="1" style="width: 91px;">
        <col span="1" style="width: 91px;">
        <col span="1" style="width: 91px;">
        <col span="1" style="width: 91px;">
        <col span="1" style="width: 91px;">
        <col span="1" style="width: 91px;">
        <col span="1" style="width: 91px;">
        <col span="1" style="width: 91px;">
        <col span="1" style="width: 160px;">
        <col span="1" style="width: 91px;">
        <col span="1" style="width: 91px;">
        <col span="1" style="width: 91px;">
        <col span="1" style="width: 91px;">
      </colgroup>
      <tbody>
        <tr>
          <td class="noBorder ta-l" colspan="5">ПОЛЕВОЙ ОТЧЁТ ПО ГИДРОРАЗРЫВУ ПЛАСТА</td>
        </tr>
        <tr>
          <td class="smt noBorder ta-l">Подрядчик:</td>
          <td class="smt noBorder ta-l" />
          <td class="smt noBorder ta-l">{{ data.contractor }}</td>
        </tr>
        <tr>
          <td class="smt noBorder ta-l">Договор №</td>
          <td class="smt noBorder ta-l">
            <template v-if="!isEdit">{{ selectedContract.value_full }}</template>
            <v-autocomplete v-else v-model="selectedContract" :items="contracts" item-title="value_full" return-object
              variant="underlined" density="compact" color="orange" class="smt noBorder ta-l w100 s30" />
          </td>
          <td class="smt noBorder ta-l">от</td>
          <td class="smt noBorder ta-l"><span>{{ selectedContract.date }}</span></td>
        </tr>
        <tr>
          <td class="smt noBorder ta-l">месторождение</td>
          <td class="smt noBorder ta-l" />
          <td class="noBorder ta-l">{{ data.oilfield }}</td>
        </tr>
        <tr>
          <td class="smt noBorder ta-l">скважина</td>
          <td class="smt noBorder ta-l" />
          <td class="noBorder ta-l">{{ data.well_name }}</td>
        </tr>
        <tr>
          <td class="smt noBorder ta-l">куст</td>
          <td class="smt noBorder ta-l" />
          <td class="noBorder ta-l">{{ data.cluster }}</td>
        </tr>
        <tr>
          <td class="smt noBorder ta-l">пласт</td>
          <td class="smt noBorder ta-l" />
          <td class="noBorder ta-l">{{ data.objects }}</td>
        </tr>
        <tr>
          <td class="smt noBorder ta-l">Дата ГРП</td>
          <td class="smt noBorder ta-l" />
          <td class="smt noBorder ta-l">
            <span v-if="!isEdit">{{ data.grp_date }}</span>
            <VueDatePicker v-else v-model="data.grp_date" :format="dateFormat" />
          </td>
        </tr>
        <tr>
          <td class="noBorder" colspan="7" />
          <td colspan="3">мат. баланс</td>
        </tr>
        <tr>
          <td class="fieldAct_header" colspan="6">Оборудование и материалы</td>
          <td class="fieldAct_header">ед.изм</td>
          <td class="fieldAct_header" style="border-left: 1px solid orange">перед ГРП</td>
          <td class="fieldAct_header">после ГРП</td>
          <td class="fieldAct_header" style="border-right;: 1px solid orange">факт по мат. балансу</td>
          <td class="fieldAct_header">по дизайну</td>
          <td class="fieldAct_header">редизайн</td>
          <td class="fieldAct_header">факт по приборам</td>
          <td class="fieldAct_header">реД-факт МБ</td>
          <td class="fieldAct_header">% вып-я, факт (МБ) от плана (реД)</td>
          <td class="fieldAct_header">к оплате</td>
          <td class="noBorder hideOnPrint" />
          <td class="fieldAct_header hideOnPrint">факт / факт(МБ), %</td>
          <td class="fieldAct_header hideOnPrint">Ред / факт(МБ), %</td>
        </tr>
        <template v-for="(field, i) in [...data.data, propants]">
          <tr v-if="field" :key="'field_' + i" :class="{ lastSimpleRow: field.title === 'Всего пропанта' }">
            <td class="ta-l" colspan="6">
              <template v-if="!isEdit || !field.is_title_editable">{{ field.title }}</template>
              <input v-else :id="`input1-${i}`" v-model.number="field.title" class="table_input"
                @focus="setCurrent(i, 1)" />
            </td>
            <td class="smt ta-l">{{ field.unit }}</td>
            <td class="ta-r">
              <template v-if="!isEdit">{{ field.mb_before_fracturing }}</template>
              <input v-else :id="`input2-${i}`" v-model.number="field.mb_before_fracturing" class="table_input"
                @focus="setCurrent(i, 2)" @change="field.to_pay = getToPay(field)" />
            </td>
            <td class="ta-r">
              <template v-if="!isEdit">{{ field.mb_after_fracturing }}</template>
              <input v-else :id="`input3-${i}`" v-model.number="field.mb_after_fracturing" class="table_input"
                @focus="setCurrent(i, 3)" @change="field.to_pay = getToPay(field)" />
            </td>
            <td class="ta-r">
              <template v-if="!field.is_editable">{{ getFactMB(field) }}</template>
              <template v-else>
                <template v-if="!isEdit">{{ field.mb_frac }}</template>
                <input v-else :id="`input4-${i}`" v-model.number="field.mb_frac" class="table_input"
                  @focus="setCurrent(i, 4)" />
              </template>
            </td>
            <td class="ta-r">
              <template v-if="!isEdit">{{ field.design }}</template>
              <input v-else :id="`input5-${i}`" v-model.number="field.design" class="table_input"
                @focus="setCurrent(i, 5)" />
            </td>
            <td class="ta-r">
              <template v-if="!isEdit">{{ field.redesign }}</template>
              <input v-else :id="`input6-${i}`" v-model.number="field.redesign" class="table_input"
                @focus="setCurrent(i, 6)" />
            </td>
            <td class="ta-r">
              <template v-if="!isEdit">{{ field.fact }}</template>
              <template v-else-if="isFixedField(field)">-</template>
              <input v-else :id="`input7-${i}`" v-model.number="field.fact" class="table_input"
                @focus="setCurrent(i, 7)" />
            </td>
            <td class="ta-r">{{ Math.round(((field.redesign || 0) - (getFactMB(field) || 0)) * 1000) / 1000 }}</td>
            <td>{{ getPercentage(field) }}</td>
            <td class="ta-r">
              <template v-if="!isEdit">{{ getToPay(field) }}</template>
              <input v-else :id="`input10-${i}`" v-model.number="field.to_pay" class="table_input"
                @focus="setCurrent(i, 10)" />
            </td>
            <td class="noBorder hideOnPrint" />
            <td class="hideOnPrint" :class="{ lightRedBG: calcPercent(field.fact, getFactMB(field)).isTooMuch }">
              <template v-if="isFixedField(field)">-</template>
              <template v-else>{{ calcPercent(field.fact, getFactMB(field)).value }}</template>
            </td>
            <td class="hideOnPrint" :class="{ lightRedBG: calcPercent(field.redesign, getFactMB(field)).isTooMuch }">
              {{ calcPercent(field.redesign, getFactMB(field)).value }}
            </td>
            <td v-if="isEdit">
              <v-icon size="14" color="red" icon="mdi-minus-circle" @click="data.data.splice(i, 1)" />
            </td>
          </tr>

          <template v-if="field.block_id !== (data.data[i + 1] || { block_id: field.block_id }).block_id">
            <tr :key="'divider_' + i">
              <td class="noBorder noBorder__divider" colspan="16" />
              <td class="noBorder" colspan="1" />
              <td class="noBorder noBorder__divider" colspan="2" />
            </tr>
          </template>
        </template>
        <tr>
          <td class="noBorder" />
        </tr>
        <tr>
          <td class="noBorder" colspan="9" />
          <td class="bto" colspan="3">вид осложнения</td>
          <td class="bto" colspan="2">{{ data.complication || "-" }}</td>
        </tr>
        <tr>
          <td class="noBorder" colspan="9" />
          <td class="bto" colspan="3">всего пропанта с поверхности</td>
          <td class="bto" colspan="2">{{ getFactMB(propants) }}</td>
        </tr>
        <tr>
          <td class="noBorder" colspan="9" />
          <td class="bto" colspan="3">пропант в нкт</td>
          <td class="bto" colspan="2">
            <template v-if="!isEdit">{{ data.f_propant_mass_nkt }}</template>
            <input v-else v-model="data.f_propant_mass_nkt" class="table_input" />
          </td>
        </tr>
        <tr>
          <td class="noBorder" />
        </tr>
        <tr>
          <td class="ta-l fieldAct_header" colspan="6">Представитель {{ data.contractor }}</td>
          <td class="ta-l fieldAct_header" colspan="6">Представитель Заказчик</td>
          <td class="ta-l fieldAct_header" colspan="6">Представитель цеха</td>
        </tr>
        <tr style="height: 36px">
          <td class="br-0 ta-l">Должность:</td>
          <td class="bl-0 ta-l" colspan="5">
            <template v-if="!isEdit">{{ data.executer_role }}</template>
            <input v-else v-model="data.executer_role" class="table_input" />
          </td>
          <td class="br-0 ta-l">Должность:</td>
          <td class="bl-0 ta-l" colspan="5">
            <template v-if="!isEdit">{{ data.client_role }}</template>
            <input v-else v-model="data.client_role" class="table_input" />
          </td>
          <td class="br-0 ta-l">Должность:</td>
          <td class="bl-0 ta-l" colspan="5">
            <template v-if="!isEdit">{{ data.shop_role }}</template>
            <input v-else v-model="data.shop_role" class="table_input" />
          </td>
        </tr>
        <tr style="height: 36px">
          <td class="br-0 ta-l">ФИО:</td>
          <td class="br-0 ta-l" colspan="5">
            <template v-if="!isEdit">{{ data.executer_person }}</template>
            <input v-else v-model="data.executer_person" class="table_input" />
          </td>
          <td class="br-0 ta-l">ФИО:</td>
          <td class="br-0 ta-l" colspan="5">
            <template v-if="!isEdit">{{ data.client_person }}</template>
            <input v-else v-model="data.client_person" class="table_input" />
          </td>
          <td class="br-0 ta-l">ФИО:</td>
          <td class="ta-l" colspan="5">
            <template v-if="!isEdit">{{ data.shop_person }}</template>
            <input v-else v-model="data.shop_person" class="table_input" />
          </td>
        </tr>
        <tr style="height: 36px">
          <td class="br-0 ta-l bbo">Подпись:</td>
          <td class="br-0 ta-l bbo" colspan="5" />
          <td class="br-0 ta-l bbo">Подпись:</td>
          <td class="br-0 ta-l bbo" colspan="5" />
          <td class="br-0 ta-l bbo">Подпись:</td>
          <td class="ta-l bbo" colspan="5" />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { computed, ref, watch, onMounted, $refs } from 'vue'
import { useStore } from "vuex";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import dayjs from "dayjs"

export default {
  props: {
    data: {
      type: Object,
      require: true
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  components: { VueDatePicker },
  setup(props) {
    const store = useStore();
    store.dispatch("fillContracts");

    const contracts = computed(() => store.getters.getContracts);
    console.log(contracts);
    const selectedContract = ref(contracts.value.find((c) => c.id_code === props.data.id_contract) || { value_full: "", date: "" });
    console.log(selectedContract);
    const selectedGRPDate = ref(dayjs(props.data.grp_date).format("DD.MM.YYYY"));

    let registeredInputs = { total: 0 };
    const currentRow = ref(0);
    const currentColumn = ref(2);

    const dateFormat = (date) => dayjs(date).format("DD.MM.YYYY");


    let propants = computed(() => {
      const propant = props.data.data.filter((f) => f.block_id === 50);
      const result = {
        id_code: 0,
        title: "Всего пропанта",
        unit: "тн",
        mb_before_fracturing: 0,
        mb_after_fracturing: 0,
        mb_frac: 0,
        design: 0,
        redesign: 0,
        fact: 0
      };

      propant.map((p) => {
        result.id_code += p.id_code;
        result.mb_before_fracturing += p.mb_before_fracturing;
        result.mb_after_fracturing += p.mb_after_fracturing;
        result.mb_frac += p.mb_frac;
        result.design += p.design;
        result.redesign += p.redesign;
        result.fact += p.fact;
      });

      return {
        id_code: result.id_code,
        title: "Всего пропанта",
        unit: "тн",
        mb_before_fracturing: Math.round(result.mb_before_fracturing * 100) / 100,
        mb_after_fracturing: Math.round(result.mb_after_fracturing * 100) / 100,
        mb_frac: Math.round(result.mb_frac * 100) / 100,
        design: Math.round(result.design * 100) / 100,
        redesign: Math.round(result.redesign * 100) / 100,
        fact: Math.round(result.fact * 100) / 100
      };
    })

    watch(selectedContract, (newValue) => props.data.id_contract = newValue.id_code);
    watch(selectedGRPDate, (newValue) => props.data.grp_date = dayjs(newValue).format("DD.MM.YYYY"));

    onMounted(() => {
      const registerInputs = (row, column) => {
        if (!registeredInputs[row]) registeredInputs[row] = [column];
        else registeredInputs[row].push(column);

        registeredInputs[row] = registeredInputs[row].sort((a, b) => a - b);
      }

      registeredInputs.total = props.data.data.length;

      let fieldIndex = 0;

      for (const field of props.data.data) {
        if (field.is_title_editable) registerInputs(fieldIndex, 1);
        if (field.is_editable) registerInputs(fieldIndex, 4);
        if (!isFixedField(field)) registerInputs(fieldIndex, 7);

        [2, 3, 5, 6, 10].forEach((c) => registerInputs(fieldIndex, c));

        fieldIndex++;
      }

      window.addEventListener("keyup", (e) => {
        if (e.ctrlKey) {
          switch (e.code) {
            case "ArrowUp":
              if ((registeredInputs[currentRow.value - 1] || []).includes(currentColumn.value)) currentRow.value--;
              else if ((registeredInputs[currentRow.value - 2] || []).includes(currentColumn.value)) currentRow.value = currentRow.value - 2;
              break;

            case "ArrowDown":
              if ((registeredInputs[currentRow.value + 1] || []).includes(currentColumn.value)) currentRow.value++;
              else if ((registeredInputs[currentRow.value + 2] || []).includes(currentColumn.value)) currentRow.value = currentRow.value + 2;
              break;

            case "ArrowLeft":
              {
                const curRow = registeredInputs[currentRow.value];
                const idx = curRow.findIndex((v) => v === currentColumn.value);

                if (idx > 0) currentColumn.value = curRow[idx - 1];
              }
              break;

            case "ArrowRight":
              {
                const curRow = registeredInputs[currentRow.value];
                const idx = curRow.findIndex((v) => v === currentColumn.value);

                if (idx < curRow.length - 1) currentColumn.value = curRow[idx + 1];
              }
              break;

            default:
              break;
          }

          document.getElementById(`input${currentColumn.value}-${currentRow.value}`).focus();
        }
      })
    })

    const print = () => window.print();

    const setCurrent = (row, column) => {
      currentColumn.value = column;
      currentRow.value = row;
    };

    const calcPercent = (a, b) => {
      if (!a || !b) return { isTooMuch: false, value: "-" };

      const value = Math.round((10000 * a) / b) / 100;
      const isTooMuch = Math.round(value - 100) > 5;

      return { isTooMuch, value };
    };

    const isFixedField = (field) => field.title.toLowerCase().includes("биоцид");
    const isOrangeBG = (field) => (field.title || "").toLowerCase().includes("воды на куст");

    const getFactMB = (field) => Math.round((field.mb_before_fracturing - field.mb_after_fracturing) * 100) / 100 || 0;
    const getPercentage = (field) => !field.redesign || !getFactMB(field) ? 0 : Math.round((getFactMB(field) / field.redesign) * 10000) / 100;
    const getToPay = (field) => {
      const factMB = getFactMB(field) || 0;
      const getResult = () => {
        let result = 0;

        const percentage = getPercentage(r) || 0;
        const regesign = field.redesign || 0;

        if (percentage > 105) result = (regesign * 105) / 100;
        else if (percentage === 0) result = 0;
        else result = factMB;

        return result;
      }

      const row = props.data.data.find((f) => f.title && f.title.includes("Емкость для хранения"));

      if (!row) return getFactMB(field) || 0;

      const koef = row && row.title.includes("50 м3") ? 3 : 5;
      const result = getResult();

      field.to_pay = result + koef * (field.mb_frac || 0);

      return result + koef * (field.mb_frac || 0);
    }

    return {
      selectedContract,
      selectedGRPDate,
      contracts,
      propants,
      print,
      dateFormat,
      setCurrent,
      calcPercent,
      isFixedField,
      isOrangeBG,
      getFactMB,
      getPercentage,
      getToPay,
      dayjs
    };
  }
}
</script>

<style lang="scss" scoped>
.lightRedBG {
  background-color: #ff000045;
}

.fieldAct__table {
  border-collapse: collapse;
  font-size: 12px;
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
  max-width: 99%;
}

.fieldAct__table tr {
  width: 100% !important;
}

.fieldAct__table td {
  border: 1px solid orange;
  text-align: center;
  vertical-align: middle;
  height: 8px;
  padding: 0 5px;
}

.fieldAct__table input {
  width: 100%;
  background: #ffeac3;
  color: #000;
  text-align: center;
}

.noBorder {
  border-width: 0 !important;
}

.noBorder__divider {
  border-bottom: 1px solid orange;
  border-top: 1px solid orange;
}

.fieldAct_header {
  border-left: 0 !important;
  border-right: 0 !important;
  border-bottom: 1px solid orange !important;
  border-top: 1.1px solid orange !important;
  font-size: 13px !important;
}

.bto {
  border-top: 1.1px solid orange !important;
}

.bbo {
  border-bottom: 1px solid orange !important;
}

.lastSimpleRow td:not(.noBorder) {
  border-bottom: 1px solid orange !important;
}

.ta-l {
  text-align: left !important;
}

.ta-r {
  text-align: right !important;
}

.smt {
  font-size: 8pt;
}

.br-0 {
  border-right: 0 !important;
}

.bl-0 {
  border-left: 0 !important;
}

.w100 {
  width: 100px;
}

.s30 {
  size: 30px;
}

.editableField {
  background: #ef7d1a21;
}

.table_input {
  width: 100%;
  outline: none;
  border-bottom: 1px solid #000;
}

.table_input:focus {
  border-color: orange;
}

@media print {
  .hideOnPrint {
    display: none;
  }

  .printField {
    font-size: 10pt;
    height: 100vh;
    width: 100w;
    position: fixed;
    top: 0;
    left: 0;
    margin: 0;
    padding: 15px;
    z-index: 99999;
    background-color: #fff;

    .fieldAct__table {
      width: 100%;
      color: #000;
      background-color: #fff;

      td,
      th {
        border-top: 1px solid #000;
        border-right: 1px solid #000;
        border-bottom: 1px solid #000;
        border-left: 1px solid #000;
        height: 18px;
      }

      .noBorder {
        border-width: 0 !important;
      }

      .fieldAct_header {
        border: 1px solid #000 !important;
      }

      .bto {
        border-top: 1px solid #000;
      }

      .bbo {
        border-bottom: 1px solid #000;
      }

      .lastSimpleRow td:not(.noBorder) {
        border-bottom: 1px solid #000;
      }
    }
  }
}
</style>