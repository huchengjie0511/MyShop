const Router = require('@koa/router');
const router = new Router();
const jwt = require('jsonwebtoken');

const { userServices, userLogin } = require('../controllers/mysqlControl.js');

const secret = 'jwt demo';

router.post('/Login', async (ctx) => {
    const { username, password } = ctx.request.body;//获取前端的账号密码，检验账号密码是否正确
    try {
        const result = await userLogin(username, password);
        if (result.length) {//存在的情况
            const username = result[0].username;
            const token = jwt.sign({
                username: username,
                exp: Math.floor(Date.now() / 1000) + 60 * 60
            }, secret);
            // console.log(token);
            let data = {
                id: result[0].id,
                nickname: result[0].nickname,
                username: result[0].username,
                token: token, // 返回token
            }
            ctx.body = {
                code: '8000',
                user: username,
                message: '登录成功',
                token
            };
        } else {
            ctx.body = {
                code: '8004',
                data: 'error',
                message: '账号或者密码不正确'
            };
        }
    } catch (err) {
        ctx.body = {
            code: '8005',
            data: err,
            message: '服务器异常'
        };
    }
});

router.get('/protected-route', (ctx) => {
    // 从前端请求头中获取Token
    console.log(ctx.header.authorization);
    const tokenWithQuotes  = ctx.header.authorization?.replace('Bearer ', '');
    const token = tokenWithQuotes?.slice(1, tokenWithQuotes.length - 1);
    console.log(token);
    try {
      // 验证Token
      const decoded = jwt.verify(token,secret);
      console.log('验证的token'+decoded+'///////////////////');
      // Token有效，返回受保护的资源
      ctx.body = {
        code: "8000",
        data: "success",
        msg: "Access",
      };
    } catch (error) {
      // Token无效或过期
      console.error("JWT verification error:", error);
      ctx.body = {
        code: "8005",
        data: error,
        msg: "token无效或过期请重新登录",
      };
    }
  });

module.exports = router;
