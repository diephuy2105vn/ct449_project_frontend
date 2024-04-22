<template>
    <div class="container p-lg-5">
        <h1 class="text-center">Đăng nhập</h1>
        <form @submit.prevent="submitForm" class="">
            <div class="mb-3">
                <label for="username" class="form-label">Tên tài khoản</label>
                <input
                    type="text"
                    class="form-control"
                    id="username"
                    v-model.trim="validate.username.$model"
                    :class="{ 'is-invalid': validate.username.$error }" />
                <div v-if="validate.username.$error" class="invalid-feedback">
                    Trường này không được để trống
                </div>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Mật khẩu</label>
                <input
                    type="password"
                    class="form-control"
                    id="password"
                    v-model.trim="validate.password.$model"
                    :class="{ 'is-invalid': validate.password.$error }" />
                <div v-if="validate.password.$error" class="invalid-feedback">
                    Trường này không được để trống
                </div>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <button type="submit" class="btn btn-primary">Đăng nhập</button>
                <span class="mt-3">
                    Bạn chưa có tài khoản? <a href="/register">Đăng ký</a>
                </span>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { required } from "@vuelidate/validators";
import { defineComponent, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import authService from "@/services/auth.service";
import { store } from "../store";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
export default defineComponent({
    setup() {
        const username = ref("");
        const password = ref("");
        const rules = {
            username: { required },
            password: { required },
        };
        const validate = useVuelidate(rules, { username, password });
        const router = useRouter();
        async function submitForm() {
            validate.value.$touch();
            if (!validate.value.$invalid) {
                try {
                    const loginData = {
                        username: username.value,
                        password: password.value,
                    };
                    const res = await authService.login(loginData);

                    if (res.user && res.token) {
                        store.user = res.user;
                        Cookies.set("token", res.token);
                        this.$router.push("/");
                    }
                } catch (error) {
                    console.error("Error login:", error);
                    alert("Tên tài khoản hoặc mật khẩu không hợp lệ");
                }
            }
        }
        return {
            username,
            password,
            submitForm,
            validate,
        };
    },
});
</script>

<style scoped>
.is-invalid {
    border-color: red;
}
.invalid-feedback {
    color: red;
}
</style>
