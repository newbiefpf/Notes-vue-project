<template>
  <div>
    <div>
      <div class="cardStylHead">
        <loopImg :height="'320px'" :delay="8000" />
      </div>
      <div>
        <div
          class="bg-light-primary dark:bg-dark-modifier-active dark:text-dark-modifier-active cardStyl"
          v-for="item in articleList"
          :key="item.id"
          @click="openInfo(item)">
          <div class="articleGroup">
            <div class="articleImg">
              <img :src="item.imgUrl" alt="出错啦！" />
            </div>
            <div class="articleContent">
              <div class="articleTitle">文章：{{ item.title }}</div>
              <div class="articleDescribe">简介： {{ item.abstract }}</div>
              <div class="articleBox">
                <div class="articleBoxItem">{{ item.CreatedAt | fmtime }}</div>
                <div class="articleBoxItem">热度{{ item.ArticleLink.hot }}</div>
                <div class="articleBoxItem">评论{{ item.ArticleLink.discussCount }}</div>
                <div class="articleBoxItem">喜欢{{ item.ArticleLink.giveLike }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="InfoShow">
      <publicInfo :InfoShow.sync="InfoShow" :articleInfo="articleInfo" />
    </div>
  </div>
</template>

<script>
import publicInfo from "@/components/publicInfo";
import loopImg from "@/components/loop";
import { fmdata } from "@/utils/formatDate.js";
import { articleAllList } from "@/api/articale";
export default {
  name: "Public",
  filters: {
    fmtime(val) {
      return fmdata(val);
    },
  },
  data() {
    return {
      InfoShow: false,
      articleList: [],
      commentList: [],
      articleInfo: {},
    };
  },
  components: {
    publicInfo,
    loopImg,
  },
  created() {
    this.getDate();
  },
  methods: {
    getDate() {
      articleAllList().then((res) => {
        if (res.code == 200) {
          debugger;
          this.articleList = res.data.list;
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    openInfo(item) {
      this.articleInfo = item;
      this.InfoShow = true;
    },
  },
  computed: {
    theme() {
      return this.$store.state.theme;
    },
  },
};
</script>
<style lang="less" scoped>
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
  border-radius: 4px;
  &:hover {
    margin-top: 0px; /*和hover的margin-top有对比，原无30,现在0，相当于上移了,30px*/
    box-shadow: 0 0 20px 2px #918f8f; /*盒子阴影*/
    transition: all 0.5s; /*持续时间*/
  }
}
.articleGroup {
  display: flex;
  justify-content: flex-start;
  .articleImg {
    width: 25%;
    height: 120px;
    img {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      width: 100%;
      height: 100%;
    }
  }
  .articleContent {
    width: 75%;
    .articleTitle {
      padding-left: 10%;
      height: 30px;
      line-height: 30px;
    }
    .articleDescribe {
      height: 60px;
      padding-left: 8px;
    }
    .articleBox {
      display: flex;
      align-items: center;
      height: 30px;
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
