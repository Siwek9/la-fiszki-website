<template>
    <div class="input-type-content">
        <div class="part-of-import upload-file-container">
            <ImportFileButton
                accept=".json"
                @upload="uploadFile"
            />
        </div>
        <div
            v-if="isThin"
            class="part-of-import preview-buttons-container"
        >
            <PreviewButton v-model="currentPreview" />
        </div>
        <div class="part-of-import json-data-preview-container">
            <template v-if="currentPreview == PreviewType.FileContent || !isThin">
                <div class="json-data-header">
                    <h2 v-if="!isThin">File content</h2>
                    <TextAreaButtons v-model="fileContent" />
                </div>
                <ImportTextArea
                    @error="showError"
                    :validateText="validateLaFiszki"
                    :customHighlight="jsonHighlight"
                    placeholder="...or paste its content here"
                    v-model="fileContent"
                />
            </template>
            <template v-else>
                <ImportPreview :import-content="flashcards" />
            </template>
            <WarningText
                :type="warningType"
                :warningText="validationWarningText"
            />
        </div>
        <div
            v-if="!isThin"
            class="part-of-import import-preview-container"
        >
            <h2>Import preview</h2>
            <ImportPreview :import-content="flashcards" />
        </div>
    </div>
</template>
<script setup lang="ts">
    import ImportPreview from '@/features/import/ImportPreview.vue';
    import ImportFileButton from '@/features/import/ImportFileButton.vue';
    import calculateVersion from '@/shared/lib/calculate_version';
    import SetOfFlashcardsVersion from '@/shared/lib/flashcards_set_version';
    import ImportTextArea from '@/features/import/ImportTextArea.vue';
    import jsonHighlight from '@/shared/lib/json_highlight';
    import WarningText from '@/features/import/WarningText.vue';
    import {computed, ref} from 'vue';
    import type {Flashcard} from '@/shared/lib/flashcard';
    import fixOutdatedSets from '@/shared/lib/fix_outdated_sets';
    import TextAreaButtons from '@/features/import/TextAreaButtons.vue';
    import PreviewButton from '@/features/import/PreviewButton.vue';
    import {useMediaQuery} from '@vueuse/core';
    import PreviewType from '@/entities/import/preview_type';

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

    const isThin = useMediaQuery('screen and not (min-width: 1200px)');

    const warningType = ref<'error' | 'warning'>('warning');

    const flashcards = computed<Array<Flashcard> | undefined>(() => {
        if (fileContent.value == '') return undefined;
        const version = calculateVersion(fileContent.value);
        if (version == undefined) return undefined;
        const set = fixOutdatedSets(JSON.parse(fileContent.value), version);
        if (set == undefined) return undefined;
        return set.flashcards;
    });

    const currentPreview = ref<PreviewType>(PreviewType.ImportPreview);

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
        grid-template-areas: 'import-button' 'preview-buttons' 'json-preview';
        column-gap: 20px;
        row-gap: 10px;
        box-sizing: border-box;
        border-radius: 0 20px 20px 20px;
        background-color: var(--second-background-color);
        padding: 20px;
        width: 450px;
        max-width: 100%;
        max-height: 100%;
        overflow: hidden;
    }

    .part-of-import {
        /* flex-shrink: 1; */
        /* flex: 1 1 450px; */
        /* width: 450px; */
        /* width: min(450px, 100%); */
        /* width: 450px;
        max-width: 100%; */
    }

    .upload-file-container {
        grid-area: import-button;
    }

    .preview-buttons-container {
        grid-area: preview-buttons;
    }

    .json-data-preview-container {
        display: flex;
        grid-area: json-preview;
        flex-direction: column;
        overflow: hidden;
        /* max-height: 100%; */
    }

    .import-preview-container {
        grid-area: import-preview;
    }

    .json-data-header {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
    }

    @media screen and (min-width: 1200px) {
        .input-type-content {
            grid-template-columns: 1fr 1fr;
            grid-template-areas:
                'import-button import-preview'
                'json-preview import-preview';
            width: 920px;
        }
        /* .preview-buttons-container {
              display: none;
          } */
    }
</style>
