<template>
    <div class="modal fade" id="confirmModal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ title }}</h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>{{ content }}</p>
                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal">
                        Hủy
                    </button>
                    <button
                        type="button"
                        class="btn btn-primary"
                        @click="handleConfirm">
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: { required: true, type: String },
        content: { required: true, type: String },
        handleConfirm: { required: true },
    },
};
</script>
