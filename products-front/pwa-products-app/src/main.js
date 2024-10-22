import { createApp } from 'vue';
import App from './App.vue';
import ToastService from 'primevue/toastservice';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-light-green/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const app = createApp(App);
app.use(PrimeVue);
app.use(ToastService);
app.mount('#app');
