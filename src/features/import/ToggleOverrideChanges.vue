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
        margin: clamp(10px, 2vh, 25px) 0;
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
        margin-left: clamp(30px, 4vw, 40px);
        font-size: clamp(17px, 2.4vw, 24px);
    }

    .override-changes-label:before {
        position: absolute;
        top: 50%;
        left: calc(-1 * clamp(30px, 4vw, 40px));
        transform: translateY(-50%);
        mask-image: url(@/assets/icons/checkbox_empty.svg);
        mask-position: center center;
        mask-size: 100%;
        mask-repeat: no-repeat;
        background-color: var(--text-color);
        width: clamp(25px, 3.5vw, 35px);
        height: clamp(25px, 3.5vw, 35px);
        pointer-events: none;
        content: '';
    }

    .override-changes-checkbox:checked + .override-changes-label:before {
        mask-image: url(@/assets/icons/checkbox_full.svg);
    }
    .override-changes-checkbox {
        display: none;
    }

    /* @media screen and (max-width: 800px) {
        .override-changes {
            margin: 15px 0;
        }

        .override-changes-label {
            margin-left: 25px;
            font-size: 16px;
        }

        .override-changes-label:before {
            left: -30px;
            width: 20px;
            height: 20px;
        }
    } */
</style>
