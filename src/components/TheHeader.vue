<template>
  <header>
    <div class="header-container">
      <img src="../assets/pickamovie-logo2.png" alt="logo">
      <nav>
        <ul>
          <li><router-link to="/home">Home</router-link></li>
          <li><router-link to="/about">About</router-link></li>
          <li><router-link to="/search">Movie Picker</router-link></li>
          <li><router-link to="/home">Lists <span class="arrow">▶</span></router-link>
            <ul class="inner-list">
              <li><router-link to="/popular">Popular</router-link></li>
              <li><router-link to="/top">Top Rated</router-link></li>
              <li><router-link to="/trending">Trending</router-link></li>
              <li><router-link to="/discover">Discover</router-link></li>
              <li><router-link to="/upcoming">Upcoming</router-link></li>
              <li><router-link to="/latest">Latest</router-link></li>
            </ul>
          </li>
        </ul>
      </nav>
      <base-button><router-link to="/home">Account</router-link></base-button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  background-color: #2B3467;
  &::after {
    display: block;
    content: '';
    height: 7px;
    background-color: #2B3467;
    background: linear-gradient(90deg, rgba(186,215,233,1) 0%, rgba(186,215,233,1) 40%, rgba(235,69,95,1) 60%, rgba(235,69,95,1) 100%);
  }
  .header-container {
    margin: 0 auto;
    max-width: 1280px;
    display: flex;
    align-items: center;
    button {
      margin-left: auto;
      margin-right: 5%;
    }
    img {
      width: 150px;
      height: 150px;
    }
    nav {
      margin-left: 5%;
      ul {
        font-family: 'Merriweather', serif;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        list-style: none;
        margin: 0;
        padding: 0;
        li {
          margin-left: 10px;
          margin-right: 10px;
          .arrow {
            display: inline-block;
            color: white;
            transform: translateX(5px) rotate(90deg);
          }
          a {
            text-shadow: 0 0 2px black;
            display: block;
            padding: 10px;
            text-decoration: none;
            font-size: 1.4rem;
            color: white;
            text-transform: uppercase;
            letter-spacing: 1px;
            &:hover {
              color: #EB455F;
              &::after {
                transform: translateY(0);
                opacity: 1;
              }
            &:hover .arrow {
              color: #EB455F;
            }
            }
            &::after {
              display: block;
              content: '';
              height: 3px;
              width: 100%;
              background-color: #EB455F;
              transform: translateY(15px);
              opacity: 0;
              transition: transform .2s ease-out, opacity .2s ease-out;
            }
          }
        }
        li:nth-child(4) {
          &:hover ul.inner-list {
            transform: translateY(0);
            z-index: 1;
          }
          ul.inner-list {
            position: absolute;
            z-index: -1;
            display: flex;
            flex-flow: column wrap;
            background-color: #2B3467;
            border: 1px solid #BAD7E9;
            border-top: none;
            transform: translateY(-100%);
          }
        }
      }
    }
  }
}
</style>