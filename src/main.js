import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import vuetify from './plugins/vuetify';

import axios from 'axios';
import Cookies from 'js-cookie'

import Login from './components/Pages/Login';
import Register from './components/Pages/Register';
import Activities from './components/Pages/Activities';

Vue.config.productionTip = false
Vue.use(VueRouter);

const verifyAccess = () => {
    const cookie = Cookies.get('authentication');
    if (!cookie) return false;

    const authetication = JSON.parse(cookie);
    if (!authetication) return false;
    if (!authetication.token) return false;
    if (!authetication.requestedIn) return false;

    const expiresIn = new Date(new Date(authetication.requestedIn).getTime() + 60 * 60000);
    if (new Date() > expiresIn) {
        Cookies.remove('authentication');
        return false;
    }

    axios.defaults.headers.common["Authorization"] = authetication.token;
    return true;
}

const routes = [
    { path: '/', component: Login },
    { path: '/register', component: Register },
    {
        path: '/activities',
        component: Activities,
        beforeEnter(to, from, next) { verifyAccess() ? next() : next('/'); }
    }
]

const router = new VueRouter({ mode: 'history', routes });

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')