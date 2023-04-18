<template>
  <div class="container" v-if="!isLoggedOut">
    <div class="info max-width">
      <div>Your account details</div>
      <div class="email">{{ store.getters.email }}</div>
      <div class="button"><base-button @click="logout"><span>Log Out</span></base-button></div>
    </div>
    <div class="details max-width">
      <div class="details__watchlist">
        <div class="box box--center"><p class="text">{{ watchListText }}</p><button @click="switchWatch" class="switch" :class="{ disabled: !store.getters.watchList.length }">{{ watchIcon }}</button></div>
        <div class="watch-container" v-show="showWatch">
          <mini-result v-for="result in store.getters.watchList" :key="result.id" :data="result" :id="result.id"></mini-result>
        </div>
      </div>
      <div class="details__watchedlist">
        <div class="box box--center"><p class="text">{{ watchedListText }}</p><button @click="switchWatched" class="switch" :class="{ disabled: !store.getters.watchedList.length }">{{ watchedIcon }}</button></div>
        <div class="watched-container" v-show="showWatched">
          <mini-result v-for="result in store.getters.watchedList" type="watchedList" :key="result.id" :data="result" :id="result.id"></mini-result>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <h2>Hope to see you again!</h2>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { ref, computed } from 'vue';

const store = useStore()
const isLoggedOut = ref(false)
const showWatched = ref(false)
const showWatch = ref(false)

function switchWatched(e) {
  const classes = [...e.target.classList]
  if (classes.includes('disabled')) return;
  showWatched.value = !showWatched.value
}
function switchWatch(e) {
  const classes = [...e.target.classList]
  if (classes.includes('disabled')) return;
  showWatch.value = !showWatch.value
}

const watchListText = computed(()=> {
  if (!store.getters.watchList.length) {
    return 'There are no movies on your watch list yet!'
  } else if (store.getters.watchList.length === 1) {
    return 'There is 1 movie on your watch list.'
  } else {
    return `There are ${store.getters.watchList.length} movies on your watch list.`
  }
})

const watchedListText = computed(()=> {
  if (!store.getters.watchedList.length) {
    return 'You haven\'t watched anything yet!'
  } else if (store.getters.watchedList.length === 1) {
    return 'You\'ve watched one movie.'
  } else {
    return `You've already watched ${store.getters.watchedList.length} movies!`
  }
})

const watchedIcon = computed(() => {
  if (showWatched.value) {
    return '⇦'
  } else {
    return '⇨'
  }
})
const watchIcon = computed(() => {
  if (showWatch.value) {
    return '⇦'
  } else {
    return '⇨'
  }
})

function logout() {
  isLoggedOut.value = true
  store.dispatch('logout')
}
store.dispatch('getGenresList')
</script>

<style lang="scss" scoped>

.box {
  background-color: #FCFFE7;
  border: 3px solid #2B3467;
  border-radius: 20px;
  margin: 20px 0;
  &--center {
    font-size: 1.4rem;
    font-weight: bold;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
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
    border-radius: 20px;
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
    .details__watchlist,
    .details__watchedlist {
      .box {
        position: relative;
        .switch {
          position: absolute;
          transform: translate(-50%, 0%);
          top: 50%;
          right: 10px;
          width: 70px;
          height: 70px;
          font-size: 3rem;
          background-color: transparent;
          outline: none;
          border: 3px solid #2B3467;
          font-weight: bold;
          color: #2B3467;
          cursor: pointer;
          transition: color .2s ease-out, border-color .2s ease-out;
          &.disabled {
            color: grey;
            border-color: grey;
            pointer-events: none;
          }
          &:hover {
            color: #EB455F;
            border-color: #EB455F;
          }
          rotate: 90deg;
        }
        .text {
          margin: 0;
        }

      }
    }
  }
  @media (max-width: 750px) {
    .info {
      position: static;
      .button {
        position: static;
        transform: translateY(0);
        margin: 30px 0 10px; 
      }
    }
  }
  @media (max-width: 500px) {
    .details .details__watchlist .box .text,
    .details .details__watchedlist .box .text {
      margin-right: 70px;
    }
  }
}

</style>