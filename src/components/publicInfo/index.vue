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
            <Button type="success" ghost>私信</Button>
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
    <Drawer :closable="false" v-model="drawerShow" placement="right" width="25">
      <div :class="[theme == 'dark' ? 'bg-dark-secondary' : 'bg-light-primary']" class="drawerSty">
        <div>
          <h1>评论</h1>
        </div>
        <div>
          <div v-for="item in commentList" :key="item.ID">
            <chitchat
              @replyMessage="replyMessage"
              :imgUrl="item.avatar"
              :content="item.comment"
              :name="item.name"
              :dataTime="item.CreatedAt"
              :replyId="item.ID">
              <div v-for="child in item.children" :key="child.ID" slot="childchitchat">
                <chitchat :imgUrl="child.imgUrl" :content="child.comment" :name="child.name" :dataTime="child.CreatedAt" :parent="child.father_id">
                </chitchat>
              </div>
            </chitchat>
          </div>
          <div>
            <input v-model="valueMessage" />
            <button>{{ valueMessage }}</button>
          </div>
        </div>
      </div>
    </Drawer>
  </div>
</template>
<script>
import UiTitle from "@/components/ui/UiTitle";
import chitchat from "@/components/chitchat";
import { articleDiscuss } from "@/api/articale";
import { fmdata } from "@/utils/formatDate.js";
export default {
  name: "Public",
  data() {
    return {
      htmlText: "",
      modalType: false,
      commentList: [],
      screenFullType: true,
      drawerShow: false,
      replyMessageBox: false,
      valueMessage: "",
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
  components: { UiTitle, chitchat },
  computed: {
    theme() {
      return this.$store.state.theme;
    },
  },
  created() {
    this.getArticleDiscuss();
  },
  methods: {
    replyMessage(id) {
      if (id) {
        this.replyMessageBox = true;
      }
      console.log("回复的id", id);
    },
    changeInfoShow() {
      this.$emit("update:InfoShow", false);
    },
    getArticleDiscuss() {
      articleDiscuss({ articleId: this.articleInfo.ID }).then((res) => {
        console.log(res);
        if (res.code == 200) {
          res.data.forEach((item) => {
            if (!item.father_id) {
              this.commentList.push({ ...item, children: [] });
            }
          });
          res.data.forEach((x) => {
            if (x.father_id) {
              this.commentList.forEach((y) => {
                if (x.father_id == y.ID) {
                  y.children.push(x);
                }
              });
            }
          });
          console.log(this.commentList, 123);
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
  height: 100%;
}
</style>
