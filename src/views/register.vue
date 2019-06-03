<template>
  <div>
    <h1>用户注册</h1>
    <mt-field label="用户名" placeholder="请输入用户名" v-model="_id"></mt-field>
    <mt-field label="真实姓名" placeholder="请输入真实姓名" v-model="chinese_name"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
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

    <mt-field label="区域" placeholder v-model="province">
      <mt-button type="primary" @click="select">选择区域</mt-button>
    </mt-field>
    <mt-field label="公司名称" placeholder v-model="city"></mt-field>
    <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>

    
    <!-- <p :value="address">{{address}}</p>-->
    <yz-select
      v-if="show"
      :ref="show"
      @changeValue="isShow"
      :province="province"
      :city="city"
      :county="county"
    ></yz-select>

    
    <mt-button type="primary" @click="register">提交</mt-button>
  </div>
</template>
<script>
import select from '@/components/select'
import md5 from 'js-md5'

export default {
  name: 'HelloWorld',
  data () {
    return {
      show: false,
      "address": '',
      "province": '东城区',
      "city": '城管委',
      "county": '东城区',
      "_id": '',
      "password": '',
      "cellphone": '',
      "personal_id": '',
      "checker_role": 1,
      "chinese_name": '',
      "pm_role": 0,
      "registration_time":'',
      role: ''
      
    }
  },
  components:{
    'yz-select': select
  },
  methods: {

    
    getFormatDate() {
      var date = new Date();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
          month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
      }
      var currentDate = date.getFullYear() + "-" + month + "-" + strDate
              + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      return currentDate;

    },


    select(){
            this.show = true;
    },
    isShow(msg){
            console.log(msg);
            this.show = msg.show;
            this.address = msg.result;
            this.province = msg.province;
            this.city = msg.city;
            this.county = msg.county;
    },
    register(){
    
      if(this.chinese_name == "" || this.password == ""){
        alert("请完善用户名、密码和相关信息")
      } else {
        var data = ""
        data = {
          "_id": this._id, 
          "password": md5(this.password), 
          "cellphone": this.cellphone, 
          "checker_role": this.checker_role, 
          "chinese_name": this.chinese_name, 
          "company_name": this.city, 
          "personal_id": this.personal_id, 
          "pm_role":this.pm_role, 
          //"registration_time": new Date(),
          "registration_time": this.getFormatDate(this.registration_time)
        }
        
        var formData = JSON.stringify(data);
        console.log("the valule of data", data);
        var response_infor = "begining of response_infor";
        this.$http.post('http://3.210.79.252:5000/rs/check_user_infor/', formData, {emulateJSON:true}).then(function(response_infor){
            console.log("111111111111111111",response_infor.ok) 
          if(response_infor.data.info == "create success."){
            alert("注册成功！")
            this.$router.push('/')
          }else{
            alert("服务器繁忙，请稍后尝试！")
          }
          });
          console.log("the successful written of data is",response_infor) 
        
      }
    }
  }
}




</script>

<style>
</style>