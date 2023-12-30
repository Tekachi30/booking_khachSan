<template>
  <!-- button thêm -->
  <button @click="openAdd()" type="button"
    class="flex items-center justify-center  bg-gray-300 hover:bg-gray-400 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2  focus:outline-none ">
    <svg class="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clip-rule="evenodd" fill-rule="evenodd"
        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
    </svg>
    Thêm
  </button>
  <!--nút chuyển đổi qua lại-->
  <div
    class="text-sm mb-2 font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
    <ul class="flex flex-wrap">
      <li class="mr-2 cursor-pointer ">
        <a @click="activeHotel()"
          :class="['inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300', { 'text-blue-600 border-blue-600 rounded-t-lg font-bold': activeTab === 'active' }]"
          class=" active inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Danh
          sách hoàn thiện</a>
      </li>
      <li class="mr-2 cursor-pointer">
        <a @click="unActiveHotel()"
          :class="['inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300', { 'text-blue-600 border-blue-600 rounded-t-lg font-bold': activeTab === 'unactive' }]"
          class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Chờ
          hoàn thiện</a>
      </li>

    </ul>
  </div>

  <!-- Giao diện render hotel -->
  <!--sản phẩm thêm mượt mà-->
  <!--grid stytem tương tự bên boostrap 5 là row và col-->
  <div class="w-full " v-if="isActive">
    <div class="grid grid-cols-4 gap-4">
      <div class=" bg-white border border-gray-200 rounded-lg shadow " v-for="hotel in hotels">
        <!-- view ảnh khách sạn-->
        <swiper :pagination="{
          dynamicBullets: true,
        }" :modules="modules" class="mySwiper ">
          <swiper-slide v-for="img in hotel.img_hotels">
            <img class="rounded-t-lg p-1 " :src="img.url" alt="" style="width: 1360px; height: 360px;"/>
          </swiper-slide>
        </swiper>

        <div class="p-5">
          <a>
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{{ hotel.name_hotel }}</h5>
          </a>
          <p class="mb-3 font-normal text-gray-700 ">{{ hotel.information }}</p>
          <p class="mb-3 font-normal text-gray-700 ">{{ hotel.address }}</p>
          <a @click="openUpdate(); select(hotel)"
            class="inline-flex cursor-pointer items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
            Cập nhật
          </a>
          <a 
          @click="openDelete();select(hotel)"
            class="ml-2 inline-flex cursor-pointer items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
            Xóa
          </a>
        </div>
      </div>
    </div>
  </div>
  <!-- -->
  <div class="w-full" v-if="isUnActive">
    <div class="grid grid-cols-4 gap-4">
      <div class=" bg-white border border-gray-200 rounded-lg shadow " v-for="hotel in hotel_nons">
        <!-- view ảnh khách sạn-->
        <swiper :pagination="{
          dynamicBullets: true,
        }" :modules="modules" class="mySwiper ">
          <swiper-slide v-for="img in hotel.img_hotels">
            <img class="rounded-t-lg p-1 " :src="img.url" alt="" />
          </swiper-slide>
        </swiper>

        <div class="p-5">
          <a>
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{{ hotel.name_hotel }}</h5>
          </a>
          <p class="mb-3 font-normal text-gray-700 ">{{ hotel.information }}</p>
          <p class="mb-3 font-normal text-gray-700 ">{{ hotel.address }}</p>
        </div>
      </div>

    </div>
  </div>
  <!--Thêm hotel-->
  <!-- form thứ 1 thêm information cho hotel-->
  <div v-if="isAdd" id="createProductModal"
    class=" overflow-y-auto overflow-x-hidden fixed w-full h-full top-0 left-0 flex items-center justify-center z-50">
    <div class="relative p-4 w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-400 sm:p-5">
        <!-- Modal header -->
        <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Thêm khách sạn</h3>

          <button @click="openAdd()" type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-target="createProductModal" data-modal-toggle="createProductModal">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewbox="0 0 20 20"
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
          <div class="grid gap-4 mb-4 sm:grid-cols-2">
            <div class="name_hotel">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên khách sạn</label>
              <input v-model="name_hotel" type="text" name="name_hotel" id="name_hotel"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Nhập tên khách sạn" required="">
              <p v-if="!name_hotel && name_hotel_forcus" class="text-red-500 text-sm ml-1">Chưa nhập tên khách sạn!</p>
            </div>

            <div class="address">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa chỉ</label>
              <input v-model="address" type="text" name="address" id="address"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Nhập Địa chỉ" required="">
              <p v-if="!address && address_forcus" class="text-red-500 text-sm ml-1">Chưa nhập địa chỉ!</p>
            </div>


            <div class="city">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chọn thành
                phố</label>
              <select v-model="city_id" required @change="onCitySelected()"
                class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none text-sm">
                <option disabled>Thành phố</option>
                <option v-for="city in citys" :key="city.code" :value="city.code">
                  {{ city.name }}
                </option>
              </select>
              <p v-if="!city_id && city_id_forcus" class="text-red-500 text-sm ml-1">Chưa chọn thành phố!</p>

            </div>


            <div class="district">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quận huyện</label>
              <select v-model="districts_code" @change="onDistrictSelected()"
                class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none text-sm">
                <option disabled selected>Quận/Huyện</option>
                <option v-for="district in districts" :key="district.code" :value="district.code">
                  {{ district.name }}
                </option>
              </select>
              <p v-if="!districts_code && districts_code_forcus" class="text-red-500 text-sm ml-1">Chưa chọn quận/huyện!</p>
            </div>


            <div class="ward">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Xã</label>
              <select v-model="ward_code"
                class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none text-sm">
                <option disabled selected>Xã/Phường</option>
                <option v-for="ward in wards" :key="ward.code" :value="ward.code">
                  {{ ward.name }}
                </option>
              </select>
              <p v-if="!ward_code && ward_code_forcus" class="text-red-500 text-sm ml-1">Chưa chọn xã/phường!</p>
            </div>
          </div>

          <div class="information">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thông tin khách
              sạn</label>
            <textarea v-model="information" type="text" name="information" id="information"
              class="bg-gray-50 border mt-2 mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Nhập thông tin khách sạn" required=""></textarea>
            <p v-if="!information && information_forcus" class="text-red-500 text-sm ml-1">Nội dung mô tả chưa được nhập!</p>
          </div>

          <!--hiển thị ảnh đã chọn tại đây đi ???-->
          <div v-if="imgs.length > 0" class="mb-2">
            <div class="grid grid-cols-4 gap-4">
              <div v-for="(image, index) in imgs" :key="index"
                class="relative group cursor-pointer transition duration-300 transform hover:scale-105">
                <img :src="image.url" alt="Selected Image" class="w-full h-24 object-cover rounded-lg shadow-md">
                <button @click="removeImage(index)"
                  class="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <!-- them ảnh tại đây luôn -->
          <div class="flex items-center justify-center w-full mb-2">
            <label for="dropzone-file"
              class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                </svg>
                <!--thông báo ràng buộc bỏ file vào -->
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to
                    upload</span> or drag and drop</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              <!--input tại đây-->
              <input id="dropzone-file" type="file" class="hidden" @change="onFileSelected" multiple />
            </label>
          </div>
          <!-- <p v-if="!avatar && avatar_forcus">Thêm ít nhất 1 ảnh!</p> -->
          

          <button @click="addHotel()" type="button"
            class="  inline-flex items-center bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            <svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clip-rule="evenodd" />
            </svg>
            Thêm khách sạn
          </button>
        </div>
      </div>
    </div>
  </div>

  <!--form update-->
  <div v-if="isUpdate"
    class=" overflow-y-auto overflow-x-hidden fixed w-full h-full top-0 left-0 flex items-center justify-center z-50">
    <div class="relative p-4 w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-400 sm:p-5">
        <!-- Modal header -->
        <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Cập nhật khách sạn</h3>

          <button @click="openUpdate()" type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-target="createProductModal" data-modal-toggle="createProductModal">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewbox="0 0 20 20"
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
          <div class="grid gap-4 mb-4 sm:grid-cols-2">
            <div class="name_hotel">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên khách sạn</label>
              <input v-model="name_hotel" type="text" name="name_hotel" id="name_hotel"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Nhập tên khách sạn" required="">
              <p v-if="!name_hotel && name_hotel_forcus" class="text-red-500 text-sm ml-1">Chưa nhập tên khách sạn!</p>
            </div>

            <div class="address">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa chỉ</label>
              <input v-model="address" type="text" name="address" id="address"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Nhập Địa chỉ" required="">
              <p v-if="!address && address_forcus" class="text-red-500 text-sm ml-1">Chưa nhập địa chỉ!</p>
            </div>

            <div class="city">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chọn thành
                phố</label>
              <select v-model="city_id" required @change="onCitySelected()"
                class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none text-sm">
                <option disabled>Thành phố</option>
                <option v-for="city in citys" :key="city.code" :value="city.code">
                  {{ city.name }}
                </option>
              </select>
              <p v-if="!city_id && city_id_forcus" class="text-red-500 text-sm ml-1">Chưa chọn thành phố!</p>
            </div>

            <div class="district">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quận huyện</label>
              <select v-model="districts_code" @change="onDistrictSelected()"
                class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none text-sm">
                <option disabled selected>Quận/Huyện</option>
                <option v-for="district in districts" :key="district.code" :value="district.code">
                  {{ district.name }}
                </option>
              </select>
              <p v-if="!districts_code && districts_code_forcus" class="text-red-500 text-sm ml-1">Chưa chọn quận/huyện!</p>
            </div>

            <div class="ward">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Xã</label>
              <select v-model="ward_code"
                class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none text-sm">
                <option disabled selected>Xã/Phường</option>
                <option v-for="ward in wards" :key="ward.code" :value="ward.code">
                  {{ ward.name }}
                </option>
              </select>
              <p v-if="!ward_code && ward_code_forcus" class="text-red-500 text-sm ml-1">Chưa chọn xã/phường!</p>
            </div>

          </div>

          <div class="information">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thông tin khách
              sạn</label>
            <textarea v-model="information" type="text" name="information" id="information"
              class="bg-gray-50 border mt-2 mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Nhập thông tin khách sạn" required=""></textarea>
            <p v-if="!information && information_forcus" class="text-red-500 text-sm ml-1">Nội dung mô tả chưa được nhập!</p>
          </div>

          <!--view ảnh mới-->
          <p class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ảnh mới</p>
          <div v-if="imgs.length > 0" class="mb-2">
            <div class="grid grid-cols-4 gap-4">
              <div v-for="(image, index) in imgs" :key="index"
                class="relative group cursor-pointer transition duration-300 transform hover:scale-105">
                <img :src="image.url" alt="Selected Image" class="w-full h-24 object-cover rounded-lg shadow-md">
                <button @click="removeImage(index)"
                  class="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <!--view ảnh cũ-->
          <p class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ảnh cũ</p>
          <div class="grid grid-cols-4 gap-4 mb-2">
            <div v-for="(image, index) in imgs_old" :key="index"
              class="relative group cursor-pointer transition duration-300 transform hover:scale-105">
              <img :src="image.url" alt="Selected Image" class="w-full h-24 object-cover rounded-lg shadow-md">
              <button @click="removeOld(image, index)"
                class="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- nút thêm ảnh  -->
          <div class="flex items-center justify-center w-full mb-2">
            <label for="dropzone-file"
              class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                </svg>
                <!--thông báo ràng buộc bỏ file vào -->
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to
                    upload</span> or drag and drop</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              <!--input tại đây-->
              <input id="dropzone-file" type="file" class="hidden" @change="onFileSelected" multiple />
            </label>
          </div>


          <button @click="updateHotel()" type="button"
            class="  inline-flex items-center bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            <svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clip-rule="evenodd" />
            </svg>
            Cập nhật khách sạn
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Delete modal -->
  <div id="deleteModal"  v-if="isDelete"
        class=" overflow-y-auto overflow-x-hidden fixed w-full h-full top-0 left-0 flex items-center justify-center z-50">
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
                <svg class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true"
                    fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clip-rule="evenodd" />
                </svg>
                <p class="mb-4 text-gray-500 dark:text-gray-300">Bạn có muốn xóa tài khoản này ?</p>
                <div class="flex justify-center items-center space-x-4">
                    <button data-modal-toggle="deleteModal" type="button" @click="openDelete()"
                        class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Hủy</button>
                    <button type="submit" @click="deleteHotel()"
                        class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">Xóa</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import AddressService from '../../plugins/addressService'
