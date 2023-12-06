<template>

    <div class="w-full lg:pl-5 mt-2">
            <div class="flex flex-wrap">

                <div class="w-1/2 lg:w-1/4 p-2" v-for="hotel in hotels">
                    <!-- <img class="rounded-lg shadow mt-0 w-full"
                        src="https://images.unsplash.com/photo-1544457070-4cd773b4d71e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZnVybml0dXJlfGVufDB8MnwwfHw%3D&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60"
                        alt=""> -->
                    <!-- view ảnh khách sạn-->
                    <swiper :pagination="{
                      dynamicBullets: true,
                    }" :modules="modules" class="mySwiper ">
                      <swiper-slide v-for="img in hotel.img_hotels">
                        <img class="rounded-t-lg p-1 " :src="img.url" alt="" />
                      </swiper-slide>
                    </swiper>
                    
                    <div class="mt-4 flex">
                        <div class="ml-3">
                            <h6 class="text-sm font-normal mb-0">{{ getCityName(hotel.city_code) }}</h6>
                            <h5 class="font-bold">khách sạn: {{ hotel.name_hotel }}</h5>
                            <p class="mb-3 font-normal text-gray-700">{{ hotel.information }}</p>
                            <button class="btn btn-icon-only btn-2 btn-rounded btn-outline-dark" type="button">
                                <span class="btn-inner--icon"><i class="fa fa-arrow-right" aria-hidden="true"></i></span>
                            </button>
                        </div>
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
import AddressService from '../../plugins/addressService'
export default {
  data() {
    return {
        hotels: [], citys: [],
    };
  },
  mounted() {
    this.getHotel()

    AddressService.getCountry().then((data) => {
      this.citys = data;
    });
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


    async getHotel() {
      try {
        const result = await this.$axios.get(`hotel/get/`)
        this.hotels = result.data
      } catch (error) {
        console.log(error)
      }
    },
    getCityName(cityCode) {
      const city = this.citys.find((c) => c.code === cityCode);
      return city ? city.name : '';
    },
  }
}
</script>