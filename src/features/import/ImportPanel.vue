<template>
    <MainDialog @close="closeDialog">
        <h1>Import Sets from multiple sources</h1>
        <div class="choose-input-type">
            <InputImportType
                name="La Fiszki"
                value="la-fiszki"
                v-model="inputType"
                checked
            />
            <InputImportType
                name="CSV"
                value="csv"
                v-model="inputType"
            />
        </div>
        <ImportLaFiszki
            v-if="inputType == 'la-fiszki'"
            v-model="fileContent"
        />

        <div>
            <input
                type="checkbox"
                id="override-changes"
            />
            <label for="override-changes">Override Changes</label>
        </div>
        <button>Apply import</button>
    </MainDialog>
</template>

<script setup lang="ts">
    import {ref} from 'vue';
    import 'overlayscrollbars/overlayscrollbars.css';
    import InputImportType from '@/features/import/InputImportType.vue';
    import MainDialog from '@/shared/ui/MainDialog.vue';
    import ImportLaFiszki from '@/features/import/ImportLaFiszki.vue';

    function closeDialog() {
        emit('close');
    }

    const fileContent = ref('');

    const inputType = ref<'la-fiszki' | 'csv'>('la-fiszki');

    const emit = defineEmits<{close: []}>();
</script>

<style scoped>
    h1 {
        margin: 0;
        margin-top: 10px;
        margin-bottom: 20px;
        font-size: 25px;
    }

    h2 {
        margin: 10px;
        font-size: 22px;
    }

    .choose-input-type {
        display: flex;
        flex-direction: row;
    }
</style>
