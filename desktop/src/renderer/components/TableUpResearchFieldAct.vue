<template>
    <table id="information-header">
        <thead>
            <th colspan="2" style="text-align: left; font-size: 10pt; font-weight: 400;">
                ПОЛЕВОЙ ОТЧЕТ ПО ГИДРОРАЗРЫВУ ПЛАСТА
            </th>
        </thead>
        <tbody>
            <tr>
                <td style="width: 150px">Подрядчик:</td>
                <td>{{ research.CONTRACTOR }}</td>
            </tr>
            <tr>
                <td>Договор №</td>
                <td>
                    <strong style="margin-right:5px">от</strong>
                    <input type="text">
                    <strong>-</strong>
                    <input type="text">
                </td>
            </tr>
            <tr>
                <td>месторождение</td>
                <td>{{ oilfield }}</td>
            </tr>
            <tr>
                <td>скважина</td>
                <td>{{ well_name }}</td>
            </tr>
            <tr>
                <td>куст</td>
                <td>{{ cluster }} стадия</td>
            </tr>
            <tr>
                <td>пласт</td>
                <td>{{ objects }}</td>
            </tr>
            <tr>
                <td>Дата:</td>
                <td>{{ formatDate() }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    data() {
        return {
            name: "table-up-research-field-act"
        }
    },
    props: {
        research: Object,
        other: Object
    },
    methods: {
        formatDate() {
            let date = this.other.GRP_EDATE;

            if (!date) return "-";

            const [year, month, day] = date.split("-");
            return `${day.split('T')[0]}.${month}.${year}`;
        },
    }
}
</script>
<style>
#information-header * {
    font-size: 9pt;
}

input[type="text"] {
    border: transparent;
    border-bottom: 1px solid lightgray;
    outline: none;
    text-align: center;
}
</style>
