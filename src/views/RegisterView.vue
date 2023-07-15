<template>
  <main class="form-signin w-100 m-auto">
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Please register</h1>

      <div class="form-floating">
        <input type="text" v-model="data.first_name.value" class="form-control"  placeholder="First name">
        <label>First name</label>
      </div>

      <div class="form-floating">
        <input type="text" v-model="data.last_name.value" class="form-control"  placeholder="Last name">
        <label>Last name</label>
      </div>

      <div class="form-floating">
        <input type="email" v-model="data.email.value"  class="form-control"  placeholder="name@example.com">
        <label >Email address</label>
      </div>

      <div class="form-floating">
        <input type="password" v-model="data.password.value" class="form-control" placeholder="Password">
        <label>Password</label>
      </div>

      <div class="form-floating">
        <input type="password" v-model="data.password_confirm.value" class="form-control"  placeholder="Password confirm">
        <label>Password confirm</label>
      </div>

      <button class="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
    </form>
  </main>
</template>

<script>
import { reactive } from 'vue';
import axios from '@/plugins/axios';
import { useRouter } from 'vue-router';

const required = (val) => !!val;
const minLength = num => val => val.length >= num;

export default {
  name: "RegisterView",

  setup() {
    const data = reactive({
      first_name: {
        value: '',
        validators: {required, minLength: minLength(2)}
      },
      last_name: {
        value: '',
        validators: {required, minLength: minLength(2)}
      },
      email: {
        value: '',
        validators: {required, minLength: minLength(4)}
      },
      password: {
        value: '',
        validators: {required, minLength: minLength(8)}
      },
      password_confirm: {
        value: '',
        validators: {required, minLength: minLength(8)}
      },
    });
    const router = useRouter();

    const submit = async () => {
      try {
        await axios.post('/api/v1/auth/register', formed(data));

        router.push('/login');
      }catch(error) {
        console.log(error.response.data);
      }


    }

    const formed = (form = {}) => {
      return Object.entries(form)
      .reduce((acc, [key, val]) => {
        acc[key] = val.value;
        return acc;
      }, {})
    }

    return {
      data,
      submit
    };
  }
}
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
  margin-bottom: 10px;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
}

.form-signin input[type="text"] {
  margin-bottom: 10px;
}
</style>