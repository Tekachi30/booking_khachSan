<template>
    <div class="min-h-screen py-20 bg-gradient-to-r from-indigo-100 via-blue-300 to-blue-200">
      <div class="container mx-auto">
  
        <div class="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          <div class="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 drop-shadow-2xl">
            <img src="https://thanhnien.mediacdn.vn/uploaded/dieutrang.qc/2021_07_01/flc/flcgrandhotelsamson_HVNP.jpg?width=500" alt="" class="w-full h-full object-cover">
          </div>
  
          <div class="w-full lg:w-1/2 py-16 px-12">
            <h2 class="text-3xl mb-4">Đăng nhập</h2>
            <p class="mb-4">
              Chào mừng bạn đến với chúng tôi !
            </p>
  
            <!--bắt đầu account
            + v-model: account đại diện cho account người dùng
            + @focus => checkaccountError cho phép bật tắc check lỗi input account
            + 2 if là 1 cái check rỗng và else if check định dạng account 
            : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            -->
            <div class="mt-5">
              <input type="text" placeholder="Tài khoản"
                class="px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none w-full"
                v-model="account"  />
              <p class="text-red-500 text-sm ml-1" v-if="!account && accountFocused">Tài khoản bị trống.</p>   
            </div>
            <!--kết thúc account-->
  
            <!--bắt đầu password
            + v-model : password đại diện cho mật khẩu người dùng.
            + @focus -> checkpasswordError cho phép bật tắt check lỗi password
            + 4 if là check rỗng, check độ dài tối thiểu 8 kí tự , check kí tự đặc biệt, check chữ cái hoa
            -->
            <div class="mt-5">
              <input type="password" placeholder="Mật khẩu"
                class="px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none w-full"
                v-model="password"  />
                <!-- <span
                  class="absolute inset-y-0 right-0 flex items-center pr-3"
                  @click="togglePasswordVisibility()"
                >
                  <i
                    class="fa"
                    :class="[showPassword ? 'fa-eye' : 'fa-eye-slash']"
                    aria-hidden="true"
                  ></i> 
                </span> -->
            </div>
            <p class="text-red-500 text-sm ml-1" v-if="!password && passwordFocused">Mật khẩu bị trống.</p>

            <!--kết thúc password -->
  
            <div class="mt-5">
              <!--button login-->
              <button class="w-full block bg-gradient-to-r from-indigo-500 via-blue-500 to-blue-500 text-white font-semibold rounded-lg
                    px-4 py-3 mt-6" @click="login">Đăng nhập</button>
            </div>
  
            <!--chuyển qua đăng kí-->
            <p class="mt-8">
              Bạn chưa có tài khoản ?
              <router-link to="/register" class="text-blue-500 hover:text-blue-700 font-semibold">
                Đăng ký tài khoản
              </router-link><br>
              <router-link to="/" class="text-blue-500 hover:text-blue-700 font-semibold transition duration-300">
                Về trang chủ
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  
    <!--component toast thông báo !!!-->
  <toast ref="toast"></toast>
  </template>
  
  <script>
  // import service xử lý đăng nhập đăng nhập
  // import authService from '../plugins/autService';
  // import toast component
  import toast from '../components/toast.vue'
  export default {
    data() {
      return {
        account: '', password: '', type: '',
        user: '',
        accountFocused: false, passwordFocused: false,showPassword: false
      };
    },
    components:
    {
      toast,
    },
  
    methods: {
      // xử lý các focus bật tắt validate
      
      // hàm đăng nhập
      async login() {
  
          this.accountFocused = true
          this.passwordFocused = true
          // kiểm tra thành công thực hiện đăng nhập
          if(this.account && this.password)
          {
            //api login
            const result = await this.$axios.post('user/login',
            {
              "account": this.account,
              "password": this.password
            });
            if (result.status == 200) {
              this.accountFocused = false
              this.passwordFocused = false
              // xử lý 1 biến lưu trữ local storage
              const data = result.data;
              localStorage.setItem("User", JSON.stringify(data));
              // Chuyển hướng đến trang dashboard.
              this.$router.push('/');
            }else {
              this.$refs.toast.showToast(result.data.message);
            }
            
          }
      },
      togglePasswordVisibility(){
          if (this.showPassword == false) {
          this.showPassword = !this.showPassword;
          this.type = "text";
        } else {
          this.showPassword = !this.showPassword;
          this.type = "password";
        }
      }
  
      // các re ràng buộc
      // validaccount(account) {
      //   var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      //   return re.test(account);
      // },
      // validaccount(account) {
      //   const re = /^[a-zA-Z0-9]+$/;
      //   return re.test(account);
      // },
      // validPassword2(password) {
      //   const re = /[A-Z]/;
      //   return re.test(password);
      // },
  
    },
  };
  </script>