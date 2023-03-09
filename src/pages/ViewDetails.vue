<template>
  <div>
    Recipe details id: {{ props.id }}
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({id: String})

console.log(props.id)
</script>

<style lang="scss" scoped>

</style>