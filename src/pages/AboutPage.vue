<template>
  <div>
    <h2>Few words about this project</h2>
    <section class="max-width">
      <p><em>Pick A Movie</em> is a website built with Vue.js framework, Vue Router, and Vuex to offer a responsive and intuitive user interface for movie enthusiasts. Vue Router enables client-side routing, allowing users to navigate between different pages and views without reloading the entire page. Vuex is a state management library that helps manage data throughout the application, making it easier to share data between components.</p>
      <p>Users can search for movies by title, genre or any other relevant criteria. The page can also provide information about each movie, such as its plot summary and rating.</p>
      <p>By creating an account on the page, users can save movies to their personal watch list, which can be accessed at any time. This feature allows users to keep track of movies they want to watch in the future and makes it easy to find and watch them when the time is right.</p>
      <p>Website uses an API from The Movie Database (TMDB) to provide detailed information about movies. To store user data, such as saved movies or watchlists, the website uses Firebase, a cloud-based platform for building and hosting web applications. Firebase offers a real-time database and storage system that can handle large amounts of data and provide secure user authentication.</p>
      <p>By integrating the TMDB API and Firebase, the movie search website offers a seamless user experience, with up-to-date movie information and personalized user data. For example, users can save their custom watchlists, which are stored securely on Firebase and available for access across multiple devices. </p>
      <p>Overall, the combination of TMDB API and Firebase provides a powerful platform for building a feature-rich and responsive movie search website, with a focus on user engagement and personalized content.</p>
      <p>Overall, <em>Pick A Movie</em> is a convenient and practical tool for movie lovers who want to discover new films and keep track of their favorites.</p>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@import '@/_variables';
section {
  font-size: 1.2rem;
  background-color: $background-color;
  padding: 3%;
  margin: 15px auto;
  border: 3px solid $primary-color;
  border-radius: 20px;
  em {
    font-weight: bold;
  }
}
</style>