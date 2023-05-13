<template>
    <button class="table__btn">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'table-button'
}
</script>

<style>
.table__btn {
    margin-left: 5px;
    background: transparent;
    border: none;
    border-radius: 5px;
    font-size: 18px;
    text-align: center;
    cursor: pointer;
    display: flex;
}
</style>