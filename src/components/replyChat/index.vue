<template>
  <div>
    <Card class="bg-white dark:bg-dark-secondary z-50 rounded-md flex flex-col p-4 gap-3 border border-gray-100 dark:border-gray-600">
      <template #title>消息通知</template>
      <div>
        <div class="noticeBox noticeFlex">
          <div class="noticeHead">
            <div class="imgsyl">
              <img src="@/assets/photo.jpeg" alt="出错了" srcset="" />
            </div>
          </div>
          <div class="noticeInfo">
            <div class="noticeTitleLeft noticeFlex">
              <div class="name">名称</div>
              <div class="time">回复时间{{ dataInfo.CreatedAt | fmtime }}</div>
            </div>
            <div class="noticeCotent">
              {{ dataInfo.message }}
            </div>
          </div>
        </div>
        <div class="noticeBox noticeFlex">
          <div class="noticeInfo">
            <div class="noticeTitleRight noticeFlex">
              <div class="time">回复时间{{ dataInfo.CreatedAt | fmtime }}</div>
              <div class="name">名称</div>
            </div>
            <div class="noticeCotent">
              {{ dataInfo.message }}1asdf asdf sadf asdf sadfgdh
              的风格和风格的和的风格法定规划的风格和的风格和的风格和的风格和风格的和法国风格的恢复供电的风格活动分工和的风格
              和感觉地方撒公司阿萨的方式爱德华廉洁奉公啊收到了工卡圣诞节离开啥地方感觉卢卡斯德国的福利就卡死的高发受到广泛卡拉受到广泛拉萨大哥是垃圾卡是江户时代法国好高级啊的安徽省阿斯顿嘎斯了拉到咖喱当时法国拉萨就看到过弗利卡式的了阿斯兰的就爱上了看得出过来就卡死的给疯狂拉升的肌肤拉萨地方关键是拉开绝对国防拉山口见到过发送多个发生了的功夫拉萨的2
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
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  filters: {
    fmtime(val) {
      return fmdata(val);
    },
  },
  methods: {
    sendMessage() {},
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
      padding: 0px 4px;
    }
  }
  .noticeTitleRight {
    font-size: 16px;
    justify-content: right;
    .time {
      padding: 0px 4px;
    }
    .name {
      padding: 0px 10px;
    }
  }
  .noticeCotent {
    padding: 4px 0px;
    font-size: 16px;
    word-wrap: break-word;
  }
}
</style>
