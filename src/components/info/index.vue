<template>
  <div class="groubAll">
    <div :class="[screenFullType ? 'quillEditorStyl' : '']" class="bg-white dark:bg-dark-secondary">
      <div class="backtrack">
        <Icon type="md-expand" size="24" @click="screenFull" class="iconOpt" v-if="!screenFullType" />
        <Icon type="md-contract" size="24" @click="screenFull" class="iconOpt" v-else />
        <Icon type="ios-undo" size="24" class="iconOpt" @click="backtrack" />
        <Icon type="ios-create" size="24" class="iconOpt" @click="updateArticle" />
        <Icon type="md-trash" size="24" class="iconOpt" @click="modalType = true" />
      </div>

      <div class="ql-container ql-snow">
        <div
          class="ql-editor font-medium text-light-primary dark:text-dark-primary"
          :style="screenFullType ? ' height: 96vh' : 'height: 75vh'"
          data-gramm="false"
          contenteditable="false"
          v-html="str"></div>
      </div>
      <popup :visible.sync="modalType" :width="'25%'" :title="'删除提醒'" @handleCancel="modalType = false" @handleComfirm="deleteData">
        <template slot="body">
          <div class="font-medium text-light-primary dark:text-dark-primary">你确定删除{{ articleInfo.title }}相关的数据吗！！！</div>
        </template>
      </popup>
    </div>
  </div>
</template>

<script>
import popup from "@/components/popupWindows";
import { articleDelete } from "@/api/articale";
export default {
  name: "Info",
  data() {
    return {
      str: "",
      modalType: false,

      screenFullType: true,
    };
  },
  components: { popup },

  props: {
    articleInfo: {
      type: Object,
    },
  },
  created() {
    this.str = this.articleInfo.contentHtml;
  },
  methods: {
    screenFull() {
      this.screenFullType = !this.screenFullType;
    },
    deleteData() {
      articleDelete({ id: this.articleInfo.id }).then((res) => {
        if (res.code == 200) {
          this.$emit("getData");
          this.$Message.success("删除成功！！！");
          this.$parent.InfoShow = true;
        } else {
          this.$Message.console.error(res.msg);
        }
      });
      this.modalType = false;
    },
    backtrack() {
      this.$parent.InfoShow = true;
      console.log(this.$parent.InfoShow);
    },
    updateArticle() {
      this.$router.push({
        path: "/profile",
        query: {
          id: this.articleInfo.id,
        },
      });

      // this.$parent.InfoShow = true;
    },
  },
};
</script>
<style scoped lang="less">
.quillEditorStyl {
  position: absolute;
  margin: 0;
  padding: 0;
  left: 0;
  top: 0;
  z-index: 10;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
.groubAll {
  height: 700px;
  width: 100%;
  padding-bottom: 60px;
}
.backtrack {
  margin-top: 0px;
  .iconOpt {
    padding: 4px 8px;
    cursor: pointer;
  }
}

.ql-editor::-webkit-scrollbar {
  width: 6px !important;
  background: #fff !important;
  border-radius: 6px;
}
.ql-editor::-webkit-scrollbar-thumb {
  background: #aaa !important;
  height: 6px !important;
  border-radius: 6px;
}
</style>
