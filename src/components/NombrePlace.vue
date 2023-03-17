<template>
  <div>
    <div class="myi-5">
      <h6 class="title-steps">
        <span class="ts-icon">
          <b-icon icon="person" font-scale="1.3"></b-icon>
        </span>
        <span>{{ this.steps[2].step_title }}</span>
      </h6>
      <div class="hours-content">
        <div class="block-time">
          <div class="time-list">
            <button
              class="time-btn"
              v-for="(place, i) in nombrePlaces"
              :key="i"
              @click="setPlace(place)"
            >
              <span class="time">{{ place }}</span>
              <!-- <span class="tt-discount">-12%</span> -->
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "../js/moment";
import rootConfig from "../rootConfig";
import { mapState } from "vuex";
export default {
  name: "BlocReservation",
  components: {},
  props: {},
  data() {
    return {
      step_title: "Choisir le nombre de place",
      Places: [],
    };
  },
  mounted() {},
  computed: {
    ...mapState(["defaultConfig", "urlLoad", "steps"]),
    nombrePlaces() {
      return this.Places;
    },
  },
  methods: {
    setPlaces(nbrePlaces) {
      this.Places = [];
      for (let i = 1; i <= nbrePlaces; i++) {
        this.Places.push(i);
      }
    },
    loadAvailablePlaces(date, hour_string) {
      let date_string = moment(date).unix();
      rootConfig
        .get(this.urlLoad + "/" + date_string + "/" + hour_string)
        .then((reponse) => {
          if (reponse.data) {
            this.setPlaces(reponse.data.number);
          }
          this.hoursIsLoading = false;
        })
        .catch((er) => {
          console.log("hours error", er);
        });
    },
    setPlace(value) {
      this.$store.dispatch("setStepValue", value);
    },
  },
};
</script>

<style lang="scss"></style>
