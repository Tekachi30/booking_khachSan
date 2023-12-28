<template>
    <div
        style="background-image: url('https://img4.thuthuatphanmem.vn/uploads/2020/12/25/background-don-sac-dep-cho-powerpoint_101110800.jpg');background-repeat: repeat;background-position: cover;">
        <section>
            <div class=" max-w-screen-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-[100px] h-full ">
                <!--search center-->
                <div class=" rounded-3xl p-8 bg-white mt-20">
                    <div class="mx-auto max-w-lg text-center m-2">
                        <p class="text-2xl font-bold text-gray-900 sm:text-4xl">Bạn lựa chọn khách sạn nào ?</p>
                        <p class="mt-1.5 text-base text-gray-500">
                            Hơn 100 khách sạn hạng sang giá tốt đang chờ bạn
                        </p>
                    </div>
                    <div class="md:grid grid-cols-2 gap-2">
                        <!--search ten-->
                        <div class="relative p-2">
                            <input type="text" id="Search" placeholder="Tìm kiếm khách sạn" v-model="name_hotel"
                                class="w-full rounded-md border-gray-200 py-5 px-5 pe-10 shadow-sm sm:text-sm focus:outline-none" />
                            <span class="absolute inset-y-0 end-0 grid w-10 place-content-center">
                                <button type="button" class="text-gray-600 hover:text-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                    </svg>
                                </button>
                            </span>
                        </div>

                        <div class=" md:grid grid-cols-3 gap-3 items-center">
                            <!-- THANH PHO -->
                            <div class="relative p-2">
                                <div class="city">
                                    <select v-model="city_id" required
                                        class="appearance-none w-full rounded-md  py-5 px-1  pe-10 shadow-sm sm:text-sm focus:outline-none">
                                        <option disabled>Thành phố</option>
                                        <option v-for="city in citys" :key="city.code" :value="city.code">
                                            {{ city.name }}
                                        </option>
                                    </select>
                                    <!-- <p v-if="!city_id && city_id_forcus" class="text-red-500 text-sm ml-1">Chưa chọn thành
                                        phố!</p> -->
                                </div>
                            </div>

                            <!--GIA CA-->
                            <div class="relative p-2">
                                <select name="price" id="price" v-model="price"
                                    class="w-full rounded-md  py-5 px-1 pe-10 shadow-sm sm:text-sm focus:outline-none appearance-none">
                                    <option value="full">Tất cả các mức giá</option>
                                    <option value="under1">Dưới 1 triệu</option>
                                    <option value="1to3">Từ 1 tới 3 triệu</option>
                                    <option value="3to6">Từ 3 tới 6 triệu</option>
                                    <option value="above6">Trên 6 triệu</option>
                                </select>
                            </div>

                            <!--button-->
                            <div class="mt-2 md:mt-0 p-2">
                                <a @click="searchHotel()"
                                    class="w-full rounded-md border border-indigo-600 bg-indigo-600 py-5 px-5 pe-5 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500">
                                    Tìm kiếm
                                </a>
                            </div>
                        </div>
                    </div>
                    <!--bUTTON SEARCH-->
                </div>

                <!--view chữ kq-->

                <div class="flex items-center justify-between mt-20 ">
                    <p class="text-2xl font-bold text-gray-900 ">Tìm thấy {{ hotels.length }} tỷ kết quả</p>
                    <select name="sort" id="sort"
                        class=" py-2 px-5 rounded-2xl border-gray-300 appearance-none  text-gray-700 text-base font-bold focus:outline-none [&::-webkit-calendar-picker-indicator]:opacity-0 ">
                        <option value="non">Không sắp xếp</option>
                        <option value="desc">Từ cao tới thấp</option>
                        <option value="asc">Từ thấp tới cao</option>
                    </select>
                </div>

                <!--list hotel-->
                <section class="pt-10 pb-10 ">
                    <div class=" w-full px-4 sm:px-8 xl:px-0">
                        <div class="grid content-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-11 gap-x-7.5">
                            <!-- ks 1 -->
                            <a class="block rounded-lg p-4 shadow-sm shadow-indigo-100 bg-white" v-for="hotel in hotels">
                                <img alt="Home" :src="hotel.img_hotels[0].url"
                                    class="h-56 w-full rounded-md object-cover" />

                                <div class="mt-2">
                                    <dl>
                                        <div>
                                            <dt class="sr-only">khách sạn</dt>

                                            <router-link :to="{ name: 'hoteldetail', params: { id: `${hotel.id}` } }"
                                                class="font-bold text-xl">{{ hotel.name_hotel }}</router-link>
                                        </div>

                                        <div>
                                            <dt class="sr-only">Địa chỉ</dt>
                                            <dd class="pt-2 font-medium flex items-center">
                                                {{ hotel.address + ',' }}
                                                <p
                                                    v-for="district in districts.filter(item => item.code == hotel.district_code)">
                                                    {{ district.name +
                                                        ',' }}</p>
                                                <p v-for="ward in wards.filter(item => item.code == hotel.ward_code)">{{
                                                    ward.name + ',' +
                                                    getCityName(hotel.city_code) }}</p>
                                            </dd>
                                        </div>

                                        <div>
                                            <dt class="sr-only">Địa chỉ</dt>
                                            <dd class="font-normal text-base">{{ hotel.information }}</dd>
                                        </div>
                                    </dl>

                                    <div class="mt-6 flex items-center gap-8 text-xs">
                                        <!-- đánh giá-->
                                        <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                                            <svg class="h-4 w-4 text-indigo-700" xmlns="http://www.w3.org/2000/svg"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                            </svg>

                                            <div class="mt-1.5 sm:mt-0">
                                                <p class="text-gray-500">Đánh giá</p>

                                                <p class="font-medium">{{ countRating(hotel.id, hotel.rating_hotels) }} đánh
                                                    giá</p>
                                            </div>
                                        </div>

                                        <!-- so phong-->
                                        <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                                            <svg class="h-4 w-4 text-indigo-700" xmlns="http://www.w3.org/2000/svg"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                            </svg>

                                            <div class="mt-1.5 sm:mt-0">
                                                <p class="text-gray-500">Số phòng</p>
                                                <p class="font-medium">{{ countRoom(hotel.id, hotel.room_hotels) }} phòng
                                                </p>
                                            </div>
                                        </div>

                                        <!--xem chi tiet-->
                                        <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2 ml-auto">
                                            <router-link :to="{ name: 'hoteldetail', params: { id: `${hotel.id}` } }"
                                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Đặt
                                                phòng</router-link>
                                            <button type="button"
                                                class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Yêu
                                                thích</button>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>

                    </div>
                </section>

            </div>
        </section>
    </div>
