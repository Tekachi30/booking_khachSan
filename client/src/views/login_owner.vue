<template>
  <div class="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
    <div
      class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800"
    >
      <div class="flex flex-col overflow-y-auto md:flex-row">
        <div class="h-32 md:h-auto md:w-1/2">
          <img
            aria-hidden="true"
            class="object-cover w-full h-full dark:hidden"
            src="../assets/img/a.jpg"
            alt="Owner"
          />
          <img
            aria-hidden="true"
            class="hidden object-cover w-full h-full dark:block"
            src="../assets/img/a.jpg"
            alt="Owner"
          />
        </div>
        <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
          <div class="w-full">
            <h1
              class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200"
            >
              Trang đăng nhập chủ khách sạn
            </h1>

            <label class="block">
              <span class="text-sm text-gray-700">Tên tài khoản</span>
              <input
                v-model="account"
                type="text"
                class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                placeholder="abcd"
              />
            </label>

            <label class="block mt-3">
              <span class="text-sm text-gray-700">Mật khẩu</span>
              <div class="relative">
                <input
                  v-model="password"
                  :type="type"
                  name="password"
                  class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  placeholder="*******"
                />
                <span
                  class="absolute inset-y-0 right-0 flex items-center pr-3"
                  @click="togglePasswordVisibility()"
                >
                  <i
                    class="fa"
                    :class="[showPassword ? 'fa-eye' : 'fa-eye-slash']"
                    aria-hidden="true"
                  ></i>
                </span>
              </div>
            </label>

            <!-- You should use a button here  -->
            <div class="mt-6">
              <button
                @click="login()"
                class="w-full px-4 py-2 text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500"
              >
                Đăng nhập
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--component toast thông báo !!!-->
  <toast ref="toast"></toast>
</template>

<script>
import toast from "../components/toast.vue";
export default {
  data() {
    return {
      showPassword: false,
      account: "",
      password: "",
      type: "password",
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
        } else {
          const result = await this.$axios.post("owner/login", {
            account: this.account,
            password: this.password,
          });
          if (result.status == 200) {
            // xử lý 1 biến lưu trữ local storage
            const data = result.data;
            localStorage.setItem("owner", JSON.stringify(data));
            // Chuyển hướng đến trang dashboard.
            this.$router.push("/owner");
          } else {
            this.$refs.toast.showToast(result.data.message);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    togglePasswordVisibility() {
      if (this.showPassword == false) {
        this.showPassword = !this.showPassword;
        this.type = "text";
      } else {
        this.showPassword = !this.showPassword;
        this.type = "password";
      }
    },
  },
};
</script>
