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
        margin: 10px;
        padding-left: 35px;
        color: var(--text-color);
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
        width: 30px;
        height: 30px;
        content: '';
    }

    .warning {
        --text-color: yellow;
    }

    .error {
        --text-color: red;
    }
</style>
