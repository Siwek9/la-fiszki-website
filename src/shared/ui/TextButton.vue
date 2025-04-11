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
        padding: 15px;
        text-align: center;
    }

    .text-button:disabled {
        cursor: not-allowed;
        background-color: var(--red-accent);
    }

    .text-button:hover:not(:disabled) {
        cursor: pointer;
    }
</style>
