<template>
  <div class="max-width">
    <h1>Top Rated List</h1>
      <div class="results" v-if="store.state.topList[0]">
        <base-result v-for="result in store.state.topList[0].results" :key="result.id" :data="result" :id="result.id"/>
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
  store.dispatch('getMoviesList', { part1:'https://api.themoviedb.org/3/movie/top_rated?api_key=', part2: '&language=en-US&page=', page: page.value, savePath: 'topList'})
});
</script>

<style lang="scss" scoped>
</style>