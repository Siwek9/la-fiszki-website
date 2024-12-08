<template>
    <button
        class="text-button"
        @click="emit('click')"
        :disabled="disabled"
    >
        {{ text }}
    </button>
</template>

<script setup lang="ts">
    const {text, disabled} = defineProps<{text: string; disabled?: boolean}>();
    const emit = defineEmits<{click: []}>();
</script>

<style>
    .text-button {
        all: unset;
        border-radius: 25px;
        background-color: #35155d;
        padding: clamp(15px, 3vw, 25px);
    }

    .text-button:disabled {
        cursor: not-allowed;
        background-color: hsl(267, 23%, 22%);
    }

    .text-button:hover:not(:disabled) {
        cursor: pointer;
    }
</style>
