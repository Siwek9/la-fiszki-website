<template>
    <div class="input-field-background">
        <input
            type="text"
            class="input-field"
            placeholder="Text Here"
            maxlength="300"
            ref="input-ref"
            :value="text"
            @input.prevent="inputChanged"
            @focus="inputFocus"
            @keyup.enter="emit('moveFocus')"
            @keyup.tab.prevent="emit('moveFocus')"
        />
        <div
            class="delete-input-field"
            @click="emit('deleteField')"
        ></div>
    </div>
</template>
<script setup lang="ts">
    import {getHTMLInputElement} from '@/shared/lib/get_html_input_element';
    import {useTemplateRef} from 'vue';

    function inputChanged(event: Event) {
        const value = getHTMLInputElement(event).value;
        const positionOfSlash = value.indexOf('/');
        if (positionOfSlash != -1 && value.length > 1) {
            let contentToMove = '';
            if (positionOfSlash != value.length - 1) {
                contentToMove = value.slice(positionOfSlash + 1);
            }
            emit('splitInput', contentToMove);
            text.value = value.slice(0, positionOfSlash);
            getHTMLInputElement(event).value = value.slice(0, positionOfSlash);
        } else if (value.slice(-1) != '/') {
            text.value = value;
        }
    }

    function inputFocus(event: FocusEvent) {
        getHTMLInputElement(event).select();
    }

    const inputRef = useTemplateRef<HTMLInputElement>('input-ref');

    function focus() {
        inputRef.value?.focus();
    }

    defineExpose({
        focus,
    });

    const text = defineModel<string>({
        default: '',
    });

    const emit = defineEmits<{
        splitInput: [textToMove: string];
        deleteField: [];
        moveFocus: [];
    }>();
</script>
<style scoped>
    .flashcard-input .input-field::placeholder {
        color: #8f7da7;
    }

    .flashcard-input .delete-input-field {
        background-image: url(@/assets/delete.svg);
        background-position: 33% center;
        background-size: 65%;
        background-repeat: no-repeat;
        background-color: white;
        background-color: #99000066;
        width: min(50px, 10vw);
        height: 100%;
    }

    .flashcard-input .input-field {
        outline: none;
        border: none;
        background-color: transparent;
        padding: clamp(0.5em, 1vw, 0.7em);
        width: min(150px, 25vw);
        max-width: 36vw;
        color: white;
        font-size: clamp(1.2em, 1.5vw, 1.8em);
    }

    .flashcard-input .input-name {
        margin: 0 0 10px 1vw;
        max-width: min(200px, 40vw);
        overflow-wrap: break-word;
    }

    .flashcard-input .input-field-background {
        display: flex;
        position: relative;
        flex-direction: row;
        margin-bottom: 1.25em;
        border-radius: 1.5em;
        background-color: #512b81;
        overflow: hidden;
    }

    .flashcard-input {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>
