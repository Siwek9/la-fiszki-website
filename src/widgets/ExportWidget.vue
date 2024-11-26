<template>
    <TextButton
        @click="
            () => {
                exportSet(flashcardsSet);
            }
        "
        text="Export Set"
    />
</template>
<script setup lang="ts">
    import {exportSet} from '@/entities/export/export';
    import type {FlashcardsSet} from '@/shared/lib/flashcards_set';
    import TextButton from '@/shared/ui/TextButton.vue';

    const {flashcardsSet} = defineProps<{flashcardsSet: FlashcardsSet}>();
</script>
<style></style>
