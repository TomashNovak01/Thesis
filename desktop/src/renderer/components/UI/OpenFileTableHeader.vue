<template>
    <tr>
        <th>Задача</th>
        <th>№ скв</th>
        <th>Месторождение</th>
        <th>№ ГРП/Кол-во ГРП</th>
    </tr>
</template>

<script>
export default {
    name: "open-file-table-header"
}
</script>

<style scoped>
th {
    min-width: 65px;
    color: gray;
    font-size: 12px;
    font-weight: 600;
    font-family: 'Roboto', sans-serif;
    border: none;
    user-select: none;
}
</style>