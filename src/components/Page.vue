<template>
  <!-- <body class="app sidebar-mini"> -->

  <!-- Sidebar menu-->
  <div>
    <div class="app-sidebar__overlay" data-toggle="sidebar"></div>
    <aside class="app-sidebar">
      <div class="app-sidebar__user" style="margin-left: 2em;">
        <img
          class="app-sidebar__user-avatar"
          src="../../src/assets/img_rc/5.png"
          width="60em"
          alt="User Image"
        />
        <div>
          <p class="app-sidebar__user-name">{{nickname}}</p>
          <p class="app-sidebar__user-designation">{{username}}</p>
        </div>
      </div>
      <ul class="app-menu">
        <li>
          <a
            class="app-menu__item"
            href="dashboard.html"
            style="width:15em"
            data-toggle="modal"
            data-target="#userInfoModal"
          >
            <i class="app-menu__icon fa fa-user"></i>
            <span class="app-menu__label">个人信息</span>
          </a>
          <a
            class="app-menu__item"
            href="dashboard.html"
            style="width:15em"
            data-toggle="modal"
            data-target="#publishModal"
          >
            <i class="app-menu__icon fa fa-dashboard"></i>
            <span class="app-menu__label">发布帖子</span>
          </a>

          <a class="app-menu__item" href="dashboard.html" style="width:15em">
            <i class="app-menu__icon fa fa-bell-o" ></i>
            <span class="app-menu__label">我的帖子</span>
          </a>
        </li>
      </ul>
    </aside>

    <!-- main content-->
    <div class="app-content">
      <div class="row user" style="margin-top:-3em">
        <div class="col-md-9">
          <div class="tab-content">
            <div class="tab-pane active" id="user-timeline">
              <nav
                aria-label="Page navigation example"
                style="margin-bottom: 5px;display: -webkit-flex;dispaly:flex-inline;justify-content:space-between"
              >
                <ul class="pagination">
                  <li class="page-item">
                    <a class="page-link" @click="change_page(page-1)" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li class="page-item">
                    <a
                      class="page-link"
                      @click="change_page(page_button1)"
                      style="color:green"
                      v-if="page===page_button1"
                    >{{page_button1}}</a>
                    <a class="page-link" @click="change_page(page_button1)" v-else>{{page_button1}}</a>
                  </li>
                  <li class="page-item">
                    <a
                      class="page-link"
                      @click="change_page(page_button2)"
                      style="color:green"
                      v-if="page===page_button2"
                    >{{page_button2}}</a>
                    <a class="page-link" @click="change_page(page_button2)" v-else>{{page_button2}}</a>
                  </li>
                  <li class="page-item">
                    <a
                      class="page-link"
                      @click="change_page(page_button3)"
                      style="color:green"
                      v-if="page===page_button3"
                    >{{page_button3}}</a>
                    <a class="page-link" @click="change_page(page_button3)" v-else>{{page_button3}}</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" @click="change_page(page+1)" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
                <div class="btn-group" role="group" style="height:40px">
                  <button
                    id="btnGroupDrop1"
                    type="button"
                    class="btn btn-secondary dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >排序方式</button>
                  <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                    <a
                      class="dropdown-item"
                      @click="()=>{sort='modify';get_message()}"
                      style="color:green"
                      v-if="sort==='modify'"
                    >按修改时间</a>
                    <a class="dropdown-item" @click="()=>{sort='modify';get_message()}" v-else>修改时间</a>
                    <a
                      class="dropdown-item"
                      @click="()=>{sort='reply';get_message()}"
                      style="color:green"
                      v-if="sort==='reply'"
                    >按修改/最新回复时间</a>
                    <a
                      class="dropdown-item"
                      @click="()=>{sort='reply';get_message()}"
                      v-else
                    >修改/回复时间</a>
                  </div>
                </div>
              </nav>

              <Message
                v-for="message in displayed_message"
                :key="message.updated"
                v-bind:nickname="message.nickname"
                v-bind:title="message.title"
                v-bind:content="message.content"
                v-bind:time="message.updated"
                v-bind:lastRepliedNickname="message.lastRepliedNickname"
                v-bind:lastRepliedTime="message.lastRepliedTime"
                v-bind:userId="message.userId"
                v-bind:id="message.id"
                v-bind:token="token"
                v-bind:focus="focus"
                v-bind:admin_id="admin_id"
                v-on:change_focus="change_focus"
              ></Message>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- userInfo Modal -->
    <div
      class="modal fade"
      id="userInfoModal"
      tabindex="-1"
      aria-labelledby="userInfoModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="userInfoModalLabel">个人信息</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <div class="card" style="width: 18em;">
              <img src="../../src/assets/img_rc/5.png" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title" style="color:white">昵称：{{nickname}}</h5>
                <p class="card-text" style="color:white">用户名：{{username}}</p>
                <a
                  @click="logout"
                  class="btn btn-danger"
                  style="color:white"
                  data-dismiss="modal"
                >退出登录</a>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
          </div>
        </div>
      </div>
    </div>

    <!-- publish modal -->
    <div
      class="modal fade"
      id="publishModal"
      tabindex="-1"
      aria-labelledby="publishModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="publishModalLabel">个人信息</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <textarea rows="1" cols="50" placeholder="请输入标题" v-model="title" style="resize: none"></textarea>
            <textarea rows="15" cols="50" placeholder="请输入您要发布的内容" v-model="publish" style="resize: none"></textarea>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
            <button
              type="button"
              class="btn btn-primary"
              data-dismiss="modal"
              @click="publish_message"
            >发布</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Message from "./Message";

export default {
  name: "Page",
  components: {
    Message,
  },
  props: {
    nickname: String,
    username: String,
    token: String,
    admin_id:Number,
  },
  data() {
    return {
      displayed_message: [],
      page: 1,
      sort: "modify",
      publish: "",
      title: "",
      focus: -1,
    };
  },
  methods: {
    get_message() {
      axios.defaults.headers.common["Authorization"] = this.token;
      axios
        .get("/api/v1/post", {
          params: { page: this.page, orderByReply: this.sort === "reply" },
        })
        .then((res) => {
          this.displayed_message = res.data["posts"];
        })
        .catch(() => {
          /* eslint-disable */
          toastr.warning("服务器有问题");
          /* eslint-enable */
        });
    },
    logout() {
      this.$emit("logout");
    },
    change_page(p) {
      if (p > 0) {
        if (p > this.page) {
          if (this.displayed_message.length >= 10) {
            this.page = p;
            this.get_message();
          }
        } else {
          this.page = p;
          this.get_message();
        }
      }
    },
    change_focus(e){
      this.focus=e
      console.log("change_focus -> this.focus", this.focus)
    },
    publish_message() {
      if (this.title === "" || this.publish === "") {
        /* eslint-disable */
        toastr.warning("标题内容均不能为空");
        /* eslint-enable */
        return false;
      }

      let data = { title: this.title, content: this.publish };
      axios.defaults.headers.common["Authorization"] = this.token;
      axios
        .post("/api/v1/post", data)
        .then((res) => {
          if (res.data["message"] === "ok") {
            /* eslint-disable */
            toastr.success("发布成功");
            /* eslint-enable */
          }
        })
        .catch(() => {
          /* eslint-disable */
          toastr.error("发布失败");
          /* eslint-enable */
        });
    },
  },
  computed: {
    page_button1() {
      return Math.max(this.page - 1, 1);
    },
    page_button2() {
      return Math.max(this.page - 1, 1) + 1;
    },
    page_button3() {
      return Math.max(this.page - 1, 1) + 2;
    },
  },
  created() {
    this.get_message();
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
