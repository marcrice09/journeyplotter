<template>
  <div class="mb-2">
    <validation-observer ref="observer" v-slot="{ handleSubmit }">
      <b-form @submit.stop.prevent="handleSubmit(onSubmit)">
        <BTextInputWithValidation
          rules="required"
          type="text"
          label="Origin address:"
          name="originText"
          v-model="originText"
          placeholder="e.g. Norwich, UK"
        />
        <BTextInputWithValidation
          rules="required"
          type="text"
          label="Destination address:"
          name="destinationText"
          v-model="destinationText"
          placeholder="e.g. London, UK"
        />
        <BDatePickerWithValidation
          rules="required"
          type="text"
          label="Departure Date:"
          name="departureDate"
          v-model="departureDate"
          placeholder=""
        />
        <BDatePickerWithValidation
          rules="required"
          type="text"
          label="Return Date:"
          name="returnDate"
          v-model="returnDate"
          placeholder=""
        />
        <input type="hidden" name="originLat" v-model="originLat" />
        <input type="hidden" name="originLong" v-model="originLong" />
        <input type="hidden" name="destinationLat" v-model="destinationLat" />
        <input type="hidden" name="destinationLong" v-model="destinationLong" />
        <div class="mb-2 mt-2">
          <div v-for="error in errors" :key="error" class="validate-error">
            {{ error }}
          </div>
        </div>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button class="ml-2" @click="resetForm()">Reset</b-button>
      </b-form>
    </validation-observer>
  </div>
</template>

<style>
body {
  padding: 1rem;
}
.validate-error {
  width: 100%;
  margin-top: 0.25rem;
  font-size: 80%;
  color: #dc3545;
}
</style>

<script>
import axios from 'axios';
import { debounce } from 'lodash';
import BTextInputWithValidation from './inputs/BTextInputWithValidation';
import BDatePickerWithValidation from './inputs/BDatePickerWithValidation';
import { GoogleKey } from './../config';

export default {
  components: {
    BTextInputWithValidation,
    BDatePickerWithValidation,
  },
  data() {
    return {
      originText: '',
      destinationText: '',
      departureDate: new Date(),
      returnDate: new Date(),
      originLat: '',
      originLong: '',
      destinationLat: '',
      destinationLong: '',
      locations: [],
      errors: [],
    };
  },
  watch: {
    // Handles internal model changes.
    originText: debounce(function (newVal) {
      if (newVal === '' || newVal === undefined) return;
      this.getLocations('origin');
    }, 500),
    // Handles external model changes.
    destinationText: debounce(function (newVal) {
      if (newVal === '' || newVal === undefined) return;
      this.getLocations('destination');
    }, 500),
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    resetForm() {
      this.originText = '';
      this.destinationText = '';
      this.departureDate = new Date();
      this.returnDate = new Date();
      this.originLat = '';
      this.originLng = '';
      this.destinationLat = '';
      this.destinationLng = '';
      this.locations = [];
      this.$nextTick(() => {
        this.$refs.observer.reset();
        this.$emit('update-markers', this.locations);
      });
    },
    validate() {
      const validates = [];
      if (this.originText === '') {
        validates.push('Origin Address can not be empty.');
      }
      if (this.destinationText === '') {
        validates.push('Destination Address can not be empty.');
      }
      if (this.departureDate === null) {
        validates.push('Departure Date can not be empty.');
      }
      if (this.returnDate === null) {
        validates.push('Return Date can not be empty.');
      }
      if (this.originLat === '' || this.originLng === '') {
        validates.push('Origin Address is not valid.');
      }
      if (this.destinationLat === '' || this.destinationLng === '') {
        validates.push('Destination Address is not valid.');
      }
      this.errors = validates;
      return validates.length === 0; // check if it has error
    },
    onSubmit() {
      if (this.validate() === true) this.submitTrack(); // only submit if no error
    },
    submitTrack() {
      axios
        .post('https://jsonplaceholder.typicode.com/posts', {
          data: {
            originText: this.originText,
            destinationText: this.destinationText,
            departureDate: this.departureDate,
            returnDate: this.returnDate,
            originLat: this.originLat,
            originLng: this.originLng,
            destinationLat: this.destinationLat,
            destinationLng: this.destinationLng,
          },
        })
        .then((response) => {
          if (response.status >= 200 && response.status <= 210) {
            alert('Form submitted!');
          } else {
            alert('Failed to submit!');
          }
        });
    },
    getLocations(type) {
      axios
        .get('https://maps.googleapis.com/maps/api/geocode/json', {
          params: {
            address: type === 'origin' ? this.originText : this.destinationText,
            key: GoogleKey,
          },
        })
        .then((response) => {
          const data = response.data;
          if (response.status === 200) {
            const errorMessage = type === 'origin' ? 'Please input correct origin address' : 'Please input correct destination address';
            if (data.results.length === 0) {
              if (this.errors.includes(errorMessage) === false) {
                this.errors = [errorMessage, ...this.errors];
              }
              if (type === 'origin') {
                this.originLat = '';
                this.orignLong = '';
              } else {
                this.destinationLat = '';
                this.destinationLong = '';
              }
            } else {
              this.errors = this.errors.filter(item => item !== errorMessage);
              const location = data.results[0].geometry.location;
              this.locations = [...this.locations];
              if (type === 'origin') {
                this.originLat = location.lat;
                this.orignLong = location.lng;
                this.locations[0] = location;
              } else {
                this.destinationLat = location.lat;
                this.destinationLong = location.lng;
                if (this.locations.length === 0) this.locations = [location];
                else this.locations[1] = location;
              }
              this.$emit('update-markers', this.locations);
            }
          }
        });
    },
  },
};
</script>
