<template>
  <div class="container">
    <h2 id="heading" v-if="movie">Movies similar to<div class="title">{{ movie.title }}</div></h2>
    <div class="results max-width" v-if="similarMovies[0] && store.getters.getGenres">
      <div class="results__stats">
        <p>Similar movies statistics:</p>
        <p>Total results: {{ similarMovies[0].total_results }}</p>
        <p>Total pages: {{ similarMovies[0].total_pages }}</p>
      </div>
      <div v-for="result in similarMovies" :key="`page${result.page}`" :class="`results-${result.page}`">
        <div class="results__info" v-if="similarMovies">
          <p>Page: {{ result.page }}/{{ result.total_pages }}</p>
        </div>
        <base-result v-for="result in result.results" :key="result.id" :data="result" :id="result.id"></base-result>
      </div>
    </div>
    <div class="controls" v-if="similarMovies[0] && pagesLoaded < similarMovies[0].total_pages">
      <base-spinner v-if="isLoading" />
      <base-button v-else dark @click="loadNextPage"><span>Load next page</span></base-button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const props = defineProps({id: String})

const isLoading = ref(false)

const movie = computed(()=> {
  return store.getters.getDetails(props.id)
})
const similarMovies = computed(()=> {
  return store.getters.getSimilarList.filter(obj=> obj.id === +props.id)
})
const pagesLoaded = computed(()=> {
  return store.getters.getSimilarList.filter(obj=> obj.id === +props.id).length
})

async function getMovies(payload) {
  const API = store.state.API
  let response = await fetch(`https://api.themoviedb.org/3/movie/${payload.id}/similar?api_key=${API}&language=en-US&page=${payload.page}`);
  const responseData = await response.json();
  if (!response.ok) {
    store.dispatch('displayMessage', {
      value: responseData.status_message || 'Failed to fetch data!',
      type: 'error'
    })
  }
  const result = responseData
  result.id = +props.id
  store.state.lists.similarList.push(result)
}

function getData() {
  //get source movie data
  store.dispatch('getDetails', props.id)

  //get similar movies page 1
  if (similarMovies.value.find(obj => obj.id === +props.id && obj.page === 1)) {
    return
  }
  getMovies({
    id: props.id,
    page: 1
  })
}
getData()

function loadNextPage() {
  getMovies({
    id: props.id,
    page: pagesLoaded.value+1
  })
}

</script>

<style lang="scss" scoped>
@import '@/_variables';
#heading {
  font-size: 1.4rem;
  .title {
    font-size: 1.8rem;
    color: $alt-color;
  }
}
.results {
  .results__stats, .results__info {
    background-color: $background-color;
    border: 3px solid $primary-color;
  }
  .results__stats {
    font-size: 1.2rem;
    padding: 3%;
    margin: 15px auto;
    text-align: center;
    border-radius: 20px;
    p:nth-child(1) {
      font-size: 1.4rem;
      font-weight: bold;
    }
  }
  .results__info {
    border-radius: 20px 20px 0 0;
    text-align: center;
    font-weight: bold;
    font-size: 2rem;
    margin-bottom: -20px;
    margin-top: 40px;
  }
}
.controls {
  text-align: center;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>