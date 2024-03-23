const koa = require('koa');//引入koa
const app = new koa();//实例化koa
const cors = require('koa2-cors'); // 解决跨域问题
const bodyParser = require('koa-bodyparser');//调用bodyparser 让koa支持post请求


const users = require('./routes/user.js');//引入user.js 路由文件
// 主要逻辑

// const main = (ctx)=>{
  
// }

app.use(bodyParser());//使用bodyparser 必须在路由之前使用 
app.use(cors()) // 使用cors中间件 告诉浏览器允许跨域

app.use( users.routes(), users.allowedMethods())//使用user.js 路由文件




app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
})//监听3000端口
