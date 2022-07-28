<template>
  <div>
    <div class="contentList" v-if="detialsShow">
      <div class="content" @click="getArticleById(-1)">
        <div class="title">中职磐云网络安全大赛-------隐藏信息探索</div>
        <div class="contentBody">
          <div class="contentImg">
            <img src="@/assets/img/title.png" />
          </div>
          <div class="contentInfo">
            <div>
              AOP（Aspect Oriented
              Programming）：面向切面编程，它是一种思想，它是对某一类事情的集中处理。比如用户登录权限的效验，没学
              AOP
              之前，我们所有需要判断用户登录的页面（中的方法），都要各自实现或调用用户验证的方法，然而有了
              AOP
              之后，我们只需要在某一处配置一下，所有需要判断用户登录页面（中的方法）就全部可以实现用户登录验证了，不再需要每个方法中都写相同的用户登录验证了。
              ————————————————
              版权声明：本文为CSDN博主「澄白易」的原创文章，遵循CC 4.0
              BY-SA版权协议，转载请附上原文出处链接及本声明。
              原文链接：https://blog.csdn.net/m0_59140023/article/details/126012680
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
export default {
  name: "homeIndex",
  data() {
    return {
      detialsShow: true,
    };
  },
  methods: {
    getArticleById(id) {
      console.log(id);
      this.detialsShow = false;
    },
    cs(type) {
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
