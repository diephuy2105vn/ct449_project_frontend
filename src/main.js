import { createApp } from "vue";
import App from "./App.vue";

import "bootstrap/dist/css/bootstrap.css";
import "./assets/custom_boostrap.css";

import Bootstrap from "bootstrap/dist/js/bootstrap.js";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createRouter, createWebHistory } from "vue-router";
import vClickOutside from "v-click-outside";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "", name: "home", component: () => import("./pages/Home.vue") },
        {
            path: "/login",
            name: "login",
            component: () => import("./pages/Login.vue"),
        },
        {
            path: "/register",
            name: "register",
            component: () => import("./pages/Register.vue"),
        },
        {
            path: "/books",
            name: "all_books",
            component: () => import("./pages/AllBooks.vue"),
        },
        {
            path: "/books/create",
            name: "create_book",
            component: () => import("./pages/CreateBook.vue"),
        },
        {
            path: "/books/edit/:id",
            name: "edit_book",
            component: () => import("./pages/EditBook.vue"),
            props: true,
        },
        {
            path: "/books/:id",
            name: "one_book",
            component: () => import("./pages/OneBook.vue"),
            props: true,
        },
        {
            path: "/companies",
            name: "all_companies",
            component: () => import("./pages/AllPushlishingCompanies.vue"),
        },
        {
            path: "/order",
            name: "order",
            component: () => import("./pages/OrderBook.vue"),
        },
        {
            path: "/orders",
            name: "all_orders",
            component: () => import("./pages/AllOrderBook.vue"),
        },
    ],
});

const app = createApp(App)
    .component("fa-icon", FontAwesomeIcon)
    .use(Bootstrap)
    .use(vClickOutside)
    .use(router)
    .mount("#app");
