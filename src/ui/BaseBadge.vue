<template>
  <span class="badge">
    {{ badgeName }}
  </span>
</template>

<script setup>
import { useStore } from 'vuex';
import { defineProps } from 'vue';

const props = defineProps({
  badge: {
    type: Number,
    required: true,
  },
})

const store = useStore()
const badgeName = store.state.genres.find(obj => obj.id === props.badge).name
</script>

<style lang="scss" scoped>
  .badge {
    padding: 5px 7px;
    border-radius: 7px;
    background-color: #EB455F;
    color: #fff;
    margin-right: 5px;
    font-weight: bold;
  }
</style>