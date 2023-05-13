<template>
  <div class="main-container">
    <div class="main-part">
      <div class="menu-container">
        <table-open-file :getFiles="getFiles" @openFile="openFile" />
      </div>
      <div class="content-container">
        <template v-if="data.length !== 0">
          <div class="up__part">
            <table-up-research-field-act :research="research" :other="other" />
            <table-button class="btn__save" :disabled="
              data.length === 0 || other.length === 0 || research.length === 0
            " @click="saveFile()">
              <img src="../assets/save.svg" alt="Сохранить файл" />
            </table-button>
          </div>
          <table class="main__table">
            <thead>
              <table-header-field-act />
            </thead>
            <tbody>
              <template v-for="(item, rowIndex) in data" :key="item.FIELD_ACT_ID" class="table__body__field__act">
                <table-body-field-act v-if="item !== 'divide'" :rowIndex="rowIndex" :item="item"
                  :countColums="data.length - 1" @deletingItem="deletingItem(rowIndex)"
                  @addNewRow="addNewRow(rowIndex + 1)" />
                <tr v-else>
                  <td colspan="11" class="empty__row" />
                  <td />
                  <td colspan="2" class="empty__row" />
                </tr>
              </template>
            </tbody>
            <tfoot>
              <table-footer-field-act :data="data" @sumPropant="(value) => allPropantsFromSurface = value" />
            </tfoot>
          </table>
          <div>
            <table-down-research-field-act :allPropantsFromSurface="allPropantsFromSurface" :other="other"
              :research="research" style="margin-top:20px; margin-bottom: 20px;" />
            <table-other-field-act :other="other" :research="research" />
          </div>
        </template>
        <template v-else>
          <h1>Выберите файл</h1>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import TableHeaderFieldAct from "./TableHeaderFieldAct.vue";
import TableBodyFieldAct from "./TableBodyFieldAct.vue";
import TableFooterFieldAct from "./TableFooterFieldAct.vue";
import TableOtherFieldAct from "./TableOtherFieldAct.vue";
import TableDownResearchFieldAct from "./TableDownResearchFieldAct.vue";
import TableUpResearchFieldAct from "./TableUpResearchFieldAct.vue";
import TableOpenFile from "./TableOpenFile.vue";

export default {
  data() {
    return {
      name: "table-field-act",
      getFiles: [],
      selectedFile: { data: [], other: [], research: [] },
      data: [],
      other: [],
      research: [],

      currentPath: "",
      allPropantsFromSurface: 0,
    };
  },

  components: {
    TableHeaderFieldAct,
    TableBodyFieldAct,
    TableOtherFieldAct,
    TableDownResearchFieldAct,
    TableUpResearchFieldAct,
    TableFooterFieldAct,
    TableOpenFile,
  },

  created() {
    const promise = new Promise(function (resolve) {
      resolve(window.api.GetFiles());
    });

    promise.then((filesPush) => (this.getFiles.push(filesPush)));
  },

  methods: {
    openFile(readInfo, pathToFile) {
      this.data = readInfo.data;
      this.other = readInfo.other;
      this.research = readInfo.research;

      this.selectedFile = readInfo;
      this.currentPath = pathToFile;
    },

    addNewRow(index) {
      this.data.splice(index, 0, {
        FIELD_ACT_ID: null,
        RESEARCH_ID: null,
        TITLE: null,
        UNIT: null,
        MB_BEFORE_FRACTURING: 0,
        MB_AFTER_FRACTURING: 0,
        MB_FACT: 0,
        DESIGN: 0,
        REDESIGN: 0,
        FACT: 0,
        SOURCE_TYPE: null,
        FACT_PARENT_FK: null,
        IS_EDITABLE: 1,
        IS_TITLE_EDITABLE: 1,
      });
    },

    deletingItem(index) {
      this.data.splice(index, 1);
    },

    saveFile() {
      const fileName = `Полевой_акт_${this.research.WELL_NAME}_${this.research.OILFIELD}_куст_${this.research.CLUSTER}_цех_${this.other.SHOP_NAME}_ID_${this.other.FINAL_REPORT_ID}.json`;

      window.api.SaveFileOnCurrentDirectory(
        `${fileName};${JSON.stringify(this.selectedFile)}`
      );

      alert(`Вы успешно сохранили файл! \n${fileName}`);
    },
  },
};
</script>

<style>
header {
  line-height: 1.5;
}

.up__part {
  display: flex;
  justify-content: space-between;
}

table {
  border-collapse: collapse;
}

.main-container {
  width: 100%;
  margin-left: 5px;
  border: 1px solid #1976d2;
  padding: 5px;
}

.content-container {
  display: inline-block;
  flex-direction: column;
  overflow: auto;
  max-width: 100%;
  max-height: 100%;
  margin-left: 5px;
}

.main-part {
  display: flex;
  width: 100%;
  height: 90vh;
}

.menu-container {
  min-width: 315px;
  height: 100%;
  border-right: 1px solid #ef7f1a;
  overflow: scroll;
}

.btn__save {
  margin: 20px;
}

.btn__save img {
  width: 30px;
}

.empty__row {
  border-top: 1.1px solid #ef7f1a !important;
  border-bottom: 1.1px solid #ef7f1a !important;
  height: 10px;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  background: #ef7f1a;
  border-radius: 0.819847px;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>
