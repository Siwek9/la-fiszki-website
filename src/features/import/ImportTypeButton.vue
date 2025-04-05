<template>
    <input
        type="radio"
        name="import-type"
        :value
        :id="`${value}-input-type`"
        v-model="model"
        :checked
        class="first-import-type-input-radio import-type-input-radio"
    />
    <label
        class="import-type-label"
        :for="`${value}-input-type`"
    >
        {{ name }}
    </label>
</template>
<script setup lang="ts">
    import type ImportType from '@/entities/import/import_type';

    const {value, name, checked} = defineProps<{value: string; name: string; checked?: boolean}>();

    const model = defineModel<ImportType>();
</script>
<style>
    .import-type-input-radio {
        display: none;
    }

    .import-type-label {
        display: block;
        padding: 10px;
        font-size: 20px;
    }

    .import-type-input-radio:checked + .import-type-label {
        background-image: linear-gradient(180deg, #512b81 0%, #35155d 100%);
    }
</style>
