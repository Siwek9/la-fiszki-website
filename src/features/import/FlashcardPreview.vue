<template>
    <div class="flashcard-preview">
        <div class="text-side left-side">
            <span
                v-for="(text, index) in flashcard.front"
                :key="index"
                class="one-text"
                >{{ text }}</span
            >
        </div>
        <div class="middle">-></div>
        <div class="text-side right-side">
            <span
                v-for="(text, index) in flashcard.back"
                :key="index"
                class="one-text"
                >{{ text }}</span
            >
        </div>
    </div>
</template>
<script setup lang="ts">
    import type {Flashcard} from '@/shared/lib/Flashcard';

    const {flashcard} = defineProps<{flashcard: Flashcard}>();
</script>
<style scoped>
    .flashcard-preview {
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
        margin: 15px;
        border-radius: 10px;
        background-color: #260f43;
        padding: 10px;
        width: calc(100% - 30px);
        overflow-x: hidden;
    }

    .text-side {
        display: flex;
        flex: 2;
        flex-direction: column;
        justify-content: center;
    }

    .middle {
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
        font-size: 20px;
    }

    .one-text {
        display: block;
        padding: 10px;
        font-size: 20px;
        text-align: center;
    }
</style>
