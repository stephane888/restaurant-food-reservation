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
        step_title: "Choose a booking date",
        step_no: 1,
        step_valid: false,
        step_skip: false,
        step_name: "Date de reservation",
        step_icon: "calendar2-date",
        value: "",
      },
      {
        step_title: "Choose a time",
        step_no: 2,
        step_valid: false,
        step_skip: true,
        step_name: "Heure de reservation",
        step_icon: "clock",
        value: "",
        period_name: "",
        discount: "",
      },
      {
        step_title: "Choose the number of places",
        step_no: 3,
        step_valid: false,
        step_skip: false,
        step_icon: "person",
        step_name: "Nombre de places",
        value: "",
      },
      {
        step_title: "Reservation report",
        step_no: 4,
        step_valid: false,
        step_skip: false,
        step_icon: "bullseye",
        step_name: "Bilan de la reservation",
        value: "",
      },
      {
        step_title: "",
        step_no: 5,
        step_valid: false,
        step_skip: false,
        step_icon: "journals",
        step_name: "rapport d'enregistrement de la reservation",
        value: "",
      },
    ],
    currentStep: 0,
    urlLoad: "/booking-system/dates",
    finalUrl: "/booking-system/set-reservation",
    defaultConfig: null,
    /**
     * Indique le status de l'action.
     */
    report: 0,
    lang: "en",
    calendar_config: {},
    /**
     * Status chargement de la configuration.
     */
    configIsLoading: false,
  },
  getters: {},
  mutations: {
    SET_STEP_ONE_CONFIG(state, config) {
      state.calendar_config = config;
    },
    SET_STEPS_NAME(state, payload) {
      payload = Object.values(payload);
      for (let i = 0; i < state.steps.length; i++) {
        state.steps[i].step_name =
          typeof payload[i] !== "undefined"
            ? payload[i].name
            : state.steps[i].step_name;
      }
    },
    SWITCH_LOADING_STATE(state, value) {
      state.configIsLoading = value;
    },
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
        state.steps[state.currentStep].step_valid = true;
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
    SET_REPORT_VALUE(state, value) {
      state.report = value;
    },
    DISABLED_BANNER(state) {
      //Desactivation de toutes les étapes
      for (let i = 0; i < state.steps.length; i++) {
        state.steps[i].value = "";
        state.steps[i].step_valid = false;
      }
    },
    RESET_APP(state) {
      //activation de la première saut sur celle-ci
      state.steps[0].step_valid = true;
      state.currentStep = 0;
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
    setReportValue({ commit }, payload) {
      commit("SET_REPORT_VALUE", payload.report);
      commit("SET_STEP_VALUE", payload.message);
      commit("DISABLED_BANNER");
    },
    resetApp({ commit }) {
      commit("SWITCH_LOADING_STATE", true);
      commit("RESET_APP");
      this.dispatch("loadCalendarConfig");
    },
    /**
     * Effectue la sauveharde de la reservation.
     *
     * @param {*} param
     */
    setReservation({ state }) {
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
          console.log("reservation response", response.data);
          this.dispatch("setReportValue", {
            report: 1,
            message: "success",
          });
        })
        .catch((er) => {
          console.log("hours error", er);
          this.dispatch("setReportValue", {
            report: 0,
            message: "error",
          });
        });
    },

    /**
     * get app configurations
     * @param {*} param0
     */
    loadCalendarConfig({ commit, state }) {
      commit("SWITCH_LOADING_STATE", true);
      console.log(state.urlLoad);
      rootConfig
        .get(state.urlLoad)
        .then((rep) => {
          console.log("config response", rep.data);
          if (rep.data) commit("SET_DEFAULT_CONFIG", rep.data);
          commit("SET_STEPS_NAME", rep.data.configs.steps_labels);
          commit("SET_STEP_ONE_CONFIG", rep.data.configs.step1);
          commit("SWITCH_LOADING_STATE", false);
        })
        .catch((er) => {
          console.log("Calendar config error", er);
        });
    },
  },
  modules: {},
});
