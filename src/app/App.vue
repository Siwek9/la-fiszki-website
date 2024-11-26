<template>
    <MainInfoShowWidget
        :title="flashcardsSet.name"
        :author="flashcardsSet.author"
    />
    <AutoSaveWidget
        :flashcards-set="flashcardsSet"
        @autosaveloaded="changeFlashcardsSet"
    />
    <ImportWidget />
    <MainInfoEditorWidget v-model="flashcardsSet" />
    <FlashcardsWidget
        :side-names="flashcardsSet.sideName"
        v-model="flashcardsSet.flashcards"
    />
    <TextButton
        @on-click="exportFlashcards"
        text="Export Set"
    />
    <Notifications
        :max="1"
        :ignore-duplicates="true"
        position="bottom center"
        :duration="3000"
        :speed="500"
        width="400px"
        animation-name="notification-fade-in-out"
        type="error"
    />
</template>

<script setup lang="ts">
    import MainInfoShowWidget from '@/widgets/MainInfoShowWidget.vue';
    import ImportWidget from '@/widgets/ImportWidget.vue';
    import AutoSaveWidget from '@/widgets/AutoSaveWidget.vue';
    import MainInfoEditorWidget from '@/widgets/MainInfoEditorWidget.vue';
    import {Notifications} from '@kyvg/vue3-notification';
    import {ref} from 'vue';

    // import NewFlashcard from '../features/flashcards/NewFlashcard.vue';
    import type {FlashcardsSet} from '../shared/lib/FlashcardsSet';
    import TextButton from '../shared/ui/TextButton.vue';
    import * as st from 'simple-runtypes';
    import {ReadyToBeExported} from '../shared/lib/SetOfFlashcardsValidators';
    import createEmptyFlashcardsSet from '@/shared/lib/create_empty_flashcards_set';
    import FlashcardsWidget from '@/widgets/FlashcardsWidget.vue';

    // type NewFlashcardType = InstanceType<typeof NewFlashcard>;

    // const newFlashcardRef = useTemplateRef<Array<NewFlashcardType>>('flashcard-array-object');

    const flashcardsSet = ref<FlashcardsSet>(createEmptyFlashcardsSet());

    // function deleteBackField(flashcardID: number, fieldID: number) {
    //     if (flashcardsSet.value.flashcards[flashcardID].back.length <= 1) return;
    //     flashcardsSet.value.flashcards[flashcardID].back.splice(fieldID, 1);
    // }

    // function createNewFlashcard() {
    //     flashcardsSet.value.flashcards.push({front: [''], back: ['']});
    // }

    // function inputFrontChanged(value: string, idFlashcard: number, idText: number) {
    //     const positionOfSlash = value.indexOf('/');
    //     if (positionOfSlash != -1 && value.length > 1) {
    //         let contentToMove = '';
    //         if (positionOfSlash != value.length - 1) {
    //             contentToMove = value.slice(positionOfSlash + 1);
    //         }
    //         flashcardsSet.value.flashcards[idFlashcard].front[idText] = value.slice(0, positionOfSlash);
    //         flashcardsSet.value.flashcards[idFlashcard].front.splice(idText + 1, 0, contentToMove);
    //     } else if (value.slice(-1) != '/') {
    //         flashcardsSet.value.flashcards[idFlashcard].front[idText] = value;
    //     }
    // }
    // function inputBackChanged(value: string, idFlashcard: number, idText: number) {
    //     const positionOfSlash = value.indexOf('/');
    //     if (positionOfSlash != -1 && value.length > 1) {
    //         let contentToMove = '';
    //         if (positionOfSlash != value.length - 1) {
    //             contentToMove = value.slice(positionOfSlash + 1);
    //         }
    //         flashcardsSet.value.flashcards[idFlashcard].back[idText] = value.slice(0, positionOfSlash);
    //         flashcardsSet.value.flashcards[idFlashcard].back.splice(idText + 1, 0, contentToMove);
    //     } else if (value.slice(-1) != '/') {
    //         flashcardsSet.value.flashcards[idFlashcard].back[idText] = value;
    //     }
    // }

    function exportFlashcards() {
        if (!st.use(ReadyToBeExported, flashcardsSet.value).ok) {
            return;
        }
        const objectToExport = ReadyToBeExported(flashcardsSet.value);
        console.log(objectToExport);

        const downloadAnchorNode = document.createElement('a');
        const file = new Blob([JSON.stringify(objectToExport)], {type: 'text/plain'});
        downloadAnchorNode.href = URL.createObjectURL(file);
        downloadAnchorNode.download = objectToExport.name += '.json';
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    function changeFlashcardsSet(set: FlashcardsSet) {
        console.log('przypal');
        console.log(set);
        flashcardsSet.value = set;
    }
</script>

<style>
    html,
    body {
        margin: 0;
        background-color: #512b81;
        padding: 0;
        max-width: 100%;
        min-height: 100%;
        overflow-x: hidden;
        color: white;
    }

    #app {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: Mooli, sans-serif;
    }

    .text-center {
        text-align: center;
    }

    .center-center {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .row {
        display: flex;
        flex-direction: row;
    }

    .flex-wrap {
        display: flex;
        flex-wrap: wrap;
    }

    input,
    select,
    option,
    button {
        font: inherit;
    }

    .vue-notification {
        border: none;
        border-radius: 30px;
        background-color: red;
        padding: 10px 50px;
        /* width: 500px; */
        font-size: 18px;

        .notification-title {
            margin: 10px 0px;
            font-variant: small-caps;
            font-size: 22px;
        }

        .notification-content {
            margin: 10px 0px;
        }
    }

    @keyframes notification-fade-in-out {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style>
