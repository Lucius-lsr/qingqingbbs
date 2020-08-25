<template>
  <div style="margin-bottom: 20px">
    <div
      style="position:absolute; margin-left:10em; margin-top:-0.6em; background:#009688; height:2em; border-radius:0.3em; color:white; padding:0.4em"
    >
      <h5>{{title}}</h5>
    </div>
    <div
      class="timeline-post"
      @click="load_detail"
      data-toggle="collapse"
      :href="'#detail'+id"
      aria-expanded="false"
      :aria-controls="'detail'+id"
      style="margin-bottom: 0;height: 6em;overflow:hidden; border-radius:0.5em; display: -webkit-flex;dispaly:flex-inline;justify-content:flex-start;"
    >
      <div class="post-media" style="width=100px;">
        <a href="#">
          <img :src="get_img_path(userId)" style="width:4em" />
        </a>
      </div>

      <div class="content" style="width=150px; flex-shrink:0">
        <h5 style="margin-top:-0.5em">
          <a href="#">{{nickname}}</a>
        </h5>
        <p class="text-muted" style="margin-top:-0.5em">
          <small>
            {{time_arr[1]}}
            <br />
            {{time_arr[0]}}
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
            {{lastRepliedTime_arr[1]}}
            <br />
            {{lastRepliedTime_arr[0]}}
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
        <p>{{content}}</p>
      </div>

      <div
        style="height:200px; width:60%; position:absolute; margin-top:-225px; margin-left:450px; overflow:auto;"
      >
        <div
          v-for="reply in syn_replyList"
          :key="reply.updated"
          style="width: 400px; height:100px; background-color:white !important; overflow:auto; margin-bottom:10px "
        >
          <div class="card-body">
            <div
              style="position:absolute; margin-left:-1em; margin-top:-1em; background:#009688; height:2em; color:white; padding:0.4em; z-index:3"
            >
              <h6 class="card-title">{{reply.nickname}}</h6>
              <p class="card-subtitle mb-2 text-muted">回复：{{ reply_who(reply.replyId) }}</p>
              <p class="text-muted" style="margin-top:-0.5em">
                <small>
                  {{easytime(reply.updated)[1]}}
                  <br />
                  {{easytime(reply.updated)[0]}}
                </small>
              </p>
            </div>
            <p class="card-text" style="margin-left:6em">{{reply.content}}</p>
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
                    <a href="#">
                      <img :src="get_img_path(userId)" style="width:4em" />
                    </a>
                  </div>
                  <h5 style="margin:0.5em">
                    <a href="#">{{nickname}}</a>
                  </h5>
                  <p class="text-muted" style="margin:0.5em">
                    <small>{{time_arr[1]}} &nbsp;{{time_arr[0]}}</small>
                  </p>
                </div>
                <div
                  style="width=150px; display: -webkit-flex;dispaly:flex-inline;justify-content:space-around"
                >
                  <a
                    v-if="admin_id===userId"
                    class="fa fa-pencil"
                    aria-hidden="true"
                    style="font-size: 30px; color:rgb(0, 150, 136)"
                    @click="edit_my_post()"
                  ></a>
                  <!-- <button
                    class="btn btn-primary fa fa-reply"
                    aria-hidden="true"
                    style="width:40px; height:40px; margin:5px"
                    @click="()=>{reply_name_content=nickname+'(原帖(';reply_id=id}"
                  ></button>-->
                </div>
              </div>

              <textarea
                v-if="text==='plain'"
                rows="28"
                cols="80"
                placeholder="content"
                v-model="content"
                disabled="true"
                style="resize: none"
              ></textarea>

              <span v-else class="content_html">{{content}}</span>

              


            </div>
            <div
              style="grid-row-start:1;grid-column-start:2;grid-row-end:3;grid-column-end:3; overflow:auto;"
            >
              <div
                v-for="reply in replyTree"
                :key="reply.updated"
                style="background-color:rgb(240,240,240) !important; margin-bottom:10px; margin-left:10px;display: -webkit-flex;dispaly:flex-inline; "
              >
                <div style=" flex-shrink:0; margin-left:10px">
                  <div style=" background:#009688; color:white; margin-top:10px">
                    <h6>{{reply.nickname}}</h6>
                  </div>

                  <div class="mb-2 text-muted">回复：楼主</div>
                  <div class="text-muted" style="margin-top:-0.5em">
                    <small>
                      {{easytime(reply.updated)[1]}}
                      <br />
                      {{easytime(reply.updated)[0]}}
                    </small>
                  </div>
                  <a
                    v-if="admin_id===reply.userId"
                    class="fa fa-pencil"
                    aria-hidden="true"
                    style="font-size: 15px; color:rgb(0, 150, 136)"
                    @click="edit_mine(reply.content, reply.id)"
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
                    <p class="card-text">{{reply.content}}</p>
                  </div>

                  <div style="background-color:rgb(220,220,220);width:480px">
                    <p
                      v-for="replyreply in reply['replyreply']"
                      :key="replyreply.updated"
                      @click.capture="()=>{reply_name_content=replyreply.nickname+'('+replyreply.content+')';reply_id=replyreply.id;type='reply'}"
                    >
                      <span
                        style=" background:#009688; color:white; border-radius:0.3em;"
                      >{{replyreply.nickname}}</span>回复
                      <span
                        style=" background:#009688; color:white;border-radius:0.3em;"
                      >{{reply_who(replyreply.replyId)}}</span>
                      {{replyreply.content}}
                      <a
                        v-if="admin_id===replyreply.userId"
                        class="fa fa-pencil"
                        aria-hidden="true"
                        style="font-size: 15px; color:rgb(0, 150, 136)"
                        @click="edit_mine(replyreply.content, replyreply.id)"
                      ></a>
                      <!-- <button
                        class="btn btn-primary fa fa-reply"
                        aria-hidden="true"
                        style="height:25px; width:20px; margin:5px"
                        @click="()=>{reply_name_content=replyreply.nickname+'('+replyreply.content+')';reply_id=replyreply.id}"
                      ></button>-->
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="type==='reply'"
              style="grid-row-start:3;grid-column-start:2;grid-row-end:4;grid-column-end:3;"
            >
              <textarea
                rows="8"
                cols="80"
                v-bind:placeholder="'回复:'+reply_name_content"
                v-model="reply_content"
                style="resize: none; margin-top:10px; margin-left:10px"
              ></textarea>
              <button type="button" class="btn btn-primary" @click="send_reply">回复</button>
            </div>

            <div v-else>
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
                  rows="8"
                  cols="80"
                  v-model="editing_content"
                  style="resize: none; margin-top:10px; margin-left:10px"
                ></textarea>
                <button type="button" class="btn btn-primary" @click="send_edit_post">修改</button>
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
                <button type="button" class="btn btn-primary" @click="send_edit">修改</button>
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
      editId: -1,
      editOri: "",
      editing_title: "",
      editing_content: "",
      text:"rich",
    };
  },
  computed: {
    time_arr() {
      return this.easytime(this.time);
    },
    lastRepliedTime_arr() {
      return this.easytime(this.lastRepliedTime);
    },
    img_path() {
      return `../../img_rc/${(this.userId % 12) + 1}.png')`;
    },
    replyTree() {
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
      return ret;
    },
    syn_replyList() {
      return this.replyList;
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
    reply_who(id) {
      if (id === 0) {
        return this.nickname;
      } else {
        for (let i = 0; i < this.replyList.length; i++) {
          if (this.replyList[i].id === id) {
            return this.replyList[i].nickname;
          }
        }
        return "???";
      }
    },
    send_reply() {
      let data = null;
      if (this.reply_id === this.id) {
        data = { content: this.reply_content };
      } else {
        data = { content: this.reply_content, replyId: this.reply_id };
      }

      axios.defaults.headers.common["Authorization"] = this.token;
      console.log("send_reply -> data", data);
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
        .catch((e) => {
          console.log("send_reply -> e", e);

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
        .catch((e) => {
          console.log("send_reply -> e", e);

          /* eslint-disable */
          toastr.error("修改主贴失败");
          /* eslint-enable */
        });
    },
    edit_mine(content, id) {
      console.log("!");
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
        .catch((e) => {
          console.log("send_reply -> e", e);

          /* eslint-disable */
          toastr.error("修改回复失败");
          /* eslint-enable */
        });
    },
  },
};
</script>

