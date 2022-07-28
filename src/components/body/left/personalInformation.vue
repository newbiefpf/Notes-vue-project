<template>
  <div class="leftContent">
    <div class="headPortrait">
      <div class="headImg">
        <img src="@/assets/img/aware.jpg" alt="加载失败" />
      </div>
      <div class="contactDetails"></div>
    </div>
    <div class="userInfo">
      <div>昵称</div>
      <div>职业</div>
    </div>
    <div class="articleInfo">
      <div>文章</div>
      <div>周发表</div>
      <div>粉丝</div>
    </div>

    <div class="operation">
      <div>关注</div>
      <div>私信</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "personalInformation",
};
</script>
<style lang="less" scoped>
.leftContent {
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
  .userInfo {
    height: 60px;
    border: 1px solid red;
    display: flex;
    /*主轴上的对齐方式为居中*/
    justify-content: center;
    /*交叉轴上对齐方式为居中*/
    align-items: center;
  }
  .articleInfo {
    padding-top: 20px;
    padding-bottom: 20px;
    height: 40px;
    border: 1px solid red;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .operation {
    height: 40px;
    border: 1px solid red;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
