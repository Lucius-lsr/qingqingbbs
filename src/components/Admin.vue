<template>
  <div class="container">
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
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Admin",
  data() {
    return {
      user: "",
      password: "",
      jwt: "",
      nickname: "",
    };
  },
  created() {
    let acookie = document.cookie.split(";");
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
        console.log(res);
        /* eslint-disable */
        toastr.success("快捷登录成功");
        /* eslint-enable */
        this.login();
      })
      .catch(() => {
        /* eslint-disable */
        toastr.warning("登录信息已失效，请重新登录");
        /* eslint-enable */
      });
  },
  methods: {
    login() {
      this.$emit("login_success", this.jwt);
    },
    submitinfo() {
      let data = { username: this.user, password: this.password };
      axios
        .patch("/api/v1/login", data)
        .then((res) => {
          this.jwt = res.data["jwt"];
          this.nickname = res.data["nickname"];
          document.cookie = `jwt=${this.jwt};expires=Sun, 31 Dec 2099 12:00:00 UTC`;
          /* eslint-disable */
          toastr.success("登录成功");
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
  color: #42b983;
}
</style>
