<template>
    <div class=" max-w-screen-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-[100px] h-full  ">
        <div class="relative">
            <MapboxMap style="height: 550px" :access-token=accessToken map-style="mapbox://styles/mapbox/streets-v12"
                :zoom="15" :center="[106.67792291188607, 10.737908960298967]">
                <MapboxMarker :lng-lat="[106.67792291188607, 10.737908960298967]" />
            </MapboxMap>
            <div class=" relative py-6 px-8 w-full  shadow-xl bg-white mb-2 ">
                <div class="mx-auto max-w-lg text-center m-2">
                    <p class="text-2xl font-bold text-gray-900 sm:text-4xl">Chọn điểm dừng ở mọi nơi</p>
                    <p class="mt-1.5 text-base text-gray-500">
                        Hơn 100 khách sạn hạng sang giá tốt đang chờ bạn - Hãy liên hệ với chúng tôi để có trải nghiệm tuyệt
                        vời.
                    </p>
                </div>

                <div class="mt-2">
                    <!--thông tin khách hàng email - sdt - email -->
                    <label for="Username"
                        class="relative block  px-10 py-3 mb-2 rounded-2xl border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                        <input type="text" id="Username"
                            class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                            placeholder="Họ và tên" />

                        <span
                            class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                            Họ và tên <span class="text-rose-400">*</span>
                        </span>
                    </label>

                    <div class="md:grid grid-cols-2 gap-2">
                        <label for="email"
                            class="relative block  px-10 py-3 mb-2 rounded-2xl border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                            <input type="text" id="email"
                                class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                                placeholder="Địa chỉ email" />

                            <span
                                class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                                Địa chỉ email <span class="text-rose-400">*</span>
                            </span>
                        </label>

                        <label for="phone"
                            class="relative block  px-10 py-3 mb-2 rounded-2xl border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                            <input type="text" id="phone"
                                class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                                placeholder="Số điện thoại" />

                            <span
                                class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                                Số điện thoại <span class="text-rose-400">*</span>
                            </span>
                        </label>
                    </div>

                    <label for="text"
                        class="relative block  px-10 py-3 mb-2 rounded-2xl border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                        <textarea id="text"
                            class="peer w-full border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                            placeholder="Nhập nội dung"></textarea>
                        <span
                            class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                            Nhập nội dung<span class="text-rose-400">*</span>
                        </span>
                    </label>
                    
                        <button type="button"
                            class="text-white w-full  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-base p-5 text-center  ">Liên
                            hệ</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.map-container {
    flex: 1;
}
</style>
<script>
import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl';
export default {
    name: "BaseMap",
    data() {
        return {
            mapCenter: '',
            accessToken: 'pk.eyJ1Ijoibmh1dHN0dSIsImEiOiJjbGswbXVxOG0wMTJ3M2pyZjlwOGFuN3JlIn0.Td1W0CHDk-A4QdlxHSNq8A',
        };
    },
    components: { MapboxMap, MapboxMarker },
    mounted() {


    },

    methods: {

    },
};
</script>