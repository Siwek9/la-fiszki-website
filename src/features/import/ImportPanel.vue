<template>
    <MainDialog @close="closeDialog">
        <h1>Import Sets from multiple sources</h1>
        <div class="choose-input-type">
            <InputImportType
                name="La Fiszki"
                value="la-fiszki"
                v-model="inputType"
                checked
            />
            <InputImportType
                name="CSV"
                value="csv"
                v-model="inputType"
            />
        </div>
        <ImportLaFiszki
            v-if="inputType == 'la-fiszki'"
            v-model="fileContent"
        />
        <!-- <ImportCSV
            v-if="inputType == 'csv'"
            v-model="fileContent"
            v-model:delimiter="delimiter"
            v-model:row-delimiter="rowDelimiter"
            v-model:word-separator="wordsSeparator"
        />-->
        <div>
            <ToggleOverrideChanges v-model="overrideChanges" />
        </div>
        <TextButton
            @click="importFlashcards"
            :disabled="!isFileImportable"
            text="Apply Import"
        />
    </MainDialog>
</template>

<script setup lang="ts">
    import {computed, ref, watch} from 'vue';
    import InputImportType from '@/features/import/InputImportType.vue';
    import MainDialog from '@/shared/ui/MainDialog.vue';
    import ImportLaFiszki from '@/features/import/ImportLaFiszki.vue';
    import ToggleOverrideChanges from '@/features/import/ToggleOverrideChanges.vue';
    import TextButton from '@/shared/ui/TextButton.vue';
    import createEmptyFlashcardsSet from '@/shared/lib/create_empty_flashcards_set';
    import calculateVersion from '@/shared/lib/CalculateVersion';
    import fixOutdatedSets from '@/shared/lib/fix_outdated_sets';
    import type {FlashcardsSet} from '@/shared/lib/flashcards_set';
    import ImportCSV from './ImportCSV.vue';
    import convertDelimiterToUse from '@/shared/lib/convert_delimiter_to_use';
    import type {Flashcard} from '@/shared/lib/Flashcard';

    function closeDialog() {
        emit('close');
    }

    const fileContent = ref('');
    const isFileImportable = computed<boolean>(() => {
        if (inputType.value == 'la-fiszki') {
            if (fileContent.value == '') return false;
            const version = calculateVersion(fileContent.value);
            if (version == undefined) return false;
            const set = fixOutdatedSets(JSON.parse(fileContent.value), version);
            if (set == undefined) return false;
            return true;
        } else if (inputType.value == 'csv') {
            if (rowDelimiter.value == '' || delimiter.value == '') return false;

            return fileContent.value.split(convertDelimiterToUse(rowDelimiter.value)).some((row) => {
                return (row.match(new RegExp(`${convertDelimiterToUse(delimiter.value)}`, 'g')) || []).length > 1;
            });
        }
        return false;
    });

    const overrideChanges = ref(true);

    const inputType = ref<'la-fiszki' | 'csv'>('la-fiszki');
    watch(inputType, () => {
        fileContent.value = '';
    });
    const rowDelimiter = ref<string>('\\r\\n');
    const delimiter = ref<string>(';');
    const wordsSeparator = ref<string>('/');

    const emit = defineEmits<{close: []; import: [flashcardsSet: FlashcardsSet, overrideChanges: boolean]}>();

    function importFlashcards() {
        let flashcardsSetToImport = createEmptyFlashcardsSet();
        if (inputType.value == 'la-fiszki') {
            if (fileContent.value == '') return;
            const version = calculateVersion(fileContent.value);
            if (version == undefined) return;
            const set = fixOutdatedSets(JSON.parse(fileContent.value), version);
            if (set == undefined) return;
            flashcardsSetToImport = set;
        } else if (inputType.value == 'csv') {
            if (wordsSeparator.value == '') {
                flashcardsSetToImport.flashcards = fileContent.value
                    .split(convertDelimiterToUse(rowDelimiter.value))
                    .map<Flashcard>((row) => {
                        const twoSides = row.split(convertDelimiterToUse(delimiter.value));
                        return {front: [twoSides[0]], back: [twoSides[1]]};
                    });
            } else {
                flashcardsSetToImport.flashcards = fileContent.value
                    .split(convertDelimiterToUse(rowDelimiter.value))
                    .map<Flashcard>((row) => {
                        const twoSides = row.split(convertDelimiterToUse(delimiter.value));
                        return {
                            front: twoSides[0].split(convertDelimiterToUse(wordsSeparator.value)),
                            back: twoSides[1].split(convertDelimiterToUse(wordsSeparator.value)),
                        };
                    });
            }
        }

        emit('import', flashcardsSetToImport, overrideChanges.value);
        emit('close');
    }
</script>

<style scoped>
    h1 {
        margin: 0;
        margin-right: 50px;
        margin-bottom: 20px;
        width: fit-content;
        font-size: clamp(20px, 3vw, 25px);
    }

    .choose-input-type {
        display: flex;
        flex-direction: row;
    }
</style>
