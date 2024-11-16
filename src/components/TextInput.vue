<template>
    <div class="text-input-body">
        <span class="text-input-name">{{ name }}:</span>
        <input
            :maxlength="maxLength"
            @focus="focusText"
            class="text-input-field"
            type="text"
            v-model.trim="model"
        />
    </div>
</template>

<script setup lang="ts">
    const model = defineModel();

    function focusText(e: FocusEvent) {
        (e.target as HTMLInputElement).select();
    }
    const {name, maxLength} = defineProps<{name: string; maxLength: number}>();
</script>

<style>
    .text-input-field {
        all: unset;
        background-color: #35155d;
        font-size: 30px;
        border-radius: 0 10px 10px 10px;
        box-sizing: border-box;
        padding: 10px;
        width: 100%;
    }

    .text-input-name:before {
        content: '';
        position: absolute;
        bottom: 0;
        box-shadow: -5px 5px 0 0 #35155d;
        right: -30px;
        height: 30px;
        width: 30px;
        border-bottom-left-radius: 50%;
    }

    .text-input-name {
        background-color: #35155d;
        padding: 7px;
        border-radius: 10px 10px 0 0;
        position: relative;
    }

    .text-input-body {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        /* position: relative; */
        margin: 10px;
        max-width: 92vw;
    }
</style>
