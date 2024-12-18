<template>
    <label class="auto-save-container">
        <div
            for="auto-save-input"
            class="auto-save-label"
        >
            Auto save
        </div>
        <div class="switch">
            <input
                id="auto-save-input"
                type="checkbox"
                @change="toggle"
                :checked="isAutoSaveOn"
            />
            <span class="slider round"></span>
        </div>
    </label>
</template>

<script setup lang="ts">
    import {getHTMLInputElement} from '@/shared/lib/get_html_input_element';

    function toggle(event: Event) {
        emit('autoSave', getHTMLInputElement(event).checked);
    }

    const emit = defineEmits<{autoSave: [status: boolean]}>();

    const {isAutoSaveOn} = defineProps<{isAutoSaveOn: boolean}>();
</script>
<style>
    .auto-save-container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
        padding: 10px 0;
    }

    .auto-save-label {
        margin-right: 2vw;
    }

    .switch {
        display: inline-block;
        position: relative;
        width: 60px;
        height: 34px;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transition: 0.3s;
        cursor: pointer;
        background-color: #99000066;
    }

    .slider:before {
        position: absolute;
        bottom: 4px;
        left: 4px;
        -webkit-transition: 0.3s;
        transition: 0.3s;
        background-color: #512b81;
        width: 26px;
        height: 26px;
        content: '';
    }

    input:checked + .slider {
        background-color: #1f990098;
    }

    input:focus + .slider {
        box-shadow: 0 0 1px #1f990098;
    }

    input:checked + .slider:before {
        transform: translateX(26px);
    }

    .slider.round {
        border-radius: 34px;
    }

    .slider.round:before {
        border-radius: 50%;
    }
</style>
