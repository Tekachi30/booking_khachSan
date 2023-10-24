<template>
    <nav class="bg-white">
  <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    <div class="relative flex h-16 items-center justify-between">
      <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <!-- Mobile menu button-->
        <button @click="openNav" type="button" class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
          <span class="absolute -inset-0.5"></span>
          <span class="sr-only">Open main menu</span>
          <!--
            Icon when menu is closed.

            Menu open: "hidden", Menu closed: "block"
          -->
          <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <!--
            Icon when menu is open.

            Menu open: "block", Menu closed: "hidden"
          -->
          <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

      </div>
      <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        <!--logo-->
        <div class="flex flex-shrink-0 items-center font-bold">
          BOOKING
        </div>
        <div class="hidden sm:ml-6 sm:block">
          <div class="flex space-x-4">
            <router-link to="/owner/hotel" class="hover:text-primary block transition dark:hover:text-white md:px-4">QL khách sạn</router-link>
            <router-link to="/owner/room" class="hover:text-primary block transition dark:hover:text-white md:px-4">QL phòng</router-link>
            <router-link to="/owner/cart" class="hover:text-primary block transition dark:hover:text-white md:px-4">Hóa đơn</router-link>
            <router-link to="/owner/rating" class="hover:text-primary block transition dark:hover:text-white md:px-4">Đánh giá</router-link>
            <router-link to="/owner/chat" class=" hover:text-primary block transition dark:hover:text-white md:px-4">Chat</router-link>
            <router-link to="/owner/coupon" class="hover:text-primary block transition dark:hover:text-white md:px-4">Coupon</router-link>
          </div>
        </div>
      </div>
      <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

        <!-- Profile dropdown -->
        <div class="relative ml-3">
          <div>
            <button @click="openProfile" type="button" class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
              <span class="absolute -inset-1.5"></span>
              <span class="sr-only">Open user menu</span>
              <img class="h-8 w-8 rounded-full" src="https://cdn.discordapp.com/attachments/1137648162677456956/1143370950683930675/IMG_20230822_092740.jpg?ex=6540662d&is=652df12d&hm=fd7f5849fd2a34063a702249a2780ce1a02b5eb51cc66e27bb0ecdd77d18bc42&" alt="">
            </button>
          </div>
          <div v-if="showProfile" class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
            <a class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Đăng xuất</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile menu, show/hide based on menu state. -->
  <div v-if="showNav" id="mobile-menu" class="sm:hidden">
    <div class="space-y-1 px-2 pb-3 pt-2">
      <router-link to="/owner/hotel" class="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium">QL khách sạn</router-link>
            <router-link to="/owner/room" class=" hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">QL phòng</router-link>
            <router-link to="/owner/cart" class=" hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Hóa đơn</router-link>
            <router-link to="/owner/rating" class=" hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Đánh giá</router-link>
            <router-link to="/owner/chat" class=" hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Chat</router-link>
            <router-link to="/owner/coupon" class=" hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Coupon</router-link>
    </div>
  </div>
</nav>
</template>

<script>


export default {
  data() {
    return {
      showProfile:false,
      showNav:false
    };
  },
  components: {
   
  },
  methods: {
    openProfile()
    {
        this.showProfile = !this.showProfile
    },
    openNav()
    {
        this.showNav = !this.showNav
    }
  },
};
</script>
