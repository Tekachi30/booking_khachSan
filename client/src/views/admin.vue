<template>
  <div class="flex h-screen">
    <!--sidebar-->
    <div class="flex">
      <!-- Backdrop -->
      <div :class="isOpen ? 'block' : 'hidden'"
        class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden" @click="isOpen = false" />
      <!-- End Backdrop -->

      <div :class="isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
        class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-100 lg:translate-x-0 lg:static lg:inset-0">
        <div class="flex items-center justify-center mt-8">
          <div class="flex items-center">

            <span class="mx-2 text-2xl font-semibold ">Trang quản lý</span>
          </div>
        </div>

        <nav class="mt-10">
          <!--thống kê-->
          <router-link to="/admin/" class="flex items-center px-6 py-2 mt-4 duration-200 bg-white rounded-sm">
            <svg class="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 10C2 5.58172 5.58172 2 10 2V10H18C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10Z"
                fill="currentColor" />
              <path d="M12 2.25195C14.8113 2.97552 17.0245 5.18877 17.748 8.00004H12V2.25195Z" fill="currentColor" />
            </svg>

            <span class="mx-4">Dashboard</span>
          </router-link>

          <!--khách hàng-->
          <router-link to="/admin/user" class="flex items-center px-6 py-2 mt-4 duration-200 bg-white rounded-sm">
            <svg class="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 10C2 5.58172 5.58172 2 10 2V10H18C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10Z"
                fill="currentColor" />
              <path d="M12 2.25195C14.8113 2.97552 17.0245 5.18877 17.748 8.00004H12V2.25195Z" fill="currentColor" />
            </svg>

            <span class="mx-4">Quản lý khách hàng</span>
          </router-link>

          <!--chủ khách sạn-->
          <router-link to="/admin/owners" class="flex items-center px-6 py-2 mt-4 duration-200 bg-white rounded-sm">
            <svg class="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 10C2 5.58172 5.58172 2 10 2V10H18C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10Z"
                fill="currentColor" />
              <path d="M12 2.25195C14.8113 2.97552 17.0245 5.18877 17.748 8.00004H12V2.25195Z" fill="currentColor" />
            </svg>

            <span class="mx-4">Quản lý chủ khách sạn</span>
          </router-link>

          <!--đánh giá-->
          <router-link to="/admin/ratings" class="flex items-center px-6 py-2 mt-4 duration-200 bg-white rounded-sm">
            <svg class="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 10C2 5.58172 5.58172 2 10 2V10H18C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10Z"
                fill="currentColor" />
              <path d="M12 2.25195C14.8113 2.97552 17.0245 5.18877 17.748 8.00004H12V2.25195Z" fill="currentColor" />
            </svg>

            <span class="mx-4">Quản lý đánh giá</span>
          </router-link>

          <!--báo cáo-->
          <router-link to="/admin/report" class="flex items-center px-6 py-2 mt-4 duration-200 bg-white rounded-sm">
            <svg class="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 10C2 5.58172 5.58172 2 10 2V10H18C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10Z"
                fill="currentColor" />
              <path d="M12 2.25195C14.8113 2.97552 17.0245 5.18877 17.748 8.00004H12V2.25195Z" fill="currentColor" />
            </svg>

            <span class="mx-4">Quản lý báo cáo</span>
          </router-link>

          <!--banner-->
          <router-link to="/admin/banner" class="flex items-center px-6 py-2 mt-4 duration-200 bg-white rounded-sm">
            <svg class="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 10C2 5.58172 5.58172 2 10 2V10H18C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10Z"
                fill="currentColor" />
              <path d="M12 2.25195C14.8113 2.97552 17.0245 5.18877 17.748 8.00004H12V2.25195Z" fill="currentColor" />
            </svg>

            <span class="mx-4">Quản lý banner</span>
          </router-link>
        </nav>
      </div>
    </div>

    <div class="flex-1 flex flex-col overflow-hidden">
      <!--header - top navbar-->
      <header class="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-gray-300">
        <!-- buttom responsive thanh search-->
        <div class="flex items-center">
          <!--button responsive-->
          <!-- <button class="text-gray-500 focus:outline-none lg:hidden" @click="isOpen = true">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button> -->

          <!--thanh search-->
          <!-- <div class="relative mx-4 lg:mx-0">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg class="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>

            <input
              class="w-32 pl-10 pr-4 text-indigo-600 border-gray-200 rounded-md sm:w-64 focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
              type="text" placeholder="Search" />
          </div> -->
        </div>

        <!--bên phải header-->
        <div class="flex items-center">
          <div class="relative">
            <button class="relative z-10 block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none"
              @click="openDropdown()">
              <img class="object-cover w-full h-full"
                src="https://media.discordapp.net/attachments/1137648162677456956/1143370950683930675/IMG_20230822_092740.jpg?ex=6540662d&is=652df12d&hm=fd7f5849fd2a34063a702249a2780ce1a02b5eb51cc66e27bb0ecdd77d18bc42&=&width=498&height=498"
                alt="Your avatar" />
            </button>

            <div v-show="dropdownOpen" class="fixed z-20 w-full h-full" />

            <!-- <transition enter-active-class="transition duration-150 ease-out transform"
              enter-from-class="scale-95 opacity-0" enter-to-class="scale-100 opacity-100"
              leave-active-class="transition duration-150 ease-in transform" leave-from-class="scale-100 opacity-100"
              leave-to-class="scale-95 opacity-0">
              <div v-show="dropdownOpen" class="absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl">
                <a to="/" class="block px-4 py-2 transition duration-100 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed text-white bg-red-500 border border-transparent rounded shadow-sm hover:bg-red-600">
                  Đăng xuất
                </a>
              </div>
            </transition> -->

            <transition
              enter-active-class="transition duration-150 ease-out transform"
              enter-from-class="scale-95 opacity-0"
              enter-to-class="scale-100 opacity-100"
              leave-active-class="transition duration-150 ease-in transform"
              leave-from-class="scale-100 opacity-100"
              leave-to-class="scale-95 opacity-0"
>           
              <button
                v-show="dropdownOpen"
                @click="logout()"
                class="absolute right-0 z-20 w-48 mt-2 bg-white px-4 py-2 transition duration-100 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed text-blac border border-transparent rounded shadow-sm hover:bg-red-600"
              >
                Đăng xuất
              </button>
            </transition>

          </div>
        </div>
      </header>

      <!--view nằm đây-->
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 ">
        <div class="container mx-auto px-6 py-8">
          <!--router view-->
          <router-view />
        </div>
      </main>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show_menu: false,
      dropdownOpen: false,
      isOpen: false
    };
  },
  mounted() {
    const admin = this.getToken()
    if(!admin)
    {
      this.$router.push('/login_admin')
    }

  },
  components: {},
  methods: {
    getToken() {
      let admin = JSON.parse(localStorage.getItem("admin"));
      return admin;
    },
    open_menu() {
      this.show_menu = !this.show_menu;
    },
    openDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    logout() {
      // Xóa thông tin admin từ localStorage
      localStorage.removeItem("admin");
      this.$router.push('/login_admin')
    },
  },
};
</script>
