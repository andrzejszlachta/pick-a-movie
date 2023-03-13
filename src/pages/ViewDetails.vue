<template>
  <div class="result max-width" v-if="data">
    <div class="result-container">
      <h2 class="title">{{ data.title }}<span class="year"> ({{ data.release_date.slice(0, 4) }})</span><span v-if="data.adult"> 🔞</span></h2>
      <p class="original_title" v-if="data.original_language !== 'en'"><span class="lang">{{ data.original_language }} </span>{{ data.original_title }}</p>
      <img v-if="data.poster_path" :src="'https://image.tmdb.org/t/p/w780' + data.poster_path" alt="poster">
      <div class="badges" v-if="data.genres && store.state.genres.length">
        <base-badge v-for="badge in data.genres" :key="badge.id" :badge="badge.id"></base-badge>
      </div>
      <table>
        <tr v-if="data.status"><th>{{ data.status }}: </th><td>{{ data.release_date }}</td></tr>        
        <tr v-if="data.budget"><th>Budget: </th><td>{{ moneyToString(data.budget) }} USD</td></tr>
        <tr v-if="data.revenue"><th>Revenue: </th><td>{{ moneyToString(data.revenue) }} USD</td></tr>
        <tr v-if="data.revenue && data.budget"><th>Balance: </th><td>{{ moneyToString(balance) }} USD</td></tr>
        <tr v-if="data.vote_average"><th>Average rating: </th><td><span class="rating" :class="rating">{{ data.vote_average.toFixed(2) }}</span></td></tr>
        <tr v-if="data.vote_count"><th>Vote count: </th><td>{{ data.vote_count }}</td></tr>
        <tr v-if="data.runtime"><th>Length: </th><td>{{ data.runtime }} minutes</td></tr>
      </table>
      <div class="overview box" v-if="data.overview">
        <span>Overview:</span>
        <p class="description">{{ data.overview }}</p>
      </div>
      <div class="companies box" v-if="data.production_companies">
        <span class="box_header">Production companies:</span>
        <div class="company" v-for="company in data.production_companies" :key="`prod-${company.id}`">
          <p><span class="lang">{{ company.origin_country }}</span>{{ company.name }}</p>
          <img v-if="company.logo_path !== null" :src="`https://image.tmdb.org/t/p/w185${company.logo_path}`" alt="company logo">
        </div>
      </div>
      <div class="countries box" v-if="data.production_countries">
        <p>Filming locations: </p>
        <table>
          <tr v-for="country in data.production_countries" :key="`country-${data.id}-${country.iso_3166_1}`">
            <th><span class="lang">{{ country.iso_3166_1 }} </span></th><td>{{ country.name }}</td>
          </tr>
        </table>
      </div>
      <div class="languages box" v-if="data.spoken_languages">
        <p>Spoken languages: </p>
        <ul>
          <li class="language" v-for="language in data.spoken_languages" :key="`country-${data.id}-${language.iso_639_1}`">{{ language.english_name }}</li>
        </ul>
      </div>
      <div class="links box" v-if="data.homepage || data.imdb_id">
        <p>Useful links:</p>
        <ul>
          <li><a v-if="data.homepage" :href="data.homepage">Movie's Homepage</a></li>
          <li><a v-if="data.imdb_id" :href="`https://www.imdb.com/title/${data.imdb_id}`"> 
            <svg id="home_img" class="ipc-logo" xmlns="http://www.w3.org/2000/svg" width="64" height="32" viewBox="0 0 64 32" version="1.1"><g fill="#F5C518"><rect x="0" y="0" width="100%" height="100%" rx="4"></rect></g><g transform="translate(8.000000, 7.000000)" fill="#000000" fill-rule="nonzero"><polygon points="0 18 5 18 5 0 0 0"></polygon><path d="M15.6725178,0 L14.5534833,8.40846934 L13.8582008,3.83502426 C13.65661,2.37009263 13.4632474,1.09175121 13.278113,0 L7,0 L7,18 L11.2416347,18 L11.2580911,6.11380679 L13.0436094,18 L16.0633571,18 L17.7583653,5.8517865 L17.7707076,18 L22,18 L22,0 L15.6725178,0 Z"></path><path d="M24,18 L24,0 L31.8045586,0 C33.5693522,0 35,1.41994415 35,3.17660424 L35,14.8233958 C35,16.5777858 33.5716617,18 31.8045586,18 L24,18 Z M29.8322479,3.2395236 C29.6339219,3.13233348 29.2545158,3.08072342 28.7026524,3.08072342 L28.7026524,14.8914865 C29.4312846,14.8914865 29.8796736,14.7604764 30.0478195,14.4865461 C30.2159654,14.2165858 30.3021941,13.486105 30.3021941,12.2871637 L30.3021941,5.3078959 C30.3021941,4.49404499 30.272014,3.97397442 30.2159654,3.74371416 C30.1599168,3.5134539 30.0348852,3.34671372 29.8322479,3.2395236 Z"></path><path d="M44.4299079,4.50685823 L44.749518,4.50685823 C46.5447098,4.50685823 48,5.91267586 48,7.64486762 L48,14.8619906 C48,16.5950653 46.5451816,18 44.749518,18 L44.4299079,18 C43.3314617,18 42.3602746,17.4736618 41.7718697,16.6682739 L41.4838962,17.7687785 L37,17.7687785 L37,0 L41.7843263,0 L41.7843263,5.78053556 C42.4024982,5.01015739 43.3551514,4.50685823 44.4299079,4.50685823 Z M43.4055679,13.2842155 L43.4055679,9.01907814 C43.4055679,8.31433946 43.3603268,7.85185468 43.2660746,7.63896485 C43.1718224,7.42607505 42.7955881,7.2893916 42.5316822,7.2893916 C42.267776,7.2893916 41.8607934,7.40047379 41.7816216,7.58767002 L41.7816216,9.01907814 L41.7816216,13.4207851 L41.7816216,14.8074788 C41.8721037,15.0130276 42.2602358,15.1274059 42.5316822,15.1274059 C42.8031285,15.1274059 43.1982131,15.0166981 43.281155,14.8074788 C43.3640968,14.5982595 43.4055679,14.0880581 43.4055679,13.2842155 Z"></path></g></svg>
          </a></li>
        </ul>
      </div>
      <div class="arrow" @click="scrollToTop" v-if="showArrow">⇧</div>
      <div class="buttons">
        <base-button dark><router-link to="/">Add to Watch List</router-link></base-button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { defineProps, computed, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const props = defineProps({id: String})

const data = computed(()=> {
  return store.getters.getDetails(props.id)
})

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
  await store.dispatch('getDetails', props.id)
  }
 getDetails()
 
