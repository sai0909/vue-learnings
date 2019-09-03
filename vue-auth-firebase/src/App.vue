<template>
  <div id="app">
    <app-header v-if="showHeader"></app-header>
    <router-view />
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700");
@import url("https://fonts.googleapis.com/css?family=Lato:700");
@import url("https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");

html,
body {
  height: 100%;
}

body {
  background: #fbfbfb;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}



@keyframes pulse {
    0% {
        background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
        background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
        background-color: rgba(165, 165, 165, 0.1);
    }
}

</style>
<script>
import header from "./components/Header.vue";
export default {
  components: {
    "app-header": header
  },
  created() {
    this.$store.dispatch("refreshLogin");
  },
  computed:{
    showHeader(){
      return this.$store.state.token;
    }
  }
};
</script>
