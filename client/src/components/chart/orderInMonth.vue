<template>
    <div>
        <div>
          <label for="year">Chọn Năm:</label>
          <select v-model="year" @change="fetchData()">
            <option v-for="y in year" :key="y" :value="y">{{ y }}</option>
          </select>
        </div>
    
        <div>
          <label for="hotel">Chọn Khách Sạn:</label>
          <select v-model="hotel" @change="fetchData()">
                <option v-for="hotel in hotels" :key="hotel" :value="hotel">
                    {{ hotel.name_hotel }}
                </option>
            </select>
        </div>
        <canvas ref="chartCanvas"></canvas>
    </div>
</template>
  
<script>
import Chart from 'chart.js/auto';

export default {
    name: 'App',
    data() {
        const currentYear = new Date().getFullYear();
        const startYear = 1999;
        const years = Array.from({ length: currentYear - startYear + 1 }, (_, index) => startYear + index); // laasy code tren mang ?
        return {
            year: years, hotel: '',
            hotels: []
        }
    },
    mounted() {
        this.fetchData();
        this.getHotel();
    },
    methods: {
        async getHotel(){
            try {
                const result = await this.$axios.get('hotel/get');
                this.hotels = result.data;
            } catch (error) {
                console.log(error);
            }
        },
        async fetchData() {
            try {
                const response = await this.$axios.get(`dashboard/orderInMonth?year=${this.year}&id=${this.hotel.id}`);
                const data = response.data.monthlyOrder;
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
                            label: `Số lượng hóa đơn được đặt theo tháng`,
                            data: [],
                            backgroundColor: 'rgba(46, 159, 225, 1)',
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
                chart.data.labels.push(`Tháng ${item.month}`);
                chart.data.datasets[0].data.push(item.count);
            });

            // Update the chart
            chart.update();
        }
    }
};
</script>