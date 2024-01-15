<template>
    <div class="">
        <div>
            <label for="year">Chọn Năm:</label>
            <select v-model="year" @change="fetchData()">
                <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
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
            year: '',
            years: [],
        };
    },
    mounted() {
        const currentYear = new Date().getFullYear();
        const startYear = 2015;
        this.years = Array.from({ length: currentYear - startYear + 1 }, (_, index) => startYear + index) // laasy code tren mang ? 
        const chartCanvas = this.$refs.chartCanvas;
        this.chart = new Chart(chartCanvas, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [
                    {
                        label: `Số lượng khách hàng đăng ký theo tháng`,
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
    },
    methods: {
        async fetchData() {
            console.log(this.year)
            try {
                const response = await this.$axios.get(`dashboard/countUserInMonth?year=${this.year}`);
                const data = response.data.monthlyUserCount;
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
                chart.data.datasets[0].data.push(item.count);
            });

            // Cập nhật biểu đồ
            chart.update();
        }
    }
};
</script>