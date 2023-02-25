<template>
  <div>
    <div v-if="InfoShow">
      <div class="cardStylHead">
        <loopImg :height="'320px'" :delay="8000" />
      </div>
      <div>
        <div
          class="bg-light-primary dark:bg-dark-modifier-active dark:text-dark-modifier-active cardStyl"
          v-for="item in articleList"
          :key="item.id"
          @click="openInfo">
          <div class="articleGroup">
            <div class="articleImg"></div>
            <div class="articleContent">
              <div class="articleTitle">{{ item.title }}</div>
              <div class="articleDescribe"></div>
              <div class="articleBox">
                <div class="articleBoxItem">{{ item.details.uloadTime }}</div>
                <div class="articleBoxItem">热度{{ item.details.visitor }}</div>
                <div class="articleBoxItem" @click.stop="drawerOpen(item.details)">评论{{ item.details.commentList.length }}</div>
                <div class="articleBoxItem" @click.stop="">喜欢{{ item.details.like }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Drawer :closable="false" v-model="drawerShow" placement="right" width="25">
        <div :class="[theme == 'dark' ? 'bg-dark-secondary' : 'bg-light-primary']" class="drawerSty">
          <div>
            <h1>评论</h1>
          </div>
          <div v-for="item in commentList" :key="item.id">
            <chitchat :imgUrl="item.imgUrl" :content="item.remark" :name="item.name" :dataTime="item.remarkTime">
              <div v-for="y in item.discuss" :key="y.id" slot="childchitchat">
                <chitchat :imgUrl="y.imgUrl" :content="y.remark" :name="y.name" :dataTime="y.remarkTime" :parent="y.parent"> </chitchat>
              </div>
            </chitchat>
          </div>
        </div>
      </Drawer>
    </div>

    <figure v-else class="md:flex rounded-xl p-8 md:p-0">
      <Info />
    </figure>
  </div>
</template>

<script>
import Info from "@/components/info";
import loopImg from "@/components/loop";
import chitchat from "@/components/chitchat";
export default {
  name: "Public",
  data() {
    return {
      InfoShow: true,
      articleList: [
        {
          id: 1,
          imgUrl: "",
          describe: "",
          title: "袜子撒",
          details: {
            uloadTime: "2023-02-06",
            visitor: 12,
            commentList: [
              {
                usrId: 1,
                name: "cs",
                remark: "这是一条评论",
                remarkTime: "2023-02-06",
                imgUrl: "cs",
                discuss: [
                  {
                    usrId: 2,
                    name: "cs1",
                    remark: "这是一条回复",
                    remarkTime: "2023-02-06",
                    imgUrl: "cs1",
                    parent: {
                      usrId: 1,
                      name: "cs",
                    },
                  },
                ],
              },
              {
                usrId: 3,
                name: "cs",
                remark: "这是一条评论",
                remarkTime: "2023-02-06",
                imgUrl: "cs",
                discuss: [
                  {
                    usrId: 2,
                    name: "cs1",
                    remark: "这是一条回复",
                    remarkTime: "2023-02-06",
                    imgUrl: "cs1",
                    parent: {
                      usrId: 3,
                      name: "cs",
                    },
                  },
                ],
              },
            ],
            like: 110,
          },
        },
        {
          id: 2,
          imgUrl: "",
          describe: "",
          title: "大商股份",
          details: {
            uloadTime: "",
            visitor: 12,
            commentList: [
              {
                usrId: 4,
                name: "cs",
                remark: "这是一条评论",
                remarkTime: "2023-02-06",
              },
            ],
            like: 110,
          },
        },
        {
          id: 3,
          imgUrl: "",
          describe: "",
          title: "俺是个风格的",
          details: {
            uloadTime: "",
            visitor: 12,
            commentList: [
              {
                usrId: 5,
                name: "cs",
                remark: "这是一条评论",
                remarkTime: "2023-02-06",
              },
            ],
            like: 110,
          },
        },
        {
          id: 4,
          imgUrl: "",
          describe: "",
          title: "鱼体一天的规范化",
          details: {
            uloadTime: "",
            visitor: 12,
            commentList: [
              {
                usrId: 6,
                name: "cs",
                remark: "这是一条评论",
                remarkTime: "2023-02-06",
              },
            ],
            like: 110,
          },
        },
      ],
      commentList: [],
      drawerShow: false,
    };
  },
  components: {
    chitchat,
    Info,
    loopImg,
  },
  methods: {
    openInfo() {
      this.InfoShow = false;
    },
    drawerOpen(data) {
      this.commentList = data.commentList;
      this.drawerShow = true;
    },
  },
  computed: {
    theme() {
      return this.$store.state.theme;
    },
  },
};
</script>
<style lang="less">
.ivu-card-body {
  padding: 0;
  overflow: hidden;
}
.cardStylHead {
  height: 320px;
  margin-bottom: 6px;
}
.cardStylTitle {
  margin-bottom: 6px;
  cursor: pointer;
  height: 60px;
}
.cardStyl {
  cursor: pointer;
  margin-bottom: 8px;
  height: 120px;
}
.articleGroup {
  display: flex;
  justify-content: flex-start;
  .articleImg {
    width: 25%;
    height: 120px;
    border: 1px red solid;
  }
  .articleContent {
    width: 75%;
    .articleTitle {
      padding-left: 10%;
      height: 30px;
      line-height: 30px;
      border: 1px red solid;
    }
    .articleDescribe {
      height: 60px;
      border: 1px red solid;
    }
    .articleBox {
      display: flex;
      align-items: center;
      height: 30px;
      border: 1px red solid;
      .articleBoxItem {
        text-align: center;
        width: 25%;
      }
    }
  }
}
.ivu-drawer-body {
  padding: 0px;
  margin: 0px;
  .drawerSty {
    height: 100%;
  }
}
</style>
