<template>
  <div id="app">
    <Admin v-on:login_success="login" v-if="!admin"/>
    <!-- <div class="container" v-if="!admin">
      <div class="d-flex justify-content-center h-100">
        <div class="card">
          <div class="card-header">
            <h3>{{title}}</h3>
            <div class="d-flex justify-content-end social_icon">
              <span>
                <i class="fab fa-facebook-square"></i>
              </span>
              <span>
                <i class="fab fa-google-plus-square"></i>
              </span>
              <span>
                <i class="fab fa-twitter-square"></i>
              </span>
            </div>
          </div>
          <div class="card-body">
            <form @submit.prevent="submitinfo">
              <div class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fas fa-user"></i>
                  </span>
                </div>
                <input type="text" class="form-control" v-model="user" placeholder="用户名" />
              </div>
              <div class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fas fa-key"></i>
                  </span>
                </div>
                <input type="password" class="form-control" v-model="password" placeholder="密码" />
              </div>
              <div class="row align-items-center remember">
                <input type="checkbox" />Remember Me
              </div>
              <div class="form-group">
                <input type="submit" value="登录" class="btn float-right login_btn" />
              </div>
            </form>
          </div>
          <div class="card-footer">
            <div class="d-flex justify-content-center links">
              Don't have an account?
              <a href="#">Sign Up</a>
            </div>
            <div class="d-flex justify-content-center">
              <a href="#">Forgot your password?</a>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <HelloWorld msg="Welcome to Your Vue.js App" v-else />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
// import axios from "axios";
import Admin from "./components/Admin.vue";

export default {
  name: "App",
  components: {
    Admin,
    HelloWorld,
  },
  data() {
    return {
      admin: false,
      jwt: ""
    };
  },
  created() {

  },
  methods: {
    login(e){
      this.admin=true
      this.jwt = e
    }

  },
};

// import Vue from 'vue'
// var admin = new Vue({
//   data: {
//     message: 'Hello Vue!'
//   }
// }).$mount('#admin')

// let local_token=false

// // funtion() login
// if(!local_token){
//   //加载登录界面

//   //登录提交后如果收到token，再调用本函数
// }
// else{
//   //提交token
//   //申请个人信息
//   //申请帖子列表
//   //加载以上信息
// }

// // function publish
// {

// }

// // funtion() detail
// {

// }

// // function reply
// {

// }

// // function edit
// {

// }

// const axios = require('axios')

// axios.get('/api/v1/hello')
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
