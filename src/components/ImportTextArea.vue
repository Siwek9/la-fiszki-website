<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
    <OverlayScrollbarsComponent
        ref="text-area-ref"
        class="json-data-preview"
        @change="() => {}"
        element="div"
        defer
        contenteditable
    >
        {{ formatContentToDisplay(model) }}
    </OverlayScrollbarsComponent>
</template>

<script setup lang="ts">
    import {OverlayScrollbarsComponent} from 'overlayscrollbars-vue';
    import {onMounted, onUpdated} from 'vue';
    // import {OverlayScrollbars, type InitializationTarget} from 'overlayscrollbars';

    // const textAreaRef = useTemplateRef<HTMLElement>('text-area-ref');

    // overscroll.OverlayScrollbars;
    // const osInstance = ref<OverlayScrollbars>();
    onMounted(() => {
        // initialize({target: textAreaRef.value!});
        //     // console.log(textAreaRef.value);
        //     // osInstance.value = OverlayScrollbars(textAreaRef.value! as InitializationTarget);
        //     // console.log(osInstance.value);
    });

    function formatContentToDisplay(content: string): string {
        let toReturn = content;
        console.log(toReturn);
        const el = document.createElement('div');
        el.innerText = el.textContent = toReturn;
        toReturn = el.innerHTML;
        toReturn = toReturn.replaceAll('\n', '<br />');
        console.log(toReturn);
        return toReturn;
    }

    const model = defineModel({
        set(value) {
            console.log('ale sraczka pierdaczka lool');
            console.log(value);
            return value;
        },
        get(value) {
            try {
                console.log(JSON.stringify(JSON.parse(value), null, 2));
                return JSON.stringify(JSON.parse(value), null, 2);
            } catch (_) {
                console.log('cos sie zjebalo');
                return value;
            }
        },
        default: '{}',
    });

    // function handleChange(event: Event) {

    // }

    // const {value} = defineProps<{value: string}>();

    onUpdated(() => {});
</script>

<style>
    .json-data-preview {
        appearance: textarea;
        -moz-appearance: textfield-multiline;
        -webkit-appearance: textarea;
        resize: none;
        height: 30vh;
        width: min(300px, 40vw);
        border: none;
        background-color: #35155d;
        color: white;
        font-size: 16px;
        font-family: 'Courier New', Courier, monospace;
        padding: 10px;
        border-radius: 10px;
        /* white-space: break-spaces; */
        /* white-space: pre-wrap; */
        white-space: pre;
        overflow: visible;
        /* overflow: scroll; */
    }

    .json-data-preview:focus {
        outline: none;
        background-color: #260f43;
    }

    .json-data-preview::selection,
    .json-data-preview br::selection {
        color: black;
        background-color: #2c430f;
    }
</style>
