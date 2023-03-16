<template>
  <div>
    <h2>Don't waste your time. Pick a movie to watch right now!</h2>
    <div class="container max-width">
      <div class="search">
        <!-- required -->
        <div class="sorting">
          <label for="sorting">Sorting:</label>
          <select name="sorting" id="sorting" v-model="searchData.sorting">
            <option value="popularity">Popularity</option>
            <option value="release_date">Release date</option>
            <option value="revenue">Revenue</option>
            <option value="primary_release_date">Primary release date</option>
            <option value="original_title">Original title</option>
            <option value="vote_average">Vote average</option>
            <option value="vote_count">Vote count</option>
          </select>
          <label><input type="radio" name="sorting_type" value=".desc" v-model="searchData.sorting_type" checked>Descending</label>
          <label><input type="radio" name="sorting_type" value=".asc" v-model="searchData.sorting_type">Ascending</label>
        </div>
        <label>Include +18:<input type="checkbox" name="adult" v-model="searchData.includeAdult"></label>
        <!-- additional -->
        <div class="releaseDate">
          <p>Release year:</p>
          <label>from: <input type="number" name="release" min="1500" max="2050" v-model.number="searchData.releaseGreater"></label>
          <label>to: <input type="number" name="release" min="1500" max="2050" v-model.number="searchData.releaseLess"></label>
        </div>
        <div class="voteAverage">
          <label for="voteAverage">Minimum rating:<input type="number" min="1" max="10" name="voteAverage" v-model.number="searchData.minVoteAverage"></label>
        </div>
        <div class="voteCount">
          <label for="voteCount">Minimum vote count:<input type="number" name="voteCount" v-model.number="searchData.minVoteCount"></label>
        </div>
        <div class="genres" v-if="genres[0]">
          <p>Pick your favorite genres:</p>
          <div class="genre" v-for="genre in genres[0].genres" :key="`genre${genre.id}`"><label><input type="checkbox" :value="genre.name" v-model="searchData.genres[genre.id]">{{ genre.name }}</label></div>
        </div>
        <base-button dark @click="submitSearch"><span>Search</span></base-button>
      </div>
      <div :class="`results-${data.page}`" v-if="data">
        <base-result v-for="result in data.results" :key="result.id" :data="result" :id="result.id"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

const searchData = reactive({
  sorting: 'popularity',
  sorting_type: '.desc',
  includeAdult: false,
  releaseGreater: null,
  releaseLess: null,
  minVoteAverage: null,
  minVoteCount: null,
  genres: {},
  filteredGenres: computed(()=> {
    let list = ''
    for (const id in searchData.genres) {
      if (searchData.genres[id]) {
        if (list.length) {
        list += `|${id}`
        } else {
          list = id
        }
      }
    }
    return list
  }),
  keyword: null,
})

const page = ref(1)

store.dispatch('getGenresList')
const genres = computed(()=> {
  return store.getters.getGenres
})

const data = computed(()=> {
  return store.getters.getResults.find(obj => obj.page === page.value)
})

const link = computed(()=> {
  let constructedLink = `&language=en-US&sort_by=${searchData.sorting}${searchData.sorting_type}&include_adult=${searchData.includeAdult}`
  if (searchData.releaseGreater) constructedLink += `&release_date.gte=${searchData.releaseGreater}`
  if (searchData.minVoteAverage && searchData.minVoteAverage >= 0 && searchData.minVoteAverage <= 10) constructedLink += `&vote_average.gte=${searchData.minVoteAverage}`
  if (searchData.minVoteCount) constructedLink += `&vote_count.gte=${searchData.minVoteCount}`
  if (searchData.filteredGenres.length) constructedLink += `&with_genres=${searchData.filteredGenres}`
  return constructedLink
})

async function submitSearch() {
  store.commit('clearSearchResults')
  console.log(link.value)
  await store.dispatch('getSearchResults', {
    part1: 'https://api.themoviedb.org/3/discover/movie?api_key=', 
    part2: link.value, 
    page: page.value, 
    savePath: 'searchResults',
  })
}

</script>

<style lang="scss" scoped>
  h2 {
    text-align: center;
    background-color: #2B3467;
    color: #fff;
    padding: 10px 0;
  }
  .search {
    background-color: #FCFFE7;
    padding: 3%;
    margin: 15px auto;
    border-width: 5px;
    border-style: solid;
    border-image: linear-gradient(to right, #2B3467, #EB455F) 1;
  }
</style>