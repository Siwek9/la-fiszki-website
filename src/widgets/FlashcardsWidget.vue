<template>
    <NewFlashcard
        v-for="(_, index) in flashcards"
        @deleteFlashcard="deleteFlashcard(index)"
        @move-focus="moveToNextFlashcard(index)"
        :side-name="sideNames"
        :key="index"
        ref="new-flashcard-ref"
        v-model="flashcards[index]"
    />
    <AddButton @newFlashcard="createNewFlashcard" />
</template>
<script setup lang="ts">
    import NewFlashcard from '@/features/flashcards/FlashcardField.vue';
    import AddButton from '@/features/flashcards/CreateFlashcardButton.vue';
    import type {Flashcard} from '@/shared/lib/flashcard';
    import type {SideName} from '@/shared/lib/side_name';
    import {nextTick, useTemplateRef} from 'vue';
    import type {ComponentExposed} from 'vue-component-type-helpers';

    const flashcards = defineModel<Array<Flashcard>>({default: [{front: [''], back: ['']}]});
    const newFlashcardRefs = useTemplateRef<Array<ComponentExposed<typeof NewFlashcard>>>('new-flashcard-ref');

    function moveToNextFlashcard(index: number) {
        if (newFlashcardRefs.value == null || newFlashcardRefs.value.length == 0) return;
        if (index < newFlashcardRefs.value.length - 1) {
            newFlashcardRefs.value[index + 1].focus();
        } else {
            createNewFlashcard();
        }
    }
    function createNewFlashcard() {
        flashcards.value?.push({front: [''], back: ['']});
        nextTick(() => {
            if (newFlashcardRefs.value == null || newFlashcardRefs.value.length == 0) return;
            newFlashcardRefs.value[newFlashcardRefs.value.length - 1].focus();
        });
    }

    function deleteFlashcard(id: number) {
        if (flashcards.value.length <= 1) return;
        flashcards.value.splice(id, 1);
    }

    const {sideNames} = defineProps<{sideNames: SideName}>();
</script>
<style></style>
