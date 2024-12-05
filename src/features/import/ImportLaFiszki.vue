<template>
    <div class="input-type-content">
        <div class="upload-file-container">
            <ImportFileButton @upload="uploadFile" />
        </div>
        <div class="json-data-preview-container">
            <h2>File content</h2>
            <ImportTextArea
                @error="showError"
                :validateText="validateLaFiszki"
                :customHighlight="jsonHighlight"
                placeholder="...or paste its content here"
                v-model="fileContent"
            />
            <WarningText :warningText="validationWarningText" />
        </div>
        <div class="import-preview-container">
            <h2>Import preview</h2>
            <ImportPreview :import-content="flashcards" />
        </div>
    </div>
</template>
<script setup lang="ts">
    import ImportPreview from '@/features/import/ImportPreview.vue';
    import ImportFileButton from '@/features/import/ImportFileButton.vue';
    import calculateVersion from '@/shared/lib/CalculateVersion';
    import SetOfFlashcardsVersion from '@/shared/lib/flashcards_set_version';
    import ImportTextArea from '@/features/import/ImportTextArea.vue';
    import jsonHighlight from '@/shared/lib/json_highlight';
    import WarningText from '@/features/import/WarningText.vue';
    import {computed, ref} from 'vue';
    import type {Flashcard} from '@/shared/lib/Flashcard';
    import fixOutdatedSets from '@/shared/lib/fix_outdated_sets';

    function showError(message: string) {
        console.log(message);

        fileContent.value = '';
    }

    const flashcards = computed<Array<Flashcard> | undefined>(() => {
        if (fileContent.value == '') return undefined;
        const version = calculateVersion(fileContent.value);
        if (version == undefined) return undefined;
        const set = fixOutdatedSets(JSON.parse(fileContent.value), version);
        if (set == undefined) return undefined;
        return set.flashcards;
    });

    const validationWarningText = ref('');

    const fileContent = defineModel<string>({default: ''});

    function uploadFile(content: string) {
        console.log('wee snaw');
        console.log(content);
        fileContent.value = content;
    }

    function validateLaFiszki(text: string): boolean {
        try {
            JSON.parse(text);
            const version = calculateVersion(text);
            if (version != undefined) {
                if (version == SetOfFlashcardsVersion.Version0_1) {
                    validationWarningText.value = '';
                } else {
                    validationWarningText.value = 'This set will be upgraded to newer version while exporting';
                }
                return true;
            } else {
                return false;
            }
        } catch (_) {
            if (text === '') {
                validationWarningText.value = '';
            }
            return false;
        }
    }
</script>
<style scoped>
    .input-type-content {
        display: grid;
        grid-template-rows: 100px 1fr;
        grid-template-columns: 1fr 1fr;
        grid-template-areas:
            'import-button import-preview'
            'json-preview import-preview';
        border-radius: 0 20px 20px 20px;
        background-color: #35155d;
        padding: 20px;
    }

    .upload-file-container {
        display: flex;
        grid-area: import-button;
        justify-content: center;
        align-items: center;
    }

    .json-data-preview-container {
        grid-area: json-preview;
        width: min(450px, 40vw);
    }

    .import-preview-container {
        grid-area: import-preview;
        width: min(450px, 40vw);
    }
</style>
