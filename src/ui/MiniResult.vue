<template>
  <div class="result">
    <div class="result__data">
      <h3 class="result__data--title" v-if="data.title">{{ data.title }}<span class="year" v-if="data.release_date"> ({{ data.release_date.slice(0, 4) }})</span><span v-if="data.adult"> 🔞</span></h3>
      <div class="result__data--badges" v-if="data.genre_ids && store.getters.getGenres.length">
        <base-badge v-for="badge in data.genre_ids" :key="badge" :badge="badge"></base-badge>
      </div>
      <div class="result__data--info">
        <p class="release" v-if="data.release_date"><span>Release date: </span>{{ data.release_date }}</p>
        <p v-if="data.vote_average">Average rating: <span class="rating" :class="rating">{{ data.vote_average.toFixed(2) }}</span></p>
        <p v-if="data.vote_count">Vote count: {{ data.vote_count }}</p>
      </div>
    </div>
    <div class="result__img" :style="{ backgroundImage: imgSource }"></div>
    <div class="result__buttons-container" v-if="props.type === 'watchList'">
      <base-button dark><router-link :to="`/details/${props.id}`">View details</router-link></base-button>
      <base-button :data="data" dark @click="showMoveToWatchedDialog = true"><span>Mark as watched</span></base-button>
      <base-button :data="data" dark @click="showRemoveFromWatchListDialog = true"><span>Remove from list</span></base-button>
    </div>
    <div class="result__buttons-container" v-else>
      <base-button dark><router-link :to="`/details/${props.id}`">View details</router-link></base-button>
      <base-button :data="data" dark @click="showMoveBackToWatchDialog = true"><span>Watch again</span></base-button>
      <base-button :data="data" dark @click="showRemoveFromWatchedDialog = true"><span>Remove from list</span></base-button>
    </div>
    <base-dialog 
      @closeDialog="()=>{if (showMoveToWatchedDialog) showMoveToWatchedDialog = false}"
      :show="showMoveToWatchedDialog"
      action="moveToWatched"
      :data="data">Do you want to move <span class="title">{{data.title}}</span> to your watched movies list?
    </base-dialog>
    <base-dialog
      @closeDialog="()=>{if(showRemoveFromWatchListDialog) showRemoveFromWatchListDialog = false}"
      :show="showRemoveFromWatchListDialog"
      action="removeFromWatchList"
      :data="data">Do you want to remove <span class="title">{{data.title}}</span> from your watch list?
    </base-dialog>
    <base-dialog
      @closeDialog="()=>{if(showRemoveFromWatchedDialog) showRemoveFromWatchedDialog = false}"
      :show="showRemoveFromWatchedDialog"
      action="removeFromWatchedList"
      :data="data">Do you want to remove <span class="title">{{data.title}}</span> from your watch list?
      </base-dialog>
    <base-dialog
      @closeDialog="()=>{if(showMoveBackToWatchDialog) showMoveBackToWatchDialog = false}"
      :show="showMoveBackToWatchDialog"
      action="moveBackToWatchList"
      :data="data">Do you want to move back <span class="title">{{data.title}}</span> to your watch list?
    </base-dialog>
  </div>
</template>

<script setup>
import { defineProps, computed, ref } from 'vue';

import dummyBgUrl from '@/assets/dummy.png'
import { useStore } from 'vuex';

const store = useStore()

const showMoveToWatchedDialog = ref(false)
const showRemoveFromWatchListDialog = ref(false)
const showRemoveFromWatchedDialog = ref(false)
const showMoveBackToWatchDialog = ref(false)

const imgSource = props.data.backdrop_path ? `url(https://image.tmdb.org/t/p/w342${props.data.backdrop_path})`: `url(${dummyBgUrl})`

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    default: 'watchList',
  },
})

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
@import '@/_variables';
.result {
  background-color: $background-color;
  padding: 3%;
  margin: 15px 0;
  border: 3px solid $primary-color;
  border-radius: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas: 
      "data img buttons";
  gap: 1%;
  .result__data {
    grid-area: data;
    border: 3px solid $primary-color;
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
        background-color: $rating-average;
        color: $font-white;
        padding: 3px 5px;
        border-radius: 15px;
        &.high {
          background-color: $rating-good;
        }
        &.low {
          background-color: $alt-color;
        }
      }
    }
  }
  .result__img {
    grid-area: img;
    display: flex;
    justify-content: center;
    border: 3px solid $primary-color;
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