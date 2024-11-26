<template>
    <div class="center-center flashcard-and-delete">
        <div class="flashcard row center-middle">
            <FlashcardSide
                :label="sideName.front"
                :has-focus="focusPosition === 0"
                v-model="flashcard.front"
            />
            <span class="fields-divider center-center">-></span>
            <FlashcardSide
                :label="sideName.back"
                :has-focus="focusPosition === 1"
                v-model="flashcard.back"
            />
        </div>
        <span
            class="delete-button"
            @click="deleteFlashcard"
        ></span>
    </div>
</template>

<script setup lang="ts">
    import type {Flashcard} from '@/shared/lib/Flashcard';
    import FlashcardSide from './FlashcardSide.vue';
    import {ref} from 'vue';

    const focusPosition = ref(0);

    // import FlashcardInput from './FlashcardInput.vue';
    // import type {Flashcard} from '@/shared/lib/Flashcard';
    // import {onMounted, useTemplateRef} from 'vue';

    // type FlashcardInputType = InstanceType<typeof FlashcardInput>;
    // const frontRef = useTemplateRef<FlashcardInputType>('front_ref');
    // const backRef = useTemplateRef<FlashcardInputType>('back_ref');

    // function deleteFrontField(flashcardID: number, fieldID: number) {
    //     if (flashcard.value.front.length <= 1) return;
    //     flashcard.value.front.splice(fieldID, 1);
    // }
    // function deleteBackField(index: number) {
    //     if (flashcard.value.front.length <= 1) return;
    //     flashcard.value.front.splice(fieldID, 1);
    // }
    // function frontSideMoveTab(value: string) {
    //     if (value != '') {
    //         if (backRef.value != null) {
    //             const inputRefs = backRef.value.inputRefs;
    //             if (inputRefs != null) {
    //                 inputRefs[0].focus();
    //             }
    //         }
    //     }
    // }
    // function backSideMoveTab(value: string) {
    //     if (value != '') {
    //         // emit('nextFlashcard', flashcardElement.id);
    //     }
    // }
    function deleteFlashcard() {
        emit('deleteFlashcard', index);
    }
    // function inputFrontChanged(value: string, index: number) {
    //     emit('inputFrontChanged', value, flashcardElement.id, index);
    // }
    // // function inputBackChanged(value: string, index: number) {
    // //     emit('inputBackChanged', value, flashcardElement.id, index);
    // // }
    const emit = defineEmits<{
        nextFlashcard: [flashcardID: number];
        deleteFlashcard: [flashcardID: number];
        // inputFrontChanged: [value: string, flashcardID: number, textID: number];
        // inputBackChanged: [value: string, flashcardID: number, textID: number];
        // deleteFrontField: [flashcardID: number, fieldID: number];
        // deleteBackField: [flashcardID: number, fieldID: number];
    }>();

    const {index, sideName} = defineProps<{
        index: number;
        sideName: {front: string; back: string};
    }>();

    const flashcard = defineModel<Flashcard>({default: {front: [''], back: ['']}});

    // defineExpose({frontRef, backRef});
    // onMounted(() => {
    //     // if (frontRef.value != null && flashcard.id != 0) {
    //     //     const frontRefs = frontRef.value.inputRefs;
    //     //     if (frontRefs == null) return;
    //     //     frontRefs[0].focus();
    //     // }
    // });
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
        background-image: url(../assets/delete.svg);
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
