import './assets/main.css';
import '../node_modules/vue3-toastify/dist/index.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';
import { toast, settings } from '@/plugins/toast';

const app = createApp(App);

app.use(router);

app.config.globalProperties.$toast = toast;

app.config.globalProperties.$toast.settings = settings;

app.mount('#app');
