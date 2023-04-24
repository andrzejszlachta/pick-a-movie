<template>
  <button class="base-btn" :class="{ dark: dark, disabled: disabled }">
    <slot></slot>
  </button>
</template>

<script setup>
import { defineProps } from 'vue';

// eslint-disable-next-line
const props = defineProps({
    dark: {
      type: Boolean,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
    }
  })
</script>

<style lang="scss">
@import '@/_variables';
button.base-btn {
  font-size: 1.4rem;
  border: none;
  outline: none;
  padding: 0;
  background-color: transparent;
  &:hover a,
  &:hover span {
    border-color: $btn-hover;
    color: $btn-hover;
  }
  &.dark a,
  &.dark span {
    border-color: $btn-dark;
    color: $btn-dark;
    &:hover {
      border-color: $btn-hover;
      color: $btn-hover;
    }
  }
  a, span {
    display: block;
    border: 3px solid $btn-light;
    padding: 10px 20px;
    font-family: 'Merriweather', serif;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 3px;
    text-decoration: none;
    color: $btn-light;
    transition: color .2s ease-out, border-color .2s ease-out;
    cursor: pointer;
  }
  &.disabled {
    &.dark a,
    &.dark span {
      border-color: $btn-disabled;
      color: $btn-disabled;
      cursor: not-allowed;
    }
    a, span {
      border-color: $btn-disabled;
      color: $btn-disabled;
      cursor: not-allowed;
    }
  }
}
</style>