<script setup>
import TitleBlock from "../components/TitleBlock.vue";
</script>

<template>
    <TitleBlock :title="'Thêm Sách'" />
    <div class="container p-lg-5">
        <form @submit.prevent="submitForm">
            <div class="row">
                <div class="col-lg-6 p-2">
                    <div class="mb-3">
                        <label for="title" class="form-label">Tên sách</label>
                        <input
                            type="text"
                            class="form-control"
                            id="title"
                            v-model="title"
                            required />
                    </div>
                    <div class="mb-3">
                        <label for="price" class="form-label">Giá sách</label>
                        <input
                            type="number"
                            class="form-control"
                            id="price"
                            v-model="price"
                            required />
                    </div>
                    <div class="mb-3">
                        <label for="quantity" class="form-label"
                            >Số lượng
                        </label>
                        <input
                            type="number"
                            class="form-control"
                            id="quantity"
                            v-model="quantity"
                            required />
                    </div>
                </div>
                <div class="col-lg-6 p-2 d-flex flex-column">
                    <div class="mb-3">
                        <label for="publishingCompany" class="form-label"
                            >Nhà xuất bản</label
                        >
                        <select
                            type="text"
                            class="form-control"
                            id="companyId"
                            v-model="companyId"
                            required>
                            <option
                                v-for="company in publishingCompanies"
                                :key="company._id"
                                :value="company._id">
                                {{ company.name }}
                            </option>
                        </select>
                    </div>
                    <div class="mb-3 flex-grow-1">
                        <label for="image" class="form-label">Ảnh</label>
                        <input
                            type="file"
                            class="form-control"
                            id="image"
                            required
                            @change="previewImage"
                            ref="fileInput" />
                        <div class="mt-3">
                            <img
                                style="
                                    max-height: 160px;
                                    max-width: 160px;
                                    object-fit: contain;
                                "
                                v-if="imageUrl"
                                :src="imageUrl"
                                alt="Preview" />
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <button type="submit" class="btn btn-primary">
                        Thêm sách
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import PublishingCompany from "../services/publishingCompany.service.js";
import BookService from "../services/book.service.js";
import { useRouter } from "vue-router";
export default {
    data() {
        return {
            title: "",
            price: "",
            quantity: "",
            companyId: "",
            imageFile: null,
            imageUrl: null,
            publishingCompanies: [],
        };
    },
    async created() {
        this.publishingCompanies = await PublishingCompany.getAll();
    },
    methods: {
        previewImage(event) {
            const file = event.target.files[0];
            if (file) {
                this.imageFile = file;
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imageUrl = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },
        async submitForm() {
            const formData = new FormData();
            formData.append("title", this.title);
            formData.append("price", this.price);
            formData.append("quantity", this.quantity);
            formData.append("companyId", this.companyId);
            formData.append("image", this.imageFile);

            try {
                const res = await BookService.create(formData);
                this.$router.push("/books");
            } catch (error) {
                console.log(error.message);
                alert("Thêm sách thất bại đã có lỗi xảy ra");
            }
        },
    },
};
</script>
