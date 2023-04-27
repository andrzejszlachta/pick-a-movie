import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import AboutPage from '../pages/AboutPage.vue'
import MoviePicker from '../pages/MoviePicker.vue'
import PopularList from '../pages/lists/PopularList.vue'
import TopList from '../pages/lists/TopList.vue'
import TrendingList from '../pages/lists/TrendingList.vue'
import UpcomingList from '../pages/lists/UpcomingList.vue'
import ViewDetails from '../pages/ViewDetails.vue'
import SimilarMovies from '../pages/SimilarMovies.vue'
import LoginPage from '../pages/LoginPage.vue'
import AccountDetails from '../pages/AccountDetails.vue'
import NotFound from '../pages/NotFound.vue'

import store from '../store/index.js'

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
    path: '/similar/:id',
    name: 'similar',
    component: SimilarMovies,
    props: true
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: { requiresUnauth: true },
  },
  {
    path: '/account',
    name: 'account',
    component: AccountDetails,
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(function(to, from, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/account')
  } else {
    next()
  }
})

export default router
