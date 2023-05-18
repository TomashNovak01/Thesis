<template>
  <v-card title="Статистика по полевым актам">
    <v-card-text>
      <div class="diagram">
        <canvas ref="chartRef" class="diagram_chart" />
        <div class="diagram_title">
          <div>
            <h5>Количество не принятых:</h5>
            <p>{{ noAgreed.length }}</p>
          </div>
          <div>
            <h5>Количество на согласование:</h5>
            <p>{{ toAgreed.length }}</p>
          </div>
          <div>
            <h5>Количество принятых:</h5>
            <p>{{ agreed.length }}</p>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { ref, watchEffect } from 'vue';
import Chart from 'chart.js/auto';

export default {
  props: {
    researches: {
      type: Array,
      require: true
    }
  },
  setup(props) {
    const chartRef = ref(null);
    let chart = null;

    const noAgreed = ref([]);
    const toAgreed = ref([]);
    const agreed = ref([]);

    props.researches.forEach((r) => {
      if (r.id_status === 1) noAgreed.value.push(r);
      else if (r.id_status === 2) toAgreed.value.push(r);
      else if (r.id_status === 3) agreed.value.push(r);
    })

    const renderDiagram = () => {
      if (chart) chart.destroy();

      chart = new Chart(chartRef.value, {
        type: "doughnut",
        data: {
          datasets: [
            {
              data: [noAgreed.value.length, toAgreed.value.length, agreed.value.length],
              backgroundColor: [
                'rgba(255,127,14, 0.2)',
                'rgba(31,119,180, 0.2)',
                'rgba(44,160,44, 0.2)',
              ],
              borderColor: [
                'rgba(255,127,14, 1)',
                'rgba(31,119,180, 1)',
                'rgba(44,160,44, 1)',
              ],
              borderWidth: 1,
            }
          ],
          labels: ["Не принятые", "На согласование", "Принятые"],
        }
      });
    };

    watchEffect(() => {
      if (props.researches) renderDiagram();
    });

    return { chartRef, noAgreed, toAgreed, agreed }
  }
}
</script>

<style lang="scss" scoped>
.diagram {
  &_title {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
  }

  &_chart {
    margin: 0 auto;
    height: 500px !important;
    width: 500px !important;
  }
}
</style>