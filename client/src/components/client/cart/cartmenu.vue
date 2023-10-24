<template>
    <div class="relative z-[1000]" >
  
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

  <div class="fixed inset-0 overflow-hidden">
    <div class="absolute inset-0 overflow-hidden">
      <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10" >
       
        <div class="pointer-events-auto w-screen max-w-md">
          <div class="flex h-full flex-col overflow-hidden bg-white shadow-xl">
            <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
              <!--top-->
              <div class="flex items-start justify-between">
                <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">Giỏ hàng</h2>
                <div class="ml-3 flex h-7 items-center">
                    <!--đóng lại giỏ hàng-->
                  <button type="button" class="relative -m-2 p-2 text-gray-400 hover:text-gray-500" @click="onclose">
                    <span class="absolute -inset-0.5"></span>
                    <span class="sr-only">Close panel</span>
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <!--main-->
              <div class="mt-8">
                <div class="flow-root">
                    <!--product view nằm đây-->
                  <ul role="list" class="-my-6 divide-y divide-gray-200">
                    <!--thành phần chi tiết-->
                    <li class="flex py-6">
                      <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img src="https://znews-photo.zingcdn.me/w660/Uploaded/kbd_bcvi/2020_04_17/DJI_0202_2_.png" alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." class="h-full w-full object-cover object-center">
                      </div>

                      <div class="ml-4 flex flex-1 flex-col">
                        <div>
                          <div class="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a >Tự chế lại</a>
                            </h3>
                            <p class="ml-4">Giá cả</p>
                          </div>
                          <p class="mt-1 text-sm text-gray-500">LMAO</p>
                        </div>
                        <div class="flex flex-1 items-end justify-between text-sm">
                          <p class="text-gray-500">SL: 1</p>

                          <div class="flex">
                            <button type="button" class="font-medium text-gray-600 hover:text-gray-500">Xóa</button>
                          </div>
                        </div>
                      </div>
                    </li>
                    
                  </ul>
                </div>
              </div>
            </div>

            <!--footer-->
            <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div class="flex justify-between text-base font-medium text-gray-900">
                <p>Tạm tính:</p>
                <p>100000 tỷ</p>
              </div> 
              <div class="mt-6">
                <a href="#" class="flex items-center justify-center rounded-md border border-transparent bg-gray-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-700">Đặt phòng</a>
              </div>
              <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  hoặc
                  <!--click out-->
                  <button type="button" class="font-medium text-gray-600 hover:text-gray-500" @click="onclose">
                   Tiếp tục đặt phòng
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

</template>
<script>
export default {
    emits: ["cancel"],
    data() {
        return {
           
        };
    },
    mounted() {
      
    },
    methods: {
        onclose() {
            this.$emit("cancel");
        },
    },
};
</script>