<template>
    <!-- <ImportDialog v-if="importDialogOpen" /> -->
    <h1 class="center-text">{{ name }}</h1>
    <h3>by: {{ author }}</h3>
    <AutoSaveButton
        @autoSave="toggleAutoSave"
        ref="auto_save"
        :isAutoSaveOn="autoSave"
    />
    <ImportButton />
    <TextInput
        name="Set Name"
        :value="name"
        @valueChanged="setName"
    />
    <TextInput
        name="Set Author"
        :value="author"
        @valueChanged="setAuthor"
    />
    <div class="center-center row flex-wrap">
        <TextInput
            name="Front Side"
            :value="sideName.front"
            @valueChanged="setFrontSide"
        />
        <TextInput
            name="Back Side"
            :value="sideName.back"
            @valueChanged="setBackSide"
        />
    </div>
    <NewCardboard
        v-for="cardboard in flashcards"
        ref="flashcard_array_object"
        @deleteCardboard="deleteFlashcard"
        @deleteFrontField="deleteFrontField"
        @deleteBackField="deleteBackField"
        @nextCardboard="moveToNextFlashcard"
        @inputFrontChanged="inputFrontChanged"
        @inputBackChanged="inputBackChanged"
        :side-name="sideName"
        :key="cardboard.id"
        :cardboard-data="cardboard"
    />
    <AddButton @newCardboard="createNewFlashcard" />
    <ExportButton
        :name="name"
        :author="author"
        :side-name="sideName"
        :flashcards="flashcards"
        ref="export"
    />
</template>

<script setup lang="ts">
import {onMounted, useTemplateRef} from 'vue';

import TextInput from './components/TextInput.vue';
import NewCardboard from './components/NewCardboard.vue';
import AddButton from './components/AddButton.vue';
import ExportButton from './components/ExportButton.vue';
import AutoSaveButton from './components/AutoSaveButton.vue';
// import ImportButton from './components/ImportButton.vue';
// import ImportDialog from './components/ImportDialog.vue';
import Flashcard from './utils/Flashcard';

type AutoSaveButtonType = InstanceType<typeof AutoSaveButton>;
type ExportButtonType = InstanceType<typeof ExportButton>;

const autoSaveRef = useTemplateRef<AutoSaveButtonType>('auto_save');
const exportRef = useTemplateRef<ExportButtonType>('export');

let autoSave: boolean = false;
let name: string = 'New Set of Flashcards';
let author: string = 'Unknown';
let sideName: {front: string; back: string} = {front: 'Default', back: 'Default'};
const flashcards: Array<Flashcard> = [];

function deleteFrontField(flashcardID: number, fieldID: number) {
    if (flashcards[flashcardID].front.length <= 1) return;
    flashcards[flashcardID].front.splice(fieldID, 1);
}

function deleteBackField(cardboardID: number, fieldID: number) {
    if (flashcards[cardboardID].back.length <= 1) return;
    flashcards[cardboardID].back.splice(fieldID, 1);
}
function toggleAutoSave(toggle: boolean) {
    autoSave = toggle;
    if (autoSave) {
        autoSaveRef.value?.setCookie(
            'last_save',
            JSON.stringify(exportRef.value?.createFlashcardObject(name, author, sideName, flashcards)),
            7
        );
    } else {
        autoSaveRef.value?.deleteCookie('last_save');
    }
}
function createNewFlashcard() {
    flashcards[flashcards.length] = {
        id: flashcards.length,
        front: [''],
        back: [''],
    };
    if (autoSave) {
        autoSaveRef.value?.setCookie(
            'last_save',
            JSON.stringify(exportRef.value?.createFlashcardObject(name, author, sideName, flashcards)),
            7
        );
    }
}
function moveToNextFlashcard(id: number) {
    if (id < flashcards.length - 1) {
        // this.$refs['cardboardArrayObject'][id + 1].$refs['front'].focus();
    } else {
        createNewFlashcard();
    }
}
function deleteFlashcard(id: number) {
    if (flashcards.length <= 1) return;
    flashcards.splice(id, 1);
    var i = 0;
    flashcards.forEach(flashcard => {
        flashcard.id = i;
        i++;
    });
}
function setAuthor(author_a: string) {
    author = author_a;
}
function setName(name_a: string) {
    name = name_a;
}
function setFrontSide(frontSide: string) {
    sideName.front = frontSide;
}
function setBackSide(backSide: string) {
    sideName.back = backSide;
}
function inputFrontChanged(value: string, id: number) {
    if (value.slice(-1) == '/' && value.length > 1) {
        flashcards[id].front.push('');
    } else if (value.slice(-1) != '/') {
        let lastIndex = flashcards[id].front.length - 1;
        flashcards[id].front[lastIndex] = value;
    }
}
function inputBackChanged(value: string, id: number) {
    if (value.slice(-1) == '/' && value.length > 1) {
        flashcards[id].back.push('');
    } else if (value.slice(-1) != '/') {
        let lastIndex = flashcards[id].back.length - 1;
        flashcards[id].back[lastIndex] = value;
    }
}

onMounted(() => {
    var data;
    if ((data = autoSaveRef.value?.getCookie('last_save')) != null) {
           autoSave = true;
        data = JSON.parse(data);
        if (data.name != undefined) name = data.name;
        if (data.author != undefined) author = data.author;
        if (data.sideName != undefined) {
            if (data.sideName.front != undefined) sideName.front = data.sideName.front;
            if (data.sideName.back != undefined) sideName.back = data.sideName.back;
        }
        if (data.cardboards != undefined) {
            if (Array.isArray(data.cardboards)) {
                data.cardboards.forEach((value: {front: Array<string>; back: Array<string>}, index: number) => {
                    flashcards[index] = {
                        id: index,
                        front: value.front != undefined ? value.front : [],
                        back: value.back != undefined ? value.back : [],
                    };
                });
            }
        }
    }
});
</script>

<style>
html,
body {
    padding: 0;
    margin: 0;
    max-width: 100%;
    min-height: 100%;
    background-color: #512b81;
    color: white;
    overflow-x: hidden;
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
</style>
