import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false


// new Vue({
//   render: h => h(App),
// }).$mount('#app')

// const axios = require('axios')

// axios.get('api/v1/hello')
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });


new Vue({
  render: h => h(App),
}).$mount('#app')





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









