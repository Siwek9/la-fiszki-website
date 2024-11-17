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
                class="import-type-input-radio"
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
            <input
                type="file"
                name=""
                class="input-file"
                @change="uploadFile"
                id="import-la-fiszki"
                accept=".json"
            />
            <label for="import-la-fiszki">Upload file</label>
            <textarea
                name=""
                id=""
                :value="JSON.stringify(JSON.parse(fileContent), null, 2)"
            >
            </textarea>
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
    import {ref, useTemplateRef} from 'vue';

    // const formatter = new JSONFormatter(myJSON);

    function closeDialog() {
        dialogRef.value?.close();
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
    const fileContent = ref('{}');

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
        color: white;
        padding: 40px 30px;
        background-color: #512b81;
        border-radius: 20px;
        border: none;
        padding-right: 100px;
        position: relative;
    }

    .import-dialog::backdrop {
        background-color: black;
        opacity: 0.7;
        backdrop-filter: blur(2px);
    }

    .close_button {
        background-image: url(../assets/close.svg);
        background-size: 80%;
        background-position: center center;
        background-repeat: no-repeat;
        border: none;
        width: 45px;
        height: 45px;
        position: absolute;
        right: 20px;
        top: 20px;
        background-color: #35155d;
        border-radius: 50%;
    }

    .close_button:hover {
        cursor: pointer;
    }

    h1 {
        font-size: 25px;
        margin: 0;
        margin-top: 10px;
        margin-bottom: 20px;
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
        background-color: #35155d;
        padding: 20px;
        border-radius: 0 20px 20px 20px;
    }

    .input-file {
        display: none;
    }
</style>
