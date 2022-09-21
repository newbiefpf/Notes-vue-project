<template>
  <div>
    <!-- 上传文件按钮 -->
    <div class="in_block" @click="getSpaceMethod()">
      <span v-if="attachment.length" class="verticall ml_10 col2c pointer font13">
        <i class="el-icon-upload mr_10"></i>
        <span>查看附件 ({{ attachment.length }})</span></span>
      <span v-else class="verticall ml_10 col2c pointer font13" @click="getSpaceMethod()">
        <i class="el-icon-upload mr_10"></i>
        <span>{{ $t("addAttachment") }}</span>
      </span>
    </div>
    <el-dialog title="上传附件" :visible.sync="uploadDia" append-to-body :close-on-click-modal="false" width="760px">
      <div>
        <el-upload class="upload-demo" ref="upload" :action="qiniuDomain(spaceData.region)" :on-change="fileChange"
          :on-progress="fileProgress" :http-request="customerUpload" :before-upload="beforeUpload"
          :on-success="handleSuccess" :on-error="handleError" :auto-upload="false" multiple :show-file-list="false"
          :file-list="uploadFileList">
          <template #trigger>
            <el-button size="small">选取文件</el-button>
          </template>
          <el-button class="right" :disabled="!uploadFileList.length" size="small" type="primary" @click="submitUpload">
            上传</el-button>
        </el-upload>
        <!-- 文件列表信息 -->
        <div v-if="uploadFileList.length" class="progress-box">
          <div class="list-item">
            <div class="item-name">名称</div>
            <div class="item-size">大小</div>
            <div class="item-progress">文件进度</div>
            <div class="item-status">状态</div>
            <div class="item-operate">操作</div>
          </div>
          <div v-for="(item, index) in uploadFileList" :key="item.uid">
            <div class="list-item">
              <div class="item-name">
                <span>{{ index + 1 }}.{{ item.name }}</span>
              </div>
              <div class="item-size">
                {{ $util.getFileSize(item.size) }}
              </div>
              <div class="item-progress">
                <el-progress :percentage="Number(item.percentage.toFixed(0))" />
              </div>
              <div class="item-status">
                <i :class="fileStatuIcon(item.status)"></i>
                {{ item.status | fileStatus }}
              </div>
              <div class="item-operate">
                <el-popconfirm hideIcon title="确定删除当前文件吗？" @confirm="delFile(item.name, index)">
                  <template #reference>
                    <span class="coldel pointer">删除</span>
                  </template>
                </el-popconfirm>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="progress-box vertical">请选择文件上传</div>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="uploadDia = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as qiniu from "qiniu-js";
