<template>
    <div
        class="dialog-background"
        @click="emit('close')"
    ></div>
    <div class="dialog-body">
        <slot></slot>
        <div class="dialog-close-button">
            <CloseButton @click="emit('close')" />
        </div>
    </div>
</template>
<script setup lang="ts">
    // import {disableBodyScroll, enableBodyScroll} from 'body-scroll-lock';

    import CloseButton from '@/features/import/CloseButton.vue';
    // import {onMounted, onUnmounted, ref} from 'vue';
    const emit = defineEmits<{close: []}>();

    // const appRef = ref<HTMLElement | null>(null);

    // onMounted(() => {
    //     // appRef.value = document.querySelector('html');
    //     if (appRef.value != null) {
    //         disableBodyScroll(appRef.value);
    //         console.log('blcokuje scrolal');
    //         console.log(appRef.value);
    //     }
    // });

    // onUnmounted(() => {
    //     if (appRef.value != null) {
    //         enableBodyScroll(appRef.value);
    //     }
    // });
</script>
<style scoped>
    .dialog-body {
        display: flex;
        position: fixed;
        top: 50%;
        left: 50%;
        flex-direction: column;
        transform: translate(-50%, -50%);
        z-index: 1000;
        box-sizing: border-box;
        border: none;
        border-radius: 20px;
        background-color: #512b81;
        padding: clamp(10px, min(5vw, 5vh), 40px);
        width: fit-content;
        min-width: 0;
        max-width: 92vw;
        max-height: 95vh;
        overflow: hidden;
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
