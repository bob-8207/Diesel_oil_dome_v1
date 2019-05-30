<template>
    <div>
    <h1>用户注册</h1>
    <mt-field label="用户名" placeholder="请输入用户名" v-model="personal_id"></mt-field>
    <mt-field label="姓名" placeholder="请输入姓名" v-model="chinese_name"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
    <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="cellphone"></mt-field>
    <mt-field label="公司名称" placeholder="" v-model="cp"></mt-field>
    <mt-field label="区域" placeholder="" v-model="qy"></mt-field>
    <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    <mt-button type="primary" @click="select">选择省市区</mt-button>
    <p :value="address">{{address}}</p>
    <yz-select v-if="show" :ref="show" @changeValue='isShow' :province='province' :city='city' :county='county'></yz-select>
  </div>
</template>

<style>

</style>

<script>
import select from '@/components/select'
export default {
  name: 'HelloWorld',
  data () {
    return {
      show: false,
      address: '',
      province: '北京市',
      city: '北京市',
      county: '东城区'
    }
  },
  components:{
    'yz-select': select
  },
  methods: {
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
        }
  }
}
</script>

<style>
</style>