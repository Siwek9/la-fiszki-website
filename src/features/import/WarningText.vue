<template>
    <div
        v-if="warningText != ''"
        class="validation-warning-text"
    >
        {{ warningText }}
    </div>
</template>
<script setup lang="ts">
    const {warningText} = defineProps<{warningText: string}>();
</script>
<style scoped>
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
        mask-image: url(@/assets/icons/warning.svg);
        mask-position: center center;
        mask-size: 90%;
        mask-repeat: no-repeat;
        background-color: yellow;
        width: 30px;
        height: 30px;
        content: '';
    }
</style>
