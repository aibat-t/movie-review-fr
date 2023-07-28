<template>
  <div class="d-flex justify-content-start breadcrumbs align-items-center">
    <router-link :to="previousPage" class="btn btn-bc">Movies</router-link>
    <img src="../assets/next.png" alt="next" class="bredcrumbs-next-img" />
    <router-link to="#" class="btn btn-bc disabled">{{
      props.movieName
    }}</router-link>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  movieName: String,
});

const store = useStore();

const previousPage = computed(() => {
  //const lastPath = router.options.history.state.back;
  const currentPage = store.getters["movie/currentPage"];
  return {
    name: "movies",
    params: {
      page: currentPage,
    },
  };
});
</script>

<style scoped>
.bredcrumbs-next-img {
  height: 14px;
}
.btn-bc {
  border: none;
}
</style>
