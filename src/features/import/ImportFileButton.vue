<template>
    <input
        type="file"
        class="input-file"
        @change="uploadFile"
        id="import-file-button"
        :accept="accept"
    />
    <label
        for="import-file-button"
        class="upload-file-button"
        >Upload file...</label
    >
</template>
<script setup lang="ts">
    import readFileContent from '@/shared/lib/read_file_content';

    const {accept} = defineProps<{accept: string}>();

    const emit = defineEmits<{upload: [content: string]}>();

    async function uploadFile(event: Event) {
        emit('upload', await readFileContent(event));
        // event.preventDefault();
    }
</script>
<style>
    .input-file {
        display: none;
    }

    .upload-file-button {
        display: block;
        box-sizing: border-box;
        margin: 0 15px;
        /* margin-bottom: 20px; */
        box-shadow: 7px 7px 0px #260f43;
        border: none;
        border: 3px solid #512b81;
        border-radius: 10px;
        padding: 15px 25px;
        font-size: 20px;
    }

    .upload-file-button:hover {
        cursor: pointer;
    }
</style>
