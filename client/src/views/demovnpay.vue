<template>
  
  <div class="container mx-auto mt-8">
    <div id="frmCreateOrder" class="max-w-md mx-auto bg-white p-8 rounded shadow-md">
      <div class="mb-4">
        <div class="mb-4">
          <h3>Thanh toán trực tuyến</h3>
        </div>

        <label for="ordertype" class="block text-sm font-medium text-gray-600">Loại hàng hóa</label>
        <select v-model="ordertype" id="ordertype" name="ordertype" class="mt-1 p-2 border rounded w-full">
          <option value="topup">Nạp tiền điện thoại</option>
          <option value="billpayment">Thanh toán hóa đơn</option>
          <option value="fashion">Thời trang</option>
        </select>
      </div>

      <div class="mb-4">
        <label for="Amount" class="block text-sm font-medium text-gray-600">Số tiền</label>
        <input v-model="Amount" type="text" id="Amount" name="Amount" class="mt-1 p-2 border rounded w-full" />
      </div>

      <div class="mb-4">
        <label for="OrderDescription" class="block text-sm font-medium text-gray-600">Nội dung thanh toán</label>
        <textarea v-model="OrderDescription" id="OrderDescription" name="OrderDescription" rows="2" class="mt-1 p-2 border rounded w-full">
          Thanh toan don hang thoi gian: 2023-12-15 16:43:04
        </textarea>
      </div>

      <div class="mb-4">
        <label for="bankcode" class="block text-sm font-medium text-gray-600">Ngân hàng</label>
        <select v-model="bankcode" id="bankcode" name="bankcode" class="mt-1 p-2 border rounded w-full">
          <option value="VNPAYQR">VNPAYQR</option>
          <option value="NCB">Ngan hang NCB</option>
        </select>
      </div>

      <div class="mb-4">
        <label for="language" class="block text-sm font-medium text-gray-600">Ngôn ngữ</label>
        <select v-model="language" id="language" name="language" class="mt-1 p-2 border rounded w-full">
          <option value="vn">Tiếng Việt</option>
          <option value="en">English</option>
        </select>
      </div>

      <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded" @click="processPayment()">Thanh toán Redirect</button>
    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      ordertype: '',
      Amount: 0,
      OrderDescription: '',
      bankcode: '',
      language: 'vn',
    };
  },
  methods: {
  async processPayment() {
    // Gọi API hoặc xử lý logic cần thiết ở đây
    // Sau khi có dữ liệu cần thiết, gọi API để tạo đơn hàng và nhận URL thanh toán từ server

    // Ví dụ: Gọi API với $axios
    const formData = {
      orderType: this.ordertype,
      amount: this.Amount,
      orderDescription: this.OrderDescription,
      bankCode: this.bankcode,
      language: this.language,
    };

    try {
      const response = await this.$axios.post('/create_payment_url', formData);
      
      // Nhận URL thanh toán từ response
      const paymentUrl = response.data.redirectUrl;
      // console.log(paymentUrl)
      // Chuyển hướng đến trang thanh toán của VNPAY
       window.location.href = paymentUrl;
      
    } catch (error) {
      console.error('Error creating payment:', error);
      // Xử lý lỗi nếu cần
    }
  },
},
};

</script>
