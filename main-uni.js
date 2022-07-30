import App from './App'
import jsMixin from './pages/sc-js/js.js';

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.mixin(jsMixin)
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
	app.mixin(jsMixin)
  return {
    app
  }
}
// #endif