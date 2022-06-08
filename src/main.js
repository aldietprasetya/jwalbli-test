import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const options = {
  position: 'top-right'
};

createApp(App).use(router).use(Toast, options).mount('#app')
