<template>
    <!-- Start block -->
    <section class=" p-3 sm:p-5 antialiased">
        <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
            <!-- Start coding here -->
            <div class=" relative shadow-md sm:rounded-lg overflow-hidden">
                <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <div class="w-full md:w-1/2">
                        <form class="flex items-center">
                            <label for="simple-search" class="sr-only">Tìm kiếm</label>
                            <div class="relative w-full">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400"
                                        fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <input type="text" id="simple-search"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Tìm theo tiêu đề" required="">
                            </div>
                        </form>
                    </div>
                </div>
                <!--nội dung-->
                <div class="overflow-x-auto">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-4 py-4">STT</th>
                                <th scope="col" class="px-4 py-3">Khách sạn</th>
                                <th scope="col" class="px-4 py-3">Khách hàng</th>
                                <th scope="col" class="px-4 py-3">Trạng thái</th>
                                <th scope="col" class="px-4 py-3">Phương thức thanh toán</th>
                                <th scope="col" class="px-4 py-3">Thời gian</th>
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
                                    {{ order.id_hotel }}
                                </td>
                                <td class="px-4 py-3"> {{ order.id_user }}</td>
                                <td class="px-4 py-3"> {{ order.status }}</td>
                                <td class="px-4 py-3"> {{ order.provider }}</td>
                                <td class="px-4 py-3"> {{ formatTime(order.createdAt) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
    <!-- End block -->

</template>

<script>
import dayjs from 'dayjs';
export default
{
  data(){
    return {
        orders: [], owner: ''
    }
  },
  mounted(){
    this.owner = this.getToken()
    this.getOrder();
  },
  components: {},
  methods: {
    formatTime(time){
        return dayjs(time).format('DD-MM-YYYY');
    },

    getToken() {
      let owner = JSON.parse(localStorage.getItem("owner"));
      return owner;
    },
    
    async getOrder() {
       try {
           const result = await this.$axios.get('order/get');
           this.orders = result.data.filter((item) => item.hotel.id_owner == this.owner.id); //lọc ra những đánh giá của chính owner đó theo id
           console.log(result.data);
       } catch (error) {
           console.log(error)
       }
    },
  }
}
</script>