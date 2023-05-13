<template>
    <div class="scroll">
        <table>
            <thead>
                <open-file-table-header />
            </thead>
            <tbody>
                <template v-for="file in getFiles.map(f => f.files)[0]" :key="file">
                    <open-file-table-row :research="file.research" :isActive="activeLink === file.fileName"
                        @click.prevent="selectFile(getFiles.map(f => f.filePath), file.fileName)" />
                </template>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: "table-open-file",
    data() {
        return {
            activeLink: ""
        }
    },
    props: {
        getFiles: Array,
    },
    methods: {
        async selectFile(pathToFolder, fileName) {
            let pathToFile = `${pathToFolder}\\${fileName}`
            window.api.ReadFileContent(pathToFile);
            let readInfo = JSON.parse(await window.api.SendFileContent());

            this.activeLink = fileName;

            this.$emit("openFile", readInfo, pathToFile)
        },
    }
}
</script>

<style scoped>
tr:nth-child(2n) {
    background: #edeff2;
}
</style>