</template>

<script>
import AddressService from '../../plugins/addressService'

export default {

    data() {
        return {
            city_id: '1', name_hotel: '', price: 'full',
            hotels: [], citys: [], districts: [], wards: [],
            showReload:false,
        };
    },
    mounted() {
        // đầu tiên là lấy city về
        AddressService.getCountry().then((data) => {
            this.citys = data;
        });
        AddressService.getAllDistricts().then(data => { this.districts = data; });
        AddressService.getAllWard().then(data => { this.wards = data; });
        this.getHotel()
    },
    components: {},
    methods: {
        async searchHotel() {
            try {
                const result = await this.$axios.post(`hotel/search`,
                    {
                        'name_hotel': this.name_hotel,
                        'city_code': this.city_id,
                        'option_price': this.price
                    })
                this.hotels = result.data
            } catch (error) {
                console.log(error)
            }
        },
        async getHotel() {
            try {
                const result = await this.$axios.get(`hotel/get/`)
                this.hotels = result.data

            } catch (error) {
                console.log(error)
            }
        },
        getCityName(cityCode) {
            const city = this.citys.find((c) => c.code === cityCode);
            return city ? city.name : '';
        },

        countRoom(id, rooms) {
            let sum = 0;
            for (let y = 0; y < rooms.length; y++) {
                if (rooms[y].id_hotel === id) {
                    sum++;
                }
            }
            return sum;
        },

        countRating(id, rating) {
            let sum = 0;
            for (let y = 0; y < rating.length; y++) {
                if (rating[y].id_hotel === id) {
                    sum++;
                }
            }
            return sum;
        }
    },
};
</script>