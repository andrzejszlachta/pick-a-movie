<template>
  <the-header/>
  <the-footer/>
</template>

<script setup>
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';

</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Lato&family=Merriweather:wght@400;700&display=swap');

*, *::after, *::before {
  box-sizing: border-box;
}

html {
  font-family: 'Lato', sans-serif;
}
body {
  margin: 0;
  padding: 0;
}
</style>
