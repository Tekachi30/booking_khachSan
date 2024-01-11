<template>
  <!--model gio hang-->
  <div
    class="fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 overflow-auto"
  >
    <div class="relative p-4 w-full max-w-3xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Đặt phòng
          </h3>
          <button
            type="button"
            @click="onclose"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="default-modal"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-4 md:p-5 space-y-4">
          <!--list phong da dat-->
          <div
            class="bg-white rounded-lg m-2"
            v-for="(room, index) in this.cart"
            :key="index"
          >
            <!--render danh sách phòng ra-->
            <div class="group">
              <div class="rounded-xl p-2 md:p-5 md:flex items-center">
                <!--ben trai-->
                <img
                  :src="room.image"
                  class="hidden md:block object-cover rounded-lg w-[70px] h-[70px] mr-2"
                  alt=""
                />
                <p
                  class="text-base font-extrabold text-gray-700 underline cursor-pointer"
                  @click="
                    openDetailRoom();
                    selectRoom(room);
                  "
                >
                  {{ formatTypeRoom(room.type_room) }}
                </p>
                <!-- ben phải-->
                <div class="md:ml-auto md:flex items-center">
                  <div class="flex md:ml-2 items-center">
                    <p class="text-base font-extrabold text-gray-900 mr-1">
                      {{ formatCurrency(room.price) }}
                    </p>
                    <label for="Quantity" class="sr-only"> Quantity </label>
                    <div
                      class="rounded border border-gray-200 max-w-content inline-block"
                    >
                      <button
                        type="button"
                        class="h-10 w-10 leading-10 text-gray-600 transition hover:opacity-75"
                        @click="decreaseQuantity(room)"
                      >
                        &minus;
                      </button>

                      <input
                        type="number"
                        id="Quantity"
                        min="0"
                        :max="room.real_quantity"
                        v-model="roomQuantity[room.id]"
                        class="h-10 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                      />
                      <button
                        @click="increaseQuantity(room)"
                        type="button"
                        class="h-10 w-10 leading-10 text-gray-600 transition hover:opacity-75"
                      >
                        &plus;
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--ten + mail-->
          <div class="md:flex">
            <div class="m-2">
              <label for="">Họ và tên:</label>
              <input
                type="text"
                placeholder="Họ và tên"
                class="w-full px-4 py-3 rounded-lg mt-2 border focus:bg-white focus:outline-none"
                v-model="fullname"
              />
              <p
                class="text-red-500 text-sm ml-1"
                v-if="!fullname && fullnameFocused"
              >
                Vui lòng nhập họ tên.
              </p>
            </div>

            <div class="m-2">
              <label for="">Địa chỉ email:</label>
              <input
                type="text"
                placeholder="Email"
                class="px-4 py-3 rounded-lg mt-2 border focus:bg-white focus:outline-none w-full"
                v-model="email"
              />
              <p
                class="text-red-500 text-sm ml-1"
                v-if="!email && emailFocused"
              >
                Vui lòng nhập email.
              </p>
              <p
                class="text-red-500 text-sm ml-1"
                v-else-if="!validEmail(email) && emailFocused"
              >
                Email sai định dạng.
              </p>
            </div>
          </div>
          <div class="m-2">
            <label for="">Địa chỉ </label>
            <input
              type="text"
              placeholder="Nhập địa chỉ"
              class="px-4 py-3 rounded-lg mt-2 border focus:bg-white focus:outline-none w-full"
              v-model="address"
            />
            <p
              class="text-red-500 text-sm ml-1"
              v-if="!address && addressFocused"
            >
              Vui lòng nhập địa chỉ.
            </p>
          </div>
          <div class="m-2">
            <label for="">Số điện thoại </label>
            <input
              type="text"
              placeholder="Nhập số điện thoại"
              class="px-4 py-3 rounded-lg mt-2 border focus:bg-white focus:outline-none w-full"
              v-model="phone"
            />
            <p class="text-red-500 text-sm ml-1" v-if="!phone && phoneFocused">
              Vui lòng nhập số điện thoại.
            </p>
            <p
              class="text-red-500 text-sm ml-1"
              v-else-if="!validPhone(phone) && phoneFocused"
            >
              Số điện thoại sai định dạng.
            </p>
          </div>
          <!--check in out-->
          <div class="md:flex">
            <div class="m-2">
              <label for="">Ngày nhận phòng:</label>
              <input
                type="date"
                class="w-full px-4 py-3 rounded-lg mt-2 border focus:bg-white focus:outline-none"
                @change="handleDateChange()"
                v-model="checkin"
              />
              <p
                v-if="!checkin && date_focused"
                class="text-red-500 text-sm ml-1"
              >
                Vui lòng chọn ngày nhận phòng!
              </p>
              <p
                v-if="checkin && date_focused"
                class="text-red-500 text-sm ml-1"
              >
                Ngày nhận phòng không thể lớn hơn ngày trả phòng!
              </p>
            </div>

            <div class="m-2">
              <label for="">Ngày trả phòng:</label>

              <input
                type="date"
                class="w-full px-4 py-3 rounded-lg mt-2 border focus:bg-white focus:outline-none"
                @change="handleDateChange2()"
                v-model="checkout"
              />
              <p
                v-if="!checkout && date_focused"
                class="text-red-500 text-sm ml-1"
              >
                Vui lòng chọn ngày trả phòng!
              </p>
              <p
                v-if="checkout && date_focused"
                class="text-red-500 text-sm ml-1"
              >
                Ngày trả phòng không thể nhỏ hơn ngày nhận phòng!
              </p>
            </div>
          </div>

          <!--hinh thuc thanh toan-->
          <div class="relative p-2">
            <label for="">Hình thức thanh toán: </label>
            <select
              name="price"
              id="price"
              v-model="bankcode"
              class="w-full rounded-md py-5 px-1 pe-10 shadow-sm sm:text-sm focus:outline-none appearance-none"
            >
              <option value="">Cổng thanh toán VNPAYQR</option>
              <option value="VNBANK">
                Thanh toán qua ATM-Tài khoản ngân hàng nội địa
              </option>
              <option value="INTCARD">Thanh toán qua thẻ quốc tế</option>
            </select>
          </div>

          <!--counpon chưa check-->

          <div class="m-2">
            <label for="">Mã giảm giá</label>
            <input
              type="text"
              class="w-full px-4 py-3 rounded-lg mt-2 border focus:bg-white focus:outline-none"
              v-model="counpon"
            />
          </div>

          <div class="m-2">
            <button
              @click="openCoupon()"
              class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 border-gray-200 text-sm font-medium pw-full px-4 py-3 rounded-lg mt-2 border focus:outline-none hover:text-gray-900 focus:z-10"
            >
              Chọn mã giảm giá
            </button>
          </div>
        </div>
        <!-- Modal footer -->
        <div class="md:flex items-center p-4 md:p-5">
          <div class="sum_price md:mb-0 mb-2">
            <p class="mt-2 text-xl font-extrabold text-gray-900">Tổng</p>
            <p
              class="text-xl font-extrabold leading-none tracking-tight text-blue-900"
            >
              {{ calculateTotal() }}
            </p>
          </div>
          <div class="ml-auto">
            <button
              @click="addOrder()"
              class="mr-2 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Thanh toán
            </button>
            <button
              @click="onclose"
              class="mr-2 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--form choice coupon-->
  <div
    v-if="isShowCoupon"
    class="fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 overflow-auto"
  >
    <div class="relative p-4 w-full max-w-3xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Chọn mã giảm giá
          </h3>
          <button
            type="button"
            @click="openCoupon"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="default-modal"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-4 md:p-5 space-y-4">


         

          <div class="mx-auto container" v-for="coupon in coupons">
            <div class="flex items-center justify-between bg-gray-100 text-center py-5 px-10 rounded-lg shadow-md">
               

                <div class="infor_voucher">
                  Mã giảm giá của khách sạn
                </div>  
                
                <div class="action_save">
                  <span id="cpnBtn" class="border border-white  px-4 py-2 rounded-r cursor-pointer" @click="copyCoupon(coupon.code_coupon)">Lấy mã</span>
                </div>
            </div>
          </div>

        </div>
        <!-- Modal footer -->
        <div class="md:flex items-center p-4 md:p-5">
          <div class="ml-auto">
            <button
              @click="openCoupon"
              class="mr-2 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--component toast thông báo !!!-->
  <toast ref="toast"></toast>
