<template>
  <div>
    <h1>更新注册信息</h1>
    <mt-field label="用户名" v-model="select_id" readonly="true">
      <mt-button type="primary" @click="select_infor">查询</mt-button>
    </mt-field>
    <mt-field label="真实姓名" placeholder="请输入真实姓名" v-model="chinese_name"></mt-field>
    <!--
    <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
    -->
    <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="cellphone"></mt-field>
    <mt-field label="身份证号" placeholder="请输入身份证号" type="number" v-model="personal_id"></mt-field>
    <mt-field label="角色类型" placeholder="管理员">
    <mt-cell title="">
      <mt-switch v-model="pm_role"></mt-switch>
    </mt-cell>
    </mt-field>
    <mt-field label="角色类型" placeholder="巡查员">
    <mt-cell title="">
      <mt-switch v-model="checker_role"></mt-switch>
    </mt-cell>
    </mt-field>
    <mt-field label="注册日期"><p align="left">{{registration_time}}</p></mt-field>
    <mt-button type="primary" @click="up_data">提交</mt-button>
  </div>
</template>
<script>
import { setCookie,getCookie,delCookie } from '../../src/assets/js/cookie.js'
import select from '@/components/select'
import md5 from 'js-md5'

export default {
  name: 'HelloWorld',
  data () {
    return {
      province: '',
      city: '',
      county: '',
      _id: '',
      password: '',
      cellphone: '',
      personal_id: '',
      checker_role: 1,
      chinese_name: '',
      pm_role: 0,
      select_id: '',
      registration_time: '' 
    }
  },
  components:{

  },

  mounted(){
    /*页面挂载获取保存的cookie值，渲染到页面上*/
    let uname = getCookie('username')
    this.select_id = uname
    
    //this.select_id = uname
            /*如果cookie不存在，则跳转到登录页*/
      if(uname == ""){
                this.$router.push('/')
            }
      },

  methods: {

    select_infor(){
      if(this.select_id == ""){
        alert("请完善用户名相关信息");
      }else{
        /*接口请求*/     
        let url = 'http://54.222.170.110:5000/rs/check_user_infor/'+this.select_id;
        console.log("the geturl of data is ", url);
                //var response_infor = "begining of response_infor";
  
        this.$http.get(url).then((response) =>{console.log("############",response.bodyText);
          if(response.data.total == 0){
            alert("用户信息不存在")
          }else{
            var obj = JSON.parse(response.bodyText);
            this.chinese_name = obj.rows[0].chinese_name;
            this.cellphone = obj.rows[0].cellphone;
            this.personal_id = obj.rows[0].personal_id;
            this.pm_role = obj.rows[0].pm_role;
            this.checker_role = obj.rows[0].checker_role;
            this.registration_time = obj.rows[0].registration_time;
          }
        });  
      }  
    },

    up_data(){
    
      if(this.select_id == ""){
        alert("请完善用户相关信息")
      } else {
        var data = ""
        data = {
          //"_id": this._id, 
          //"password": md5(this.password), 
          "cellphone": this.cellphone, 
          "checker_role": this.checker_role, 
          "chinese_name": this.chinese_name, 
          //"company_name": this.city, 
          "personal_id": this.personal_id, 
          "pm_role":this.pm_role, 
          //"registration_time": new Date(),
          //"registration_time": this.getFormatDate(this.registration_time)
        }
        
        var formData = JSON.stringify(data);
        console.log("the valule of data", data);
        var response_infor = "begining of response_infor";
        let upurl = 'http://54.222.170.110:5000/rs/check_user_infor/'+this.select_id;
        this.$http.put(upurl, formData, {emulateJSON:true}).then(function(response_infor){
            console.log("the valule of updata is ",response_infor) 
          if(response_infor.data.info == "update success."){
            alert("更新成功！")
            this.$router.push('/home')
          }else{
            alert("服务器繁忙，请稍后尝试！")
          }
          });
          //console.log("the successful written of data is",response_infor) 
        
      }
    }

  }
}




</script>

<style>
</style>