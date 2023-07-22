<template>
  <div class="card text-bg-color">
    <router-link :to="{ name: 'movieDetails', params: { id: movie.id } }">
      <img :src="posterUrl" class="card-img-top" :alt="movie.name" />
    </router-link>
    <div class="card-body">
      <h6 class="card-title">{{ movie.name }}</h6>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import no_poster_img from "../../assets/no-poster-img.png";

const url = process.env.VUE_APP_API_KEY;

export default {
  name: "MovieItem",
  props: {
    movie: {},
  },
  setup(props) {
    const posterUrl = computed(() => {
      if (props.movie.poster_name) {
        return `${url}/api/v1/poster/${props.movie.poster_name}`;
      }
      return no_poster_img;
    });

    return {
      posterUrl,
    };
  },
};
</script>

<style scoped>
.movie-item {
  position: relative;
  cursor: pointer;
  border-radius: 5px;
  overflow: hidden;
  transition: all 0.2s ease;
  height: 400px;
  margin-bottom: 10px;
}

.card {
  border-radius: 0;
  border-color: white;
  border: none;
}
.card-body {
  padding: 0;
  margin-top: 1rem;
}
.card-title {
  text-align: center;
  font-weight: bolder;
}
.card-img-top {
  height: 350px;
  width: auto;
  border-radius: 0;
  box-shadow: 3px 3px 10px #212529;
}
</style>
