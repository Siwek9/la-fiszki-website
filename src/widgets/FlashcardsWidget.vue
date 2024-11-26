<template>
    <NewFlashcard
        v-for="(_, index) in flashcards"
        ref="flashcard-array-object"
        @deleteFlashcard="deleteFlashcard"
        @focus="focusPosition = index"
        @lostfocus="onLostFocus"
        :index="index"
        :side-name="sideNames"
        :has-focus="focusPosition == index"
        :key="index"
        v-model="flashcards[index]"
    />
    <AddButton @newFlashcard="createNewFlashcard" />
</template>
<script setup lang="ts">
    import NewFlashcard from '@/features/flashcards/NewFlashcard.vue';
    import AddButton from '@/features/flashcards/AddButton.vue';
    import type {Flashcard} from '@/shared/lib/Flashcard';
    import type {SideName} from '@/shared/lib/SideName';
    import {ref} from 'vue';

    const flashcards = defineModel<Array<Flashcard>>({default: [{front: [''], back: ['']}]});

    const focusPosition = ref(-1);

    // function moveToNextFlashcard(id: number) {
    //     if (id < flashcards.value.length - 1) {
    //         focusPosition.value = id + 1;
    //     } else {
    //         createNewFlashcard();
    //     }
    // }
    function createNewFlashcard() {
        flashcards.value?.push({front: [''], back: ['']});
    }

    function deleteFlashcard(id: number) {
        if (flashcards.value.length <= 1) return;
        flashcards.value.splice(id, 1);
    }

    function onLostFocus(index: number) {
        if (focusPosition.value == index) {
            focusPosition.value = -1;
        }
    }

    const {sideNames} = defineProps<{sideNames: SideName}>();
</script>
<style></style>
