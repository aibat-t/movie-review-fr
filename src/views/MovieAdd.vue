<template>
  <div class="container mt-4">
    <form @submit.prevent="submit" enctype="multipart/form-data">
      <div class="row px-2">
        <div class="col-4 poster-img">
          <label for="file-upload" class="custom-file-upload">
            Custom Upload
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
            <div class="col-2">
              <label for="movie-name" class="col-form-label label">Name</label>
            </div>
            <div class="col-8">
              <input
                v-model="form.name.value"
                type="text"
                class="form-control"
                id="movie-name"
                placeholder="Enter movie name"
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
            <div class="col-2">
              <label for="movie-date" class="col-form-label label"
                >Release date</label
              >
            </div>
            <div class="col-8">
              <input
                v-model="form.release_date.value"
                type="date"
                class="form-control"
                id="movie-date"
                placeholder="Enter movie release date"
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
            <div class="col-2">
              <label for="movie-director" class="col-form-label label"
                >Director</label
              >
            </div>
            <div class="col-8">
              <input
                v-model="form.director.value"
                type="text"
                class="form-control"
                id="movie-director"
                placeholder="Enter movie director"
                @blur="form.director.blur"
              />
              <small
                v-if="form.director.errors.required && form.director.touched"
                class="invalid-message"
                >Release date is required</small
              >
            </div>
          </div>
          <div class="row">
            <div class="col-2">
              <label for="movie-synopsis" class="col-form-label label"
                >Synopsis</label
              >
            </div>
            <div class="col-8">
              <textarea
                v-model="form.synopsis.value"
                class="form-control"
                id="movie-synopsis"
                cols="10"
                placeholder="What is the movie about"
                @blur="form.synopsis.blur"
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
import { useRouter } from "vue-router";
import { ref } from "vue";

const required = (val) => !!val;

const router = useRouter();

const form = useForm({
  name: {
    value: "",
    validators: { required },
  },
  release_date: {
    value: "",
    validators: { required },
  },
  director: {
    value: "",
    validators: { required },
  },
  synopsis: {
    value: "",
    validators: { required },
  },
});

let image = ref("");

async function submit() {
  try {
    const responseDetails = await axios.post("/api/v1/movie", formed(form));

    //TODO не видит форму
    const id = responseDetails.data?.id || 0;
    const formData = new FormData();
    if (id) {
      formData.append("image", image);
      formData.append("id", id);
    }
    console.log(formData);

    const responseImage = await axios.post("/api/v1/poster", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (responseDetails.status === 200 && responseImage.status == 200) {
      router.push({ name: "home" });
    }
  } catch (error) {
    console.log(error);
  }
}

function handleImageUpload(event) {
  console.log("file up");
  image = event.files[0];
}

// generateURL(file) {
//     let fileSrc = URL.createObjectURL(file);
//     setTimeout(() => {
//         URL.revokeObjectURL(fileSrc);
//     }, 1000);
//     return fileSrc;
// },

function formed(form = {}) {
  return Object.entries(form)
    .filter(([key]) => key !== "valid")
    .reduce((acc, [key, val]) => {
      acc[key] = val.value;
      return acc;
    }, {});
}
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
