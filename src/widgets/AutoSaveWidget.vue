<template>
    <AutoSaveButton
        :isAutoSaveOn="autoSave"
        @autoSave="toggleAutoSave"
    />
</template>
<script setup lang="ts">
    import {onBeforeUnmount, onMounted, ref, watch} from 'vue';
    import AutoSaveButton from '@/features/auto_save/AutoSaveButton.vue';
    import type {FlashcardsSet} from '@/shared/lib/flashcards_set';

    import {getSetFromSave, removeSet, saveSet} from '@/entities/auto_save/auto_save';

    const autoSave = ref(false);
    const flashcardsSet = defineModel<FlashcardsSet>();

    const isDirty = ref(false);

    // THIS COULD BE UNEFFICIENT!
    // TODO should be optimalized with changing only when user stops typing in textbox
    watch(
        flashcardsSet,
        (set) => {
            if (set == undefined) return;
            if (autoSave.value) {
                saveSet(set);
            }
            isDirty.value = true;
        },
        {deep: true}
    );

    const beforeUnloadHandler = (event: BeforeUnloadEvent) => {
        if (!autoSave.value && isDirty.value) {
            event.preventDefault();
            event.returnValue = '';
        }
    };

    window.addEventListener('beforeunload', beforeUnloadHandler);

    onBeforeUnmount(() => {
        window.removeEventListener('beforeunload', beforeUnloadHandler);
    });

    function toggleAutoSave(toggle: boolean) {
        autoSave.value = toggle;
        if (toggle) {
            if (flashcardsSet.value == undefined) return;
            saveSet(flashcardsSet.value);
        } else {
            removeSet();
            isDirty.value = true;
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
