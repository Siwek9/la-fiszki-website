<template>
    <div
        class="dialog-background"
        @click="emit('close')"
    ></div>
    <div
        ref="dialog-ref"
        class="dialog-body"
    >
        <slot></slot>
        <div class="dialog-close-button">
            <CloseButton @click="emit('close')" />
        </div>
    </div>
</template>
<script setup lang="ts">
    import CloseButton from '@/features/import/CloseButton.vue';
    const emit = defineEmits<{close: []}>();
</script>
<style scoped>
    .dialog-body {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1000;
        box-sizing: border-box;
        border: none;
        border-radius: 20px;
        background-color: #512b81;
        padding: clamp(10px, 5vh, 40px) clamp(10px, 5vw, 40px);
        max-width: 95vw;
        max-height: 95vh;
        color: white;
    }

    .dialog-background {
        position: fixed;
        opacity: 0.7;
        z-index: 1000;
        backdrop-filter: blur(2px);
        inset: 0;
        background-color: black;
    }

    .dialog-close-button {
        position: absolute;
        top: 20px;
        right: 20px;
    }
</style>
