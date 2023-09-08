import { createApp } from 'vue';
import App from './App.vue';
import router from './routes/router'
import pt from "./locales/pt.json";
import { primevue } from './plugins/primevue';
import './style.css';

import PrimeVue from 'primevue/config';

const app = createApp(App);
app.use(PrimeVue, {
    locale: pt
});

app.use(primevue);
app.use(router)

app.mount('#app')

