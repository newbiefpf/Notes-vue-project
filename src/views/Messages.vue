<template>
  <div class="groupBox">
    <div
      class="bg-light-primary dark:bg-dark-modifier-active dark:text-dark-modifier-active cardStyl"
      v-for="(item, index) in messageList"
      :key="item.id"
      @click="readMessage(item)">
      <div class="font-medium dark:text-dark-primary textBox">
        <div class="textStyl">
          <Badge status="error" v-if="item.mark" />
          <Badge status="default" v-else />
          {{ index + 1 }}.{{ item.message }}
        </div>
        <div class="textIcon"><Icon type="md-close" @click.stop="deleteMessage(item.ID)" style="margin-right: 20px; cursor: pointer" /></div>
      </div>
    </div>

    <popup :visible.sync="visible">
      <template slot="body">
        <replyChat :dataInfo="dataInfo" />
      </template>
      <template slot="footer">
        <button class="cancelBtn" @click="cancel">取消</button>
        <button class="comfirmBtn" @click="comfirm">已读</button>
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
import replyChat from "@/components/replyChat";
import { messagesGet, messagePost, messageDelete } from "@/api/message";
import { fmdata } from "@/utils/formatDate.js";
export default {
  name: "Messages",
  data() {
    return {
      messageList: [],
      visible: false,
      delVisible: false,
      dataInfo: {},
      deleteId: null,
    };
  },
  filters: {
    fmtime(val) {
      return fmdata(val);
    },
  },
  components: { popup, replyChat },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      messagesGet().then((res) => {
        if (res.code == 200) {
          this.messageList = res.data.list;
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    readMessage(item) {
      this.dataInfo = item;
      this.visible = true;
    },
    deleteMessage(id) {
      this.deleteId = id;
      this.delVisible = true;
    },
    deleteComfirm() {
      if (this.deleteId) {
        messageDelete({ id: this.deleteId }).then((res) => {
          if (res.code == 200) {
            this.$Message.success(res.msg);
            var data = {
              msg: {
                chat_msg_type: 2,
                data: {
                  to_user_id: this.$store.getters.userInfo.ID,
                  content: "ping",
                  type: "test",
                },
              },
            };
            this.$initWs.send(data);
            this.getData();
          } else {
            this.$Message.error(res.msg);
          }
        });
      }

      this.delVisible = false;
    },
    cancel() {
      this.visible = false;
      this.delVisible = false;
    },
    comfirm() {
      messagePost({ id: this.dataInfo.ID }).then((res) => {
        if (res.code == 200) {
          this.$Message.success(res.msg);
          this.getData();
          var data = {
            msg: {
              chat_msg_type: 2,
              data: {
                to_user_id: this.$store.getters.userInfo.ID,
                content: "ping",
                type: "test",
              },
            },
          };
          this.$initWs.send(data);
        } else {
          this.$Message.error(res.msg);
        }
      });
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
