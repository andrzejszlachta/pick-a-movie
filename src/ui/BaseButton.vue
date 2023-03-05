<template>
  <button class="base-btn">
    <slot></slot>
  </button>
</template>

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