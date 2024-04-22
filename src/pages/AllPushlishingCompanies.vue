<script setup>
import TitleBlock from "../components/TitleBlock.vue";
import ConfirmModal from "../components/ConfirmModal.vue";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
</script>

<template>
    <div>
        <TitleBlock :title="'Danh Sách Nhà Xuất Bản'" />
        <div class="container">
            <div class="d-flex justify-content-end mb-3">
                <router-link
                    :to="{ name: 'all_books' }"
                    class="btn btn-primary">
                    Quản lý sách
                </router-link>
            </div>
            <div class="row justify-content-center">
                <div
                    class="col-lg-6 col-md-9 p-0 border border-1 rounded-1 pt-2 pb-2">
                    <form
                        @submit.prevent="submitForm"
                        class="p-3 border-bottom border-bottom-1">
                        <div class="mb-2">
                            <label for="company_name" class="form-label"
                                >Tên nhà xuất bản</label
                            >
                            <input
                                type="text"
                                class="form-control"
                                v-model="newCompanyName"
                                id="company_name"
                                required />
                        </div>
                        <div class="mb-2">
                            <label for="company_address" class="form-label"
                                >Địa chỉ</label
                            >
                            <input
                                type="text"
                                class="form-control"
                                v-model="newCompanyAddress"
                                id="company_address"
                                required />
                        </div>
                        <button type="submit" class="btn btn-primary">
                            Thêm
                        </button>
                    </form>
                    <div v-for="company in allCompanies" :key="company._id">
                        <div
                            class="p-3 border-bottom border-bottom-1 d-flex align-items-center justify-content-between">
                            <div>
                                <h5 class="card-title text-primary">
                                    {{ company.name }}
                                </h5>
                                <p class="card-text">
                                    Địa chỉ
                                    {{ company.address }}
                                </p>
                            </div>
                            <div>
                                <button @click="openModal(company)" class="btn">
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
            :content="'Bạn có chắc chắn muốn xóa cuốn nhà xuất bản này không?'"
            :handleConfirm="handleConfirmModal" />
    </div>
</template>

<script>
import PublishingCompanyService from "../services/publishingCompany.service.js";
import Bootstrap from "bootstrap/dist/js/bootstrap.js";
export default {
    data() {
        return {
            allCompanies: [],
            companyToDelete: null,
            modal: null,
            newCompanyName: "",
            newCompanyAddress: "",
        };
    },
    async created() {
        this.allCompanies = await PublishingCompanyService.getAll();
        this.$nextTick(() => {
            this.modal = new Bootstrap.Modal(
                document.getElementById("confirmModal")
            );
        });
    },
    methods: {
        openModal(company) {
            this.companyToDelete = company;
            this.modal.show();
        },
        async submitForm() {
            const data = {
                name: this.newCompanyName,
                address: this.newCompanyAddress,
            };
            try {
                const res = await PublishingCompanyService.create(data);
                this.allCompanies = [...this.allCompanies, res];
                this.newCompanyName = "";
                this.newCompanyAddress = "";
            } catch (error) {
                console.log(error.message);
                alert("Thêm nhà xuất bản thất bại đã có lỗi xảy ra");
            }
        },
        async handleConfirmModal() {
            try {
                const res = await PublishingCompanyService.delete(
                    this.companyToDelete._id
                );
                this.allCompanies = [
                    ...this.allCompanies.filter(
                        (book) => book._id !== this.companyToDelete._id
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
