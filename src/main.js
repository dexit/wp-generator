import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { slug } from './utils/helpers';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/main.css';
import './assets/js/main.js';

const app = createApp(App);

app.use(router);
app.use(store);

app.config.globalProperties.$filters = {
  slug(value, separator = '-') {
    return slug(value, separator);
  },
};

app.mount('#app');
