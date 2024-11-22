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
    import type {TextHighlight} from '@/utils/TextHighlight';
    import {OverlayScrollbarsComponent} from 'overlayscrollbars-vue';
    import {onMounted, useTemplateRef} from 'vue';

    const model = defineModel({
        set(value) {
            if (validateText != null && validateText(value)) {
                return value;
            } else {
                emit('error', 'Text you try to parse here is not correct');
            }
            return '';
        },
        get(value) {
            try {
                const formatedValue = JSON.stringify(JSON.parse(value), null, 2);
                updateHighlighting(formatedValue);
                return formatedValue;
            } catch (_) {
                return value;
            }
        },
        default: '',
    });

    const {placeholder, customHighlight, validateText} = defineProps<{
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

    const highlightText = (text: string): string => {
        let toReturn = text;
        console.log(customHighlight);
        if (customHighlight != undefined) {
            customHighlight.forEach((highlightRule) => {
                const element = document.createElement('span');
                element.textContent = '$1';

                Object.entries(highlightRule.style).forEach(([style, styleValue]) => {
                    if (styleValue != undefined) {
                        element.style.setProperty(style, styleValue);
                    }
                });
                console.log(element.outerHTML);
                if (highlightRule.replace != null) {
                    toReturn = toReturn.replace(
                        highlightRule.regex,
                        highlightRule.replace.replace('$1', element.outerHTML)
                    );
                } else {
                    toReturn = toReturn.replace(highlightRule.regex, element.outerHTML);
                }
            });
        }
        return toReturn;
    };

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
        }

        if (event.ctrlKey && event.key === 'v') {
            return;
        }

        if (event.ctrlKey && event.key === 'c') {
            return;
        }

        if (event.key === 'Delete' || event.key === 'Backspace') {
            event.preventDefault();

            const selection = window.getSelection();
            const range = selection?.getRangeAt(0);

            if (range && range.startContainer === editableDiv.value && range.endContainer === editableDiv.value) {
                const selectedText = range.toString().trim();
                if (selectedText === editableDiv.value.innerText.trim()) {
                    model.value = '';
                    editableDiv.value.innerText = '';
                    updateHighlighting('');
                }
            }
        }

        event.preventDefault();
    };

    const updateHighlighting = (text: string) => {
        if (highlightedContent.value) {
            highlightedContent.value.innerHTML = highlightText(text);
        }
    };
</script>

<style>
    .custom-textarea-wrapper {
        position: relative;
        margin: 10px;
        border-radius: 10px;
        background-color: #260f43;
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
