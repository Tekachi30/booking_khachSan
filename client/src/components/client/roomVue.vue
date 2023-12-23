<template>
    <!-- model detail room -->
    <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-[100]" >
      <div class="relative p-4 w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Chi tiết phòng
            </h3>
            <button type="button" @click="onclose"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-4 md:p-5 space-y-4">
            <!--chi tiet phong-->
            <article class=" bg-white transition ">

              <swiper :pagination="true" :modules="modules" class="mySwiper">
                <swiper-slide>
                  <div class="flex items-center justify-center px-2">
                    <img src="https://icdn.dantri.com.vn/2019/02/16/10-1550333970807.jpg" alt="Mô tả ảnh"
                      class="  object-cover  rounded-lg">
                  </div>
                </swiper-slide>
                <swiper-slide>
                  <div class="flex items-center justify-center px-2">
                    <img src="https://icdn.dantri.com.vn/2019/02/16/10-1550333970807.jpg" alt="Mô tả ảnh"
                      class="  object-cover h-full w-full rounded-lg">
                  </div>
                </swiper-slide>
              </swiper>


              <div class="flex flex-1 flex-col justify-between">
                <div class="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                  <a href="#">
                    <h3 class="font-bold uppercase text-gray-900">
                      Loại phòng
                    </h3>
                  </a>

                  <p class="mt-2  text-sm/relaxed text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae dolores, possimus
                    pariatur animi temporibus nesciunt praesentium dolore sed nulla ipsum eveniet corporis
                    quidem, mollitia itaque minus soluta, voluptates neque explicabo tempora nisi culpa eius
                    atque dignissimos. Molestias explicabo corporis voluptatem?
                  </p>
                </div>

              </div>
            </article>
          </div>
          <!-- Modal footer -->
          <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button @click="onclose"
              class=" ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Đóng</button>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';
export default {
  props:['id'],
  data() {
    return {
        
    };
  },
  mounted() {
   
  },
  components: {
    Swiper,
    SwiperSlide

  },
  setup() {
    return {
      modules: [Pagination],
    };
  },
  methods: {
    onclose()
   {
    this.$emit("cancel");
   }
  },
};
</script>