<template>
  <div>
    <div class="multi-step-form">
      <form v-if="!show_login_form" class="form" @submit="submitStep">
        <slot name="header"></slot>

        <!-- <transition-group name="slide-fade" mode="eout-in"> -->
        <div v-show="currentStep == 0" key="first" class="animate">
          <vue-calendar @ev_data="ev_date_value"></vue-calendar>
        </div>
        <div v-show="currentStep == 1" key="second" class="animate">
          <time-display
            ref="timedisplay"
            @ev_hours="ev_hours_value"
          ></time-display>
        </div>
        <div v-show="currentStep == 2" key="third" class="animate">
          <nombre-place ref="placesdisplay"></nombre-place>
        </div>
        <div v-show="currentStep == 3" key="four" class="animate">
          <display-info @setReservation="setReservation"></display-info>
        </div>
        <div v-show="currentStep == 4" key="five" class="animate">
          <show-report @resetApp="resetApp"></show-report>
        </div>
        <!-- </transition-group> -->
      </form>
      <!-- step reservation -->
      <loginRegister
        v-if="show_login_form"
        actionAfterRegister="emit_even_register"
        action-after-login="emit_even"
        :showModalSuccess="false"
        ref="LoginRegister"
      ></loginRegister>
      <!-- steps :
      <pre>{{ steps }}</pre> -->
    </div>
  </div>
</template>

<script>
import VueCalendar from "./VueCalendar.vue";
import TimeDisplay from "./TimeDisplay.vue";
import NombrePlace from "./NombrePlace.vue";
import DisplayInfo from "./DisplayInfo";
import ShowReport from "./ShowReport";
import { mapState } from "vuex";
import users from "../users";
export default {
  name: "MultiStepForm",
  components: {
    VueCalendar,
    TimeDisplay,
    NombrePlace,
    DisplayInfo,
    ShowReport,
    loginRegister: () =>
      import("drupal-vuejs/src/App/components/LoginRegister.vue"),
  },
  props: {},
  data() {
    return {
      activeStepIndex: 0,
    };
  },
  computed: {
    ...mapState(["currentStep", "steps", "user", "show_login_form"]),
    canPrev() {
      return this.activeStepIndex > 0;
    },
    canNext() {
      return this.steps.length && this.steps[this.activeStepIndex].step_valid;
    },
  },
  mounted() {
    this.check_if_user_connected();
    this.check_if_user_register();
    this.getCurrentUser();
  },
  methods: {
    ev_date_value(date) {
      this.$refs.timedisplay.loadAvailableHours(date);
    },
    ev_hours_value(date, hour) {
      this.$refs.placesdisplay.loadAvailablePlaces(date, hour);
    },
    submitStep(ev) {
      ev.preventDefault();
      // if (!this.steps[this.activeStepIndex].step_valid) {
      //   this.$emit("validateStep", this.activeStepIndex);
      //   return false;
      // }
      // if (this.activeStepIndex === this.steps.length) {
      //   this.$emit("onComplete");
      //   return false;
      // }
      //this.activeStepIndex++;
      // while (this.steps[this.activeStepIndex].step_skip === true) {
      //   this.activeStepIndex++;
      // }
    },
    setReservation() {
      if (this.user) {
        this.$store.dispatch("setReservation");
      } else {
        this.$store.commit("SET_SHOW_LOGIN_FORM", true);
      }
    },
    /**
     * Permet de verifier si un utilisateur s'est connecté.
     */
    check_if_user_connected() {
      document.addEventListener(
        "login_rx_vuejs__user_is_login",
        () => {
          this.getCurrentUser().then(() => {
            // Ajouter votre logique ici.
            this.$store.dispatch("setReservation");
          });
        },
        false
      );
    },
    /**
     * Permet de verifier si un utilisateur s'est enregistrer
     */
    check_if_user_register() {
      document.addEventListener(
        "login_rx_vuejs__user_is_register",
        () => {
          // declanchera l'enenement login_rx_vuejs__user_is_login
          this.$refs.LoginRegister.connexionUser(this.$store.state.form);
        },
        false
      );
    },
    /**
     * Recupere les informations de l'utilisateur s'il est connecté.
     */
    getCurrentUser() {
      return new Promise((resolv, reject) => {
        users
          .getCurrentUser()
          .then((user) => {
            if (user) {
              this.$store.commit("SET_USER", user);
              resolv(user);
            }
          })
          .catch((er) => {
            reject(er);
          });
      });
    },
    /**
     * Permet de re-initialiser l'application.
     */
    resetApp() {
      this.$store.dispatch("resetApp");
    },
  },
};
</script>

<style lang="scss">
$first-color: rgb(88 148 66);
$gray-color: #f8f9fa;
a {
  color: #42b983;
}
.ts-icon {
  font-size: 16px;
  margin-right: 8px;
}
.title-steps {
  color: black;
  font-size: 14px;
  text-align: left;
  margin-bottom: 25px;
  font-weight: bold;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
}
.multi-step-form {
  overflow: hidden;
  // max-height: 500px;
  .login-page {
    min-height: 400px;
  }
}
.msf-action {
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
}
.step-btn {
  border: 1px solid black;
  background: transparent;
  padding: 1rem 2rem;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    background: #42b983;
    color: white;
    border-color: #42b983;
  }
  &__prev {
    border-color: #6f6f6f;
    &:hover {
      background: #131313;
      border-color: #131313;
    }
  }
}
.hours-content {
  text-align: left;
  .block-time {
    margin-bottom: 30px;
  }
  .time-title {
    font-size: 13px;
    color: black;
    text-transform: uppercase;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .time-list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 10px;
    .active-btn {
      transition: background-color 0.5s, color 0.5s;
      &:hover {
        background-color: $first-color;
        color: white;
      }
    }
    .desabled-btn {
      background-color: rgba(205, 205, 205, 0.3);
    }
  }
  .time-btn {
    min-width: 80px;
    max-width: 162px;
    padding: 12px 18px;
    background: transparent;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    border: 1px solid rgb(91, 91, 91);
    transition: border 0.4s, background 0.3s, box-shadow 0.3s, color 0.3s;
    font-weight: bold;
    flex: 1 1 20%;
    margin-bottom: 15px;
    position: relative;
    &:hover {
      //background-color: rgba($first-color, 0.2);
      color: $first-color;
      border: 1px solid $first-color;
    }
    &:focus,
    &:active {
      box-shadow: 0px 0px 6px $first-color;
      border-color: $first-color;
    }
    .tt-discount {
      padding: 7px 4px;
      background-color: rgb(59, 58, 58);
      color: white;
      border-radius: 2px;
      position: absolute;
      bottom: -17px;
      line-height: 1;
      left: 50%;
      width: 50%;
      text-align: center;
      transform: translateX(-50%);
    }
  }
}
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.4s ease;
}
.slide-fade-leave-active {
  // transform: translateX(10px);
  transition: all 0.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.animate {
  transition: opacity 0.4s, transform 0.3s;
  animation: animateFade 0.4s linear;
}
@keyframes animateFade {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
