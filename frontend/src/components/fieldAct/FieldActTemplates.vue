<template>
  <div class="templates">
    <header>Выберите шаблон полевого акта</header>
    <v-divider />
    <styled-table>
      <colgroup>
        <col style="width: 3%" />
        <col />
        <col style="width: 5%" />
        <col style="width: 5%" />
      </colgroup>
      <thead>
        <tr>
          <th v-for="(header, index) of headers" :key="index + ' ' + header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, index) of templates">
          <tr v-if="item" :key="'template_' + index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.template.name }}</td>
            <td>
              <v-icon color="orange" @click="item.isShown = !item.isShown">
                {{ item.isShown ? "mdi-chevron-up" : "mdi-chevron-down" }}
              </v-icon>
            </td>
            <td>
              <v-btn icon variant="text" :title="'Выбрать шаблон ' + item.template.name"
                @click="enterTemplate(item.template)">
                <icon color="green" width="25"
                  icon="streamline:interface-upload-website-action-actions-computer-website-device-display-upload-monitor-screen" />
              </v-btn>
            </td>
          </tr>
          <template v-if="item.isShown">
            <tr v-for="(field, i) in item.template.fields" :key="'template_' + index + '_field_' + i">
              <td colspan="5" style="text-align: left !important; padding: 0 15px;">{{ field.value_full }}</td>
            </tr>
          </template>
        </template>
      </tbody>
    </styled-table>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import StyledTable from '../common/StyledTable.vue'
import { Icon } from "@iconify/vue";

export default {
  name: "TemplateDictionary",
  components: { StyledTable, Icon },
  props: {
    data: {
      type: Object,
      require: true
    },
  },
  setup(props) {
    const headers = ["№", "Наименование", "", ""];
    const templates = ref([]);

    const store = useStore();
    const res = computed(() => store.getters.getTemplates);

    onMounted(() => {
      templates.value = [];
      for (let i = 0; i < res.value.length; i++) {
        templates.value.push({ template: res.value[i], isShown: false });
      }
    });

    const enterTemplate = (template) => {
      props.data.data = [];

      for (let i = 0; i < template.fields.length; i++) {
        props.data.data.push({
          id_code: template.fields[i].id_code,
          research_id: props.data.research_id,
          title: template.fields[i].value_full,
          unit: template.fields[i].unit,
          mb_before_fracturing: 0,
          mb_after_fracturing: 0,
          mb_frac: 0,
          design: 0,
          redesign: 0,
          fact: 0,
          to_pay: 0,
          sequence: template.fields[i].sequence,
          block_id: template.fields[i].block_id,
          is_editable: 1,
          is_title_editable: 0,
        });
      }

      props.data.is_new = false;
    }

    return {
      headers,
      templates,
      enterTemplate
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

.templates {
  width: 460%;
  margin-top: 15px;
  margin-left: 10px;
}
</style>