<template>
    <TextButton
        @click="isOpen = true"
        text="Import Set"
    />
    <ImportPanel
        @close="isOpen = false"
        v-if="isOpen"
    />
</template>

<script setup lang="ts">
    import TextButton from '@/shared/ui/TextButton.vue';
    import ImportPanel from '@/features/import/ImportPanel.vue';
    import {ref} from 'vue';

    const isOpen = ref(false);
</script>

<style scoped></style>
