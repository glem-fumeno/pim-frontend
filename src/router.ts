import Root from "@/routes/Root.vue";
import { createRouter, createWebHistory } from "vue-router";
import Stores from "./routes/stores/Stores.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { name: "root", path: "/", component: Root },
    { name: "attributes", path: "/attributes", component: Root },
    { name: "templates", path: "/templates", component: Root },
    { name: "products", path: "/products", component: Root },
    { name: "categories", path: "/categories", component: Root },
    { name: "stores", path: "/stores", component: Stores },
  ],
});

export default router;
