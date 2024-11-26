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
    import {getHTMLInputElement} from '@/shared/lib/get_html_input_element';

    const model = defineModel();

    function focusText(event: FocusEvent) {
        getHTMLInputElement(event).select();
    }
    const {name, maxLength} = defineProps<{name: string; maxLength: number}>();
</script>

<style>
    .text-input-field {
        all: unset;
        box-sizing: border-box;
        border-radius: 0 10px 10px 10px;
        background-color: #35155d;
        padding: 10px;
        width: 100%;
        font-size: 30px;
    }

    .text-input-name:before {
        position: absolute;
        right: -30px;
        bottom: 0;
        box-shadow: -5px 5px 0 0 #35155d;
        border-bottom-left-radius: 10px;
        width: 30px;
        height: 30px;
        content: '';
    }

    .text-input-name {
        position: relative;
        border-radius: 10px 10px 0 0;
        background-color: #35155d;
        padding: 7px;
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
