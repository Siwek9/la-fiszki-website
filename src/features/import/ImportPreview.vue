<template>
    <OverlayScrollbarsComponent
        class="flashcard-preview-container"
        element="div"
    >
        <div v-if="importContent == undefined">You have no flashcards imported.</div>
        <FlashcardPreview
            v-else
            v-for="(flashcard, index) in importContent"
            :key="index"
            :flashcard="flashcard"
        />
    </OverlayScrollbarsComponent>
</template>
<script setup lang="ts">
    import type {Flashcard} from '@/shared/lib/Flashcard';
    import {OverlayScrollbarsComponent} from 'overlayscrollbars-vue';
    import FlashcardPreview from '@/features/import/FlashcardPreview.vue';

    const {importContent} = defineProps<{importContent: Array<Flashcard> | undefined}>();
</script>
<style>
    .flashcard-preview-container {
        max-height: 50vh;
        overflow: auto;
    }
</style>
