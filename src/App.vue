<script setup>
import Navbar from "@/components/Navbar.vue";
import authService from "@/services/auth.service";
import { store } from "./store";
import Cookies from "js-cookie";
async function refresh() {
    const token = Cookies.get("token");
    if (token) {
        try {
            const res = await authService.refresh();
            if (res.user && res.token) {
                store.user = res.user;
                Cookies.set("token", res.token);
            }
        } catch (error) {
            console.log("Error: " + error);
        }
    }
}
refresh();
</script>

<template>
    <header>
        <Navbar />
    </header>

    <main>
        <router-view />
    </main>
</template>
