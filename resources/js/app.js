import Vue from 'vue';
import store from './store/index';
import vuetify from './vuetify';
import CreateDatabase from "./database/CreateDatabase";

require('./bootstrap');

window.Vue = require('vue');

Vue.component('social-component', require('./components/SocialComponent.vue').default);

Vue.component('quote', require('./components/Quote.vue').default);
Vue.component('boot', require('./components/Boot.vue').default);
Vue.component('admin', require('./components/Admin.vue').default);
Vue.component('csv-card', require('./components/pages/CSVCard.vue').default);

(new CreateDatabase()).boot();
// Vue.component('auth', require('./components/AuthComponent.vue').default);


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    store,
    vuetify
});