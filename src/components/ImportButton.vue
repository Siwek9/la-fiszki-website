<template>
    <button
        class="text-button"
        @click="OpenImportDialog"
    >
        Import Cardboard
    </button>
</template>

<script>
    export default {
        methods: {
            OpenImportDialog: function () {},
            props: ['name', 'author', 'sideName', 'cardboards'],
        },
    };
</script>

<style>
    .text-button {
        all: unset;
        margin: 20px;
        padding: clamp(15px, 3vw, 25px);
        background-color: #35155d;
        border-radius: 25px;
    }

    .text-button:hover {
        cursor: pointer;
    }
</style>
