<script setup>
import TitleBlock from "../components/TitleBlock.vue";
import ConfirmModal from "../components/ConfirmModal.vue";
</script>

<template>
    <div>
        <TitleBlock :title="'Quản Lý Sách'" />
        <div class="container">
            <div class="d-flex justify-content-end mb-3">
                <router-link
                    class="btn btn-outline-primary me-3"
                    :to="{ name: 'all_companies' }"
                    >Danh sách nhà xuất bản</router-link
                >

                <router-link
                    class="btn btn-primary"
                    :to="{ name: 'create_book' }"
                    >Thêm sách</router-link
                >
            </div>
            <div class="row row-gap-3">
                <div v-for="book in allBooks" :key="book._id" class="col-md-4">
                    <div class="card">
                        <div class="pt-3 ps-3 pe-3">
                            <img
                                :src="book.imageUrl"
                                class="card-img-top"
                                alt="..." />
                        </div>
                        <div class="card-body">
                            <router-link :to="`/books/${book._id}`">
                                <h5 class="card-title text-primary">
                                    {{ book.title }}
                                </h5>
                            </router-link>
                            <p class="card-text">
                                <span>Giá: {{ book.price }} đ </span> /
                                <span> Số lượng: {{ book.quantity }}</span>
                            </p>
                            <p class="card-text">
                                Nhà xuất bản: {{ book.publishingCompany.name }}
                            </p>
                            <div class="row">
                                <div class="col-6">
                                    <router-link
                                        :to="`/books/edit/${book._id}`"
                                        class="btn btn-outline-primary w-100">
                                        Cập nhật
                                    </router-link>
                                </div>
                                <div class="col-6">
                                    <button
                                        class="btn btn-danger w-100"
                                        @click="openModal(book)">
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ConfirmModal
            :title="'Xác nhận xóa'"
            :content="'Bạn có chắc chắn muốn xóa cuốn sách này không?'"
            :handleConfirm="handleConfirm" />
    </div>
</template>

<script>
import BookService from "../services/book.service.js";
import Bootstrap from "bootstrap/dist/js/bootstrap.js";
export default {
    data() {
        return {
            allBooks: [],
            bookToDelete: null,
            modal: null,
        };
    },
    async created() {
        this.allBooks = await BookService.getAll();
        this.$nextTick(() => {
            this.modal = new Bootstrap.Modal(
                document.getElementById("confirmModal")
            );
        });
    },
    methods: {
        openModal(book) {
            this.bookToDelete = book;
            this.modal.show();
        },
        async handleConfirm() {
            try {
                const res = await BookService.delete(this.bookToDelete._id);
                this.allBooks = [
                    ...this.allBooks.filter(
                        (book) => book._id !== this.bookToDelete._id
                    ),
                ];
                this.modal.hide();
            } catch (error) {
                console.log(error.message);
                alert("Xóa không thành công, đã có lỗi xảy ra");
            }
        },
    },
};
</script>
