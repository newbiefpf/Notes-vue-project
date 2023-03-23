<template>
  <div class="allFull bg-white dark:bg-dark-secondary">
    <div class="close"><Icon type="md-arrow-round-back" size="30" @click="changeInfoShow" /></div>
    <div class="body">
      <div class="body-left bg-light-primary dark:bg-dark-modifier-active dark:text-dark-modifier-active">
        <div class="body-left-flex">
          <div><Avatar size="50" src="https://i.loli.net/2017/08/21/599a521472424.jpg">USER</Avatar></div>
          <div style="padding-left: 10px">
            <div>付鹏篚</div>
            <div>编码中。。。。</div>
          </div>
        </div>
        <div class="body-left-flex" style="padding-top: 15px">
          <div class="open">
            <Tooltip content="点赞">
              <Tag color="error"><Icon type="md-heart-outline" /></Tag>
            </Tooltip>
          </div>
          <div class="open">
            <Tooltip content="收藏">
              <Tag color="success"><Icon type="md-star-outline" /></Tag>
            </Tooltip>
          </div>
          <div @click.capture="drawerOpen" class="open">
            <Tooltip content="评论">
              <Tag color="warning"><Icon type="ios-chatboxes-outline" /></Tag>
            </Tooltip>
          </div>
        </div>
        <div class="tagList">
          <Tag color="magenta">VUE</Tag>
          <Tag color="red">PHP</Tag>
          <Tag color="volcano">JAVA</Tag>
          <Tag color="orange">C#</Tag>
          <Tag color="gold">.NET</Tag>
          <Tag color="yellow">HTML</Tag>
          <Tag color="lime">CSS3</Tag>
          <Tag color="green">JS</Tag>
          <Tag color="cyan">JQ</Tag>
          <Tag color="blue">GO</Tag>
        </div>
        <div class="body-left-flex">
          <div style="margin-right: 5px">
            <Button type="info" ghost>关注</Button>
          </div>
          <div style="margin-left: 5px">
            <Button type="success" @click="sendLetterInfo" ghost>私信</Button>
          </div>
        </div>
      </div>

      <div class="body-center bg-light-primary dark:bg-dark-modifier-active dark:text-dark-modifier-active">
        <div class="head">
          <div class="articlTitle">
            <UiTitle :text="articleInfo.title" />
          </div>
          <div class="articlUser">{{ articleInfo.abstract }}</div>
        </div>
        <div
          class="ql-container ql-snow bg-light-primary dark:bg-dark-modifier-active dark:text-dark-modifier-active"
          style="border: none; height: 80vh">
          <div
            class="ql-editor bg-light-primary dark:bg-dark-modifier-active dark:text-dark-modifier-active"
            data-gramm="false"
            contenteditable="false"
            style="height: 80vh"
            v-html="articleInfo.contentHtml"></div>
        </div>
      </div>
      <div class="body-right bg-light-primary dark:bg-dark-modifier-active dark:text-dark-modifier-active">
        <img :src="articleInfo.imgUrl" alt="加载中。。。" />
        <div style="padding: 10px">
          <div>相关文章</div>
        </div>
      </div>
    </div>
    <Drawer :closable="false" v-model="drawerShow" placement="right" width="30" class-name="drawerSty">
      <div>
        <div>
          <h1>评论列表</h1>
        </div>
        <div>
          <div class="replyList">
            <div v-for="item in commentList" :key="item.ID">
              <chitchat
                @replyMessage="replyMessage"
                @sendLetter="sendLetter"
                :imgUrl="item.avatar"
                :content="item.comment"
                :name="item.name"
                :dataTime="item.CreatedAt"
                :replyId="item.ID"
                :userId="item.user_id">
                <div v-for="child in item.children" :key="child.ID" slot="childchitchat">
                  <chitchat
                    @replyMessage="replyMessage"
                    @sendLetter="sendLetter"
                    :imgUrl="child.avatar"
                    :content="child.comment"
                    :name="child.name"
                    :dataTime="child.CreatedAt"
                    :parent="child.father_id"
                    :replyId="child.ID"
                    :userId="child.user_id">
                  </chitchat>
                </div>
              </chitchat>
            </div>
          </div>
          <div class="bg-white dark:bg-dark-secondary shadow-sm flex border-b border-gray:100 dark:border-gray-600 replyBox">
            <button @click="sendMessage" class="bg-sky-blue dark:bg-dark-primary px-7 rounded-md text-white flex items-center gap-3">发表</button>
            <textarea
              rows="1"
              v-model="valueMessage"
              class="block px-4 py-1.5 text-base font-normal text-light-primary dark:text-white bg-light-primary dark:bg-dark-primary bg-clip-padding rounded-md transition ease-in-out m-0 dark:focus:text-white focus:border-sky-blue focus:outline-none"
              placeholder="@发表评论" />
            <div style="width: 180px" class="flex items-center">
              <div v-show="returnText != ''">
                {{ returnText }} &nbsp;&nbsp;&nbsp;&nbsp;<Icon type="md-close-circle" style="cursor: pointer" @click="clearPerson" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
    <popup :visible.sync="modalType" :width="'40%'" :title="`私信给${sendUser.name}`" @handleCancel="modalType = false" @handleComfirm="sendToUser">
      <template slot="body">
        <div class="font-medium text-light-primary dark:text-dark-primary">
          <Input v-model="personalLetter" type="textarea" :autosize="{ minRows: 1, maxRows: 3 }" />
        </div>
      </template>
    </popup>
  </div>
