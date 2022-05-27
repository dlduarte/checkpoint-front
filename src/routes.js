import VueRouter from 'vue-router'
import Login from './components/Pages/Login';
import Register from './components/Pages/Register';
import Activities from './components/Pages/Activities';
import axios from 'axios';
import Cookies from 'js-cookie'

const verifyAccess = next => {
    const cookie = Cookies.get('authentication');
    if (!cookie) return next('/');

    const authetication = JSON.parse(cookie);
    if (!authetication) return next('/');
    if (!authetication.token) return next('/');
    if (!authetication.requestedIn) return next('/');

    const expiresIn = new Date(new Date(authetication.requestedIn).getTime() + 60 * 60000);
    if (new Date() > expiresIn) {
        Cookies.remove('authentication');
        return next('/');
    }

    axios.defaults.headers.common["Authorization"] = authetication.token;
    return next();
}

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: Login },
        { path: '/register', component: Register },
        {
            path: '/activities',
            component: Activities,
            beforeEnter: (to, from, next) => verifyAccess(next)
        }
    ]
});

export const logout = () => {
    Cookies.remove('authentication');
    router.push('/');
}

export default router;