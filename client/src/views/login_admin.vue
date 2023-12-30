<template>
  <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
    <div class="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
      <div class="flex items-center justify-center">

        <span class="text-2xl font-semibold text-gray-700">Trang quản lý</span>
      </div>

      <div class="mt-4">
        <label class="block">
          <span class="text-sm text-gray-700">Tên tài khoản</span>
          <input v-model="account" type="text"
            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500" />
        </label>

        <label class="block mt-3">
          <span class="text-sm text-gray-700">Mật khẩu</span>
          <div class="relative">
            <input v-model="password" type="password" v-bind:type="[showPassword ? 'text' : 'password']"
            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500" />
            <span class="absolute inset-y-0 right-0 flex items-center pr-3" @click="showPassword = !showPassword">
                    <i class="fa" :class="[showPassword ? 'fa-eye' : 'fa-eye-slash']" aria-hidden="true"></i>
            </span>
          </div>
          
        </label>


        <div class="mt-6">
          <button @click="login()"
            class="w-full px-4 py-2 text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500">
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  </div>
  <!--component toast thông báo !!!-->
  <toast ref="toast"></toast>
</template>
<script>
import toast from '../components/toast.vue';
export default {
  data() {
    return {
      showPassword: false,
      account: '',
      password: ''
    };
  },
  components: {
    toast,
  },
  methods: {
    async login() {
      try {
        // Kiểm tra xem các thông tin có được nhập đầy đủ không
        if (!this.account || !this.password) {
                // alert("Vui lòng nhập đầy đủ thông tin.")
                this.$refs.toast.showToast("Vui lòng nhập đầy đủ thông tin.");
                return;
        }else{
            const result = await this.$axios.post('admin/login',
              {
                "account": this.account,
                "password": this.password
              });
            if (result.status == 200) {
              // xử lý 1 biến lưu trữ local storage
              const data = result.data;
              localStorage.setItem("admin", JSON.stringify(data));
              // Chuyển hướng đến trang dashboard.
              this.$router.push('/admin')
            }
            else {
              // alert(result.data.message)
              this.$refs.toast.showToast(result.data.message);
            }
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
};
</script>
