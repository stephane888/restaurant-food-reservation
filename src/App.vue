<template>
  <div id="app">
    <bloc-reservation msg="Welcome to our booking reservation" />
  </div>
</template>

<script>
import BlocReservation from "./components/BlocReservation.vue";

export default {
  name: "App",
  components: {
    BlocReservation,
  },
};
</script>

<style lang="scss">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   margin-top: 60px;
//   display: flex;
//   //justify-content: center;
//   // min-height: 100vh;
//   width: 100%;
//   flex-direction: column;
// }
</style>
