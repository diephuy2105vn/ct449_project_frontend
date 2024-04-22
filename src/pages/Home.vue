<script setup>
import TitleBlock from "../components/TitleBlock.vue";
</script>

<template>
    <div>
        <TitleBlock :title="'Trang Chủ'" />
        <div class="container">
            <div class="row row-gap-3">
                <div v-for="book in allBooks" :key="book._id" class="col-md-4">
                    <router-link
                        :to="`/books/${book._id}`"
                        class="text-decoration-none">
                        <div class="card">
                            <div class="pt-3 ps-3 pe-3">
                                <img
                                    :src="book.imageUrl"
                                    class="card-img-top"
                                    alt="..." />
                            </div>
                            <div class="card-body">
                                <h5 class="card-title text-primary">
                                    {{ book.title }}
                                </h5>
                                <p class="card-text">
                                    <span>Giá: {{ book.price }} đ </span> /
                                    <span> Số lượng: {{ book.quantity }}</span>
                                </p>
                                <p class="card-text">
                                    Nhà xuất bản:
                                    {{ book.publishingCompany.name }}
                                </p>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BookService from "../services/book.service.js";

export default {
    data() {
        return {
            allBooks: [],
        };
    },
    async created() {
        this.allBooks = await BookService.getAll();
    },
};
</script>
