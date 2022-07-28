<template>
  <div class="rightContent">
    <div class="articleInfo">目录</div>
    <div class="articleInfo">评论</div>
  </div>
</template>

<script>
export default {
  name: "articleInformation",
};
</script>
<style lang="less" scoped>
.rightContent {
  margin: 0 auto;
  width: 92%;
  .headImg {
    width: 100%;
    height: 350px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .contactDetails {
    height: 80px;
  }
  .articleInfo {
    height: 60px;
    border: 1px solid red;
    display: flex;
    /*主轴上的对齐方式为居中*/
    justify-content: center;
    /*交叉轴上对齐方式为居中*/
    align-items: center;
  }
}
</style>
