<template>
  <navbarVue />
  <router-view/>
  <footerVue/>
</template>

<script>
import navbarVue from "../components/client/navbar.vue";
import footerVue from "../components/client/footer.vue";
export default {
  components: {
    navbarVue,
    footerVue,
  
  },
};
</script>

<style></style>
