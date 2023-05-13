<template>
    <tr>
        <template v-if="!deletingRows.includes(item.FIELD_ACT_ID)">
            <td>
                <title-input-text :id="[0, rowIndex]" :isTitleEditable="!item.IS_TITLE_EDITABLE"
                    v-model:title="item.TITLE" @keyup="changeLocation(0, rowIndex)" />
            </td>
            <td class="not-background">
                <input class="orange-background" :id="[1, rowIndex]" @keyup="changeLocation(1, rowIndex)" type="text"
                    v-model.number="item.UNIT">
            </td>
            <td class="not-background">
                <input type="text" :id="[2, rowIndex]" v-model.number="item.MB_BEFORE_FRACTURING"
                    @keyup="changeLocation(2, rowIndex)"
                    @input="!item.IS_EDITABLE ? item.MB_FACT = item.MB_BEFORE_FRACTURING - item.MB_AFTER_FRACTURING : ''">
            </td>
            <td class="not-background">
                <input type="text" :id="[3, rowIndex]" v-model.number="item.MB_AFTER_FRACTURING"
                    @keyup="changeLocation(3, rowIndex)"
                    @input="!item.IS_EDITABLE ? item.MB_FACT = item.MB_BEFORE_FRACTURING - item.MB_AFTER_FRACTURING : ''">
            </td>
            <td class="not-background">
                <input type="text" v-if="!item.IS_EDITABLE" :id="[4, rowIndex]"
                    :value="item.MB_BEFORE_FRACTURING - item.MB_AFTER_FRACTURING" :readonly="!item.IS_EDITABLE"
                    :class="!item.IS_EDITABLE ? 'row__disable' : ''" @keyup="changeLocation(4, rowIndex)">
                <input type="text" v-else :id="[4, rowIndex]" v-model.number="item.MB_FACT"
                    @keyup="changeLocation(4, rowIndex)">
            </td>
            <td class="not-background">
                <input :id="[5, rowIndex]" type="text" v-model.number="item.DESIGN"
                    @keyup="changeLocation(5, rowIndex)">
            </td>
            <td class="not-background">
                <input :id="[6, rowIndex]" type="text" v-model.number="item.REDESIGN"
                    @keyup="changeLocation(6, rowIndex)">
            </td>
            <td class="not-background" :class="{ lightOrangeBG: isOrangeBG() }">
                <template v-if="item.IS_AGGREGATION">
                    <template v-if="!item.IS_EDITABLE">{{ FIELD_ACT_PROPANT_TOTAL_FACT }}</template>
                    <input v-else v-model.number="FIELD_ACT_PROPANT_TOTAL_FACT" />
                </template>
                <template v-else>
                    <input :id="[7, rowIndex]" type="text" v-model.number="item.FACT"
                        @keyup="changeLocation(7, rowIndex)">
                </template>
            </td>
            <td>{{ Math.round(((item.REDESIGN || 0) - (getFactMB() || 0)) * 1000) / 1000 }}
            </td>
            <td>
                <template v-if="item.SOURCE_TYPE === 'agent' || item.SOURCE_TYPE === 'propant'">
                    {{ getPercentage() }}
                </template>
                <template v-else>
                    0
                </template>
            </td>
            <td class="not-background"><input type="text" :value="getToPay()"></td>
            <td class="not-active-cell" />
            <td :class="{ lightRedBG: calcPercent(item.FACT, getFactMB()).isTooMuch }">
                <template v-if="isFixedField()">-</template>
                <template v-else>
                    {{ calcPercent(item.FACT, getFactMB()).value }}
                </template>
            </td>
            <td :class="{ lightRedBG: calcPercent(item.REDESIGN, getFactMB()).isTooMuch }">
                {{ calcPercent(item.REDESIGN, getFactMB()).value }}
            </td>
            <div class="btn-min-pls">
                <table-button @click="this.$emit('addNewRow')"><img style="width: 20px" src="../assets/plus.svg"
                        alt="+"></table-button>
                <table-button @click="this.$emit('deletingItem')"><img style="width: 24px" src="../assets/closing.svg"
                        alt="-"></table-button>
            </div>
        </template>
    </tr>
