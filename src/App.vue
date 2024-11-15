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
        name="Set Name"
        :value="flashcardsSet.name"
        @valueChanged="setName"
    />
    <TextInput
        name="Set Author"
        :value="flashcardsSet.author"
        @valueChanged="setAuthor"
    />
    <div class="center-center row flex-wrap">
        <TextInput
            name="Front Side"
            :value="flashcardsSet.sideName.front"
            @valueChanged="setFrontSide"
        />
        <TextInput
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
    import Flashcard from './utils/Flashcard';
    import SetOfFlashcardsVersion from './utils/SetOfFlashcardsVersion';
    import calculateVersion from './utils/CalculateVersion';
    import type {FlashcardsSet} from './utils/FlashcardsSet';

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
        console.log(toggle);
        if (autoSave.value) {
            autoSaveRef.value?.setCookie(
                'last_save',
                JSON.stringify(exportRef.value?.createFlashcardObject(flashcardsSet.value)),
                7
            );
        } else {
            autoSaveRef.value?.deleteCookie('last_save');
        }
    }
    function createNewFlashcard() {
        flashcardsSet.value.flashcards.push(new Flashcard([''], ['']));
        if (autoSave.value) {
            console.log('zapisujemy');
            autoSaveRef.value?.setCookie(
                'last_save',
                JSON.stringify(exportRef.value?.createFlashcardObject(flashcardsSet.value)),
                7
            );
        }
    }
    function moveToNextFlashcard(id: number) {
        console.log('siema11');
        console.log(id);
        console.log(flashcardsSet.value.flashcards.length - 1);
        if (id < flashcardsSet.value.flashcards.length - 1) {
            console.log('siema12');
            if (newFlashcardRef.value != null) {
                console.log('siema13');
                const frontRef = newFlashcardRef.value[id + 1].frontRefs;
                if (frontRef != null) {
                    console.log('siema14');
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
    function inputFrontChanged(value: string, id: number) {
        if (value.slice(-1) == '/' && value.length > 1) {
            flashcardsSet.value.flashcards[id].front.push('');
        } else if (value.slice(-1) != '/') {
            const lastIndex = flashcardsSet.value.flashcards[id].front.length - 1;
            flashcardsSet.value.flashcards[id].front[lastIndex] = value;
        }
    }
    function inputBackChanged(value: string, id: number) {
        if (value.slice(-1) == '/' && value.length > 1) {
            flashcardsSet.value.flashcards[id].back.push('');
        } else if (value.slice(-1) != '/') {
            const lastIndex = flashcardsSet.value.flashcards[id].back.length - 1;
            flashcardsSet.value.flashcards[id].back[lastIndex] = value;
        }
    }

    const currentVersion: SetOfFlashcardsVersion = SetOfFlashcardsVersion.Version0_1;

    onMounted(() => {
        console.log('siemaneczko');
        console.log(flashcardsSet.value.flashcards);
        const data = autoSaveRef.value?.getCookie('last_save');
        if (data != null) {
            autoSave.value = true;
            const dataJSON = JSON.parse(data);

            const version = calculateVersion(data);

            console.log(version?.toString());

            if (version != currentVersion) {
                autoSaveRef.value?.deleteCookie('last_save');
                autoSaveRef.value?.setCookie(
                    'last_save',
                    JSON.stringify(exportRef.value?.createFlashcardObject(flashcardsSet.value)),
                    7
                );
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
                            flashcardsSet.value.flashcards.push(
                                new Flashcard(
                                    value.front != undefined ? value.front : [],
                                    value.back != undefined ? value.back : []
                                )
                            );
                            console.log('dodatkowe gowno');
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
