<template>
    <!-- Start block -->
    <section class=" p-3 sm:p-5 antialiased">
        <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
            <!-- Start coding here -->
            <div class=" relative shadow-md sm:rounded-lg overflow-hidden">
                <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <div class="w-full md:w-1/2">
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
                                    placeholder="Tìm theo tiêu đề" required="">
                            </div>
                        </div>
                    </div>
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
                                <th scope="col" class="px-4 py-3">Tiêu đề</th>
                                <th scope="col" class="px-4 py-3">Nội dung</th>
                                <th scope="col" class="px-4 py-3">Hình ảnh</th>
                                <th scope="col" class="px-4 py-3">
                                </th>
                            </tr>
                        </thead>
                        <tbody v-for="(banner, index) in banners" :key="index">
                            <tr class="border-b dark:border-gray-700">
                                <th scope="row"
                                    class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-black">{{ index +
                                        1 }}</th>
                                <td class="px-4 py-3">
                                    {{ banner.title_banner }}
                                </td>
                                <td class="px-4 py-3"> {{ banner.content_banner }}</td>
                                <td class="px-4 py-3 max-w-[12rem] truncate">
                                    <img :src="banner.url_banner" alt="">
                                </td>
                                <!--action ?-->
                                <td class="px-4 py-3">
                                    <ul class="py-1 text-sm flex">
                                        <li>
                                            <button type="button" @click="openUpdate(); selectBanner(banner)"
                                                class="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200">
                                                <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg"
                                                    viewbox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path
                                                        d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                                        d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                                                </svg>
                                                Cập nhật
                                            </button>
                                        </li>

                                        <li>
                                            <button @click="openDelete(); selectBanner(banner)" type="button"
                                                class="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 text-red-500 dark:hover:text-red-400">
                                                <svg class="w-4 h-4 mr-2" viewbox="0 0 14 15" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"
                                                        d="M6.09922 0.300781C5.93212 0.30087 5.76835 0.347476 5.62625 0.435378C5.48414 0.523281 5.36931 0.649009 5.29462 0.798481L4.64302 2.10078H1.59922C1.36052 2.10078 1.13161 2.1956 0.962823 2.36439C0.79404 2.53317 0.699219 2.76209 0.699219 3.00078C0.699219 3.23948 0.79404 3.46839 0.962823 3.63718C1.13161 3.80596 1.36052 3.90078 1.59922 3.90078V12.9008C1.59922 13.3782 1.78886 13.836 2.12643 14.1736C2.46399 14.5111 2.92183 14.7008 3.39922 14.7008H10.5992C11.0766 14.7008 11.5344 14.5111 11.872 14.1736C12.2096 13.836 12.3992 13.3782 12.3992 12.9008V3.90078C12.6379 3.90078 12.8668 3.80596 13.0356 3.63718C13.2044 3.46839 13.2992 3.23948 13.2992 3.00078C13.2992 2.76209 13.2044 2.53317 13.0356 2.36439C12.8668 2.1956 12.6379 2.10078 12.3992 2.10078H9.35542L8.70382 0.798481C8.62913 0.649009 8.5143 0.523281 8.37219 0.435378C8.23009 0.347476 8.06631 0.30087 7.89922 0.300781H6.09922ZM4.29922 5.70078C4.29922 5.46209 4.39404 5.23317 4.56282 5.06439C4.73161 4.8956 4.96052 4.80078 5.19922 4.80078C5.43791 4.80078 5.66683 4.8956 5.83561 5.06439C6.0044 5.23317 6.09922 5.46209 6.09922 5.70078V11.1008C6.09922 11.3395 6.0044 11.5684 5.83561 11.7372C5.66683 11.906 5.43791 12.0008 5.19922 12.0008C4.96052 12.0008 4.73161 11.906 4.56282 11.7372C4.39404 11.5684 4.29922 11.3395 4.29922 11.1008V5.70078ZM8.79922 4.80078C8.56052 4.80078 8.33161 4.8956 8.16282 5.06439C7.99404 5.23317 7.89922 5.46209 7.89922 5.70078V11.1008C7.89922 11.3395 7.99404 11.5684 8.16282 11.7372C8.33161 11.906 8.56052 12.0008 8.79922 12.0008C9.03791 12.0008 9.26683 11.906 9.43561 11.7372C9.6044 11.5684 9.69922 11.3395 9.69922 11.1008V5.70078C9.69922 5.46209 9.6044 5.23317 9.43561 5.06439C9.26683 4.8956 9.03791 4.80078 8.79922 4.80078Z" />
                                                </svg>
                                                Xóa
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



    <!-- Create modal -->
    <div v-if="isAdd" id="createProductModal"
        class=" overflow-y-auto overflow-x-hidden fixed w-full h-full top-0 left-0 flex items-center justify-center z-50">
        <div class="relative p-4 w-full max-w-2xl max-h-full">
            <!-- Modal content -->
            <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-400 sm:p-5">
                <!-- Modal header -->
                <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Thêm banner</h3>

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
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tiêu
                                đề</label>
                            <input v-model="title_banner" type="text" name="name" id="name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Nhập tiêu đề" required="">
                            <p v-if="!title_banner && title_banner_forcus" style="color: darkred; font-weight: bold;">Chưa nhập tiêu đề!</p>
                        </div>
                        <div class="sm:col-span-2"><label for="description"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nội dung</label>
                            <textarea v-model="content_banner" id="description" rows="4"
                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Nhập nội dung"></textarea>
                            <p v-if="!content_banner && content_banner_forcus" style="color: darkred; font-weight: bold;">Chưa nhập nội dung!</p>
                        </div>
                        <div>
                            <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hình
                                ảnh</label>
                            <input type="file" @change="onFileSelected($event)">
                        </div>
                    </div>
                    <button @click="addBanner()" type="button"
                        class=" inline-flex items-center bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        <svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewbox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clip-rule="evenodd" />
                        </svg>
                        Thêm banner
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Update modal -->
    <div v-if="isUpdate" id="createProductModal"
        class=" overflow-y-auto overflow-x-hidden fixed w-full h-full top-0 left-0 flex items-center justify-center z-50">
        <div class="relative p-4 w-full max-w-2xl max-h-full">
            <!-- Modal content -->
            <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                <!-- Modal header -->
                <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Cập nhật banner</h3>

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
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tiêu
                                đề</label>
                            <input v-model="title_banner" type="text" name="name" id="name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Nhập tiêu đề" required="">
                            <p v-if="!title_banner && title_banner_forcus" style="color: darkred; font-weight: bold;">Chưa nhập tiêu đề!</p>
                        </div>
                        <div class="sm:col-span-2"><label for="description"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nội dung</label>
                            <textarea v-model="content_banner" id="description" rows="4"
                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Nhập nội dung"></textarea>
                            <p v-if="!content_banner && content_banner_forcus" style="color: darkred; font-weight: bold;">Chưa nhập nội dung!</p>
                        </div>
                        <div>
                            
                            <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hình
                                ảnh</label>
                            <input type="file" @change="onFileSelectedUpdate($event)">
                            <p v-if="!avatar && avatar_forcus" style="color: darkred; font-weight: bold;">Chưa nhập nội dung!</p>
                        </div>
                    </div>
                    <button @click="updateBanner()" 
                        class=" inline-flex items-center bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        <svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewbox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clip-rule="evenodd" />
                        </svg>
                        Cập nhật banner
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Delete modal -->
    <div id="deleteModal" v-if="isDelete"
        class="  overflow-y-auto overflow-x-hidden fixed w-full h-full top-0 left-0 flex items-center justify-center z-50">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                <button @click="openDelete()" type="button"
                    class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="deleteModal">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewbox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd" />
                    </svg>

                </button>
                <svg class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true"
                    fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clip-rule="evenodd" />
                </svg>
                <p class="mb-4 text-gray-500 dark:text-gray-300">Bạn có muốn xóa Banner này ?</p>
                <div class="flex justify-center items-center space-x-4">
                    <button data-modal-toggle="deleteModal" type="button" @click="openDelete()"
                        class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Hủy</button>
                    <button type="submit" @click="deleteBanner()"
                        class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">Xóa</button>
                </div>
            </div>
        </div>
    </div>
    
