<template>
  <div>
    <!-- max: {{ maxDate }}| min: {{ minDate }} -->
    <div class="myi-5" v-show="!configIsLoading">
      <h6 class="title-steps">
        <span class="ts-icon">
          <b-icon icon="calendar2-date" font-scale="1.2"></b-icon>
        </span>
        <span>{{ this.steps[0].step_title }}:</span>
      </h6>
      <b-calendar
        class="mt-3"
        v-model="value"
        :locale="this.lang"
        block
        nav-button-variant="success"
        selected-variant="success"
        start-weekday="1"
        :hide-header="true"
        @context="onContext"
        v-bind="labels || {}"
        :min="minDate"
        :max="maxDate"
        :date-disabled-fn="dateDisabled"
        @selected="setStepValue"
      ></b-calendar>
    </div>
    <div class="mt-2" v-show="configIsLoading">
      <b-skeleton
        class="mb-3"
        animation="wave"
        width="75%"
        height="20px"
      ></b-skeleton>
      <b-skeleton animation="wave" width="100%" height="220px"></b-skeleton>
    </div>
  </div>
</template>

<script>
import moment from "../js/moment";
import { mapState } from "vuex";
export default {
  name: "BlocReservation",
  components: {},
  props: {},
  data() {
    return {
      /* calendar config */
      configIsLoading: false,
      context: null,
      value: "",
      labels: this.setLabels,
      minDate: "",
      maxDate: "",
    };
  },
  mounted() {
    this.getMinDate();
    this.loadCalendarConfig();
  },
  computed: {
    ...mapState([
      "urlLoad",
      "defaultConfig",
      "calendar_config",
      "lang",
      "steps",
    ]),
  },
  methods: {
    setLabels() {
      return {
        labelPrevYear: this.calendar_config.labels_config.label_prev_year,
        labelPrevMonth: this.calendar_config.labels_config.label_prev_month,
        labelCurrentMonth: this.calendar_config.labels_current_month,
        labelNextMonth: this.calendar_config.labels_config.label_next_month,
        labelNextYear: this.calendar_config.labels_config.label_next_year,
        labelNoDateSelected:
          this.calendar_config.labels_config.label_no_date_selected,
        labelHelp: this.calendar_config.labels_config.label_help,
      };
    },
    getMinDate() {
      const now = moment().toDate();
      // Date minimum
      this.minDate = now;

      //date Maximum
      if (this.defaultConfig && this.defaultConfig.numberOfDisplayedDays) {
        let max = moment().add(this.defaultConfig.numberOfDisplayedDays, "d");
        this.maxDate = max.toDate();
      } else {
        let max = moment().add(2, "M");
        this.maxDate = max.toDate();
      }

      // this.maxDate = maxDate;
    },
    dateDisabled(ymd, date) {
      // Disable weekends (Sunday = `0`, Saturday = `6`) and
      // disable days that fall on the 13th of the month
      const weekday = date.getDay();
      // Return `true` if the date should be disabled
      if (this.defaultConfig && this.defaultConfig.disabledDays) {
        let dayInclude = this.defaultConfig.disabledDays.includes(weekday);
        if (dayInclude) return true;
      }
      if (this.defaultConfig && this.defaultConfig.disabledDates) {
        let jour = moment(date).unix();
        let isDisable = this.defaultConfig.disabledDates.includes(jour);
        if (isDisable) return true;
      }
      return 0;
      //return weekday === 0 || weekday === 6 || day === 13;
    },
    getLang() {
      return this.lang;
    },
    onContext(ctx) {
      this.context = ctx;
    },
    setStepValue(ymd, date) {
      this.$store.dispatch("setStepValue", ymd);
      this.$emit("ev_data", date);
    },
    loadCalendarConfig() {
      this.$store.dispatch("loadCalendarConfig");
      this.getMinDate();
    },
    /* initCalendar(datas) {
      this.$store.dispatch("setDefaultConfig", datas);
      this.calendarConfig = datas;
    }, */
  },
};
</script>

<style lang="scss">
$first-color: rgb(88 148 66);

.calendar {
  margin: 2rem 0;
  width: 100%;
}
.calendar-head {
  border-top: 1px solid black;
  text-align: center;
  position: relative;
}
.cld-date {
  padding: 15px 0;
  margin: 0;
  text-transform: capitalize;
}
.cld-nav {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-between;
  top: 50%;
  transform: translateY(-50%);
  .clt-btn {
    height: 34px;
    min-width: 34px;
    border-radius: 5px;
    background: transparent;
    border: none;
    transition: 0.3s;
    cursor: pointer;
    &:hover {
      background-color: rgba($first-color, 0.3);
    }
  }
}

.label-semaine {
  .week-day {
    //flex: auto;
    text-transform: uppercase;
    min-width: 45px;
    height: 35px;
    background: transparent;
    margin-bottom: 6px;
    border-radius: 0.25px;
    font-size: 12px;
  }
}
.jours-semaine {
  .jour {
    //flex: auto;
    text-transform: uppercase;
    cursor: pointer;
    background: transparent;

    border-radius: 0.25px;
    font-size: 14px;
  }

  .content-day {
    margin: 0 auto;
    max-width: 50px;
    min-height: 52px;
    margin-bottom: 10px;
    width: 100%;
    background-color: transparent;
    transition: 0.3s;
    display: flex;
    justify-content: center;
    flex-direction: column;
    border: 1px solid #959ba7;
    &:hover {
      background-color: rgba($first-color, 0.4);
      border: 1px solid $first-color;
    }
    .day {
      font-size: 16px;
      padding: 10px 0;
    }
    .promo {
      background: black;
      font-size: 12px;
      padding: 7px 0;
      color: white;
      flex: auto;
    }
  }
  .jour--disabled {
    cursor: not-allowed;
    .content-day {
      background-color: rgb(236 237 239);
      color: #959ba7;
      .promo {
        display: none;
      }
      &:hover {
        background-color: rgb(236 237 239);
        color: #959ba7;
      }
    }
  }
}
</style>
