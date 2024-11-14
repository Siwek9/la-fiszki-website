<template>
    <div class="center-center cardboard-and-delete">
        <div class="cardboard">
            <div class="row center-middle">
                <div class="cardboard-input">
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
                <div class="cardboard-input">
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
            @click="deleteCardboard"
        ></span>
    </div>
</template>

<script setup lang="ts">
    import type Flashcard from '@/utils/Flashcard';
    // import type HTMLFocusEvent from '@/utils/HTMLFocusEvent';
    // import type HTMLInputEvent from '@/utils/HTMLInputEvent';
    import {onBeforeMount, onMounted, onUpdated, useTemplateRef} from 'vue';

    const frontRefs = useTemplateRef<Array<HTMLDivElement>>('front_refs');
    const backRefs = useTemplateRef<Array<HTMLDivElement>>('back_refs');
    let frontElementNumber = 1;
    let backElementNumber = 1;

    function deleteFrontField(index: number) {
        console.log(index);
        emit('deleteFrontField', flashcardElement.id, index);
    }
    function deleteBackField(index: number) {
        console.log(index);
        emit('deleteBackField', flashcardElement.id, index);
    }
    function inputFocus(event: FocusEvent) {
        (event.currentTarget! as HTMLInputElement).select();
    }
    function frontSideMoveTab(event: Event) {
        if ((event.currentTarget as HTMLInputElement).value != '') {
            if (backRefs.value != null) {
                backRefs.value[0].focus();
            }
        }
    }
    function backSideMoveTab(event: Event) {
        if ((event.currentTarget as HTMLInputElement).value != '') {
            emit('nextCardboard', flashcardElement.id);
        }
    }
    function deleteCardboard() {
        emit('deleteCardboard', flashcardElement.id);
    }
    function inputFrontChanged(event: Event) {
        emit('inputFrontChanged', (event.currentTarget as HTMLInputElement).value, flashcardElement.id);
    }
    function inputBackChanged(event: Event) {
        event.preventDefault();
        emit('inputBackChanged', (event.currentTarget as HTMLInputElement).value, flashcardElement.id);
    }
    const emit = defineEmits<{
        nextCardboard: [cardboardID: number];
        deleteCardboard: [cardboardID: number];
        inputFrontChanged: [value: string, cardboardID: number];
        inputBackChanged: [value: string, cardboardID: number];
        deleteFrontField: [cardboardID: number, fieldID: number];
        deleteBackField: [cardboardID: number, fieldID: number];
    }>();
    const {flashcardElement, sideName} = defineProps<{
        flashcardElement: {data: Flashcard; id: number};
        sideName: {front: string; back: string};
    }>();
    onMounted(() => {
        if (frontRefs.value != null) {
            frontRefs.value[0].focus();
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
            frontRefs.value[frontRefs.value.length - 1].focus();
            frontElementNumber++;
        } else if (backRefs.value.length > backElementNumber) {
            backRefs.value[backRefs.value.length - 1].focus();
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

    .cardboard-input .input-field::placeholder {
        color: #8f7da7;
    }

    .cardboard-input .delete-input-field {
        background-color: white;
        height: 100%;
        width: min(50px, 10vw);
        background-color: #fd000066;
        position: absolute;
        top: 0;
        right: 0;
        background-image: url(../assets/delete.svg);
        background-repeat: no-repeat;
        background-position: 33% center;
        background-size: 65%;
        /* transition: 0.5s; */
    }

    .cardboard-input .input-field {
        width: 200px;
        max-width: 36vw;
        font-size: max(1.2em, 1.5vw);
        outline: none;
        border: none;
        color: white;
        background-color: transparent;
    }

    .cardboard-input .input-name {
        margin: 0 0 10px 1vw;
    }

    .cardboard-input .input-field-background {
        padding: max(0.5em, 1vw);
        border-radius: 1.5em;
        background-color: #512b81;
        margin-bottom: 1.25em;
        display: flex;
        flex-direction: row;
        overflow: hidden;
        position: relative;
    }

    .cardboard-input {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .cardboard {
        border-radius: 15px;
        background-color: #35155d;
        padding: 15px 3vw;
        margin: 10px min(10px, 2vw);
    }

    .delete-button {
        background-image: url(../assets/delete.svg);
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 85%;
        user-select: none;
        background-color: #fd000066;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        aspect-ratio: 1/1;
    }

    @media only screen and (min-width: 600px) {
        .cardboard-and-delete {
            flex-direction: row;
            margin-left: 40px;
        }
    }

    @media only screen and (max-width: 600px) {
        .cardboard-and-delete {
            flex-direction: column;
            margin-left: 0;
        }
    }
    .delete-button:hover {
        cursor: pointer;
    }

    .cardboard-and-delete {
        display: flex;
    }
</style>
