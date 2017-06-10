import Vue from 'vue'
import Router from 'vue-router'
import welcome from '@/views/welcome'
import signin from '@/components/signin'
import signup from '@/components/signup'

import search from '../views/search'
import index from '../views/index'
import movies from '../views/movies'
import hot from '@/components/hot'
import detail from '@/views/detail'
import cinema from '@/views/cinema'
import account from '@/views/account'
import profile from '@/components/profile'
import orders from '@/components/orders'
import seats from '@/views/seats'


Vue.use(Router)

export default new Router({
    routes: [{
        path:'/index',
        component:index
    },{
    	path: '/welcome',
    	name: 'welcome',
    	component: welcome,
    	children:[
    	{
    		path:'signin',
    		component: signin
    	},{
    		path:'signup',
    		component: signup
    	}]
    },{
		path:'/',
		redirect:'/index'
    },{
        path:'/movies',
        name:'movies',
        component:movies,
    },{
        path: '/movie/detail/:title',
        component: detail
    },{
        path: '/movie/seats/:playid/:title/:cinema/:time/:room/:price',
        component: seats
    },{
        path: '/cinemas',
        component: cinema
    },{
        path: '/search/:str',
        component: search
    },{
        path: '/account',
        component: account,
        redirect:'/account/profile',
        children:[
        {
            path:'profile',
            component: profile
        },{
            path:'orders',
            component: orders
        }]
    }
  ]
})
