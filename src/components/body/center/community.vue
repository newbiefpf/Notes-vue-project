<template>
  <div>
    <div class="contentList" v-if="detialsShow">
      <div class="content" v-for="item in articleList" :key="item.ArticleID" @click="getArticleById(item.ArticleID)">
        <div class="title">
          {{ item.title }}
        </div>
        <div class="contentBody">
          <div class="contentImg">
            <img :src="item.cover" />
          </div>
          <div class="contentInfo">
            <div>
              {{ item.introduction }}
            </div>
          </div>
        </div>
        <div class="option">
          <div class="like" @click.stop="cs(1)">点赞({{ item.like }})</div>
          <div class="unlike" @click.stop="cs(0)">踩({{ item.unlike }})</div>
        </div>
      </div>
    </div>
    <div v-else>
      <markDownText :content="content" />
      <div @click="detialsShow = true">返回</div>
    </div>
  </div>
</template>

<script>
import markDownText from "@/components/body/center/import.vue";
import { getArticleList, getArticleInfo } from "@/api/index";
export default {
  name: "communityIndex",
  components: {
    markDownText,
  },
  data () {
    return {
      detialsShow: true,
      articleList: [],
      content: null,
    };
  },
  created () {
    this.getArticleList();
  },
  methods: {
    async getArticleList () {
      let res = await getArticleList();
      if (res.code == 200) {
        this.articleList = res.data;
      }
    },
    async getArticleById (id) {
      // let res = await getArticleInfo(id);
      // if (res.code == 200) {
      //   this.content = res.data.contentHtml;
      //   this.content = this.content.replace(/\r|\n/);
      //   console.log(this.content);
      // }

      this.detialsShow = false;
    },
    cs (type) {
      console.log(type);
    },
  },
};
</script>
<style lang="less" scoped>
.content {
  cursor: pointer;
  border-radius: 4px;
  box-shadow: 3px 3px 5px #888888;
  margin: 5px auto;
  width: 90%;
  height: 125px;
  padding: 10px;

  .title {
    text-align: left;
    font-size: 16px;
    font-weight: bold;
  }

  .contentBody {
    padding-top: 15px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;

    .contentImg {
      img {
        width: 125px;
        height: 65px;
      }
    }

    .contentInfo {
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      padding: 4px 8px;
      width: 100%;
      height: 65px;
      text-align: left;
      font-size: 14px;
    }
  }

  &:hover {
    transform: scale(1.005);
  }

  .option {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .like {
      margin-right: 20px;
    }
  }
}
</style>
