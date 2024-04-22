<script setup>
import {
    faMagnifyingGlass,
    faHouse,
    faListCheck,
    faUser,
    faBook,
} from "@fortawesome/free-solid-svg-icons";
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-secondary">
        <div class="container-fluid">
            <router-link :to="{ name: 'home' }" class="navbar-brand" href="/"
                >BookStore</router-link
            >
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item me-lg-2">
                        <router-link
                            class="nav-link"
                            :to="{ name: 'home' }"
                            aria-current="page">
                            <fa-icon class="me-1" :icon="faHouse" />
                            Trang chủ</router-link
                        >
                    </li>
                    <li class="nav-item me-lg-2">
                        <router-link
                            v-if="store.user && store.user.role === 'STAFF'"
                            class="nav-link"
                            :to="{ name: 'all_books' }"
                            ><fa-icon class="me-1" :icon="faBook" /> Quản lý
                            sách</router-link
                        >
                    </li>
                    <li class="nav-item me-lg-2">
                        <router-link
                            v-if="store.user && store.user.role === 'STAFF'"
                            class="nav-link"
                            :to="{ name: 'all_orders' }"
                            ><fa-icon class="me-1" :icon="faListCheck" /> Quản
                            lý mượn sách</router-link
                        >
                    </li>
                    <li class="nav-item dropdown me-lg-2">
                        <button
                            class="nav-link dropdown-toggle"
                            @click="toggleDropdown">
                            <fa-icon class="me-1" :icon="faUser" /><span
                                v-if="store.user"
                                >{{ store.user.username }}</span
                            >
                            <span v-else>Người dùng</span>
                        </button>
                        <ul
                            v-show="dropdownOpen && store.user"
                            class="dropdown-menu"
                            id="dropdown">
                            <li>
                                <button @click="logout" class="dropdown-item">
                                    Đăng xuất
                                </button>
                            </li>
                        </ul>
                        <ul
                            v-show="dropdownOpen && !store.user"
                            class="dropdown-menu"
                            id="dropdown">
                            <li>
                                <router-link
                                    :to="{ name: 'login' }"
                                    @click="toggleDropdown"
                                    class="dropdown-item"
                                    >Đăng nhập</router-link
                                >
                            </li>
                            <li>
                                <router-link
                                    :to="{ name: 'register' }"
                                    @click="toggleDropdown"
                                    class="dropdown-item"
                                    >Đăng ký</router-link
                                >
                            </li>
                        </ul>
                    </li>
                </ul>
                <form class="d-flex" role="search">
                    <input
                        class="form-control me-2"
                        type="search"
                        placeholder="Tìm kiếm ..."
                        aria-label="Search" />
                    <button class="btn btn-outline-primary" type="submit">
                        <fa-icon :icon="faMagnifyingGlass" />
                    </button>
                </form>
            </div>
        </div>
    </nav>
</template>

<script>
import vClickOutside from "v-click-outside";
import Cookies from "js-cookie";
import { store } from "../store";
import Bootstrap from "bootstrap/dist/js/bootstrap.js";
export default {
    data() {
        return { dropdownOpen: false };
    },
    directives: {
        clickOutside: vClickOutside.directive,
    },
    methods: {
        toggleDropdown() {
            this.dropdownOpen = !this.dropdownOpen;
            this.dropdownOpen
                ? this.$nextTick(() => {
                      new Bootstrap.Dropdown(
                          document.getElementById("dropdown")
                      ).show();
                  })
                : this.$nextTick(() => {
                      new Bootstrap.Dropdown(
                          document.getElementById("dropdown")
                      ).hide();
                  });
        },

        logout() {
            store.user = null;
            Cookies.remove("token");
            this.$router.push("/");
            this.toggleDropdown();
        },
    },
};
</script>
