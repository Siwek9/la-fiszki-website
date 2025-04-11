<template>
    <OverlayScrollbarsComponent
        class="custom-textarea-wrapper"
        element="div"
        :style="model.length <= 0 ? 'height: 200px;' : ''"
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
            @drop="handleDrop"
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
        set(value) {
            return value;
        },
        get(value: string) {
            updateHighlighting(value);
            return value;
        },

        default: '',
    });

    const handleDrop = (event: DragEvent) => {
        // TODO: handle drop event
        event.preventDefault();
    };

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
        } else if (
            event.ctrlKey &&
            (event.key.toLowerCase() === 'c' || event.key.toLowerCase() === 'w' || event.key.toLowerCase() === 't')
        ) {
            return;
        } else if (event.ctrlKey && event.key.toLowerCase() === 'v') {
            navigator.clipboard.readText().then((text) => {
                model.value = text;
            });
            event.preventDefault();
            return;
        } else if (event.ctrlKey && event.key === 'x') {
            const selection = window.getSelection();
            const range = selection?.getRangeAt(0);

            if (range && range.startContainer === editableDiv.value && range.endContainer === editableDiv.value) {
                const selectedText = range.toString().trim();
                if (selectedText === editableDiv.value.innerText.trim()) {
                    navigator.clipboard.writeText(selectedText);
                    model.value = '';
                }
            }
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
        --font-size: 18px;
        position: relative;
        border-radius: 15px;
        background-color: #260f43;
        height: max(max-content, 450px);
        min-height: 0;
        max-height: 100%;
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
        font-size: var(--font-size);
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
        font-size: var(--font-size);
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
    }

    .custom-textarea-wrapper:focus-within {
        outline: none;
    }
    @media screen and (max-width: 800px) {
        .custom-textarea-wrapper {
            --font-size: 15px;
        }
    }
</style>
