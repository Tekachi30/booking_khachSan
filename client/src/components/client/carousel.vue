<template>
  <div id="default-carousel" class="relative w-full">
    <!-- Carousel wrapper -->
    <div class="relative overflow-hidden  m-2">
      <!-- Item 1 -->
      <div v-for="(item, index) in items" :key="index" :class="{ hidden: activeIndex !== index }"
        class="duration-700 ease-in-out mt-2" data-carousel-item>
        <section class="py-5">
          <div class="container flex flex-wrap items-center justify-center mx-auto  md:px-12 md:flex-row">
            <div class="mb-14 lg:mb-0 lg:w-1/2 flex justify-center items-center">
              <div>
                <h1
                  class="max-w-xl text-base leading-none text-gray-900 font-extrabold font-sans text-center lg:text-5xl lg:text-left lg:leading-tight mb-5">
                  {{ item.title }}
                </h1>
                <p class="max-w-xl text-center text-gray-500 lg:text-left lg:max-w-md">
                  {{ item.description }}
                </p>
              </div>
            </div>
            <div class="lg:w-1/2">
              <img class="ml-auto" :src="item.src" alt="aaaa">
            </div>
          </div>
        </section>


      </div>
    </div>
    <!-- Slider indicators -->
    <div class="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
      <button v-for="(item, index) in items" :key="index" type="button" class="w-3 h-3 rounded-full"
        :aria-current="activeIndex === index" @click="setActiveIndex(index)" aria-label="'Slide ' + (index + 1)"></button>
    </div>
    <!-- Slider controls -->
    <button type="button"
      class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      @click="prev">
      <span
        class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
        <svg class="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
          fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
        </svg>
        <span class="sr-only">Previous</span>
      </span>
    </button>
    <button type="button"
      class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      @click="next">
      <span
        class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
        <svg class="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
          fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
        </svg>
        <span class="sr-only">Next</span>
      </span>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: 0,
      items: [
        {
          title: ' Dịch Vụ Đặt Phòng Khách Sạn 1',
          description: " Dịch vụ đặt phòng khách sạn này thực sự đã thay đổi cách chúng tôi lên kế hoạch cho chuyến đi của mình. 1",
          src: "https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          alt: "..2.",
        },
        {
          title: ' Dịch Vụ Đặt Phòng Khách Sạn 2',
          description: " Dịch vụ đặt phòng khách sạn này thực sự đã thay đổi cách chúng tôi lên kế hoạch cho chuyến đi của mình. 2",
          src: "https://images.pexels.com/photos/2965773/pexels-photo-2965773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          alt: "...",
        },
        {
          title: ' Dịch Vụ Đặt Phòng Khách Sạn 3',
          description: " Dịch vụ đặt phòng khách sạn này thực sự đã thay đổi cách chúng tôi lên kế hoạch cho chuyến đi của mình. 3",
          src: "https://images.pexels.com/photos/2582757/pexels-photo-2582757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          alt: "...",
        },
        {
          title: ' Dịch Vụ Đặt Phòng Khách Sạn 4',
          description: " Dịch vụ đặt phòng khách sạn này thực sự đã thay đổi cách chúng tôi lên kế hoạch cho chuyến đi của mình. 4",
          src: "https://images.pexels.com/photos/7276723/pexels-photo-7276723.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          alt: "...",
        },
      ],
    };
  },
  mounted() {
    this.startAutoSlide();
  },
  beforeDestroy() {
    this.stopAutoSlide();
  },
  methods: {
    setActiveIndex(index) {
      this.activeIndex = index;
    },
    prev() {
      if (this.activeIndex > 0) {
        this.activeIndex--;
      }
    },
    next() {
      if (this.activeIndex < this.items.length - 1) {
          this.activeIndex++;
        } else {
          this.activeIndex = 0; // quay về slide đầu tiên
        }
    },
    startAutoSlide() {
      this.interval = setInterval(() => {
        this.next();
        
      }, 5000); // thay đổi slide mỗi 5 giây
    },
    stopAutoSlide() {
      clearInterval(this.interval);
    },
  },
};
</script>
