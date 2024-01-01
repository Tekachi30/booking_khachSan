<template>
  <div class=" flex justify-center items-center py-12 px-4 sm:px-6 2xl:px-0 ">
    <div class="flex flex-col lg:flex-row justify-center items-center space-y-6 lg:space-y-0">
      <div class="w-80 sm:w-auto flex flex-col justify-start items-start">
        <div>
          <p class="text-3xl xl:text-4xl font-semibold leading-9 text-gray-800 dark:text-white">Khách sạn mới và
            phổ biến nhất</p>
        </div>
        <div class="mt-4 lg:w-4/5 xl:w-3/5">
          <p class="text-base leading-6 text-gray-600 dark:text-white">Tận hưởng sự xa hoa và đẳng cấp tối đa mới
            nhất và phổ biến nhất. Khám phá một hành trình tuyệt vời đưa bạn vào thế giới của sự sang trọng,
            tiện nghi và trải nghiệm không thể quên.</p>
        </div>

      </div>

      <div
        class="flex flex-col sm:flex-row jusitfy-center items-center sm:space-x-5 xl:space-x-8 space-y-4 sm:space-y-0 ">
        <div class="">
          <img class="hidden lg:block" src="https://icdn.dantri.com.vn/2019/02/16/10-1550333970807.jpg" alt="sofa" />
          <img class="w-80 sm:w-auto lg:hidden" src="https://icdn.dantri.com.vn/2019/02/16/10-1550333970807.jpg"
            alt="sofa" />
        </div>

      </div>
    </div>
  </div>

  <!--VIEW HOTEL TOP-->
  <section class="pt-10 pb-10">
    <div class=" w-full px-4 sm:px-8 xl:px-0">
      <div class="grid content-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-11 gap-x-7.5">
        <!-- ks 1 -->
        <a class="block rounded-lg p-4 shadow-sm shadow-indigo-100" v-for="hotel in hotels">
          <!-- <img alt="Home"
                        src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                        class="h-56 w-full rounded-md object-cover" /> -->
          <swiper :pagination="{
            dynamicBullets: true,
          }" :modules="modules" class="mySwiper ">
            <swiper-slide v-for="img in hotel.img_hotels">
              <img class="rounded-t-lg p-1 " :src="img.url" alt="" style="width: 1360px; height: 360px;" />
            </swiper-slide>
          </swiper>

          <div class="mt-2">
            <dl>
              <div>
                <dt class="sr-only">khách sạn</dt>

                <router-link :to="{ name: 'hoteldetail', params: { id: `${hotel.id}` } }" class="font-bold text-xl">{{
                  hotel.name_hotel }}</router-link>
              </div>

              <div>
                <dt class="sr-only">Địa chỉ</dt>
                <dd class="pt-2 font-medium flex items-center">
                  {{ hotel.address + ',' }}
                  <p v-for="district in districts.filter(item => item.code == hotel.district_code)">{{ district.name +
                    ',' }}</p>
                  <p v-for="ward in wards.filter(item => item.code == hotel.ward_code)">{{ ward.name + ',' +
                    getCityName(hotel.city_code) }}</p>
                </dd>
              </div>

              <div>
                <dt class="sr-only">Địa chỉ</dt>
                <dd class="font-normal text-base">{{ hotel.information }}</dd>
              </div>
            </dl>

            <div class="mt-6 flex items-center gap-8 text-xs">
              <!-- đánh giá-->
              <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                <svg class="h-4 w-4 text-indigo-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>

                <div class="mt-1.5 sm:mt-0">
                  <p class="text-gray-500">Đánh giá</p>

                  <p class="font-medium">{{ countRating(hotel.id, hotel.rating_hotels) }} đánh giá</p>
                </div>
              </div>

              <!-- so phong-->
              <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                <svg class="h-4 w-4 text-indigo-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>

                <div class="mt-1.5 sm:mt-0">
                  <p class="text-gray-500">Số phòng</p>
                  <p class="font-medium">{{ countRoom(hotel.id, hotel.room_hotels) }} phòng</p>
                </div>
              </div>

              <!--xem chi tiet-->
              <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2 ml-auto">
                <router-link :to="{ name: 'hoteldetail', params: { id: `${hotel.id}` } }"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Đặt
                  phòng</router-link>
                <div class="ml-auto">
                  <span v-if=" follows && follows.length > 0 && follows.some(item => item.id_hotel === hotel.id && item.id_user === user.id)">
                    <!-- Sử dụng v-for để lặp lại các sản phẩm trong danh sách thích -->
                    <span
                      v-for="follow in follows.filter(item => item.id_hotel === hotel.id && item.id_user === user.id)">
                      <!-- Kiểm tra trạng thái của sản phẩm và sử dụng màu đỏ hoặc black tương ứng -->
                      <i class="fa-solid fa-bookmark text-xl" :style="{ color: follow.status ? '#ccc' : 'red' }"
                        @click="unfollow(follow, hotel.id)"></i>
                    </span>
                  </span>
                  <!-- Nếu không có sản phẩm nào trong danh sách thích, hiển thị chữ màu #ccc -->
                  <span v-else>
                    <i class="fa-solid fa-bookmark text-xl" style="color: #ccc" @click="addfollow(hotel.id)"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
      <button
        class="flex justify-center font-medium text-dark border border-dark rounded-md py-3 px-6 hover:bg-dark  ease-in duration-200 mx-auto mt-5" @click="toHotel()">
        Xem tất cả
      </button>

    </div>
  </section>
  <toast ref="toast" />
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import AddressService from '../../plugins/addressService'

import toast from '../toast.vue';
export default {
  data() {
    return {
      hotels: [], citys: [], districts: [], wards: [], follows: [],user:''
    };
  },
  mounted() {
    this.getHotel()
    this.getfollow()
    AddressService.getCountry().then((data) => {
      this.citys = data;
    });
    AddressService.getAllDistricts().then(data => { this.districts = data; });
    AddressService.getAllWard().then(data => { this.wards = data; });
    this.user = JSON.parse(localStorage.getItem("User"));

  },
  components: {
    Swiper,
    SwiperSlide,
    toast
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

    countRoom(id, rooms) {
      let sum = 0;
      for (let y = 0; y < rooms.length; y++) {
        if (rooms[y].id_hotel === id) {
          sum++;
        }
      }
      return sum;
    },

    countRating(id, rating) {
      let sum = 0;
      for (let y = 0; y < rating.length; y++) {
        if (rating[y].id_hotel === id) {
          sum++;
        }
      }
      return sum;
    },
    async getfollow() {
      try {
        const result = await this.$axios.get('favorate/get');
        this.follows = result.data
      } catch (error) {
        console.log(error)
      }
    },

    async unfollow(follow, hotelid) {
      const id = follow.id;
      const id_user = this.user.id
      const result = await this.$axios.post('favorate/handle',
        {
          "id_user": id_user,
          "id_hotel": hotelid,
          "id": follow.id,
          "status": follow.status
        })
      if (result.status == 200) {
        this.$refs.toast.showToast(result.data.message);
        this.getfollow()
      }
    },
    async addfollow(hotelid) {
      const id_user = this.user.id

      const result = await this.$axios.post('favorate/handle',
        {
          "id_user": id_user,
          "id_hotel": hotelid,
        })
      if (result.status == 200) {
        this.$refs.toast.showToast(result.data.message);
        this.getfollow()
      }
    },
    toHotel()
    {
      this.$router.push('/hotels');

    }

  }
}
</script>