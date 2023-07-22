import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import MovieListViewVue from "@/views/MovieListView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import MovieDetails from "@/views/MovieDetails.vue";
import MovieAdd from "@/views/MovieAdd.vue";
import MovieUpdate from "@/views/MovieUpdate.vue";
import store from "@/store/index";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/movies/:page?",
    name: "movies",
    component: MovieListViewVue,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/movie/:id",
    name: "movieDetails",
    component: MovieDetails,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/movie/add",
    name: "movieAdd",
    component: MovieAdd,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/movie/update/:id",
    name: "movieUpdate",
    component: MovieUpdate,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
    meta: {
      requiresAuth: false,
    },
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters["user/auth"]) {
      next({ name: "login" });
      return;
    }
  }
  next();
});

export default router;
