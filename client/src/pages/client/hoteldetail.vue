<template>
  <div class=" max-w-[1400px] mt-[100px] container mx-auto">
    <!--tieu de -->
    <div class=" md:flex justify-around items-center px-5">
      <div class="">
        <p class="mb-4 text-2xl font-extrabaseld  text-gray-900 md:text-3xl font-bold ">{{ hotel.name_hotel }}</p>
        <div class="md:flex pt-2 pb-2">
          <span class="inline-block py-1 px-3 text-xs font-semibold bg-yellow-100 text-yellow-600 rounded-xl mr-2 mb-2">
            ({{ countRating }} đánh giá)</span>
          <span class="inline-block py-1 px-3 text-xs font-semibold bg-blue-100 text-blue-600 rounded-xl">
            <dd class="flex items-center">

              {{ hotel.address + ',' }}
              <p v-for="district in districts.filter(item => item.code == hotel.district_code)">{{ district.name +
                ',' }}</p>
              <p v-for="ward in wards.filter(item => item.code == hotel.ward_code)">{{ ward.name + ',' +
                getCityName(hotel.city_code) }}</p>
            </dd>
          </span>
        </div>
      </div>
      <p class="mb-4 text-2xl font-extrabold leading-none tracking-tight text-blue-900 md:text-3xl ">Chỉ từ 2 900 000 đ
      </p>

    </div>

    <!--hình ảnh-->
    <swiper :pagination="true" :modules="modules" class="mySwiper">
      <swiper-slide v-for="img in hotel.img_hotels">
        <div class="flex items-center justify-center px-2">
          <img :src="img.url" alt="Mô tả ảnh" class="  object-cover rounded-lg">
        </div>
      </swiper-slide>
    </swiper>

    <!-- đặt phòng-->
    <p class="mb-4 mt-10 text-2xl font-extrabold  text-gray-900 md:text-3xl">Các loại phòng và giá</p>
    <div class="md:grid grid-cols-6 gap-4 px-2">
      <!--thong tin list room
      -->
      <div class="col-span-4">
        <div class="px-10 mt-5 py-10 rounded-2xl"
          style="background-image: url('https://img4.thuthuatphanmem.vn/uploads/2020/12/25/background-don-sac-dep-cho-powerpoint_101110800.jpg');">
          <!--button clear-->
          <div class="flex justify-end mb-4 ">
            <button type="button"
              class="focus:ring-4 bg-blue-300 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><span
                class="text-base">X</span> Xóa lựa chọn</button>
          </div>
          <!--list render phong-->
          <div class="bg-white rounded-lg m-2" v-for="room in hotel.room_hotels">
            <!--render danh sách phòng ra-->
            <div class="group">
              <div class=" rounded-xl  p-2 md:p-5 md:flex items-center">
                <!--ben trai-->
                <img :src="room.img_rooms[0].url" class="hidden md:block object-cover rounded-lg w-[70px] h-[70px] mr-2"
                  alt="">
                <p class=" text-base font-extrabold text-gray-700 underline cursor-pointer" @click="openDetailRoom();selectRoom(room)">{{
                  formatTypeRoom(room.type_room) }}</p>
                <!-- ben phải-->
                <div class="md:ml-auto md:flex items-center">
                  <div class="flex md:ml-2 items-center">
                    <p class=" text-base font-extrabold text-gray-900 mr-1 ">{{ formatCurrency(room.price) }}</p>
                    <label for="Quantity" class="sr-only"> Quantity </label>
                    <div class=" rounded border border-gray-200 max-w-content inline-block">
                      <button type="button" class="h-10 w-10 leading-10 text-gray-600 transition hover:opacity-75">
                        &minus;
                      </button>
                      <input type="number" id="Quantity" :value="room.quantity"
                        class="h-10 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none" />
                      <button type="button" class="h-10 w-10 leading-10 text-gray-600 transition hover:opacity-75">
                        &plus;
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--khu vực tính tiền -->
          <div class="sum flex items-center">
            <div class="sum_price">
              <p class="mt-2 text-xl font-extrabold text-gray-900 ">Tổng</p>
              <p class=" text-xl font-extrabold leading-none tracking-tight text-blue-900">0 đ
              </p>
            </div>
            <div class="ml-auto">
              <button type="button" @click="openCart"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Đặt
                phòng</button>
            </div>
          </div>
        </div>
      </div>

      <!--thong tin ks-->
      <div class="mt-2 md:mt-0 col-span-2">
        <!--thông tin khách sạn-->
        <article class="relative overflow-hidden rounded-lg shadow transition hover:shadow-lg mt-5">
          <img alt="Office" :src="img_hotel_1"
            class="absolute inset-0 h-full w-full object-cover" />

          <div class="relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 pt-32 sm:pt-48 lg:pt-64">
            <div class="p-4 sm:p-6">
              <span class="block text-xs text-white/90"> {{ hotel.name_hotel }} </span>

              <a>
                <h3 class="mt-0.5 text-lg text-white font-bold">
                  <dd class="">

                    {{ hotel.address + ',' }}
                    <p v-for="district in districts.filter(item => item.code == hotel.district_code)">{{ district.name +
                      ',' }}</p>
                    <p v-for="ward in wards.filter(item => item.code == hotel.ward_code)">{{ ward.name + ',' +
                      getCityName(hotel.city_code) }}</p>
                  </dd>
                </h3>
              </a>

              <p class="mt-2  text-sm/relaxed text-white/95">
                {{ hotel.information }}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>

    <cart @cancel="openCart()" v-if="isShowCart" />
    <room @cancel="openDetailRoom()" v-if="isDetailRoom" :room="room" />
    <mapVue :lng="longitube" :lat="latitube" />
    <rating :id="id_hotel" />
  </div>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';

