<template>
  <div>
    <div class="contentList" v-if="detialsShow">
      <div class="content" @click="getArticleById(-1)">
        <div class="title">
          交换机与路由器技术：VLAN Trunk、单臂路由和三层交换及配置
        </div>
        <div class="contentBody">
          <div class="contentImg">
            <img src="@/assets/img/title.png" />
          </div>
          <div class="contentInfo">
            <div>
              当没有VLAN
              Trunk，两台交换机之间，两个不同的vlan发送报文，就会消耗2对物理接口。如果更多vlan发送报文，就会占用更多的物理接口，而物理接口很珍贵。
              所以我们可以用Trunk整合接口，只消耗一个物理接口，所有vlan都通过trunk链路与自己vlan的主机进行通信。
              当没有VLAN
              Trunk，两台交换机之间，两个不同的vlan发送报文，就会消耗2对物理接口。如果更多vlan发送报文，就会占用更多的物理接口，而物理接口很珍贵。
              所以我们可以用Trunk整合接口，只消耗一个物理接口，所有vlan都通过trunk链路与自己vlan的主机进行通信。
              当没有VLAN
              Trunk，两台交换机之间，两个不同的vlan发送报文，就会消耗2对物理接口。如果更多vlan发送报文，就会占用更多的物理接口，而物理接口很珍贵。
              所以我们可以用Trunk整合接口，只消耗一个物理接口，所有vlan都通过trunk链路与自己vlan的主机进行通信。
              当没有VLAN
              Trunk，两台交换机之间，两个不同的vlan发送报文，就会消耗2对物理接口。如果更多vlan发送报文，就会占用更多的物理接口，而物理接口很珍贵。
              所以我们可以用Trunk整合接口，只消耗一个物理接口，所有vlan都通过trunk链路与自己vlan的主机进行通信。
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
  name: "communityIndex",
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
