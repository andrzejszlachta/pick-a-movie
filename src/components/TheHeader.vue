<template>
  <header>
    <img src="../assets/pickamovie-logo2.png" alt="logo">
    <nav>
      <ul>
        <li><router-link to="/home">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/home">Option 1</router-link></li>
        <li><router-link to="/home">Option 2</router-link></li>
      </ul>
    </nav>
    <base-button><router-link to="/home">Account</router-link></base-button>
  </header>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>

header {
  background-color: #BAD7E9;
  display: flex;
  align-items: center;
  img {
    width: 150px;
    height: 150px;
  }
  nav {
    ul {
      font-family: 'Merriweather', serif;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      list-style: none;
      li {
        margin-left: 30px;
        margin-right: 30px;
        a {
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
            transition: transform .2s ease-out, opacity .2s ease-out, ;
          }
        }
      }
    }
  }
}

</style>