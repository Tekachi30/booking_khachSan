<template>
    <!-- Start block -->
    <section class=" p-3 sm:p-5 antialiased">
        <div class=" px-4 ">
            <!-- Start coding here -->
            <div class=" relative overflow-hidden">
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

                                <!--action ?-->
                                <td class="px-4 py-3">
                                    <ul class="py-1 text-sm flex">
                                        <li>
                                            <button type="button" @click="openUpdate(); selectOrder(order)"
                                                class="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200">
                                                <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg"
                                                    viewbox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path
                                                        d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                                        d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                                                </svg>
                                                Cập nhập
                                            </button>
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
    <!-- End block -->

    <!-- Update modal -->
    <div v-if="isUpdate" id="createProductModal"
        class=" overflow-y-auto overflow-x-hidden fixed w-full h-full top-0 left-0 flex items-center justify-center z-50">
        <div class="relative p-4 w-full max-w-2xl max-h-full">
            <!-- Modal content -->
            <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                <!-- Modal header -->
                <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Cập nhập hóa đơn</h3>

                    <button @click="openUpdate()" type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-target="createProductModal" data-modal-toggle="createProductModal">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewbox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <div>
                    <div class="grid gap-4 mb-4 sm:grid-cols-2">

                        <div>
                            <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trạng thái</label>
                            <select v-model="status" id="status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                              <option value="Đã Đặt">Đã đặt</option>
                              <option value="Đã Thanh Toán">Đã thanh toán</option>
                              <option value="Đã Trả Phòng">Đã trả phòng</option>
                              <option value="Đã Hủy">Đã hủy</option>
                            </select>

                        </div>

                    </div>
                    <button @click="updateOrder()" 
                        class=" inline-flex items-center bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        <svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewbox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clip-rule="evenodd" />
                        </svg>
                        Cập nhập hóa đơn
                    </button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import dayjs from 'dayjs';
export default
{
  data(){
    return {
        orders: [], owner: '', order: '',
        isUpdate: false,
        status: ''
    }
  },
  mounted(){
    this.owner = this.getToken()
    this.getOrder();
  },
  components: {},
  methods: {
    openUpdate(){
        this.isUpdate = !this.isUpdate
    },

    selectOrder(select) {
        this.order = select
        this.status = select.status
    },

    // định dạng thời gian thông qua dayjs
    formatTime(time){
        return dayjs(time).format('DD-MM-YYYY');
    },

    // lấy thông tin của chính owner đã đăng nhập trên local storage
    getToken() {
      let owner = JSON.parse(localStorage.getItem("owner")); 
      return owner;
    },
    
    //lấy dữ liệu
    async getOrder() {
       try {
           const result = await this.$axios.get('order/get');
           this.orders = result.data.filter((item) => item.hotel.id_owner == this.owner.id); //lọc ra những order của chính owner đó theo id
           console.log(result.data);
       } catch (error) {
           console.log(error)
       }
    },

    // cập nhật hóa đơn
    async updateOrder(){
        try {
            const result = await this.$axios.put(`order/update/${this.order.id}`,{
                status: this.status
            });
            if (result.status == 200) {
                this.openUpdate()
                this.getOrder()
                alert(result.data.message)
            }
            else {
                alert(result.data.message)
            }
        } catch (error) {
            
        }
    }
  }
}
</script>