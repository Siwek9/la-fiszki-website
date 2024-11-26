<template>
    <h1>{{ title }}</h1>
    <h3>by: {{ author }}</h3>
</template>
<script setup lang="ts">
    const {title, author} = defineProps<{title: string; author: string}>();
</script>
<style scoped>
    h1 {
        text-align: center;
    }

    h3 {
        text-align: center;
    }
</style>
