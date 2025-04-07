<template>
    <div class="preview-buttons-container">
        <input
            type="radio"
            class="preview-button-input"
            name="preview-type"
            id="file-content"
            v-model="currentPreview"
            :value="PreviewType.FileContent"
        />
        <label
            for="file-content"
            class="preview-button-label"
        >
            File Content
        </label>

        <input
            type="radio"
            class="preview-button-input"
            name="preview-type"
            id="import-preview"
            v-model="currentPreview"
            :value="PreviewType.ImportPreview"
            checked
        />
        <label
            for="import-preview"
            class="preview-button-label"
            >Import Preview</label
        >
    </div>
</template>
<script lang="ts" setup>
    import PreviewType from '@/entities/import/preview_type';

    const currentPreview = defineModel<PreviewType>();
</script>
<style scoped>
    .preview-buttons-container {
        display: flex;
        flex-direction: row;
        border-radius: 15px;
        /* border-radius: 25px 25px 0 0; */
        overflow: hidden;
    }

    .preview-button-input {
        display: none;
    }

    .preview-button-label {
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
        border: none;
        background-color: transparent;
        padding: 10px 15px;
        color: white;
        text-align: center;
    }

    .preview-button-input:checked + .preview-button-label {
        background-color: var(--third-background-color);
    }
</style>
