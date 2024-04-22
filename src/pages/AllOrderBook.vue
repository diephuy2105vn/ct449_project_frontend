<script setup>
import TitleBlock from "../components/TitleBlock.vue";
import ConfirmModal from "../components/ConfirmModal.vue";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
</script>

<template>
    <div>
        <TitleBlock :title="'Quản Lý Mượn Sách'" />
        <div class="container">
            <div class="row justify-content-center">
                <div
                    class="col-lg-6 col-md-9 p-0 border border-1 rounded-1 pt-2 pb-2 overflow-hidden">
                    <div v-for="order in allOrders" :key="order._id">
                        <div
                            class="p-3 row border-bottom border-bottom-1 d-flex align-items-center">
                            <div class="col-2">
                                <img class="w-100" :src="order.book.imageUrl" />
                            </div>
                            <div class="col-9">
                                <p class="card-title text-primary fw-bold">
                                    Tên: {{ order.user.name }}
                                </p>

                                <p class="card-text mb-0">
                                    Số điện thoại: {{ order.user.phoneNumber }}
                                </p>
                                <p class="card-text mb-0">
                                    Địa chỉ: {{ order.user.address }}
                                </p>
                                <p class="card-text mb-0">
                                    Tên sách: {{ order.book.title }} /
                                    {{ order.quantity }} quyển
                                </p>
                                <p class="card-text mb-0">
                                    Ngày mượn:
                                    {{ formatDate(order.borrowedDate) }}
                                </p>
                                <p
                                    class="card-text mb-0"
                                    v-bind:class="{
                                        'text-danger': isPastDate(
                                            order.payDate
                                        ),
                                    }">
                                    Ngày trả: {{ formatDate(order.payDate) }}
                                </p>
                            </div>
                            <div class="col-1">
                                <button @click="openModal(order)" class="btn">
                                    <fa-icon :icon="faXmark" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ConfirmModal
            :title="'Xác nhận xóa'"
            :content="'Bạn có chắc chắn muốn xóa đơn mượn sách này không?'"
            :handleConfirm="handleConfirm" />
    </div>
</template>

<script>
import OrderBookService from "../services/orderBook.service";
import Bootstrap from "bootstrap/dist/js/bootstrap.js";
export default {
    data() {
        return {
            allOrders: [],
            orderToDelete: null,
            modal: null,
        };
    },
    async created() {
        this.allOrders = await OrderBookService.getAll();
        this.$nextTick(() => {
            this.modal = new Bootstrap.Modal(
                document.getElementById("confirmModal")
            );
        });
    },
    methods: {
        openModal(order) {
            this.orderToDelete = order;
            this.modal.show();
        },
        async handleConfirm() {
            try {
                const res = await OrderBookService.delete(
                    this.orderToDelete._id
                );
                this.allOrders = [
                    ...this.allOrders.filter(
                        (order) => order._id !== this.orderToDelete._id
                    ),
                ];
                this.modal.hide();
            } catch (error) {
                console.log(error.message);
                alert("Xóa không thành công, đã có lỗi xảy ra");
            }
        },
        formatDate(date) {
            const today = new Date(date);
            const day = String(today.getDate()).padStart(2, "0");
            const month = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
            const year = today.getFullYear();
            return `${day}-${month}-${year}`;
        },
        isPastDate(date) {
            const today = new Date();
            const payDate = new Date(date);
            return payDate < today;
        },
    },
};
</script>
