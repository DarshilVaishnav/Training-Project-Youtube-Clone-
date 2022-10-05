import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import toast from 'vue-toast'
// import 'vue-toast/dist/vue-toast.min'
import moshaToast from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'
import VueCookies from 'vue3-cookies'
// import moment from 'moment'

createApp(App).use(router).use(moshaToast).use(VueCookies).mount('#app')
// Vue.filter('formatDate', function(value) {
//     if (value) {
//         return moment(String(value)).format('MMM DD')
//     }
// });