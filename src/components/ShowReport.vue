<template>
  <div class="report">
    <div
      class="report-box"
      :class="{
        'report-box-success': getReportStatut == 1,
        'report-box-error': getReportStatut != 1,
      }"
    >
      <div class="dot"></div>
      <div class="dot two"></div>
      <div
        class="face"
        :class="{
          'face-happy': getReportStatut == 1,
          'face-sad': getReportStatut != 1,
        }"
      >
        <div class="eye"></div>
        <div class="eye right"></div>
        <div
          class="mouth"
          :class="{
            happy: getReportStatut == 1,
            sad: getReportStatut != 1,
          }"
        ></div>
      </div>
      <div
        class="shadow"
        :class="{
          scale: getReportStatut == 1,
          move: getReportStatut != 1,
        }"
      ></div>
      <div v-if="getReportStatut == 1" class="message">
        <div class="report-title alert">Success!</div>
        <div class="report-description">yay, everything is working.</div>
      </div>
      <div v-else class="message">
        <div class="report-title alert">Error!</div>
        <div class="report-description">oh no, something went wrong.</div>
      </div>

      <button @click="resetApp()" class="button-box">
        <div v-if="getReportStatut == 1" class="report-title green">
          continue
        </div>
        <div v-else class="report-title red">try again</div>
      </button>
    </div>
  </div>
</template>

<script>
// import moment from "../js/moment";
// import rootConfig from "../rootConfig";
import { mapState } from "vuex";
export default {
  name: "BlocReservation",
  computed: {
    ...mapState(["report"]),
    getReportStatut() {
      // console.log("this report:" + this.report);
      // console.log("condition :" + (this.report == 1));
      return this.report;
    },
  },
  methods: {
    resetApp() {
      this.$emit("resetApp");
    },
  },
};
</script>

<style lang="scss">
$white: #fcfcfc;
$gray: #cbcdd3;
$dark: #777777;
$error: #ef8d9c;
$orange: #ffc39e;
$success: #b0db7d;
$secondary: #99dbb4;

@import url("https://fonts.googleapis.com/css?family=Lato:400,700");

$font: "Lato", sans-serif;

.report {
  position: relative;
  margin: auto;
  overflow: hidden;
  width: 100%;
  height: 250px;

  .report-titles {
    font-size: 0.9em;
    font-weight: 100;
    letter-spacing: 3px;
    padding-top: 5px;
    color: $white;
    padding-bottom: 5px;
    text-transform: uppercase;
  }

  .green {
    color: darken($secondary, 20%);
  }

  .red {
    color: darken($error, 10%);
  }

  .alert {
    font-weight: 700;
    letter-spacing: 5px;
  }

  .report-description {
    margin-top: -5px;
    font-size: 0.5em;
    font-weight: 100;
    color: darken($dark, 10%);
    letter-spacing: 1px;
  }

  button,
  .dot {
    cursor: pointer;
  }

  .report-box-success {
    background: linear-gradient(to bottom right, $success 40%, $secondary 100%);
  }

  .report-box-error {
    background: linear-gradient(to bottom left, $error 40%, $orange 100%);
  }

  .report-box {
    position: absolute;
    width: 34%;
    height: 100%;
    left: 33%;
    border-radius: 20px;
    box-shadow: 5px 5px 20px rgba($gray, 10%);
    perspective: 40px;

    .dot {
      width: 8px;
      height: 8px;
      background: $white;
      border-radius: 50%;
      position: absolute;
      top: 4%;
      right: 6%;

      &:hover {
        background: darken($white, 20%);
      }
    }

    .two {
      right: 12%;
      opacity: 0.5;
    }
    .face-happy {
      animation: bounce 1s ease-in infinite;
      .happy {
        border: 2px solid;
        border-color: transparent $dark $dark transparent;
        transform: rotate(45deg);
      }
    }

    .face-sad {
      animation: roll 3s ease-in-out infinite;
      .sad {
        top: 49%;
        border: 2px solid;
        border-color: $dark transparent transparent $dark;
        transform: rotate(45deg);
      }
    }

    .face {
      position: absolute;
      width: 22%;
      height: 22%;
      background: $white;
      border-radius: 50%;
      border: 1px solid $dark;
      top: 21%;
      left: 37.5%;
      z-index: 2;

      .eye {
        position: absolute;
        width: 5px;
        height: 5px;
        background: $dark;
        border-radius: 50%;
        top: 40%;
        left: 20%;
      }

      .right {
        left: 68%;
      }

      .mouth {
        position: absolute;
        top: 43%;
        left: 41%;
        width: 7px;
        height: 7px;
        border-radius: 50%;
      }
    }
    .shadow {
      position: absolute;
      width: 21%;
      height: 3%;
      opacity: 0.5;
      background: $dark;
      left: 40%;
      top: 43%;
      border-radius: 50%;
      z-index: 1;
    }

    .scale {
      animation: scale 1s ease-in infinite;
    }

    .move {
      animation: move 3s ease-in-out infinite;
    }

    .message {
      position: absolute;
      width: 100%;
      text-align: center;
      height: 40%;
      top: 47%;
    }

    .button-box {
      position: absolute;
      background: $white;
      width: 50%;
      height: 15%;
      border-radius: 20px;
      top: 73%;
      left: 25%;
      outline: 0;
      border: none;
      box-shadow: 2px 2px 10px rgba($dark, 0.5);
      transition: all 0.5s ease-in-out;

      &:hover {
        background: darken($white, 5%);
        transform: scale(1.05);
        transition: all 0.3s ease-in-out;
      }
    }

    @keyframes bounce {
      50% {
        transform: translateY(-10px);
      }
    }

    @keyframes scale {
      50% {
        transform: scale(0.9);
      }
    }

    @keyframes roll {
      0% {
        transform: rotate(0deg);
        left: 25%;
      }

      50% {
        left: 60%;
        transform: rotate(168deg);
      }

      100% {
        transform: rotate(0deg);
        left: 25%;
      }
    }

    @keyframes move {
      0% {
        left: 25%;
      }

      50% {
        left: 60%;
      }

      100% {
        left: 25%;
      }
    }
  }
}
</style>
