<template>
    <!--view getHotel => option value lấy ra id_hotel-->
    <div class="hotel mb-2">
        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chọn khách sạn</label>
        <select v-model="hotel_id" @change="getRoom()"
            class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none text-sm">
            <option disabled selected>Chọn khách sạn</option>
            <option v-for="hotel in hotels" :key="hotel.id" :value="hotel.id">
                {{ hotel.name_hotel }}
            </option>
        </select>
    </div>

    <!--button thêm-->
    <button @click="openAdd()" type="button"
        class="flex items-center justify-center  bg-gray-300 hover:bg-gray-400 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2  focus:outline-none ">
        <svg class="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path clip-rule="evenodd" fill-rule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
        </svg>
        Thêm
    </button>

    <!--view room-->
    <div class="w-full">
        <div class="grid grid-cols-4 gap-4">
            <div class=" bg-white border border-gray-200 rounded-lg shadow " v-for="room in rooms">
                <!-- view ảnh phòng-->
                <swiper :pagination="{
                    dynamicBullets: true,
                }" :modules="modules" class="mySwiper ">
                    <swiper-slide v-for="img in room.img_rooms">
                        <img class="rounded-t-lg p-1 " :src="img.url" alt="" />
                    </swiper-slide>
                </swiper>

                <div class="p-5">
                    <a>
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{{ room.type_room }}</h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-700 ">{{ room.quanlity }}</p>
                    <p class="mb-3 font-normal text-gray-700 ">{{ room.real_quanlity }}</p>
                    <p class="mb-3 font-normal text-gray-700 ">{{ room.price }}</p>

                    <a @click="openUpdate(); select(hotel)"
                        class="inline-flex cursor-pointer items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                        Cập nhật
                    </a>
                    <a
                        class="ml-2 inline-flex cursor-pointer items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                        Xóa
                    </a>
                </div>
            </div>

        </div>
    </div>

    <!--form add-->
    <div v-if="isAdd" id="createProductModal"
        class=" overflow-y-auto overflow-x-hidden fixed w-full h-full top-0 left-0 flex items-center justify-center z-50">
        <div class="relative p-4 w-full max-w-2xl max-h-full">
            <!-- Modal content -->
            <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-400 sm:p-5">
                <!-- Modal header -->
                <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Thêm phòng</h3>

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
                        <div class="quantity">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số lượng phòng</label>
                            <input v-model="quantity" type="number" name="quantity" id="name_hotel"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Nhập số lượng" required="">
                        </div>

                        <div class="price">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giá phòng</label>
                            <input v-model="price" type="text" name="price" id="price"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Nhập gỉá phòng" required="">
                        </div>

                        <div class="type">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chọn loại phòng</label>
                            <select v-model="type_room" required
                                class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none text-sm">
                                <option disabled>Loại phòng</option>
                                <option  value="SGL">Phòng 1 giường đơn</option>
                                <option  value="TWN">Phòng 2 giường đơn</option>
                                <option  value="DBL">Phòng 1 giường đôi</option>
                                <option  value="TRPL_1">Phòng 1 giường đơn và 1 giường đôi</option>
                                <option  value="TRPL_2">Phòng 3 giường đơn</option>
                            </select>
                        </div>
                    </div>

                    <!--hiển thị ảnh đã chọn tại đây đi ???-->
                    <div v-if="imgs.length > 0" class="mb-2">
                        <div class="grid grid-cols-4 gap-4">
                            <div v-for="(image, index) in imgs" :key="index"
                                class="relative group cursor-pointer transition duration-300 transform hover:scale-105">
                                <img :src="image.url" alt="Selected Image"
                                    class="w-full h-24 object-cover rounded-lg shadow-md">
                                <button @click="removeImage(index)"
                                    class="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- them ảnh tại đây luôn -->
                    <div class="flex items-center justify-center w-full mb-2">
                        <label for="dropzone-file"
                            class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <!--thông báo ràng buộc bỏ file vào -->
                                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click
                                        to
                                        upload</span> or drag and drop</p>
                                <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)
                                </p>
                            </div>
                            <!--input tại đây-->
                            <input id="dropzone-file" type="file" class="hidden" @change="onFileSelected" multiple />
                        </label>
                    </div>

                    <button @click="addRoom()" type="button"
                        class="  inline-flex items-center bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        <svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewbox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clip-rule="evenodd" />
                        </svg>
                        Thêm phòng
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
export default {
    data() {
        return {
            hotels: [], rooms: [], imgs: [],
            owner: '', hotel_id: '',
            isAdd: false, isDelete: false, isUpdate: false,
            type_room:'',price:'',quantity:''
        };
    },
    mounted() {
        this.owner = this.getToken()
        this.getHotel()

    },
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        return {
            modules: [Pagination],
        };
    },
    methods: {
        getToken() {
            let owner = JSON.parse(localStorage.getItem("owner"));
            return owner;
        },
        openAdd() {
            this.isAdd = !this.isAdd
            this.imgs = []
        },
        onFileSelected(event) {
            const files = event.target.files;
            const maxFileSizeInBytes = 10 * 1024 * 1024; // 10 MB

            for (const file of files) {
                if (file.size > maxFileSizeInBytes) {
                    alert(`Ảnh ${file.name}nhỏ hơn hoặc bằng 10mb`);
                } else {
                    // Tạo một URL cho ảnh để hiển thị trước
                    const imageUrl = URL.createObjectURL(file);
                    // Thêm ảnh vào mảng imgs
                    this.imgs.push({ file, url: imageUrl })
                }
            }
        },

        removeImage(index) {
            // Xóa ảnh khỏi mảng khi nút xóa được nhấp
            this.imgs.splice(index, 1);
        },
        async getHotel() {
            try {
                const result = await this.$axios.get(`hotel/get/${this.owner.id}`)
                this.hotels = result.data
            } catch (error) {
                console.log(error)
            }
        },

        async getRoom() {
            try {
                const result = await this.$axios.get(`room/get/${this.hotel_id}`)
                this.rooms = result.data
            } catch (error) {
                console.log(error)
            }
        },
        async addRoom() {
            try {
                if (this.imgs.length > 0) {
                    const result = await this.$axios.post(`room/add/${this.hotel_id}`,
                        {
                            "type_room": this.type_room,
                            "quantity": this.quantity,
                            "price": this.price
                        })
                
                    if(result.status == 201)
                    {
                    console.log(result.data.message)
                    }
                    if (result.status == 200) {
                        const formImg = new FormData();
                        // thêm ảnh tại đây khi thêm thông tin thành công
                        for (let i = 0; i < this.imgs.length; i++) {
                            const file = this.imgs[i].file;
                            formImg.append("avatar", file);
                        }
                        try {
                            const addimg = await this.$axios.post(`room/addImg/${result.data.room.id}`, formImg,
                                {
                                    headers: {
                                        "Content-Type": "multipart/form-data",
                                    },
                                })
                            if (addimg.status == 200) {
                                console.log(result.data.message)
                                this.getRoom()
                                this.openAdd()
                            }
                        } catch (error) {
                            console.log(error)
                        }

                    }
                }
                else {
                    alert('Them ảnh vào')
                }
            } catch (error) {
                console.log(error)
            }
        },

        async updateRoom() {
            try {

            } catch (error) {
                console.log(error)
            }
        },

        async deleteRoom() {
            try {

            } catch (error) {
                console.log(error)
            }
        },
    },
};
</script>