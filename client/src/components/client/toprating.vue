<template>
    <section class="py-20">
        <div class="container mx-auto ">
            <div class="max-w-lg ml-10">
                <p class="text-blueGray-400 leading-loose text-xl font-bold">Khách hàng chia sẻ về những kỷ niệm tuyệt vời trên chuyến du lịch
                    <span class="text-blue-500"> với chúng tôi. </span>
                </p>
            </div>      
                <swiper :pagination="true" :modules="modules" class="mySwipe" style="background-image: url('https://img4.thuthuatphanmem.vn/uploads/2020/12/25/background-don-sac-dep-cho-powerpoint_101110800.jpg');" >
                    <swiper-slide >
                        <div class="w-full  py-5 px-5">
                            <div class="px-6 py-10 ">
                                <div class=" mb-4">
                                    <div class="">
                                        <span class="inline-block py-1 px-3 text-xs font-semibold bg-blue-100 text-blue-600 rounded-xl">Tên khách sạn</span>
                                    </div>
                                </div>
                                <p class="leading-loose text-blueGray-400 mb-5">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae eos dolore, quaerat non optio beatae aperiam minima corporis necessitatibus tenetur error ea maxime id cum architecto amet? Eligendi, dicta illum!</p>
                                <strong class="mt-6 mb-2 text-md">Tên khách hàng</strong>
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>
        </div>
    </section>
</template>

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

        };
    },
    mounted() {

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

    },
};
</script>