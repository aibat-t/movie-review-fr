<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <div class="d-flex mb-3 justify-content-between">
          <BreadCrumbs :movieName="movie.name" />
          <MovieControlButtons :movieId="movie.id" @movieToDelete="onDelete" />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-4 poster-img">
        <img :src="posterUrl" :alt="movie.name" class="img-fluid shadow" />
      </div>
      <div class="col-8">
        <div class="movie-header mb-3">{{ movie.name }}</div>
        <div class="row movie-detail">
          <div class="col-2 movie-detail-label">Director</div>
          <div class="col-10 movie-detail-value">{{ movie.director }}</div>
          <div class="col-2 movie-detail-label">Release Date</div>
          <div class="col-10 movie-detail-value">{{ formattedDate }}</div>
          <div class="col-2 movie-detail-label">Synopsis</div>
          <div class="col-10 movie-detail-value">{{ movie.synopsis }}</div>
        </div>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-7">
        <ReviewList />
      </div>
      <div class="col-5"></div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import no_poster_img from "../assets/no-poster-img.png";
import MovieControlButtons from "@/components/movie/MovieControlButtons.vue";
import BreadCrumbs from "@/components/BreadCrumbs.vue";
import ReviewList from "@/components/review/ReviewList.vue";

const url = process.env.VUE_APP_API_KEY;

const route = useRoute();
const router = useRouter();
const store = useStore();
const movie = computed(() => store.getters["movie/currentMovie"]);
const posterUrl = computed(() => {
  if (movie.value.poster_name) {
    return `${url}/api/v1/poster/${movie.value?.poster_name}`;
  }
  return no_poster_img;
});
const formattedDate = computed(() => formatDate(movie.value?.release_date));

function formatDate(strDate) {
  let objectDate = new Date(strDate);

  let day = objectDate.getDate();
  let month = objectDate.getMonth();
  let year = objectDate.getFullYear();

  return `${day}/${month}/${year}`;
}

onMounted(() => {
  store.dispatch("movie/fetchMovieById", route.params.id);
});

function onDelete(id) {
  store.dispatch("movie/deleteMovie", id);
  router.push({ name: "movies" });
}
</script>

<style scoped>
.movie-header {
  font-size: 35px;
  font-weight: bold;
}
.movie-detail {
  font-size: 17.5px;
  row-gap: 10px;
}
.movie-detail-label {
  font-weight: bold;
}
</style>
