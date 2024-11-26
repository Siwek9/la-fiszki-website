<template>
    <TextInput
        :max-length="70"
        name="Set Name"
        v-model="set.name"
    />
    <TextInput
        :max-length="50"
        name="Set Author"
        v-model="set.author"
    />
    <div class="two-sides">
        <TextInput
            :max-length="30"
            name="Front Side"
            v-model="set.sideName.front"
        />
        <TextInput
            :max-length="30"
            name="Back Side"
            v-model="set.sideName.back"
        />
    </div>
</template>
<script setup lang="ts">
    import TextInput from '@/features/main_info/MainInfoTextInput.vue';
    import createEmptyFlashcardsSet from '@/shared/lib/create_empty_flashcards_set';
    import type {FlashcardsSet} from '@/shared/lib/flashcards_set';

    const set = defineModel<FlashcardsSet>({default: createEmptyFlashcardsSet()});
</script>
<style scoped>
    .two-sides {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
</style>
