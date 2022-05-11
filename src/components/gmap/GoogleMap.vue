<template>
  <div id="map">
    <!-- suspend mount children until google or map value is valid. -->
    <template v-if="!!this.google && !!this.map">
      <slot />
    </template>
  </div>
</template>
<script>
import GoogleMapsApiLoader from 'google-maps-api-loader';

export default {
  props: {
    config: Object,
    apikey: String,
  },
  data() {
    return {
      google: null,
      map: null,
    };
  },
  mounted() {
    GoogleMapsApiLoader({
      apiKey: this.apikey,
    }).then((google) => {
      this.google = google;
      this.initMap();
    });
  },
  watch: {
    config(newVal) {
      if (!this.map) return;
      this.map.setOptions(newVal);
    },
  },
  methods: {
    initMap() {
      const mapContainer = this.$el;
      const { Map } = this.google.maps;
      this.map = new Map(mapContainer, this.config);
    },
  },
};
</script>

<style>
#map {
  height: 100vh;
  width: 100%;
}
</style>
