<template>
    <button
        @click="emit('click')"
        class="close-button"
    ></button>
</template>
<script setup lang="ts">
    const emit = defineEmits<{click: []}>();
</script>
<style scoped>
    .close-button {
        position: absolute;
        top: 20px;
        right: 20px;
        border: none;
        border-radius: 50%;
        background-image: url(@/assets/icons/close.svg);
        background-position: center center;
        background-size: 80%;
        background-repeat: no-repeat;
        background-color: #35155d;
        width: 45px;
        height: 45px;
    }
</style>
