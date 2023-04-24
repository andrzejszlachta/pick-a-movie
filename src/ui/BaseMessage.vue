<template>
  <teleport to='body'>
    <div class="messages" v-if="store.state.messages.length">
      <TransitionGroup name="message" tag="div">
        <div class="messages__item" :class="message.type" v-for="message in store.state.messages" :key="message.id">{{ message.value }}</div>
      </TransitionGroup>
      </div>
  </teleport>
</template>

<script setup>
import { useStore } from 'vuex';
const store = useStore()
</script>

<style lang="scss" scoped>
@import '@/_variables';
.messages {
  font-family: "Merriweather", serif;
  position: fixed;
  color: $font-black;
  top: 0;
  right: 0;
  width: 250px;
  max-width: 100%;
  border: 2px solid $primary-color;
  background-color: $background-color;
  border-radius: 7px;
  transition: height .5s ease-in-out;
  .messages__item {
    padding: 5px;
    font-weight: bold;
    &.error {
      color: $msg-error;
    }
    &.success {
      color: $msg-success;
    }
  }
}
.message-enter-active,
.message-leave-active {
  transition: all .5s ease-in-out;
}
.message-leave-to {
  opacity: 0;
}
.message-enter-from {
  transform: translateX(100%);
}
</style>