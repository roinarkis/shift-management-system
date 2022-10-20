import { createApp } from 'vue';
import router from './router.js';
import App from './App.vue';
import store from './store/index.js';
import BaseCard from './components/UI/BaseCard.vue';
import BaseButton from './components/UI/BaseButton.vue';
import MyMonthPicker from './components/services/MyMonthPicker.vue';
import BaseDialog from './components/UI/BaseDialog.vue';
import BaseSpinner from './components/UI/BaseSpinner.vue';


const app = createApp(App);
app.use(store);
app.use(router);
app.component('base-card',BaseCard);
app.component('base-button',BaseButton);
app.component('my-month-picker',MyMonthPicker);
app.component('base-dialog',BaseDialog);
app.component('base-spinner',BaseSpinner);

app.mount('#app');
