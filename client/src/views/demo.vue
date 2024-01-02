<template>
  <!-- component -->
  <section class="max-w-2xl px-6 py-8 mx-auto bg-gradient-to-r from-cyan-200 to-blue-100 dark:bg-gray-900 rounded-md shadow-xl">
    <header class="w-auto flex items-center justify-center h-7 sm:h-8 font-bold text-3xl">
      <a >
        404ViVu
      </a>
    </header>

    <main class="mt-8">
      <h2 class="mt-6 text-gray-700 dark:text-gray-200">Hi Tên,</h2>

      <p class="mt-2 leading-loose text-gray-600 dark:text-gray-300">
        Chân thành cảm ơn Quý khách hàng đã tin tưởng và lựa chọn dịch vụ của chúng tôi thông qua trang web. Chúng tôi
        trân trọng sự ủng hộ của Quý khách, và sẽ luôn nỗ lực để mang đến trải nghiệm tốt nhất cho chuyến đi của bạn.
        <br>
        Đội ngũ chúng tôi hiểu rằng sự thoải mái và tiện nghi là yếu tố quan trọng trong mỗi chuyến đi của Quý khách.
        Chúng tôi cam kết cung cấp dịch vụ chất lượng, đảm bảo mọi chi tiết được chăm sóc và phục vụ tận tâm.
        <br>
        Nếu có bất kỳ nhu cầu hoặc yêu cầu đặc biệt nào, xin vui lòng liên hệ với chúng tôi. Chúng tôi sẽ cố gắng hết sức
        để đáp ứng mọi mong muốn của Quý khách.
        <br>
        Một lần nữa, chân thành cảm ơn sự lựa chọn của Quý khách hàng. Chúng tôi rất mong được phục vụ Quý khách và hy
        vọng rằng chuyến đi của bạn sẽ trở nên đặc biệt và nhớ mãi.
      </p>

      <img  class="w-full h-64 my-10 rounded-lg md:h-80" src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2020/4/17/799236/KHACH-SAN.jpg" alt="">

      <p class="mt-2 text-gray-600 dark:text-gray-300">
        Trân thành cảm ơn, <br>
        404Vivu
      </p>
    </main>


    <footer class="mt-8 text-center">
      <h3 class="font-medium text-gray-800 dark:text-white">404ViVu đi cùng bạn đến khắp nơi</h3>

      <p class="mt-3 text-gray-500 dark:text-gray-400">© 2023 404ViVu.</p>
    </footer>
  </section>
</template>

<script>

export default {
  data() {
    return {
      count: 0
    };
  },
  mounted() {
    this.count++
  },
  methods: {

  },
};
</script>