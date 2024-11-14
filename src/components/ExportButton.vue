<template>
    <button
        class="text-button"
        @click="exportFlashcards"
    >
        Export Set
    </button>
</template>

<script setup lang="ts">
    import type Flashcard from '@/utils/Flashcard';

    function exportFlashcards() {
        if (name === '') return;
        if (author === '') return;
        if (sideName.front === '') return;
        if (sideName.back === '') return;
        let empty = false;
        flashcards.forEach((flashcard) => {
            if (flashcard.front.length === 0 || flashcard.back.length === 0) {
                empty = true;
                return;
            }
        });
        if (empty) return;

        const objectToExport = createFlashcardObject(name, author, sideName, flashcards);

        const downloadAnchorNode = document.createElement('a');
        const file = new Blob([JSON.stringify(objectToExport)], {type: 'text/plain'});
        downloadAnchorNode.href = URL.createObjectURL(file);
        downloadAnchorNode.download = objectToExport.name += '.json';
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }
    function createFlashcardObject(
        name: string,
        author: string,
        sideName: {front: string; back: string},
        flashcards: Array<Flashcard>
    ) {
        return {
            name: name,
            author: author,
            sideName: {
                ...sideName,
            },
            version: '0.1',
            flashcards: flashcards.map((flashcard) => {
                return {
                    front: [...flashcard.front],
                    back: [...flashcard.back],
                };
            }),
        };
    }
    const {name, author, sideName, flashcards} = defineProps<{
        name: string;
        author: string;
        sideName: {front: string; back: string};
        flashcards: Array<Flashcard>;
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
