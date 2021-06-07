import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Manage from '@/views/Manage'
import Measure from '@/views/Measure'
import Register from '@/views/Register'

Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/manage',
        name: 'Manage',
        component: Manage
    },
    {
        path: '/measure',
        name: 'Measure',
        component: Measure
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
]

const router = new Router({
    mode: 'history',
    routes
})

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => {
		if (err.name !== 'NavigationDuplicated') throw err;
	});
};

export default router