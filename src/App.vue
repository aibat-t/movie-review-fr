<template>
  <HeaderNav />
  <RouterView />
</template>

<script>
import HeaderNav from "./components/HeaderNav.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    HeaderNav,
  },
  state: {
    ...mapGetters("user", ["user"]),
  },
  methods: {
    ...mapActions("user", ["fetchAccessToken", "fetchUserDetails"]),
  },
  created() {
    this.fetchAccessToken();
    this.fetchUserDetails();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
