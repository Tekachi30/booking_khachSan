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
  data() {
        return {
            user: ''
        };
    },
    mounted() {
      this.user = JSON.parse(localStorage.getItem("User"));
      if(this.user){
        socketService.userConnect(this.user.id);
      }
    },
  components: {
    navbar,
    footerv
  },
};
</script>

