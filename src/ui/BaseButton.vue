<template>
  <button class="base-btn">
    <slot></slot>
  </button>
</template>

<style lang="scss">
button.base-btn {
  font-size: 1.4rem;
  border: 2px solid white;
  outline: none;
  padding: 0;
  background-color: transparent;
  &:hover {
    border-color: #EB455F;
    a {
      color: #EB455F;
    }
  }
  a {
    display: block;
    padding: 10px 20px;
    font-family: 'Merriweather', serif;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-decoration: none;
    color: white;
  }
}
</style>