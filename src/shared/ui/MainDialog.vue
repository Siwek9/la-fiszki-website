<template>
    <div
        class="import-dialog-background"
        @click="emit('close')"
    ></div>
    <div
        ref="dialog-ref"
        class="import-dialog"
    >
        <CloseButton @click="emit('close')" />
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
    import CloseButton from '@/features/import/CloseButton.vue';
    const emit = defineEmits<{close: []}>();
</script>
<style scoped>
    .import-dialog {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1000;
        box-sizing: border-box;
        border: none;
        border-radius: 20px;
        background-color: #512b81;
        padding: 40px 40px;
        padding-right: 100px;
        max-width: 90vw;
        max-height: 90vh;
        color: white;
    }
    @media screen and (max-width: 800px) {
        .import-dialog {
            border-radius: 15px;
            padding: 10px;
        }
    }

    .import-dialog-background {
        position: fixed;
        opacity: 0.7;
        z-index: 1000;
        backdrop-filter: blur(2px);
        inset: 0;
        background-color: black;
        content: '';
    }

    .close-button:hover {
        cursor: pointer;
    }
</style>
