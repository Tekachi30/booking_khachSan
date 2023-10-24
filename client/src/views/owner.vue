<template>
  <!--navbar owner-->
  <navbarVue />
  <!-- banner -->
  <bannerVue/>
  <!--view chính-->
  <div class="p-10">
    <router-view />
  </div>

  <!--footer-->
  <footerVue/>
</template>

<script>
import footerVue from '../components/owner/footer.vue'
import bannerVue from '../components/owner/banner.vue'
import navbarVue from '../components/owner/navbar.vue'
export default {
  data() {
    return {
      
    };
  },
  components: {
    footerVue,
    bannerVue,
    navbarVue
  },
  methods: {},
};
</script>
