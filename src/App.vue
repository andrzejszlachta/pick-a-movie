<template>
  <the-header/>
  <main>
    <router-view/>
  </main>
  <the-footer/>
</template>

<script setup>
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';

</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Acme&family=Lato&family=Merriweather:wght@400;700&display=swap');

*, *::after, *::before {
  box-sizing: border-box;
}

html {
  font-family: 'Lato', sans-serif;
  scroll-behavior: smooth;
  body {
    margin: 0;
    padding: 0;
    main {
      background-color: #BAD7E9;
      padding: 20px 0;
    }
    .max-width {
      max-width: 1280px;
      margin: 0 auto;
    }
  }
}
</style>