export default {
  data() {
    return {
      hotels: [], citys: [], districts: [], wards: [], imgs: [], hotel: '', imgs_old: [],hotel_nons:[],
      // tạo ra 1 mảng mới gọi là img_old_delete để lưu cái ảnh sẽ xóa
      img_old_delete: [],
      city_id: '', districts_code: '', ward_code: '', name_hotel: '', information: '', address: '',
        owner: '', avatar: null, activeTab: 'active',
      isActive: true, isUnActive: false, isAdd: false, isUpdate: false,isDelete:false,
      name_hotel_forcus: false, address_forcus: false, city_id_forcus: false, districts_code_forcus: false,
      ward_code_forcus: false, information_forcus: false, avatar_forcus: false

    };
  },
  mounted() {
    this.owner = this.getToken()
    this.getHotel()

    // đầu tiên là lấy city về
    AddressService.getCountry().then((data) => {
      this.citys = data;
    });

    // B1 để lấy destrict vs ward 
    // lấy district là phải có citycode
    AddressService.getDistricts(this.city_id).then((data) => {
      this.districts = data;
    });
    // lấy ward là phải có district code 
    AddressService.getWard(this.districts_code).then((data) => {
      this.wards = data;
    });
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Pagination],
    };
  },
  methods: {
    activeHotel() {
      this.activeTab = 'active'
      this.isActive = true
      this.isUnActive = false
    },
    unActiveHotel() {
      this.activeTab = 'unactive'
      this.isActive = false
      this.isUnActive = true
    
      this.getNonHotel()
    },
    getToken() {
      let owner = JSON.parse(localStorage.getItem("owner"));
      return owner;
    },
    openAdd() {
      this.isAdd = !this.isAdd
      this.imgs = []
    },
    openUpdate() {
      // reset mảng chứa ảnh 
      this.imgs = []
      this.img_old_delete = []
      this.imgs_old = []
      this.isUpdate = !this.isUpdate
    },
    openDelete()
    {
      this.isDelete = !this.isDelete
    },
    select(update) {
      this.hotel = update
      this.city_id = update.city_code
      this.districts_code = update.district_code
      this.ward_code = update.ward_code
      AddressService.getDistricts(this.city_id).then((data) => {
        this.districts = data;
      });
      // lấy ward là phải có district code 
      AddressService.getWard(this.districts_code).then((data) => {
        this.wards = data;
      });
      this.name_hotel = update.name_hotel
      this.address = update.address
      this.information = update.information
      //render ra dữ liệu của ảnh cũ ở đây
      this.imgs_old = update.img_hotels
    },
    // gọi 2 hàm để xử lý việc chọn district => trả về district code và ward tương tự.
    // lấy city code -> tại input option value của city sau khi lấy đc sẽ trả về city code để lấy đc dữ liệu district
    async onCitySelected() {
      this.districts = await AddressService.getDistricts(this.city_id);
    },
    // tương tự trên
    async onDistrictSelected() {
      this.wards = await AddressService.getWard(this.districts_code);
    },

    // bảng chất cũng là hàm lấy ảnh nhưng là lấy 1 list ảnh
    onFileSelected(event) {
      const files = event.target.files;
      const maxFileSizeInBytes = 10 * 1024 * 1024; // 10 MB

      for (const file of files) {
        if (file.size > maxFileSizeInBytes) {
          alert(`Ảnh ${file.name}nhỏ hơn hoặc bằng 10mb`);
        } else {
          // Tạo một URL cho ảnh để hiển thị trước
          const imageUrl = URL.createObjectURL(file);
          // Thêm ảnh vào mảng imgs
          this.imgs.push({ file, url: imageUrl })
        }
      }
    },

    removeImage(index) {
      // Xóa ảnh khỏi mảng khi nút xóa được nhấp
      this.imgs.splice(index, 1);
    },
    removeOld(image, index) {
      this.imgs_old.splice(index, 1)
      this.img_old_delete.push(image)
      console.log(this.img_old_delete)
    },
    async getHotel() {
      try {
        const result = await this.$axios.get(`hotel/get/${this.owner.id}`)
        this.hotels = result.data
      } catch (error) {
        console.log(error)
      }
    },
    async getNonHotel()
    {
      try {
        const result = await this.$axios.get(`hotel/get_non/${this.owner.id}`)
        this.hotel_nons = result.data
      } catch (error) {
        console.log(error)
      }
    },
    /*
     -- Giải thích cơ bản --
     Đầu tiên là xử lý việc nhập Ảnh và Xóa ảnh khỏi 1 mảng cụ thể ở đây là imgs 
     Tiếp theo là xử lý ở addHotel
     + Xem xét thêm thông tin để lấy được id_hotel
     + sau khi thêm thành công thì thực hiện gọi api thêm ảnh hotel về là xong
     + Bắt buộc phải trước khi thêm thông tin là có ảnh tránh việc thêm thông tin không ảnh
       + if (this.imgs.length > 0)
    */
    async addHotel() {
      try {
        // kiểm tra nhập nội dung đầy đủ chưa
        if (!this.name_hotel || !this.address || !this.city_id || !this.districts_code || !this.ward_code || !this.information ) { // || !this.avatar
          this.name_hotel_forcus = true;
          this.address_forcus = true;
          this.city_id_forcus = true;
          this.districts_code_forcus = true;
          this.ward_code_forcus = true;
          this.information_forcus = true;
          // this.avatar_forcus = true;
        }else{
         if (this.imgs.length > 0) {
           const result = await this.$axios.post(`hotel/add/${this.owner.id}`,
             {
               "name_hotel": this.name_hotel,
               "address": this.address,
               "city_code": this.city_id,
               "district_code": this.districts_code,
               "ward_code": this.ward_code,
               "information": this.information
             })
           console.log(result.data.hotel.id)

           if (result.status == 200) {
             const formImg = new FormData();
             // thêm ảnh tại đây khi thêm thông tin thành công
             for (let i = 0; i < this.imgs.length; i++) {
               const file = this.imgs[i].file;
               formImg.append("avatar", file);
             }
             try {
               const addimg = await this.$axios.post(`hotel/addImg/${result.data.hotel.id}`, formImg,
                 {
                   headers: {
                     "Content-Type": "multipart/form-data",
                   },
                 })
               if (addimg.status == 200) {
                this.name_hotel_forcus = false;
                this.address_forcus = false;
                this.city_id_forcus = false;
                this.districts_code_forcus = false;
                this.ward_code_forcus = false;
                this.information_forcus = false;
                // this.avatar_forcus = false;
                console.log(result.data.message)

                setTimeout(() => {
                   location.reload()
                }, 1000);

                this.getHotel()
                this.openAdd()
                 
               }
             } catch (error) {
               console.log(error)
             }
           }
         }
         else {
           alert('Them ảnh vào')
         }
        }
      } catch (error) {
        console.log(error)
      }
    },

    async updateHotel() {
      try {
        // Kiểm tra xem các thông tin có được nhật đầy đủ không
        if (!this.name_hotel || !this.address || !this.city_id || !this.districts_code || !this.ward_code || !this.information ) { // || !this.avatar
          this.name_hotel_forcus = true;
          this.address_forcus = true;
          this.city_id_forcus = true;
          this.districts_code_forcus = true;
          this.ward_code_forcus = true;
          this.information_forcus = true;
          // this.avatar_forcus = true;
        }else{
          // bước 1: sẽ thực hiện việc update thông tin trước
          const result = await this.$axios.put(`hotel/update/${this.hotel.id}`,
            {
              "name_hotel": this.name_hotel,
              "address": this.address,
              "city_code": this.city_id,
              "district_code": this.districts_code,
              "ward_code": this.ward_code,
              "information": this.information
            });

          console.log(result.data.message)

          // xử lý thêm ảnh
          /*
           + lưu ý 1 là phải cập nhật thành công thông tin hotel
           + lưu ý 2 là phải có ảnh mới => ko có bỏ qua
          */
          if (result.status == 200 && this.imgs.length > 0) {
            this.name_hotel_forcus = false;
            this.address_forcus = false;
            this.city_id_forcus = false;
            this.districts_code_forcus = false;
            this.ward_code_forcus = false;
            this.information_forcus = false;
            
            const formImg = new FormData();
            // thêm ảnh tại đây khi thêm thông tin thành công
            for (let i = 0; i < this.imgs.length; i++) {
              const file = this.imgs[i].file;
              formImg.append("avatar", file);
            }
            try {
              const addimg = await this.$axios.post(`hotel/addImg/${this.hotel.id}`, formImg,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                })
            } catch (error) {
              console.log(error)
            }

          }
          // xử lý xóa ảnh
          if (result.status == 200 && this.img_old_delete.length > 0) {
            
            // thêm ảnh tại đây khi thêm thông tin thành công
            for (let i = 0; i < this.img_old_delete.length; i++) {
              const id = this.img_old_delete[i].id;
              const result = await this.$axios.delete(`hotel/deleteImg/${id}`)
            }
          }

          setTimeout(() => {
             location.reload()
          }, 1000);
          
          this.openUpdate()
          this.getHotel()
        }
      } catch (error) {
        console.log(error)
      }
    },

    async deleteHotel()
    {
      try {
        const result = await this.$axios.delete(`hotel/delete/${this.hotel.id}`);
                if (result.status === 200) {
                    this.getHotel();
                    this.openDelete();
                    alert(result.data.message);
                } else {
                    alert(result.data.message);
                }
      } catch (error) {
        console.log(error)
      }
    }

  },
};
</script>
