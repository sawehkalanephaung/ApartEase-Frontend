import "./assets/style.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import GStore from "./stores";
import "@/services/AxiosInterceptorSetup.js";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import Popper from "vue3-popper";
import ToastNotification from './components/ToastNotification.vue';
import '@fortawesome/fontawesome-free/css/all.css';


// import login expireation
import { checkLoginStatus } from './utils/checkLoginStatus';


const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(GStore);
app.mount("#app");
app.component('VueDatePicker', VueDatePicker);
app.component("Popper", Popper);
app.component('ToastNotification', ToastNotification);

// Add event listener for when the page is loaded or becomes visible
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      checkLoginStatus();
    }
  });
