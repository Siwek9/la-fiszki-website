<template>
    <AutoSaveButton
        :isAutoSaveOn="autoSave"
        @autoSave="toggleAutoSave"
    />
</template>
<script setup lang="ts">
    import {onMounted, ref, watch} from 'vue';
    import AutoSaveButton from '@/features/auto_save/AutoSaveButton.vue';
    import type {FlashcardsSet} from '@/shared/lib/flashcards_set';

    import {getSetFromSave, removeSet, saveSet} from '@/entities/auto_save/auto_save';

    const autoSave = ref(false);
    const flashcardsSet = defineModel<FlashcardsSet>();

    // THIS COULD BE UNEFFICIENT!
    // TODO: should be optimalized with changing only when user stops typing in textbox
    watch(
        flashcardsSet,
        (set) => {
            if (set == undefined) return;
            if (autoSave.value) saveSet(set);
        },
        {deep: true}
    );

    function toggleAutoSave(toggle: boolean) {
        autoSave.value = toggle;
        if (toggle) {
            if (flashcardsSet.value == undefined) return;
            saveSet(flashcardsSet.value);
        } else {
            removeSet();
        }
    }

    onMounted(() => {
        const set = getSetFromSave();
        if (set !== undefined) {
            autoSave.value = true;
            flashcardsSet.value = set;
        }
    });
</script>
<style></style>
