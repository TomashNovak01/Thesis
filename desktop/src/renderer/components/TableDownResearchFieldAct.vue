<template>
    <table>
        <tr>
            <td>вид осложнения</td>
            <td>{{ research.COMPLICATION }}</td>
        </tr>
        <tr>
            <td>всего пропанта с поверхности</td>
            <td>{{ allPropantsFromSurface }}</td>
        </tr>
        <tr>
            <td>пропант в нкт</td>
            <td>{{ other.F_PROPANT_MASS_NKT }}</td>
        </tr>
    </table>
</template>

<script>
export default {
    data() {
        return {
            name: "table-down-research-field-act"
        }
    },
    props: {
        research: Object,
        other: Object,
        allPropantsFromSurface: Number,
    }
}
</script>

<style scoped>
* {
    text-align: center;
}

td {
    font-size: 11pt;
    margin: 0;
    padding: 0 5px;
    border: 1px solid lightgray;
    color: black;
    min-height: 30px;
    width: 200px;
}

table {
    margin: auto;
    border-top: 1.1px solid #ef7f1a;
    border-bottom: 1.1px solid #ef7f1a;
}
</style>