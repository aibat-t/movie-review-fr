<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center disabled">
      <li class="page-item" :class="{ disabled: isInFirstPage }">
        <router-link
          :to="{ name: 'movies', params: { page: currentPage - 1 } }"
          class="page-link text-light bg-dark fw-light"
          >Previous</router-link
        >
      </li>
      <li v-for="page in pages" :key="page.name" class="page-item">
        <router-link
          :to="{ name: 'movies', params: { page: page.name } }"
          class="page-link text-light bg-dark fw-light"
          :class="{ disabled: page.isDisabled }"
          >{{ page.name }}</router-link
        >
      </li>
      <li class="page-item" :class="{ disabled: isInLastPage }">
        <router-link
          :to="{ name: 'movies', params: { page: currentPage + 1 } }"
          class="page-link text-light bg-dark fw-light"
          >Next</router-link
        >
      </li>
    </ul>
  </nav>
</template>

<script>
import { computed } from "vue";

export default {
  name: "MoviePagination",
  props: {
    visibleButtons: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const startPage = computed(() => {
      if (props.currentPage === 1) {
        return 1;
      }

      if (props.currentPage === props.totalPages) {
        return props.totalPages - props.visibleButtons + 1;
      }

      return props.currentPage - 1;
    });

    const pages = computed(() => {
      const range = [];
      for (
        let i = startPage.value;
        i <=
        Math.min(startPage.value + props.visibleButtons - 1, props.totalPages);
        i++
      ) {
        if (i <= 0) {
          continue;
        }
        range.push({
          name: i,
          isDisabled: i === props.currentPage,
        });
      }

      return range;
    });

    const isInFirstPage = computed(() => props.currentPage === 1);
    const isInLastPage = computed(() => props.currentPage === props.totalPages);

    return {
      isInFirstPage,
      isInLastPage,
      pages,
      startPage,
    };
  },
};
</script>

<style scoped></style>
