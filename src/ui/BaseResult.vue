<template>
  <div class="result">
    <h3 class="result__title" v-if="data.title">{{ data.title }}<span class="year" v-if="data.release_date"> ({{ data.release_date.slice(0, 4) }})</span><span v-if="data.adult"> 🔞</span></h3>
    <p class="result__original-title" v-if="data.original_language !== 'en' && data.original_title"><span class="lang">{{ data.original_language }} </span>{{ data.original_title }}</p>
    <div class="result__badges" v-if="data.genre_ids">
      <base-badge v-for="badge in data.genre_ids" :key="badge" :badge="badge"></base-badge>
    </div>
    <div class="result__container">
      <img v-if="data.backdrop_path" :src="'https://image.tmdb.org/t/p/w342' + data.backdrop_path" alt="poster">
      <img v-else src="@/assets/dummy.png" alt="poster">
      <div class="data">
        <div class="data__overview" v-if="data.overview">
          <span>Overview:</span>
          <p class="description">{{ data.overview }}</p>
        </div>
        <div class="data__info">
          <p class="release" v-if="data.release_date"><span>Release date: </span>{{ data.release_date }}</p>
          <div class="votes" v-if="data.vote_average || data.vote_count">
            <p v-if="data.vote_average">Average rating: <span class="rating" :class="rating">{{ data.vote_average }}</span></p>
            <p v-if="data.vote_count">Vote count: {{ data.vote_count }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="result__buttons-container">
      <base-button dark><router-link :to="`/details/${this.id}`">View details</router-link></base-button>
      <base-button :data="data" dark @click="addToWatchList"><span>Add to Watch List</span></base-button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore()
const router = useRouter()

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

function addToWatchList() {
  store.dispatch('addToWatchList', { 
    data: props.data,
    router: router,
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
  border: 3px solid #2B3467;
  border-radius: 20px;
  &:is(.results__info + .result) {
    border-top: none;
    border-radius: 0 0 20px 20px;
    .result__title {
      border-top: 2px solid #2B3467;
      padding-top: 30px;
      margin-top: -30px;
    }
  }
  .result__title {
    font-family: 'Merriweather', serif;
    margin-bottom: 0;
    font-size: 2rem;
    text-align: center;
  }
  .result__original-title {
    margin-top: 5px;
    text-align: center;
    font-size: 1.4rem;
    .lang {
      text-transform: uppercase;
      margin-right: 5px;
      border: 1px solid #2B3467;
      padding: 2px 4px;
    }
  }
  .result__badges {
    margin: 30px 0;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    border-bottom: 2px solid #2B3467;
    padding-bottom: 20px;
  }
  .result__container {
    display: flex;
    img {
      max-width: 342px;
      max-height: 192px;
    }
    .data {
      padding-left: 3%;
      width: 100%;
      font-size: 1.2rem;
      .data__overview {
        margin-top: 0;
        box-shadow: 0 0 3px 1px #2B3467;
        padding: 3%;
      }
      .data__info {
        margin-left: 50px;
        .release {
          font-style: italic;
          span {
            font-style: normal;
          }
        }
        .votes {
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
    }
  }
  .result__buttons-container {
    display: flex;
    justify-content:flex-end;
    align-items: center;
    margin-top: 3%;
    button + button {
      margin-left: 3%;
    }
  }
  @media (max-width: 1000px) {
    .result__container {
      flex-direction: column;
      align-items: center;
      overflow: hidden;
      .data {
        margin-top: 30px;
        padding: 0 5px;
      }
    }
    .result__buttons-container {
      flex-direction: column;
      button {
        width: 100%;
        margin: 0;
      }
      button:last-child {
        margin: 20px 0 0;
      }
    }
  }
}
</style>