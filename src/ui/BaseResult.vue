<template>
  <div class="result">
    <div class="result-container">
      <img :src="'https://image.tmdb.org/t/p/w342' + data.backdrop_path" alt="poster">
      <div class="data">
        <h2 class="title">{{ data.title }}<span class="year"> ({{ data.release_date.slice(0, 4) }})</span><span v-if="data.adult"> 🔞</span></h2>
        <p class="original_title" v-if="data.original_language !== 'en'"><span class="lang">{{ data.original_language }} </span>{{ data.original_title }}</p>
        <div class="badges" v-if="data.genre_ids">
          <base-badge v-for="badge in data.genre_ids" :key="badge" :badge="badge"></base-badge>
        </div>
        <div class="overview">
          <span>Overview:</span>
          <p class="description">{{ data.overview }}</p>
        </div>
        <p class="release"><span>Release date: </span>{{ data.release_date }}</p>
        <div class="votes">
          <p>Average rating: <span class="rating" :class="rating">{{ data.vote_average }}</span></p>
          <p>Vote count: {{ data.vote_count }}</p>
        </div>
      </div>
    </div>
    <div class="buttons-container">
      <base-button dark><router-link :to="`/details/${this.id}`">View details</router-link></base-button>
      <base-button dark><router-link to="/">Add to Watch List</router-link></base-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    }
  },
  computed: {
    rating() {
      if (this.data.vote_average > 7.5) {
      return 'high'
      } else if (this.data.vote_average < 5) {
        return 'low'
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.result {
  background-color: #FCFFE7;
  padding: 3%;
  margin: 15px 0;
  border-width: 5px;
  border-style: solid;
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