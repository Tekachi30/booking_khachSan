<template>

  <div class="max-w-screen-2xl mx-auto mt-[100px] h-full mb-[100px]">
    <div class="bg-gray-100">
      <div class="container mx-auto my-5 p-5 ">
        <div class="md:flex no-wrap md:-mx-2">
          <!-- Left Side -->
          <div class="w-full md:w-4/12 md:mx-2">
            <!-- Profile Card -->
            <div class="bg-white p-3 border-t-4 border-blue-400">
              <div class="image overflow-hidden">
                <img
                  class="h-auto w-full mx-auto"
                  src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                  alt=""
                />
              </div>
              <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">
                {{user.fullname}}
              </h1>
              <h3 class="text-gray-600 font-lg text-semibold leading-6">
                Thông tin cá nhân
              </h3>
              <!--thong tin ca nhan nam day-->
              <div class="text-gray-700 ">
                <div class="grid md:grid-cols-1 text-sm">
                
                <!-- Họ và tên -->
                <div class="grid grid-cols-2 mt-10">
                   <div class=" py-2 font-semibold">Họ và tên:</div>
                   <div class=" py-2">{{ user.fullname }}</div>
                  </div>
                <!-- Họ và tên -->
                <!-- <div class="grid grid-cols-2">
                   <div class="px-4 py-2 font-semibold">Họ và tên:</div>
                   <div class="px-4 py-2">{{user.fullname}}</div>
                </div> -->
                <!-- Giới tính -->
                <div class="grid grid-cols-2">
                   <div class=" py-2 font-semibold">Giới tính:</div>
                   <div class=" py-2">{{user.sex}}</div>
                </div>

                <div class="grid grid-cols-2">
                   <div class=" py-2 font-semibold">Địa chỉ:</div>
                   <div class=" py-2">{{user.address}}</div>
                </div>

                <div class="grid grid-cols-2">
                   <div class=" py-2 font-semibold">Số điện thoại:</div>
                   <div class=" py-2">{{user.phone}}</div>
                </div>

                <div class="grid grid-cols-2">
                   <div class=" py-2 font-semibold">Email:</div>
                   <div class=" py-2">{{user.email}}</div>
                </div>

                  <!--button-->
                  <button @click="openUpdate(); selectUser(user)"
                      class="bg-blue-600 flex justify-center font-medium text-dark border border-dark rounded-md py-3 px-6 hover:bg-dark  ease-in duration-200 mx-auto mt-5">
                    Cập nhập
                  </button>
                </div>
              </div>
            </div>
            <!-- End of profile card -->
          </div>
          <!-- Right Side -->
          <div class="w-full md:w-8/12 mx-2 h-64">
            <!-- Profile tab -->
              <!--views chính-->
              <div
                class="text-sm m-2 font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul class="flex flex-wrap">
                    <li class="mr-2 cursor-pointer ">
                        <a @click="activeCart"
                            :class="['inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300', { 'text-blue-600 border-blue-600 rounded-t-lg font-bold': activeTab === 'cart' }]"
                            class=" active inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Đơn hàng</a>
                    </li>

                    <li class="mr-2 cursor-pointer ">
                        <a @click="activeHotel"
                            :class="['inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300', { 'text-blue-600 border-blue-600 rounded-t-lg font-bold': activeTab === 'hotel' }]"
                            class=" active inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Yêu thích</a>
                    </li>
                </ul>
            </div>

            <div class="bg-white p-3 shadow-sm rounded-sm" v-if="isCart">
              <!-- title Section -->
              <div
                class="flex items-center space-x-2 font-semibold text-gray-900 leading-8"
              >
                <span class="tracking-wide">Đơn hàng</span>
              </div>
              <!--table đơn hàng-->
              <div class="overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-4 py-4">STT</th>
                            <th scope="col" class="px-4 py-3">Khách hàng</th>
                            <th scope="col" class="px-4 py-3">Trạng thái</th>
                            <th scope="col" class="px-4 py-3">Phương thức thanh toán</th>
                            <th scope="col" class="px-4 py-3">Tổng tiền</th>
                            <th scope="col" class="px-4 py-3">
                            </th>
                        </tr>
                    </thead>
                    <tbody v-for="(order, index) in orders.filter(item => item.status != 'Đã Đặt')" :key="index">
                        <tr class="border-b dark:border-gray-700">
                            <th scope="row"
                                class="px-4 py-3 font-medium  text-gray-900 whitespace-nowrap dark:text-black">{{ index +
                                    1 }}</th>
                            <td class="px-4 py-3">
                                {{ order.User.fullname }}
                            </td>
                            <td class="px-4 py-3"> {{ order.status }}</td>
                            <td class="px-4 py-3"> {{ order.provider }}</td>
                            <td class="px-4 py-3"> {{ formatCurrency(order.total_bank) }}</td>
                            
                            <!--action ?-->
                            <button @click="openDelete()" type="button"
                                class="flex w-full items-center py-3 px-4 hover:bg-gray-100 text-red-500">
                                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512" fill="red" style="margin-right: 5px;">
                                    <path d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/>
                                </svg>
                                Hủy đơn
                            </button>
                        </tr>
                    </tbody>
                </table>
              </div>
            </div>

            <div class="bg-white p-3 shadow-sm rounded-sm" v-if="isHotel">
              <!-- title Section -->
              <div
                class="flex items-center space-x-2 font-semibold text-gray-900 leading-8"
              >
                <span class="tracking-wide">Khách sạn yêu thích</span>
              </div>
              <!--table đơn hàng-->
              <div class="overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-4 py-4">STT</th>
                            <th scope="col" class="px-4 py-3">Khách sạn</th>
                            <th scope="col" class="px-4 py-3">
                            </th>
                        </tr>
                    </thead>
                    <tbody v-for="(hotel, index) in hotels.filter(item => item.id_user == this.user.id)" :key="index">
                        <tr class="border-b dark:border-gray-700">
                            <th scope="row"
                                class="px-4 py-3 font-medium  text-gray-900 whitespace-nowrap dark:text-black">{{ index +
                                    1 }}</th>
                            <td class="px-4 py-3 font-medium  text-gray-900 whitespace-nowrap dark:text-black">
                                {{ hotel.hotel.name_hotel }}
                            </td>
                            <!--action ?-->
                            <button @click="" type="button"
                                class="flex w-full items-center py-3 px-4 hover:bg-gray-100 text-red-500">
                                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512" fill="red" style="margin-right: 5px;">
                                    <path d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/>
                                </svg>
                                Hủy theo dõi
                            </button>
                        </tr>
                    </tbody>
                </table>
              </div>
            </div>
            <!-- End of about section -->
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Update Profile modal -->
  <div v-if="isUpdate" id="updateProfileModal"
      class=" overflow-y-auto overflow-x-hidden fixed w-full h-full top-0 left-0 flex items-center justify-center z-50">
      <div class="relative p-4 w-full max-w-2xl max-h-full">
          <!-- Modal content -->
          <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <!-- Modal header -->
              <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Cập nhật thông tin cá nhân</h3>
              
                  <button @click="openUpdate()" type="button"
                      class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-target="updateProfileModal" data-modal-toggle="updateProfileModal">
                      <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clip-rule="evenodd" />
                      </svg>
                      <span class="sr-only">Close modal</span>
                  </button>
              </div>
              <!-- Modal body -->
              <div>
                  <div>
                      <label for="fullname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Họ và
                          tên</label>
                      <input v-model="fullname" type="text" name="fullname" id="fullname"
                          class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Nhập họ và tên" required="">
                      <p v-if="!fullname && fullnameFocused" class="text-red-500 text-sm ml-1">Họ và tên chưa được nhập!</p>
                      <p class="text-red-500 text-sm ml-1" 
                        v-else-if="!validFullName(fullname) && fullnameFocused">Tên người dùng phải từ 3 tới 50 ký tự</p>
                  </div>
                  <div>
                      <label for="sex" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giới
                          tính</label>
                      <select v-model="sex" name="sex" id="sex"
                          class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                          <option value="Nam">Nam</option>
                          <option value="Nữ">Nữ</option>
                      </select>
                      <p v-if="!sex && sexFocused" class="text-red-500 text-sm ml-1">Giới tính chưa được chọn!</p>
                  </div>
                  <div>
                      <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa
                          chỉ</label>
                      <input v-model="address" type="text" name="address" id="address"
                          class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Nhập địa chỉ" required="">
                      <p v-if="!address && addressFocused" class="text-red-500 text-sm ml-1">Địa chỉ chưa được nhập!</p>
                  </div>
                  <div>
                      <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số điện
                          thoại</label>
                      <input v-model="phone" type="text" name="phone" id="phone"
                          class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Nhập số điện thoại" required="">
                      <p v-if="!phone && phoneFocused" class="text-red-500 text-sm ml-1">Số điện thoại chưa được nhập!</p>
                      <p class="text-red-500 text-sm ml-1" v-else-if="!validPhone(phone) && phoneFocused">Số điện thoại sai định dạng.</p>
                  </div>

                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                      <input v-model="email" type="text" name="email" id="email"
                          class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Nhập email" required="">
                      <p v-if="!email && emailFocused" class="text-red-500 text-sm ml-1">Email chưa được nhập!</p>
                      <p class="text-red-500 text-sm ml-1" v-else-if="!validEmail(email) && emailFocused">Email sai định dạng.</p>
                  </div>
                
                  <button @click="updateProfile()"
                      class=" inline-flex items-center bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                      <svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd"
                              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                              clip-rule="evenodd" />
                      </svg>
                      Cập nhật
                  </button>
              </div>
          </div>
      </div>
  </div>

  <!-- Delete modal -->
  <div id="deleteModal" v-if="isDelete"
        class="  overflow-y-auto overflow-x-hidden fixed w-full h-full top-0 left-0 flex items-center justify-center z-50">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                <button @click="openDelete()" type="button"
                    class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="deleteModal">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewbox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd" />
                    </svg>

                </button>
                <!-- <svg class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true"
                    fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clip-rule="evenodd" />
                </svg> -->
                <p class="mb-4 text-gray-500 dark:text-gray-300">Bạn có muốn hủy đơn ?</p>
                <div class="flex justify-center items-center space-x-4">
                    <button data-modal-toggle="deleteModal" type="button" @click="openDelete()"
                        class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Hủy</button>
                    <button type="submit" @click=""
                        class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">Xác nhận</button>
                </div>
            </div>
        </div>
    </div>
