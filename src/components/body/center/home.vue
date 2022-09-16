<template>
  <div>
    <div class="contentList" v-if="detialsShow">
      <div class="content" @click="getArticleById(-1)" v-for="item in articleList" :key="item.id">
        <div class="title">{{item.title}}</div>
        <div class="contentBody">
          <div class="contentImg">
            <img src="@/assets/img/title.png" />
          </div>
          <div class="contentInfo">
            <div>
              {{item.abstract}}
            </div>
          </div>
        </div>
        <div class="option">
          <div class="name">作者名字</div>
          <div class="like" @click.stop="cs(1)">点赞</div>
          <div class="unlike" @click.stop="cs(0)">踩</div>
        </div>
      </div>
    </div>
    <div v-else>
      详细的文章展示
      <div @click="detialsShow = true">返回</div>
    </div>
  </div>
</template>

<script>
import { getArticleList } from "@/api/index";
export default {
  name: "homeIndex",
  data () {
    return {
      detialsShow: true,
      articleList: []
    };
  },
  created () {
    this.getArticleList()
  },
  methods: {
    async getArticleList () {
      let res = await getArticleList();
      if (res.code == 200) {
        this.articleList = res.data.articleList
      }
    },
    getArticleById (id) {
      console.log(id);
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
        width: 130px;
        height: 60px;
      }
    }

    .contentInfo {
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      width: 100%;
      height: 60px;
      text-align: left;
      font-size: 14px;
    }
  }

  &:hover {
    transform: scale(1.005);
    transition: all 50ms linear;
  }

  .option {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .like {
      margin: 0 20px;
    }
  }
}
</style>
