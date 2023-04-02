<template>
  <div class="container" v-if="!isLoggedOut">
    <h2>Your account details</h2>
    <div>
      <div class="test hello">
        <p>Hello</p>
        <p>Your email: {{ store.getters.email }}</p>
      </div>
      <base-button dark @click="logout"><span>Log Out</span></base-button>
    </div>
    <div class="test">Your watch list:</div>
  </div>
  <div v-else>
    <div class="test">Hope to see you again!</div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
// import { useRouter } from 'vue-router';
import { ref } from 'vue';

const store = useStore()
// const router = useRouter()
const isLoggedOut = ref(false)

function logout() {
  isLoggedOut.value = true
  store.dispatch('logout')
  // router.push('/')
}
</script>

<style lang="scss" scoped>
  .test {
    font-size: 2rem;
    text-align: center;
    color: green;
  }
  
</style>