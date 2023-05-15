<template>
  <div>
    <navigation-panel :enterFieldAct="true" />
    <v-card flat tile outlined class="fieldAct">
      <tasks-panel :is-research="isResearch" @selectTask="(task) => selectTask(task)" />
      <div v-if="data">
        <template v-if="!data.is_new">
          <template v-if="data.data">
            <header class="fieldAct__header" style="display: flex; justify-content: space-around;">
              <v-btn icon title="Печать">
                <icon icon="mdi:printer-outline" width="25" color="orange" @click="table.print()" />
              </v-btn>
              <v-btn icon title="Экспортировать в Excel" @click="saveAsExcel">
                <icon icon="mdi:microsoft-excel" width="25" color="orange" />
              </v-btn>
              <v-btn v-if="isResearch && !isAgreed" icon title="Скачать" @click="download">
                <icon icon="mdi:download" width="25" color="orange" />
              </v-btn>
              <v-btn v-if="isResearch && !isAgreed" icon title="Загрузить" @click="upload">
                <icon icon="mdi:upload" width="25" color="orange" />
              </v-btn>
              <v-btn v-if="isResearch && !isAgreed" icon :title="title" @click="edit">
                <icon :icon="icon" width="25" color="orange" />
              </v-btn>
              <v-btn v-if="isResearch && !isAgreed" icon title="Выбрать новый шаблон" @click="data.is_new = true">
                <icon icon="mdi:view-list-outline" width="25" color="orange" />
              </v-btn>
              <v-btn v-if="isResearch && !isAgreed" icon title="Добавить строчку" @click="isAddFields = !isAddFields">
                <icon icon="mdi:table-column-plus-after" width="25" color="orange" />
              </v-btn>
            </header>
            <v-divider />
            <field-act-table ref="table" :data="data" :is-edit="isEdit" />
          </template>
        </template>
        <template v-else-if="data.is_new">
          <template v-if="isResearch">
            <field-act-templates :data="data" />
          </template>
          <div v-else class="warning">Полевой акт не создан</div>
        </template>
        <field-act-footer class="fieldAct__footer" :data="data" />
      </div>
      <div v-else class="warning">Выберете полевой акт</div>
    </v-card>
    <v-dialog v-model="isAddFields" width="1000">
      <field-act-dialog-fields :field-in-data="data.data" :research="data.research_id" @close="close" />
    </v-dialog>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue"
import { toast } from "vue3-toastify";
import TasksPanel from '../src/components/TasksPanel.vue';
import FieldActTable from '../src/components/fieldAct/FieldActTable.vue'
import NavigationPanel from '../src/components/NavigationPanel.vue';
import FieldActTemplates from '../src/components/fieldAct/FieldActTemplates.vue';
import FieldActDialogFields from '../src/components/fieldAct/FieldActDialogFields.vue';
import FieldActFooter from '@/components/fieldAct/FieldActFooter.vue';
import saveExcel from "../src/components/fieldAct/saveExcel.js";

export default {
  name: "PageFieldAct",
  components: { NavigationPanel, TasksPanel, FieldActTable, FieldActTemplates, FieldActDialogFields, FieldActFooter, Icon },
  setup() {
    const router = useRouter();
    const user = JSON.parse(localStorage.getItem("currentUser"))
    if (!user) {
      router.push("/");
      return;
    } else if (user.role === "Координатор") {
      router.push("/corrector");
      return;
    }

    const store = useStore();

    const data = ref(null);
    const table = ref(null);

    const isResearch = ref(user.role === "Исследователь");
    const isAgreed = ref(false);
    const isEdit = ref(false);
    const isAddFields = ref(false);
    const icon = ref("mdi:clipboard-edit-outline");
    const title = ref("Редактировать");

    const selectTask = (task) => {
      data.value = task;
      isAgreed.value = data.value.id_status !== 1;
    };

    const saveAsExcel = () => saveExcel(data.value);

    const edit = () => {
      if (isEdit.value) {
        isEdit.value = false;
        icon.value = "mdi:clipboard-edit-outline";
        title.value = "Редактировать";
        save();
      } else {
        isEdit.value = true;
        icon.value = "mdi:content-save";
        title.value = "Сохранить";
      }
    };

    const save = () => store.dispatch("changeResearch", data.value);

    const download = () => {
      const dataString = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data.value));
      const downloadAnchorNode = document.createElement("a");

      downloadAnchorNode.setAttribute("href", dataString);
      downloadAnchorNode.setAttribute("download", `Field_Act_${data.value.research_id}.ppgrp_fa`);

      document.body.appendChild(downloadAnchorNode);

      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    };

    const upload = async () => {
      const promise = await new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
          try {
            const jsonContent = JSON.parse(reader.result);
            resolve(jsonContent);
          } catch (error) {
            toast.error("Не верный формат файла");
            reject(new Error("Не верный формат файла"))
          }
        };

        reader.onerror = (error) => {
          console.log(error);
          toast.error("Невозможно прочитать файл");
          reject(new Error("Невозможно прочитать файл"));
        };

        const input = document.createElement("input");

        input.setAttribute("type", "file");

        input.onchange = (e) => reader.readAsText(e.target.files[0]);

        document.body.appendChild(input);

        input.click();
        input.remove();
      });

      if (promise.research_id !== data.value.research_id) {
        toast.error("Выбран файл другого полевого акта");
        throw new Error("Выбран файл другого полевого акта");
      }

      data.value = promise;
      store.dispatch("changeResearch", data.value);
    };

    const close = () => {
      isAddFields.value = false;
      store.dispatch("changeResearch", data.value);
    };

    return {
      data,
      table,
      isResearch,
      isAgreed,
      isEdit,
      isAddFields,
      icon,
      title,
      saveAsExcel,
      edit,
      selectTask,
      download,
      upload,
      close
    }
  }
}
</script>

<style scoped>
.warning {
  /* margin: 200px auto; */
  font-size: 30pt;
}

/* .fieldAct {
  margin-top: 20px;
  margin-right: 5px;
  display: grid;
  gap: 20px;
  grid-template-columns: 315px auto;
  border-top: 1px solid orange;
  height: calc(100vh - 177px);
} */

.fieldAct {
  height: calc(100vh - 177px);
  min-height: calc(100% - 24px) !important;
  width: 100%;
  margin-top: 20px;
  margin-right: 5px;
  display: flex;
  border-top: 1px solid orange;
}

field-act-tabs-panel {
  margin-right: 0;
  z-index: 2;
}

.fieldAct__header {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.fieldAct__footer {
  position: fixed;
  right: 0;
  bottom: 0;
  width: calc(100% - 337px);
}
</style>