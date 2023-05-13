<template>
  <table class="styledTable">
    <colgroup v-if="columnWidths.length">
      <col v-for="(w, index) of columnWidths" :key="'col_' + index"
        :style="{ width: typeof w === 'number' ? w + '%' : w }" />
    </colgroup>
    <slot />
  </table>
</template>

<script>
export default {
  name: "StyledTable",
  props: {
    columnWidths: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style>
.styledTable {
  width: 100%;
  border-collapse: collapse;
  font-size: 13pt;
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
}

.styledTable thead tr th {
  height: 30px;
}

.styledTable thead tr:first-child th {
  border-top: 1px solid orange;
}

.styledTable thead tr:last-child th {
  border-bottom: 1px solid orange;
}

.styledTable tbody tr:nth-child(2n) {
  background: #dbdbdb6e
}


.styledTable tbody tr:hover {
  background: #ffa6006b;
  color: #3eaf7c;
}

.styledTable tbody tr td {
  text-align: center;
  border-right: 1px solid gainsboro;
  border-left: 1px solid gainsboro;
  height: 35px;
}

.styledTable tbody tr:last-child td {
  border-bottom: 1px solid orange;
}
</style>