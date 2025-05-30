<template>
    <div class="input-type-content">
        <div class="part-of-import upload-file-container">
            <ImportFileButton
                accept=".csv,.txt"
                @upload="uploadFile"
            />
        </div>
        <div class="part-of-import json-data-preview-container">
            <template v-if="currentPreview == PreviewType.FileContent || !isThin">
                <div class="json-data-header">
                    <h2 v-if="!isThin">File content</h2>
                    <TextAreaButtons v-model="fileContent" />
                </div>
                <ImportTextArea
                    @error="showError"
                    :validateText="validateCSV"
                    placeholder="...or paste its content here"
                    :customHighlight="csvHighlight()"
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
        <div class="part-of-import csv-settings-container">
            <CsvSettingsButton
                name="Delimiter"
                v-model="delimiter"
            />
            <CsvSettingsButton
                name="Row Delimiter"
                v-model="rowDelimiter"
            />
            <CsvSettingsButton
                name="Words separator"
                v-model="wordsSeparator"
            />
        </div>
        <div
            v-if="isThin"
            class="part-of-import preview-buttons-container"
        >
            <PreviewButton v-model="currentPreview" />
        </div>
        <div
            v-if="!isThin"
            class="import-preview-container"
        >
            <h2>Import preview</h2>
            <ImportPreview :import-content="flashcards" />
        </div>
    </div>
</template>
<script setup lang="ts">
    import ImportPreview from '@/features/import/ImportPreview.vue';
    import ImportFileButton from '@/features/import/ImportFileButton.vue';
    import PreviewButton from '@/features/import/PreviewButton.vue';
    import ImportTextArea from '@/features/import/ImportTextArea.vue';
    import WarningText from '@/features/import/WarningText.vue';
    import {computed, ref, watch} from 'vue';
    import type {Flashcard} from '@/shared/lib/flashcard';
    import TextAreaButtons from '@/features/import/TextAreaButtons.vue';
    import CsvSettingsButton from '@/features/import/CsvSettingsButton.vue';
    import type {TextHighlight} from '@/shared/lib/text_highlight';
    import convertDelimiterToUse from '@/shared/lib/convert_delimiter_to_use';
    import {useMediaQuery} from '@vueuse/core';
    import PreviewType from '@/entities/import/preview_type';

    function showError(message: string) {
        if (errorStarted.value) {
            clearTimeout(errorTimeout.value);
        }
        errorStarted.value = true;
        const lastError = validationWarningText.value;
        const lastErrorType = warningType.value;
        errorTimeout.value = setTimeout(() => {
            clearTimeout(errorTimeout.value);
            errorStarted.value = false;
            if (validationWarningText.value == message) {
                warningType.value = lastErrorType;
                validationWarningText.value = lastError;
            }
        }, 2000);
        validationWarningText.value = message;
        warningType.value = 'error';
    }

    const isThin = useMediaQuery('screen and not (min-width: 1200px)');
    const currentPreview = ref<PreviewType>(PreviewType.ImportPreview);

    const errorTimeout = ref<number>(-1);
    const errorStarted = ref<boolean>(false);

    const rowDelimiter = defineModel('rowDelimiter', {default: '\\r\\n'});
    const delimiter = defineModel('delimiter', {default: ';'});
    const wordsSeparator = defineModel('wordsSeparator', {default: '/'});

    const warningType = ref<'error' | 'warning'>('warning');

    const flashcards = computed<Array<Flashcard> | undefined>(() => {
        if (!validateCSV(fileContent.value)) {
            return undefined;
        }
        return fileContent.value.split(convertDelimiterToUse(rowDelimiter.value)).map<Flashcard>((flashcard) => {
            const flashcardSides = flashcard.split(convertDelimiterToUse(delimiter.value));
            if (wordsSeparator.value == '') {
                return {
                    front: [flashcardSides[0]],
                    back: [flashcardSides[1]],
                };
            } else {
                return {
                    front: flashcardSides[0].split(convertDelimiterToUse(wordsSeparator.value)),
                    back: flashcardSides[1].split(convertDelimiterToUse(wordsSeparator.value)),
                };
            }
        });
    });

    watch([rowDelimiter, delimiter, wordsSeparator], () => {
        if (!validateCSV(fileContent.value) && fileContent.value != '') {
            validationWarningText.value = 'This text is not valid CSV. If it is, try changing delimiters to match.';
            warningType.value = 'error';
        } else {
            validationWarningText.value = '';
            warningType.value = 'warning';
        }
    });

    const validationWarningText = ref('');

    const fileContent = defineModel<string>({
        set(value) {
            if (!validateCSV(value) && value != '' && value != undefined) {
                validationWarningText.value = 'This text is not valid CSV. If it is, try changing delimiters to match.';
                warningType.value = 'error';
            } else {
                validationWarningText.value = '';
                warningType.value = 'warning';
            }
            if (value.includes('\r') && rowDelimiter.value == '\\n') {
                rowDelimiter.value = '\\r\\n';
            } else if (rowDelimiter.value == '\\r\\n') {
                rowDelimiter.value = '\\n';
            }
            return value;
        },
        get(value) {
            return value;
        },
        default: '',
    });

    function uploadFile(content: string) {
        fileContent.value = content;
    }

    function csvHighlight(): TextHighlight {
        return [
            {
                detectRegex: RegExp(
                    `([^${convertDelimiterToUse(rowDelimiter.value)}].*${convertDelimiterToUse(delimiter.value)}.*${convertDelimiterToUse(delimiter.value)}.*)+`,
                    'g'
                ),
                style: {
                    color: 'white',
                    'background-color': '#ff000088',
                },
            },
            {
                detectRegex: RegExp(
                    `([^${convertDelimiterToUse(rowDelimiter.value)}${convertDelimiterToUse(delimiter.value)}]+)`,
                    'g'
                ),
                style: {
                    color: '#007acc',
                },
            },
            {
                detectRegex: RegExp(`([${convertDelimiterToUse(delimiter.value)}]+)`, 'g'),
                style: {
                    color: '#ff0000',
                },
            },
        ];
    }

    function validateCSV(text: string): boolean {
        if (text == undefined) return false;
        const rows = text.split(convertDelimiterToUse(rowDelimiter.value));
        if (
            rows.every((row) => {
                return (row.match(new RegExp(`${convertDelimiterToUse(delimiter.value)}`, 'g')) || []).length == 1;
            })
        ) {
            return true;
        } else if (
            rows.some((row) => {
                return (row.match(new RegExp(`${convertDelimiterToUse(delimiter.value)}`, 'g')) || []).length > 1;
            })
        ) {
            warningType.value = 'warning';
            validationWarningText.value =
                'Some rows have delimiters repeated multiple times. Some data may not be imported.';
            return true;
        }

        return false;
    }
</script>
<style scoped>
    .input-type-content {
        display: grid;
        grid-template-rows: 70px 1fr;
        grid-template-areas: 'import-button' 'csv-settings' 'json-preview' 'preview-buttons';
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
    }

    .import-preview-container {
        display: flex;
        grid-area: import-preview;
        flex-direction: column;
        overflow: hidden;
    }

    .json-data-header {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
    }

    .csv-settings-container {
        display: flex;
        column-gap: 25px;
        grid-area: csv-settings;
        flex-direction: row;
        justify-content: space-between;
        /* width: min(450px, 40vw); */
    }

    @media screen and (min-width: 1200px) {
        .input-type-content {
            grid-template-columns: 1fr 1fr;
            grid-template-areas:
                'import-button csv-settings'
                'json-preview import-preview';
            width: 960px;
        }
    }
</style>
