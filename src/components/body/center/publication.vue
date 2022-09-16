<template>
  <div>
    <div v-show="!steps" class="">
      <el-form label-position="right" :model="article">
        <el-form-item label="主题">
          <el-input type="textarea" v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="简介">
          <el-input type="textarea" v-model="article.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="nextShow()">下一步</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-show="steps">
      <MarkdownPro :autoSave="true" :interval="5000" theme="oneDark" @on-save="handleOnSave" />
      <MarkdownPreview />
      <el-row style="text-align: center">
        <el-button style="margin-top: 20px" type="primary" @click="nextShow()">添加主题/封面</el-button>
        <el-button type="success" @click="onSubmit">发布</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import { MarkdownPro, MarkdownPreview } from "vue-meditor";
export default {
  name: "publicationIndex",
  data () {
    return {
      steps: true,
      imageUrl: "",
      headers: "123",
      article: {
        title: "",
        imgUrl: "",
        abstract: "",
        contentHtml: ""
      },
    };
  },
  components: {
    MarkdownPro,
    MarkdownPreview,
  },
  methods: {
    handleOnSave ({ value, theme }) {
      console.log(value, theme);
      this.article.contentHtml = value
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    nextShow () {
      this.steps = !this.steps;
    },
    onSubmit () {
    },
  },
};
</script>

<style lang="less" scoped>
.el-form {
  margin: 0 auto;
  width: 90%;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
