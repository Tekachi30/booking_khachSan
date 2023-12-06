<template>
    <carouselVue/>

    <about/>
    <div class="container mx-auto flex-auto  p-2 mt-2">
        <div class="sm:px-8 mt-9">
            <div class=" w-full max-w-7xl ">
                <div class="relative ">
                    <div class=" max-w-2xl lg:max-w-5xl">
                        <div class="space-y-2 pb-6 pt-6 md:space-y-5 ">
                            <h1
                                class="text-xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 ">
                                Khánh sạn</h1>
                            <p class="text-lg leading-7 text-gray-500 dark:text-gray-400"> Được đánh giá cao
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
         <!--render mảng hotel-->


         
        <hotel/>
    </div>
    <toprating/>
    <contact/>
  </template>
  
  <script>
 
  import carouselVue from '../../components/client/carousel.vue'
  import hotel from "../../components/client/hotel.vue"
  import toprating from "../../components/client/toprating.vue";
  import contact from "../../components/client/contact.vue";
  import about from "../../components/client/about.vue";
  export default {
    components: { 

      carouselVue,
      hotel,
      toprating,
      contact,
      about
    },
  };
  </script>
  
  <style></style>
  