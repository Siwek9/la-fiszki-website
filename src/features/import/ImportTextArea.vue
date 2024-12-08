<template>
    <OverlayScrollbarsComponent
        class="custom-textarea-wrapper"
        element="div"
    >
        <div
            class="highlighted-content"
            ref="highlighted-content"
        ></div>

        <div
            class="contenteditable-div"
            contenteditable
            :placeholder="placeholder"
            @focus="handleFocus"
            @keydown="handleKeydown"
            @paste="handlePaste"
            ref="editable-div"
        >
            {{ model }}
        </div>
    </OverlayScrollbarsComponent>
</template>

<script setup lang="ts">
    import highlightText from '@/shared/lib/highlight_text';
    import type {TextHighlight} from '@/shared/lib/text_highlight';
    import {OverlayScrollbarsComponent} from 'overlayscrollbars-vue';
    import {onMounted, useTemplateRef} from 'vue';

    const model = defineModel<string>({
        set() {},
        get(value) {
            updateHighlighting(value);
            return value;
        },

        default: '',
    });

    const {placeholder, customHighlight} = defineProps<{
        placeholder?: string;
        customHighlight?: TextHighlight;
        validateText?: (text: string) => boolean;
    }>();

    const emit = defineEmits<{
        (event: 'error', message: string): void;
    }>();

    const editableDiv = useTemplateRef<HTMLDivElement>('editable-div');
    const highlightedContent = useTemplateRef<HTMLDivElement>('highlighted-content');

    onMounted(() => {
        updateHighlighting(model.value);
    });

    const handlePaste = (event: ClipboardEvent) => {
        event.preventDefault();
        const text = event.clipboardData?.getData('text/plain') || '';

        model.value = text;
    };

    const handleFocus = () => {
        if (editableDiv.value) {
            const range = document.createRange();
            const selection = window.getSelection();

            range.selectNodeContents(editableDiv.value);
            selection?.removeAllRanges();
            selection?.addRange(range);
        }
    };

    const handleKeydown = (event: KeyboardEvent) => {
        if (!editableDiv.value) return;

        if (event.ctrlKey && event.key === 'a') {
            event.preventDefault();

            const range = document.createRange();
            const selection = window.getSelection();

            range.selectNodeContents(editableDiv.value);
            selection?.removeAllRanges();
            selection?.addRange(range);
        } else if (event.ctrlKey && event.key === 'v') {
            return;
        } else if (event.ctrlKey && event.key === 'c') {
            return;
        } else if (event.key === 'Delete' || event.key === 'Backspace') {
            event.preventDefault();

            const selection = window.getSelection();
            const range = selection?.getRangeAt(0);

            if (range && range.startContainer === editableDiv.value && range.endContainer === editableDiv.value) {
                const selectedText = range.toString().trim();
                if (selectedText === editableDiv.value.innerText.trim()) {
                    model.value = '';
                }
            }
        } else if (event.key.length == 1) {
            // hack to detect if user want to write a character and is not using special key
            emit('error', 'You cannot write text here.');
        }

        event.preventDefault();
    };

    const updateHighlighting = (text: string) => {
        if (highlightedContent.value) {
            highlightedContent.value.innerHTML = highlightText(text, customHighlight);
        }
    };
</script>

<style>
    .custom-textarea-wrapper {
        position: relative;
        margin: 10px;
        border-radius: 10px;
        background-color: #260f43;
        /* width: calc(100%); */
        min-height: 300px;
        max-height: 40vh;
        overflow: auto;
    }

    .highlighted-content {
        position: absolute;
        top: 0;
        left: 0;
        appearance: textarea;
        -moz-appearance: textfield-multiline;
        -webkit-appearance: textarea;
        z-index: 2;
        box-sizing: border-box;
        padding: 10px;
        width: 100%;
        height: 100%;
        overflow: visible;
        pointer-events: none;
        color: rgb(184, 184, 184);
        font-weight: 500;
        font-size: 18px;
        font-family: 'DM Mono', monospace;
        white-space: pre;
    }
    .contenteditable-div {
        position: relative;
        appearance: textarea;
        -moz-appearance: textfield-multiline;
        -webkit-appearance: textarea;
        z-index: 1;
        box-sizing: border-box;
        border: none;
        background: none;
        padding: 10px;
        width: 100%;
        height: 100%;
        overflow: visible;
        resize: none;
        color: transparent;
        caret-color: white;
        font-weight: 500;
        font-size: 18px;
        font-family: 'DM Mono', monospace;
        white-space: pre;
    }

    .contenteditable-div:empty:before {
        pointer-events: none;
        content: attr(placeholder);
        color: #aaa;
    }

    .contenteditable-div:focus {
        outline: none;
    }

    .contenteditable-div::selection {
        background-color: hsla(87, 100%, 20%, 0.589);
        /* color: rgb(145, 145, 145); */
    }

    .custom-textarea-wrapper:focus-within {
        outline: none;
    }
</style>
