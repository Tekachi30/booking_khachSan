<template>
    <div class=" flex justify-center items-center py-12 px-4 sm:px-6 2xl:px-0 ">
        <div class="flex flex-col lg:flex-row justify-center items-center space-y-6 lg:space-y-0">
            <div class="w-80 sm:w-auto flex flex-col justify-start items-start">
                <div>
                    <p class="text-3xl xl:text-4xl font-semibold leading-9 text-gray-800 dark:text-white">Khách sạn mới và
                        phổ biến nhất</p>
                </div>
                <div class="mt-4 lg:w-4/5 xl:w-3/5">
                    <p class="text-base leading-6 text-gray-600 dark:text-white">Tận hưởng sự xa hoa và đẳng cấp tối đa mới
                        nhất và phổ biến nhất. Khám phá một hành trình tuyệt vời đưa bạn vào thế giới của sự sang trọng,
                        tiện nghi và trải nghiệm không thể quên.</p>
                </div>

            </div>

            <div
                class="flex flex-col sm:flex-row jusitfy-center items-center sm:space-x-5 xl:space-x-8 space-y-4 sm:space-y-0 ">
                <div class="">
                    <img class="hidden lg:block" src="https://icdn.dantri.com.vn/2019/02/16/10-1550333970807.jpg"
                        alt="sofa" />
                    <img class="w-80 sm:w-auto lg:hidden" src="https://icdn.dantri.com.vn/2019/02/16/10-1550333970807.jpg"
                        alt="sofa" />
                </div>

            </div>
        </div>
    </div>

    <!--VIEW HOTEL TOP-->
    <section class="pt-10 pb-10">
        <div class=" w-full px-4 sm:px-8 xl:px-0">
            <div class="grid content-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-11 gap-x-7.5">
                <!-- ks 1 -->
                <a class="block rounded-lg p-4 shadow-sm shadow-indigo-100">
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
                                <svg class="h-4 w-4 text-indigo-700" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
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
                                <svg class="h-4 w-4 text-indigo-700" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
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
                                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Đặt phòng</button>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
            <button
                class="flex justify-center font-medium text-dark border border-dark rounded-md py-3 px-6 hover:bg-dark  ease-in duration-200 mx-auto mt-5">
                Xem tất cả
            </button>

        </div>
    </section>
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