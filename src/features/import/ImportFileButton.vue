<template>
    <input
        type="file"
        class="input-file"
        @change="uploadFile"
        id="import-file-button"
        accept=".json"
    />
    <label
        for="import-file-button"
        class="upload-file-button"
        >Upload file...</label
    >
</template>
<script setup lang="ts">
    import readFileContent from '@/shared/lib/read_file_content';

    const emit = defineEmits<{upload: [content: string]}>();

    async function uploadFile(event: Event) {
        const zmienna = await readFileContent(event);
        console.log(zmienna);
        emit('upload', zmienna);
    }
</script>
<style>
    .input-file {
        display: none;
    }

    .upload-file-button {
        border-radius: 30px;
        background-color: #260f43;
        padding: 25px 50px;
        font-size: 18px;
    }

    .upload-file-button:hover {
        cursor: pointer;
    }
</style>