</script>

<style lang="scss" scoped>
.result {
  background-color: #FCFFE7;
  padding: 3%;
  margin: 15px auto;
  border-width: 5px;
  border-style: solid;
  border-image: linear-gradient(to right, #2B3467, #EB455F) 1;
  .result-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 3%;
    .title {
      font-family: 'Acme', sans-serif;
      font-size: 3rem;
      letter-spacing: 1px;
      text-align: center;
    }
    .original_title {
      margin-top: -25px;
      font-size: 2rem;
    }
    .lang {
      text-transform: uppercase;
      margin-right: 10px;
      border: 1px solid #2B3467;
      padding: 2px 4px;
    }
    img {
      max-height: 1000px;
      margin-bottom: 50px;
    }
    .badges {
      margin: 30px 0;
    }
    .overview.box {
      margin-top: 50px;
    }
    .box {
      box-shadow: 0 0 3px 1px #2B3467;
      padding: 3%;
      width: 100%;
      margin-top: 10px;
      ul {
        margin: 0;
        padding: 0;
        list-style: none;
        li {
          margin-bottom: 10px;
        }
      }
    }
    table {
      margin-top: 10px;
      th {
        text-align: left;
        padding-right: 10px;
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
    .companies {
      display: flex;
      flex-wrap: wrap;
      .box_header {
        width: 100%;
        margin-bottom: 20px;
      }
      .company {
        display: grid;
        border: 1px solid black;
        padding: 3%;
        border-radius: 10px;
        margin-right: 5px;
        margin-bottom: 5px;
        min-width: 250px;
        min-height: 250px;
        img {
          justify-self: center;
          max-width: 150px;
          max-height: 150px;
        }
      }
    }
    .countries table {
      th {
        font-weight: normal;
        text-align: center;
      }
      td {
        padding: 5px 0;
      }
    }
    .languages ul {
      margin: 16px;
      list-style:disc;
    }
    .links li {
      width:fit-content;
      font-weight: bold;
      font-size: 1.3rem;
      transform-origin: left center;
      transition: transform .1s ease-in-out;
      &:hover {
        transform: scale(1.2);
      }
    }
    .arrow {
      position: fixed;
      bottom: 50px;
      right: 50px;
      font-size: 5rem;
      border: 3px solid #2B3467;
      border-radius: 50%;
      color: #2B3467;
      width: 110px;
      height: 110px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: transform .3s ease-out;
      background-color: #BAD7E9;
      &:hover {
        color: #EB455F;
        border-color: #EB455F;
        transform: translateY(-30px);
      }
    }
    .buttons {
      margin-top: 50px;
    }
  }
}
</style>