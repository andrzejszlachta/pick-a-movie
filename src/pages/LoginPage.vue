<template>
  <!-- login -->
  <form class="login" v-if="signingType === 'login'">
    <p class="title">Sign In</p>
    <div class="inputs">
      <div class="inputs__container">
        <input type="text" name="username" autocomplete="off" required>
        <label for="username">Username</label>
      </div>
      <div class="inputs__container">
        <input type="password" name="password" autocomplete="off" required>
        <label for="password">Password</label>
      </div>
    </div>
    <button @click.prevent="login">Sign In</button>
    <p>Don't have an account? <a href="#" @click="switchToRegister">Sign up now!</a></p>
  </form>
  <!-- register  -->
  <form class="register" v-else>
    <p class="title">Register</p>
    <div class="inputs">
      <div class="inputs__container">
        <input type="text" name="username" autocomplete="off" required>
        <label for="username">Username</label>
      </div>
      <div class="inputs__container">
        <input type="password" name="password" autocomplete="off" required>
        <label for="password">Password</label>
      </div>
      <div class="inputs__container">
        <input type="password" name="password" autocomplete="off" required>
        <label for="password">Repeat password</label>
      </div>
    </div>
    <button @click.prevent="register">Sign Up</button>
    <p>Already have an account? <a href="#" @click="switchToLogin">Sign in!</a></p>
  </form>
</template>

<script setup>
import { ref } from 'vue';

const signingType = ref('login')

function switchToLogin() {
  signingType.value = 'login'
}

function switchToRegister() {
  signingType.value = 'register'
}

async function login() {
  console.log('login')
}

async function register() {
  console.log('register')
}

</script>

<style lang="scss" scoped>
// #2B3467
// #BAD7E9
// #FCFFE7
// #EB455F
@mixin input-style {
  width: 400px;
  height: 50px;
  border-radius: 25px;
  margin: 15px 0;
  outline: none;
  border: none;
}
form {
  width: 500px;
  max-width: 95vw;
  border-radius: 20px;
  background-color: #FCFFE7;
  overflow: hidden;
  margin: 50px auto;
  text-align: center;
  .title {
    background-color: #2B3467;
    font-size: 2.5rem;
    color: white;
    text-align: center;
    padding: 6%;
    margin: 0;
  }
  .inputs {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 60px 0;
    .inputs__container {
      position: relative;
      &:nth-child(1) {
        margin-bottom: 20px;
      }
      label {
        position: absolute;
        top: 30px;
        left: 60px;
        pointer-events: none;
        transition: top .1s ease-out;
        color: grey;
      }
      input {
        @include input-style;
        max-width: 80%;
        padding-left: 20px;
        border: 4px solid #BAD7E9;
        &:focus {
          border: 4px solid #2B3467;
          & + label {
            top: -5px;
            color: black;
          }
        }
        &:not(:focus):valid + label {
          top: -5px;
          color: black;
        }
      }
    }
  }
  button {
    @include input-style;
    cursor: pointer;
    font-size: 1.2rem;
    background-color: #BAD7E9;
    box-shadow: 0 9px #2B3467;
    font-weight: bold;
    max-width: 320px;
    &:hover {
      color: #2B3467;
      border: 2px solid #2B3467;
    }
    &:active {
      box-shadow: 0 4px #2B3467;
      transform: translateY(5px);
    }
  }
  p {
    margin: 50px 0 25px;
  }
  a {
    text-transform: uppercase;
    font-weight: bold;
    color: #2B3467;
    padding-left: 10px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>