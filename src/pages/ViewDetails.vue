<template>
  <div v-if="data.movie">
    <p>Recipe details id: {{ props.id }}</p>
    <h2>{{ data.movie.title }}</h2>
  </div>
</template>

<script setup>
import { defineProps, reactive } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const props = defineProps({id: String})

const data = reactive({})

async function getDetails() {
  await store.dispatch('getDetails', props.id)
  data.movie = reactive(store.state.recipesDetails.find(obj => obj.id === +props.id))
  console.log(data)
  }
 getDetails()

</script>

<style lang="scss" scoped>

</style>











<!-- <template>
  <div>
    Recipe details id: {{ props.id }}
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const props = defineProps({id: String})

let data

async function getDetails() {
      const API = 'dcafa276c4fbb7347b91d1e1c1c50ae3'
      const fullURL = `https://api.themoviedb.org/3/movie/${props.id}?api_key=${API}&language=en-US`

      //dont call api request if already data stored locally
      if (store.state.recipesDetails.find(obj => obj.id === props.id) !== undefined) {
        // do nothing
      } else {

        let response = await fetch(fullURL);
        const responseData = await response.json();
        if (!response.ok) {
          const error = new Error(responseData.message || 'Failed to fetch data!');
          throw error
        }
        store.state.recipesDetails.push(responseData)
      }
      data = store.state.recipesDetails.find(obj => obj.id === +props.id)
      console.log(data)
    }
  getDetails()

</script>

<style lang="scss" scoped>

</style> -->



