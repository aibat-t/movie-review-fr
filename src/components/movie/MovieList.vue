<template>
  <div class="movie-list">
    <div class="row" v-if="isMovieListExist">
      <div class="col-3 mb-4" v-for="movie in movieList" :key="movie.id">
        <MovieItem :movie="movie" :key="movie.name" />
      </div>
    </div>
    <div class="row" v-else>
      <h3>There is no movie posters</h3>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import MovieItem from "./MovieItem.vue";

export default {
  name: "MovieList",
  components: {
    MovieItem,
  },
  props: {
    movieList: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const isMovieListExist = computed(() => {
      return Boolean(Object.keys(props.movieList).length);
    });

    return {
      isMovieListExist,
    };
  },
};
</script>

<style scoped></style>
