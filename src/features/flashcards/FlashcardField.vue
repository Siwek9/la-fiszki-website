<template>
    <div class="center-center flashcard-and-delete">
        <div class="flashcard row center-middle">
            <FlashcardSide
                :label="sideName.front"
                v-model="flashcard.front"
                ref="front-ref"
                @move-tab="moveTabToBackSide"
            />
            <span class="fields-divider center-center">-></span>
            <FlashcardSide
                :label="sideName.back"
                v-model="flashcard.back"
                ref="back-ref"
                @move-tab="moveTabToNextFlashcard"
            />
        </div>
        <span
            class="delete-button"
            @click="deleteFlashcard"
        ></span>
    </div>
</template>

<script setup lang="ts">
    import type {Flashcard} from '@/shared/lib/flashcard';
    import FlashcardSide from './FlashcardSide.vue';
    import type {ComponentExposed} from 'vue-component-type-helpers';
    import {useTemplateRef} from 'vue';

    function moveTabToBackSide() {
        if (backRef.value == null) return;

        backRef.value.focus();
    }
    function moveTabToNextFlashcard() {
        emit('moveFocus');
    }

    function focus() {
        if (frontRef.value == null) return;

        frontRef.value.focus();
    }

    const frontRef = useTemplateRef<ComponentExposed<typeof FlashcardSide>>('front-ref');
    const backRef = useTemplateRef<ComponentExposed<typeof FlashcardSide>>('back-ref');
    const emit = defineEmits<{moveFocus: []; deleteFlashcard: []}>();

    function deleteFlashcard() {
        emit('deleteFlashcard');
    }

    const {sideName} = defineProps<{
        sideName: {front: string; back: string};
    }>();

    const flashcard = defineModel<Flashcard>({default: {front: [''], back: ['']}});

    defineExpose({focus});
</script>

<style>
    .fields-divider {
        margin: min(15px, 1.5vw);
        font-weight: bold;
        font-size: min(2em, 3vw);
        white-space: nowrap;
    }

    .flashcard {
        margin: 10px min(10px, 2vw);
        border-radius: 15px;
        background-color: #35155d;
        padding: 15px 3vw;
    }

    .delete-button {
        border-radius: 50%;
        background-image: url(@/assets/icons/delete.svg);
        background-position: center center;
        background-size: 70%;
        background-repeat: no-repeat;
        background-color: #99000066;
        aspect-ratio: 1/1;
        width: 50px;
        height: 50px;
        user-select: none;
    }

    @media only screen and (min-width: 600px) {
        .flashcard-and-delete {
            flex-direction: row;
            margin-left: 40px;
        }
    }

    @media only screen and (max-width: 600px) {
        .flashcard-and-delete {
            flex-direction: column;
            margin-left: 0;
        }
    }
    .delete-button:hover {
        cursor: pointer;
    }

    .flashcard-and-delete {
        display: flex;
    }
</style>
