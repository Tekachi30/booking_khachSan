<template>
<navbar/>
<router-view/>
<footerv/>
</template>

<script>
import navbar from '../components/client/navbar.vue';
import footerv from '../components/client/footer.vue';
import socketService from '../plugins/socketService';
export default {
  components: {
    navbar,
    footerv
  },
};
</script>

