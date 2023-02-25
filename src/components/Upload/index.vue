<template>
  <div>
    <div class="demo-upload-list" v-for="item in uploadList">
      <template v-if="item.status === 'finished'">
        <img :src="item.response.data[0]" fit="cover" width="100%" height="100%" />
        <div class="demo-upload-list-cover">
          <Icon type="ios-trash-outline" @click="handleRemove(item)"></Icon>
        </div>
      </template>
      <template v-else>
        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
      </template>
    </div>
    <Upload
      ref="upload"
      :show-upload-list="false"
      :default-file-list="defaultList"
      :on-success="handleSuccess"
      :format="['jpg', 'jpeg', 'png']"
      :max-size="2048"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      multiple
      type="drag"
      :action="uploadAction"
      :headers="authorization"
      style="display: inline-block; width: 58px">
      <div style="width: 58px; height: 58px; line-height: 58px">
        <Icon type="ios-camera" size="20"></Icon>
      </div>
    </Upload>
  </div>
</template>
<script>
export default {
  data() {
    return {
      uploadAction: "http://localhost:8888/api/uploadImages",
      authorization: null,

      urlString: "",
      defaultList: [],
      imgName: "",
      visible: false,
      uploadList: [],
    };
  },
  props: {
    imgList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  created() {
    this.defaultList = this.imgList;
    this.getAuthorization();
  },
  methods: {
    getAuthorization() {
      const token = "Bearer " + this.$store.getters.access_token;
      this.authorization = {
        Authorization: token,
      };
    },

    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess(res, file) {
      if (res.code == 200) {
        this.uploadList = this.$refs.upload.fileList;
        console.log(this.uploadList);
        if (this.urlString == "") {
          this.urlString = res.data[0];
        } else {
          this.urlString = this.urlString + "," + res.data[0];
        }
        this.$emit("sendImgPath", this.urlString);
      }
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc: "文件" + file.name + " 格式不正确，请选择jpg,jpeg,png。",
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "超过文件大小限制",
        desc: "文件  " + file.name + " 太大了，不能超过2M。",
      });
    },
    handleBeforeUpload() {
      if (this.uploadList.length) {
        this.$Message.info("只能有一个封面哦");
        return false;
      }
    },
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
  },
};
</script>
<style>
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
