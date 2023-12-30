<template>
  <!--model gio hang-->
  <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 overflow-auto">

    <div class="relative p-4 w-full max-w-3xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Đặt phòng
          </h3>
          <button type="button" @click="onclose"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="default-modal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-4 md:p-5 space-y-4">
          <!--list phong da dat-->
          <div class="bg-white rounded-lg m-2" v-for="(room, index) in this.cart" :key="index">
            <!--render danh sách phòng ra-->
            <div class="group">
              <div class=" rounded-xl  p-2 md:p-5 md:flex items-center">
                <!--ben trai-->
                <img :src="room.image" class="hidden md:block object-cover rounded-lg w-[70px] h-[70px] mr-2" alt="">
                <p class=" text-base font-extrabold text-gray-700 underline cursor-pointer"
                  @click="openDetailRoom(); selectRoom(room)">{{
                    formatTypeRoom(room.type_room) }}</p>
                <!-- ben phải-->
                <div class="md:ml-auto md:flex items-center">
                  <div class="flex md:ml-2 items-center">
                    <p class=" text-base font-extrabold text-gray-900 mr-1 ">{{ formatCurrency(room.price) }}</p>
                    <label for="Quantity" class="sr-only"> Quantity </label>
                    <div class=" rounded border border-gray-200 max-w-content inline-block">
                      <button type="button" class="h-10 w-10 leading-10 text-gray-600 transition hover:opacity-75"
                        @click="decreaseQuantity(room)">
                        &minus;
                      </button>

                      <input type="number" id="Quantity" min="0" :max="room.real_quantity" v-model="roomQuantity[room.id]"
                        class="h-10 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none" />
                      <button @click="increaseQuantity(room)" type="button"
                        class="h-10 w-10 leading-10 text-gray-600 transition hover:opacity-75">
                        &plus;
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <!--ten + mail-->
          <div class="md:flex ">
            <div class="m-2">
              <label for="">Họ và tên:</label>
              <input type="text" placeholder="Họ và tên"
                class="w-full px-4 py-3 rounded-lg  mt-2 border  focus:bg-white focus:outline-none" v-model="fullname" />
            </div>

            <div class="m-2">
              <label for="">Địa chỉ email:</label>
              <input type="text" placeholder="Email"
                class="px-4 py-3 rounded-lg  mt-2 border  focus:bg-white focus:outline-none w-full" v-model="email" />
            </div>
          </div>
          <!--check in out-->
          <div class="md:flex">
            <div class="m-2">
              <label for="">Ngày nhận phòng:</label>
              <input type="date" class="w-full px-4 py-3 rounded-lg  mt-2 border  focus:bg-white focus:outline-none"
                v-model="checkin" />
            </div>

            <div class="m-2">
              <label for="">Ngày trả phòng:</label>

              <input type="date" class="w-full px-4 py-3 rounded-lg  mt-2 border  focus:bg-white focus:outline-none"
                v-model="checkout" />
            </div>
          </div>

          <!--hinh thuc thanh toan-->
          <div class="relative p-2">
            <label for="">Hình thức thanh toán: </label>
            <select name="price" id="price" v-model="bankcode"
              class="w-full rounded-md  py-5 px-1 pe-10 shadow-sm sm:text-sm focus:outline-none appearance-none">
              <option value="">Cổng thanh toán VNPAYQR</option>
              <option value="VNBANK">Thanh toán qua ATM-Tài khoản ngân hàng nội địa</option>
              <option value="INTCARD">Thanh toán qua thẻ quốc tế</option>
            </select>
          </div>
        </div>
        <!-- Modal footer -->
        <div class="  md:flex items-center p-4 md:p-5">
          <div class="sum_price md:mb-0 mb-2">
            <p class="mt-2 text-xl font-extrabold text-gray-900 ">Tổng</p>
            <p class="text-xl font-extrabold leading-none tracking-tight text-blue-900">{{ calculateTotal() }}
            </p>
          </div>
          <div class="ml-auto">
            <button @click="addOrder()"
              class=" mr-2 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Thanh
              toán</button>
            <button @click="onclose"
              class=" mr-2 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Đóng</button>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>

