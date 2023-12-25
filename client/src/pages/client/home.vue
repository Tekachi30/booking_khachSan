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
        { id: 1, title: 'Phép Màu Giáng Sinh', description: 'Hãy cùng chúng tôi trải qua một hành trình qua xứ sở phép màu đông tuyết, nơi tuyết rơi như những điệu nhảy và tiếng cười vang lên, tạo nên một câu chuyện vui vẻ và hạnh phúc cho mọi người.', date: '2023-12-15', img: 'https://cdn.vn.alongwalk.info/wp-content/uploads/2023/01/12172322/image-99-hinh-nen-giang-sinh-dep-nhat-the-gioi-chat-luong-4k-cuc-dep-7d55f77e7f56a6f98018e5e757b2d0f8.jpg' },
        { id: 2, title: 'Niềm Vui Lễ Hội: Đại Tiệc Giáng Sinh', description: 'Trải nghiệm sức mạnh phép màu của mùa lễ, khi không khí Giáng Sinh tràn ngập niềm vui và ấm áp đọng lòng mọi người', date: '2023-12-16', img: 'https://images.careerbuilder.vn/content/images/anh-noel-careerbuilder-35.jpg' },
        { id: 3, title: 'Tuyết Rơi và Nụ Cười: Một Chuyện Giáng Sinh Hạnh Phúc', description: 'Đắm chìm trong tinh thần lễ hội với sự kiện Giáng Sinh đầy ấm cúng, với những truyền thống vui tươi, những bản nhạc noel phấn khích và niềm vui của việc tặng quà.', date: '2023-12-20', img: 'https://img.pikbest.com/origin/10/01/07/23EpIkbEsTiKA.jpg!w700wp' },
        { id: 4, title: 'Điệu Nhạc Chuông: Một Đại Tiệc Giáng Sinh', description: 'Hãy sẵn sàng "điệu nhạc chuông" vào mùa lễ với một sự kiện Giáng Sinh phong cách, đầy tiếng cười, tình yêu và tinh thần tặng quà.', date: '2023-12-22', img: 'https://i.pinimg.com/originals/bf/36/e7/bf36e787909f6030cb1c0ece02ffcf3e.jpg' },
        { id: 5, title: 'Giáng Sinh Ấm Áp: Những Chuyện Bên Lửa và Lời Chúc Tốt Đẹp', description: 'Thuận lợi bên lửa với chúng tôi để chia sẻ những câu chuyện Giáng Sinh ấm áp và gửi đi những lời chúc ấm lòng cho một mùa lễ đầy tình yêu, tiếng cười và những khoảnh khắc quý báu.', date: '2023-12-30', img: 'https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/01/hinh-nen-giang-sinh-2k.jpg?ssl=1' },
        { id: 6, title: 'Tính Cách Mùa Đông: Một Cuộc Phiêu Lưu Giáng Sinh Hạnh Phúc', description: 'Bắt đầu một cuộc phiêu lưu Giáng Sinh tinh tế, nơi không khí tràn đầy phép màu của mùa lễ, và mỗi khoảnh khắc là cơ hội để tạo ra những kí ức vĩnh cửu.', date: '2024-1-2', img: 'https://img.lovepik.com/photo/45003/7005.jpg_wh860.jpg' },
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

  