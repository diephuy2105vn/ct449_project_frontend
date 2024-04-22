<template>
    <div
        class="mt-3 mb-3 d-flex justify-content-center align-items-center p-5 bg-secondary">
        <h1 class="pt-4 pb-4">{{ title }}</h1>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
        },
    },
};
</script>
