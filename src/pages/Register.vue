<template>
    <div class="container p-lg-5">
        <h1 class="text-center">Đăng ký</h1>
        <form @submit.prevent="submitForm">
            <div class="row">
                <div class="col-lg-6 p-2">
                    <div class="mb-3">
                        <label for="username" class="form-label"
                            >Tên tài khoản</label
                        >
                        <input
                            type="text"
                            class="form-control"
                            id="username"
                            v-model.trim="validate.username.$model"
                            :class="{
                                'is-invalid': validate.username.$error,
                            }" />
                        <div
                            v-if="validate.username.required"
                            class="invalid-feedback">
                            Vui lòng nhập trường này
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label"
                            >Mật khẩu</label
                        >
                        <input
                            type="password"
                            class="form-control"
                            id="password"
                            v-model.trim="validate.password.$model"
                            :class="{
                                'is-invalid': validate.password.$error,
                            }" />
                        <div
                            v-if="validate.password.required"
                            class="invalid-feedback">
                            Vui lòng nhập trường này
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="confirmPassword" class="form-label"
                            >Xác nhận mật khẩu</label
                        >
                        <input
                            type="password"
                            class="form-control"
                            id="confirmPassword"
                            v-model.trim="validate.confirmPassword.$model"
                            :class="{
                                'is-invalid': validate.confirmPassword.$error,
                            }" />
                        <div
                            v-if="validate.confirmPassword.sameAsPassword"
                            class="invalid-feedback">
                            Mật khẩu xác nhận không chính xác
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 p-2">
                    <div class="mb-3">
                        <label for="name" class="form-label">Họ và tên</label>
                        <input
                            type="text"
                            class="form-control"
                            id="name"
                            v-model.trim="validate.name.$model"
                            :class="{
                                'is-invalid': validate.name.$error,
                            }" />
                        <div
                            v-if="validate.name.required"
                            class="invalid-feedback">
                            Vui lòng nhập trường này
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="address" class="form-label">Địa chỉ</label>
                        <input
                            type="text"
                            class="form-control"
                            id="address"
                            v-model.trim="validate.address.$model"
                            :class="{
                                'is-invalid': validate.address.$error,
                            }" />
                        <div
                            v-if="validate.address.required"
                            class="invalid-feedback">
                            Vui lòng nhập trường này
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="phoneNumber" class="form-label"
                            >Số điện thoại</label
                        >
                        <input
                            type="text"
                            class="form-control"
                            id="phoneNumber"
                            v-model.trim="validate.phoneNumber.$model"
                            :class="{
                                'is-invalid': validate.phoneNumber.$error,
                            }" />
                        <div
                            v-if="validate.phoneNumber.required"
                            class="invalid-feedback">
                            Vui lòng nhập trường này
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <button type="submit" class="btn btn-primary">
                        Đăng ký
                    </button>
                    <span class="mt-3">
                        Bạn đã có tài khoản? <a href="/login">Đăng nhập</a>
                    </span>
                </div>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { required, sameAs, not } from "@vuelidate/validators";
import { defineComponent, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import authService from "@/services/auth.service";
import { store } from "../store";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
export default defineComponent({
    setup() {
        const name = ref("");
        const address = ref("");
        const phoneNumber = ref("");
        const username = ref("");
        const password = ref("");
        const confirmPassword = ref("");

        const rules = {
            name: { required },
            address: { required },
            phoneNumber: { required },
            username: { required },
            password: { required },
            confirmPassword: {
                required,
                sameAsPassword: sameAs(password),
            },
        };
        const validate = useVuelidate(rules, {
            name,
            address,
            phoneNumber,
            username,
            password,
            confirmPassword,
        });

        async function submitForm() {
            validate.value.$touch();
            if (!validate.value.$invalid) {
                try {
                    const registerData = {
                        name: name.value,
                        address: address.value,
                        phoneNumber: phoneNumber.value,
                        username: username.value,
                        password: password.value,
                    };
                    const res = await authService.register(registerData);

                    if (res) {
                        this.$router.push("/login");
                    }
                } catch (error) {
                    console.error("Error register:", error);
                    alert("Đăng ký tài khoản thất bại");
                }
            }
        }
        return {
            username,
            password,
            confirmPassword,
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
