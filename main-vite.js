import {
	createApp
} from 'vue'
import App from './App-vite.vue'
import jsMixin from './pages/sc-js/js.js';

const app = createApp(App)
app.mixin(jsMixin)
app.mount('#app')
