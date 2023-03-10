<template>
  <div class="result max-width" v-if="data.movie">
    <div class="result-container">
      <img :src="'https://image.tmdb.org/t/p/w780' + data.movie.poster_path" alt="poster">
      <div class="data">
        <h2 class="title">{{ data.movie.title }}<span class="year"> ({{ data.movie.release_date.slice(0, 4) }})</span><span v-if="data.movie.adult"> 🔞</span></h2>
        <p class="original_title" v-if="data.movie.original_language !== 'en'"><span class="lang">{{ data.movie.original_language }} </span>{{ data.movie.original_title }}</p>
        <div class="badges" v-if="data.movie.genres && store.state.genres.length">
          <base-badge v-for="badge in data.movie.genres" :key="badge.id" :badge="badge.id"></base-badge>
        </div>
        <div class="overview">
          <span>Overview:</span>
          <p class="description">{{ data.movie.overview }}</p>
        </div>
        <p class="release"><span>{{ data.movie.status }}: </span>{{ data.movie.release_date }}</p>
        <div class="money">
          <p class="budget" v-if="data.movie.budget">Budget: {{ moneyToString(data.movie.budget) }} USD</p>
          <p class="budget" v-if="data.movie.revenue">Revenue: {{ moneyToString(data.movie.revenue) }} USD</p>
          <p class="budget" v-if="data.movie.revenue && data.movie.budget">Balance: {{ moneyToString(balance) }} USD</p>
        </div>
        <div class="votes">
          <p>Average rating: <span class="rating" :class="rating">{{ data.movie.vote_average }}</span></p>
          <p>Vote count: {{ data.movie.vote_count }}</p>
        </div>
        <div class="length">Length: <span>{{ data.movie.runtime }} minutes</span></div>
        <div class="companies" v-if="data.movie.production_companies">
          <span>Production companies:</span>
          <div class="company" v-for="company in data.movie.production_companies" :key="`prod-${company.id}`">
            <img v-if="company.logo_path !== null" :src="`https://image.tmdb.org/t/p/w185${company.logo_path}`" alt="company logo">
            <p><span>{{ company.origin_country }}</span>{{ company.name }}</p>
          </div>
          <div class="countries" v-if="data.movie.production_countries">
            <p>Filming locations: </p>
            <div class="country" v-for="country in data.movie.production_countries" :key="`country-${data.movie.id}-${country.iso_3166_1}`">
            <span>{{ country.iso_3166_1 }} </span><span>{{ country.name }}</span>
            </div>
          </div>
          <div class="languages" v-if="data.movie.spoken_languages">
            <p>Spoken languages: </p>
            <span class="language" v-for="language in data.movie.spoken_languages" :key="`country-${data.movie.id}-${language.iso_639_1}`">{{ language.english_name }}</span>
          </div>
        </div>

        <div class="links">
          <a v-if="data.movie.homepage" :href="data.movie.homepage">Movies Homepage</a>
          <a v-if="data.movie.homepage" :href="`https://www.imdb.com/title/${data.movie.imdb_id}`">IMDb</a>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { defineProps, reactive, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const props = defineProps({id: String})

const data = reactive({})
const rating = computed(()=> {
      if (data.movie.vote_average > 7.5) {
      return 'high'
      } else if (data.movie.vote_average < 5) {
        return 'low'
      } else {
        return ''
      }
    })
const balance = computed(()=> {
  return data.movie.revenue - data.movie.budget
})

const moneyToString = (money) => {
  return String(money).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,')
}

async function getDetails() {
  await store.dispatch('getDetails', props.id)
  data.movie = reactive(store.state.recipesDetails.find(obj => obj.id === +props.id))
  console.log(data)
  }
 getDetails()

 store.dispatch('getGenresList')
 

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
    .data {
      padding-left: 3%;
      .title {
        font-family: 'Merriweather', serif;
        margin-bottom: 0;
      }
      .original_title {
        margin-top: 5px;
        .lang {
          text-transform: uppercase;
          margin-right: 5px;
          border: 1px solid #2B3467;
          padding: 2px 4px;
        }
      }
      .badges {
        margin: 30px 0;
      }
      .overview {
        margin-top: 0;
        box-shadow: 0 0 3px 1px #2B3467;
        padding: 3%;
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
</style>