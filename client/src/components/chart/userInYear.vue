<template>
    <div>
        <canvas ref="chartCanvas"></canvas>
    </div>
</template>
  
<script>
import Chart from 'chart.js/auto';

export default {
    name: 'App',
    mounted() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                const response = await this.$axios.get('dashboard/countUserInYear');
                const data = response.data.userCountsByYear;
                this.showChart(data);
            } catch (error) {
                console.error(error);
            }
        },
        showChart(data) {
            const chartCanvas = this.$refs.chartCanvas;
            const chart = new Chart(chartCanvas, {
                type: 'pie',
                data: {
                    labels: [],
                    datasets: [
                        {
                            label: 'Số lượng bài viết',
                            data: [],
                            backgroundColor: ['#f87979', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360','#f87979', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
                            borderColor: 'rgba(46, 159, 225, 1)',
                            borderWidth: 1
                        },
                    ]
                },
                options: {
                    scales: {
                        
                        y: {
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: "Value"
                            }
                        }
                    }
                }
            });

            // Add data points to the chart
            data.forEach(item => {
                chart.data.labels.push(`${item.year}`);
                chart.data.datasets[0].data.push(item.count);
            });

            // Update the chart
            chart.update();
        }
    }
};
</script>