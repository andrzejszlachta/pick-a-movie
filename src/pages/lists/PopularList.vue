<template>
  <div class="max-width">
      <h1>Popular List</h1>
      <div class="results">
        <base-result v-for="result in store.state.popularList.results" :key="result.id" :data="result"/>
      </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { onBeforeMount } from 'vue';
import { ref } from 'vue';

const page = ref(1)

const store = useStore();

onBeforeMount(() => {
  store.dispatch('getTrendingMoviesList', { part1:'https://api.themoviedb.org/3/movie/popular?api_key=', part2: '&language=en-US&page=', page: page.value, savePath: 'popularList'})
  console.log(page.value)
});

</script>

<style lang="scss" scoped>
</style>