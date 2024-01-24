<template>
    <!-- Start block -->
    <section class=" p-3 sm:p-5 antialiased">
        <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
            <!-- Start coding here -->
            <div class=" relative shadow-md sm:rounded-lg overflow-hidden">
                <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <!-- <div class="w-full md:w-1/2">
                        <div class="flex items-center">
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
                                <input type="text" id="simple-search" v-on:keyup.enter="search()" v-model="value_search"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Tìm theo tên.." required="">
                            </div>
                        </div>
                    </div> -->
                    <button @click="openAdd()" type="button"
                        class="flex items-center justify-center  bg-gray-300 hover:bg-gray-400 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2  focus:outline-none ">
                        <svg class="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path clip-rule="evenodd" fill-rule="evenodd"
                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                        </svg>
                        Thêm
                    </button>
                </div>
                <!--nội dung-->
                <div class="overflow-x-auto">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-4 py-4">STT</th>
                                <th scope="col" class="px-4 py-3">Khách hàng</th>
                                <th scope="col" class="px-4 py-3">Tiêu đề</th>
                                <th scope="col" class="px-4 py-3">Nội dung</th>
                                <th scope="col" class="px-4 py-3">
                                </th>
                            </tr>
                        </thead>
                        <tbody v-for="(noti, index) in notis" :key="index">
                            <tr class="border-b dark:border-gray-700">
                                <th scope="row"
                                    class="px-4 py-3 font-medium  text-gray-900 whitespace-nowrap dark:text-black">{{ index +
                                        1 }}</th>
                                <td class="px-4 py-3"> {{ noti.User.fullname }}</td>
                                <td class="px-4 py-3"> {{ noti.title_noti }}</td>
                                <td class="px-4 py-3"> {{ noti.content_noti }}</td>
                                
                                <!--action ?-->
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
    <!-- End block -->

    <!-- Create modal -->
    <div v-if="isAdd" id="createProductModal"
        class=" overflow-y-auto overflow-x-hidden fixed w-full h-full top-0 left-0 flex items-center justify-center z-50">
        <div class="relative p-4 w-full max-w-2xl max-h-full">
            <!-- Modal content -->
            <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-400 sm:p-5">
                <!-- Modal header -->
                <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Thêm thông báo</h3>

                    <button @click="openAdd()" type="button"
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
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tiêu đề</label>
                            <input v-model="title_noti" type="text" name="title_noti" id="title_noti"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Nhập tiêu đề" required="">
                            <p v-if="!title_noti && title_noti_forcus" style="color: darkred; font-weight: bold;">Chưa nhập tiêu đề!</p>
                        </div>

                        <div>
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nội dung</label>
                            <input v-model="content_noti" type="text" name="content_noti" id="content_noti"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Nhập nội dung" required="">
                            <p v-if="!content_noti && content_noti_forcus" style="color: darkred; font-weight: bold;">Chưa nhập nội dung!</p>
                        </div>
                       
                    </div>
                    <button @click="addNoti()" type="button"
                        class=" inline-flex items-center bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        <svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewbox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clip-rule="evenodd" />
                        </svg>
                        Thêm thông báo
                    </button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

export default
{
  data(){
    return {
        notis: [], value_search: '', noti: '', title_noti: '', content_noti: '',
        isAdd: false,
        title_noti_forcus: false, content_noti_forcus: false
    }
  },
  mounted(){
    this.getNoti();
  },
  components: {},
  methods: {
    openAdd() {
        this.isAdd = !this.isAdd
    },
    async getNoti() {
       try {
           const result = await this.$axios.get('noti/get');
           this.notis = result.data;
          
       } catch (error) {
           console.log(error)
       }
    },

    async addNoti() {
        try {
            if(this.title_noti && this.content_noti){
                const result = await this.$axios.post('noti/add',{
                    title_noti: this.title_noti,
                    content_noti: this.content_noti
                });
                if (result.status == 200) {
                    this.content_noti_forcus = false;
                    this.title_noti_forcus = false;

                    setTimeout(() => {
                           location.reload()
                        }, 1000);
                        
                    this.openAdd();
                    this.getNoti();
                }else {
                    this.$refs.toast.showToast(result.data.message);
                }
            }else{
                this.content_noti_forcus = true;
                this.title_noti_forcus = true;
            }
        } catch (error) {
            console.log(error);
        }
    }

    // async search()
    // {
    //    try {
    //         const result = await this.$axios.post('rating/search',
    //         {
    //             "search":this.value_search
    //         });
    //         this.ratings = result.data
    //    } catch (error) {
    //     console.log(error)
    //    }
    // },
  }
}
</script>