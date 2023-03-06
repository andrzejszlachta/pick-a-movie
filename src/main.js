import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import BaseButton from './ui/BaseButton.vue'
import BaseResult from './ui/BaseResult.vue'

const app = createApp(App)
  app.use(store)
  app.use(router)

  app.component('base-button', BaseButton)
  app.component('base-result', BaseResult)

  app.mount('#app')
