<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import axios from 'axios'
export default {
  name: 'App',
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        // nơi nhận api 
        const response = await axios.get('');
        const data = response.data;
        this.showChart(data);
      } catch (error) {
        console.error(error);
      }
    },
    showChart(data) {
      const chartCanvas = this.$refs.chartCanvas;
      const chart = new Chart(chartCanvas, {
        type: 'bar',
        data: {
          labels: [],
          datasets: [
            {
              label: 'Số lượng bài viết',
              data: [],
              backgroundColor: 'rgba(46, 159, 225, 0.2)',
              borderColor: 'rgba(46, 159, 225, 1)',
              borderWidth: 1
            },
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      // Add data points to the chart
      data.forEach(item => {
        // tên title => vi tháng 1-2-3 ...
        chart.data.labels.push(`Danh mục: ${item.title}`);
        // giá trị kết quả trả về => vd 100-200-300...
        chart.data.datasets[0].data.push(item.result);
      });

      // Update the chart
      chart.update();
    }
  }
};
</script>