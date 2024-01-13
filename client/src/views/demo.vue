<template>
  <div class="container">
    <Bar :data="chartData" />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data: () => ({
    loaded: false,
    chartData: {
        labels: [ 'January', 'February', 'March'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: ['#f87979', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360','#f87979', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
            data: [40, 20, 12]
          }
        ]
      }
  }),
  created() {
    this.chartData.labels.push('HELLO');
    this.chartData.datasets[0].data.push(10)
  }
}
</script>