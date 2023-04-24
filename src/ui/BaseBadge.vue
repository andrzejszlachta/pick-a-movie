<template>
  <span class="badge">
    {{ badgeName }}
  </span>
</template>

<script setup>
import { useStore } from 'vuex';
import { defineProps, computed } from 'vue';

const props = defineProps({
  badge: {
    type: Number,
    required: true,
  },
})

const store = useStore()

const badgeName = computed(()=> {
  return store.getters.getBadgeName(props.badge)
})
</script>

<style lang="scss" scoped>
@import '@/_variables';
  .badge {
    padding: 5px 7px;
    border-radius: 7px;
    background-color: $badge-bg;
    color: $badge-font;
    margin-right: 5px;
    margin-bottom: 5px;
    font-weight: bold;
  }
</style>