<template>
    <div
        v-if="warningText != ''"
        class="validation-text"
        :class="type"
    >
        {{ warningText }}
    </div>
</template>
<script setup lang="ts">
    const {warningText, type} = defineProps<{warningText: string; type: 'warning' | 'error'}>();
</script>
<style scoped>
    .validation-text {
        position: relative;
        margin-top: 10px;
        padding-left: 30px;
        color: var(--text-color);
        font-weight: bold;
        font-size: 14px;
        text-wrap: wrap;
    }

    .validation-text:before {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        mask-image: url(@/assets/icons/warning.svg);
        mask-position: center center;
        mask-size: 90%;
        mask-repeat: no-repeat;
        background-color: var(--text-color);
        width: 25px;
        height: 25px;
        content: '';
    }

    .warning {
        --text-color: yellow;
    }

    .error {
        --text-color: red;
    }
</style>
