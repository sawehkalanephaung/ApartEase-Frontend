import "./assets/style.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import GStore from "./stores";
import "@/services/AxiosInterceptorSetup.js";
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(GStore);

app.mount("#app");
