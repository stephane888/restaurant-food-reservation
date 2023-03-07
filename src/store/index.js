import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
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
  },
  modules: {},
});
