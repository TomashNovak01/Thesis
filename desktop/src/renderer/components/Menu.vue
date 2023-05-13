<template>
  <table>
    <thead>
      <tr>
        <th>Задача</th>
        <th>№ скв</th>
        <th>Месторождение</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(file, index) in files" :key="file.fileName" :class="{
        active__row: activeIndex === index,
        row_before_active: index === activeIndex - 1,
      }" @click.prevent="selectFile(index, file.FILE_PATH)">
        <td class="first">{{ file.research_id }}</td>
        <td>{{ file.well_name }}</td>
        <td>{{ file.oilfield }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { ref } from 'vue';

export default {
  name: "Menu",
  props: {
    files: {
      type: Array,
      default: []
    }
  },
  setup(props, { emit }) {
    const activeIndex = ref("");

    console.log(props.files);

    const selectFile = async (index, path) => {
      const file = await window.electronAPI.readFile({ path });
      activeIndex.value = index;
      emit("setFile", { file, path })
    }

    return { activeIndex, selectFile }
  }
}
</script>

<style lang="scss" scoped>
table {
  margin: 0 0 10px 10px;
  font-size: 12px;
  font-weight: 600;
  border-collapse: collapse;

  td {
    padding: 0 10px;
    height: 25px;
    border: 1px solid #dddddd;
    text-align: center;

    &.last {
      border: 1px solid orange;
    }
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
    padding-top: 10px;
  }

  tbody tr {
    &:nth-child(2n) {
      background: #edeff2;
    }

    &:hover {
      background: #ffd16e !important;
      cursor: pointer;
    }

    &.active__row {
      td {
        border-top: 1px solid orange;
        border-bottom: 1px solid orange;
      }

      .first {
        border-left: 1px solid orange;
      }

      .last {
        border-right: 1px solid white;
      }
    }

    &.row_before_active {
      td {
        border-bottom: 1px solid orange;
      }
    }
  }
}
</style>