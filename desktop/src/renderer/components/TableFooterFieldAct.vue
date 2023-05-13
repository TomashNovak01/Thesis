<template>
    <tr>
        <td class="standard">Всего пропанта</td>
        <td class="orange-background">тн</td>
        <td class="orange-background">{{ sum("MB_BEFORE_FRACTURING") }}</td>
        <td class="orange-background">{{ sum("MB_AFTER_FRACTURING") }}</td>
        <td class="orange-background">{{ sum("MB_FACT") }}</td>
        <td class="orange-background">{{ sum("DESIGN") }}</td>
        <td class="orange-background">{{ sum("REDESIGN") }}</td>
        <td class="orange-background">{{ sum("FACT") }}</td><!---->
        <td class="orange-background">{{ redFact() }}</td>
        <td class="orange-background">{{ getPercentage() }}</td>
        <td class="orange-background">{{ getToPay() }}</td>
        <td class="not-active-cell" />
        <td :class="{ lightRedBG: caclulatePercentFact() }">
            <template v-if="isFixedField()">-</template>
            <template v-else>
                {{ calcPercent(sum("FACT"), getFactMB()).value }}
            </template>
        </td>
        <td :class="{ lightRedBG: caclulatePercentRedesign() }">
            {{ calcPercent(sum("REDESIGN"), getFactMB()).value }}
        </td>
    </tr>
</template>

<script>
export default {
    data() {
        return {
            name: "table-footer-field-act"
        }
    },
    props: {
        data: Object,
    },

    computed: {
        propants() {
            return this.data.filter(d => d.SOURCE_TYPE === "propant");
        },
        allPropantsFromSurface() {
            return this.sum("MB_FACT");
        },
    },

    watch: {
        allPropantsFromSurface(newValue) {
            this.$emit('sumPropant', newValue);
        }
    },

    mounted() {
        this.$emit('sumPropant', this.sum("MB_FACT"));
    },

    methods: {
        sum(key) {
            return Math.round(this.propants.reduce((a, b) => a + b[key], 0));
        },

        redFact() {
            return Math.round(((this.sum("REDESIGN") || 0) - (this.getFactMB() || 0)) * 1000) / 1000
        },

        caclulatePercentFact() {
            return this.calcPercent(this.sum("FACT"), this.getFactMB()).isTooMuch
        },

        caclulatePercentRedesign() {
            return this.calcPercent(this.sum("REDESIGN"), this.getFactMB()).isTooMuch
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
            return (this.sum("TITLE") || '').toLowerCase().includes('биоцид') || this.sum("SOURCE_TYPE") === 'propant';
        },

        isOrangeBG() {
            return (this.sum("TITLE") || '').includes('воды на куст') || this.sum("SOURCE_TYPE") === 'agent';
        },

        getFactMB() {
            return Math.round((this.sum("MB_BEFORE_FRACTURING") - this.sum("MB_AFTER_FRACTURING")) * 100) / 100 || 0;
        },

        getPercentage() {
            return !this.sum("REDESIGN") || !this.getFactMB() ? 0 : Math.round((this.getFactMB() / this.sum("REDESIGN")) * 10000) / 100;
        },

        getToPay() {
            const factMB = this.getFactMB() || 0;

            const getResult = () => {
                let result = 0;
                const percentage = this.getPercentage() || 0;
                const redesign = this.sum("REDESIGN") || 0;
                if (percentage < 96) result = factMB;
                else if (percentage > 105) result = (redesign * 105) / 100;
                else if (percentage === 0) result = 0;
                else result = factMB;
                result = Math.round(result * 100) / 100;
                return result;
            };

            return getResult();
        },
    }
}
</script>

<style scoped>
*,
*::after,
*::before {
    padding: 0 auto;
    margin: 0 auto;
    box-sizing: border-box;
}

.standard {
    font-size: 11pt;
    text-align: center;
    margin: 0;
    padding: 0;
    border: 1px solid lightgray;
}

td {
    margin: 0;
    padding: 0;
    border: 1px solid lightgray;
    border-bottom: 1.1px solid #ef7f1a !important;
    color: #000000;
    width: 100%;
    height: 100%;
    min-height: 30px;
    outline: none;
    text-align: center;
    font-size: 11pt;
    padding-inline-start: 5px;
    padding-inline-end: 5px;
}

.not-active-cell {
    border-top: transparent;
    border-bottom: transparent;
    background-color: transparent;
}

.lightRedBG {
    background-color: #ff00001a;
}
</style>
