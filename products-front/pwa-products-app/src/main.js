import { createApp } from 'vue';
import App from './App.vue';
import ToastService from 'primevue/toastservice';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-light-green/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { subscribeToPush } from './services/pushService';
import './registerServiceWorker';

const app = createApp(App);
app.use(PrimeVue);
app.use(ToastService);

function requestNotificationPermission() {
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      subscribeToPush();
    } else {
      console.error('Notification permission denied.');
    }
  });
}

requestNotificationPermission();

app.mount('#app');