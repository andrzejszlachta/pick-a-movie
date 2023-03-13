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
  .badge {
    padding: 5px 7px;
    border-radius: 7px;
    background-color: #EB455F;
    color: #fff;
    margin-right: 5px;
    font-weight: bold;
  }
</style>