<template>
  <div>
    <div style="margin-top: 10px">
      <Form ref="dataInfo" :model="dataInfo" :rules="ruleCustom" :label-width="80">
        <Row>
          <Col span="12">
            <FormItem label="标题" prop="title">
              <Input type="text" v-model="dataInfo.title" placeholder="请输入标题"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="分类">
              <Select v-model="dataInfo.classify" placeholder="请选择分类">
                <Option value="1">New York</Option>
                <Option value="2">London</Option>
                <Option value="3">Sydney</Option>
                <Option value="4">sadasff</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="描述" prop="abstract">
              <Input v-model="dataInfo.abstract" type="textarea" :autosize="{ minRows: 1, maxRows: 1 }" placeholder="请输入描述"></Input>
            </FormItem>
          </Col>

          <Col span="5">
            <FormItem label="共享发布">
              <i-switch v-model="dataInfo.public" size="large">
                <template #open>
                  <span>On</span>
                </template>
                <template #close>
                  <span>Off</span>
                </template>
              </i-switch>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="封面">
              <UploadImg @sendImgPath="getImgPath" :imgList="defaultImgUrlList" />
            </FormItem>
          </Col>
        </Row>

        <div :class="[screenFullType ? 'quillEditorStyl' : '']" class="bg-white dark:bg-dark-secondary">
          <div class="font-medium text-light-primary dark:text-dark-primary">
            <div class="changeType">
              <Tooltip content="全屏" placement="bottom" v-if="!screenFullType">
                <Icon type="md-expand" size="24" @click="screenFull" class="iconOpt" />
              </Tooltip>
              <Tooltip content="取消全屏" placement="bottom" v-else>
                <Icon type="md-contract" size="24" @click="screenFull" class="iconOpt" />
              </Tooltip>
              <Tooltip content="发布" placement="bottom">
                <Icon type="md-cloud-upload" size="24" @click="handleSubmit('dataInfo')" class="iconOpt" />
              </Tooltip>
              <Tooltip content="清空" placement="bottom">
                <Icon type="ios-close-circle" size="24" @click="handleReset('dataInfo')" class="iconOpt" />
              </Tooltip>
            </div>
            <quillEditor
              class="quillEditorBox"
              :class="[screenFullType ? 'quillEditorMaxHeight' : 'quillEditorMinHeight']"
              v-model="dataInfo.contentHtml"
              ref="myQuillEditor"
              :options="editorOption"
              @change="onEditorChange($event)"
              @keydown.ctrl.native="keyDown">
            </quillEditor>
          </div>
        </div>
      </Form>
    </div>
    <popup :visible.sync="modalType" :width="'25%'" :title="'清空提醒'" @handleCancel="modalType = false" @handleComfirm="deleteData">
      <template slot="body">
        <div class="font-medium text-light-primary dark:text-dark-primary">所有填写的类容将会被清空！！！</div>
      </template>
    </popup>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import popup from "@/components/popupWindows";
import { articlePut, articleGet, articlePost } from "@/api/articale";
import UploadImg from "@/components/Upload/index.vue";
export default {
  name: "Profile",
  data() {
    return {
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

            ["image"], //上传图片、上传视频
            ["clean"], //清除字体样式v
          ],
        },
      },
      screenFullType: false,
      modalType: false,
      keyOne: null,
      dataInfo: {
        userId: null,
        title: null,
        abstract: null,
        contentHtml: null,
        classify: "1",
        public: true,
      },
      defaultImgUrlList: [],
      articleId: null,
      ruleCustom: {
        abstract: [{ required: true, message: "文章描述必填", trigger: "blur" }],
        title: [{ required: true, message: "文章标题必填", trigger: "blur" }],
      },
    };
  },
  components: { quillEditor, popup, UploadImg },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
    userInfo() {
      return this.$store.getters.userInfo;
    },
  },
  created() {
    this.getParams();
  },
  methods: {
    getImgPath(url) {
      this.dataInfo.imgUrl = url;
    },
    screenFull() {
      this.screenFullType = !this.screenFullType;
    },
    getParams() {
      this.articleId = this.$route.query.id;
      if (this.articleId) {
        articleGet({ id: this.articleId }).then((res) => {
          if (res.code == 200) {
            this.dataInfo.title = res.data.title;
            this.dataInfo.abstract = res.data.abstract;
            this.dataInfo.contentHtml = res.data.contentHtml;
            this.dataInfo.classify = res.data.classify;
            this.dataInfo.public = res.data.public;
            this.dataInfo.imgUrl = res.data.imgUrl;
            if (res.data.imgUrl != "") {
              this.defaultImgUrlList[0].response.data.push(res.data.imgUrl);
            }
          } else {
            this.$Message.error(res.msg);
          }
        });
      }
    },
    handleSubmit(name) {
      var vm = this;
      vm.$refs[name].validate((valid) => {
        if (valid) {
          vm.dataInfo.userId = vm.userInfo.ID;

          if (vm.articleId) {
            vm.dataInfo.id = Number(vm.articleId);
            articlePost(this.dataInfo).then((res) => {
              if (res.code == 200) {
                vm.$Message.success(res.msg);
                vm.$router.push("/home");
              } else {
                vm.$Message.error(res.msg);
              }
            });
          } else {
            articlePut(vm.dataInfo).then((res) => {
              if (res.code == 200) {
                vm.$Message.success(res.msg);
                vm.$router.push("/home");
              } else {
                vm.$Message.error(res.msg);
              }
            });
          }
          this.dataInfo.imgUrl = "";
        } else {
          this.dataInfo.imgUrl = "";
          return;
        }
      });
    },
    deleteData() {
      this.dataInfo.contentHtml = "";
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
      console.log(this.dataInfo.contentHtml);
    },
    onEditorChange({ quill, html, text }) {
      // console.log(quill, html, text);
      this.dataInfo.contentHtml = html;
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
.changeType {
  margin-left: 30px;
  .iconOpt {
    padding: 4px 8px;
    cursor: pointer;
  }
}
.quillEditorMaxHeight {
  height: 90vh !important;
}
.quillEditorMinHeight {
  height: 50vh !important;
  margin-bottom: 70px;
}
/deep/.ql-editor::-webkit-scrollbar {
  width: 6px !important;
  background: #fff !important;
  border-radius: 6px;
}
/deep/.ql-editor::-webkit-scrollbar-thumb {
  background: #aaa !important;
  height: 6px !important;
  border-radius: 6px;
}
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
</style>
