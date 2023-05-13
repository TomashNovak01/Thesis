<template>
    <tr :class="{ active__row: isActive }">
        <td>{{ research.RESEARCH_ID }}</td>
        <td>{{ research.WELL_NAME }}</td>
        <td>{{ research.OILFIELD }}</td>
    </tr>
</template>

<script>
export default {
    name: "open-file-table-row",
    props: {
        research: Object,
        isActive: {
            type: Boolean,
            default: false,
        }
    }
}
</script>

<style scoped>
tr {
    user-select: none;
}

tr:hover {
    background: #ffd16e !important;
    cursor: pointer;
}

td {
    font-size: 12px;
    font-weight: 600;
    font-family: 'Roboto', sans-serif;
    height: 25px;
    border: 1px solid #dddddd;
    text-align: center;
}

.active__row > td {
    border-color: #ffd16e !important;
    border-top: 2px solid;
    border-bottom: 2px solid;
    border-left: none;
    border-right: none;
}

.active__row > td:first-child {
    border-left: 2px solid;
}

.active__row > td:last-child {
    border-right: 2px solid;
}
</style>