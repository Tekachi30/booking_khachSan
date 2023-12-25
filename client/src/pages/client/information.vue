<template>

  <div class="max-w-screen-2xl mx-auto mt-[100px] h-full">
    <div class="bg-gray-100">
      <div class="container mx-auto my-5 p-5">
        <div class="md:flex no-wrap md:-mx-2">
          <!-- Left Side -->
          <div class="w-full md:w-3/12 md:mx-2">
            <!-- Profile Card -->
            <div class="bg-white p-3 border-t-4 border-blue-400">
              <div class="image overflow-hidden">
                <img
                  class="h-auto w-full mx-auto"
                  src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                  alt=""
                />
              </div>
              <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">
                Đạt
              </h1>
              <h3 class="text-gray-600 font-lg text-semibold leading-6">
                Thông tin cá nhân
              </h3>
              <!--thong tin ca nhan nam day-->
              <div class="text-gray-700">
                <div class="grid md:grid-cols-1 text-sm">
                    <!--noi dung chinh-->
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Thông tin</div>
                    <div class="px-4 py-2">Nội dung</div>
                  </div>

                  <!--button-->
                  <button
                class="bg-blue-600 flex justify-center font-medium text-dark border border-dark rounded-md py-3 px-6 hover:bg-dark  ease-in duration-200 mx-auto mt-5">
              Cập nhập
            </button>
                </div>
              </div>
            </div>
            <!-- End of profile card -->
          </div>
          <!-- Right Side -->
          <div class="w-full md:w-9/12 mx-2 h-64">
            <!-- Profile tab -->
              <!--views chính-->
              <div
                class="text-sm m-2 font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul class="flex flex-wrap">
                    <li class="mr-2 cursor-pointer ">
                        <a @click="activeCart"
                            :class="['inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300', { 'text-blue-600 border-blue-600 rounded-t-lg font-bold': activeTab === 'cart' }]"
                            class=" active inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Đơn hàng</a>
                    </li>

                    <li class="mr-2 cursor-pointer ">
                        <a @click="activeHotel"
                            :class="['inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300', { 'text-blue-600 border-blue-600 rounded-t-lg font-bold': activeTab === 'hotel' }]"
                            class=" active inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Yêu thích</a>
                    </li>
                </ul>
            </div>

            <div class="bg-white p-3 shadow-sm rounded-sm" v-if="isCart">
              <!-- title Section -->
              <div
                class="flex items-center space-x-2 font-semibold text-gray-900 leading-8"
              >
                <span class="tracking-wide">Đơn hàng</span>
              </div>
              <!--table đơn hàng-->
              <div class="overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-4 py-4">STT</th>
                            <th scope="col" class="px-4 py-3">Khách hàng</th>
                            <th scope="col" class="px-4 py-3">Trạng thái</th>
                            <th scope="col" class="px-4 py-3">Phương thức thanh toán</th>
                            <th scope="col" class="px-4 py-3">
                            </th>
                        </tr>
                    </thead>
                    <tbody v-for="(order, index) in orders" :key="index">
                        <tr class="border-b dark:border-gray-700">
                            <th scope="row"
                                class="px-4 py-3 font-medium  text-gray-900 whitespace-nowrap dark:text-black">{{ index +
                                    1 }}</th>
                            <td class="px-4 py-3">
                                {{ order.user.fullname }}
                            </td>
                            <td class="px-4 py-3"> {{ order.status }}</td>
                            <td class="px-4 py-3"> {{ order.provider }}</td>
                            
                            <!--action ?-->
                        </tr>
                    </tbody>
                </table>
              </div>
            </div>

            <div class="bg-white p-3 shadow-sm rounded-sm" v-if="isHotel">
              <!-- title Section -->
              <div
                class="flex items-center space-x-2 font-semibold text-gray-900 leading-8"
              >
                <span class="tracking-wide">Khách sạn yêu thích</span>
              </div>
              <!--table đơn hàng-->
              <div class="overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-4 py-4">STT</th>
                            <th scope="col" class="px-4 py-3">Khách sạn</th>
                            <th scope="col" class="px-4 py-3">địa chỉ</th>
                            <th scope="col" class="px-4 py-3">Thông tin</th>
                            <th scope="col" class="px-4 py-3">
                            </th>
                        </tr>
                    </thead>
                    <tbody v-for="(hotel, index) in hotels" :key="index">
                        <tr class="border-b dark:border-gray-700">
                            <th scope="row"
                                class="px-4 py-3 font-medium  text-gray-900 whitespace-nowrap dark:text-black">{{ index +
                                    1 }}</th>
                            <td class="px-4 py-3">
                                {{ hotel.name_hotel }}
                            </td>
                            <td class="px-4 py-3"> {{ hotel.address }}</td>
                            <td class="px-4 py-3"> {{ hotel.information }}</td>
                            
                            <!--action ?-->
                        </tr>
                    </tbody>
                </table>
              </div>
            </div>
            <!-- End of about section -->
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
      activeTab: 'cart',isCart:true,isHotel:false,
      hotels: [], orders: [],
      user: '',
    };
  },
  mounted() {},
  components: {},
  methods: {
    activeCart()
    {
      this.isHotel = false
      this.isCart = true
      this.activeTab = 'cart'
    },
    activeHotel()
    {
      this.isHotel = true
      this.isCart = false
      this.activeTab = 'hotel'
    },

    // lấy thông tin của chính user đã đăng nhập trên local storage
    getToken() {
      let user = JSON.parse(localStorage.getItem("User"));
      return user;
    },

    async getOrder() {
       try {
           const result = await this.$axios.get(`order/getOrderUser/${this.user.id}`);
           this.orders = result.data;
           console.log(result.data);
       } catch (error) {
           console.log(error)
       }
    },
  },
};
</script>
