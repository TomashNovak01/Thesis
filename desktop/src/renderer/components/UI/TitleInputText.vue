<template >
    <input type="text" class="title__input" :class=" {'title__disable': !isTitleEditable}"
        :readonly="isTitleEditable" :value="title" @input="updateTitle">
</template>
<script>
export default {
    name: "title-input-text",
    props: {
        title: {
            type: String,
            required: true,
        },
        isTitleEditable: {
            type: Boolean,
            default: true,
        }
    },
    methods: {
        updateTitle(event) {
            this.$emit("update:title", event.target.value)
        }
    }
}
</script>
<style>
.title__input {
    width: 100%;
    height: 100%;
    min-height: 30px;
    min-width: 100px;
    border: transparent;
    outline: none;
}

.title__disable {
    background: #ffa5001a !important;
}
</style>