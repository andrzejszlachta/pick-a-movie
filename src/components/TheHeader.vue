<template>
  <header>
    <div class="header-container standard">
      <img src="../assets/pickamovie-logo2.png" alt="logo">
      <nav>
        <ul>
          <li><router-link to="/home">Home</router-link></li>
          <li><router-link to="/about">About</router-link></li>
          <li><router-link to="/search">Movie Picker</router-link></li>
          <li class="nonLink">Lists <span class="arrow">▶</span>
            <ul class="inner-list">
              <li><router-link to="/popular">Popular</router-link></li>
              <li><router-link to="/top">Top Rated</router-link></li>
              <li><router-link to="/trending">Trending</router-link></li>
              <li><router-link to="/upcoming">Upcoming</router-link></li>
              <li><router-link to="/latest">Latest</router-link></li>
            </ul>
          </li>
        </ul>
      </nav>
      <base-button><router-link to="/home">Account</router-link></base-button>
    </div>
    <div class="header-container mobile">
      <img src="../assets/pickamovie-logo2.png" alt="logo">
      <div class="container">
        <button class="switch" @click="switchNav" @touchstart.prevent="switchNav">≡</button>
        <nav v-if="showMobileNav" @click="switchNav">
          <ul>
            <li><router-link to="/home">Home</router-link></li>
            <li><router-link to="/about">About</router-link></li>
            <li><router-link to="/search">Movie Picker</router-link></li>
            <li class="nonLink" tabindex="0">Lists
              <ul class="inner-list">
                <li><router-link to="/popular">Popular</router-link></li>
                <li><router-link to="/top">Top Rated</router-link></li>
                <li><router-link to="/trending">Trending</router-link></li>
                <li><router-link to="/upcoming">Upcoming</router-link></li>
                <li><router-link to="/latest">Latest</router-link></li>
              </ul>
            </li>
            <li><router-link to="/home">Account</router-link></li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const showMobileNav = ref(false)

function switchNav() {
  showMobileNav.value = !showMobileNav.value
}

</script>

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
  .header-container.standard {
    margin: 0 auto;
    max-width: 1280px;
    display: flex;
    align-items: center;
    @media (max-width: 1049px) {
      display: none;
    }
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
        li.nonLink {
          position: relative;
          font-size: 1.4rem;
          font-weight: bold;
          text-transform: uppercase;
          color: white;
          padding: 10px;
          cursor: pointer;
        }
        li:nth-child(4) {
          &:hover ul.inner-list,
          &:focus-within ul.inner-list {
            transform: translateY(0);
            z-index: 1;
          }
          ul.inner-list {
            position: absolute;
            left: -30px;
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
  .header-container.mobile {
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media (min-width: 1050px) {
      display: none;
    }
    img {
      justify-self: flex-start;
      width: 100px;
      height: 100px;
    }
    .container {
      position: relative;
      margin-right: 20px;
      button.switch {
        width: 70px;
        height: 70px;
        font-size: 2rem;
        background-color: transparent;
        outline: none;
        border: 3px solid white;
        font-weight: bold;
        color: white;
        cursor: pointer;
        transition: color .2s ease-out, border-color .2s ease-out;
        &:hover,
        &:focus {
          color: #EB455F;
          border-color: #EB455F;
        }
      }
      nav {
        position: absolute;
        top: 80px;
        right: -20px;
        z-index: 1;
        ul {
        font-family: 'Merriweather', serif;
        font-weight: bold;
        display: flex;
        flex-flow: column wrap;
        background-color: #2B3467;
        border: 1px solid #BAD7E9;
        border-top: none;
        margin: 0;
        padding: 0;
        list-style: none;
        min-width: 100%;
        overflow: hidden;
          li {
            min-width: 100%;
            margin-left: 10px;
            margin-right: 10px;
            padding-right: 10px;
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
          li.nonLink {
            font-size: 1.4rem;
            font-weight: bold;
            text-transform: uppercase;
            padding-left: 10px;
            color: gray;
            margin-top: 10px;
          }
          ul.inner-list {
            border: none;
            color: white;
          }
        }
      }
    }
  }
}
</style>