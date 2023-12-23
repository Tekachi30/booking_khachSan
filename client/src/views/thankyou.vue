<template>
  <div class="flex items-center justify-center h-screen">
    <div>
      <div class="flex flex-col items-center space-y-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="text-green-600 w-28 h-28" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 class="text-4xl font-bold">Thank You for purchase !</h1>
        <p>Cảm ơn khách hàng đã tin tưởng, chúc khách hàng một ngày nghỉ thật vui vẻ.</p>
        <a
          class="inline-flex items-center px-4 py-2 text-white bg-indigo-600 border border-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring"
          href="#"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          <router-link class="text-sm font-medium" to="/">Về trang chủ</router-link>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
  mounted() {

  },
  components: {},
  methods: {
    // Hàm thì viết ở đây
   
  },
};
</script>