<!--component toast thông báo !!!-->
<toast ref="toast"></toast>
</template>
<script>
import toast from '../../components/toast.vue';
export default {
    data() {
        return {
            banners: [], banner: '', value_search: '',
            isAdd: false, isUpdate: false, isDelete: false,
            avatar: '', title_banner: '', content_banner: '',
            avatar_forcus: false, title_banner_forcus: false, content_banner_forcus: false,
            new_avatar: ''
        };
    },
    mounted() {
        this.getBanner()
    },
    components: {
        toast,
    },
    methods: {
        onFileSelected(event) {
            this.avatar = event.target.files[0]
        },
        
        onFileSelectedUpdate(event) {
            this.new_avatar = event.target.files[0]
        },
        selectBanner(select) {
            this.banner = select
            this.title_banner = select.title_banner
            this.content_banner = select.content_banner
            this.avatar = select.url_banner
        },
        openAdd() {
            this.isAdd = !this.isAdd;
            this.title_banner = '';
            this.content_banner = '';
        },
        openUpdate() {
            this.isUpdate = !this.isUpdate
        },
        openDelete() {
            this.isDelete = !this.isDelete
        },
        async getBanner() {
            try {
                const result = await this.$axios.get('banner/get');
                this.banners = result.data;
            } catch (error) {
                console.log(error)
            }
        },
        async addBanner() {
            // lấy dữ liệu
            const formData = new FormData();
            formData.append('avatar', this.avatar);
            formData.append('title_banner', this.title_banner)
            formData.append('content_banner', this.content_banner)
            try {
                // Kiểm tra xem các thông tin có được nhật đầy đủ không
                if (!this.avatar || !this.title_banner || !this.content_banner) {
                    this.avatar_forcus = true;
                    this.title_banner_forcus = true;
                    this.content_banner_forcus = true;
                }else{
                    const result = await this.$axios.post(`banner/add`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    if (result.status == 200) {
                        this.avatar_forcus = false;
                        this.title_banner_forcus = false;
                        this.content_banner_forcus = false;
                        setTimeout(() => {
                           location.reload()
                        }, 1000);
                        this.openAdd();
                        this.getBanner();
                    }
                    else {
                        this.$refs.toast.showToast(result.data.message);
                    }
                }
            } catch (error) {
                console.log(error)
            }
        },
        async updateBanner() {
            const formData = new FormData();
            formData.append('avatar', this.new_avatar);
            formData.append('title_banner', this.title_banner)
            formData.append('content_banner', this.content_banner)

            try {
                // Kiểm tra xem các thông tin có được nhật đầy đủ không
                if (!this.avatar || !this.title_banner || !this.content_banner) {
                        this.avatar_forcus = true;
                        this.title_banner_forcus = true;
                        this.content_banner_forcus = true;
                }else{
                    const result = await this.$axios.put(`banner/update/${this.banner.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                    });
                    if (result.status === 200) {
                        this.avatar_forcus = false;
                        this.title_banner_forcus = false;
                        this.content_banner_forcus = false;
                        
                        this.$refs.toast.showToast(result.data.message);
                        setTimeout(() => {
                           location.reload()
                        }, 1000);
                        this.openUpdate();
                        this.getBanner();
                    } else {
                        this.$refs.toast.showToast(result.data.message);
                        console.log(result);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        },


        async deleteBanner() {
            try {
                const result = await this.$axios.delete(`banner/delete/${this.banner.id}`);
                if (result.status == 200) {
                    this.getBanner();
                    this.openDelete();
                    this.$refs.toast.showToast(result.data.message);
                } else {
                    this.$refs.toast.showToast(result.data.message);
                }
            } catch (error) {
                console.log(error)
            }
        },
        async search()
        {
           try {
                const result = await this.$axios.post('banner/search',
                {
                    "search":this.value_search
                });
                this.banners = result.data
           } catch (error) {
            console.log(error)
           }
        }    
    },
};
</script>
