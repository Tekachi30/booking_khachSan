<template>
  <div class=" max-w-[1400px] mt-[100px] container mx-auto">
    <!--tieu de -->
    <div class=" md:flex justify-around items-center px-5">
      <div class="">
        <p class="mb-4 text-2xl font-extrabaseld  text-gray-900 md:text-3xl font-bold ">Khách sạn Thiên nga của đất</p>
        <div class="md:flex pt-2 pb-2">
          <span class="inline-block py-1 px-3 text-xs font-semibold bg-yellow-100 text-yellow-600 rounded-xl mr-2 mb-2">5
            (10 đánh giá)</span>
          <span class="inline-block py-1 px-3 text-xs font-semibold bg-blue-100 text-blue-600 rounded-xl">119/54 Đặng
            Chất, Phường 4, Quận 8, Hồ Chí Minh</span>
        </div>
      </div>
      <p class="mb-4 text-2xl font-extrabold leading-none tracking-tight text-blue-900 md:text-3xl ">Chỉ từ 2 900 000 đ
      </p>

    </div>

    <!--hình ảnh-->
    <swiper :pagination="true" :modules="modules" class="mySwiper">
      <swiper-slide>
        <div class="flex items-center justify-center px-2">
          <img src="https://icdn.dantri.com.vn/2019/02/16/10-1550333970807.jpg" alt="Mô tả ảnh"
            class="  object-cover rounded-lg">
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="flex items-center justify-center px-2">
          <img src="https://icdn.dantri.com.vn/2019/02/16/10-1550333970807.jpg" alt="Mô tả ảnh"
            class="  object-cover rounded-lg">
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
          <div class="bg-white rounded-lg m-2">
            <!--render danh sách phòng ra-->
            <div class="group">
              <div class=" rounded-xl  p-2 md:p-5 md:flex items-center">
                <!--ben trai-->
                <img src="https://icdn.dantri.com.vn/2019/02/16/10-1550333970807.jpg"
                  class="hidden md:block object-cover rounded-lg w-[70px] h-[70px] mr-2" alt="">
                <p class=" text-base font-extrabold text-gray-700 underline cursor-pointer" @click="openDetailRoom">Khách
                  sạn Thiên nga của
                  đất</p>
                <!-- ben phải-->
                <div class="md:ml-auto md:flex items-center">
                  <div class="flex md:ml-2 items-center">
                    <p class=" text-base font-extrabold text-gray-900 mr-1 ">2 900 000 đ</p>
                    <label for="Quantity" class="sr-only"> Quantity </label>
                    <div class=" rounded border border-gray-200 max-w-content inline-block">
                      <button type="button" class="h-10 w-10 leading-10 text-gray-600 transition hover:opacity-75">
                        &minus;
                      </button>
                      <input type="number" id="Quantity" value="1"
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
          <img alt="Office" src="https://hotel-webdesign.com/wp-content/uploads/2022/04/2goxkj594nm.jpg"
            class="absolute inset-0 h-full w-full object-cover" />

          <div class="relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 pt-32 sm:pt-48 lg:pt-64">
            <div class="p-4 sm:p-6">
              <span class="block text-xs text-white/90"> Địa chỉ khách sạn </span>

              <a>
                <h3 class="mt-0.5 text-lg text-white font-bold">Tên khách sạn</h3>
              </a>

              <p class="mt-2  text-sm/relaxed text-white/95">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam praesentium,
                commodi iste at nobis aut voluptas similique rem quos voluptatum omnis vitae dolorem suscipit,
                nemo molestias quia? Ex doloribus, natus dolorum labore reprehenderit,
                porro, molestiae facere laborum praesentium possimus quis!
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>

    <cart @cancel="openCart()" v-if="isShowCart" />
    <room @cancel="openDetailRoom()" v-if="isDetailRoom" />
    <mapVue :lng="106.67792291188607" :lat="10.737908960298967"/>
    <rating id="1"/>
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
export default {
  data() {
    return {
      isDetailRoom: false,
      isShowCart: false
    };
  },
  mounted() {

  },
  components: {
    Swiper,
    SwiperSlide,
    cart, room, rating,mapVue

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
    }
  },
};
</script>