</template>

<script>
export default {
    data() {
        return {
            name: "table-body-field-act",
            fieldActCopy: [],
            deletingRows: [],
            validCodes: [
                'ArrowLeft',
                'ArrowUp',
                'ArrowRight',
                'ArrowDown',
            ],
        }
    },
    methods: {
        changeLocation(col, row) {
            if (event.ctrlKey) {
                if (!this.validCodes.includes(event.code))
                    return;

                let isCol = event.code === 'ArrowLeft' || event.code === 'ArrowRight';

                if ((isCol ? col : row) === this.arrayKeys[event.code]) {
                    if (isCol)
                        col = event.code === 'ArrowLeft' ? 7 : 0;
                    else
                        row = event.code === 'ArrowUp' ? this.countColums : 0;
                }
                else {
                    if (isCol)
                        event.code === 'ArrowLeft' ? --col : ++col;
                    else
                        event.code === 'ArrowUp' ? --row : ++row;
                }

                document.getElementById(`${col},${row}`).focus();
            }
        },

        calcPercent(a, b) {
            if (!a || !b) return { isTooMuch: false, value: '-' };

            const value = Math.round((10000 * a) / b) / 100;
            const isTooMuch = Math.abs(value - 100) > 5;
            return {
                value,
                isTooMuch
            };
        },

        isFixedField() {
            return (this.item.TITLE || '').toLowerCase().includes('биоцид') || this.item.SOURCE_TYPE === 'propant';
        },

        isOrangeBG() {
            return (this.item.TITLE || '').includes('воды на куст') || this.item.SOURCE_TYPE === 'agent';
        },

        getFactMB() {
            return Math.round((this.item.MB_BEFORE_FRACTURING - this.item.MB_AFTER_FRACTURING) * 100) / 100 || 0;
        },

        getPercentage() {
            return !this.item.REDESIGN || !this.getFactMB() ? 0 : Math.round((this.getFactMB() / this.item.REDESIGN) * 10000) / 100;
        },

        getToPay() {
            const factMB = this.getFactMB() || 0;

            const getResult = () => {
                let result = 0;
                const percentage = this.getPercentage() || 0;
                const redesign = this.item.REDESIGN || 0;
                if (percentage < 96) result = factMB;
                else if (percentage > 105) result = (redesign * 105) / 100;
                else if (percentage === 0) result = 0;
                else result = factMB;
                result = Math.round(result * 100) / 100;
                return result;
            };

            if (['propant', 'agent'].includes(this.item.SOURCE_TYPE))
                return getResult();

            else if (!['Завоз воды на куст (норматив за 1 м3)', 'Нагрев воды на кусту (норматив за 1 м3)'].includes(this.item.TITLE))
                return factMB;

            else {
                const row = this.fieldActCopy.find((f) => f.TITLE && f.TITLE.includes('Емкость для хранения'));
                if (!row) return this.getFactMB() || 0;

                const koef = row && row.TITLE.includes('50 м3') ? 3 : 5;
                const result = getResult();
                return result + koef * (row.MB_FACT || 0);
            }
        },
    },
    computed: {
        arrayKeys() {
            return {
                ArrowDown: this.countColums,
                ArrowUp: 0,
                ArrowRight: 7,
                ArrowLeft: 0,
            }
        },
    },
    props: {
        item: Object,
        rowIndex: Number,
        countColums: Number,
    },
}
</script>

<style scoped>
img {
    margin: auto;
}

.btn-min-pls {
    display: flex;
}

td {
    margin: 0;
    padding: 0;
    background-color: none;
    font-size: 11pt;
    border: 1px solid lightgray;
    color: #000000;
    text-align: center;
}

td input[type="text"] {
    width: 100%;
    height: 100%;
    min-height: 30px;
    border: transparent;
    outline: none;
    font-size: 11pt;
    padding-inline-start: 5px;
    padding-inline-end: 5px;
}

.not-background input[type="text"] {
    background-color: #ffa5001a;
}

.not-active-cell {
    border: none;
    background: none;
}

.row__disable {
    background-color: transparent !important;
}

.lightRedBG {
    background-color: #ff00001a;
}
</style>