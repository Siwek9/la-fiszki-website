<template>
    <OverlayScrollbarsComponent
        class="custom-textarea-wrapper"
        element="div"
    >
        <!-- Highlighted Content -->
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
    import {OverlayScrollbarsComponent} from 'overlayscrollbars-vue';
    import {onMounted, useTemplateRef} from 'vue';

    const model = defineModel({
        set(value) {
            return value;
        },
        get(value) {
            try {
                return JSON.stringify(JSON.parse(value), null, 2);
            } catch (_) {
                return value;
            }
        },
        default: '',
    });

    const props = defineProps<{
        placeholder?: string;
    }>();

    const placeholder = props.placeholder || 'Paste JSON here...';

    const emit = defineEmits<{
        (event: 'update:modelValue', value: string): void;
        (event: 'error', message: string): void;
    }>();

    const editableDiv = useTemplateRef<HTMLDivElement>('editable-div');
    const highlightedContent = useTemplateRef<HTMLDivElement>('highlighted-content');

    onMounted(() => {
        updateHighlighting(model.value);
    });

    const highlightJSON = (json: string): string => {
        try {
            const parsed = JSON.parse(json);
            const formatted = JSON.stringify(parsed, null, 2);
            return formatted
                .replace(/("(.*?)")(?=\s*:)/g, '<span class="json-key">$1</span>') // Keys
                .replace(/: ("(.*?)")/g, ': <span class="json-string">$1</span>') // Strings
                .replace(/: (\d+)/g, ': <span class="json-number">$1</span>') // Numbers
                .replace(/: (true|false)/g, ': <span class="json-boolean">$1</span>') // Booleans
                .replace(/: (null)/g, ': <span class="json-null">$1</span>'); // Null
        } catch {
            return '';
        }
    };

    const handlePaste = (event: ClipboardEvent) => {
        event.preventDefault();

        const text = event.clipboardData?.getData('text/plain') || '';
        try {
            JSON.parse(text);

            model.value = text;
            updateHighlighting(text);

            if (editableDiv.value) {
                editableDiv.value.innerText = text;
            }
        } catch {
            emit('error', 'Invalid JSON format.');
        }
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
            highlightedContent.value.innerHTML = highlightJSON(text);
        }
    };
</script>

<style>
    .custom-textarea-wrapper {
        position: relative;
        margin: 10px;
        border-radius: 10px;
        background-color: #260f43;
        width: min(400px, 40vw);
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
        z-index: 1;
        box-sizing: border-box;
        padding: 10px;
        width: 100%;
        height: 100%;
        overflow: visible;
        pointer-events: none;
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
        z-index: 2;
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
        background-color: #2c430f;
        color: rgb(145, 145, 145);
    }

    .custom-textarea-wrapper:focus-within {
        outline: none;
    }

    .json-key {
        color: #007acc;
    }

    .json-string {
        color: #d69d85;
    }

    .json-number {
        color: #b5cea8;
    }

    .json-boolean {
        color: #569cd6;
    }

    .json-null {
        color: #9cdcfe;
    }
</style>
