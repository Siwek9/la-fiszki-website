<template>
    <h1 class="center-text">{{ flashcardsSet.name }}</h1>
    <h3>by: {{ flashcardsSet.author }}</h3>
    <AutoSaveButton
        @autoSave="toggleAutoSave"
        ref="auto_save"
        :isAutoSaveOn="autoSave"
    />
    <ImportButton />
    <!-- <ImportDialog v-if="importDialogOpen" /> -->
    <TextInput
        :max-length="70"
        name="Set Name"
        :value="flashcardsSet.name"
        @valueChanged="setName"
    />
    <TextInput
        :max-length="50"
        name="Set Author"
        :value="flashcardsSet.author"
        @valueChanged="setAuthor"
    />
    <div class="center-center row flex-wrap">
        <TextInput
            :max-length="30"
            name="Front Side"
            :value="flashcardsSet.sideName.front"
            @valueChanged="setFrontSide"
        />
        <TextInput
            :max-length="30"
            name="Back Side"
            :value="flashcardsSet.sideName.back"
            @valueChanged="setBackSide"
        />
    </div>
    <NewFlashcard
        v-for="(flashcard, index) in flashcardsSet.flashcards"
        ref="flashcard_array_object"
        @deleteFlashcard="deleteFlashcard"
        @deleteFrontField="deleteFrontField"
        @deleteBackField="deleteBackField"
        @nextFlashcard="moveToNextFlashcard"
        @inputFrontChanged="inputFrontChanged"
        @inputBackChanged="inputBackChanged"
        :side-name="flashcardsSet.sideName"
        :key="index"
        :flashcard-element="{data: flashcard, id: index}"
    />
    <AddButton @newFlashcard="createNewFlashcard" />
    <ExportButton
        :flashcards-set="flashcardsSet"
        ref="export"
    />
</template>

