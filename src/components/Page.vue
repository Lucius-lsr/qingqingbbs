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
            href="#"
            style="width:15em"
            data-toggle="modal"
            data-target="#userInfoModal"
          >
            <i class="app-menu__icon fa fa-user"></i>
            <span class="app-menu__label">个人信息</span>
          </a>
          <a
            class="app-menu__item"
            href="#"
            style="width:15em"
            data-toggle="modal"
            data-target="#publishModal"
          >
            <i class="app-menu__icon fa fa-pencil-square-o"></i>
            <span class="app-menu__label">发布帖子</span>
          </a>

          <a
            class="app-menu__item"
            href="#"
            style="width:15em"
            @click="()=>{message_of_id=-1;page=1;show_umb=false;get_message()}"
          >
            <i class="app-menu__icon fa fa-list"></i>
            <span class="app-menu__label">全部帖子</span>
          </a>

          <a
            class="app-menu__item"
            href="#"
            style="width:15em"
            @click="()=>{message_of_id=admin_id;page=1;show_umb=false;get_message()}"
          >
            <i class="app-menu__icon fa fa-bell-o"></i>
            <span class="app-menu__label">我的帖子</span>
          </a>

          <a class="app-menu__item" href="#" style="width:15em" @click="show_star">
            <i class="app-menu__icon fa fa-star"></i>
            <span class="app-menu__label">我的收藏</span>
          </a>

          <a class="app-menu__item" href="#" style="width:15em" @click="show_history">
            <i class="app-menu__icon fa fa-history"></i>
            <span class="app-menu__label">浏览记录</span>
          </a>

          <a class="app-menu__item" href="#" style="width:15em" @click="show_umbrella">
            <i class="app-menu__icon fa fa-umbrella"></i>
            <span class="app-menu__label">屏蔽名单</span>
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
                aria-label="Page navigation"
                style="display: -webkit-flex;dispaly:flex-inline;justify-content:space-between"
              >
                <ul class="pagination">
                  <div>
                    <li class="page-item">
                      <a
                        class="page-link"
                        @click="change_page(Math.max(1,page-10))"
                        aria-label="Previous"
                      >
                        <span aria-hidden="true">&laquo;&laquo;</span>
                      </a>
                    </li>
                  </div>

                  <div>
                    <li class="page-item">
                      <a class="page-link" @click="change_page(page-1)" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                      </a>
                    </li>
                  </div>

                  <div v-for="index in 10" :key="index">
                    <li class="page-item active" v-if="page===page_button1+index-1">
                      <a
                        class="page-link"
                        @click="change_page(page_button1+index-1)"
                      >{{page_button1+index-1}}</a>
                    </li>
                    <li v-else>
                      <a
                        class="page-link"
                        @click="change_page(page_button1+index-1)"
                      >{{page_button1+index-1}}</a>
                    </li>
                  </div>

                  <div>
                    <li class="page-item">
                      <a class="page-link" @click="change_page(page+1)" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                      </a>
                    </li>
                  </div>
                  <div>
                    <li class="page-item">
                      <a class="page-link" @click="change_page(page+10)" aria-label="Next">
                        <span aria-hidden="true">&raquo;&raquo;</span>
                      </a>
                    </li>
                  </div>
                </ul>
                <div style="margin-top:-10px;min-width:350px">
                  <li class="app-search">
                    <div>
                      <input
                        class="app-search__input"
                        type="search"
                        placeholder="搜索昵称"
                        v-model="search_target"
                      />
                      <button
                        class="app-search__button dropdown-toggle"
                        id="searchButton"
                        type="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        @click="load_search"
                      >
                        <i class="fa fa-search"></i>
                      </button>

                      <div class="dropdown-menu dropdown-menu-right" aria-labelledby="searchButton">
                        <a
                          v-for="name in search_results"
                          :key="name[0]"
                          href="#"
                          class="dropdown-item"
                          @click="message_of_id=name[0];page=1;get_message()"
                        >{{name[1]}}</a>
                      </div>
                    </div>
                  </li>

                  <div class="btn-group" role="group" style="height:40px">
                    <button
                      id="sortDrop"
                      type="button"
                      class="btn btn-primary dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span v-if="sort==='modify'">最新修改</span>
                      <span v-else>最新回复</span>
                    </button>
                    <div class="dropdown-menu dropdown-menu" aria-labelledby="sortDrop">
                      <a
                        href="#"
                        class="dropdown-item"
                        @click="()=>{sort='modify';get_message()}"
                      >最新修改</a>
                      <a
                        href="#"
                        class="dropdown-item"
                        @click="()=>{sort='reply';get_message()}"
                      >最新回复</a>
                    </div>
                  </div>
                </div>
              </nav>

              <Message
                v-for="message in displayed_message_umbrella"
                :key="message.id"
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
                v-on="{change_focus:change_focus, user_ref:(e)=>{message_of_id=e;page=1;get_message()}}"
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
            <div class="card" style="width: 20em;margin:0 auto; height:400px">
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
        <div class="modal-content" style="width:800px">
          <div class="modal-header">
            <h5 class="modal-title" id="publishModalLabel">发布帖子</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <div style="display: -webkit-flex;dispaly:flex-inline;">
              <div>
                <textarea
                  rows="1"
                  cols="50"
                  placeholder="请输入标题"
                  v-model="title"
                  style="resize: none"
                ></textarea>
                <textarea
                  rows="15"
                  cols="50"
                  placeholder="请输入您要发布的内容"
                  v-model="publish"
                  style="resize: none"
                ></textarea>
              </div>
              <div style="overflow:auto;background-color:#eee; flex-shrink:0;margin-left:10px">
                <div v-html="diy_content(publish)" style="width:400px; height:350px; overflow:auto"></div>
              </div>
            </div>
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
import showdown from "showdown";
import showdownKatex from "showdown-katex";
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
    admin_id: Number,
  },
  data() {
    return {
      displayed_message: [],
      page: 1,
      sort: "modify",
      publish: "",
      title: "",
      focus: -1,
      message_of_id: -1,
      show_umb: false,
      search_target: "",
      search_results: [],
    };
  },
  methods: {
    get_message() {
      axios.defaults.headers.common["Authorization"] = this.token;
      axios
        .get("/api/v1/post", {
          params: {
            page: this.page,
            orderByReply: this.sort === "reply",
            userId: ((id) => {
              if (id === -1) {
                return null;
              } else {
                return id;
              }
            })(this.message_of_id),
          },
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
    change_focus(e) {
      this.focus = e;
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
    show_star() {
      let acookie = document.cookie.split("; ");
      let all_stars = "";
      for (var i = 0; i < acookie.length; i++) {
        var arr = acookie[i].split("=");
        if (arr[0] === "star") {
          all_stars = arr[1];
        }
      }

      all_stars = all_stars.split(",");

      let star_posts = [];

      axios.defaults.headers.common["Authorization"] = this.token;
      axios
        .get("/api/v1/post", {
          params: {
            size: 1000,
          },
        })
        .then((res) => {
          for (let _star of all_stars) {
            for (let mes of res.data["posts"]) {
              if (mes.id == _star) {
                star_posts.push(mes);
              }
            }
          }
          this.show_umb = false;
          this.displayed_message = star_posts;
        })
        .catch(() => {
          /* eslint-disable */
          toastr.warning("服务器有问题");
          /* eslint-enable */
        });
    },
    show_history() {
      let acookie = document.cookie.split("; ");
      let all_historys = "";
      for (var i = 0; i < acookie.length; i++) {
        var arr = acookie[i].split("=");
        if (arr[0] === "history") {
          all_historys = arr[1];
        }
      }

      all_historys = all_historys.split(",");

      let history_posts = [];

      axios.defaults.headers.common["Authorization"] = this.token;
      axios
        .get("/api/v1/post", {
          params: {
            size: 1000,
          },
        })
        .then((res) => {
          for (let _history of all_historys) {
            for (let mes of res.data["posts"]) {
              if (mes.id == _history) {
                history_posts.push(mes);
              }
            }
          }
          this.show_umb = false;
          this.displayed_message = history_posts;
        })
        .catch(() => {
          /* eslint-disable */
          toastr.warning("服务器有问题");
          /* eslint-enable */
        });
    },
    show_umbrella() {
      let acookie = document.cookie.split("; ");
      let all_umbrellas = "";
      for (var i = 0; i < acookie.length; i++) {
        var arr = acookie[i].split("=");
        if (arr[0] === "umbrella") {
          all_umbrellas = arr[1];
        }
      }

      all_umbrellas = all_umbrellas.split(",");

      let umbrella_posts = [];

      axios.defaults.headers.common["Authorization"] = this.token;
      axios
        .get("/api/v1/post", {
          params: {
            size: 1000,
          },
        })
        .then((res) => {
          for (let _umbrella of all_umbrellas) {
            for (let mes of res.data["posts"]) {
              if (mes.id == _umbrella) {
                umbrella_posts.push(mes);
              }
            }
          }
          this.show_umb = true;
          this.displayed_message = umbrella_posts;
        })
        .catch(() => {
          /* eslint-disable */
          toastr.warning("服务器有问题");
          /* eslint-enable */
        });
    },
    load_search() {
      let name_key = this.search_target;
      let results = [];

      for (let id = 1; id < 105; id++) {
        axios
          .get("/api/v1/user/" + id)
          .then((res) => {
            if (res.data["nickname"].indexOf(name_key) !== -1 && name_key) {
              results.push([id, res.data["nickname"]]);
              // console.log(res.data["nickname"])
            }
          })
          .catch((e) => {
            console.log("load_search -> e", e);
            this.search_results = results;
          });
      }
    },
    diy_content(raw) {
      // 先找自定义表情
      function code2emoji(code) {
        // the code should within the range of [0,400]
        if (code < 317) {
          code = 56320 + code;
        } else {
          code = code - 317 + 56832;
        }
        return String.fromCharCode(55357, code);
      }
      let emojis = raw.match(/emoji\([0-9][0-9][0-9]\)/g);
      if (emojis) {
        for (let emoji of emojis) {
          raw = raw.replace(emoji, code2emoji(Number(emoji.substring(6, 9))));
        }
      }

      //公式支持
      raw = raw.replace(
        /<eqa>/g,
        '<img src="http://latex.codecogs.com/gif.latex?'
      );
      raw = raw.replace(/<\/eqa>/g, '" />');

      //再匹配markdown和代码块
      let len = raw.length;
      if (
        raw.substring(0, 9) === "<my-code>" &&
        raw.substring(len - 10, len) === "</my-code>"
      ) {
        return (
          '<pre style="text-align:left">' +
          raw.substring(9, len - 10) +
          "</pre>"
        );
      } else if (
        raw.substring(0, 10) === "<markdown>" &&
        raw.substring(len - 11, len) === "</markdown>"
      ) {
        raw = raw.substring(10, len - 11);
        const converter = new showdown.Converter({
          extensions: [
            showdownKatex({
              // maybe you want katex to throwOnError
              throwOnError: true,
              // disable displayMode
              displayMode: false,
              // change errorColor to blue
              errorColor: "#1500ff",
              delimiters: [{ left: "$", right: "$" }],
            }),
          ],
        });
        let html = converter.makeHtml(raw);
        return html;
      }

      return raw;
    },
  },
  computed: {
    page_button1() {
      return Math.max(this.page - 2, 1);
    },
    displayed_message_umbrella() {
      if (this.show_umb) {
        return this.displayed_message;
      }

      let acookie = document.cookie.split("; ");
      let all_umbrellas = "";
      for (var i = 0; i < acookie.length; i++) {
        var arr = acookie[i].split("=");
        if (arr[0] === "umbrella") {
          all_umbrellas = arr[1];
        }
      }
      all_umbrellas = all_umbrellas.split(",");
      let ret = [];
      for (let to_dis of this.displayed_message) {
        if (all_umbrellas.indexOf("" + to_dis.id) === -1) {
          ret.push(to_dis);
        }
      }

      return ret;
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

nav > ul > div > li {
  margin: 0 0;
  width: 40px;
  font-weight: bold;
}
</style>
