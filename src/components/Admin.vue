<template>
  <div class="container">
    <div class="d-flex justify-content-center h-100">
      <div class="card" style="position: absolute; left: 0; right:0;top:0;bottom:0;margin:auto;">
        <div class="card-header">
          <h3>Welcome!</h3>
          <div class="d-flex justify-content-end social_icon">
            <!-- <span>
              <i class="fab fa-html5"></i>
            </span>
            <span>
              <i class="fab fa-chrome"></i>
            </span>-->
            <a href="https://twitter.com/Lucius_lsr" class="fa fa-twitter-square" target="_blank"></a>
            <a
              href="https://www.facebook.com/profile.php?id=100033049942286"
              class="fa fa-facebook-square"
              target="_blank"
            ></a>
            <a
              href="https://github.com/Lucius-lsr/qingqingbbs"
              class="fab fa-github"
              target="_blank"
            ></a>
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
              <input type="text" class="form-control" v-model="username" placeholder="用户名" />
            </div>
            <div class="input-group form-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fas fa-key"></i>
                </span>
              </div>
              <input type="password" class="form-control" v-model="password" placeholder="密码" />
            </div>
            <!-- <div class="row align-items-center remember">
              <input type="checkbox" />Remember Me
            </div>-->
            <div class="form-group">
              <input type="submit" value="登录" class="btn float-right login_btn" style="color:white" />
            </div>
          </form>
        </div>
        <div class="card-footer">
          <div class="d-flex justify-content-center">
            <p style=" color:white">欢迎来到清软论坛！</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Admin",
  data() {
    return {
      id: -1,
      username: "",
      password: "",
      jwt: "",
      nickname: "",
      created: "",
    };
  },
  created() {
    let acookie = document.cookie.split("; ");

    let jwt = null;
    for (var i = 0; i < acookie.length; i++) {
      var arr = acookie[i].split("=");
      if (arr[0] === "jwt") {
        jwt = arr[1];
      }
    }

    axios.defaults.headers.common["Authorization"] = jwt;
    axios
      .get("/api/v1/user")
      .then((res) => {
        this.jwt = jwt;
        this.username = res.data["username"];
        this.nickname = res.data["nickname"];
        this.id = res.data["id"];
        /* eslint-disable */
        toastr.success("自动登录成功，欢迎您，" + this.nickname);
        /* eslint-enable */
        this.login();
      })
      .catch(() => {
        /* eslint-disable */
        if (this.jwt !== "") {
          toastr.warning("登录信息已失效，请重新登录");
        }
        /* eslint-enable */
      });
  },
  methods: {
    login() {
      this.$emit("login_success", {
        jwt: this.jwt,
        nickname: this.nickname,
        username: this.username,
        id: this.id,
      });
    },
    submitinfo() {
      let data = { username: this.username, password: this.password };
      axios
        .patch("/api/v1/login", data)
        .then((res) => {
          this.jwt = res.data["jwt"];
          this.nickname = res.data["nickname"];
          document.cookie = `jwt=${this.jwt};expires=Sun, 31 Dec 2099 12:00:00 UTC`;
          /* eslint-disable */
          toastr.success("登录成功，欢迎您，" + this.nickname);
          /* eslint-enable */
          this.login();
        })
        .catch(() => {
          /* eslint-disable */
          toastr.error("用户名或密码错误！");
          /* eslint-enable */
        });

      return false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #009688;
  font-size: 60px;
  text-decoration: none;
  margin-left: 10px;
}

body {
  background-color: aqua;
}
</style>
