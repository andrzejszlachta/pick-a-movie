<template>
  <div class="container">
    <h3>That page doesn't exist!</h3>
    <p>Sorry, the page you were looking for could not be found.</p>
    <p class="timer">{{ counter }}</p>
    <base-button dark><router-link :to="'/home'">Return</router-link></base-button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
const router = useRouter()

const counter = ref(10)
function startTimer() {
  const timer = setInterval(() => {
    if (counter.value > 0) counter.value--
    if (counter.value <= 0) {
      clearInterval(timer)
      if (router.options.history.base) {
        router.back()
      } else {
        router.push('/home')
      }
    }
  }, 1000);
}
startTimer()
</script>

<style lang="scss" scoped>
.container {
  text-align: center;
  h3 {
    font-size: 2.5rem;
    text-align: center;
    margin: 10% 0;
  }
  p {
    font-size: 1.6rem;
    text-align: center;
    margin-bottom: 10%;
  }
  .timer {
    font-size: 4rem;
    font-weight: bold;
  }
}
</style>