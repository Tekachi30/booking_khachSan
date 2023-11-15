<template>
    <div class="md:flex justify-center ">
        <!--sidebar-->
        <div class="order-sidemenu block-border w-full md:w-[270px] mb-6 px-4 mt-6 shadow-lg rounded-lg">
            <div class="order-sidemenu__user">
                <div class="order-sidemenu__user-avatar">
                    <img src="https://pubcdn.ivymoda.com/ivy2//images/v2/assets/user-avatar-placeholder.png" alt="">
                </div>
                <div class="order-sidemenu__user-name">
                    <p>Đặng Thành Đạt</p>
                </div>
            </div>
            <div class="order-sidemenu__menu">
                <ul>
                    <li class="active">
                        <a href="https://ivymoda.com/customer/info"><span class="icon-ic_avatar-1"></span>Thông tin tài
                            khoản</a>
                    </li>
                    <li class="">
                        <a href="https://ivymoda.com/customer/order_list"><span class="icon-ic_reload"></span>Quản lý đơn
                            hàng</a>
                    </li>

                    <li class="">
                        <a href="https://ivymoda.com/customer/san-pham-yeu-thich"><span class="icon-ic_heart"></span>Sản
                            phẩm
                            yêu thích</a>
                    </li>
                </ul>
            </div>

        </div>

        <!--section hiển thị ?-->
        <section class="py-1">
            <div class="w-full mb-6 px-4 mt-6">
                <router-view />
            </div>
        </section>

    </div>
</template>
<style>
.order-sidemenu {
    padding: 32px;
}

.order-sidemenu__user {
    display: flex;
    align-items: center;
    padding-bottom: 24px;
}

.order-sidemenu__user-avatar {
    width: 32px;
    height: 32px;
    overflow: hidden;
    border-radius: 50%;
}

.order-sidemenu__user-name {
    padding-left: 12px;
}

.order-sidemenu__user-name p {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 0;
}

.order-sidemenu__menu {
    border-top: 1px solid #f7f8f9;
}

.order-sidemenu__menu li {
    margin-top: 32px;
}

.order-sidemenu__menu li a {
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;
    color: #808285;
}

.order-sidemenu__menu li a span {
    flex: 0 0 13px;
    max-width: 13px;
    margin-right: 12px;
}

.order-sidemenu__menu li.active a {
    color: #221f20;
}
</style>
