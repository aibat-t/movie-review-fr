<template>
  <header class="p-3 text-bg-dark">
    <div class="container">
      <div
        class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
      >
        <ul
          class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"
        >
          <li>
            <RouterLink to="/" class="nav-link px-2 text-white"
              >Home</RouterLink
            >
          </li>
          <li>
            <RouterLink to="/movies" class="nav-link px-2 text-white"
              >Movies</RouterLink
            >
          </li>
        </ul>

        <div class="text-end" v-if="!auth">
          <RouterLink
            to="/login"
            type="button"
            class="btn btn-outline-light me-2"
            >Login</RouterLink
          >
          <RouterLink
            to="/register"
            type="button"
            class="btn btn-outline-light me-2"
            >Register</RouterLink
          >
        </div>
        <div class="text-end" v-else>
          <RouterLink
            to="/movie/add"
            type="button"
            class="btn btn-outline-light me-2"
            >Create new</RouterLink
          >
          <button
            type="button"
            class="btn btn-outline-light me-2"
            @click.prevent="initLogout"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import router from "@/router";
export default {
  name: "HeaderNav",
  computed: {
    ...mapGetters("user", ["auth"]),
  },
  methods: {
    ...mapActions("user", ["logout"]),
    initLogout() {
      this.logout();

      router.push("/");
    },
  },
};
</script>
