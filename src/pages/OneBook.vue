<script setup>
import TitleBlock from "../components/TitleBlock.vue";
</script>

<template>
    <TitleBlock :title="'Chi Tiết Sách'" />
    <div class="container">
        <div class="row">
            <div class="col-md-6 p-2 d-flex justify-content-center">
                <img class="w-75" :src="book.imageUrl" alt="Ảnh sách" />
            </div>
            <div class="col-md-6 p-2">
                <h2 class="text-primary mb-5">
                    {{ book.title }}
                </h2>
                <div class="mb-4">
                    <span
                        class="p-4 pt-2 pb-2 bg-secondary fs-5 fw-bold rounded-2"
                        >Giá: {{ book.price }} đ</span
                    >
                </div>
                <div class="mb-4">
                    <span>Số lượng:</span>
                    <input
                        class="ms-3 me-3"
                        type="number"
                        min="1"
                        v-model="orderQuantity"
                        :max="book.quantity" />
                    <span class="opacity-75"> / {{ book.quantity }}</span>
                </div>
                <div class="mb-4">
                    <button
                        @click="handleOrderBook"
                        :to="`/order?book=${book._id}`"
                        class="btn btn-primary w-100">
                        Mượn sách
                    </button>
                </div>
                <div class="border-top border-top-1 border-black pt-3 pe-3">
                    <p>Nhà xuất bản: {{ book.publishingCompany.name }}</p>
                    <p>Địa chỉ: {{ book.publishingCompany.address }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BookService from "../services/book.service.js";
export default {
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            book: null,
            orderQuantity: 1,
        };
    },

    async created() {
        this.book = await BookService.get(this.id);
    },

    methods: {
        handleOrderBook() {
            const order = {
                book: this.book,
                orderQuantity: this.orderQuantity,
            };
            localStorage.setItem("order", JSON.stringify(order));
            this.$router.push("/order");
        },
    },
};
</script>
