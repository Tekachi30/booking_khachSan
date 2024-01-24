<template>
    <div>
        <div>
            <label for="year">Chọn Năm:</label>
            <select v-model="year" @change="fetchData()">
                <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
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
        return {
            year: '',hotel: '',
            years: [], hotels: []
        };
    },
    mounted() {
        const currentYear = new Date().getFullYear();
        const startYear = 2015;
        this.years = Array.from({ length: currentYear - startYear + 1 }, (_, index) => startYear + index) 
        const chartCanvas = this.$refs.chartCanvas;
        this.chart = new Chart(chartCanvas, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [
                    {
                        label: `Tổng tiền khách sạn thu được theo từng tháng`,
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
                const response = await this.$axios.get(`dashboard/castHotelInMonth?year=${this.year}&id=${this.hotel.id}`);
                const data = response.data.monthlyRevenue;
                this.showChart(data);
            } catch (error) {
                console.error(error);
            }
        },
        showChart(data) {
            const chart = this.chart; // Lưu biểu đồ vào thuộc tính dữ liệu để truy cập sau

            // Xóa dữ liệu hiện có của biểu đồ
            chart.data.labels = [];
            chart.data.datasets[0].data = [];

            // Thêm dữ liệu mới vào biểu đồ
            data.forEach(item => {
                chart.data.labels.push(`Tháng ${item.month}`);
                chart.data.datasets[0].data.push(item.totalBank);
            });

            // Cập nhật biểu đồ
            chart.update();
        }
    }
};
</script>