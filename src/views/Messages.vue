<template>
  <div class="groupBox">
    <div
      class="bg-light-primary dark:bg-dark-modifier-active dark:text-dark-modifier-active cardStyl"
      v-for="(item, index) in arr"
      :key="item.id"
      @click="readMessage(item)">
      <div class="font-medium dark:text-dark-primary textBox">
        <div class="textStyl">
          <Badge status="error" v-if="item.id % 2 == 0" />
          <Badge status="default" v-else />
          {{ index + 1 }}.{{ item.text }}
        </div>
        <div class="textIcon"><Icon type="md-close" @click.stop="deleteMessage(item)" style="margin-right: 20px; cursor: pointer" /></div>
      </div>
    </div>

    <popup :visible.sync="visible">
      <template slot="footer">
        <button class="cancelBtn" @click="comfirm">取消</button>
        <button class="comfirmBtn" @click="cancel">已读</button>
      </template>
    </popup>
    <popup :visible.sync="delVisible" :title="'删除提醒'" :width="'20%'" @handleCancel="cancel" @handleComfirm="deleteComfirm">
      <template slot="body">
        <div>是否将已读/未读信息删除！！！</div>
      </template>
    </popup>
  </div>
</template>

<script>
import popup from "@/components/popupWindows";
export default {
  name: "Messages",
  data() {
    return {
      arr: [
        { id: 1, text: "cs" },
        { id: 2, text: "cs" },
        { id: 3, text: "cs" },
        { id: 4, text: "cs" },
        { id: 5, text: "cs" },
        { id: 0, text: "cs" },
        { id: 6, text: "cs" },
        { id: 7, text: "cs" },
        { id: 8, text: "cs" },
        { id: 9, text: "cs" },
      ],
      visible: false,
      delVisible: false,
    };
  },
  components: { popup },
  methods: {
    readMessage(item) {
      console.log(item.id);
      this.visible = true;
    },
    deleteMessage(item) {
      console.log(item.id);
      this.delVisible = true;
    },
    deleteComfirm() {
      this.delVisible = false;
    },
    cancel() {
      this.visible = false;
      this.delVisible = false;
    },
    comfirm() {
      this.visible = false;
    },
  },
};
</script>
<style scoped lang="less">
.cardStyl {
  cursor: pointer;
  border-radius: 4px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  margin-top: 5px;
  /*让长段文本不换行*/

  &:hover {
    transform: scale(1.005);
    transition: all 200ms linear;
  }
  .textStyl {
    width: 500px;
    white-space: nowrap;
    /*设置文本超出元素宽度部分隐藏*/
    overflow-x: hidden;
    /*设置文本超出部分用省略号显示*/
    text-overflow: ellipsis;
  }
  .textBox {
    display: flex;
    .textIcon {
      text-align: right;
      width: 100%;
    }
  }
}
.groupBox {
  height: 650px;
  padding: 10px;
  overflow-y: auto;
}
.comfirmBtn {
  border: 1px solid;
  border-radius: 4px;
  padding: 4px 16px;
  margin-right: 20px;
}
.cancelBtn {
  border: 1px solid;
  border-radius: 4px;
  padding: 4px 16px;
  margin-right: 20px;
}
.groupBox::-webkit-scrollbar {
  width: 6px !important;
  background: #fff !important;
  border-radius: 6px;
}
.groupBox::-webkit-scrollbar-thumb {
  background: #aaa !important;
  height: 6px !important;
  border-radius: 6px;
}
</style>