<!--component toast thông báo !!!-->
<toast ref="toast"></toast>
</template>

<script>
import axios from 'axios';
import toast from '../../components/toast.vue';
export default {
  data() {
    return {
      activeTab: 'cart',isCart:true,isHotel:false,
      hotels: [], orders: [],
      user: '', account: '', fullname: '', sex: '', address: '', phone: '', email: '', users: '',
      isUpdate: false, isDelete: false,
      fullnameFocused: false, sexFocused: false, addressFocused: false, phoneFocused: false, emailFocused: false
    };
  },
  mounted() {
   
    this.user = JSON.parse(localStorage.getItem("User"));
    this.getOrder()

    this.getHotel()
  },
  components: {
    toast,
  },
  methods: {
    formatCurrency(value) {
      let val = (value / 1).toFixed(0).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' đồng'
    },
    openUpdate() {
      this.isUpdate = !this.isUpdate
    },
    openDelete() {
      this.isDelete = !this.isDelete
    },
    selectUser(){
      this.fullname = this.user.fullname,
      this.sex = this.user.sex,
      this.address = this.user.address,
      this.phone = this.user.phone,
      this.email = this.user.email
    },
    activeCart()
    {
      this.isHotel = false
      this.isCart = true
      this.activeTab = 'cart'
    },
    activeHotel()
    {
      this.isHotel = true
      this.isCart = false
      this.activeTab = 'hotel'
    },

    async getOrder() {
       try {
           const result = await this.$axios.get(`order/getOrderUser/${this.user.id}`);
           this.orders = result.data;
       } catch (error) {
           console.log(error)
       }
    },

    async getHotel() {
      try {
        const result = await this.$axios.get('favorate/get')
        this.hotels = result.data;
      } catch (error) {
        console.log(error);
      }
    },

    async updateProfile(){
      try {
        // bật hết các focus validate
        this.fullnameFocused = true, this.emailFocused = true,
        this.sexFocused = true,
        this.addressFocused = true, this.phoneFocused = true

        if (this.validEmail(this.email) && this.phone && this.validPhone(this.phone) && this.address && 
        this.fullname && this.validFullName(this.fullname) && this.sex) {
          const result = await this.$axios.put(`user/update/${this.user.id}`,{
                fullname: this.fullname,
                address: this.address,
                sex: this.sex,
                phone: this.phone,
                email: this.email
          });
          if (result.status == 200) {
            this.fullnameFocused = false; this.emailFocused = false; this.sexFocused = false; 
            this.addressFocused = false; this.phoneFocused = false;
            localStorage.setItem('User', JSON.stringify(result.data.Updateuser))
            setTimeout(() => {
               location.reload()
            }, 1000);
            this.openUpdate()
            this.$refs.toast.showToast(result.data.message);
          }
        }else{
          // bật hết các focus validate
          this.fullnameFocused = true, this.emailFocused = true, this.sexFocused = true,
          this.addressFocused = true, this.phoneFocused = true
          console.log('lmao')
        }
      } catch (error) {
        console.log(error);
      }
    },


    // các re ràng buộc
      validEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      },
      validPhone(phone) {
        const re = /^(0[1-9]|84[2-9])(\d{8})$/;
        return re.test(phone);
      },
      // validPassword(password) {
      //   const re = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
      //   return re.test(password);
      // },
       validFullName(fullName) {
        const re = /^.{3,50}$/; // Kiểm tra chuỗi từ 10 đến 50 ký tự
        return re.test(fullName);
      },
    // validPassword2(password) {
    //     const re = /[A-Z]/;
    //     return re.test(password);
    //   },
  
  },
};
</script>
