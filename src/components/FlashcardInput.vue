<template>
    <div class="flashcard-input">
        <span class="input-name">{{ label }}:</span>
        <div
            class="input-field-background"
            v-for="(value, index) in values"
            :key="index"
        >
            <input
                type="text"
                class="input-field"
                placeholder="Text Here"
                maxlength="300"
                :value="value"
                ref="input_refs"
                @input.prevent="(event) => inputChanged(event, index)"
                @focus="inputFocus"
                @keyup.enter="moveTab"
                @keyup.tab.prevent="moveTab"
            />
            <div
                class="delete-input-field"
                @click="deleteField(index)"
            ></div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import {onUpdated, ref, useTemplateRef} from 'vue';

    function deleteField(index: number) {
        emit('deleteField', index);
    }

    function inputChanged(event: Event, index: number) {
        console.log(inputRefs.value);
        emit('inputChanged', (event.currentTarget as HTMLInputElement).value, index);
    }

    function inputFocus(event: Event) {
        (event.currentTarget! as HTMLInputElement).select();
    }

    function moveTab(event: Event) {
        emit('moveTab', (event.currentTarget as HTMLInputElement).value);
    }
    const emit = defineEmits<{
        inputChanged: [value: string, index: number];
        moveTab: [value: string];
        deleteField: [index: number];
    }>();
    const inputRefs = useTemplateRef<Array<HTMLDivElement>>('input_refs');

    defineExpose({inputRefs});

    const {label, values} = defineProps<{label: string; values: Array<string>}>();
    const inputFieldsNumber = ref(0);

    onUpdated(() => {
        console.log('hahahahahhaha');
        if (inputRefs.value == null) return;
        if (inputRefs.value.length > inputFieldsNumber.value) {
            console.log('przesuwam');
            inputRefs.value[inputRefs.value.length - 1].focus();
            inputFieldsNumber.value++;
        }
    });
</script>
<style>
    .flashcard-input .input-field::placeholder {
        color: #8f7da7;
    }

    .flashcard-input .delete-input-field {
        background-color: white;
        height: 100%;
        width: min(50px, 10vw);
        background-color: #fd000066;
        background-image: url(../assets/delete.svg);
        background-repeat: no-repeat;
        background-position: 33% center;
        background-size: 65%;
    }

    .flashcard-input .input-field {
        padding: max(0.5em, 1vw);
        width: min(150px, 25vw);
        max-width: 36vw;
        font-size: max(1.2em, 1.5vw);
        outline: none;
        border: none;
        color: white;
        background-color: transparent;
    }

    .flashcard-input .input-name {
        margin: 0 0 10px 1vw;
        max-width: min(200px, 40vw);
        overflow-wrap: break-word;
    }

    .flashcard-input .input-field-background {
        border-radius: 1.5em;
        background-color: #512b81;
        margin-bottom: 1.25em;
        display: flex;
        flex-direction: row;
        overflow: hidden;
        position: relative;
    }

    .flashcard-input {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>
