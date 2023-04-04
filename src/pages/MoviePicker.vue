<template>
  <div>
    <h2>Don't waste your time. Pick a movie to watch right now!</h2>
    <div class="container max-width">
      <div class="search">
        <div class="sorting box">
          <label for="sorting">Sorting type</label>
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
          <label><input type="checkbox" name="adult" v-model="searchData.includeAdult">Include +18?</label>
        </div>
        <div class="stats box">
          <table class="stats__release">
            <tr>
              <th>Release year</th>
            </tr>
            <tr>
              <th><label for="releaseGreater">from</label></th>
              <td><input type="number" name="releaseGreater" min="1900" max="2050" v-model.number="searchData.releaseGreater" placeholder="1990"></td>
            </tr>
            <tr>
              <th><label for="releaseLess">to</label></th>
              <td><input type="number" name="releaseLess" min="1900" max="2050" v-model.number="searchData.releaseLess" placeholder="2020"></td>
            </tr>
          </table>
          <table class="stats__vote">
            <tr>
              <th><label for="voteAverage">Minimum rating</label></th>
              <td><input type="number" min="1" max="10" name="voteAverage" v-model.number="searchData.minVoteAverage" placeholder="7.5"></td>
            </tr>
            <tr>
              <th><label for="voteCount">Minimum votes</label></th>
              <td><input type="number" name="voteCount" v-model.number="searchData.minVoteCount" placeholder="1000"></td>
            </tr>
          </table>
        </div>
        <div class="genres box" v-if="genres[0]">
          <p>Pick your favorite genres</p>
          <div class="genres__container">
            <div class="genre" v-for="genre in genres[0].genres" :key="`genre${genre.id}`">
              <label><input type="checkbox" :value="genre.name" v-model="searchData.genres[genre.id]">{{ genre.name }}</label>
            </div>
          </div>
        </div>
        <base-button dark @click="submitSearch"><span>Search</span></base-button>
      </div>
    </div>
    <div class="results max-width" v-if="store.state.searchResults.length" @scroll="getMoreResults">
      <div class="results__stats">
        <p>Search results statistics:</p>
        <p>Total results: {{ store.state.searchResults[0].total_results }}</p>
        <p>Total pages: {{ store.state.searchResults[0].total_pages }}</p>
      </div>
      <div v-for="result in store.state.searchResults" :key="`page${result.page}`" :class="`results-${result.page}`">
        <div class="results__info" v-if="store.state.searchResults.length">
          <p>Page: {{ result.page }}/{{ result.total_pages }}</p>
        </div>
        <base-result v-for="result in result.results" :key="result.id" :data="result" :id="result.id"></base-result>
      </div>
    </div>
    <base-spinner v-if="isLoading" />
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';
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

const page = computed(()=> {
  return store.state.searchResults.length
})

const isLoading = ref(false)

store.dispatch('getGenresList')
const genres = computed(()=> {
  return store.getters.getGenres
})

const link = computed(()=> {
  let constructedLink = `&language=en-US&sort_by=${searchData.sorting}${searchData.sorting_type}&include_adult=${searchData.includeAdult}`
  if (searchData.releaseGreater) constructedLink += `&release_date.gte=${searchData.releaseGreater}`
  if (searchData.releaseLess) constructedLink += `&release_date.lte=${searchData.releaseLess}`
  if (searchData.minVoteAverage && searchData.minVoteAverage >= 0 && searchData.minVoteAverage <= 10) constructedLink += `&vote_average.gte=${searchData.minVoteAverage}`
  if (searchData.minVoteCount) constructedLink += `&vote_count.gte=${searchData.minVoteCount}`
  if (searchData.filteredGenres.length) constructedLink += `&with_genres=${searchData.filteredGenres}`
  if (page.value) constructedLink += `&page=${page.value}`
  return constructedLink
})

async function submitSearch() {
  isLoading.value = true
  store.commit('clearSearchResults')
  await store.dispatch('getSearchResults', {
    part1: 'https://api.themoviedb.org/3/discover/movie?api_key=', 
    part2: link.value, 
    page: page.value, 
    savePath: 'searchResults',
  })
  console.log(link.value);
  isLoading.value = false
}

// infinite scroll
onMounted(()=> {
  window.addEventListener("scroll", getMoreResults);
})

