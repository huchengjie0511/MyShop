<template>
    <h1 class="header">登录</h1>
    <div class="container">
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field v-model="state.username" name="用户名" label="用户名" placeholder="用户名"
                :rules="[{  required: true,message: '请填写用户名' }]" />
                <van-field v-model="state.password" type="password" name="密码" label="密码" placeholder="密码"
                    :rules="[{  required: true,message: '请填写密码' }]" />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                    登录
                </van-button>
            </div>
        </van-form>
        
        <p class="tip" @click="register">没有账号？点此注册</p>
    </div>
    
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from '../api';

const router=useRouter()

const state=reactive({
    username: '',
    password: ''
})
const uppdateToken=(token)=>{
    axios.updateToken(token)
}
const onSubmit = async() => {
    // 
    // checkTokenExpiration()
    //发送请求，传用户名和密码
   const res= await axios.post('/Login',{
        username:state.username,
        password:state.password
    })
    // 保存用户信息
    
    console.log(res, res.data);
    // localStorage.setItem('token',JSON.stringify(res.token))
   updateToken(res.token)
//     console.log('/////')
    router.push('/home')
    
};
const register=()=>{
    router.push('/register')
}
</script>

<style lang="less" scoped>
.container {
    position: absolute;
    width: 80%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.header{
    text-align: center;
    font-size: 2rem;
    margin-top: 10rem;
}
.tip{
    // margin-left: 5rem;
    text-align: center;
}
</style>