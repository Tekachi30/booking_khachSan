<template>
    <div class="min-h-screen py-4 bg-gradient-to-r from-indigo-100 via-blue-300 to-blue-200">
      <div class="container mx-auto">
        <div class="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          <div class="w-full py-16 px-12">
            <h2 class="text-3xl mb-4">Đăng ký</h2>
            <p class="mb-4">Chào mừng bạn đến với của chúng tôi !</p>

            <div class="mt-5">
              <input type="text" placeholder="Tài khoản"
                class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                v-model="account" />
            </div>
            <p class="text-red-500 text-sm ml-1" v-if="!account && accountFocused">Tài khoản bị trống.</p>
            <p class="text-red-500 text-sm ml-1"
              v-else-if="validAccount(account) && accountFocused">Tài khoản không được để dấu hoặc khoảng cách.</p>
  
            <!--bắt đầu fullname
            + v-model : fullname đại diện cho tên người dùng
            + @focus -> checkfullnameError cho phép bật tắt việc check lỗi input fullname
            + 2 if là check rỗng và độ dài fullname nhập vào input
            -->
  
            <div class="mt-5">
              <input type="text" placeholder="Họ và tên"
                class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                v-model="fullname" />
            </div>
            <p class="text-red-500 text-sm ml-1" v-if="!fullname && fullnameFocused">Tên người dùng bị trống.</p>
            <p class="text-red-500 text-sm ml-1"
              v-else-if="!validFullName(fullname) && fullnameFocused">Tên người dùng phải từ 3 tới 50 ký tự</p>
  
            <!--kết thúc fullname-->
  
            <!--bắt đầu phone
            + v-model : phone đại diện cho số điện thoại người dùng
            + @focus -> checkphoneError cho phép bật tắt việc check lỗi input phone
            + 2 if : 1 là check rỗng, 2 là check định dạng phone /^(0[1-9]|84[2-9])(\d{8})$/
            -->
            <div class="mt-5">
              <input type="text" placeholder="Số điện thoại"
                class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                v-model="phone" />
            </div>
            <p class="text-red-500 text-sm ml-1" v-if="!phone && phoneFocused">Số điện thoại bị trống.</p>
            <p class="text-red-500 text-sm ml-1" v-else-if="!validPhone(phone) && phoneFocused">Số điện thoại sai định dạng.
            </p>
  
            <!--kết thúc phone-->
  
            <!--bắt đầu email
            + v-model: email đại diện cho email người dùng
            + @focus => checkemailError cho phép bật tắc check lỗi input email
            + 2 if là 1 cái check rỗng và else if check định dạng email 
            : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            -->
            <div class="mt-5">
              <input type="text" placeholder="Email"
                class="px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none w-full"
                v-model="email" />
              <p class="text-red-500 text-sm ml-1" v-if="!email && emailFocused">Email bị trống.</p>
              <p class="text-red-500 text-sm ml-1" v-else-if="!validEmail(email) && emailFocused">Email sai định dạng.</p>
            </div>
  
            <!--kết thúc email-->
  
            <!--bắt đầu password
            + v-model : password đại diện cho mật khẩu người dùng.
            + @focus -> checkpasswordError cho phép bật tắt check lỗi password
            + 4 if là check rỗng, check độ dài tối thiểu 8 kí tự , check kí tự đặc biệt, check chữ cái hoa
            -->
            <div class="mt-5">
              <input type="password" placeholder="Mật khẩu"
                class="px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none w-full"
                v-model="password" />
            </div>
            <p class="text-red-500 text-sm ml-1" v-if="!password && passwordFocused">Mật khẩu bị trống.</p>
            <p class="text-red-500 text-sm ml-1" v-else-if="password.length <= 7 && passwordFocused">Mật khẩu có tối thiểu 8
              kí tự</p>
            <p class="text-red-500 text-sm ml-1" v-else-if="!validPassword(password) && passwordFocused">Mật khẩu chứa kí tự
              đặc biệt " ~ / ) [ * ^ $ .... "</p>
            <p class="text-red-500 text-sm ml-1" v-else-if="!validPassword2(password) && passwordFocused">Mật khẩu có tối
              thiểu 1 chữ cái hoa</p>
            <!--kết thúc password -->
  
            <!--bắt đầu địa chỉ -->
  
            <!-- địa chỉ cụ thể:
            + @focus -> checkaddressError() bật tắt chế độ kiểm tra
            + v-model : address đại diện địa chỉ cụ thể
            + 1 if kiểm tra rỗng và độ dài <= 10
            -->
            <div class="mt-5">
              <input type="text" placeholder="Địa chỉ cụ thể:"
                class="px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none w-full"
                v-model="address" />
            </div>
  
            <p class="text-red-500 text-sm ml-1" v-if="!address && addressFocusted">Địa chỉ cụ thể bị trống.</p>
            <p class="text-red-500 text-sm ml-1" v-else-if="!validAddress(address) && addressFocusted">Địa chỉ tối đa 10 kí tự.</p>
  
            <!--kết thúc địa chỉ-->
  
          
            <div class="mt-5">
             
  
              <!-- button gọi method register-->
              <button
                class="w-full block bg-gradient-to-r from-indigo-500 via-blue-500 to-blue-500 text-white font-semibold rounded-lg px-4 py-3 mt-6"
                @click="register">
                Đăng ký
              </button>
            </div>
  
            <!-- chuyển sang login form-->
            <p class="mt-8">
              Bạn đã có tài khoản ?
              <router-link to="/login" class="from-indigo-500 via-blue-500 to-blue-500 font-semibold">
                Đăng nhập
              </router-link>
            </p>
  
          </div>
        </div>
      </div>
    </div>
    <!--component toast thông báo !!!-->
  
  </template>
  
  <script>

  export default {
    data() {
      return {
        /* dữ liệu tạo ra để lưu trữ thông tin người dùng nhập vào*/
        account: "", fullname: "", address: "", address: "", sex: "", phone: "", city_id: "", password: "", email: "",
  
        /* dữ liệu tạo ra để lưu trữ thông tin các api*/
        citys: [], districts: [], communes: [],
  
        /* các biển kiểm tra bật tắt focus để validate form*/
        fullnameFocused: false, emailFocused: false, passwordFocused: false, 
        addressFocusted: false, phoneFocused: false, 

      };
    },
  
    mounted() {
      
    },
    components: {
     
    },
    methods: {
      // xử lý các focus bật tắt validate
 
      //hàm đăng kí
      async register() {
        // bật hết các focus validate
        this.fullnameFocused = true, this.emailFocused = true,
          this.passwordFocused = true, 
          this.addressFocusted = true, this.phoneFocused = true
  
        //gọi lại hàm đăng kí từ authService
        if (this.account && !this.validAccount(this.account) && this.validEmail(this.email) && this.validPassword(this.password) && this.validPhone(this.phone) &&  this.validPassword2(this.password) 
        && this.address && this.fullname && this.validFullName(this.fullname) && this.validAddress(this.address)) {
          const result = await this.$axios.post('user/register',{
                account: this.account,
                fullname: this.fullname,
                address: this.address,
                sex: this.sex,
                phone: this.phone,
                password: this.password,
                email: this.email
          });
            
            if (result.status == 200) {
              this.fullnameFocused = false, this.emailFocused = false,
              this.passwordFocused = false, this.cityFocused = false,  this.addressFocusted = false, this.phoneFocused = false
              alert(result.data.message);
              // Chuyển hướng đến trang đăng nhập.
              this.$router.push('/login')
          }
        }else
          {
            // bật hết các focus validate
            this.fullnameFocused = true, this.emailFocused = true,
              this.passwordFocused = true, 
             this.addressFocusted = true, this.phoneFocused = true
          }},

      // các re ràng buộc
      validAccount(account) {
        const re = /[^a-zA-Z0-9]|[\s]/;
        return re.test(account);
      },
      validEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      },
      validPhone(phone) {
        const re = /^(0[1-9]|84[2-9])(\d{8})$/;
        return re.test(phone);
      },
      validPassword(password) {
        const re = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        return re.test(password);
      },
       validFullName(fullName) {
        const re = /^.{3,50}$/; // Kiểm tra chuỗi từ 10 đến 50 ký tự
    return re.test(fullName);
  },
    validPassword2(password) {
        const re = /[A-Z]/;
        return re.test(password);
      },
      validAddress(address)
      {
        const re = /^.{1,10}$/; 
        return re.test(address);
      }
  
    },
  };
  </script>