<template>
    <div class="flashcard-input">
        <span class="input-name">{{ label }}:</span>
        <FlashcardInput
            v-for="(_, index) in values"
            @split-input="(content) => splitInput(index, content)"
            @delete-field="deleteField(index)"
            @move-focus="moveFocus(index)"
            ref="flashcard-input-refs"
            v-model="values[index]"
            :key="index"
        />
    </div>
</template>
<script setup lang="ts">
    import {computed, nextTick, useTemplateRef} from 'vue';
    import FlashcardInput from './FlashcardInput.vue';

    function deleteField(index: number) {
        values.value.splice(index, 1);
    }

    const inputsCount = computed(() => {
        return flashcardInputRefs.value == null ? 0 : flashcardInputRefs.value.length;
    });

    function splitInput(index: number, text: string) {
        values.value.splice(index + 1, 0, text);

        nextTick(() => {
            if (flashcardInputRefs.value == null || flashcardInputRefs.value.length == 0) return;
            flashcardInputRefs.value[index + 1].focus();
        });
    }

    type FlashcardInputType = InstanceType<typeof FlashcardInput>;

    const flashcardInputRefs = useTemplateRef<Array<FlashcardInputType>>('flashcard-input-refs');

    function moveFocus(inputIndex: number) {
        if (flashcardInputRefs.value == null || inputIndex + 1 > flashcardInputRefs.value.length) return;
        if (inputIndex + 1 == inputsCount.value) {
            emit('moveTab');
        } else {
            flashcardInputRefs.value[inputIndex + 1].focus();
        }
    }

    function focus() {
        if (flashcardInputRefs.value == null || flashcardInputRefs.value.length == 0) return;
        flashcardInputRefs.value[0].focus();
    }

    defineExpose({focus});

    const emit = defineEmits<{
        moveTab: [];
    }>();
    const values = defineModel<Array<string>>({
        default: [''],
    });

    const {label} = defineProps<{label: string}>();
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