</template>
<script>
import toast from "../toast.vue";

export default {
  props: ["cart"],
  emits: ["cancel"],
  data() {
    return {
      carts: [],
      bankcode: "",
      roomQuantity: {},
      user: null,
      isShowCoupon: false,
      fullname: null,
      email: null,
      phone: null,
      checkin: null,
      checkout: null,
      date_focused: false,
      fullnameFocused: false,
      addressFocused: false,
      phoneFocused: false,
      emailFocused: false,
      counpon: "",
      getCounpon: "",
      coupons: [],
      address: "",
      phone: "",
    };
  },
  mounted() {
    for (let i = 0; i < this.cart.length; i++) {
      this.roomQuantity[this.cart[i].id] = this.cart[i].quantity;
    }
    this.user = JSON.parse(localStorage.getItem("User"));
    if (this.user) {
      this.email = this.user.email;
      this.phone = this.user.phone;
      this.fullname = this.user.fullname;
      this.address = this.user.address;
    }
    this.getCoupons();
  },
  components: {
    toast,
  },

  methods: {
    onclose() {
      this.$emit("cancel");
    },
    openCoupon() {
      this.isShowCoupon = !this.isShowCoupon;
    },
    formatCurrency(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đồng";
    },
    formatTypeRoom(type) {
      switch (type) {
        case "SGL":
          return "Phòng 1 giường đơn cho 1 người.";
        case "TWL":
          return "Phòng 2 giường đơn cho 2 người.";
        case "DBL":
          return "Phòng 1 giường đôi cho 2 người.";
        case "TRPL_1":
          return "Phòng 1 giường đơn và 1 giường đôi.";
        case "TRPL_2":
          return "Phòng 3 giường đơn.";
        default:
          return "Unknown room type";
      }
    },

    selectRoom(room) {
      this.room = room;
    },

    async getCoupons() {
      try {
        const result = await this.$axios.get(
          `coupon/get/${this.$route.params.id}`
        );
        this.coupons = result.data;
       
      } catch (error) {
        console.log(error);
      }
    },

    choiceCounpon() {
      this.counpon = this.getCounpon.code_coupon;
    },
    // handle cart

    increaseQuantity(room, index) {
   
      // Check for existing cart item with the same room ID
      const cartItem = this.cart.find((item) => item.id === room.id);

      if (this.roomQuantity[room.id] >= room.real_quantity) {
       
        this.$refs.toast.showToast(
          "Số lượng đặt phòng không được phép lớn hơn số lượng phòng thực tế."
        );
        this.roomQuantity[room.id] = room.real_quantity;
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
          image: room.img_rooms[0].url,
        });
      }
      // Increment room quantity tracking
      this.roomQuantity[room.id]++;
    },

    decreaseQuantity(room) {
      // Check for existing cart item with the same room ID
      const cartItem = this.cart.find((item) => item.id === room.id);

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

    // Phương thức này sẽ được gọi khi giá trị của ngày thay đổi
    handleDateChange() {
      const currentDate = new Date(); // Lấy ngày hiện tại
      const selectedDate = new Date(this.checkin); // Lấy giá trị ngày từ input
      if (selectedDate <= currentDate) {
        currentDate.setDate(currentDate.getDate() + 1); // Nếu ngày đã chọn nhỏ hơn hoặc bằng ngày hiện tại, thì cộng thêm 1 ngày
        const formattedDate = currentDate.toISOString().split("T")[0]; // Format lại ngày để có định dạng YYYY-MM-DD
        this.checkin = formattedDate;
      }
    },
    handleDateChange2() {
      const currentDate = new Date(); // Lấy ngày hiện tại
      const selectedDate = new Date(this.checkout); // Lấy giá trị ngày từ input
      if (selectedDate <= currentDate) {
        currentDate.setDate(currentDate.getDate() + 1); // Nếu ngày đã chọn nhỏ hơn hoặc bằng ngày hiện tại, thì cộng thêm 1 ngày
        const formattedDate = currentDate.toISOString().split("T")[0]; // Format lại ngày để có định dạng YYYY-MM-DD
        this.checkout = formattedDate;
      }
    },

    async addOrder() {
      try {
        let id = "";
        if (this.user) {
          id = this.user.id;
        } else {
          id = 0;
        }
        if (
          this.checkin &&
          this.checkout &&
          this.fullname &&
          this.address &&
          this.phone &&
          this.validPhone(this.phone) &&
          this.email &&
          this.validEmail(this.email)
        ) {
          if (this.checkin > this.checkout) {
            this.date_focused = true;
          } else if (this.checkout < this.checkin) {
            this.date_focused = true;
          } else {
            let total = 0;
            for (const cartItem of this.cart) {
              total += cartItem.price * cartItem.quantity;
            }

            const result = await this.$axios.post(`create_payment_url`, {
              id_user: id,
              phone: this.phone,
              email: this.email,
              address: this.address,
              fullname: this.fullname,
              checkin: this.checkin,
              checkout: this.checkout,
              carts: this.cart,
              amount: total,
              bankCode: this.bankcode,
              language: "vn",
            });
            if (result.status == 202) {
              this.$refs.toast.showToast(result.data);
            } else {
              const paymentUrl = result.data.redirectUrl;

              this.date_focused = false;
              this.fullnameFocused = false;
              this.addressFocused = false;
              this.phoneFocused = false;
              this.emailFocused = false;
              // Chuyển hướng đến trang thanh toán của VNPAY
              localStorage.setItem("order", JSON.stringify(result.data.order));
              localStorage.setItem(
                "check_create",
                JSON.stringify(result.data.check_create)
              );
              window.location.href = paymentUrl;
            }
          }
        } else {
          this.date_focused = true;
          this.fullnameFocused = true;
          this.addressFocused = true;
          this.phoneFocused = true;
          this.emailFocused = true;
        }
      } catch (error) {
        console.log(error);
      }
    },

    validEmail(email) {
      var re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validPhone(phone) {
      const re = /^(0[1-9]|84[2-9])(\d{8})$/;
      return re.test(phone);
    },
    copyCoupon(c)
    {
      const tempInput = document.createElement('input');
        tempInput.value = c;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        this.$refs.toast.showToast(
          "Lưu mã thành công"
        );
    }
  },
};
</script>
