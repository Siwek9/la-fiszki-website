<template>
    <button
        class="text-button"
        @click="emit('onClick')"
    >
        {{ text }}
    </button>
</template>

<script setup lang="ts">
    const {text} = defineProps<{text: string}>();
    const emit = defineEmits<{onClick: []}>();
</script>

<style>
    .text-button {
        all: unset;
        margin: 20px;
        padding: clamp(15px, 3vw, 25px);
        background-color: #35155d;
        border-radius: 25px;
    }

    .text-button:hover {
        cursor: pointer;
    }
</style>
