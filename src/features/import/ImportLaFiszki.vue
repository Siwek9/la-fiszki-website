<template>
    <div class="input-type-content">
        <div class="upload-file-container">
            <ImportFileButton
                accept=".json"
                @upload="uploadFile"
            />
        </div>
        <div class="json-data-preview-container">
            <div class="json-data-header">
                <h2>File content</h2>
                <TextAreaButtons v-model="fileContent" />
            </div>
            <ImportTextArea
                @error="showError"
                :validateText="validateLaFiszki"
                :customHighlight="jsonHighlight"
                placeholder="...or paste its content here"
                v-model="fileContent"
            />
            <WarningText
                :type="warningType"
                :warningText="validationWarningText"
            />
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
    import TextAreaButtons from '@/features/import/TextAreaButtons.vue';

    function showError(message: string) {
        if (errorStarted.value) {
            clearTimeout(errorTimeout.value);
        }
        errorStarted.value = true;
        errorTimeout.value = setTimeout(() => {
            clearTimeout(errorTimeout.value);
            errorStarted.value = false;
            warningType.value = 'warning';
        }, 2000);
        validationWarningText.value = message;
        warningType.value = 'error';
    }
    const errorTimeout = ref<number>(-1);
    const errorStarted = ref<boolean>(false);

    const warningType = ref<'error' | 'warning'>('warning');

    const flashcards = computed<Array<Flashcard> | undefined>(() => {
        if (fileContent.value == '') return undefined;
        const version = calculateVersion(fileContent.value);
        if (version == undefined) return undefined;
        const set = fixOutdatedSets(JSON.parse(fileContent.value), version);
        if (set == undefined) return undefined;
        return set.flashcards;
    });

    const validationWarningText = ref('');

    const fileContent = defineModel<string>({
        set(value) {
            if (validateLaFiszki(value)) {
                return value;
            } else if (value != '' && value != undefined) {
                showError('Text you try to parse here is not correct');
            }
            return '';
        },
        get(value) {
            if (!validateLaFiszki(value) && value != '' && value != undefined) {
                showError('Text you try to parse here is not correct');
                return '';
            }
            try {
                const formatedValue = JSON.stringify(JSON.parse(value), null, 2);
                return formatedValue;
            } catch (_) {
                return value;
            }
        },
        default: '',
    });

    function uploadFile(content: string) {
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
                    if (!errorStarted.value) {
                        warningType.value = 'warning';
                        validationWarningText.value = 'This set will be upgraded to newer version while exporting';
                    }
                }
                return true;
            } else {
                return false;
            }
        } catch (_) {
            if (text === '') {
                if (!errorStarted.value) {
                    validationWarningText.value = '';
                }
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
        column-gap: 20px;
        border-radius: 0 20px 20px 20px;
        background-color: #35155d;
        padding: 20px;
        max-height: 70vh;
    }

    .json-data-header {
        display: flex;
        flex-direction: row;
        align-items: center;
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
        max-height: 55vh;
        overflow: hidden;
    }
</style>
