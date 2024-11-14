<template>
    <div
        class="add-button"
        @click="addButton"
        tabindex="1"
    >
        +
    </div>
</template>

<script setup lang="ts">
    const emit = defineEmits<{newCardboard: []}>();

    function addButton() {
        emit('newCardboard');
    }
</script>

<style>
    .add-button {
        margin-top: 20px;
        user-select: none;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #35155d;
        width: clamp(70px, 5vw, 90px);
        height: clamp(70px, 5vw, 90px);
        font-size: 35px;
        border-radius: 50%;
    }

    .add-button:hover {
        cursor: pointer;
    }
</style>
