<template>
    <MainInfoShowWidget
        :title="flashcardsSet.name"
        :author="flashcardsSet.author"
    />
    <AutoSaveWidget v-model="flashcardsSet" />
    <ImportWidget v-model="flashcardsSet" />
    <MainInfoEditorWidget v-model="flashcardsSet" />
    <FlashcardsWidget
        :side-names="flashcardsSet.sideName"
        v-model="flashcardsSet.flashcards"
    />
    <ExportWidget :flashcards-set="flashcardsSet" />
</template>

<script setup lang="ts">
    import MainInfoShowWidget from '@/widgets/MainInfoShowWidget.vue';
    import AutoSaveWidget from '@/widgets/AutoSaveWidget.vue';
    import ImportWidget from '@/widgets/ImportWidget.vue';
    import MainInfoEditorWidget from '@/widgets/MainInfoEditorWidget.vue';
    import FlashcardsWidget from '@/widgets/FlashcardsWidget.vue';
    import ExportWidget from '@/widgets/ExportWidget.vue';

    import {ref} from 'vue';
    import type {FlashcardsSet} from '../shared/lib/flashcards_set';
    import createEmptyFlashcardsSet from '@/shared/lib/create_empty_flashcards_set';

    const flashcardsSet = ref<FlashcardsSet>(createEmptyFlashcardsSet());
</script>

<style>
    html,
    body {
        margin: 0;
        background-color: #512b81;
        padding: 0;
        max-width: 100%;
        min-height: 100%;
        overflow-x: hidden;
        color: white;
    }

    #app {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: Mooli, sans-serif;
    }

    .text-center {
        text-align: center;
    }

    .center-center {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .row {
        display: flex;
        flex-direction: row;
    }

    .flex-wrap {
        display: flex;
        flex-wrap: wrap;
    }

    input,
    select,
    option,
    button {
        font: inherit;
    }
</style>
