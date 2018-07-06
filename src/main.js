import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'

import datePicker from 'vue-bootstrap-datetimepicker';
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

Vue.use(datePicker);
Vue.use(Vuetify)
Vue.config.productionTip = false
$.extend(true, $.fn.datetimepicker.defaults, {
    icons: {
        time: 'far fa-clock',
        date: 'far fa-calendar',
        up: 'fas fa-arrow-up',
        down: 'fas fa-arrow-down',
        previous: 'fas fa-chevron-left',
        next: 'fas fa-chevron-right',
        today: 'fas fa-calendar-check',
        clear: 'far fa-trash-alt',
        close: 'far fa-times-circle'
    }
});
new Vue({
    el: '#app',
    components: {
        App,
        "vue-datetime-picker": require("vue-datetime-picker")
    },
    template: '<App/>'
})