import cart from '../../components/client/cartVue.vue';
import room from '../../components/client/roomVue.vue';
import rating from '../../components/client/ratings.vue'
import mapVue from '../../components/client/map.vue';
import AddressService from '../../plugins/addressService';
export default {
  data() {
    return {
      isDetailRoom: false, isShowCart: false,
      hotels: [], hotel: '', user: '', id_hotel: '',
      citys: [], districts: [], wards: [],
       countRating: '', longitube: null, latitube: null,img_hotel_1:null,
       room:[],
    };
  },
  mounted() {

    this.user = JSON.parse(localStorage.getItem("User"));
    this.id_hotel = this.$route.params.id
    this.getHotel()
    AddressService.getCountry().then((data) => {
      this.citys = data;
    });
    AddressService.getAllDistricts().then(data => { this.districts = data; });
    AddressService.getAllWard().then(data => { this.wards = data; });
  },
  components: {
    Swiper,
    SwiperSlide,
    cart, room, rating, mapVue

  },
  setup() {
    return {
      modules: [Pagination],
    };
  },
  methods: {
    openDetailRoom() {
      this.isDetailRoom = !this.isDetailRoom
    },

    openCart() {
      this.isShowCart = !this.isShowCart
    },

    formatCurrency(value) {
      let val = (value / 1).toFixed(0).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' đồng'
    },

    getCityName(cityCode) {
      const city = this.citys.find((c) => c.code === cityCode);
      return city ? city.name : '';
    },

    //start code
    async getHotel() {
      try {
        const result = await this.$axios.get(`hotel/getid/${this.id_hotel}`);
        this.hotel = result.data;
        this.countRating = this.hotel.rating_hotels.length
        this.longitube = this.hotel.longitude
        this.latitube = this.hotel.latitube
        this.img_hotel_1 = this.hotel.img_hotels[0].url

      } catch (error) {
        console.log(error)
      }
    },

    formatTypeRoom(type) {
      switch (type) {
        case 'SGL':
          return 'Phòng 1 giường đơn cho 1 người.';
        case 'TWL':
          return 'Phòng 2 giường đơn cho 2 người.';
        case 'DBL':
          return 'Phòng 1 giường đôi cho 2 người.';
        case 'TRPL_1':
          return 'Phòng 1 giường đơn và 1 giường đôi.';
        case 'TRPL_2':
          return 'Phòng 3 giường đơn.';
        default:
          return 'Unknown room type';
      }
    },

    selectRoom(room)
    {
      this.room = room
    },

  },
};
</script>