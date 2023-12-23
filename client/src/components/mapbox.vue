<template>
    <div ref="map" class="map"></div>
  </template>
  
  <script>
  import Mapboxgl from 'mapbox-gl';
  
  export default {
    data() {
      return {
        map: null,
      };
    },
    mounted() {
      // Thay thế 'YOUR_MAPBOX_ACCESS_TOKEN' bằng khóa API của bạn
      // token: pk.eyJ1Ijoibmh1dHN0dSIsImEiOiJjbHE0dWp5eWcwMjRiMmtwN3dyeTJ1Nzl2In0.9wdPWiCRByOLVpVh7h7IuQ
      Mapboxgl.accessToken = 'pk.eyJ1Ijoibmh1dHN0dSIsImEiOiJjbHE0dWp5eWcwMjRiMmtwN3dyeTJ1Nzl2In0.9wdPWiCRByOLVpVh7h7IuQ';
  
      // Tạo đối tượng bản đồ
      this.map = new Mapboxgl.Map({
        container: this.$refs.map,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [0, 0],
        zoom: 2,
      });
    },
    beforeDestroy() {
      if (this.map) {
        this.map.remove();
      }
    },
  };
  </script>
  
  <style scoped>
  .map {
    height: 400px;
    width: 100%;
  }
  </style>
  