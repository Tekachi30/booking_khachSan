import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes/routes'
import axiosPlugin from './plugins/axios.js';
createApp(App)
    .use(router)
    .use(axiosPlugin) 
    .mount('#app')