import axios from "axios";
import Vue from "vue";
// 单个文件的状态 对应描述
const fileStatus = {
  ready: {
    code: "ready",
    name: "待上传",
  },
  wait: {
    code: "wait",
    name: "待上传",
  },
  uploading: {
    code: "uploading",
    name: "上传中",
  },
  success: {
    code: "success",
    name: "成功",
  },

  fail: {
    code: "fail",
    name: "失败",
  },
  error: {
    code: "error",
    name: "失败",
  },
  secondPass: {
    code: "secondPass",
    name: "已秒传",
  },
  pause: {
    code: "pause",
    name: "暂停",
  },
  resume: {
    code: "resume",
    name: "恢复",
  },
};
export default {
  props: {
    //做数据回显时传入的文件列表数据
    //每一项格式{    file_ext: "", file_name: "",file_path: "",file_size:"" } 我这里是这样的
    curFileList: {
      type: Array,
      default () {
        return [];
      },
    },
    //是做添加附件还是需要附件的回显(默认是添加)
    isAddItem: {
      type: Boolean,
      default () {
        return false;
      },
    },
  },
  data () {
    return {
      uploadDia: false,
      spaceData: {
        mime: [], //后台限制的文件格式
        space: "", //存储空间标识(七牛云or阿里云)
        domain: "", //存储域名
        token: "",
        unique_key: "",
        region: "10", //存储区域
      },
      uploadFileList: [], //上传文件列表  {name,size,percentage,status,uid}  uid唯一标识
      attachment: [], //已上传文件列表 与父组件的数据对应
    };
  },

  filters: {
    fileStatus (status) {
      return fileStatus[status].name;
    },
  },
  computed: {
    //文件上传状态的图标
    fileStatuIcon () {
      return function (status) {
        let className = "";
        switch (status) {
          case "uploading":
            className = "el-icon-loading";
            break;
          case "success":
          case "secondPass":
            className = "el-icon-circle-check";
            break;
          case "error":
            className = "el-icon-circle-close";
            break;
        }
        return className;
      };
    },

    qiniuDomain () {
      return function (region) {
        switch (region) {
          case "10":
            return "https://upload.qiniup.com";
          case "20":
            return "https://upload-z1.qiniup.com";
          case "30":
            return "https://upload-z2.qiniup.com";
          case "40":
            return "https://upload-na0.qiniup.com";
          case "50":
            return "https://upload-as0.qiniup.com";
          default:
            return "https://upload-z1.qiniup.com";
        }
      };
    },
  },
  mounted () {
    //数据回显时 将父组件传来的文件列表同步显示到页面
    this.uploadFileList = this.curFileList.map((item) => {
      return {
        name: item.file_name, //文件名称(必须)
        size: item.file_size, //文件大小(必须)
        percentage: 100, //设置上传进度为100
        status: "success", //设置上传状态为成功
      };
    });
    this.attachment = this.curFileList;
  },
  methods: {
    //手动上传文件
    submitUpload () {
      this.$refs.upload.submit();
    },

    //附件改变（增加删除时）
    fileChange (file, fileList) {
      const index = this.uploadFileList.findIndex(
        (item) => item.name == file.name
      );

      if (index == -1) {
        this.uploadFileList = fileList;
      }
    },

    /**
     * @description: 上传中的处理 让文件列表数据于显示的文件列表数据相同
     * @param {*} event
     * @param {*} file
     * @param {文件列表} fileList
     * @return {*}
     */
    fileProgress (event, file, fileList) {
      this.uploadFileList = fileList;
    },

    /**
     * @description: 上传之前的文件处理
     * @param {待上传文件信息} file
     * @return {*}
     */
    beforeUpload (file) {
      const isLt2M = file.size < this.spaceData.max;
      const type = this.spaceData.mime.includes(file.type);
      if (!isLt2M) {
        this.$message.warning(
          `${file.name}文件过大，不能超出${this.spaceData.max / 1024 / 1024}M！`
        );
        const index = this.uploadFileList.findIndex(
          (item) => item.name == file.name
        );
        this.uploadFileList.splice(index, 1);
        return isLt2M;
      }
      if (!type) {
        this.$message.warning(`${file.name}文件类型不允许！`);
        const index = this.uploadFileList.findIndex(
          (item) => item.name == file.name
        );
        this.uploadFileList.splice(index, 1);
        return type;
      }
      return isLt2M && type;
    },

    /**
     * @description: 上传成功后的向父组件同步文件数据
     * @param {上传成功后接口返回的数据} res
     * @param {当前上传的文件信息} file
     * @return {*}
     */
    handleSuccess (res, file) {
      const file_name = file.name;
      const file_ext = file.name.substring(
        file.name.lastIndexOf(".") + 1,
        file.name.length
      );
      const file_size = file.raw.size;
      const file_path = this.spaceData.domain + `/${res.key}`; //七牛云上绑定的域名 拼接了这个key 就是你上传文件的地址了
      //上传成功后重组数据向父组件传对应格式的数据 与props里的curFileList数据格式对应
      const data = {
        file_ext,
        file_name,
        file_path,
        file_size,
      };
      this.attachment.push(data);
      this.$emit("syncFile", this.attachment);
    },

    //上传错误处理
    handleError (err) {
      this.$message.error(err);
    },

    /**
     * @description: 删除文件  先判断此文件是否已经上传成功
     * @param {*文件名称} name
     * @param {*数据在uploadFileList的当前下标} index
     * @return {*}
     */
    delFile (name, index) {
      const attachmentIndex = this.attachment.findIndex((item) => {
        return item.file_name == name;
      });
      //如果已经上传了并且是添加的时候 就调用接口删除  否则直接删除数组数据
      const url = "/xxx/xxx"; //删除文件的接口(根据自己情况)
      if (attachmentIndex !== -1) {
        if (this.isAddItem) {
          const UploadFile = this.attachment[attachmentIndex];
          const data = {
            file: UploadFile.file_path,
          };
          axios({
            url,
            method: "post",
            data,
          }).then((res) => {
            if (res.data.code === 1007) {
              this.uploadFileList.splice(index, 1);
              this.attachment.splice(attachmentIndex, 1);
              this.$emit("syncFile", this.attachment);
              this.$message.success(this.$t("delSucc"));
            } else {
              this.$message.error(res.data.message);
            }
          });
          //更新的时候删除文件  直接删除文件
        } else {
          this.uploadFileList.splice(index, 1);
          this.attachment.splice(attachmentIndex, 1);
          this.$emit("syncFile", this.attachment);
        }
      } else {
        //如果还未上传成功
        //如果在上传中 调用el-upload的abort停止上传
        if (this.uploadFileList[index].status == "uploading") {
          this.$refs.upload.abort(this.uploadFileList[index]);
          this.uploadFileList.splice(index, 1);
        } else {
          this.uploadFileList.splice(index, 1);
        }
      }
    },

    upload (token, key, obj, next, error, complete) {
      const { file } = obj;
      // 因人而异，自行解决
      let region = "";
      switch (this.spaceData.region) {
        case "10":
          region = qiniu.region.z0;
          break;
        case "20":
          region = qiniu.region.z1;
          break;
        case "30":
          region = qiniu.region.z2;
          break;
        case "40":
          region = qiniu.region.na0;
          break;
        case "50":
          region = qiniu.region.as0;
          break;
      }
      const putExtra = {
        // fname: file.name, // fname: string，文件原文件名
        params: {}, // params: object，用来放置自定义变量
        mimeType: null, // mimeType: null || array，用来限制上传文件类型，为 null 时表示不对文件类型限制；限制类型放到数组里： ["image/png", "image/jpeg", "image/gif"]
      },
        config = {
          useCdnDomain: true,
          region, //z0华东区域 z1华北区域  z2代表华南区域  na0北美区域   as0新加坡区域
        };

      let options = {
        // quality: 0.92,
        // noCompressIfLarger: true,
        // maxWidth: 1000,
        // maxHeight: 618,
      };

      let observable = qiniu.upload(file, key, token, putExtra, config);
      let subscription = observable.subscribe(next, error, complete);
      return subscription;
    },

    //上传七牛云
    customerUpload (request) {
      const { file } = request;
      const uid = file.uid;
      const index = this.uploadFileList.findIndex((item) => item.uid == uid);
      let token = this.spaceData.token;
      let key = this.spaceData.unique_key + file.name;
      this.upload(
        token,
        key,
        request,
        (next) => {
          let total = next.total;
          //设置进度条
          Vue.set(this.uploadFileList[index], "percentage", total.percent);
          Vue.set(this.uploadFileList[index], "status", "uploading");
        },
        (error) => {
          request.onError(error);
        },
        (complete) => {
          request.onSuccess(complete);
        }
      );
    },

    //获取token和key等
    getSpaceMethod () {
      this.uploadDia = true;
      const url = "/xxx/xxx"; //获取七牛token的接口地址
      axios({
        method: "POST",
        url,
      })
        .then((res) => {
          if (res.data.code === 1001) {
            const data = res.data.data;
            this.spaceData = data;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => { });
    },
  },
};
</script>

<style lang="scss" scoped>
.font13 {
  font-size: 13px;
}

.col2c {
  color: #2c6ee5;
}

.coldel {
  color: #e91c47;
}

.pointer {
  cursor: pointer;
}

.in_block {
  display: inline-block;
}

.vertical {
  display: flex;
  align-items: center;
  justify-content: center;
}

.verticall {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.ml_10 {
  margin-left: 10px;
}

.mr_10 {
  margin-right: 10px;
}

.progress-box {
  min-height: 260px;
  width: 100%;

  .list-item {
    padding: 8px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 25px;
    position: relative;

    .item-name {
      flex: 2;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-right: 6px;
    }

    .item-size {
      flex: 1;
    }

    .item-progress {
      flex: 2;
      padding-right: 30px;
    }

    .item-status {
      flex: 1;

      .el-icon-circle-check {
        color: #67c23a;
      }

      .el-icon-circle-close {
        color: #f00;
      }
    }

    .item-operate {
      flex: 1;
    }
  }
}
</style>
