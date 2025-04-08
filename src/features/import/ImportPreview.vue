<template>
    <OverlayScrollbarsComponent
        class="flashcard-preview-container"
        element="div"
    >
        <div
            class="no-flashcards-info"
            v-if="importContent == undefined"
        >
            You have no flashcards imported.
        </div>
        <FlashcardPreview
            v-else
            v-for="(flashcard, index) in importContent"
            :key="index"
            :flashcard="flashcard"
        />
    </OverlayScrollbarsComponent>
</template>
<script setup lang="ts">
    import type {Flashcard} from '@/shared/lib/flashcard';
    import {OverlayScrollbarsComponent} from 'overlayscrollbars-vue';
    import FlashcardPreview from '@/features/import/FlashcardPreview.vue';

    const {importContent} = defineProps<{importContent: Array<Flashcard> | undefined}>();
</script>
<style>
    .flashcard-preview-container {
        min-height: 100px;
        max-height: 100%;
        overflow: auto;
    }

    .no-flashcards-info {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        text-align: center;
    }
</style>
