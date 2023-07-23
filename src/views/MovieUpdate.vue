<template>
  <div class="container mt-4">
    <form @submit.prevent="submit" enctype="multipart/form-data">
      <div class="row px-2">
        <div class="col-4 poster-img d-flex flex-column">
          <img
            :src="preview || posterUrl"
            alt="downloaded file"
            class="img-fluid shadow"
            :class="{ hide: hide }"
          />
          <label for="file-upload" class="custom-file-upload">
            Upload
            <input
              type="file"
              class="movie-poster-upload"
              id="file-upload"
              accept="image/png"
              @change="handleImageUpload($event.target)"
            />
          </label>
        </div>
        <div class="col-8">
          <div class="row">
            <div class="col-3">
              <label for="movie-name" class="col-form-label label">Name</label>
            </div>
            <div class="col-9">
              <input
                v-model="form.name.value"
                type="text"
                class="form-control"
                id="movie-name"
                placeholder="Enter movie name"
                required
                @blur="form.name.blur"
              />
              <small
                v-if="form.name.errors.required && form.name.touched"
                class="invalid-message"
                >Name is required</small
              >
            </div>
          </div>
          <div class="row">
            <div class="col-3">
              <label for="movie-date" class="col-form-label label"
                >Release date</label
              >
            </div>
            <div class="col-9">
              <input
                v-model="form.release_date.value"
                type="date"
                class="form-control"
                id="movie-date"
                placeholder="Enter movie release date"
                required
                @blur="form.release_date.blur"
              />
              <small
                v-if="
                  form.release_date.errors.required && form.release_date.touched
                "
                class="invalid-message"
                >Release date is required</small
              >
            </div>
          </div>
          <div class="row">
            <div class="col-3">
              <label for="movie-director" class="col-form-label label"
                >Director</label
              >
            </div>
            <div class="col-9">
              <input
                v-model="form.director.value"
                type="text"
                class="form-control"
                id="movie-director"
                placeholder="Enter movie director"
                @blur="form.director.blur"
                required
              />
              <small
                v-if="form.director.errors.required && form.director.touched"
                class="invalid-message"
                >Release date is required</small
              >
            </div>
          </div>
          <div class="row">
            <div class="col-3">
              <label for="movie-synopsis" class="col-form-label label"
                >Synopsis</label
              >
            </div>
            <div class="col-9">
              <textarea
                v-model="form.synopsis.value"
                class="form-control"
                id="movie-synopsis"
                rows="5"
                placeholder="What is the movie about"
                @blur="form.synopsis.blur"
                required
              ></textarea>
              <small
                v-if="form.synopsis.errors.required && form.synopsis.touched"
                class="invalid-message"
                >Release date is required</small
              >
              <div class="d-flex flex-row-reverse mt-3">
                <button type="submit" class="btn btn-dark">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useForm } from "@/use/form";
import axios from "@/plugins/axios";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { reactive, ref, computed, onMounted } from "vue";
import no_poster_img from "../assets/no-poster-img.png";

const required = (val) => !!val;
const url = process.env.VUE_APP_API_KEY;

const router = useRouter();
const store = useStore();
const route = useRoute();

const movie = computed(() => store.getters["movie/currentMovie"]);
const posterUrl = computed(() => {
  if (movie.value.poster_name) {
    return `${url}/api/v1/poster/${movie.value?.poster_name}`;
  }
  return no_poster_img;
});

const form = useForm({
  id: {
    value: movie.value.id,
  },
  name: {
    value: movie.value.name,
    validators: { required },
  },
  release_date: {
    value: dateToYYYYMMDD(movie.value.release_date),
    validators: { required },
  },
  director: {
    value: movie.value.director,
    validators: { required },
  },
  synopsis: {
    value: movie.value.synopsis,
    validators: { required },
  },
});

let image = reactive({});
const preview = ref("");
const hide = ref(true);

async function submit() {
  try {
    const responseDetails = await axios.put("/api/v1/movie", formed(form));
    const id = responseDetails.data?.id || 0;
    const formData = new FormData();

    if (id) {
      formData.append("id", id);
      if (image.name) {
        formData.append("image", image);
        await axios.post("/api/v1/poster", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
    }

    if (responseDetails.status === 200) {
      router.push({ name: "movieDetails", params: { id: id } });
    }
  } catch (error) {
    console.log(error);
  }
}

function handleImageUpload(event) {
  hide.value = true;
  if (event.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      preview.value = e.target.result;
    };
    image = event.files[0];
    reader.readAsDataURL(event.files[0]);
    hide.value = false;
  }
}

function formed(form = {}) {
  return Object.entries(form)
    .filter(([key]) => key !== "valid")
    .reduce((acc, [key, val]) => {
      acc[key] = val.value;
      return acc;
    }, {});
}

function dateToYYYYMMDD(d) {
  const date = new Date(d);
  if (isValidDate(date)) {
    return (
      d &&
      new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000)
        .toISOString()
        .split("T")[0]
    );
  }
}

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

onMounted(() => {
  store.dispatch("movie/fetchMovieById", route.params.id);
});
</script>

<style scoped>
.label {
  font-weight: bold;
}
.row + .row {
  margin-top: 20px;
}
input[type="file"] {
  display: none;
}
.custom-file-upload {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
}
</style>
