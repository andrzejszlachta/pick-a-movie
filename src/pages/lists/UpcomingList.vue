<template>
  <div class="container">
    <h2>Upcoming movies in theatres</h2>
    <div class="results max-width" v-if="upcomingList[0] && store.getters.getGenres">
      <div class="results__stats">
        <p>Upcoming movies in theatres:</p>
        <p class="results__stats--dates">
          from <span>{{ upcomingList[0].dates.minimum }}</span>
          to <span>{{ upcomingList[0].dates.maximum }}</span>
        </p>
        <p>Total results: {{ upcomingList[0].total_results }}</p>
        <p>Total pages: {{ upcomingList[0].total_pages }}</p>
      </div>
      <div v-for="result in upcomingList" :key="`page${result.page}`" :class="`results-${result.page}`">
        <div class="results__info" v-if="upcomingList">
          <p>Page: {{ result.page }}/{{ result.total_pages }}</p>
        </div>
        <base-result v-for="result in result.results" :key="result.id" :data="result" :id="result.id"></base-result>
      </div>
    </div>
    <div class="controls" v-if="upcomingList[0] && pagesLoaded < upcomingList[0].total_pages">
      <base-spinner v-if="isLoading" />
      <base-button v-else dark @click="loadNextPage"><span>Load next page</span></base-button>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { ref, computed } from 'vue';

const pagesLoaded = computed(()=> {
  return store.getters.getUpcomingList.length
})

const isLoading = ref(false)

const store = useStore();
const upcomingList = computed(()=> {
  return store.getters.getUpcomingList
})

function loadFirstPage() {
  if(store.getters.getUpcomingList.find(obj => obj.page === 1)) return
  store.dispatch('getMoviesList', { part1:'https://api.themoviedb.org/3/movie/upcoming?api_key=', part2: '&language=en-US&page=', page: 1, savePath: 'upcomingList'})
}
loadFirstPage()

async function loadNextPage() {
  isLoading.value = true
  await store.dispatch('getMoviesList', { part1:'https://api.themoviedb.org/3/movie/upcoming?api_key=', part2: '&language=en-US&page=', page: pagesLoaded.value + 1, savePath: 'upcomingList'})
  isLoading.value = false
}
</script>

<style lang="scss" scoped>
@import '@/_variables';
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
    &--dates {
      span {
        font-weight: bold;
        margin-left: 5px;
        margin-right: 5px;
      }
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