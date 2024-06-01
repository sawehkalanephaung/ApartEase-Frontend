
import './assets/style.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import store from './stores';

// import api
import './services/api'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(store); 

app.mount('#app')

