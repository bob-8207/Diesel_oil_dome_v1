<template>
    <div>
        <h1>登录</h1>
        <mt-field label="用户名" placeholder="请输入用户名" type="text" v-model="login_id"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="login_password"></mt-field>
        <mt-field label=""></mt-field>
        <mt-button type="primary" @click="login">登录</mt-button><br/>
        <br/>
        <span v-on:click="go_register">没有账号？马上注册！</span>
    </div>
</template>

<style>

</style>

<script>

import {setCookie,getCookie} from '../../src/assets/js/cookie.js'
import md5 from 'js-md5'

export default{

    data(){
            return{
                showLogin: true,
                showRegister: false,
                showTishi: false,
                tishi: '',
                "login_id": '',
                "login_password": '',
                md5_password:md5(login_password),
                newUsername: '',
                newPassword: '',
                total : ''
            }
    },

    mounted(){
  /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
        if(getCookie('username')){
            this.$router.push('/home')
        }
    },

    methods:{
        login(){
            if(this.login_id == "" || this.login_password == "" ){
                alert("请完善用户名、密码和相关信息");
            }else{
                /*接口请求*/
                
                let url = 'http://54.222.170.110:5000/rs/check_user_infor/'+'_id/'+this.login_id+'/password/'+ md5(this.login_password);
                console.log("the valule of data", url);
                var response_infor = "begining of response_infor";
                //this.$http.get('http://3.210.79.252:5000/rs/check_user_infor/', data, {emulateJSON:true}).then(function(response_infor){
                //console.log(response_infor);
                this.$http.get(url).then((response) =>{console.log("############",response.data.total);
                
                    //接口的传值是(-1,该用户不存在),(0,密码错误)，同时还会检测管理员账号的值
                    if(response.data.total == 0){
                        alert("密码输入错误或用户不存在")
                        this.tishi = "密码输入错误或用户不存在"
                        this.showTishi = true
                    }else{
                        this.tishi = "登录成功"
                        this.showTishi = true
                        setCookie('username',this.login_id,1000*60)
                        setTimeout(function(){
                            this.$router.push('/home')
                        }.bind(this),1000)
                    }
                });  
            }  
        },
        go_register(){
            this.$router.push('/rg');
        }
    }
}

</script>