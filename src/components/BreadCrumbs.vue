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
import { useRouter } from "vue-router";
import { computed, defineProps } from "vue";

const props = defineProps({
  movieName: String,
});

const router = useRouter();

const previousPage = computed(() => {
  const lastPath = router.options.history.state.back;
  return lastPath ? lastPath : "/";
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
