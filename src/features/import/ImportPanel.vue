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
        <ImportCSV
            v-if="inputType == 'csv'"
            v-model="fileContent"
        />
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
            if (csvDelimeter == 'siema') {
            }
            return false;
        }
        return false;
    });

    const overrideChanges = ref(true);

    const inputType = ref<'la-fiszki' | 'csv'>('la-fiszki');
    watch(inputType, () => {
        fileContent.value = '';
    });
    const csvDelimeter: string = '';
    const splitFieldsOnSlash = true;

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
            if (csvDelimeter == 'siema') {
                console.log(splitFieldsOnSlash);
            }
        }

        emit('import', flashcardsSetToImport, overrideChanges.value);
        emit('close');
    }
</script>

<style scoped>
    h1 {
        margin: 0;
        margin-top: 10px;
        margin-bottom: 20px;
        font-size: 25px;
    }

    h2 {
        margin: 10px;
        font-size: 22px;
    }

    .choose-input-type {
        display: flex;
        flex-direction: row;
    }
</style>
