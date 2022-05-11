<script>
export default {
  props: {
    markers: Array,
  },
  computed: {
    map() {
      return this.$parent.map;
    },
    google() {
      return this.$parent.google;
    },
  },
  data() {
    return {
      genMarkers: [],
    };
  },
  methods: {
    generateMarkers() {
      // Add new markers
      this.markers.forEach((marker, index) => {
        const { Marker, LatLng } = this.google.maps;
        this.genMarkers.push(
          new Marker({
            title: index === 0 ? 'Origin' : 'Destination',
            position: new LatLng(marker.lat, marker.lng),
            map: this.map,
          }),
        );
      });
    },
  },
  watch: {
    markers() {
      // Remove old markers
      this.genMarkers.forEach((marker) => {
        marker.setMap(null);
      });
      this.genMarkers = [];

      // Add new markers
      this.generateMarkers();
    },
  },
  mounted() {
    // Add new markers
    this.generateMarkers();
  },
  render() {
    return null;
  },
};
</script>
