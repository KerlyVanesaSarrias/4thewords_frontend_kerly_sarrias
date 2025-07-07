import { createPinia } from 'pinia'
import 'sweetalert2/dist/sweetalert2.min.css'
import { createApp } from 'vue'
import 'vue-final-modal/style.css'
import VueSweetalert2 from 'vue-sweetalert2'
import 'vue-toast-notification/dist/theme-bootstrap.css'
import App from './App.vue'
import './assets/main.css'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueSweetalert2)
app.mount('#app')
