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
button.base-btn {
  font-size: 1.4rem;
  border: none;
  outline: none;
  padding: 0;
  background-color: transparent;
  &:hover a,
  &:hover span {
    border-color: #EB455F;
    color: #EB455F;
  }
  &.dark a,
  &.dark span {
    border-color: #2B3467;
    color: #2B3467;
    &:hover {
      border-color: #EB455F;
      color: #EB455F;
    }
  }
  a, span {
    display: block;
    border: 3px solid white;
    padding: 10px 20px;
    font-family: 'Merriweather', serif;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 3px;
    text-decoration: none;
    color: white;
    transition: color .2s ease-out, border-color .2s ease-out;
    cursor: pointer;
  }
  &.disabled {
    &.dark a,
    &.dark span {
      border-color: grey;
      color: grey;
      cursor: not-allowed;
    }
    a, span {
      border-color: grey;
      color: grey;
      cursor: not-allowed;
    }
  }
}
</style>