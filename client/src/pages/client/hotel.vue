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
                            <input type="text" id="Search" placeholder="Tìm kiếm khách sạn"
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
                                <select name="city" id="city"
                                    class="w-full rounded-md  py-5 px-5 pe-10 shadow-sm sm:text-sm focus:outline-none">
                                    <option value="HCM">TP Hồ Chí Minh</option>
                                </select>
                            </div>

                            <!--GIA CA-->
                            <div class="relative p-2">
                                <select name="price" id="price"
                                    class="w-full rounded-md  py-5 px-5 pe-10 shadow-sm sm:text-sm focus:outline-none">
                                    <option value="1000">10000</option>
                                </select>
                            </div>

                            <!--button-->
                            <div class="mt-2 md:mt-0 p-2">
                                <a
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
                    <p class="text-2xl font-bold text-gray-900 ">Tìm thấy 1 tỷ kết quả</p>
                    <select name="sort" id="sort" class=" py-2 px-5 rounded-2xl border-gray-300 appearance-none  text-gray-700 text-base font-bold focus:outline-none [&::-webkit-calendar-picker-indicator]:opacity-0 ">
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
                            <a class="block rounded-lg p-4 shadow-sm shadow-indigo-100 bg-white mr-1">
                                <img alt="Home"
                                    src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                                    class="h-56 w-full rounded-md object-cover" />

                                <div class="mt-2">
                                    <dl>
                                        <div>
                                            <dt class="sr-only">Giá chỉ từ</dt>

                                            <dd class="text-sm text-gray-500">Chỉ từ 2 400,000 đ</dd>
                                        </div>

                                        <div>
                                            <dt class="sr-only">Địa chỉ</dt>

                                            <dd class="font-medium">123 Wallaby Avenue, Park Road</dd>
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

                                                <p class="font-medium">2 sao</p>
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

                                                <p class="font-medium">4 phòng</p>
                                            </div>
                                        </div>

                                        <!--xem chi tiet-->
                                        <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2 ml-auto">
                                            <button type="button"
                                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Đặt
                                                phòng</button>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <a class="block rounded-lg p-4 shadow-sm shadow-indigo-100 bg-white mr-1">
                                <img alt="Home"
                                    src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                                    class="h-56 w-full rounded-md object-cover" />

                                <div class="mt-2">
                                    <dl>
                                        <div>
                                            <dt class="sr-only">Giá chỉ từ</dt>

                                            <dd class="text-sm text-gray-500">Chỉ từ 2 400,000 đ</dd>
                                        </div>

                                        <div>
                                            <dt class="sr-only">Địa chỉ</dt>

                                            <dd class="font-medium">123 Wallaby Avenue, Park Road</dd>
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

                                                <p class="font-medium">2 sao</p>
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

                                                <p class="font-medium">4 phòng</p>
                                            </div>
                                        </div>

                                        <!--xem chi tiet-->
                                        <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2 ml-auto">
                                            <button type="button"
                                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Đặt
                                                phòng</button>
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
export default {
    data() {
        return {

        };
    },
    mounted() {

    },
    components: {},
    methods: {

    },
};
</script>