<template>
    <div class="text-area-buttons-container">
        <button
            class="text-area-button cut"
            @click="cutContent"
        ></button>
        <button
            class="text-area-button copy"
            @click="copyContent"
        ></button>
        <button
            class="text-area-button paste"
            @click="pasteToContent"
        ></button>
    </div>
</template>
<script setup lang="ts">
    const fileContent = defineModel<string>({default: ''});

    function cutContent() {
        copyContent();
        fileContent.value = '';
    }
    function copyContent() {
        if (fileContent.value != undefined) {
            navigator.clipboard.writeText(fileContent.value);
        }
    }
    async function pasteToContent() {
        fileContent.value = await navigator.clipboard.readText();
    }
</script>
<style scoped>
    .text-area-buttons-container {
        margin: 0 7px;
    }

    .text-area-button {
        box-sizing: border-box;
        margin: 0 8px;
        box-shadow: 7px 7px 0px #260f43;
        border: none;
        border: 3px solid #512b81;
        border-radius: 10px;
        background-position: center center;
        background-size: 65%;
        background-repeat: no-repeat;
        background-color: transparent;
        width: 40px;
        height: 40px;
    }

    .text-area-button:hover {
        cursor: pointer;
    }

    .cut {
        background-image: url(@/assets/icons/cut.svg);
    }

    .copy {
        background-image: url(@/assets/icons/copy.svg);
    }

    .paste {
        background-image: url(@/assets/icons/paste.svg);
    }
</style>