export default {
  props: ['cart'],
  data() {
    return {
      carts: [], bankcode: '',
      roomQuantity: {}, user: null,
      fullname: null, email: null, phone: null, checkin: null, checkout: null
    };
  },
  mounted() {

    for (let i = 0; i < this.cart.length; i++) {
      this.roomQuantity[this.cart[i].id] = this.cart[i].quantity;
    }
    this.user = JSON.parse(localStorage.getItem("User"));
    this.email = this.user.email
    this.phone = this.user.phone
    this.fullname = this.user.fullname
  },
  components: {


  },

  methods: {
    onclose() {
      this.$emit("cancel");
    },
    formatCurrency(value) {
      let val = (value / 1).toFixed(0).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' đồng'
    },
    formatTypeRoom(type) {
      switch (type) {
        case 'SGL':
          return 'Phòng 1 giường đơn cho 1 người.';
        case 'TWL':
          return 'Phòng 2 giường đơn cho 2 người.';
        case 'DBL':
          return 'Phòng 1 giường đôi cho 2 người.';
        case 'TRPL_1':
          return 'Phòng 1 giường đơn và 1 giường đôi.';
        case 'TRPL_2':
          return 'Phòng 3 giường đơn.';
        default:
          return 'Unknown room type';
      }
    },

    selectRoom(room) {
      this.room = room
    },

    // handle cart

    increaseQuantity(room, index) {
      // Check for existing cart item with the same room ID
      const cartItem = this.cart.find(item => item.id === room.id);

      if (this.roomQuantity[room.id] >= room.quantity) {
        alert('Số lượng đặt phòng không được phép lớn hơn số lượng phòng thực tế.');
        this.roomQuantity[room.id] = room.quantity;
        return;
      }

      // Update room quantity in cart or create a new item
      if (cartItem) {
        cartItem.quantity++;
      } else {
        this.cart.push({
          id: room.id,
          type_room: room.type_room,
          price: room.price,
          quantity: 1,
          real_quantity: room.real_quantity,
          image: room.img_rooms[0].url
        });

      }
      // Increment room quantity tracking
      this.roomQuantity[room.id]++;
    },

    decreaseQuantity(room) {
      // Check for existing cart item with the same room ID
      const cartItem = this.cart.find(item => item.id === room.id);

      // If no cart item is found, return
      if (!cartItem) {
        return;
      }

      // Decrement room quantity in cart
      cartItem.quantity--;

      // If quantity reaches 0, remove the item from the cart
      if (cartItem.quantity === 0) {
        this.cart.splice(this.cart.indexOf(cartItem), 1);
      }

      // Decrement room quantity tracking
      this.roomQuantity[room.id]--;
    },

    calculateTotal() {
      // Initialize total
      let total = 0;

      // Loop through cart items
      for (const cartItem of this.cart) {
        // Calculate total for each item
        total += cartItem.price * cartItem.quantity;
      }

      // Return total
      return this.formatCurrency(total);
    },
    async addOrder() {
      try {
        let total = 0;
        for (const cartItem of this.cart) {
          total += cartItem.price * cartItem.quantity;
        }

        const result = await this.$axios.post(`create_payment_url`,
          {
            "id_user": this.user.id,
            "checkin": this.checkin,
            "checkout": this.checkout,
            "carts": this.cart,
            "amount": total,
            "bankCode":this.bankcode,
            "language":"vn"
          })

        const paymentUrl = result.data.redirectUrl;
        // Chuyển hướng đến trang thanh toán của VNPAY
        localStorage.setItem("order", JSON.stringify(result.data.order));
        window.location.href = paymentUrl;
      } catch (error) {
        console.log(error)
      }
    }

  },
};
</script>