<template>
  <div>
    <div class="myi-5" v-show="!hoursIsLoading">
      <h6 class="title-steps">
        <span class="ts-icon">
          <b-icon icon="clock" font-scale="1.2"></b-icon>
        </span>
        {{ this.steps[1].step_title }}
      </h6>
      <div class="hours-content">
        <div class="block-time" v-for="(time, index) in allTime" :key="index">
          <h5 class="time-title">{{ time.name }}</h5>
          <div class="time-list">
            <button
              class="time-btn"
              :class="{
                'active-btn': heure.status,
                'desabled-btn': !heure.status,
              }"
              v-for="(heure, i) in time.times"
              :key="i"
              :disabled="!heure.status"
              @click="setTime(heure.hour, time.discount, time.name)"
            >
              <span class="time">{{ heure.hour }}</span>
              <span class="tt-discount" v-show="time.discount">
                {{ time.discount }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-2" v-show="hoursIsLoading">
      <div class="mb-4">
        <b-skeleton
          class="mb-3"
          animation="wave"
          width="40%"
          height="20px"
        ></b-skeleton>
        <div class="row">
          <div class="col-3 mb-2">
            <b-skeleton animation="wave" height="30px"></b-skeleton>
          </div>
          <div class="col-3 mb-2">
            <b-skeleton animation="wave" height="30px"></b-skeleton>
          </div>
          <div class="col-3 mb-2">
            <b-skeleton animation="wave" height="30px"></b-skeleton>
          </div>
          <div class="col-3 mb-2">
            <b-skeleton animation="wave" height="30px"></b-skeleton>
          </div>
          <div class="col-3 mb-2">
            <b-skeleton animation="wave" height="30px"></b-skeleton>
          </div>
          <div class="col-3 mb-2">
            <b-skeleton animation="wave" height="30px"></b-skeleton>
          </div>
          <div class="col-3 mb-2">
            <b-skeleton animation="wave" height="30px"></b-skeleton>
          </div>
          <div class="col-3 mb-2">
            <b-skeleton animation="wave" height="30px"></b-skeleton>
          </div>
        </div>
      </div>
      <div class="mb-4">
        <b-skeleton class="mb-3" animation="wave" width="40%"></b-skeleton>
        <div class="row">
          <div class="col-3 mb-2">
            <b-skeleton animation="wave" height="30px"></b-skeleton>
          </div>
          <div class="col-3 mb-2">
            <b-skeleton animation="wave" height="30px"></b-skeleton>
          </div>
          <div class="col-3 mb-2">
            <b-skeleton animation="wave" height="30px"></b-skeleton>
          </div>
          <div class="col-3 mb-2">
            <b-skeleton animation="wave" height="30px"></b-skeleton>
          </div>
          <div class="col-3 mb-2">
            <b-skeleton animation="wave" height="30px"></b-skeleton>
          </div>
          <div class="col-3 mb-2">
            <b-skeleton animation="wave" height="30px"></b-skeleton>
          </div>
          <div class="col-3 mb-2">
            <b-skeleton animation="wave" height="30px"></b-skeleton>
          </div>
          <div class="col-3 mb-2">
            <b-skeleton animation="wave" height="30px"></b-skeleton>
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
  name: "TimeDisplay",
  components: {},
  props: {},
  data() {
    return {
      hoursIsLoading: false,
      allTime: [],
      date: "",
    };
  },
  mounted() {},
  computed: {
    ...mapState(["urlLoad", "steps"]),
  },
  methods: {
    loadAvailableHours(date) {
      this.date = date;
      this.hoursIsLoading = true;
      let date_string = moment(date).unix();

      rootConfig
        .get(this.urlLoad + "/" + date_string)
        .then((reponse) => {
          if (reponse.data) this.setAllTime(reponse.data);
          this.hoursIsLoading = false;
        })
        .catch((er) => {
          console.log("hours error", er);
        });
    },
    setAllTime(data) {
      this.allTime = data;
    },
    setTime(value, discount, period_name) {
      this.$emit("ev_hours", this.date, value);
      this.$store.dispatch("setStepValue", value);
      const payload = {
        period_name: period_name,
        discount: discount,
      };
      this.$store.dispatch("setHourSuplDatas", payload);
    },
  },
};
</script>

<style lang="scss"></style>
