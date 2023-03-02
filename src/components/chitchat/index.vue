<template>
  <div>
    <div class="commentBox">
      <div class="commentPer">
        <Avatar size="50" :src="imgUrl">USER</Avatar>
      </div>
      <div class="commentInfo">
        <div class="commentOption">
          <div class="name">
            {{ name }}</span>
          </div>
          <div class="time">{{ dataTime | fmtime }}</div>
          <div class="report" @click="report">举报</div>
          <div class="reply" @click="reply()" v-if="!parent">回复</div>
          <div class="like" @click="like">点赞</div>
        </div>

        <div>
          {{ content }}
          <slot name="childchitchat"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fmdata } from "@/utils/formatDate.js";
export default {
  name: "chitchat",
  props: {
    parent: {
      type: Number,
    },
    replyId: {
      type: Number,
    },
    imgUrl: {
      type: String,
      default: "新头像地址",
    },
    content: {
      type: String,
      default: "这是评论类容的地方",
    },
    name: {
      type: String,
      default: "用户名",
    },
    dataTime: {
      type: String,
      default: "评论时间",
    },
  },
  filters: {
    fmtime(val) {
      return fmdata(val);
    },
  },
  data() {
    return {};
  },
  methods: {
    report() {},
    reply() {
      this.$emit("replyMessage",this.replyId)
    },
    like() {},
  },
};
</script>
<style lang="less">
.commentBox {
  display: flex;
  align-items: flex-start;
  padding: 12px 8px;
  width: 100%;
  .commentPer {
    margin-right: 6px;
    overflow: hidden;
  }
  .commentInfo {
    width: 100%;
    .commentOption {
      display: flex;
      width: 100%;
      .name {
        width: 30%;
        white-space: nowrap; //文本强制不换行；
        text-overflow: ellipsis; //文本溢出显示省略号；
        overflow: hidden; //溢出的部分隐藏；
        text-align: left;
      }
      .time {
        text-align: center;

        width: 35%;
      }
      .report {
        text-align: center;
        width: 10%;
        cursor: pointer;
      }
      .reply {
        text-align: center;
        width: 10%;
        cursor: pointer;
      }
      .like {
        text-align: center;
        width: 10%;
        cursor: pointer;
      }
    }
  }
}
</style>
