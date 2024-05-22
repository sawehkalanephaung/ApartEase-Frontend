
import './assets/style.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import store from './stores';
import { Quasar } from 'quasar'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'
import 'quasar/dist/quasar.css';
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'

const app = createApp(App).use(Quasar, quasarUserOptions)
app.use(createPinia())
app.use(router)
app.use(store); 
app.use(Quasar,{
  plugins:{}, // import Quasar plugin and add here
})

app.mount('#app')

