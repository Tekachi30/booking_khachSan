<template>
    <div class="container mx-auto p-8">
    <div class="flex justify-between flex-wrap">
        <div class="lg:w-1/2 w-full p-4">
            <h2 class="text-2xl font-bold mb-4">Thông tin thanh toán</h2>
            <div>
                <div class="mb-4">
                    <label class="block text-sm font-medium mb-2">Địa chỉ email</label>
                    <input type="email" class="w-full p-2 border rounded"/>
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium mb-2">Họ và tên</label>
                    <input type="text" class="w-full p-2 border rounded"/>
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium mb-2">Địa chỉ</label>
                    <input type="text" class="w-full p-2 border rounded"/>
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium mb-2">Số điện thoại</label>
                    <input type="text" class="w-full p-2 border rounded"/>
                </div>
                <div class="mb-4">
                <h3 class="text-lg font-bold mb-2">Phương thức thanh toán</h3>
                <div class="flex items-center mb-2">
                    <input type="radio" name="payment" id="credit-card" class="mr-2"/>
                    <label for="credit-card" class="text-sm">MOMO</label>
                </div>
                <div class="flex items-center mb-2">
                    <input type="radio" name="payment" id="paypal" class="mr-2"/>
                    <label for="paypal" class="text-sm">VNPAY</label>
                </div>
            </div>
            </div>
        </div>
        <div class="lg:w-1/2 w-full p-4">
            <h2 class="text-2xl font-bold mb-4">Tổng hóa đơn</h2>
            <div class="m-5 overflow-y-auto overflow-auto max-h-96">
                <!--show-->
                <ul role="list" class="-my-6 divide-y divide-gray-200 p-10 ">
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
            
            <div class="flex justify-between font-bold mb-4">
                <span class="text-sm">Tổng tiền</span>
                <span class="text-sm">10000 ngàn tỷ</span>
            </div>
            <button class="w-full bg-gray-500 text-white p-2 rounded">Thanh toán</button>
        </div>
    </div>
</div>

</template>