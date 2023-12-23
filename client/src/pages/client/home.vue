<template>
  <div class="max-w-[1400px] container mx-auto">
    <banner />
    <tophotel />
    <toprating />

    <div class="w-80 sm:w-auto ">
      <div>
        <p class="text-3xl xl:text-4xl font-semibold leading-9 text-gray-800 dark:text-white">Khám phá Sự đặc sắc
          và Cập nhật tin tức mới nhất</p>
      </div>
    </div>
  </div>
  <div class="max-w-screen-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8  h-full">
    <div class="grid sm:grid-cols-2 md:grid-cols-3 items-center grid-cols-1">
      <div class="" v-for="item in items">
        <blog class="p-2 m-1" :id="item.id" :title="item.title" :description="item.description" :date="item.date"
          :img="item.img" />
      </div>
    </div>
    <button @click="goBlog()"
      class="flex justify-center font-medium text-dark border border-dark rounded-md py-3 px-6 hover:bg-dark  ease-in duration-200 mx-auto mt-5">
      Xem tất cả
    </button>
  </div>
</template>
  
<script>
import blog from '../../components/client/blog.vue';
import banner from '../../components/client/banner.vue';
import tophotel from '../../components/client/tophotel.vue';
import toprating from '../../components/client/toprating.vue'
export default {
  data() {
    return {
      items: [
        { id: 1, title: 'Title 1', description: 'Description 1', date: '2023-12-15', img: 'https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg' },
        { id: 2, title: 'Title 2', description: 'Description 2', date: '2023-12-16', img: 'https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg' },
        { id: 3, title: 'Title 3', description: 'Description 2', date: '2023-12-16', img: 'https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg' },
      ]
    };
  },
  mounted() {

  },
  components: {
    banner, tophotel, toprating,
    blog
  },
  methods: {
    goBlog()
    {
      this.$router.push('/blog')
    }
  },
};
</script>

  