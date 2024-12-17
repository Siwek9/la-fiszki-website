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
        padding: 40px;
        max-width: 95vw;
        max-height: 95vh;
        color: white;
    }

    @media screen and (aspect-radio: 2/3) {
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
