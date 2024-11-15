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
        v-for="(flashcard, index) in flashcards"
        ref="flashcard_array_object"
        @deleteCardboard="deleteFlashcard"
        @deleteFrontField="deleteFrontField"
        @deleteBackField="deleteBackField"
        @nextCardboard="moveToNextFlashcard"
        @inputFrontChanged="inputFrontChanged"
        @inputBackChanged="inputBackChanged"
        :side-name="sideName"
        :key="index"
        :flashcard-element="{data: flashcard, id: index}"
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
    import {onMounted, ref, useTemplateRef} from 'vue';

    import TextInput from './components/TextInput.vue';
    import NewCardboard from './components/NewCardboard.vue';
    import AddButton from './components/AddButton.vue';
    import ExportButton from './components/ExportButton.vue';
    import AutoSaveButton from './components/AutoSaveButton.vue';
    // import ImportButton from './components/ImportButton.vue';
    // import ImportDialog from './components/ImportDialog.vue';
    import Flashcard from './utils/Flashcard';
    import SetOfFlashcardsVersion from './utils/SetOfFlashcardsVersion';
    import calculateVersion from './utils/CalculateVersion';

    type AutoSaveButtonType = InstanceType<typeof AutoSaveButton>;
    type ExportButtonType = InstanceType<typeof ExportButton>;
    type NewFlashcardType = InstanceType<typeof NewCardboard>;

    const autoSaveRef = useTemplateRef<AutoSaveButtonType>('auto_save');
    const exportRef = useTemplateRef<ExportButtonType>('export');
    const newFlashcardRef = useTemplateRef<Array<NewFlashcardType>>('flashcard_array_object');

    const autoSave = ref(false);
    const name = ref('New Set of Flashcards');
    const author = ref('Unknown');
    const sideName = ref({front: 'Default', back: 'Default'});
    const flashcards = ref([new Flashcard([''], [''])]);

    function deleteFrontField(flashcardID: number, fieldID: number) {
        if (flashcards.value[flashcardID].front.length <= 1) return;
        flashcards.value[flashcardID].front.splice(fieldID, 1);
    }

    function deleteBackField(cardboardID: number, fieldID: number) {
        if (flashcards.value[cardboardID].back.length <= 1) return;
        flashcards.value[cardboardID].back.splice(fieldID, 1);
    }
    function toggleAutoSave(toggle: boolean) {
        autoSave.value = toggle;
        console.log(toggle);
        if (autoSave.value) {
            autoSaveRef.value?.setCookie(
                'last_save',
                JSON.stringify(
                    exportRef.value?.createFlashcardObject(name.value, author.value, sideName.value, flashcards.value)
                ),
                7
            );
        } else {
            autoSaveRef.value?.deleteCookie('last_save');
        }
    }
    function createNewFlashcard() {
        flashcards.value.push(new Flashcard([''], ['']));
        if (autoSave.value) {
            console.log('zapisujemy');
            autoSaveRef.value?.setCookie(
                'last_save',
                JSON.stringify(
                    exportRef.value?.createFlashcardObject(name.value, author.value, sideName.value, flashcards.value)
                ),
                7
            );
        }
    }
    function moveToNextFlashcard(id: number) {
        console.log('siema11');
        console.log(id);
        console.log(flashcards.value.length - 1);
        if (id < flashcards.value.length - 1) {
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
        if (flashcards.value.length <= 1) return;
        flashcards.value.splice(id, 1);
    }
    function setAuthor(author_a: string) {
        author.value = author_a;
    }
    function setName(name_a: string) {
        name.value = name_a;
    }
    function setFrontSide(frontSide: string) {
        sideName.value.front = frontSide;
    }
    function setBackSide(backSide: string) {
        sideName.value.back = backSide;
    }
    function inputFrontChanged(value: string, id: number) {
        if (value.slice(-1) == '/' && value.length > 1) {
            flashcards.value[id].front.push('');
        } else if (value.slice(-1) != '/') {
            const lastIndex = flashcards.value[id].front.length - 1;
            flashcards.value[id].front[lastIndex] = value;
        }
    }
    function inputBackChanged(value: string, id: number) {
        if (value.slice(-1) == '/' && value.length > 1) {
            flashcards.value[id].back.push('');
        } else if (value.slice(-1) != '/') {
            const lastIndex = flashcards.value[id].back.length - 1;
            flashcards.value[id].back[lastIndex] = value;
        }
    }

    const currentVersion: SetOfFlashcardsVersion = SetOfFlashcardsVersion.Version0_1;

    onMounted(() => {
        console.log('siemaneczko');
        console.log(flashcards);
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
                    JSON.stringify(
                        exportRef.value?.createFlashcardObject(
                            name.value,
                            author.value,
                            sideName.value,
                            flashcards.value
                        )
                    ),
                    7
                );
            }

            if (dataJSON.name != undefined) name.value = dataJSON.name;
            if (dataJSON.author != undefined) author.value = dataJSON.author;
            if (dataJSON.sideName != undefined) {
                if (dataJSON.sideName.front != undefined) sideName.value.front = dataJSON.sideName.front;
                if (dataJSON.sideName.back != undefined) sideName.value.back = dataJSON.sideName.back;
            }
            if (dataJSON.flashcards != undefined) {
                if (Array.isArray(dataJSON.flashcards)) {
                    flashcards.value = [];
                    dataJSON.flashcards.forEach(
                        (value: {front: Array<string> | undefined; back: Array<string> | undefined}) => {
                            flashcards.value.push(
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

    input,
    select,
    option,
    button {
        font: inherit;
    }
</style>
