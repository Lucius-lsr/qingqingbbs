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
      this.admin = true;
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
