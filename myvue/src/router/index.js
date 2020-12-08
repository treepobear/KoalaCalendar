import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [ 
    
    {
      path:'/login',
      component:resolve =>require(['../pages/AdminLogin.vue'],resolve)
    },
    {
      path:'/',
      component:resolve =>require(['../components/DrawHome.vue'],resolve),
      children:[
        {
          path:"",
          component:resolve =>require(['../pages/HelloWorld.vue'],resolve)
        },
        {
          path:'flowchart',
          component:resolve =>require(['../pages/Flowchart.vue'],resolve)
        },
        {
          path:"myfiles",
          component:resolve =>require(['../pages/MyFIles.vue'],resolve)
        }
      ]
    },
    {
      path:'/',
      component:resolve =>require(['../components/Home.vue'],resolve),
      children:[
        {
          path:'backinfo',
          component:resolve =>require(['../pages/BackInfo.vue'],resolve)
        },
        {
          path:'consumers',
          component:resolve =>require(['../pages/Consumers.vue'],resolve)
        }
      ],
    },



    
  ]
})
