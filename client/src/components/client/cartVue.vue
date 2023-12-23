<template>
     <!--model gio hang-->
     <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 overflow-auto" >
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
            <div class="bg-white rounded-lg m-2">
              <!--render danh sách phòng ra-->
              <div class="group mb-2 ">
                <div class=" rounded-xl  p-2 md:p-5 md:flex items-center">
                  <!--ben trai-->
                  <img src="https://icdn.dantri.com.vn/2019/02/16/10-1550333970807.jpg"
                    class="hidden md:block object-cover rounded-lg w-[70px] h-[70px] mr-2" alt="">
                  <p class=" text-base font-extrabold text-gray-700 underline cursor-pointer" @click="openDetailRoom()">
                    Khách sạn Thiên nga của
                    đất</p>
                  <!-- ben phải-->
                  <div class="md:ml-auto md:flex items-center mt-2">
                    <div class="flex md:ml-2 items-center">
                      <p class=" text-base font-extrabold text-gray-900 mr-1 ">2 900 000 đ</p>
                      <label for="Quantity" class="sr-only"> Quantity </label>
                      <div class=" rounded border border-gray-200 max-w-content inline-block">
                        <button type="button" class="h-10 w-10 leading-10 text-gray-600 transition hover:opacity-75">
                          &minus;
                        </button>
                        <input type="number" id="Quantity" value="1"
                          class="h-10 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none" />
                        <button type="button" class="h-10 w-10 leading-10 text-gray-600 transition hover:opacity-75">
                          &plus;
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!--checkin checkout-->
              <div class="md:grid grid-cols-2 gap-2">

                <label for="checkin"
                  class="relative block px-10 py-3 mb-4 rounded-2xl border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                  <input type="date" id="checkin"
                    class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                    placeholder="Họ và tên" />
                  <span
                    class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                    Ngày nhận phòng <span class="text-rose-400">*</span>
                  </span>
                </label>

                <label for="checkout"
                  class="relative block px-10 py-3 mb-4 rounded-2xl border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                  <input type="date" id="checkout"
                    class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                    placeholder="Họ và tên" />
                  <span
                    class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                    Ngày trả phòng<span class="text-rose-400">*</span>
                  </span>
                </label>

              </div>
              <!--thông tin khách hàng email - sdt - email -->
              <label for="Username"
                class="relative block  px-10 py-3 mb-2 rounded-2xl border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                <input type="text" id="Username"
                  class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                  placeholder="Họ và tên" />

                <span
                  class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                  Họ và tên <span class="text-rose-400">*</span>
                </span>
              </label>

              <label for="phone"
                class="relative block  px-10 py-3 mb-2 rounded-2xl border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                <input type="text" id="phone"
                  class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                  placeholder="Số điện thoại" />

                <span
                  class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                  Số điện thoại <span class="text-rose-400">*</span>
                </span>
              </label>

              <label for="email"
                class="relative block  px-10 py-3 mb-2 rounded-2xl border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                <input type="text" id="email"
                  class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                  placeholder="Địa chỉ email" />

                <span
                  class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                  Địa chỉ email <span class="text-rose-400">*</span>
                </span>
              </label>

            </div>
          </div>
          <!-- Modal footer -->
          <div class="  md:flex items-center p-4 md:p-5">
            <div class="sum_price md:mb-0 mb-2">
              <p class="mt-2 text-xl font-extrabold text-gray-900 ">Tổng</p>
              <p class="text-xl font-extrabold leading-none tracking-tight text-blue-900">1 000 000 000 đ
              </p>
            </div>
            <div class="ml-auto">
              <button
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
  data() {
    return {
        
    };
  },
  mounted() {
   
  },
  components: {


  },

  methods: {
   onclose()
   {
    this.$emit("cancel");
   }
  },
};
</script>