<template>
  <div style="margin-bottom: 20px">
    <div
      style="position:absolute; margin-left:10em; margin-top:-0.6em; background:#009688; height:2em; border-radius:0.3em; color:white; padding:0.4em"
    >
      <h5>{{title}}</h5>
    </div>
    <div
      class="timeline-post"
      aria-expanded="false"
      :aria-controls="'detail'+id"
      style="margin-bottom: 0;height: 6em;overflow:hidden; border-radius:0.5em; display: -webkit-flex;dispaly:flex-inline;justify-content:flex-start;"
      @click="load_detail"
      data-toggle="collapse"
      :href="'#detail'+id"
    >
      <div class="post-media" style="width=100px;">
        <a href="#" @click.prevent="user_ref(userId)">
          <img :src="get_img_path(userId)" style="width:4em" />
        </a>
      </div>

      <div class="content" style="width=150px; flex-shrink:0">
        <h5 style="margin-top:-0.5em">
          <a href="#" @click="user_ref(userId)">{{nickname}}</a>
        </h5>
        <p class="text-muted" style="margin-top:-0.5em">
          <small>
            {{easytime(time)[1]}}
            <br />
            {{easytime(time)[0]}}
          </small>
        </p>
      </div>

      <div class="post-content" style="overflow: hidden; height:5em; width=300px; flex-grow:10">
        <p>{{content}}</p>
      </div>

      <div style="width=150px; flex-shrink:0 ">
        <p class="text-muted" style="margin-top:-0.5em">
          <small v-if="lastRepliedTime!==time">
            最新回复：{{lastRepliedNickname}}
            <br />
            {{easytime(lastRepliedTime)[1]}}
            <br />
            {{easytime(lastRepliedTime)[0]}}
          </small>
        </p>
      </div>
    </div>

    <div
      v-if="focus===id"
      class="collapse"
      :id="'detail'+id"
      style="overflow:auto"
      data-toggle="modal"
      :data-target="'#detailModal'+id"
      @click="history(id)"
    >
      <!-- <div style="position:absolute; margin-left:30px; z-index:2">
        <p class="text-muted">单击查看详情</p>
      </div>-->
      <div
        @click="load_detail"
        class="card card-body"
        style="height:250px; background-color:white !important; overflow:auto; margin-left:30px; border-radius:0.8em;"
      >
        <p class="text-muted" style="margin-top:-20px; margin-left:-20em">
          <small>单击查看详情>></small>
        </p>
        <!-- <p>{{content}}</p> -->
        <div v-html="diy_content(content)" style="overflow:auto;width:370px;"></div>
      </div>

      <div
        style="height:200px; width:60%; position:absolute; margin-top:-225px; margin-left:450px; overflow:auto;"
      >
        <div
          v-for="reply in syn_replyList"
          :key="reply.id"
          style="width: 500px; height:100px; background-color:white !important; overflow:auto; margin-bottom:10px "
        >
          <div class="card-body">
            <div
              style="position:absolute; margin-left:-1em; margin-top:-1em; background:#009688; height:2em; color:white; padding:0.4em; z-index:3"
            >
              <a href="#" @click.stop="user_ref(reply.userId)" style="color:white">
                <h6 class="card-title">{{reply.nickname}}</h6>
              </a>
              <p class="card-subtitle mb-2 text-muted">回复：{{ reply_who(reply.replyId)[1] }}</p>
              <p class="text-muted" style="margin-top:-0.5em">
                <small>
                  {{easytime(reply.updated)[1]}}
                  <br />
                  {{easytime(reply.updated)[0]}}
                </small>
              </p>
            </div>
            <!-- <p class="card-text" style="margin-left:6em">{{reply.content}}</p> -->

            <div
              v-html="diy_content(reply.content)"
              style="overflow:auto;width:400px;margin-left:50px"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="focus===id"
      class="modal fade"
      :id="'detailModal'+id"
      tabindex="-1"
      :aria-labelledby="'detailModalLabel'+id"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content" style="width:1200px; height:800px; margin-left:-300px">
          <div class="modal-header">
            <h5 class="modal-title">{{title}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div
            class="modal-body"
            style="display: grid;grid-template-columns: 50% 50%;grid-template-rows: 33.3% 33.3% 33.3%;width:1200px; height:680px;"
          >
            <div
              style="grid-row-start:1;grid-column-start:1;grid-row-end:4;grid-column-end:2;"
              @click.capture="()=>{reply_name_content=nickname+'(原帖)';reply_id=id;type='reply'}"
            >
              <div
                class="content"
                style="width=150px; display: -webkit-flex;dispaly:flex-inline;justify-content:space-between"
              >
                <div
                  style="width=150px; display: -webkit-flex;dispaly:flex-inline;justify-content:space-around"
                >
                  <div class="post-media" style="width=100px; margin-bottom:10px">
                    <a href="#" @click="user_ref(userId)" data-dismiss="modal">
                      <img :src="get_img_path(userId)" style="width:4em" />
                    </a>
                  </div>
                  <h5>
                    <a
                      href="#"
                      @click="user_ref(userId)"
                      data-dismiss="modal"
                      style="margin:0.5em; color:rgb(0, 150, 136)"
                    >{{nickname}}</a>
                  </h5>
                  <p class="text-muted" style="margin:0.5em">
                    <small>{{easytime(time)[1]}} &nbsp;{{easytime(time)[0]}}</small>
                  </p>
                </div>
                <div
                  style="width=150px; display: -webkit-flex;dispaly:flex-inline;justify-content:space-around"
                >
                  <a
                    href="#"
                    class="fa fa-umbrella"
                    aria-hidden="true"
                    style="font-size: 30px; color:rgb(0, 150, 136);margin-right:20px"
                    @click="umbrella(id)"
                    v-bind:title="'屏蔽'"
                  ></a>

                  <a
                    href="#"
                    class="fa fa-star"
                    aria-hidden="true"
                    style="font-size: 30px; color:rgb(0, 150, 136);margin-right:20px"
                    @click="star(id)"
                    v-bind:title="'收藏'"
                  ></a>

                  <a
                    href="#"
                    class="fa fa-eye"
                    aria-hidden="true"
                    style="font-size: 30px; color:rgb(0, 150, 136);margin-right:20px"
                    @click="format_raw=!format_raw"
                    v-bind:title="'原始内容'"
                  ></a>

                  <a
                    href="#"
                    class="fa fa-user-circle-o"
                    aria-hidden="true"
                    style="font-size: 30px; color:rgb(0, 150, 136);margin-right:20px"
                    @click="()=>{host_only=!host_only}"
                    v-bind:title="'只看楼主'"
                  ></a>

                  <a
                    href="#"
                    v-if="admin_id===userId"
                    class="fa fa-pencil"
                    aria-hidden="true"
                    style="font-size: 30px; color:rgb(0, 150, 136)"
                    @click="edit_my_post()"
                    v-bind:title="'修改原帖'"
                  ></a>
                </div>
              </div>

              <div v-if="format_raw" style="overflow:auto; height:600px">{{content}}</div>
              <div v-else v-html="diy_content(content)" style="overflow:auto; height:600px"></div>
            </div>
            <div
              style="grid-row-start:1;grid-column-start:2;grid-row-end:3;grid-column-end:3; overflow:auto;"
            >
              <div
                v-for="reply in replyDetailInPage"
                :key="reply.id"
                style="background-color:rgb(240,240,240) !important; margin-bottom:10px; margin-left:10px;display: -webkit-flex;dispaly:flex-inline; "
              >
                <div style=" flex-shrink:0; margin-left:10px">
                  <h5 style="border-radius:0.3em; height:25px; background:#009688;">
                    <a
                      href="#"
                      @click="user_ref(reply.userId)"
                      data-dismiss="modal"
                      style=" color:white;"
                    >{{reply.nickname}}</a>
                  </h5>

                  <div
                    v-if="!host_only||reply.replyId===0"
                    class="mb-2 text-muted"
                    style="margin-top:-0.5em"
                  >
                    <small>回复：楼主</small>
                  </div>
                  <div v-else class="mb-2 text-muted" style="margin-top:-0.5em">
                    <small>回复：{{reply_who(reply.replyId)[1]}}</small>
                  </div>
                  <div class="text-muted" style="margin-top:-0.5em">
                    <small>
                      {{easytime(reply.updated)[1]}}
                      <br />
                      {{easytime(reply.updated)[0]}}
                    </small>
                  </div>
                  <a
                    href="#"
                    v-if="admin_id===reply.userId"
                    class="fa fa-pencil"
                    aria-hidden="true"
                    style="font-size: 15px; color:rgb(0, 150, 136)"
                    @click="edit_mine(reply.content, reply.id)"
                    v-bind:title="'修改回复'"
                  ></a>
                  <!-- <button
                    class="btn btn-primary fa fa-reply"
                    aria-hidden="true"
                    style="height:25px; width:20px;margin:5px"
                    @click="()=>{reply_name_content=reply.nickname+'('+reply.content+')';reply_id=reply.id}"
                  ></button>-->
                </div>

                <div
                  style="overflow:auto; margin-right:10px"
                  @click.capture="()=>{reply_name_content=reply.nickname+'('+reply.content+')';reply_id=reply.id;type='reply'}"
                >
                  <div style="margin-top:20px; margin-bottom:20px">
                    <div v-if="format_raw" style="overflow:auto;width:480px;">{{reply.content}}</div>
                    <div
                      v-else
                      v-html="diy_content(reply.content)"
                      style="overflow:auto;width:480px;"
                    ></div>
                  </div>

                  <div
                    v-for="replyreply in reply['replyreply']"
                    :key="replyreply.id"
                    @click.capture="()=>{reply_name_content=replyreply.nickname+'('+replyreply.content+')';reply_id=replyreply.id;type='reply'}"
                    style="background-color:rgb(220,220,220);width:480px; margin-bottom:10px"
                  >
                    <div v-if="!host_only">
                      <div style="margin-left:0">
                        <a
                          href="#"
                          @click="user_ref(replyreply.userId)"
                          data-dismiss="modal"
                          style=" background:#009688; color:white;border-radius:0.3em;"
                        >{{replyreply.nickname}}</a>
                        回复
                        <a
                          href="#"
                          @click="user_ref(reply_who(replyreply.replyId)[0])"
                          data-dismiss="modal"
                          style=" background:#009688; color:white;border-radius:0.3em;"
                        >{{reply_who(replyreply.replyId)[1]}}</a>
                        <small>{{easytime(replyreply.updated)[1]}} &nbsp;{{easytime(replyreply.updated)[0]}}</small>

                        <a
                          href="#"
                          v-if="admin_id===replyreply.userId"
                          class="fa fa-pencil"
                          aria-hidden="true"
                          style="font-size: 15px; color:rgb(0, 150, 136)"
                          @click="edit_mine(replyreply.content, replyreply.id)"
                          v-bind:title="'修改回复'"
                        ></a>
                      </div>
                      <div v-if="format_raw" style="overflow:auto;">{{replyreply.content}}</div>
                      <div v-else v-html="diy_content(replyreply.content)" style="overflow:auto;"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style="grid-row-start:3;grid-column-start:2;grid-row-end:4;grid-column-end:3;">
              <div
                style="display: -webkit-flex;dispaly:flex-inline; height:38px; justify-content:space-between; margin-top:10px"
              >
                <ul class="pagination" style="margin-left: 10px">
                  <li class="page-item">
                    <a
                      class="page-link"
                      @click="change_page(page-1)"
                      aria-label="Previous"
                      style="  margin: 0 0;width:40px;font-weight: bold;"
                    >
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>

                  <div
                    v-for="index in Math.ceil(replyDetail.length/10)"
                    :key="index"
                    style="margin: 0 0;width:40px;font-weight: bold;"
                  >
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

                  <li class="page-item">
                    <a
                      class="page-link"
                      @click="change_page(page+1)"
                      aria-label="Next"
                      style="margin: 0 0;width:40px;font-weight: bold;"
                    >
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
                <button
                  v-if="type==='reply'"
                  type="button"
                  class="btn btn-primary"
                  @click="send_reply"
                >回复</button>
                <button
                  v-else-if="type==='edit_post'"
                  type="button"
                  class="btn btn-primary"
                  @click="send_edit_post"
                >修改</button>
                <button v-else type="button" class="btn btn-primary" @click="send_edit">修改</button>
              </div>
              <textarea
                v-if="type==='reply'"
                rows="8"
                cols="80"
                v-bind:placeholder="'回复:'+reply_name_content"
                v-model="reply_content"
                style="resize: none; margin-top:10px; margin-left:10px"
              ></textarea>

              <div v-else-if="type==='edit_post'">
                <div
                  v-if="type==='edit_post'"
                  style="grid-row-start:3;grid-column-start:2;grid-row-end:4;grid-column-end:3;"
                >
                  <textarea
                    rows="1"
                    cols="80"
                    v-model="editing_title"
                    style="resize: none; margin-top:10px; margin-left:10px"
                  ></textarea>
                  <textarea
                    rows="6"
                    cols="80"
                    v-model="editing_content"
                    style="resize: none; margin-top:10px; margin-left:10px"
                  ></textarea>
                </div>
              </div>

              <div
                v-else
                style="grid-row-start:3;grid-column-start:2;grid-row-end:4;grid-column-end:3;"
              >
                <textarea
                  rows="8"
                  cols="80"
                  v-model="editOri"
                  style="resize: none; margin-top:10px; margin-left:10px"
                ></textarea>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import showdown from "showdown";

export default {
  name: "Message",
  props: {
    token: String,
    nickname: String,
    time: String,
    title: String,
    content: String,
    lastRepliedNickname: String,
    lastRepliedTime: String,
    userId: Number,
    id: Number,
    focus: Number,
    admin_id: Number,
  },
  data() {
    return {
      replyList: [],
      reply_content: "",
      reply_name_content: this.nickname + "（原帖）",
      reply_id: this.id,
      type: "reply",
      page: 1,
      editId: -1,
      editOri: "",
      editing_title: "",
      editing_content: "",
      text: "rich",
      host_only: false,
      format_raw: false,
    };
  },
  computed: {
    img_path() {
      return `../../img_rc/${(this.userId % 12) + 1}.png')`;
    },
    replyDetail() {
      function hostReplyId(user, all_list) {
        let direct_reply = user.replyId;
        if (direct_reply === 0) {
          return user.id;
        } else {
          for (let one_reply of all_list) {
            if (user.replyId === one_reply.id) {
              return hostReplyId(one_reply, all_list);
            }
          }
        }
        return null;
      }

      let ret = [];

      if (!this.host_only) {
        for (let user of this.replyList) {
          if (user.replyId === 0) {
            user["replyreply"] = [];
            ret.push(user);
          }
        }
        for (let u of this.replyList) {
          let u_hostId = hostReplyId(u, this.replyList);
          for (let host of ret) {
            if (host.id === u_hostId && u.id !== u_hostId) {
              host["replyreply"].push(u);
            }
          }
        }
      } else {
        for (let user of this.replyList) {
          if (user.userId === this.userId) {
            ret.push(user);
          }
        }
      }

      // handle page
      return ret;
    },
    replyDetailInPage() {
      return this.replyDetail.slice((this.page - 1) * 10, this.page * 10);
    },

    syn_replyList() {
      return this.replyList;
    },
    page_button1() {
      return Math.max(this.page - 1, 1);
    },
  },
  methods: {
    easytime(full_time) {
      let data_time_lag = full_time.split("T");
      let time = data_time_lag[1].split("+");
      let date = data_time_lag[0];
      return [time[0], date];
    },
    get_img_path(id) {
      return require("@/assets/img_rc/" + (((id + 5) % 12) + 1) + ".png");
    },
    load_detail() {
      this.$emit("change_focus", this.id);
      axios.defaults.headers.common["Authorization"] = this.token;
      axios
        .get(`/api/v1/post/${this.id}`)
        .then((res) => {
          this.replyList = res.data["reply"];
        })
        .catch(() => {});
    },
    change_page(p) {
      let number = this.replyDetail.length;
      let max_page = Math.ceil(number / 10);
      if (p >= 1 && p <= max_page) {
        this.page = p;
      }
    },
    reply_who(id) {
      if (id === 0) {
        return [this.userId, this.nickname];
      } else {
        for (let i = 0; i < this.replyList.length; i++) {
          if (this.replyList[i].id === id) {
            return [this.replyList[i].userId, this.replyList[i].nickname];
          }
        }
        return "???";
      }
    },
    send_reply() {
      let data = null;
      if (this.reply_content === "") {
        /* eslint-disable */
        toastr.warning("回复不能为空");
        /* eslint-enable */
      }

      if (this.reply_id === this.id) {
        data = { content: this.reply_content };
      } else {
        data = { content: this.reply_content, replyId: this.reply_id };
      }

      axios.defaults.headers.common["Authorization"] = this.token;
      axios
        .post(`/api/v1/post/${this.id}/reply`, data)
        .then((res) => {
          if (res.data["message"] === "ok") {
            /* eslint-disable */
            toastr.success("回复成功");
            /* eslint-enable */
            this.load_detail();
          }
        })
        .catch(() => {
          /* eslint-disable */
          toastr.error("回复失败");
          /* eslint-enable */
        });

      this.reply_content = "";
    },
    edit_my_post() {
      this.type = "edit_post";
      this.editing_title = this.title;
      this.editing_content = this.content;
    },
    send_edit_post() {
      let data = { title: this.editing_title, content: this.editing_content };
      axios
        .put(`/api/v1/post/${this.id}`, data)
        .then((res) => {
          if (res.data["message"] === "ok") {
            /* eslint-disable */
            toastr.success("修改主贴成功");
            /* eslint-enable */
            this.load_detail();
            this.title = this.editing_title;
            this.content = this.editing_content;
          }
        })
        .catch(() => {
          /* eslint-disable */
          toastr.error("修改主贴失败");
          /* eslint-enable */
        });
    },
    edit_mine(content, id) {
      this.type = "edit";
      this.editId = id;
      this.editOri = content;
    },
    send_edit() {
      let data = { content: this.editOri };
      axios
        .put(`/api/v1/post/${this.id}/reply/${this.editId}`, data)
        .then((res) => {
          if (res.data["message"] === "ok") {
            /* eslint-disable */
            toastr.success("修改回复成功");
            /* eslint-enable */
            this.load_detail();
          }
        })
        .catch(() => {
          /* eslint-disable */
          toastr.error("修改回复失败");
          /* eslint-enable */
        });
    },
    user_ref(id) {
      this.$emit("user_ref", id);
    },
    diy_content(raw) {
      // 先找自定义表情
      raw = raw.replace(
        /#img草泥马#/g,
        '<img src="http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/7a/shenshou_thumb.gif">'
      );
      raw = raw.replace(
        /#img神马#/g,
        '<img src="http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/60/horse2_thumb.gif">'
      );
      raw = raw.replace(
        /#img熊猫#/g,
        '<img src="http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/6e/panda_thumb.gif">'
      );

      //公式支持
      console.log(raw)
      raw = raw.replace(/<eqa>/g,'<img src="http://latex.codecogs.com/gif.latex?');
      console.log(raw)
      raw = raw.replace(/<\/eqa>/g,'" />');

      //再匹配特殊文本
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
        let converter = new showdown.Converter();
        let html = converter.makeHtml(raw);
        return html;
      }

      return raw;
    },
    star(post_id) {
      let acookie = document.cookie.split("; ");
      let all_stars = "";
      for (var i = 0; i < acookie.length; i++) {
        var arr = acookie[i].split("=");
        if (arr[0] === "star") {
          all_stars = arr[1];
        }
      }

      all_stars = all_stars.split(",");

      if (all_stars.indexOf("" + post_id) == -1) {
        all_stars.unshift(post_id);
        /* eslint-disable */
        toastr.success("收藏成功");
        /* eslint-enable */
      } else {
        all_stars.splice(all_stars.indexOf("" + post_id), 1);
        /* eslint-disable */
        toastr.warning("取消收藏");
        /* eslint-enable */
      }

      all_stars = all_stars.join(",");

      document.cookie = `star=${all_stars};expires=Sun, 31 Dec 2099 12:00:00 UTC`;
    },
    history(post_id) {
      let acookie = document.cookie.split("; ");
      let all_historys = "";
      for (var i = 0; i < acookie.length; i++) {
        var arr = acookie[i].split("=");
        if (arr[0] === "history") {
          all_historys = arr[1];
        }
      }

      all_historys = all_historys.split(",");

      if (all_historys.indexOf("" + post_id) == -1) {
        all_historys.unshift(post_id);
      }

      if (all_historys.length > 30) {
        all_historys.pop();
      }

      all_historys = all_historys.join(",");

      document.cookie = `history=${all_historys};expires=Sun, 31 Dec 2099 12:00:00 UTC`;
    },
    umbrella(post_id) {
      let acookie = document.cookie.split("; ");
      let all_umbrellas = "";
      for (var i = 0; i < acookie.length; i++) {
        var arr = acookie[i].split("=");
        if (arr[0] === "umbrella") {
          all_umbrellas = arr[1];
        }
      }

      all_umbrellas = all_umbrellas.split(",");

      if (all_umbrellas.indexOf("" + post_id) == -1) {
        all_umbrellas.unshift(post_id);
        /* eslint-disable */
        toastr.warning("屏蔽成功");
        /* eslint-enable */
      } else {
        all_umbrellas.splice(all_umbrellas.indexOf("" + post_id), 1);
        /* eslint-disable */
        toastr.success("取消屏蔽");
        /* eslint-enable */
      }

      all_umbrellas = all_umbrellas.join(",");

      document.cookie = `umbrella=${all_umbrellas};expires=Sun, 31 Dec 2099 12:00:00 UTC`;
    },
  },
};
</script>

