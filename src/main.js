import Vue from 'vue'
import App from './App.vue'
import Vuesax from 'vuesax'
import MaterialIcons from 'material-icons'
import 'vuesax/dist/vuesax.css'
import '@/assets/sass/app.scss'

Vue.use(Vuesax)
Vue.use(MaterialIcons)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
