<template>
  <div class="result">
    <div class="result-container">
      <img :src="'https://image.tmdb.org/t/p/w342' + data.backdrop_path" alt="poster">
      <div class="data">
        <h2 class="title">{{ data.title }}<span v-if="data.adult"> 🔞</span></h2>
        <p class="original_title">{{ data.original_title }}</p>
        <p class="release"><span>Release date: </span>{{ data.release_date }}</p>
        <span>Overview:</span><p class="description">{{ data.overview }}</p>
        <div class="votes">
          <p>Vote average: {{ data.vote_average }}</p>
          <p>Vote count: {{ data.vote_count }}</p>
        </div>
      </div>
    </div>
    <div class="buttons-container">
      <base-button><router-link to="/">View more</router-link></base-button>
      <base-button><router-link to="/">Add to Watch List</router-link></base-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    }
  }
}
</script>

<style lang="scss" scoped>
.result {
  background-color: #BAD7E9;
  // border-radius: 25px;
  padding: 3%;
  margin: 15px 0;
  border-width: 5px;
  border-style: solid;
  border-left-color: #BAD7E9;
  border-right-color: #EB455F;
  border-image: linear-gradient(to right, #2B3467, #EB455F) 1;
  
  .result-container {
    display: flex;
    align-items: center;
    .data {
      padding-left: 3%;
      .title {
        font-family: 'Merriweather', serif;
        margin-bottom: 0;
      }
      .original_title {
        margin-top: 5px;
      }
      .description {
        margin-top: 0;
      }
    }
  }
  .buttons-container {
    display: flex;
    justify-content:flex-end;
    align-items: center;
    margin-top: 3%;
    button:last-child {
      margin-left: 3%;
    }
  }
}
</style>