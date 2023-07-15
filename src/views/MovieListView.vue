<template>
  <div class="container mt-5 text-center">
    <MovieList :movieList="movieList" />
    <MoviePagination
      :visibleButtons="paginationInfo.visibleButtons"
      :totalPages="paginationInfo.totalPages"
      :perPage="paginationInfo.perPage"
      :currentPage="paginationInfo.currentPage"
    />
  </div>
</template>

<script>
import MovieList from "@/components/movie/MovieList.vue";
import MoviePagination from "@/components/movie/MoviePagination.vue";

import { onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "MovieListView",
  components: {
    MovieList,
    MoviePagination,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const auth = computed(() => store.getters["user/auth"]);
    const movieList = computed(() => store.getters["movie/movieList"]);
    const paginationInfo = computed(
      () => store.getters["movie/paginationInfo"]
    );

    watch(
      () => route.params.page,
      (newPage) => fetchMovies(newPage)
    );

    onMounted(() => {
      fetchMovies(route.params.page);
    });

    const fetchMovies = (page) => {
      if (!page) {
        page = 1;
      }
      store.dispatch("movie/fetchMovieList", page);
    };

    return {
      auth,
      movieList,
      paginationInfo,
    };
  },
};
</script>
