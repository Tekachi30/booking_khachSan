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
          <p v-if="!account && account_forcus" style="color: darkred; font-weight: bold;">Chưa nhập tài khoản!</p>
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
          <p v-if="!fullname && fullname_forcus" style="color: darkred; font-weight: bold;">Chưa nhập họ tên!</p>
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
            class="px-4 py-3 w-full rounded-md mb-2 bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            placeholder="Nhập email"
            required
          />
          <p v-if="!email && email_forcus" style="color: darkred; font-weight: bold;">Chưa nhập email!</p>
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
              class="px-4 py-3 w-full rounded-md mb-2 bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
              placeholder="Nhập mật khẩu"
              required
            />
              <span class="absolute inset-y-0 right-0 flex items-center pr-3" @click="showPassword = !showPassword">
                    <i class="fa" :class="[showPassword ? 'fa-eye' : 'fa-eye-slash']" aria-hidden="true"></i>
              </span>
              <p v-if="!password && password_forcus" style="color: darkred; font-weight: bold;">Chưa nhập mật khẩu!</p>
              <p v-if="!validPassword(password) && password_forcus" style="color: darkred; font-weight: bold;">Mật khẩu phải có 1 ký tự đặt biệt!</p>
              <p v-if="!validPassword2(password) && password_forcus" style="color: darkred; font-weight: bold;">Mật khẩu phải có 1 chữ cái viết hoa!</p>
          </div>      
        </div>


        <div>
          <label
            for="sex"
            class="block mt-4 text-sm font-medium text-gray-900 dark:text-white"
            >Giới tính</label
          >
          <select
            type="text"
            v-model="sex"
            class="px-4 py-3 w-full rounded-md mb-2 bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
          >
            <option disabled></option>
            <option value="NAM">Nam</option>
            <option value="NỮ">Nữ</option>
            <option value="LGBT">LGBT</option>
          </select>
          <p v-if="!sex && sex_forcus" style="color: darkred; font-weight: bold;">Chưa chọn giới tính!</p>
        </div>

        <div>
          <label
            for="phone"
            class="block mt-4 text-sm font-medium text-gray-900 dark:text-white"
            >Số điện thoại</label
          >
          <input
            v-model="phone"
            type="tel"
            name="phone"
            class="px-4 py-3 w-full rounded-md mb-2 bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" 
            placeholder="Nhập số điện thoại"
          />
          <p v-if="!phone && phone_forcus" style="color: darkred; font-weight: bold;">Chưa nhập số điện thoại!</p>
          <p v-if="!validatePhone(phone) && phone_forcus" style="color: darkred; font-weight: bold;">Chỉ được nhập số!</p>

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
            class="px-4 py-3 w-full rounded-md mb-2 bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            placeholder="Nhập địa chỉ"
          />
          <p v-if="!address && address_forcus" style="color: darkred; font-weight: bold;">Chưa nhập địa chỉ!</p>
        </div>

        <button
          type="button" @click="register()"
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
      account: "", fullname: "", email: "", phone: "", password: "", sex: "",  address: "",
      showPassword: false,
      account_forcus: false, fullname_forcus: false, email_forcus: false, phone_forcus: false, sex_forcus: false, address_forcus: false,
    };
  },
  components: {},
  methods: {

    validAccount(account){
        const re = /[^a-zA-Z0-9]/; // kiểm tra có dấu hay không
        return re.test(account);
    },
    validatePhone(phone) {
      const re = /^[0-9]+$/; // Chỉ cho phép chứa số, không chứa chữ cái hoặc các ký tự khác
      return re.test(phone);
    },
    validPassword(password) {
      const re = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/; // kiểm tra có ký tự đặc biệt hay không
      return re.test(password);
    },
    validPassword2(password) {
      const re = /[A-Z]/; // kiểm tra có viết hoa hay không
      return re.test(password);
    },

    async register(){
      try {
        if ((!this.account && this.validAccount(this.account)) || !this.fullname || !this.address || (!this.phone && this.validatePhone(this.phone)) || (!this.password && this.validPassword(this.password) && this.validPassword2(this.password)) || !this.email) {
          this.account_forcus = true;
          this.fullname_forcus = true;
          this.address_forcus = true;
          this.sex_forcus = true;
          this.phone_forcus = true;
          this.password_forcus = true;
          this.email_forcus = true;
        }else{
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
              this.account_forcus = false;
              this.fullname_forcus = false;
              this.address_forcus = false;
              this.phone_forcus = false;
              this.password_forcus = false;
              this.email_forcus = false;
              alert(result.data.message);
              // Chuyển hướng đến trang đăng nhập.
              this.$router.push('/login')
          }else {
              alert(result.data.message);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
};
</script>
