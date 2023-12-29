<template>
  {{ this.$route.query.vnp_Amount }}<br>
  {{ this.$route.query.vnp_BankCode }}<br>
  {{ this.$route.query.vnp_OrderInfo }}<br>
  {{ fD(this.$route.query.vnp_PayDate) }} <br>
  {{ this.$route.query.vnp_txnRef }} <br>
  {{ this.$route.query.vnp_TransactionStatus }}
</template>

<script>
import dayjs from "dayjs";
export default {
  data() {
    return {

    };
  },
  mounted() {


  },
  methods: {
    fD(d) {
      const formattedDate = dayjs(d).format("YYYY-MM-DD HH:mm:ss");
      return formattedDate
    },
    async updateOrder() {
      try {

      } catch (error) {
        console.log(error)
      }
    }

  },
};
</script>