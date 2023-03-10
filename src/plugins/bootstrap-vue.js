import Vue from "vue";

import {
  BootstrapVue,
  BIcon,
  BIconClock,
  BIconCalendar2Date,
  BIconPerson,
  BIconFilterSquare,
  BIconChevronRight,
  BIconBullseye,
  BIconCheck,
} from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.component("BIcon", BIcon);
Vue.component("BIconClock", BIconClock);
Vue.component("BIconPerson", BIconPerson);
Vue.component("BIconCheck", BIconCheck);
Vue.component("BIconFilterSquare", BIconFilterSquare);
Vue.component("BIconChevronRight", BIconChevronRight);
Vue.component("BIconBullseye", BIconBullseye);
Vue.component("BIconCalendar2Date", BIconCalendar2Date);
