<template>
     <div class="flex flex-col sm:flex-row">
                <h1 class="max-w-sm text-3xl font-bold text-blue-900 mb-2 md:mb-5">
                    Bản đồ và lịch trình
                </h1>
            </div>
    <div class=" rounded-xl bg-white  shadow p-5 ">

        <div class="relative">
            <MapboxMap class="h-[400px]" :access-token=accessToken map-style="mapbox://styles/mapbox/streets-v12"
                :zoom="15" :center="[lng,lat]">
                <MapboxMarker :lng-lat="[lng,lat]" />
            </MapboxMap>
        </div>
    </div>
</template>
<style>
.map-container {
    flex: 1;
}
</style>
<script>
import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl';
import '@mapbox/mapbox-gl-geocoder/lib/mapbox-gl-geocoder.css';
export default {
    props:['lng','lat'],
    name: "BaseMap",
    data() {
        return {
            mapCenter: '',
            accessToken: 'pk.eyJ1Ijoibmh1dHN0dSIsImEiOiJjbGswbXVxOG0wMTJ3M2pyZjlwOGFuN3JlIn0.Td1W0CHDk-A4QdlxHSNq8A',
        };
    },
    components: { MapboxMap, MapboxMarker },
    mounted() {

    },
   

    methods: {

    },
};
</script>