</template>
<script>
import UiTitle from "@/components/ui/UiTitle";
import chitchat from "@/components/chitchat";
import { articleDiscuss, articleDiscussPut } from "@/api/articale";
import { chatMessage } from "@/api/message";

import popup from "@/components/popupWindows";
import { fmdata } from "@/utils/formatDate.js";
export default {
  name: "Public",
  data() {
    return {
      htmlText: "",
      commentList: [],
      screenFullType: true,
      drawerShow: false,
      replyMessageBox: false,
      valueMessage: "",
      returnText: "",
      fatherId: null,
      modalType: false,
      sendUser: {},
      personalLetter: null,
      toUserId: null,
    };
  },
  filters: {
    fmtime(val) {
      return fmdata(val);
    },
  },
  props: {
    InfoShow: {
      type: Boolean,
      default: function () {
        return false;
      },
    },
    articleInfo: {
      type: Object,
    },
  },
  components: { UiTitle, chitchat, popup },
  computed: {
    theme() {
      return this.$store.state.theme;
    },
    userInfo() {
      return this.$store.getters.userInfo;
    },
  },
  created() {
    this.getArticleDiscuss();
  },
  methods: {
    sendToUser() {
      if (this.personalLetter == "") {
        this.$Message.error("私信类容不能为空！！！");
        return;
      }
      let groupName = "";
      if (Number(this.articleInfo.userId) > Number(this.userInfo.ID)) {
        groupName = this.userInfo.ID + "_" + this.articleInfo.userId;
      } else {
        groupName = this.articleInfo.userId + "_" + this.userInfo.ID;
      }
      let date = new Date();
      var data = {
        msg: {
          chat_msg_type: 2,
          data: {
            to_user_id: this.articleInfo.userId,
            content: this.personalLetter,
            user_id: this.userInfo.ID,
            groupName: groupName,
            date: date,
            type: "chat",
          },
        },
      };
      this.$initWs.send(data);
    },
    clearPerson() {
      this.returnText = "";
      this.fatherId = null;
      this.toUserId = null;
    },
    sendLetter(id, name) {
      console.log(this.userInfo);
      if (this.articleInfo.userId == id) {
        this.$Message.error("不能给自己私信哦");
      } else {
        this.drawerShow = false;
        this.sendUser = {
          id,
          name,
        };
        this.modalType = true;
      }
    },
    sendLetterInfo() {
      console.log(this.articleInfo);
      if (this.articleInfo.userId == this.userInfo.ID) {
        this.$Message.error("不能给自己私信哦");
      } else {
        this.drawerShow = false;
        this.sendUser = {
          id: this.articleInfo.userId,
          name: this.articleInfo.name,
        };
        this.modalType = true;
      }
    },
    replyMessage(id, name, userId) {
      this.returnText = `@${name}：`;
      this.toUserId = userId;
      console.log("回复的id", id, name, "用户", userId);
      if (id) {
        this.fatherId = id;
      } else {
        this.fatherId = null;
      }
    },
    sendMessage() {
      if (!this.toUserId) {
        this.toUserId = this.articleInfo.userId;
      }
      if (this.valueMessage == "") {
        this.$Message.info("请输入评论类容！！！");
      } else {
        let data = {
          article_link_id: this.articleInfo.ID,
          father_id: this.fatherId,
          name: this.userInfo.name,
          avatar: this.userInfo.avatar || "https://i.loli.net/2017/08/21/599a521472424.jpg",
          comment: this.returnText + this.valueMessage,
          toUserId: this.toUserId,
        };
        articleDiscussPut(data).then((res) => {
          if (res.code == 200) {
            let data = {
              msg: {
                chat_msg_type: 2,
                data: {
                  to_user_id: this.toUserId,
                  content: `${this.userInfo.name}提到了你`,
                  type: "discuss",
                },
              },
            };
            this.$initWs.send(data);
            this.clearPerson();
            this.valueMessage = "";
            this.getArticleDiscuss();
            this.$Message.success("发表成功,等待审核中！！！");
          } else {
            this.$Message.error(res.msg);
          }
        });
      }
    },
    changeInfoShow() {
      this.$emit("update:InfoShow", false);
    },
    getArticleDiscuss() {
      this.commentList = [];
      articleDiscuss({ articleId: this.articleInfo.ID }).then((res) => {
        if (res.code == 200) {
          res.data.forEach((item) => {
            if (!item.father_id) {
              this.commentList.push({ ...item, children: [] });
            }
          });
          this.commentList.sort((a, b) => {
            return b.ID - a.ID;
          });
          res.data.forEach((x) => {
            if (x.father_id) {
              this.commentList.forEach((y) => {
                if (x.father_id == y.ID) {
                  y.children.push(x);
                }
                y.children.sort((a, b) => {
                  return b.ID - a.ID;
                });
              });
            }
          });

          // console.log(this.commentList);
        } else {
          this.$Message.error(res.msg);
        }
      });
    },

    drawerOpen() {
      this.drawerShow = true;
    },
  },
};
</script>
<style scoped lang="less">
.allFull {
  background-image: url(../../assets/sky.jpg);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  z-index: 88;
  .close {
    cursor: pointer;
    position: fixed;
    left: 8px;
    top: 8px;
  }
}
.body {
  display: flex;
  width: 100%;
  justify-content: center;
  .body-left {
    opacity: 85%;
    // background-color: aquamarine;
    height: 300px;
    width: 15%;
    padding: 20px;
    .body-left-flex {
      margin: 12px 0px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .tagList {
    padding: 10px 0px;
  }
  .open {
    cursor: pointer;
  }
  .body-center {
    opacity: 85%;
    width: 50%;
    height: 88vh;
    margin: 0px 10px;
  }
  .articlUser {
    padding: 0px 15px;
  }
  .head {
    padding-bottom: 20px;
    .articlTitle {
      padding: 30px 15px 18px 15px;
    }
  }

  .body-right {
    opacity: 85%;
    // background-color: rgb(51, 23, 112);
    width: 15%;
    img {
      width: 100%;
      min-height: 180px;
    }
  }
}
.ql-editor::-webkit-scrollbar {
  overflow: hidden;
}
.ql-editor::-webkit-scrollbar-thumb {
  overflow: hidden;
}
.drawerSty {
  // height: 100%;
}
.replyList {
  overflow: hidden;
  padding-bottom: 100px;
}
.replyBox {
  position: fixed;
  width: 100%;
  bottom: 0;
  padding: 8px 4px;
  input {
    margin-left: 20px;
  }
}
</style>
