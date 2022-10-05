import { createRouter, createWebHistory } from 'vue-router'
import HomeComponent from '../components/Home.vue'
import LoginComponent from '../components/Login.vue'
import VideoComponent from '../components/Video.vue'
import ExploreComponent from '../components/Explore.vue'
import ContentComponent from '../components/Content.vue'
import SubscriptionComponent from '../components/Subscriptions.vue'
import LibraryComponent from '../components/Library.vue'
import HistoryComponent from '../components/History.vue'
import ShortsComponent from '../components/Shorts.vue'
import MusicComponent from '../components/Music.vue'
import SportsComponent from '../components/Sports.vue'
import GamingComponent from '../components/Gaming.vue'
import NewsComponent from '../components/News.vue'
import PageNotFound from "../components/PageNotFound.vue";
import YourVideos from "../components/YourVideos.vue"

// function isLoggedIn(){ 
//   return localStorage.getItem("user"); 
// }

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeComponent,
    children:[
      {
        path: '/',
        name: 'Content',
        component: ContentComponent
      },
      {
        path: 'watch/:id',
        name: 'Video',
        component: VideoComponent,
        props: true
      },
      {
        path: 'feed/explore',
        name: 'Explore',
        component: ExploreComponent
      },
      {
        path: 'feed/subscriptions',
        name: 'Subscriptions',
        component: SubscriptionComponent
      },
      {
        path: 'feed/library',
        name: 'Library',
        component: LibraryComponent
      },
      {
        path: 'feed/history',
        name: 'History',
        component: HistoryComponent
      },
      {
        path: 'feed/yourvideos',
        name: 'YourVideos',
        component: YourVideos
      },
      {
        path: 'shorts',
        name: 'Shorts',
        component: ShortsComponent
      },
      {
        path: 'feed/music',
        name: 'Music',
        component: MusicComponent
      },
      {
        path: 'feed/sports',
        name: 'Sports',
        component: SportsComponent
      },
      {
        path: 'feed/gaming',
        name: 'Gaming',
        component: GamingComponent
      },
      {
        path: 'feed/news',
        name: 'News',
        component: NewsComponent
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginComponent
  },
  {
    path: '/register',
    name: 'Register',
    component: LoginComponent
  },
  {
    path: '/:catchAll(.*)*',
    name: "PageNotFound",
    component: PageNotFound,
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active-link',
  linkExactActiveClass: 'exact-active-link'
})

// router.beforeEach((to, from, next) => {
//   if (to.name == 'YourVideos' && !isLoggedIn) next({ name: 'VideoSignin' })
//   else next()
// })

export default router
