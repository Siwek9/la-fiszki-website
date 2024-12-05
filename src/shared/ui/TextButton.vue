<template>
    <button
        class="text-button"
        @click="emit('click')"
    >
        {{ text }}
    </button>
</template>

<script setup lang="ts">
    const {text} = defineProps<{text: string}>();
    const emit = defineEmits<{click: []}>();
</script>

<style>
    .text-button {
        all: unset;
        /* margin: 20px; */
        border-radius: 25px;
        background-color: #35155d;
        padding: clamp(15px, 3vw, 25px);
    }

    .text-button:hover {
        cursor: pointer;
    }
</style>
