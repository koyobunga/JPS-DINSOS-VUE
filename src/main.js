

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/main";
import {createPinia} from "pinia";
import Toaster from '@meforma/vue-toaster';


import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

// import "bootstrap-icons/font/bootstrap-icons.css"

import './assets/main.css'




const pinia = createPinia()

createApp(App).use(router).use(pinia).use(Toaster).mount("#app");

