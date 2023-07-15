import axios from "@/plugins/axios";
import mutations from "../mutations";

const { MOVIE_LIST, CURRENT_PAGE, TOTAL_PAGES, TOTAL_MOVIES, MOVIE_DETAIL } =
  mutations;

const movieStore = {
  namespaced: true,
  state: {
    movieList: {},
    currentPage: 1,
    totalPages: 0,
    totalMovies: 0,
    visibleButtons: 6,
    perPage: 12,
    currentMovie: {},
  },
  getters: {
    movieList: ({ movieList }) => movieList,
    currentPage: ({ currentPage }) => currentPage,
    paginationInfo: ({
      currentPage,
      totalPages,
      totalMovies,
      visibleButtons,
      perPage,
    }) => {
      return {
        currentPage,
        totalPages,
        totalMovies,
        visibleButtons,
        perPage,
      };
    },
    currentMovie: ({ currentMovie }) => currentMovie,
  },
  mutations: {
    [MOVIE_LIST](state, value) {
      state.movieList = value;
    },
    [CURRENT_PAGE](state, value) {
      state.currentPage = value + 1;
    },
    [TOTAL_PAGES](state, value) {
      state.totalPages = value;
    },
    [TOTAL_MOVIES](state, value) {
      state.totalMovies = value;
    },
    [MOVIE_DETAIL](state, value) {
      state.currentMovie = value;
    },
  },
  actions: {
    async fetchMovieList({ commit }, page) {
      try {
        const res = await axios.get(`/api/v1/movie/page/${page - 1}`);

        if (!Object.keys(res.data).length) {
          console.log("no data found");
          return;
        }
        const resData = res.data;

        const content = resData.content;
        const currentPage = resData.pageable.pageNumber;
        const totalPages = resData.totalPages;
        const totalMovies = resData.totalElements;

        commit(MOVIE_LIST, content);
        commit(CURRENT_PAGE, currentPage);
        commit(TOTAL_PAGES, totalPages);
        commit(TOTAL_MOVIES, totalMovies);
      } catch (err) {
        console.log(err);
      }
    },
    async fetchMovieById({ commit }, id) {
      const res = await axios.get(`/api/v1/movie/${id}`);

      const resData = res.data;

      commit(MOVIE_DETAIL, resData);
    },
  },
};

export default movieStore;
