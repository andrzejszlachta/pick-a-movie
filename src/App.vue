<template>
  <the-header/>
  <main>
    <router-view v-slot="{ Component }">
      <transition name="main" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  <BaseMessage />
  <the-footer/>
  <BaseLoading  v-if="store.getters.isLoading"/>
</template>

<script setup>
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';

import BaseMessage from './ui/BaseMessage.vue'
import BaseLoading from './ui/BaseLoading.vue'

import { useStore } from 'vuex';
const store = useStore()

function tryAutoLogin() {
  store.dispatch('tryLogin')
}
tryAutoLogin()
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Acme&family=Lato&family=Merriweather:wght@400;700&display=swap');
@import '@/_variables';

*, *::after, *::before {
  box-sizing: border-box;
}

html {
  font-family: 'Lato', sans-serif;
  scroll-behavior: smooth;
  body {
    margin: 0;
    padding: 0;
    #app {
      overflow: hidden;
      min-height: 100vh;
      display: grid;
      grid-template-rows: auto 1fr auto;
      h2 {
        font-size: 1.8rem;
        text-align: center;
        background-color: $primary-color;
        color: #fff;
        padding: 20px 10px;
        margin: 1rem -10px;
      }
      main {
        background-color: $secondary-color;
        padding: 20px 10px;
      }
      .max-width {
        max-width: 1280px;
        margin: 0 auto;
      }
    }
  }
  @media (max-width:1000px) {
    font-size: 14px;
  }
}

.main-enter-from,
.main-leave-to {
  opacity: 0;
}
.main-enter-to,
.main-leave-from {
  opacity: 1;
}
.main-enter-active {
  transition: opacity .3s ease-in;
}
.main-leave-active {
  transition: opacity .3s ease-out;
}
</style>
