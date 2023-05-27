<template>
  <div class="fieldAct">
    <div v-if="!files.length" class="noFiles">
      <h2>Выберите файл полевого акта</h2>
      <btn @click="chooseFile">Выбрать</btn>
    </div>
    <template v-else>
      <div class="fieldAct_left">
        <Menu :files="files" @set-file="(file) => setFile(file)" />
      </div>
      <div class="fieldAct_right">
        <div v-if="current_file">
          <div class="fieldAct_right_header">
            <btn @click="save">Сохранить</btn>
            <DialogFields :data="current_file.data" :research="current_file.research_id" />
          </div>
          <Table :data="current_file" class="fieldAct_right_body" />
        </div>
        <div v-else>
          <h1>Выберите файл</h1>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Menu from "../components/Menu.vue";
import Table from "../components/Table.vue";
import DialogFields from "../components/DialogFields.vue";

const files = ref([]);
const current_file = ref(null);
const current_file_path = ref("");

onMounted(async () => {
  const data = await window.electronAPI.readFile({
    FILE_NAME: "FieldActList.json",
  });

  files.value = data || [];

  window.electronAPI.triggerSelectFileDialog(async (event) => {
    await chooseFile();
  });
});

const setFile = ({ file, path }) => {
  current_file.value = file;
  current_file_path.value = path;
}

const chooseFile = async () => {
  const file = await window.electronAPI.chooseFile({
    title: "Выберите полевой акт",
    filters: [
      {
        name: "Полевые акты",
        extensions: ["ppgrp_fa"],
      },
      {
        name: "Все файлы",
        extensions: ["*"],
      },
    ],
  });

  if (!file.canceled) {
    for (const path of file.filePaths) {
      const data = await window.electronAPI.readFileOnPath(path);

      const { research_id, well_name, oilfield } = data;
      const meta = {
        research_id: research_id,
        well_name: well_name,
        oilfield: oilfield,
        FILE_NAME: research_id + ".ppgrp_fa",
        FILE_PATH: path,
      };

      const prevFile = files.value.find(
        (f) => f.research_id === meta.research_id
      );

      let save = true;

      if (prevFile) {
        const ans = await window.electronAPI.showMessageBox({
          title: "Заменить полевой акт?",
          type: "question",
          buttons: ["Отмена", "Заменить"],
          defaultId: 1,
          cancelId: 0,
          message: "Полевой акт уже есть.",
          detail: `Полевой акт для закачки ${prevFile.research_id} уже есть в редакторе. \nВы действительно хотите заменить его?`,
        });

        save = ans.response === 1;

        if (save) files.value = files.value.filter((f) => f.research_id !== prevFile.research_id);
      };

      if (save) {
        files.value.push({
          ...data,
          FILE_NAME: `Field_Act_${data.research_id}.ppgrp_fa`,
          FILE_PATH: path
        });
        files.value = files.value.sort((a, b) => b.research_id - a.research_id);

        await window.electronAPI.writeFile({
          FILE_NAME: "FieldActList.json",
          data: JSON.stringify(files.value),
        });
      };
    };
  };
};

const save = async () => {
  await window.electronAPI.writeFile({
    // FILE_NAME: current_file_path.value.split("\\").slice(-1)[0],
    data: JSON.parse(JSON.stringify(current_file.value)),
    PATH: current_file_path.value
  });

  await window.electronAPI.showMessageBox({
    title: "Полевой акт сохранён",
    message: `Вы успешно сохранили полевой акт №${current_file.value.research_id}`
  })
}
</script>

<style lang="scss">
.fieldAct {
  margin: 10px;
  background: white;
  width: calc(100vw - 20px);
  height: calc(100vh - 20px);
  border: 1px solid #1976d2;
  border-radius: 15px;
  display: flex;

  .noFiles {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  &_right {
    display: inline-block;
    flex-direction: column;
    overflow: auto;
    max-width: 100%;
    max-height: 100%;
    margin-left: 10px;
    min-width: calc(100% - 285px);

    &_header {
      display: flex;
      justify-content: space-around;
      border-bottom: 1px solid orange;
      padding-top: 5px;
      padding-bottom: 10px;
      margin-bottom: 5px;
      width: 100%;
    }
  }

  &_left {
    width: 300px;
    height: 100%;
    border-right: 1px solid orange;
    overflow-y: overlay;
  }
}
</style>