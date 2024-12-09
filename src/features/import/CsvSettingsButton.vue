<template>
    <div class="button-container">
        <span class="setting-name">{{ name }}</span>
        <div class="input-wrapper">
            <input
                class="setting-input"
                v-model="characters"
                type="text"
                @focus="selectText"
            />
        </div>
    </div>
</template>
<script setup lang="ts">
    import {getHTMLInputElement} from '@/shared/lib/get_html_input_element';

    const {name} = defineProps<{name: string}>();
    const characters = defineModel<string>({default: ''});
    function selectText(event: Event) {
        getHTMLInputElement(event).select();
    }
</script>
<style scoped>
    .button-container {
        display: flex;
        flex: 1;
        flex-direction: column;
    }

    .setting-name {
        display: flex;
        flex: 3;
        align-items: flex-end;
        font-weight: bold;
        font-size: 18px;
    }

    .input-wrapper {
        display: flex;
        flex: 4;
        align-items: center;
    }

    .setting-input {
        outline: none;
        border: none;
        border-radius: 10px;
        background-color: #260f43;
        padding: 10px;
        width: 100%;
        color: white;
        font-size: 18px;
    }
</style>
