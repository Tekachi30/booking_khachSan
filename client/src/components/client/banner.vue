<template>
    <div class="container mx-auto">
        <swiper :pagination="true" :modules="modules" class="mySwiper relative"  >  
            <swiper-slide :style="{ backgroundImage: `url(${banner.url_banner})` }" class="bg-cover bg-no-repeat" v-for="(banner) in banners">
                <div
                    class="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
                    <div class="max-w-xl  ltr:sm:text-left rtl:sm:text-right">
                        <h1 class="text-3xl font-extrabold sm:text-5xl">
                           
                            <strong class="block font-extrabold text-blue-700"> {{ banner.title_banner }} </strong>
                        </h1>
                        <p class="mt-4 max-w-lg sm:text-xl/relaxed text-green-400">
                            {{ banner.content_banner }}
                        </p>
                        <div class="mt-8 flex flex-wrap gap-4 text-center">
                        </div>
                    </div>
                </div>
            </swiper-slide>
        </swiper>


        <!--sub bar-->
        <div class=" relative  md:flex py-6 px-8 justify-between items-center w-full  shadow-xl bg-white mb-2 ">
            <div class=" rounded-3xl  bg-white">
                    <div class="mx-auto max-w-lg text-center m-2">
                        <p class="text-2xl font-bold text-gray-900 sm:text-4xl">Bạn lựa chọn khách sạn nào ?</p>
                        <p class="mt-1.5 text-base text-gray-500">
                            Hơn 100 khách sạn hạng sang giá tốt đang chờ bạn
                        </p>
                    </div>
                    <div class="md:grid grid-cols-2 gap-2">
                        <!--search ten-->
                        <div class="relative p-2">
                            <input type="text" id="Search" placeholder="Tìm kiếm khách sạn"
                                class="w-full rounded-md border-gray-200 py-5 px-5 pe-10 shadow-sm sm:text-sm" />
                            <span class="absolute inset-y-0 end-0 grid w-10 place-content-center">
                                <button type="button" class="text-gray-600 hover:text-gray-700">

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                    </svg>
                                </button>
                            </span>
                        </div>

                        <div class=" md:grid grid-cols-3 gap-3 items-center">
                            <!-- THANH PHO -->
                            <div class="relative p-2">
                                <select name="city" id="city"
                                    class="w-full rounded-md  py-5 px-5 pe-10 shadow-sm sm:text-sm">
                                    <option value="HCM">TP Hồ Chí Minh</option>
                                </select>
                            </div>

                            <!--GIA CA-->
                            <div class="relative p-2">
                                <select name="price" id="price"
                                    class="w-full rounded-md  py-5 px-5 pe-10 shadow-sm sm:text-sm">
                                    <option value="1000">10000</option>
                                </select>
                            </div>

                            <!--button-->
                            <div class="mt-2 md:mt-0 p-2">
                                <a
                                    class="w-full rounded-md border border-indigo-600 bg-indigo-600 py-5 px-5 pe-5 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500">
                                    Tìm kiếm
                                </a>
                            </div>
                        </div>
                    </div>
                    <!--bUTTON SEARCH-->
                </div>         
        </div>
        
    </div>
    
    
    
</template>
<style>
.floating-sub-hero {
    bottom: -7%;
    left: 10%;
}
</style>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';

export default {
    data() {
        return {
            banners: [],
        };
    },
    mounted() {
        this.getBanner();
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
        async getBanner() {
           try {
               const result = await this.$axios.get(`banner/get/`);
               this.banners = result.data;
               console.log(result.data);
           } catch (error) {
               console.log(error)
           }
        },
    },
};
</script>