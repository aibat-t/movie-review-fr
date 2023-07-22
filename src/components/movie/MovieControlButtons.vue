<template>
  <div class="d-flex flex-row-reverse">
    <button @click="onDeleteHandler" class="btn me-2 text-bg-dark">
      Delete
    </button>
    <router-link :to="{ name: 'movieUpdate' }" class="btn me-2 text-bg-dark"
      >Edit</router-link
    >
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps(["movieId"]);
const emits = defineEmits(["movieToDelete"]);

function onDeleteHandler() {
  emits("movieToDelete", props.movieId);
}
</script>

<style scoped></style>
