import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"
import './assets/main.css'


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueClientRecaptcha from 'vue-client-recaptcha'


const app = createApp(App)
app.component("VueClientRecaptcha", VueClientRecaptcha);  

app.use(router)

app.mount('#app')
