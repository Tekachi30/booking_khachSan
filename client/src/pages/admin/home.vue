<template>
  <div class="flex flex-wrap mb-10">
    <div class="mx-5">
      <userInYear />
    </div>

    <div class="mx-5">
      <roomHotel />
    </div>

    <div class="mx-5">
      <ratingHotel/>
    </div>
  </div>

  <div class="flex flex-row mb-10">
    <div class="mx-5 w-6/12">
      <userInMonth />
    </div>
    <div class="mx-5 w-6/12">
      <hotelForMonth />
    </div>
  </div>

  <div class="flex flex-row">
    <div class="mx-5 w-6/12">
        <ownerInMonth/>
    </div>
    <div class="mx-5 w-6/12">
        <orderInMonth/>
    </div>
  </div>

  <div class="flex flex-row mb-10">
    <div class="mx-5 w-6/12">
        <roomInMonth/>
    </div>
    <div class="mx-5 w-6/12">
        <cashHotelInMonth/>
    </div>
  </div>

  <div class="flex flex-row">
    <div class="mx-5 w-6/12">
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
