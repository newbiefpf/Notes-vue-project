<template>
  <div>
    <div style="margin-top: 10px">
      <Form ref="dataInfo" :model="dataInfo" :rules="ruleCustom" :label-width="80">
        <FormItem label="标题" prop="title">
          <Input type="text" v-model="dataInfo.title" placeholder="请输入标题"></Input>
        </FormItem>
        <FormItem label="描述" prop="description">
          <Input v-model="dataInfo.description" type="textarea" :autosize="{ minRows: 1, maxRows: 1 }" placeholder="请输入描述"></Input>
        </FormItem>
        <FormItem label="分类" prop="classification">
          <Select v-model="dataInfo.classification" placeholder="请选择分类">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <div class="quillEditorStyl font-medium text-light-primary dark:text-dark-primary">
          <quillEditor v-model="content" ref="myQuillEditor" :options="editorOption" @change="onEditorChange($event)" @keydown.ctrl.native="keyDown">
          </quillEditor>
        </div>
        <FormItem style="margin-top: 15px">
          <Button @click="handleSubmit('dataInfo')">发布</Button>
          <Button @click="handleReset('dataInfo')" style="margin-left: 8px">清空</Button>
        </FormItem>
      </Form>
    </div>
    <popup :visible.sync="modalType" :width="'40%'" :title="'清空提醒'" @handleCancel="deleteData" @handleComfirm="deleteData">
      <template slot="body">
        <div class="font-medium text-light-primary dark:text-dark-primary">所有填写的类容将会被清空！！！</div>
      </template>
    </popup>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import popup from "@/components/popupWindows";

export default {
  name: "Profile",
  data() {
    return {
      content: "",
      editorOption: {
        placeholder: "",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
            ["blockquote", "code-block"], //引用，代码块
            [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            [{ list: "ordered" }, { list: "bullet" }], //列表
            [{ script: "sub" }, { script: "super" }], // 上下标
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            [{ direction: "rtl" }], // 文本方向
            [{ size: ["small", false, "large", "huge"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
            [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
            [{ font: [] }], //字体
            [{ align: [] }], //对齐方式

            ["image", "video"], //上传图片、上传视频
            ["clean"], //清除字体样式v
          ],
        },
      },
      modalType: false,
      keyOne: null,
      dataInfo: {},
      ruleCustom: {
        classification: [{ required: true, message: "文章分类必选", trigger: "change" }],
        description: [{ required: true, message: "文章描述必填", trigger: "blur" }],
        title: [{ required: true, message: "文章标题必填", trigger: "blur" }],
      },
    };
  },
  components: { quillEditor, popup },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    deleteData() {
      this.content = "";
      this.$refs.dataInfo.resetFields();
      this.modalType = false;
    },
    handleReset() {
      this.modalType = true;
    },
    keyDown(e) {
      if (e.code == "KeyS") {
        this.saveContent();
      }
    },
    saveContent() {
      console.log(this.content);
    },
    onEditorChange({ quill, html, text }) {
      console.log(quill, html, text);
      this.content = html;
    },
  },
  mounted() {
    document.onkeydown = function (e) {
      if (e.ctrlKey == true && e.code == "KeyS") {
        e.preventDefault();
      }
    };
  },
};
</script>
<style lang="less" scoped>
/deep/.ql-container {
  height: 300px !important;
}
</style>
