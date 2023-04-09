<template>
  <div class="result">
    <div class="result__data">
      <h3 class="result__data--title" v-if="data.title">{{ data.title }}<span class="year" v-if="data.release_date"> ({{ data.release_date.slice(0, 4) }})</span><span v-if="data.adult"> 🔞</span></h3>
      <div class="result__data--badges" v-if="data.genre_ids">
        <base-badge v-for="badge in data.genre_ids" :key="badge" :badge="badge"></base-badge>
      </div>
      <div class="result__data--info">
        <p class="release" v-if="data.release_date"><span>Release date: </span>{{ data.release_date }}</p>
        <p v-if="data.vote_average">Average rating: <span class="rating" :class="rating">{{ data.vote_average }}</span></p>
        <p v-if="data.vote_count">Vote count: {{ data.vote_count }}</p>
      </div>
    </div>
    <div class="result__img" :style="{ backgroundImage: imgSource }"></div>
    <div class="result__buttons-container">
      <base-button dark><router-link :to="`/details/${this.id}`">View details</router-link></base-button>
      <base-button :data="data" dark @click="moveToWatched"><span>Mark as watched</span></base-button>
      <base-button :data="data" dark @click="removeFromWatchList"><span>Remove from list</span></base-button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';

import dummyBgUrl from '@/assets/dummy.png'
import { useStore } from 'vuex';
// import { useRouter } from 'vue-router';

const store = useStore()
// const router = useRouter()
const imgSource = props.data.backdrop_path !== null ? `url(https://image.tmdb.org/t/p/w342${props.data.backdrop_path})`: `url(${dummyBgUrl})`

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  }
})

function removeFromWatchList() {
  console.log('remove from watch list');
  store.dispatch('displayMessage', {
    value: `${props.data.title} removed from your watch list!`,
    type: 'success'
  })
}
function moveToWatched() {
  console.log('mark as watched');
  store.dispatch('displayMessage', {
    value: `${props.data.title} marked as watched!`,
    type: 'success'
  })
}

const rating = computed(()=> {
      if (props.data.vote_average > 7.5) {
      return 'high'
      } else if (props.data.vote_average < 5) {
        return 'low'
      } else {
        return ''
      }
    })
</script>

<style lang="scss" scoped>
.result {
  background-color: #FCFFE7;
  padding: 3%;
  margin: 15px 0;
  border-width: 5px;
  border-style: solid;
  border-image: linear-gradient(to right, #2B3467, #EB455F) 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas: 
      "data img buttons";
  gap: 1%;
  .result__data {
    grid-area: data;
    border: 3px solid #2B3467;
    padding: 0 3% 6%;
    .result__data--title {
      font-family: 'Merriweather', serif;
      margin-bottom: 0;
      font-size: 1.6rem;
      text-align: center;
    }
    .result__data--badges {
      margin: 10px 0;
      text-align: center;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    .result__data--info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      p {
        display: inline-block;
        margin: 3px auto;
      }
      .release {
        font-style: italic;
        span {
          font-style: normal;
        }
      }
      .rating {
        display: inline-block;
        background-color: rgb(202, 202, 77);
        color: #fff;
        padding: 3px 5px;
        border-radius: 15px;
        &.high {
          background-color: rgb(95, 218, 95);
        }
        &.low {
          background-color: #EB455F;
        }
      }
    }
  }
  .result__img {
    grid-area: img;
    display: flex;
    justify-content: center;
    border: 3px solid #2B3467;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 220px;
  }
  .result__buttons-container {
    grid-area: buttons;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas: 
    "data img"
    "buttons buttons";
    .result__buttons-container {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      button {
        margin: 10px 0;
      }
      button:nth-child(1) {
        width: 100%;
      }
      button:not(button:nth-child(1)) {
        width: 49%;
      }
    }
  }
  @media(max-width: 750px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-template-areas: 
      "data"
      "img"
      "buttons";
    .result__buttons-container {
      flex-direction: column;
      align-items: stretch;
      button:not(button:nth-child(1)) {
        width: 100%;
      }
    }
  }
}
</style>