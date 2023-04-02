<template>
  <!-- login -->
  <div class="container">
    <form class="login" v-if="signingType === 'login'">
      <p class="title">Sign In</p>
    <div class="inputs">
      <div class="inputs__container">
        <input type="text" name="email" autocomplete="off" required v-model.trim="email" @blur="validate">
        <label for="email">Email</label>
      </div>
      <div class="inputs__container">
        <input type="password" name="password" autocomplete="off" required v-model.trim="password" @blur="validate">
        <label for="password">Password</label>
      </div>
    </div>
    <div class="error" v-if="store.state.auth.error">{{ store.state.auth.error }}</div>
    <button @click.prevent="submitForm">Sign In</button>
    <p>Don't have an account? <a href="#" @click="switchSigningType('register')">Sign up now!</a></p>
  </form>
  <!-- register  -->
  <form class="register" v-else>
    <p class="title">Register</p>
    <div class="inputs">
      <div class="inputs__container">
        <input type="text" name="email" autocomplete="off" required v-model.trim="email" @blur="validate">
        <label for="email">Email</label>
      </div>
      <div class="inputs__container">
        <input type="password" name="password" autocomplete="off" required v-model.trim="password" @blur="validate">
        <label for="password">Password</label>
      </div>
      <div class="inputs__container">
        <input type="password" name="repeatPassword" autocomplete="off" required v-model.trim="repeatPassword" @blur="validate">
        <label for="repeatPassword">Repeat password</label>
      </div>
    </div>
    <div class="error" v-if="store.state.auth.error">{{ store.state.auth.error }}</div>
    <button @click.prevent="submitForm">Sign Up</button>
    <p>Already have an account? <a href="#" @click="switchSigningType('login')">Sign in!</a></p>
  </form>
  <div class="logged" v-if="store.state.auth.userId" style="text-align: center; font-size: 2rem; color: green;">Logged In</div>
  <base-loading v-if="isLoading"/>
</div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

const email = ref('')
const password = ref('')
const repeatPassword = ref('')

const isLoading = ref(false)
const error = ref(null)

const signingType = ref('login')

function switchSigningType(type) {
  signingType.value = type
  error.value = null
  store.state.auth.error = null
}

function validate(e) {
  const { name, value} = e.target
  if (name === 'email') {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      e.target.classList.remove('invalid')
    } else {
      e.target.classList.add('invalid')
    }
  } else if (name === 'password') {
    if (value.length < 6) {
      e.target.classList.add('invalid')
    } else {
      e.target.classList.remove('invalid')
    }
  } else if (name === 'repeatPassword') {
    if (value.length < 6 || password.value !== repeatPassword.value) {
      e.target.classList.add('invalid')
    } else {
      e.target.classList.remove('invalid')
    }
  }
}

function clearPasswordInputs() {
  password.value = ''
  repeatPassword.value = ''
}

async function submitForm() {
  document.querySelectorAll('input').forEach(input => validate({target:input}))
  if (document.querySelectorAll('input.invalid').length) return

  isLoading.value = true
  clearPasswordInputs()

  const actionPayload = {
    email: email.value,
    password: password.value
  }
  
  try {
    if (signingType.value === 'login') {
      await store.dispatch('login', actionPayload)
    } else {
      await store.dispatch('register', actionPayload)
    }
  } catch(err) {
    error.value = err.message || 'Failed to authenticate. Try again later.'
  }

  isLoading.value = false
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
        &.invalid {
          border-color: red;
        }
      }
    }
  }
  .error {
    color: red;
    margin: -40px 20px 40px;
    font-size: 1.2rem;
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