async function getMoreResults() {
  if ((window.innerHeight + window.scrollY + 50) >= document.body.offsetHeight && store.state.searchResults.length && page.value < store.state.searchResults[0].total_pages) {
    if (isLoading.value) return
    isLoading.value = true
    await store.dispatch('getSearchResults', {
      part1: 'https://api.themoviedb.org/3/discover/movie?api_key=', 
      part2: link.value, 
      page: page.value + 1, 
      savePath: 'searchResults',
    })
    isLoading.value = false
  }
}

onUnmounted(() => {
  window.removeEventListener("scroll", getMoreResults);  
})

</script>

<style lang="scss" scoped>
    .box {
        box-shadow: 0 0 3px 1px #2B3467;
        padding: 3%;
        margin: 5px;
        input[type='checkbox'],
        input[type='radio'] {
          cursor: pointer;
          width: 23px;
          height: 23px;
          vertical-align: -4px;
        }
        label:has(input[type='checkbox']),
        label:has(input[type='radio']) {
          cursor: pointer;
        }
    }
  .container .search {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 
    "sorting stats"
    "genres genres"
    "button button";
    font-size: 1.2rem;
    background-color: #FCFFE7;
    padding: 3%;
    margin: 15px auto;
    border-width: 5px;
    border-style: solid;
    border-image: linear-gradient(to right, #2B3467, #EB455F) 1;
    @media (max-width: 700px) {
      grid-template-areas: 
      "sorting sorting"
      "stats stats"
      "genres genres"
      "button button";
    }
    .sorting {
      grid-area: sorting;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding: 6%;
      label {
        display: block;
        margin-top: 5px;
        &:nth-child(1) {
          font-weight: bold;
        }
        &:nth-child(3),
        &:nth-child(4) {
          margin-left: 20px;
        }

        &:nth-last-child(1) {
          font-weight: bold;
          margin-top: 20px;
        }
      }
      select {
        margin-top: 20px;
        margin-bottom: 5px;
        font-size: 1.2rem;
      }
    }
    .stats {
      padding: 6%;
      grid-area: stats;
      table {
        th {
          text-align: left;
        }
        /* Chrome, Safari, Edge, Opera */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Firefox */
        input[type=number] {
          font-size: 1.2rem;
          -moz-appearance: textfield;
          appearance: textfield;
          border: 1px solid #2B3467;
          width: 100px;
          text-align: center;
          &::placeholder {
            font-size: 1rem;
          }
          &:focus {
            box-shadow: 0 0 5px 0 #2B3467;
            outline: none;
          }
        }
      }
      table.stats__release {
        tr {
          &:nth-child(2),
          &:nth-child(3) {
            th {
              padding-left: 20px;
              font-weight: normal;
            }
          }
        }
      }
      table.stats__vote {
        margin-top: 30px;
        th {
          padding-right: 20px;
        }
      }
    }
    .genres {
      grid-area: genres;
      @media (max-width: 700px) {
        padding: 6%;
      }
      p {
        font-weight: bold;
      }
      .genres__container {
        display: grid;
        grid-template-columns: repeat(5, auto);
        @media (max-width: 850px) {
          grid-template-columns: repeat(3, auto);
        }
        @media (max-width: 550px) {
          grid-template-columns: repeat(1, auto);
          .genre {
            margin: 0;
            padding: 5px;
          }
        }
      }
      .genre {
        margin: 5px;
      }
    }
    button {
      grid-area: button;
      margin-top: 20px;
    }
  }
  .results {
      .results__stats, .results__info {
        background-color: #FCFFE7;
        border-width: 5px;
        border-style: solid;
        border-image: linear-gradient(to right, #2B3467, #EB455F) 1;
      }
      .results__stats {
        font-size: 1.2rem;
        padding: 3%;
        margin: 15px auto;
        text-align: center;
        p:nth-child(1) {
          font-size: 1.5rem;
          font-weight: bold;
        }
      }
      .results__info {
        font-family: 'Merriweather', serif;
        text-align: center;
        font-weight: bold;
        font-size: 1.5rem;
        margin-bottom: 0;
        border-bottom: none;
      }
      .result:nth-of-type(2) {
        margin-top: -30px;
        border-top: none;
      }
    }
</style>