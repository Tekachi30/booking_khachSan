# DB:booking
+ Khởi tạo: npx sequelize-cli db:migrate
# Login
+ admin login: /login_admin/
# Admin:
+ QL User
+ QL Owner
+ QL Rating
+ QL Report
+ QL Banner
=> Kèm sơ đồ tuần tự 

# website tham khảo
+ https://codesandbox.io/
+ https://tailwindcomponents.com/
+ https://tailwindcss.com/
+ https://flowbite.com/
+ github.com
+ stackoverflow
+ codepen
+ medium.com
+ youtube
+ chatgpt
+ bard google
+ https://viblo.asia/p/cron-job-voi-nodejs-qua-vi-du-don-gian-tu-dong-tong-hop-doanh-thu-va-xuat-ra-file-excel-luc-23h-hang-ngay-4P856R6B5Y3

# pass: admin
# pass: owner1234+



<template>
  <div>
    <input
      v-model="date_coupon"
      type="date"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      placeholder="Select date"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      date_coupon: '', // Giá trị mặc định của ngày
    };
  },
  methods: {
    // Phương thức này sẽ được gọi khi giá trị của ngày thay đổi
    handleDateChange() {
      // Lấy ngày hiện tại
      const currentDate = new Date();

      // Lấy giá trị ngày từ input
      const selectedDate = new Date(this.date_coupon);

      // So sánh ngày đã chọn với ngày hiện tại và kiểm tra xem có lớn hơn ít nhất 1 ngày không
      if (selectedDate <= currentDate) {
        // Nếu ngày đã chọn nhỏ hơn hoặc bằng ngày hiện tại, thì cộng thêm 1 ngày
        currentDate.setDate(currentDate.getDate() + 1);

        // Format lại ngày để có định dạng YYYY-MM-DD
        const formattedDate = currentDate.toISOString().split('T')[0];
        
        // Cập nhật giá trị ngày trong data của Vue
        this.date_coupon = formattedDate;
      }
    },
  },
  watch: {
    date_coupon: 'handleDateChange', // Khi giá trị ngày thay đổi, gọi phương thức handleDateChange
  },
  mounted() {
    // Gọi phương thức handleDateChange khi component được tạo để đảm bảo rằng giá trị ngày luôn hợp lệ từ đầu
    this.handleDateChange();
  },
};
</script>
