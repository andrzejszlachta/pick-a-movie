import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import AboutPage from '../pages/AboutPage.vue'
import MoviePicker from '../pages/MoviePicker.vue'

import LatestList from '../pages/lists/LatestList.vue'
import PopularList from '../pages/lists/PopularList.vue'
import TopList from '../pages/lists/TopList.vue'
import TrendingList from '../pages/lists/TrendingList.vue'
import UpcomingList from '../pages/lists/UpcomingList.vue'
import ViewDetails from '../pages/ViewDetails.vue'
import LoginPage from '../pages/LoginPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: HomePage
  },
  {
    path: '/about',
    name: 'about',
    component: AboutPage
  },
  {
    path: '/search',
    name: 'search',
    component: MoviePicker
  },
  {
    path: '/latest',
    name: 'latest',
    component: LatestList
  },
  {
    path: '/popular',
    name: 'popular',
    component: PopularList
  },
  {
    path: '/top',
    name: 'top',
    component: TopList
  },
  {
    path: '/trending',
    name: 'trending',
    component: TrendingList
  },
  {
    path: '/upcoming',
    name: 'upcoming',
    component: UpcomingList
  },
  {
    path: '/details/:id',
    name: 'details',
    component: ViewDetails,
    props: true
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../components/AboutPage.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
