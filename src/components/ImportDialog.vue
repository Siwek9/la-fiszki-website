<template>
    <dialog
        ref="dialog-ref"
        class="import-dialog"
    >
        <button
            @click="closeDialog"
            class="close_button"
        ></button>
        <h1>Import Sets from multiple sources</h1>
        <div class="choose-input-type">
            <input
                type="radio"
                name="import-type"
                value="la-fiszki"
                id="la-fiszki"
                v-model="inputType"
                checked
                class="first-import-type-input-radio import-type-input-radio"
            />
            <label
                class="import-type-label"
                for="la-fiszki"
            >
                La Fiszki
            </label>
            <input
                type="radio"
                name="import-type"
                value="csv"
                id="csv"
                v-model="inputType"
                class="import-type-input-radio"
            />
            <label
                class="import-type-label"
                for="csv"
            >
                CSV
            </label>
        </div>
        <div
            v-if="inputType == 'la-fiszki'"
            class="input-type-content"
        >
            <div class="upload-file-container">
                <input
                    type="file"
                    name=""
                    class="input-file"
                    @change="uploadFile"
                    id="import-la-fiszki"
                    accept=".json"
                />
                <label
                    for="import-la-fiszki"
                    class="upload-file-button"
                    >Upload file...</label
                >
            </div>
            <div class="json-data-preview-container">
                <h2>File content</h2>
                <ImportTextArea
                    @error="(message) => console.log(message)"
                    :validateText="validateLaFiszki"
                    :customHighlight="jsonHighlight"
                    placeholder="...or paste its content here"
                    v-model="fileContent"
                />
                <div
                    v-if="validationWarningText != ''"
                    class="validation-warning-text"
                >
                    {{ validationWarningText }}
                </div>
            </div>
            <div class="import-preview-container">
                <h2>Import preview</h2>
            </div>
        </div>
        <div
            v-else-if="inputType == 'csv'"
            class="input-type-content"
        ></div>
        <div>
            <input
                type="checkbox"
                id="override-changes"
            />
            <label for="override-changes">Override Changes</label>
        </div>
        <button>Apply import</button>
    </dialog>
</template>

<script setup lang="ts">
    import {onUnmounted, ref, useTemplateRef} from 'vue';
    import 'overlayscrollbars/overlayscrollbars.css';
    import ImportTextArea from './ImportTextArea.vue';
    import calculateVersion from '@/utils/CalculateVersion';
    import type {TextHighlight} from '@/utils/TextHighlight';
    import SetOfFlashcardsVersion from '@/utils/SetOfFlashcardsVersion';

    function closeDialog() {
        dialogRef.value?.close();
    }
    onUnmounted(closeDialog);

    const jsonHighlight: TextHighlight = [
        {
            regex: /("(.*?)")(?=\s*:)/g, // key
            style: {
                color: '#007acc',
            },
        },
        {
            regex: /: ("(.*?)")/g, // string
            style: {
                color: '#d69d85',
            },
            replace: ': $1',
        },
        {
            regex: /: (\d+)/g, // number
            style: {
                color: '#b5cea8',
            },
            replace: ': $1',
        },
        {
            regex: /: (true|false)/g, // boolean
            style: {
                color: '#569cd6',
            },
            replace: ': $1',
        },
        {
            regex: /: (null)/g, // null
            style: {
                color: '#9cdcfe',
            },
            replace: ': $1',
        },
    ];

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
            return false;
        }
    }

    function uploadFile(event: Event) {
        const files = (event.currentTarget as HTMLInputElement).files;
        if (files == null) {
            return;
        }
        const reader = new FileReader();
        reader.readAsText(files[0], 'UTF-8');
        reader.onload = function (evt) {
            const value = evt.target?.result;
            if (typeof value == 'string') {
                fileContent.value = value as unknown as string;
            }
        };
    }
    const fileContent = ref('');
    const validationWarningText = ref('');

    const inputType = defineModel({
        set(value) {
            console.log(value);
            return value;
        },
        default: 'la-fiszki',
    });
    const dialogRef = useTemplateRef<HTMLDialogElement>('dialog-ref');
    defineExpose({dialogRef});
</script>

<style scoped>
    .import-dialog {
        position: fixed;
        border: none;
        border-radius: 20px;
        background-color: #512b81;
        padding: 40px 30px;
        padding-right: 100px;
        color: white;
    }

    .import-dialog::backdrop {
        opacity: 0.7;
        backdrop-filter: blur(2px);
        background-color: black;
    }

    .close_button {
        position: absolute;
        top: 20px;
        right: 20px;
        border: none;
        border-radius: 50%;
        background-image: url(../assets/close.svg);
        background-position: center center;
        background-size: 80%;
        background-repeat: no-repeat;
        background-color: #35155d;
        width: 45px;
        height: 45px;
    }

    .close_button:hover {
        cursor: pointer;
    }

    h1 {
        margin: 0;
        margin-top: 10px;
        margin-bottom: 20px;
        font-size: 25px;
    }

    h2 {
        margin: 10px;
        font-size: 20px;
    }

    .choose-input-type {
        display: flex;
        flex-direction: row;
    }

    .import-type-input-radio {
        display: none;
    }

    .import-type-label {
        display: block;
        padding: 10px;
    }
    .import-type-input-radio:checked + .import-type-label {
        background-image: linear-gradient(180deg, #512b81 0%, #35155d 100%);
    }

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

    .input-file {
        display: none;
    }

    .upload-file-button {
        border-radius: 15px;
        background-color: #260f43;
        padding: 10px;
    }

    .upload-file-button:hover {
        cursor: pointer;
    }

    .json-data-preview-container {
        grid-area: json-preview;
        width: min(450px, 40vw);
    }

    .import-preview-container {
        grid-area: import-preview;
    }

    .validation-warning-text {
        position: relative;
        margin: 10px;
        padding-left: 35px;
        color: yellow;
        text-wrap: wrap;
    }

    .validation-warning-text:before {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        mask-image: url(../assets/warning.svg);
        mask-position: center center;
        mask-size: 90%;
        mask-repeat: no-repeat;
        background-color: yellow;
        width: 30px;
        height: 30px;
        content: '';
    }
</style>
