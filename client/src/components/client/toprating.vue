<template>
    <section class="py-20">
        <div class="container mx-auto ">
            <div class="max-w-lg ml-10">
                <p class="text-blueGray-400 leading-loose text-xl font-bold">Khách hàng chia sẻ về những kỷ niệm tuyệt vời trên chuyến du lịch
                    <span class="text-blue-500"> với chúng tôi. </span>
                </p>
            </div>      
                <swiper :pagination="true" :modules="modules" class="mySwipe" style="background-image: url('https://img4.thuthuatphanmem.vn/uploads/2020/12/25/background-don-sac-dep-cho-powerpoint_101110800.jpg');" >
                    <swiper-slide v-for="rating in ratings">
                        <div class="w-full  py-5 px-5">
                            <div class="px-6 py-10 ">
                                <div class=" mb-4">
                                    <div class="">
                                        <span class="inline-block py-1 px-3 text-xs font-semibold bg-blue-100 text-blue-600 rounded-xl">{{ rating.hotel.name_hotel }}</span>
                                    </div>
                                </div>
                                <p class="leading-loose text-blueGray-400 mb-5">{{ rating.comment_rating }}</p>
                                <strong class="mt-6 mb-2 text-md">{{ rating.User.fullname }}</strong>
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
            ratings:[]
        };
    },
    mounted() {
        this.getRating()
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
        async getRating()
        {
            try {
                const result = await this.$axios.get('rating/top')
                this.ratings = result.data
            } catch (error) {
                console.log(error)
            }
        }
    },
};
</script>