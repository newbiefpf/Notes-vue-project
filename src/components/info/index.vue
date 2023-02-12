<template>
  <div class="groubAll">
    <div class="backtrack">
      <Icon type="ios-undo" size="30" @click="backtrack" />
      &nbsp; &nbsp; &nbsp; &nbsp;
      <Icon type="ios-create" size="30" @click="updateArticle" />
      &nbsp; &nbsp; &nbsp; &nbsp;
      <Icon type="md-trash" size="30" @click="modalType = true" />
    </div>
    <div class="ql-container ql-snow">
      <div class="ql-editor" data-gramm="false" contenteditable="false" v-html="str"></div>
    </div>
    <popup :visible.sync="modalType" :width="'40%'" :title="'删除提醒'" @handleCancel="modalType = false" @handleComfirm="deleteData">
      <template slot="body">
        <div class="font-medium text-light-primary dark:text-dark-primary">你确定删除{{ articleInfo.title }}相关的数据吗！！！</div>
      </template>
    </popup>
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
<style scoped>
.groubAll {
  height: 700px;
  width: 100%;
  padding-bottom: 60px;
}
.backtrack {
  margin-top: -15px;
  cursor: pointer;
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