<script setup lang="ts">
    import {onMounted, ref, useTemplateRef} from 'vue';

    import TextInput from './components/TextInput.vue';
    import NewFlashcard from './components/NewFlashcard.vue';
    import AddButton from './components/AddButton.vue';
    import ExportButton from './components/ExportButton.vue';
    import AutoSaveButton from './components/AutoSaveButton.vue';
    import ImportButton from './components/ImportButton.vue';
    // import ImportDialog from './components/ImportDialog.vue';
    import SetOfFlashcardsVersion from './utils/SetOfFlashcardsVersion';
    import calculateVersion from './utils/CalculateVersion';
    import type {FlashcardsSet} from './utils/FlashcardsSet';
    import fixOutdatedSets from './utils/FixOutdatedSets';

    type AutoSaveButtonType = InstanceType<typeof AutoSaveButton>;
    type ExportButtonType = InstanceType<typeof ExportButton>;
    type NewFlashcardType = InstanceType<typeof NewFlashcard>;

    const autoSaveRef = useTemplateRef<AutoSaveButtonType>('auto_save');
    const exportRef = useTemplateRef<ExportButtonType>('export');
    const newFlashcardRef = useTemplateRef<Array<NewFlashcardType>>('flashcard_array_object');

    const autoSave = ref(false);
    const flashcardsSet = ref<FlashcardsSet>({
        name: 'New Set of Flashcards',
        author: 'Unknown',
        sideName: {front: 'Unknown', back: 'Unknown'},
        flashcards: [{front: [''], back: ['']}],
    });

    function deleteFrontField(flashcardID: number, fieldID: number) {
        if (flashcardsSet.value.flashcards[flashcardID].front.length <= 1) return;
        flashcardsSet.value.flashcards[flashcardID].front.splice(fieldID, 1);
    }

    function deleteBackField(flashcardID: number, fieldID: number) {
        if (flashcardsSet.value.flashcards[flashcardID].back.length <= 1) return;
        flashcardsSet.value.flashcards[flashcardID].back.splice(fieldID, 1);
    }
    function toggleAutoSave(toggle: boolean) {
        autoSave.value = toggle;
        if (autoSave.value) {
            localStorage.setItem(
                'last_save',
                JSON.stringify(exportRef.value?.createFlashcardObject(flashcardsSet.value))
            );
        } else {
            localStorage.removeItem('last_save');
        }
    }
    function createNewFlashcard() {
        flashcardsSet.value.flashcards.push({front: [''], back: ['']});
        if (autoSave.value) {
            localStorage.setItem(
                'last_save',
                JSON.stringify(exportRef.value?.createFlashcardObject(flashcardsSet.value))
            );
        }
    }
    function moveToNextFlashcard(id: number) {
        if (id < flashcardsSet.value.flashcards.length - 1) {
            if (newFlashcardRef.value != null) {
                const frontRef = newFlashcardRef.value[id + 1].frontRef?.inputRefs;
                if (frontRef != null) {
                    frontRef[0].focus();
                }
            }
        } else {
            createNewFlashcard();
        }
    }
    function deleteFlashcard(id: number) {
        if (flashcardsSet.value.flashcards.length <= 1) return;
        flashcardsSet.value.flashcards.splice(id, 1);
    }
    function setAuthor(author_a: string) {
        flashcardsSet.value.author = author_a;
    }
    function setName(name_a: string) {
        flashcardsSet.value.name = name_a;
    }
    function setFrontSide(frontSide: string) {
        flashcardsSet.value.sideName.front = frontSide;
    }
    function setBackSide(backSide: string) {
        flashcardsSet.value.sideName.back = backSide;
    }
    function inputFrontChanged(value: string, idFlashcard: number, idText: number) {
        if (value.slice(-1) == '/' && value.length > 1) {
            flashcardsSet.value.flashcards[idFlashcard].front.splice(idText + 1, 0, '');
        } else if (value.slice(-1) != '/') {
            flashcardsSet.value.flashcards[idFlashcard].front[idText] = value;
        }
    }
    function inputBackChanged(value: string, idFlashcard: number, idText: number) {
        if (value.slice(-1) == '/' && value.length > 1) {
            flashcardsSet.value.flashcards[idFlashcard].back.splice(idText + 1, 0, '');
        } else if (value.slice(-1) != '/') {
            flashcardsSet.value.flashcards[idFlashcard].back[idText] = value;
        }
    }

    const currentVersion: SetOfFlashcardsVersion = SetOfFlashcardsVersion.Version0_1;

    onMounted(() => {
        const cookieData = autoSaveRef.value?.getCookie('last_save');

        if (cookieData != null) {
            localStorage.setItem('last_save', cookieData);
            autoSaveRef.value?.deleteCookie('last_save');
        }

        const data = localStorage.getItem('last_save');

        if (data != null) {
            autoSave.value = true;
            let dataJSON = JSON.parse(data);

            const version = calculateVersion(data);

            if (version != currentVersion) {
                dataJSON = fixOutdatedSets(dataJSON, currentVersion);
                localStorage.setItem('last_save', JSON.stringify(dataJSON));
            }

            if (dataJSON.name != undefined) flashcardsSet.value.name = dataJSON.name;
            if (dataJSON.author != undefined) flashcardsSet.value.author = dataJSON.author;
            if (dataJSON.sideName != undefined) {
                if (dataJSON.sideName.front != undefined) flashcardsSet.value.sideName.front = dataJSON.sideName.front;
                if (dataJSON.sideName.back != undefined) flashcardsSet.value.sideName.back = dataJSON.sideName.back;
            }
            if (dataJSON.flashcards != undefined) {
                if (Array.isArray(dataJSON.flashcards)) {
                    flashcardsSet.value.flashcards = [];
                    dataJSON.flashcards.forEach(
                        (value: {front: Array<string> | undefined; back: Array<string> | undefined}) => {
                            flashcardsSet.value.flashcards.push({
                                front: value.front != undefined ? value.front : [''],
                                back: value.back != undefined ? value.back : [''],
                            });
                        }
                    );
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

    h1 {
        text-align: center;
    }

    h3 {
        text-align: center;
    }

    input,
    select,
    option,
    button {
        font: inherit;
    }
</style>
