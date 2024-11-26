<template>
    <TextButton
        @click="isOpen = true"
        text="Import Set"
    />
    <ImportDialog
        @close="isOpen = false"
        v-if="isOpen"
    />
</template>

<script setup lang="ts">
    import TextButton from '@/shared/ui/TextButton.vue';
    import ImportDialog from '@/features/import/ImportDialog.vue';
    import {ref} from 'vue';

    const isOpen = ref(false);
</script>

<style scoped></style>
