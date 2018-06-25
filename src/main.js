import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'


Vue.use(Vuetify)

Vue.config.productionTip = false
new Vue({
    el: '#app',
    components: {
        App
    },
    template: '<App/>'
})
