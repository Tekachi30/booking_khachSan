<template>
  <!--navbar-->
  <nav class="bg-white border-gray-200 fixed top-0 w-full  z-30">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-around mx-auto p-4">
      <!-- Your logo and brand -->
      <router-link to="/" class="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
        <img
          src="https://media.discordapp.net/attachments/1182223621494669332/1184871690874920970/404vivu-removebg-preview.png?ex=658d8cc0&is=657b17c0&hm=4ef0205d8b3839c75fc6e9c5bd1704a6017b145d774f798597fa205b708b672a&=&format=webp&quality=lossless"
          style="height: 70px;" alt="Flowbite Logo" />
        <span class="self-center text-2xl font-bold whitespace-nowrap dark:text-white">404ViVu</span>
      </router-link>
      <!-- Desktop menu center -->
      <div class="hidden md:flex md:w-auto" id="navbar-default">
        <ul class="font-medium flex flex-col md:flex-row md:space-x-8 rtl:space-x-reverse">
          <li class="cursor-pointer">
            <router-link to="/" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
              aria-current="page">Trang chủ</router-link>
          </li>
          <li class="cursor-pointer">
            <router-link to="/hotels"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Tìm
              khách sạn</router-link>
          </li>
          <li class="cursor-pointer">
            <router-link to="/blog"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Blogs</router-link>
          </li>
        </ul>
      </div>
      <!-- Destop menu right-->

      <div class="hidden md:flex md:w-auto" id="navbar-default">
        <ul class="font-medium flex flex-col md:flex-row md:space-x-4 rtl:space-x-reverse items-center">
          <router-link to="/contact"><button type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Liên
              hệ</button></router-link>

              <a @click="checkLogin()" class="w-10 h-10 overflow-hidden bg-gray-100 rounded-full relative cursor-pointer">
                <svg class=" absolute w-12 h-12 text-gray-400 -left-1 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
              </a>
        </ul>
      </div>

      <!-- Mobile menu button -->
      <button @click="toggleMobileMenu" type="button"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>

      <!-- Mobile menu -->
      <div v-if="isMobileMenuOpen" class="w-full md:hidden" id="navbar-default">
        <ul
          class="font-medium flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
           <li class="cursor-pointer">
            <a class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
              aria-current="page">Trang chủ</a>
          </li>
           <li class="cursor-pointer">
            <a
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Tìm
              khách sạn</a>
          </li>
           <li class="cursor-pointer">
            <a
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Blogs</a>
          </li>
        </ul>
      </div>


    </div>
  </nav>


</template>

<script>

export default {
  data() {
    return {
      isMobileMenuOpen: false, user: '',
    };
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("User"));
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },

    // // lấy thông tin của chính user đã đăng nhập trên local storage
    // getToken() {
    //   let user = JSON.parse(localStorage.getItem("User"));
    //   return user;
    // },

    checkLogin() {
      if(this.user){
        this.$router.push('/information');
      }else{
        this.$router.push('/login');
      }
    },
  },
};
</script>
