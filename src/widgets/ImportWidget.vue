<template>
    <TextButton
        @click="isOpen = true"
        text="Import Set"
    />
    <ImportPanel
        @import="importFlashcard"
        @close="isOpen = false"
        v-if="isOpen"
    />
</template>

<script setup lang="ts">
    import TextButton from '@/shared/ui/TextButton.vue';
    import ImportPanel from '@/features/import/ImportPanel.vue';
    import {ref} from 'vue';
    import type {FlashcardsSet} from '@/shared/lib/flashcards_set';
    import createEmptyFlashcardsSet from '@/shared/lib/create_empty_flashcards_set';

    const isOpen = ref(false);
    function importFlashcard(flashcardToImport: FlashcardsSet, overrideChanges: boolean) {
        if (overrideChanges) {
            flashcardsSet.value = flashcardToImport;
        } else {
            flashcardsSet.value.flashcards = [...flashcardsSet.value.flashcards, ...flashcardToImport.flashcards];
        }
    }
    const flashcardsSet = defineModel<FlashcardsSet>({default: createEmptyFlashcardsSet()});
</script>

<style scoped></style>
