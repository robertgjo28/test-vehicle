import { createRouter, createWebHistory } from "vue-router";
import Form from "../views/Form.vue";
import Vehicle from "../views/Vehicle.vue";

const routes = [
  {
    path: "/",
    name: "Form",
    component: Form,
  },
  {
    path: "/vehicles",
    name: "Vehicles",
    component: Vehicle,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: "text-yellow font-weight-bold",
});

export default router;
