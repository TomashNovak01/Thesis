<template>
    <tr>
        <th style="min-width:280px">Оборудование и материалы</th>
        <th>ед.изм</th>
        <th>перед ГРП</th>
        <th>после ГРП</th>
        <th>факт по мат. балансу</th>
        <th>по дизайну</th>
        <th>редизайн</th>
        <th>факт по приборам</th>
        <th>реД-факт МБ</th>
        <th>% вып-я, факт (МБ) от плана (реД)</th>
        <th>к оплате</th>
        <th class="not-active-cell"/>
        <th>факт / факт(МБ), %</th>
        <th>Ред / факт(МБ), %</th>
    </tr>
</template>

<script>
export default {
    data() {
        return {
            name: "table-header-field-act"
        }
    }
}
</script>

<style scoped>
th {
    vertical-align: bottom !important;
    margin-bottom: 5px;
    font-size: 11pt;
    min-width: 100px;
    background: none;
    border-bottom: 1px solid #ef7f1a;
    color: #000000;
}
.not-active-cell{
    min-width: 10px;
    border: none;
    background: none;
}
</style>