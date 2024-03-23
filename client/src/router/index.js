import { createRouter,createWebHistory } from "vue-router";
import axios  from  '../api' 
const routes=[
    {
        path:'/login',
        name:'Login',
        component:()=>import('../views/Login.vue')
    },
    {
        path:'/register',
        name:'Register',
        component:()=>import('../views/register.vue')
    },
    {
        path:'/home',
        name:'Home',
        component:()=>import('../views/Home.vue')
    }
    
]

const router=createRouter({
    history:createWebHistory(),
    routes
})

//路由守卫
const whitePath= ['/login','/register']//白名单
router.beforeEach(async(to,from,next)=>{
    document.title = to.meta.title

    if (!whitePath.includes(to.path)) { // 想去的页面不在白名单中
      // 发送鉴权请求
      try{
        const res = await axios.get('/protected-route')
      }catch(err){
        next('/login') // 或者router.push('/login')
        return
      }
    }
    next()
  });
export default router;//抛出router 如果写routes会报错