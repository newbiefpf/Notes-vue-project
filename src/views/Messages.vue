<template>
  <div class="groupBox">
    <div class="groupBoxLeft">
      <Card class="bg-white dark:bg-dark-secondary rounded-md flex flex-col p-4 gap-3 border border-gray-100 dark:border-gray-600" dis-hover>
        <template #title>私信消息</template>
        <div
          class="bg-light-primary dark:bg-dark-modifier-active dark:text-dark-modifier-active cardStyl"
          v-for="(item, index) in chatMessageList"
          :key="item.id"
          @click="readMessageLfte(item.groupName)">
          <div class="font-medium dark:text-dark-primary textBox">
            <div class="textStyl">{{ index + 1 }}.你和用户{{ item.groupName[0].toUserId }}的私信</div>
            <div class="textIcon"><Icon type="md-close" @click.stop="deleteMessageLeft(item)" style="margin-right: 20px; cursor: pointer" /></div>
          </div>
        </div>
      </Card>
    </div>
    <div class="groupBoxRight">
      <Card class="bg-white dark:bg-dark-secondary rounded-md flex flex-col p-4 gap-3 border border-gray-100 dark:border-gray-600" dis-hover>
        <template #title>系统消息</template>
        <div
          class="bg-light-primary dark:bg-dark-modifier-active dark:text-dark-modifier-active cardStyl"
          v-for="(item, index) in messageList"
          :key="item.id"
          @click="readMessageRight(item)">
          <div class="font-medium dark:text-dark-primary textBox">
            <div class="textStyl">
              <Badge status="error" v-if="item.mark" />
              <Badge status="default" v-else />
              {{ index + 1 }}.{{ item.message }}
            </div>
            <div class="textIcon"><Icon type="md-close" @click.stop="deleteMessageRight(item.ID)" style="margin-right: 20px; cursor: pointer" /></div>
          </div>
        </div>
      </Card>
    </div>

    <popup :visible.sync="visibleLeft">
      <template slot="body">
        <div><Badge status="success" />在线/离线</div>
        <replyChat v-if="visibleLeft" @addMessage="addMessage" :dataInfo="dataArrInfo" />
      </template>
      <template slot="footer">
        <button class="cancelBtn" @click="cancel">关闭</button>
      </template>
    </popup>
    <popup :visible.sync="visibleRight" :title="'系统消息'">
      <template slot="body">
        {{ dataInfo.message }}
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
import { messagesGet, messagePost, messageDelete, chatMessageGet } from "@/api/message";
import { fmdata } from "@/utils/formatDate.js";
export default {
  name: "Messages",
  data() {
    return {
      messageList: [],
      chatMessageList: [],
      visible: false,
      visibleLeft: false,
      visibleRight: false,
      delVisible: false,
      dataInfo: {},
      dataArrInfo: [],
      deleteId: null,
      messageItem: null,
      toUserId: null,
    };
  },
  filters: {
    fmtime(val) {
      return fmdata(val);
    },
  },
  components: { popup, replyChat },
  watch: {
    // 监听websocket返回的信息
    "$store.state.wsData"(data) {
      if (data.type == "chat") {
        this.dataArrInfo.push({
          created_at: data.date,
          deleted_at: null,
          groupArr: data.groupName,
          message: data.content,
          toUserId: data.to_user_id,
          updated_at: data.date,
          user_id: data.form_user_id,
        });
      }
    },
    visibleLeft(val) {
      if (!val) {
        var data = {
          msg: {
            chat_msg_type: 2,
            data: {
              to_user_id: this.toUserId,
              user_id: this.$store.getters.userInfo.ID,
              content: "离开了哦",
              type: "online",
            },
          },
        };
        this.$initWs.send(data);
      }
    },
  },
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
      chatMessageGet().then((res) => {
        if (res.code == 200) {
          this.chatMessageList = res.data.list.filter((item) => item);
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    readMessageLfte(item) {
      this.dataArrInfo = item;
      this.toUserId = null;
      let list = item.filter((item) => item.user_id != this.$store.getters.userInfo.ID);
      this.toUserId = list[0].user_id;
      var data = {
        msg: {
          chat_msg_type: 2,
          data: {
            to_user_id: this.toUserId,
            user_id: this.$store.getters.userInfo.ID,
            content: "上线了",
            type: "online",
          },
        },
      };
      this.$initWs.send(data);
      this.visibleLeft = true;
    },
    addMessage(data, groupName) {
      let date = new Date();
      this.dataArrInfo.push({
        created_at: date,
        deleted_at: null,
        groupArr: groupName,
        message: data.content,
        toUserId: data.to_user_id,
        updated_at: date,
        user_id: this.$store.getters.userInfo.ID,
      });
    },
    readMessageRight(item) {
      this.dataInfo = item;
      this.visibleRight = true;
    },
    deleteMessageRight(id) {
      this.deleteId = id;
      this.delVisible = true;
    },
    deleteMessageLeft(id) {
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
      this.visibleRight = false;
      this.visibleLeft = false;
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
  display: flex;
  // flex-wrap: wrap;
  .groupBoxLeft {
    width: 50%;
    margin-right: 10px;
  }
  .groupBoxRight {
    margin-left: 10px;
    width: 50%;
  }
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
