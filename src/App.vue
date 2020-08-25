<template>
  <div id="app">
    <Admin v-on:login_success="login" v-if="!admin" />
    <Page
      v-on:logout="logout"
      v-bind:nickname="nickname"
      v-bind:username="username"
      v-bind:token="jwt"
      v-bind:admin_id="admin_id"
      v-else
    />
  </div>
</template>

<script>
import Page from "./components/Page.vue";
import Admin from "./components/Admin.vue";

export default {
  name: "App",
  components: {
    Admin,
    Page,
  },
  data() {
    return {
      admin: false,
      jwt: "",
      username: "",
      nickname: "",
      admin_id:-1,
    };
  },
  created() {},
  methods: {
    login(e) {
      console.log("login -> e", e)
      this.admin = true;
      console.log("login -> this.admin", this.admin)
      this.jwt = e["jwt"];
      this.username = e["username"];
      this.nickname = e["nickname"];
      this.admin_id=e["id"];
    },

    logout() {
      var date = new Date();
      date.setTime(date.getTime() - 10000);
      document.cookie = "jwt=v; expires=" + date.toGMTString();
      this.jwt = "";
      this.admin = false;
      /* eslint-disable */
      toastr.warning("再见，" + this.nickname);
      /* eslint-enable */
    },
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
