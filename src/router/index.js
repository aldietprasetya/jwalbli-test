import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Comments from '../views/Comments.vue'
import Account from '../views/Account.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: Home
		},
		{
			path: '/comments',
			component: Comments
		},
		{
			path: '/account',
			component: Account
		},
	],
})

export default router
