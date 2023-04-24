<template>
  <teleport to="body">
    <div v-if="show" @click="emit('closeDialog')" class="backdrop"></div>
    <transition name="dialog">
      <dialog open v-if="show">
        <header>
          <h2>{{ title }}</h2>
        </header>
        <section>
          <slot></slot>
        </section>
        <menu>
          <slot name="actions">
            <base-button dark @click="confirmClick"><span>Confirm</span></base-button>
            <base-button dark @click="cancelClick"><span>Cancel</span></base-button>
          </slot>
        </menu>
      </dialog>
    </transition>
  </teleport>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  action : {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: false,
  },
})

const store = useStore()
const emit = defineEmits(['closeDialog'])

function confirmClick() {
  emit('closeDialog')
  store.dispatch(props.action, props.data)
}
function cancelClick() {
  emit('closeDialog')
}
</script>

<style lang="scss" scoped>
@import '@/_variables';
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

dialog {
  position: fixed;
  top: 20vh;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  max-width: 1000px;
  z-index: 100;
  border-radius: 20px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: white;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  opacity: 1;
  header {
    background-color: $primary-color;
    color: white;
    width: 100%;
    min-height: 3rem;
    padding: 1rem;
    h2 {
      margin: 0;
      text-align: center;
    }
  }
  section {
    padding: 2rem 3rem;
    text-align: center;
    font-size: 1.4rem;
    :is(span.title) {
      font-weight: bold;
    }
  }
  menu {
    padding: 1rem;
    display: flex;
    justify-content: space-around;
    margin: 0;
    @media (max-width: 505px) {
      flex-direction: column;
      button {
        margin-top: 10px;
      }
    }
  }
}

.dialog-enter-from, 
.dialog-leave-to {
  opacity: 0;
  transform: translateX(-50%) scale(0.8);
}
.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: translateX(-50%) scale(1);
}
.dialog-enter-active {
  transition: all .3s ease-out;
}
.dialog-leave-active {
  transition: all .2s ease-in;
}
</style>