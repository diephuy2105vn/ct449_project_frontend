<script setup>
import TitleBlock from "../components/TitleBlock.vue";
</script>

<template>
    <TitleBlock :title="'Mượn Sách'" />
    <div class="container p-lg-5">
        <form @submit.prevent="submitForm">
            <div class="row">
                <div class="col-lg-6">
                    <div class="mb-3 text-center">
                        <h3 class="text-primary">{{ book.title }}</h3>
                    </div>
                    <div class="d-flex justify-content-center">
                        <img class="w-75" :src="book.imageUrl" alt="Ảnh sách" />
                    </div>
                </div>
                <div
                    class="col-lg-6 p-2 d-flex flex-column justify-content-center">
                    <div class="mb-3">
                        <label for="orderQuantity" class="form-label"
                            >Số lượng
                        </label>
                        <div class="row">
                            <div class="col-6">
                                <input
                                    type="number"
                                    class="form-control"
                                    id="orderQuantity"
                                    v-model="orderQuantity"
                                    min="1"
                                    :max="book.quantity" />
                            </div>
                            <div class="col-6 d-flex align-items-center">
                                <span>Giá: {{ book.price }} đ</span>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="quantity" class="form-label"
                            >Ngày mượn
                        </label>
                        <input
                            type="date"
                            class="form-control"
                            id="borrowedDate"
                            v-model="borrowedDate" />
                    </div>
                    <div class="mb-3">
                        <label for="payDate" class="form-label"
                            >Ngày trả
                        </label>
                        <input
                            type="date"
                            class="form-control"
                            id="payDate"
                            v-model="payDate" />
                    </div>
                    <div>
                        <button type="submit" class="btn btn-primary w-100">
                            Mượn sách
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import OrderBookService from "../services/orderBook.service.js";
import { useRouter } from "vue-router";
import { store } from "../store";
export default {
    data() {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, "0");
        const month = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const year = today.getFullYear();
        const tomorrow = String(today.getDate() + 1).padStart(2, "0");
        return {
            book: null,
            orderQuantity: 1,
            borrowedDate: `${year}-${month}-${day}`,
            payDate: `${year}-${month}-${tomorrow}`,
        };
    },

    created() {
        if (!store.user) {
            this.$router.push("/login");
        }
        const order = JSON.parse(localStorage.getItem("order"));

        this.book = order.book;
        this.orderQuantity = order.orderQuantity;
    },
    methods: {
        async submitForm() {
            const data = {
                bookId: this.book._id,
                borrowedDate: this.borrowedDate,
                payDate: this.payDate,
                quantity: this.orderQuantity,
            };

            try {
                const res = await OrderBookService.create(data);
                alert("Mượn sách thành công");
                this.$router.push("/");
            } catch (error) {
                console.log(error.message);
                alert("Mượn sách thất bại, đã có lỗi xảy ra");
            }
        },
    },
};
</script>
