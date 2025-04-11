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
        /* margin: 10px 0; */
        border-radius: 40px;
        padding: 15px 20px;
        width: max-content;
        max-width: calc(100% - 10px);
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
        display: block;
        position: relative;
        margin-left: 30px;
        font-size: 17px;
    }

    .override-changes-label:before {
        position: absolute;
        top: 50%;
        left: -30px;
        transform: translateY(-50%);
        mask-image: url(@/assets/icons/checkbox_empty.svg);
        mask-position: center center;
        mask-size: 100%;
        mask-repeat: no-repeat;
        background-color: var(--text-color);
        width: 25px;
        height: 25px;
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
