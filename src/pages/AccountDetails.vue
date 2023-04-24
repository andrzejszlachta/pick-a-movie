<template>
  <div class="container" v-if="store.getters.isAuthenticated">
    <div class="info max-width">
      <div>Your account details</div>
      <div class="email">{{ store.getters.email }}</div>
      <div class="button">
        <base-button @click="showLogoutDialog = true"><span>Log Out</span></base-button>
        <base-dialog 
          @closeDialog="()=>{if (showLogoutDialog) showLogoutDialog = false}"
          :show="showLogoutDialog"
          action="logout">Do you really want to leave?
        </base-dialog>
      </div>
    </div>
    <div class="details max-width">
      <div class="details__watchlist">
        <div class="box box--center">
          <p class="text">{{ watchListText }}</p>
          <button @click="switchWatch" class="switch" :class="{ disabled: !store.getters.watchList.length }">
            <svg v-if="showWatch" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M246.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L224 109.3 361.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160zm160 352l-160-160c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L224 301.3 361.4 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3z"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M246.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-160-160c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L224 402.7 361.4 265.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-160 160zm160-352l-160 160c-12.5 12.5-32.8 12.5-45.3 0l-160-160c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L224 210.7 361.4 73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3z"/></svg>
          </button>
        </div>
        <transition name="container">
          <div class="watch-container" v-show="showWatch">
            <TransitionGroup name="result">
              <mini-result v-for="result in store.getters.watchList" :key="result.id" :data="result" :id="result.id"></mini-result>
            </TransitionGroup>
          </div>
        </transition>
      </div>
      <div class="details__watchedlist">
        <div class="box box--center"><p class="text">{{ watchedListText }}</p>
          <button @click="switchWatched" class="switch" :class="{ disabled: !store.getters.watchedList.length }">
            <svg v-if="showWatched" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M246.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L224 109.3 361.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160zm160 352l-160-160c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L224 301.3 361.4 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3z"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M246.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-160-160c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L224 402.7 361.4 265.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-160 160zm160-352l-160 160c-12.5 12.5-32.8 12.5-45.3 0l-160-160c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L224 210.7 361.4 73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3z"/></svg>
          </button>
        </div>
        <transition name="container">
          <div class="watched-container" v-show="showWatched">
            <TransitionGroup name="result">
              <mini-result v-for="result in store.getters.watchedList" type="watchedList" :key="result.id" :data="result" :id="result.id"></mini-result>
            </TransitionGroup>
          </div>
        </transition>
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
const showWatched = ref(false)
const showWatch = ref(false)
const showLogoutDialog = ref(false)

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
          transform: translate(0%, -50%);
          top: 50%;
          right: 10px;
          width: 70px;
          height: 70px;
          background-color: transparent;
          outline: none;
          border: 3px solid #2B3467;
          color: #2B3467;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          &.disabled {
            color: grey;
            border-color: grey;
            pointer-events: none;
            svg {
              fill: grey;
            }
          }
          &:hover {
            color: #EB455F;
            border-color: #EB455F;
            svg {
              fill: #EB455F;
              transform: scale(1);
            }
          }
          svg {
            fill: #2B3467;
            transform: scale(0.85);
            transition: transform .2s ease-out;
          }
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

.container-enter-from,
.container-leave-to {
  opacity: 0;
}
.container-enter-to,
.container-leave-from {
  opacity: 1;
}
.container-enter-active {
  transition: opacity .3s ease-in;
}
.container-leave-active {
  transition: opacity .3s ease-out;
}

.result-enter-from {
  opacity: 0;
  transform: translateX(-10%) scale(0.8);
}
.result-leave-to {
  opacity: 0;
  transform: translateX(10%) scale(0.8);
}
.result-enter-to,
.result-leave-from {
  opacity: 1;
  transform: translateX(0) scale(1);
}
.result-enter-active {
  transition: opacity .3s ease-in, transform .3s ease-in;
}
.result-leave-active {
  transition: opacity .3s ease-out, transform .3s ease-out;
}
</style>