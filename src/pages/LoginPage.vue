<template>
  <!-- if not logged -->
  <div class="form">
    <div class="form__title">Sign In</div>
    <div class="form__inputs">
      <div class="input-container">
        <input type="text" name="username">
        <label for="username">Username</label>
      </div>
      <div class="input-container">
        <input type="password" name="password">
        <label for="passowrd">Password</label>
      </div>
    </div>
    <button>Sign In</button>
    <p>Don't have an account? <span class="link">Sign up now!</span></p>
  </div>
  <!-- if logged  -->
  <div>

  </div>
</template>

<script setup>

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
.form {
  width: 500px;
  max-width: 95vw;
  border-radius: 20px;
  background-color: #FCFFE7;
  overflow: hidden;
  margin: 50px auto;
  text-align: center;
  .form__title {
    background-color: #2B3467;
    font-size: 3rem;
    color: white;
    text-align: center;
    padding: 3%;
  }
  .form__inputs {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 60px 0;
    .input-container {
      position: relative;
      label {
        position: absolute;
        top: 30px;
        left: 50px;
        pointer-events: none;
        transition: top .1s ease-out;
        color: grey;
      }
      input {
        @include input-style;
        max-width: 80%;
        padding-left: 20px;
        &:focus {
          border: 4px solid #2B3467;
          & + label {
            top: -5px;
            color: black;
          }
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
  span.link {
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