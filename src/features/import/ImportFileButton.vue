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

    @media screen and (max-width: 800px) {
        .upload-file-button {
            border-radius: 20px;
            padding: 15px 20px;
            font-size: 16px;
        }
    }
</style>
