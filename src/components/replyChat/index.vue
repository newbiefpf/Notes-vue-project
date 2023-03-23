<template>
  <div>
    <Card class="mian bg-white dark:bg-dark-secondary z-50 rounded-md flex flex-col p-4 gap-3 border border-gray-100 dark:border-gray-600" ref="main">
      <template #title>私信通知</template>
      <div v-for="(item, index) in dataInfo" :key="index">
        <div class="noticeBox noticeFlex" v-if="item.user_id != userInfo.ID">
          <div class="noticeHead">
            <div class="imgsyl">
              <img src="@/assets/photo.jpeg" alt="出错了" srcset="" />
            </div>
          </div>
          <div class="noticeInfo">
            <div class="noticeTitleLeft noticeFlex">
              <div class="name">名称{{ item.user_id }}</div>
              <div class="time">回复时间：{{ item.created_at | fmtime }}</div>
            </div>
            <div class="noticeCotentLeft">
              {{ item.message }}
            </div>
          </div>
        </div>

        <div class="noticeBox noticeFlex" v-else>
          <div class="noticeInfo">
            <div class="noticeTitleRight noticeFlex">
              <div class="time">回复时间：{{ item.created_at | fmtime }}</div>
              <div class="name">名称{{ item.user_id }}</div>
            </div>
            <div class="noticeCotentRight">
              {{ item.message }}
            </div>
          </div>
          <div class="noticeHead">
            <div class="imgsyl">
              <img src="@/assets/photo.jpeg" alt="出错了" srcset="" />
            </div>
          </div>
        </div>
      </div>
      <div style="display: flex">
        <textarea
          rows="1"
          class="block px-4 py-1.5 text-base font-normal text-light-primary dark:text-white bg-light-primary dark:bg-dark-primary bg-clip-padding rounded-md transition ease-in-out m-0 dark:focus:text-white focus:border-sky-blue focus:outline-none"
          style="width: 80%"
          v-model="replyMessage"
          placeholder="请输入回复类容"></textarea>
        <button
          @click="sendMessage"
          class="bg-sky-blue dark:bg-dark-primary px-7 rounded-md text-white flex items-center gap-3"
          style="margin-left: 3%">
          发送
        </button>
      </div>
    </Card>
  </div>
</template>
<script>
import { fmdata } from "@/utils/formatDate.js";
export default {
  data() {
    return {
      replyMessage: "",
    };
  },
  props: {
    dataInfo: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  filters: {
    fmtime(val) {
      return fmdata(val);
    },
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    },
  },
  watch: {
    dataInfo: {
      //深度监听，可监听到对象、数组的变化
      handler() {
        this.$nextTick(() => {
          this.$refs.main.$el.scrollTop = this.$refs.main.$el.scrollHeight;
        });
      },
      deep: true,
    },
  },
  methods: {
    sendMessage() {
      if (this.replyMessage == "") {
        this.$Message.error("发送类容不能为空！！！");
        return;
      }
      let list = this.dataInfo.filter((item) => item.user_id != this.userInfo.ID);
      let date = new Date();
      var data = {
        msg: {
          chat_msg_type: 2,
          data: {
            to_user_id: list[0].user_id,
            user_id: this.userInfo.ID,
            groupName: list[0].groupArr,
            date: date,
            content: this.replyMessage,
            type: "chat",
          },
        },
      };
      this.$initWs.send(data);
      this.$emit("addMessage", data.msg.data, list[0].groupArr);
      this.replyMessage = "";
      this.$nextTick(() => {
        this.$refs.main.$el.scrollTop = this.$refs.main.$el.scrollHeight;
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.main.$el.scrollTop = this.$refs.main.$el.scrollHeight;
    });
  },
};
</script>
<style scoped lang="less">
.noticeFlex {
  display: flex;
  align-content: center;
}
.noticeBox {
  margin: 30px 0px;
  width: 100%;
  .noticeHead {
    width: 5%;
    .imgsyl {
      border-radius: 10px;
      overflow: hidden;
    }
  }
  .noticeInfo {
    padding: 4px 8px;
    width: 95%;
  }
  .noticeTitleLeft {
    font-size: 16px;
    justify-content: left;
    .time {
      padding: 0px 10px;
    }
    .name {
      padding: 0px 30px;
    }
  }
  .noticeTitleRight {
    font-size: 16px;
    justify-content: right;
    .time {
      padding: 0px 4px;
    }
    .name {
      padding: 0px 30px;
    }
  }
  .noticeCotentLeft {
    padding: 4px 30px;
    font-size: 20px;
    font-weight: bolder;
    word-wrap: break-word;
  }
  .noticeCotentRight {
    text-align: right;
    padding: 4px 30px;
    font-size: 20px;
    font-weight: bolder;
    word-wrap: break-word;
  }
}
.mian {
  max-height: 500px;
  overflow: hidden;
  overflow-y: auto;
}
.mian::-webkit-scrollbar {
  width: 6px !important;
  background: #fff !important;
  border-radius: 6px;
}
.mian::-webkit-scrollbar-thumb {
  background: #aaa !important;
  height: 6px !important;
  border-radius: 6px;
}
</style>
