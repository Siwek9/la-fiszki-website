<template>
    <button
        class="text-button"
        @click="exportFlashcards"
    >
        Export Set
    </button>
</template>

<script setup lang="ts">
    // import type Flashcard from '@/utils/Flashcard';
    import type {FlashcardsSet} from '@/utils/FlashcardsSet';
    import {ReadyToBeExported} from '@/utils/SetOfFlashcardsValidators';
    import * as st from 'simple-runtypes';

    function exportFlashcards() {
        if (!st.use(ReadyToBeExported, flashcardsSet).ok) {
            return;
        }
        const objectToExport = createFlashcardObject(flashcardsSet);

        const downloadAnchorNode = document.createElement('a');
        const file = new Blob([JSON.stringify(objectToExport)], {type: 'text/plain'});
        downloadAnchorNode.href = URL.createObjectURL(file);
        downloadAnchorNode.download = objectToExport.name += '.json';
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }
    function createFlashcardObject(flashcardsSet: FlashcardsSet) {
        return {
            ...flashcardsSet,
            version: '0.1',
        };
    }
    const {flashcardsSet} = defineProps<{
        flashcardsSet: FlashcardsSet;
    }>();

    defineExpose({
        createFlashcardObject,
        exportFlashcards,
    });
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
