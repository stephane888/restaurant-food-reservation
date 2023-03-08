import Vue from "vue";
import Vuex from "vuex";
import moment from "../js/moment";
import rootConfig from "../rootConfig";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //to login
    form: {
      name: [{ value: "" }],
      mail: [{ value: "" }],
    },
    // Donnée de l'utilisateur connecté.
    user: null,
    show_login_form: false,
    steps: [
      {
        step_no: 1,
        step_valid: false,
        step_skip: false,
        step_name: "Date",
        step_icon: "calendar2-date",
        value: "",
      },
      {
        step_no: 2,
        step_valid: false,
        step_skip: true,
        step_name: "Heure",
        step_icon: "clock",
        value: "",
        period_name: "",
        discount: "",
      },
      {
        step_no: 3,
        step_valid: false,
        step_skip: false,
        step_icon: "person",
        step_name: "Offres",
        value: "",
      },
      {
        step_no: 4,
        step_valid: false,
        step_skip: false,
        step_icon: "bullseye",
        step_name: "Choisir une offre",
        value: "",
      },
    ],
    currentStep: 0,
    urlLoad: "/booking-system/dates",
    finalUrl: "/booking-system/set-reservation",
    defaultConfig: null,
  },
  getters: {},
  mutations: {
    SET_HOUR_SUPL_DATAS(state, payload) {
      state.steps[1].period_name = payload.period_name;
      state.steps[1].discount = payload.discount;
    },
    SET_CURRENT_STEP(state, stepIndex) {
      state.currentStep = stepIndex;
    },
    SET_STEP_VALUE(state, value) {
      state.steps[state.currentStep].value = value;
      state.steps[state.currentStep].step_valid = true;
      if (state.currentStep + 1 < state.steps.length) {
        for (let i = state.currentStep + 1; i < state.steps.length; i++) {
          state.steps[i].value = "";
          state.steps[i].step_valid = false;
        }
        state.currentStep++;
      }
    },
    SET_DEFAULT_CONFIG(state, value) {
      state.defaultConfig = value;
    },
    SET_USER(state, value) {
      state.user = value;
    },
    SET_SHOW_LOGIN_FORM(state, value) {
      state.show_login_form = value;
    },
  },
  actions: {
    setCurrentStep({ commit }, stepIndex) {
      commit("SET_CURRENT_STEP", stepIndex);
    },
    setStepValue({ commit }, value) {
      commit("SET_STEP_VALUE", value);
    },
    setDefaultConfig({ commit }, datas) {
      commit("SET_DEFAULT_CONFIG", datas);
    },
    setHourSuplDatas({ commit }, payload) {
      commit("SET_HOUR_SUPL_DATAS", payload);
    },
    /**
     * Effectue la sauveharde de la reservation.
     *
     * @param {*} param
     */
    setReservation({ state, dispatch }) {
      // console.log(this.steps);
      let day = moment(state.steps[0].value).unix();
      let hour = state.steps[1].value;
      let period = state.steps[1].period_name;
      let reduction = state.steps[1].discount;
      let seats = state.steps[2].value;
      const reservation = {
        reservation_date: day,
        number_of_places: seats,
        time_of_reservation: hour,
        periode_name: period,
        reservation_reduction: reduction,
      };
      console.log(reservation);
      rootConfig
        .post(state.finalUrl, reservation)
        .then((response) => {
          console.log("reservation response", response);
          dispatch("setStepValue", response);
        })
        .catch((er) => {
          console.log("hours error", er);
        });
    },
  },
  modules: {},
});
