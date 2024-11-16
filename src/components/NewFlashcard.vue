<template>
    <div class="center-center flashcard-and-delete">
        <div class="flashcard">
            <div class="row center-middle">
                <FlashcardInput
                    :label="sideName.front"
                    :values="flashcardElement.data.front"
                    @input-changed="inputFrontChanged"
                    @move-tab="frontSideMoveTab"
                    @delete-field="deleteFrontField"
                    ref="front_ref"
                />
                <span class="fields-divider center-center">-></span>
                <FlashcardInput
                    :label="sideName.back"
                    :values="flashcardElement.data.back"
                    @input-changed="inputBackChanged"
                    @move-tab="backSideMoveTab"
                    @delete-field="deleteBackField"
                    ref="back_ref"
                />
            </div>
        </div>
        <span
            class="delete-button"
            @click="deleteFlashcard"
        ></span>
    </div>
</template>

<script setup lang="ts">
    import FlashcardInput from './FlashcardInput.vue';
    import type {Flashcard} from '@/utils/Flashcard';
    import {onMounted, useTemplateRef} from 'vue';

    type FlashcardInputType = InstanceType<typeof FlashcardInput>;
    const frontRef = useTemplateRef<FlashcardInputType>('front_ref');
    const backRef = useTemplateRef<FlashcardInputType>('back_ref');

    function deleteFrontField(index: number) {
        emit('deleteFrontField', flashcardElement.id, index);
    }
    function deleteBackField(index: number) {
        emit('deleteBackField', flashcardElement.id, index);
    }
    function frontSideMoveTab(value: string) {
        if (value != '') {
            if (backRef.value != null) {
                const inputRefs = backRef.value.inputRefs;
                if (inputRefs != null) {
                    inputRefs[0].focus();
                }
            }
        }
    }
    function backSideMoveTab(value: string) {
        if (value != '') {
            emit('nextFlashcard', flashcardElement.id);
        }
    }
    function deleteFlashcard() {
        emit('deleteFlashcard', flashcardElement.id);
    }
    function inputFrontChanged(value: string, index: number) {
        emit('inputFrontChanged', value, flashcardElement.id, index);
    }
    function inputBackChanged(value: string, index: number) {
        emit('inputBackChanged', value, flashcardElement.id, index);
    }
    const emit = defineEmits<{
        nextFlashcard: [flashcardID: number];
        deleteFlashcard: [flashcardID: number];
        inputFrontChanged: [value: string, flashcardID: number, textID: number];
        inputBackChanged: [value: string, flashcardID: number, textID: number];
        deleteFrontField: [flashcardID: number, fieldID: number];
        deleteBackField: [flashcardID: number, fieldID: number];
    }>();

    const {flashcardElement, sideName} = defineProps<{
        flashcardElement: {data: Flashcard; id: number};
        sideName: {front: string; back: string};
    }>();

    defineExpose({frontRef, backRef});
    onMounted(() => {
        if (frontRef.value != null && flashcardElement.id != 0) {
            const frontRefs = frontRef.value.inputRefs;
            if (frontRefs == null) return;
            frontRefs[0].focus();
        }
    });
</script>

<style>
    .fields-divider {
        font-weight: bold;
        font-size: min(2em, 3vw);
        margin: min(15px, 1.5vw);
        white-space: nowrap;
    }

    .flashcard {
        border-radius: 15px;
        background-color: #35155d;
        padding: 15px 3vw;
        margin: 10px min(10px, 2vw);
    }

    .delete-button {
        background-image: url(../assets/delete.svg);
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 70%;
        user-select: none;
        background-color: #fd000066;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        aspect-ratio: 1/1;
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
