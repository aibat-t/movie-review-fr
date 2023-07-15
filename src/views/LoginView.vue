<template>
  <main class="form-signin w-100 m-auto">
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

      <div class="form-floating">
        <input
          v-model="form.email.value"
          type="email"
          class="form-control"
          :class="{ 'is-invalid': !form.email.valid && form.email.touched }"
          id="floatingInput"
          placeholder="name@example.com"
          @blur="form.email.blur"
        />
        <small
          v-if="form.email.errors.required && form.email.touched"
          class="invalid-message"
          >Email field is required</small
        >
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating">
        <input
          v-model="form.password.value"
          type="password"
          class="form-control"
          :class="{
            'is-invalid': !form.password.valid && form.password.touched,
          }"
          id="floatingPassword"
          placeholder="Password"
          @blur="form.password.blur"
        />
        <small
          v-if="form.password.errors.required && form.password.touched"
          class="invalid-message"
          >Password field is required</small
        >
        <small
          v-else-if="form.password.errors.minLength && form.password.touched"
          class="invalid-message"
          >Password length can't be less then 8. Now it is
          {{ form.password.value.length }}</small
        >
        <label for="floatingPassword">Password</label>
      </div>
      <button
        class="w-100 btn btn-lg btn-dark"
        type="submit"
        :disabled="!form.valid"
      >
        Sign in
      </button>
    </form>
  </main>
</template>

<script>
import axios from "@/plugins/axios";
import { useRouter } from "vue-router";
import { useForm } from "@/use/form";
import { useStore } from "vuex";

const required = (val) => !!val;
const minLength = (num) => (val) => val.length >= num;

export default {
  name: "LoginView",
  setup() {
    const form = useForm({
      email: {
        value: "",
        validators: { required },
      },
      password: {
        value: "",
        validators: { required, minLength: minLength(8) },
      },
    });

    const router = useRouter();
    const store = useStore();

    const submit = async () => {
      const response = await axios.post(
        "/api/v1/auth/authenticate",
        formed(form)
      );

      const token = response.data.token;

      localStorage.setItem("token", response.data.token);

      store.dispatch("user/authenticate", token);

      await router.push("/movies");
    };

    const formed = (form = {}) => {
      return Object.entries(form)
        .filter(([key]) => key !== "valid")
        .reduce((acc, [key, val]) => {
          acc[key] = val.value;
          return acc;
        }, {});
    };

    return { form, submit };
  },
};
</script>

<style scoped>
.form-signin {
  max-width: 330px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 0;
}
.form-floating {
  margin-bottom: 10px;
}
</style>
