<template>
  <div class="container" v-if="!isLoggedOut">
    <div class="info max-width">
      <div>Your account details</div>
      <div class="button"><base-button @click="logout"><span>Log Out</span></base-button></div>
      <div class="email">{{ store.getters.email }}</div>
    </div>
    <div class="details max-width">
      <div class="details__watchlist" v-if="store.state.watchList.userWatchList.length">
        <div class="box box--center">Your watch list:</div>
        <mini-result v-for="result in store.state.watchList.userWatchList" :key="result.id" :data="result" :id="result.id"></mini-result>
      </div>
      <div class="details__noresults box box--center" v-else>There is nothing on your watch list yet!</div>
    </div>
    
  </div>
  <div v-else>
    <h2>Hope to see you again!</h2>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { ref } from 'vue';

const store = useStore()
const isLoggedOut = ref(false)

function logout() {
  isLoggedOut.value = true
  store.dispatch('logout')
}
store.dispatch('getGenresList')
</script>

<style lang="scss" scoped>
.box {
  background-color: #FCFFE7;
  border-width: 5px;
  border-style: solid;
  border-image: linear-gradient(to right, #2B3467, #EB455F) 1;
  &--center {
    font-size: 1.4rem;
    font-weight: bold;
    text-align: center;
    margin: 0 auto;
    padding: 30px;
  }
}
.container {
  .info {
    position: relative;
    font-size: 1.8rem;
    text-align: center;
    background-color: #2B3467;
    color: #fff;
    padding: 20px 0;
    margin-bottom: 20px;
    border-radius: 10px;
    .button {
      position: absolute;
      top: 50%;
      right: 20px;
      transform: translateY(-50%);
    }
    .email {
      font-weight: bold;
      margin: 15px 0 5px;
    }
  }
  .details {
    .details__stats {
      position: relative;
      font-size: 1.2rem;
      padding: 3%;
      margin: 15px auto;
      text-align: center;
    }
  }
}

</style>