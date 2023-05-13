<template>
  <table id="TableOtherFieldAct">
    <thead>
      <tr>
        <th>Представитель {{ research.CONTRACTOR }}</th>
        <th>Представитель заказчика</th>
        <th>Представитель цеха</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <div>
            <label>Должность:</label>
            <input type="text" v-model="other.CLIENT_ROLE" />
          </div>
        </td>
        <td>
          <div>
            <label>Должность:</label>
            <input type="text" v-model="other.EXECUTOR_ROLE" />
          </div>
        </td>
        <td>
          <div>
            <label style=" ">Должность:</label>
            <input type="text" v-model="other.SHOP_ROLE" />
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div>
            <label>ФИО: </label><input type="text" v-model="other.CLIENT_PERSON" />
          </div>
        </td>
        <td>
          <div>
            <label>ФИО: </label><input type="text" v-model="other.EXECUTOR_PERSON" />
          </div>
        </td>
        <td>
          <div>
            <label>ФИО: </label><input type="text" v-model="other.SHOP_PERSON" />
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div>
            <label>Подпись: </label><input type="text" />
          </div>
        </td>
        <td>
          <div>
            <label>Подпись: </label> <input type="text" />
          </div>
        </td>
        <td>
          <div>
            <label>Подпись: </label><input type="text" />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      name: "table-other-field-act"
    }
  },
  props: {
    other: Object,
    research: Object,
  },
};
</script>

<style scoped>
*,
*::after,
*::before {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-size: 9pt;
}

table {
  width: 95%;
}

div {
  display: flex;
}

label {
  display: flex;
  align-items: center;
}

th {
  font-size: 9pt;
  margin: 0;
  min-width: 300px;
  padding: 0 5px;
  border: none;
  color: black;
}

td input[type="text"] {
  width: 100%;
  height: 100%;
  min-height: 30px;
  border: transparent;
  outline: none;
  font-size: 9pt;
  padding-inline-start: 5px;
  padding-inline-end: 5px;
}

td {
  margin: 0;
  padding: 0 5px;
  border: 1px solid lightgray;
  color: #000000;
}

tbody {
  border-top: 1.1px solid #ef7f1a !important;
  border-bottom: 1.1px solid #ef7f1a !important;
}
</style>
