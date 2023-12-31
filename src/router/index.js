import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"
import Create from "../views/Create.vue"
import WorkoutView from "../views/ViewWorkout.vue"
import SellProduct from "../views/SellProduct.vue"
import Dashboard from "../views/Dashboard.vue"
import store from '../store/index'


const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/create",
    name: "Create",
    component: Create,
  },
  {
    path: "/sell-product",
    name: "SellProduct",
    component: SellProduct,
  },
  {
    path: "/workout/:id",
    name: "Workout View",
    component: WorkoutView,
  },
  {
    path: "/dashboard",
    name: "Dashboard View",
    component: Dashboard,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Change document titles

// Route guard for auth routes
router.beforeEach((to,from, next)=> {
  const isAuth = store.methods.getUser() != null ? true : false;
  if (isAuth || to.name == 'Home' || to.name == 'Login' || to.name == 'Register') {
    next();
  } else {
    next('/login')
  }
});
export default router;
