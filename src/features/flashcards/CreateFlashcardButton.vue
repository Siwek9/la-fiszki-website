<template>
    <div
        class="add-button"
        @click="addButton"
        tabindex="1"
    >
        <div class="plus-icon"></div>
    </div>
</template>

<script setup lang="ts">
    const emit = defineEmits<{newFlashcard: []}>();

    function addButton() {
        emit('newFlashcard');
    }
</script>

<style>
    .add-button {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        border-radius: 50%;
        background-color: #35155d;
        width: clamp(70px, 5vw, 90px);
        height: clamp(70px, 5vw, 90px);
        font-size: 35px;
        user-select: none;
    }

    .add-button:hover {
        cursor: pointer;
    }

    .plus-icon {
        background-image: url(@/assets/icons/add_button.svg);
        background-position: center center;
        background-size: 85%;
        background-repeat: no-repeat;

        width: clamp(47px, 3vw, 60px);
        height: clamp(47px, 3vw, 60px);
    }
</style>
