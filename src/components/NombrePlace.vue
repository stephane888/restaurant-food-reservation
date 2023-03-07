<template>
  <div>
    <div class="myi-5">
      <h6 class="title-steps">
        <span class="ts-icon">
          <b-icon icon="person" font-scale="1.3"></b-icon>
        </span>
        <span>Choisir le nombre de place</span>
      </h6>
      <div class="hours-content">
        <div class="block-time">
          <div class="time-list">
            <button
              class="time-btn"
              v-for="(place, i) in nombrePlaces"
              :key="i"
              @click="setTime(place)"
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
      Places: [],
    };
  },
  mounted() {},
  computed: {
    ...mapState(["defaultConfig", "urlLoad"]),
    nombrePlaces() {
      return this.Places;
    },
    // nombrePlaces() {
    //   if (this.defaultConfig && this.defaultConfig.maxPeoples) {
    //     let nbPlace = [];
    //     let begin = 1;
    //     while (nbPlace.length < this.defaultConfig.maxPeoples) {
    //       nbPlace.push(begin);
    //       console.log("ae");
    //       begin++;
    //     }
    //     return nbPlace;
    //   } else {
    //     return this.Places;
    //   }
    // },
  },
  methods: {
    setPlaces(nbrePlaces) {
      this.Places = [];
      for (let i = 1; i <= nbrePlaces; i++) {
        this.Places.push(i);
      }
      console.log("Nbre places : " + this.Places);
    },
    loadAvailablePlaces(date, hour_string) {
      let date_string = moment(date).unix();
      rootConfig
        .get(this.urlLoad + "/" + date_string + "/" + hour_string)
        .then((reponse) => {
          console.log("hours response", reponse);
          if (reponse.data) {
            this.setPlaces(reponse.data.number);
            console.log(reponse.data.number);
          }
          this.hoursIsLoading = false;
        })
        .catch((er) => {
          console.log("hours error", er);
        });
    },
    setTime(value) {
      this.$store.dispatch("setStepValue", value);
    },
  },
};
</script>

<style lang="scss"></style>
