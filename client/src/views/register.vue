<template>
  <div class="container mx-auto p-4 bg-white">
    <div class="w-full md:w-1/2 lg:w-1/3 mx-auto my-12">
      <h1 class="text-lg font-bold">ĐĂNG KÝ TÀi KHOẢN</h1>
      <div class="flex flex-col mt-4">
        <div>
          <label
            for="account"
            class="block mt-4 text-sm font-medium text-gray-900 dark:text-white"
            >Tài khoản</label
          >
          <input
            v-model="account"
            type="text"
            name="account"
            class="px-4 py-3 w-full rounded-md mb-2 bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            placeholder="Nhập Tài khoản"
            required
          />
        </div>

        <div>
          <label
            for="fullname"
            class="block mt-4 text-sm font-medium text-gray-900 dark:text-white"
            >Họ và tên</label
          >
          <input
            v-model="fullname"
            type="text"
            name="fullname"
            class="px-4 py-3 w-full rounded-md mb-2 bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            placeholder="Nhập họ và tên"
            required
          />
        </div>

        <div>
          <label
            for="name"
            class="block mt-4 text-sm font-medium text-gray-900 dark:text-white"
            >Email</label
          >
          <input
            v-model="email"
            type="text"
            name="fullname"
            class="px-4 py-3 mt-4 w-full rounded-md mb-2 bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            placeholder="Nhập email"
          />
        </div>

        <div>
          <label
            for="name"
            class="block mt-4 text-sm font-medium text-gray-900 dark:text-white"
            >Email</label
          >
          <input
            v-model="email"
            type="email"
            name="email"
            class="px-4 py-3 mt-4 w-full rounded-md mb-2 bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            placeholder="Nhập email"
          />
        </div>

        <div> 
          <label
            for="name"
            class="block mt-4 text-sm font-medium text-gray-900 dark:text-white"
            >Mật khẩu</label
          >

          <div class="relative">
              <input
              v-model="password"
              v-bind:type="[showPassword ? 'text' : 'password']"
              type="password"
              name="password"
              class="px-4 py-3 mt-4 w-full rounded-md mb-2 bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
              placeholder="Nhập mật khẩu"
              required
            />
              <span class="absolute inset-y-0 right-0 flex items-center pr-3" @click="showPassword = !showPassword">
                    <i class="fa" :class="[showPassword ? 'fa-eye' : 'fa-eye-slash']" aria-hidden="true"></i>
              </span>
          </div>          
        </div>


        <div>
          <label
            for="name"
            class="block mt-4 text-sm font-medium text-gray-900 dark:text-white"
            >Giới tính</label
          >
          <select
            type="text"
            v-model="sex"
            class="px-4 py-3 mt-4 w-full rounded-md mb-2 bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
          >
            <option disabled></option>
            <option value="NAM">Nam</option>
            <option value="NỮ">Nữ</option>
            <option value="LGBT">LGBT</option>
          </select>
        </div>

        <div>
          <label
            for="name"
            class="block mt-4 text-sm font-medium text-gray-900 dark:text-white"
            >Số điện thoại</label
          >
          <input
            v-model="phone"
            type="telephone"
            name="phone"
            class="px-4 py-3 mt-4 w-full rounded-md mb-2 bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" 
            placeholder="Nhập số điện thoại"
          />
        </div>

        <div>
          <label
            for="name"
            class="block mt-4 text-sm font-medium text-gray-900 dark:text-white"
            >Địa chỉ</label
          >
          <input
            v-model="address"
            type="text"
            name="address"
            class="px-4 py-3 mt-4 w-full rounded-md mb-2 bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            placeholder="Nhập địa chỉ"
          />
        </div>

        <button
          type="submit" @click="register()"
          class="mt-4 px-4 py-3 leading-6 text-base rounded-md border border-transparent bg-blue-500 text-blue-100 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex w-full justify-center items-center font-medium focus:outline-none"
        >
          Đăng ký
        </button>
        <div class="flex flex-col items-center mt-5">
          <p class="mt-1 text-xs font-light text-gray-500">
            Đã có tài khoản?<router-link
              class="ml-1 font-medium text-blue-400"
              to="/login"
              >Đăng nhập tại đây.</router-link
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "", fullname: "", email: "", phone: "", password: "", sex: "",  address: "",
      showPassword: false,
    };
  },
  methods: {
    async register(){
      try {
        
      } catch (error) {
        console.log(error);
      }
    }
  },
};
</script>
