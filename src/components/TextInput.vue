<template>
    <div class="text-input-body">
        <span class="text-input-name">{{ name }}:</span>
        <input
            @focus="focusText"
            @input="inputValue"
            :value="value"
            class="text-input-field"
            type="text"
        />
    </div>
</template>

<script setup lang="ts">
    import type {InputHTMLAttributes} from 'vue';

    function inputValue(event: Event) {
        emit('valueChanged', (event.target as InputHTMLAttributes).value);
    }
    function focusText(e: FocusEvent) {
        (e.target as HTMLInputElement).select();
    }
    const emit = defineEmits<{valueChanged: [value: string]}>();
    const {name, value} = defineProps<{name: string; value: string}>();
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

    .text-input-name {
        background-color: #35155d;
        padding: 7px;
        border-radius: 10px 10px 0 0;
    }

    .text-input-body {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin: 10px;
        max-width: 92vw;
    }
</style>
