<template>
    <label
        class="override-changes"
        for="override-changes"
    >
        <input
            type="checkbox"
            id="override-changes"
            class="override-changes-checkbox"
            v-model="overrideChanges"
        />
        <span class="override-changes-label">Override Changes</span>
    </label>
</template>
<script setup lang="ts">
    const overrideChanges = defineModel<boolean>({default: false});
</script>
<style scoped>
    .override-changes {
        display: block;
        box-sizing: border-box;
        margin: 25px 0;
        /* border: 6px solid #35155d; */
        border-radius: 40px;
        padding: 15px 20px;
        width: max-content;
        user-select: none;
    }

    .override-changes:hover {
        cursor: pointer;
        background-color: #35155d;
    }

    .override-changes:has(.override-changes-checkbox:checked) {
        background-color: #35155d;
    }

    .override-changes-label {
        position: relative;
        margin-left: 40px;
        font-size: 24px;
    }

    .override-changes-label:before {
        position: absolute;
        top: 50%;
        left: -40px;
        transform: translateY(-50%);
        mask-image: url(@/assets/icons/checkbox_empty.svg);
        mask-position: center center;
        mask-size: 100%;
        mask-repeat: no-repeat;
        background-color: white;
        width: 35px;
        height: 35px;
        pointer-events: none;
        content: '';
    }

    .override-changes-checkbox:checked + .override-changes-label:before {
        mask-image: url(@/assets/icons/checkbox_full.svg);
    }
    .override-changes-checkbox {
        display: none;
    }
</style>
