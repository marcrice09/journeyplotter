<template>
  <b-container id="root-app">
    <b-navbar
      variant="light"
      type="light"
      class="navbar d-flex justify-content-between"
    >
      <b-navbar-brand href="#">Travel Recording</b-navbar-brand>
      <b-nav-text>
        <h3>
          <b-badge pill variant="info">Test Project</b-badge>
        </h3></b-nav-text
      >
    </b-navbar>
    <b-row>
      <b-col cols="12" md="4">
        <side-bar v-model="mapMarkers" @update-markers="updateMarkers" />
      </b-col>
      <b-col cols="12" md="8">
        <google-map :config="mapConfig" :apikey="googleKey">
          <GoogleMapMarkers :markers="mapMarkers" />
        </google-map>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import GoogleMap from './components/gmap/GoogleMap';
import GoogleMapMarkers from './components/gmap/GoogleMapMarkers';
import SideBar from './components/SideBar';
import { GoogleKey } from './config';

export default {
  components: {
    GoogleMap,
    GoogleMapMarkers,
    SideBar,
  },
  data() {
    return {
      mapConfig: {
        zoom: 12,
        center: {
          lat: 52.6292567,
          lng: 1.2978802,
        },
      },
      mapMarkers: [],
      googleKey: GoogleKey,
    };
  },
  methods: {
    updateMarkers(value) {
      this.mapMarkers = value;
      this.mapConfig = {
        zoom: 12,
        center: value[0],
      };
    },
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
</style>
