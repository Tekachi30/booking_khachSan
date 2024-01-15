<template>
  <div class="grid grid-cols-1 md:grid-cols-3 md:gap-3">
    <div class="mx-5">
      <userInYear class="w-full" />
    </div>

    <div class="mx-5">
      <roomHotel class="w-full" />
    </div>

    <div class="mx-5">
      <ratingHotel class="w-full"/>
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 md:gap-2">
    <div class="mx-5 ">
      <userInMonth />
    </div>
    <div class="mx-5 ">
      <hotelForMonth />
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 md:gap-2">
    <div class="mx-5 ">
        <ownerInMonth/>
    </div>
    <div class="mx-5 ">
        <orderInMonth/>
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 md:gap-2">
    <div class="mx-5 ">
        <roomInMonth/>
    </div>
    <div class="mx-5 ">
        <cashHotelInMonth/>
    </div>
  </div>

  <div class="">
    <div class="mx-5 ">
        <couponHotelInMonth/>
    </div>
  </div>
</template>

<script>
import userInYear from "../../components/chart/userInYear.vue";
import hotelForMonth from "../../components/chart/hotelForMonth.vue";
import roomHotel from "../../components/chart/roomHotel.vue";
import userInMonth from "../../components/chart/userInMonth.vue";
import ownerInMonth from "../../components/chart/ownerInMonth.vue";
import orderInMonth from "../../components/chart/orderInMonth.vue";
import roomInMonth from "../../components/chart/roomInMonth.vue";
import cashHotelInMonth from "../../components/chart/cashHotelInMonth.vue";
import couponHotelInMonth from "../../components/chart/couponHotelInMonth.vue";
import ratingHotel from "../../components/chart/ratingHotel.vue";


export default {
  data() {
    return {};
  },
  components: { userInYear, hotelForMonth, roomHotel, userInMonth, ownerInMonth, orderInMonth,
    roomInMonth, cashHotelInMonth, couponHotelInMonth, ratingHotel },
};
</script>
