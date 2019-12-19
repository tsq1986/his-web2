import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import UserManage from "../components/system/UserManage";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name:'login',
    component: Login,
    hidden:true
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    hidden: true
  },
  {
    path:'/home',
    name:'home',
    component:Home,
    meta:{
      title:'挂号收费'
    },
    children:[{
      path:'/Register',
      name:'register',
      meta:{
        title:'现场挂号'
      }
    }]
  },
  {
    path:'/home',
    name:'home',
    component:Home,
    meta:{
      title:'系统信息'
    },
    children:[{
       path:'/Content',
       name:'content',
       meta:{
         title:'常数类别管理'
       }
    },
      {
        path:'/User',
        name:'UserManage',
        component:UserManage,
        meta:{
          title:'用户管理'
        }
      }
    ]
  }


]

const router = new VueRouter({
  routes
})

export default router
