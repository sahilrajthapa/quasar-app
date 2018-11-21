import Home from 'pages/Home'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/users',
    name: 'User',
    component: () => import('pages/User.vue')
  },
  {
    path: '/post-form',
    name: 'PostForm',
    component: () => import('pages/PostForm.vue')
  },
  {
    path: '/record-list',
    name: 'RecordList',
    component: () => import('pages/RecordList.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('pages/Login.vue')
  },
  {
    path: '/questions',
    name: 'QuestionType',
    component: () => import('pages/QuestionType.vue')
  },
  {
    path: '/single-question',
    name: 'SingleQuestion',
    component: () => import('pages/SingleQuestion.vue')
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
