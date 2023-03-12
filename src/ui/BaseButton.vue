<template>
  <button class="base-btn" :class="{ dark: dark }">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    dark: {
      type: Boolean,
      required: false,
    }
  },
  computed: {
    rating() {
      if (this.data.vote_average > 7.5) {
      return 'high'
      } else if (this.data.vote_average < 5) {
        return 'low'
      } else {
        return ''
      }
    },
  }
}
</script>

<style lang="scss">
button.base-btn {
  font-size: 1.4rem;
  border: none;
  outline: none;
  padding: 0;
  background-color: transparent;
  &:hover a {
    border-color: #EB455F;
    color: #EB455F;
  }
  &.dark a {
    border-color: #2B3467;
    color: #2B3467;
    &:hover {
      border-color: #EB455F;
      color: #EB455F;
    }
  }
  a {
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
  }
}
</style>