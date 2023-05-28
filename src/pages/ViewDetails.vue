<template>
  <div class="container">
    <div class="result max-width" v-if="data">
      <div class="result-container">
        <h3 class="result__title">{{ data.title }}<span v-if="data.release_date" class="year"> ({{ data.release_date.slice(0, 4) }})</span><span v-if="data.adult"> 🔞</span></h3>
        <p class="result__original_title" v-if="data.original_language !== 'en' && data.original_language && data.original_language.length"><span class="lang">{{ data.original_language }} </span>{{ data.original_title }}</p>
        <img class="result__poster" v-if="data.poster_path" :src="'https://image.tmdb.org/t/p/w780' + data.poster_path" alt="poster">
        <div class="result__badges" v-if="data.genres && data.genres.length && store.state.genres.length">
          <base-badge v-for="badge in data.genres" :key="badge.id" :badge="badge.id"></base-badge>
        </div>
        <div class="result__details">
          <table>
            <tr v-if="data.status"><th>Status: </th><td>{{ data.status }}</td></tr>
            <tr v-if="data.release_date"><th>Release date: </th><td>{{ data.release_date }}</td></tr>  
            <tr v-if="data.budget"><th>Budget: </th><td>{{ moneyToString(data.budget) }} USD</td></tr>
            <tr v-if="data.revenue"><th>Revenue: </th><td>{{ moneyToString(data.revenue) }} USD</td></tr>
            <tr v-if="data.revenue && data.budget"><th>Balance: </th><td :class="{ gain: balance > 0, loss: balance < 0 }">{{ moneyToString(balance) }} USD</td></tr>
            <tr v-if="data.vote_average"><th>Average rating: </th><td><span class="rating" :class="rating">{{ data.vote_average.toFixed(2) }}</span></td></tr>
            <tr v-if="data.vote_count"><th>Vote count: </th><td>{{ data.vote_count }}</td></tr>
            <tr v-if="data.runtime"><th>Length: </th><td>{{ data.runtime }} minutes</td></tr>
          </table>
        </div>
        <div class="result__overview box" v-if="data.overview">
          <p class="heading">Overview:</p>
          <p class="description">{{ data.overview }}</p>
        </div>
        <div class="result__companies box" v-if="data.production_companies && data.production_companies.length">
          <p class="heading">Production companies:</p>
          <div class="companies">
            <div class="company" v-for="company in data.production_companies" :key="`prod-${company.id}`">
              <p><span v-if="company.origin_country" class="lang">{{ company.origin_country }}</span>{{ company.name }}</p>
              <img v-if="company.logo_path !== null" :src="`https://image.tmdb.org/t/p/w185${company.logo_path}`" alt="company logo">
            </div>
          </div>
        </div>
        <div class="result__countries box" v-if="data.production_countries && data.production_countries.length">
          <p class="heading">Filming locations: </p>
          <div class="box__container">
            <ul>
              <li v-for="country in data.production_countries" :key="`country-${data.id}-${country.iso_3166_1}`">
                <span v-if="country.iso_3166_1" class="lang">{{ country.iso_3166_1 }} </span>
                <span v-if="country.name" class="country">{{ country.name }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="result__languages box" v-if="data.spoken_languages && data.spoken_languages.length">
          <p class="heading">Spoken languages: </p>
          <div class="box__container">
            <ul>
              <li class="language" v-for="language in data.spoken_languages" :key="`country-${data.id}-${language.iso_639_1}`">{{ language.english_name }}</li>
            </ul>
          </div>
        </div>
        <div class="result__links box" v-if="data.homepage || data.imdb_id">
          <p class="heading">Useful links:</p>
          <div class="box__container">
            <ul>
              <li><a target="_blank" v-if="data.homepage" :href="data.homepage">Movie's Homepage</a></li>
              <li><a target="_blank" v-if="data.imdb_id" :href="`https://www.imdb.com/title/${data.imdb_id}`"> 
                <svg id="home_img" class="ipc-logo" xmlns="http://www.w3.org/2000/svg" width="64" height="32" viewBox="0 0 64 32" version="1.1"><g fill="#F5C518"><rect x="0" y="0" width="100%" height="100%" rx="4"></rect></g><g transform="translate(8.000000, 7.000000)" fill="#000000" fill-rule="nonzero"><polygon points="0 18 5 18 5 0 0 0"></polygon><path d="M15.6725178,0 L14.5534833,8.40846934 L13.8582008,3.83502426 C13.65661,2.37009263 13.4632474,1.09175121 13.278113,0 L7,0 L7,18 L11.2416347,18 L11.2580911,6.11380679 L13.0436094,18 L16.0633571,18 L17.7583653,5.8517865 L17.7707076,18 L22,18 L22,0 L15.6725178,0 Z"></path><path d="M24,18 L24,0 L31.8045586,0 C33.5693522,0 35,1.41994415 35,3.17660424 L35,14.8233958 C35,16.5777858 33.5716617,18 31.8045586,18 L24,18 Z M29.8322479,3.2395236 C29.6339219,3.13233348 29.2545158,3.08072342 28.7026524,3.08072342 L28.7026524,14.8914865 C29.4312846,14.8914865 29.8796736,14.7604764 30.0478195,14.4865461 C30.2159654,14.2165858 30.3021941,13.486105 30.3021941,12.2871637 L30.3021941,5.3078959 C30.3021941,4.49404499 30.272014,3.97397442 30.2159654,3.74371416 C30.1599168,3.5134539 30.0348852,3.34671372 29.8322479,3.2395236 Z"></path><path d="M44.4299079,4.50685823 L44.749518,4.50685823 C46.5447098,4.50685823 48,5.91267586 48,7.64486762 L48,14.8619906 C48,16.5950653 46.5451816,18 44.749518,18 L44.4299079,18 C43.3314617,18 42.3602746,17.4736618 41.7718697,16.6682739 L41.4838962,17.7687785 L37,17.7687785 L37,0 L41.7843263,0 L41.7843263,5.78053556 C42.4024982,5.01015739 43.3551514,4.50685823 44.4299079,4.50685823 Z M43.4055679,13.2842155 L43.4055679,9.01907814 C43.4055679,8.31433946 43.3603268,7.85185468 43.2660746,7.63896485 C43.1718224,7.42607505 42.7955881,7.2893916 42.5316822,7.2893916 C42.267776,7.2893916 41.8607934,7.40047379 41.7816216,7.58767002 L41.7816216,9.01907814 L41.7816216,13.4207851 L41.7816216,14.8074788 C41.8721037,15.0130276 42.2602358,15.1274059 42.5316822,15.1274059 C42.8031285,15.1274059 43.1982131,15.0166981 43.281155,14.8074788 C43.3640968,14.5982595 43.4055679,14.0880581 43.4055679,13.2842155 Z"></path></g></svg>
              </a></li>
            </ul>
          </div>
        </div>
        <div class="arrow" @click="scrollToTop" v-if="showArrow">⇧</div>
        <div class="buttons">
          <base-button v-if="!store.getters.isOnWatchList(+props.id) && !store.getters.isOnWatchedList(+props.id)" :data="data" dark @click="showAddToWatchListDialog = true"><span>Add to watch list</span></base-button>
          <base-button v-else :data="data" dark @click="router.push('/account')"><span>Check my lists</span></base-button>
          <base-button dark><router-link :to="`/similar/${props.id}`">View similar movies</router-link></base-button>
          <base-button dark><span @click="viewReviews">View reviews</span></base-button>
          <base-button dark><span @click="router.back()">Go back</span></base-button>
          <base-dialog 
            @closeDialog="()=>{if (showAddToWatchListDialog) showAddToWatchListDialog = false}"
            :show="showAddToWatchListDialog"
            action="addToWatchList"
            :data="{data:data}">Do you want to add <span class="title">{{data.title}}</span> to your watch list?
          </base-dialog>
        </div>
      </div>
    </div>
    <div v-else-if="!data && store.state.viewDetailsLoaded" class="result result__nodata max-width">
      <p>No data available</p>
      <base-button dark><span @click="router.back()">Go back</span></base-button>
    </div>
    <base-spinner v-else />
    <div v-if="showReviews && loadedReviews" class="backdrop">
      <div @click="hidePopup" class="closeBtn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
      </div>
      <div v-if="reviews[0] && reviews[0].results.length" class="max-width reviews">
        <div class="review box" v-for="review in reviews[0].results" :key="review.id">
          <div class="clearfix">
            <div class="review__author--avatar">
              <img v-if="review.author_details.avatar_path" :src="imgSrc(review.author_details.avatar_path)" alt="avatar">
              <img v-else src="@/assets/dummy.png" alt="avatar">
            </div>
            <div v-if="review.content" class="review__content">{{ review.content }}</div>
            <div class="review__details">
              <p v-if="review.author" class="review__author--name">{{ review.author }}</p>
              <span v-if="review.author_details.rating" class="review__details--rating">{{ review.author_details.rating }}/10</span>
              <span v-if="review.updated_at" class="review__details--date">{{ clearedDate(review.updated_at) }}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="reviews[0] && !reviews[0].results.length" class="box max-width noresults">No reviews yet</div>
      <base-spinner v-else></base-spinner>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore()
const router = useRouter()
const props = defineProps({id: String})

const data = computed(()=> {
  return store.getters.getDetails(props.id)
})
const showReviews = ref(false)
const loadedReviews = ref(false)
const reviews = computed(()=> {
  console.log(store.getters.getReviews.filter(obj => obj.id === +props.id));
  return store.getters.getReviews.filter(obj => obj.id === +props.id)
})

function imgSrc(link) {
  if (!link) return '@/assets/dummy.png'
  if (link && link.includes('/https://')) return link.slice(1)
  return 'https://image.tmdb.org/t/p/w92' + link
}

const showAddToWatchListDialog = ref(false)

const rating = computed(()=> {
      if (data.value.vote_average > 7.5) {
      return 'high'
      } else if (data.value.vote_average < 5) {
        return 'low'
      } else {
        return ''
      }
    })
const balance = computed(()=> {
  return data.value.revenue - data.value.budget
})

const moneyToString = (money) => {
  return String(money).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,')
}

const scrollToTop = ()=> {
  window.scrollTo(0, 0)
}

let showArrow = ref(false)

window.onscroll = ()=> {
  showArrow.value = window.scrollY > window.innerHeight
}

async function getDetails() {
  loadedReviews.value = false
  await store.dispatch('getDetails', props.id)
  loadedReviews.value = true
}
getDetails()

function showPopup() {
  showReviews.value = true
  document.body.classList.add('popup-open')
}
function hidePopup() {
  showReviews.value = false
  document.body.classList.remove('popup-open')
}

async function viewReviews() {
  showPopup()
  await store.dispatch('getReviews', +props.id)
}

function clearedDate(date) {
  return date.split('Z').join(' ').split('T').join(' ').slice(0, 19)
}
</script>

<style lang="scss" scoped>
@import '@/_variables';
.container {
  min-height: 100%;
  .result__nodata {
      text-align: center;
      font-weight: bold;
      font-size: 2rem;
      p {
        margin-bottom: 5rem;
      }
    }
  .result {
    background-color: $background-color;
    padding: 3%;
    margin: 15px auto;
    border: 3px solid $primary-color;
    border-radius: 20px;
    .result-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      .result__title {
        font-family: 'Acme', sans-serif;
        font-size: 2rem;
        letter-spacing: 1px;
        text-align: center;
        @media (min-width: 750px) {
          font-size: 3rem;
        }
      }
      .result__original_title {
        margin-top: -25px;
        font-size: 2rem;
      }
      .lang {
        text-transform: uppercase;
        margin-right: 10px;
        border: 2px solid $primary-color;
        border-radius: 10px;
        padding: 2px 4px;
      }
      img.result__poster {
        max-height: 1000px;
        max-width: 100%;
        margin-bottom: 50px;
      }
      .result__badges {
        margin: 30px 0;
      }
      .result__overview.box {
        margin-top: 50px;
      }
      .box {
        box-shadow: 0 0 3px 1px $primary-color;
        padding: 6%;
        width: 100%;
        margin-top: 10px;
        font-size: 1.2rem;
        .box__container {
          width: max-content;
          margin: 0 auto;
        }
        ul {
          margin: 0;
          padding: 0;
          list-style: none;
          li {
            margin-bottom: 10px;
          }
        }
        p.heading {
          font-size: 1.4rem;
          text-align: center;
          font-weight: bold;
          margin-bottom: 2rem;
        }
      }
      .result__details table {
        font-size: 1.2rem;
        margin-top: 10px;
        th {
          text-align: left;
          padding-right: 10px;
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
        td.gain {
          font-weight: bold;
          color: $rating-good;
        }
        td.loss {
          font-weight: bold;
          color: $rating-bad;
        }
      }
      .result__companies {
        padding: 6%;
        .companies {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          .company {
            display: grid;
            border: 1px solid black;
            padding: 3%;
            border-radius: 10px;
            margin-bottom: 5px;
            margin-top: 20px;
            min-width: 250px;
            min-height: 250px;
            p {
              text-align: center;
            }
            img {
              justify-self: center;
              max-width: 150px;
              max-height: 150px;
            }
          }
        }
      }
      .result__countries {
        ul {
          width: max-content;
        }
      }
      .result__languages ul {
        width: max-content;
        margin: 16px;
        list-style:disc;
      }
      .result__links ul {
        text-align: center;
        li {
          font-weight: bold;
          font-size: 1.2rem;
          transform-origin: center center;
          transition: transform .1s ease-in-out;
          margin-top: 1rem;
          &:hover {
            transform: scale(1.2);
          }
        }
      }
      .arrow {
        position: fixed;
        bottom: 5px;
        right: 5px;
        z-index: 9;
        font-size: 5rem;
        border: 3px solid $primary-color;
        border-radius: 50%;
        color: $primary-color;
        width: 110px;
        height: 110px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: transform .3s ease-out;
        background-color: $secondary-color;
        &:hover {
          color: $alt-color;
          border-color: $alt-color;
          transform: translateY(-30px);
        }
      }
      .buttons {
        display: flex;
        width: 100%;
        flex-direction: column;
        margin-top: 50px;
        button {
          margin: 10px;
        }

      }
    }
  }
  :is(.spinner) {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .box {
    background-color: $background-color;
    border: 3px solid $primary-color;
    border-radius: 20px;
    }
  .backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: inline-block;
    overflow-y: scroll;
    background: rgba(0,0,0,0.8);
    z-index: 999;
    .reviews {
      padding-left: 10px;
      padding-right: 10px;
      .review {
        padding: 3%;
        .review__content {}
        .review__details {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 2rem;
          .review__author--name {
            font-family: 'Merriweather', serif;
            text-align: center;
            &:before {
              content: ' - ';
              margin-left: 10px;
            }
          }
          .review__details--rating {
            background-color: $secondary-color;
            border-radius: 10px;
            padding: 5px;
            margin-left: 10px;
            margin-right: 10px;
            color: $font-black;
          }
          .review__details--date {
            text-align: center;
            color: $font-disabled;
          }
        }
        .review__author--avatar {
          width: 90px;
          height: 90px;
          position: relative;
          overflow: hidden;
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
          -ms-border-radius: 50%;
          -o-border-radius: 50%;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          float: right;
          margin: 10px;
          img {
          height: 100%;
          width: auto;
          }
        }
      }
    }
    .noresults {
      position: absolute;
      width: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 4rem 1rem;
      font-size: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .closeBtn {
      position: fixed;
      top: 30px;
      right: 30px;
      width: 80px;
      height: 80px;
      padding: 10px;
      border-radius: 50%;
      background-color: $alt-color;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9;
      box-shadow: 0 0 5px 0 black;
      cursor: pointer;
    }
    @media (max-width: 1500px) {
      .reviews {
        padding-top: 70px;
      }
      .closeBtn {
        top: 10px;
        right: 50%;
        transform: translateX(50%);
        width: 50px;
        height: 50px;
      }
    }
  }
}
.clearfix {
  overflow: auto;
  &::after {
    content: "";
    clear: both;
    display: block;
  }
}
</style>

<style>
body.popup-open {
  height: 100vh;
  overflow: hidden;
}
</style>