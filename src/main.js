import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from './router'; // Importa el archivo de configuración de las rutas

const app = createApp(App);
app.use(router); //middlewarw
app.mount('#app')
