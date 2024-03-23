import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { showFailToast } from 'vant';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// 请求拦截
axios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers["Authorization"] = "Bearer " + token;
    }
    return config
}, error => {
    return Promise.reject(error);
})

// 响应拦截
axios.interceptors.response.use(
    response => {
        if (response.status !== 200) { // 程序错误
            showFailToast('服务端异常，请稍后重试');
        } else {
            if (response.data.code !== "8000") { // 逻辑错误
                showFailToast(response.data.msg);
                return Promise.reject(response.data);
            } else {
                return response.data;
            }
        }

    }
);

// 检查Token是否过期
function checkTokenExpiration() {
    const token = localStorage.getItem('token');
    if (!token) {
        // Token不存在，跳转到登录页面
        redirectToLogin();
        return;
    }

    const decodedToken = jwt_decode(token);//解码token
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
        // Token已过期，跳转到登录页面
        redirectToLogin();
    }
}

// 跳转到登录页面
function redirectToLogin() {
    // 重定向到登录页面
    router.push('/login');
}

// 更新Token
function updateToken(newToken) {
    localStorage.setItem('token', newToken);
}

// 在请求前检查Token是否过期
axios.interceptors.request.use(
    (config) => {
        checkTokenExpiration();
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 在响应中处理Token过期
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token过期，跳转到登录页面
            redirectToLogin();
        }
        return Promise.reject(error);
    }
);

export { axios, checkTokenExpiration, redirectToLogin, updateToken };
