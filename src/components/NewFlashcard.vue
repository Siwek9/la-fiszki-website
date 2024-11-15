<template>
    <div class="center-center flashcard-and-delete">
        <div class="flashcard">
            <div class="row center-middle">
                <div class="flashcard-input">
                    <span class="input-name">{{ sideName.front }}:</span>
                    <div
                        class="input-field-background"
                        v-for="(frontValues, index) in flashcardElement.data.front"
                        ref="front_refs"
                        :key="index"
                    >
                        <input
                            type="text"
                            class="input-field"
                            placeholder="Text Here"
                            maxlength="300"
                            :value="frontValues"
                            @input="inputFrontChanged"
                            @focus="inputFocus"
                            @keyup.enter="frontSideMoveTab"
                            @keyup.tab.prevent="frontSideMoveTab"
                        />
                        <div
                            class="delete-input-field"
                            @click="deleteFrontField(index)"
                        ></div>
                    </div>
                </div>
                <span class="fields-divider center-center">-></span>
                <div class="flashcard-input">
                    <span class="input-name">{{ sideName.back }}:</span>
                    <div
                        class="input-field-background"
                        v-for="(backValues, index) in flashcardElement.data.back"
                        ref="back_refs"
                        :key="index"
                    >
                        <input
                            type="text"
                            class="input-field"
                            placeholder="Text Here"
                            maxlength="300"
                            :value="backValues"
                            @input="inputBackChanged"
                            @focus="inputFocus"
                            @keyup.enter.prevent="backSideMoveTab"
                            @keydown.tab.prevent="backSideMoveTab"
                        />
                        <div
                            class="delete-input-field"
                            @click="deleteBackField(index)"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
        <span
            class="delete-button"
            @click="deleteFlashcard"
        ></span>
    </div>
</template>

<script setup lang="ts">
    import type Flashcard from '@/utils/Flashcard';
    import {onBeforeMount, onMounted, onUpdated, useTemplateRef} from 'vue';

    const frontRefs = useTemplateRef<Array<HTMLDivElement>>('front_refs');
    const backRefs = useTemplateRef<Array<HTMLDivElement>>('back_refs');
    let frontElementNumber = 1;
    let backElementNumber = 1;

    function deleteFrontField(index: number) {
        emit('deleteFrontField', flashcardElement.id, index);
    }
    function deleteBackField(index: number) {
        emit('deleteBackField', flashcardElement.id, index);
    }
    function inputFocus(event: FocusEvent) {
        (event.currentTarget! as HTMLInputElement).select();
    }
    function frontSideMoveTab(event: Event) {
        if ((event.currentTarget as HTMLInputElement).value != '') {
            if (backRefs.value != null) {
                (backRefs.value[0].firstChild! as HTMLDivElement).focus();
            }
        }
    }
    function backSideMoveTab(event: Event) {
        if ((event.currentTarget as HTMLInputElement).value != '') {
            emit('nextFlashcard', flashcardElement.id);
        }
    }
    function deleteFlashcard() {
        emit('deleteFlashcard', flashcardElement.id);
    }
    function inputFrontChanged(event: Event) {
        emit('inputFrontChanged', (event.currentTarget as HTMLInputElement).value, flashcardElement.id);
    }
    function inputBackChanged(event: Event) {
        event.preventDefault();
        emit('inputBackChanged', (event.currentTarget as HTMLInputElement).value, flashcardElement.id);
    }
    const emit = defineEmits<{
        nextFlashcard: [flashcardID: number];
        deleteFlashcard: [flashcardID: number];
        inputFrontChanged: [value: string, flashcardID: number];
        inputBackChanged: [value: string, flashcardID: number];
        deleteFrontField: [flashcardID: number, fieldID: number];
        deleteBackField: [flashcardID: number, fieldID: number];
    }>();
    const {flashcardElement, sideName} = defineProps<{
        flashcardElement: {data: Flashcard; id: number};
        sideName: {front: string; back: string};
    }>();
    defineExpose({frontRefs, backRefs});
    onMounted(() => {
        if (frontRefs.value != null) {
            (frontRefs.value[0].firstChild! as HTMLDivElement).focus();
        }
    });
    onBeforeMount(() => {
        if (frontRefs.value != null) {
            frontRefs.value.length = 0;
        }
        if (backRefs.value != null) {
            backRefs.value.length = 0;
        }
    });
    onUpdated(() => {
        if (frontRefs.value == null || backRefs.value == null) return;
        if (frontRefs.value.length > frontElementNumber) {
            (frontRefs.value[frontRefs.value.length - 1].firstChild! as HTMLDivElement).focus();
            frontElementNumber++;
        } else if (backRefs.value.length > backElementNumber) {
            (backRefs.value[backRefs.value.length - 1].firstChild! as HTMLDivElement).focus();
            backElementNumber++;
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

    .flashcard-input .input-field::placeholder {
        color: #8f7da7;
    }

    .flashcard-input .delete-input-field {
        background-color: white;
        height: 100%;
        width: min(50px, 10vw);
        background-color: #fd000066;
        background-image: url(../assets/delete.svg);
        background-repeat: no-repeat;
        background-position: 33% center;
        background-size: 65%;
    }

    .flashcard-input .input-field {
        padding: max(0.5em, 1vw);
        width: min(150px, 25vw);
        max-width: 36vw;
        font-size: max(1.2em, 1.5vw);
        outline: none;
        border: none;
        color: white;
        background-color: transparent;
    }

    .flashcard-input .input-name {
        margin: 0 0 10px 1vw;
        max-width: min(200px, 40vw);
        overflow-wrap: break-word;
    }

    .flashcard-input .input-field-background {
        border-radius: 1.5em;
        background-color: #512b81;
        margin-bottom: 1.25em;
        display: flex;
        flex-direction: row;
        overflow: hidden;
        position: relative;
    }

    .flashcard-input {
        display: flex;
        flex-direction: column;
        justify-content: center;
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
