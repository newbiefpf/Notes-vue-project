<template>
  <!-- 遮罩层 self只是点击自己-->
  <div class="dialog_wrap" v-show="visible" @click.self="handleMaskClose">
    <div class="dialog" :style="{ width, marginTop: top }">
      <div class="bg-white dark:bg-dark-secondary z-50 rounded-md flex flex-col p-4 gap-3 border border-gray-100 dark:border-gray-600">
        <div class="dialog_header">
          <!-- 标题的具名插槽 不传值时候 直接取title 否者替换slot-->
          <slot name="title">
            <span class="dialog_header_title font-medium text-light-primary dark:text-dark-primary">{{ title }}</span>
          </slot>
          <!-- <button class="dialog_header_btn" @click="handleClose">
              <Icon type="md-close" class="font-medium text-light-primary dark:text-dark-primary" style="margin-right: 20px; cursor: pointer" />
            </button> -->
        </div>
        <div class="dialog_body">
          <slot name="body">
            <span>这是一条消息</span>
          </slot>
        </div>
        <div class="dialog_footer">
          <slot name="footer">
            <button class="cancelBtn" @click="handleCancel">取消</button>
            <button class="comfirmBtn" @click="handleComfirm">确定</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 *
 * * 注意点：:visible.sync="visible"
 * * * 就是原本使用 子组件修改父组件需要通过组件通讯，只不过子组件向父组件发射事件时候，
 * * * 可以设置一个限定的触发事件，也就是 `this.$emit("update:visible", false)`,
 * * * 这样的话，直接把 v-bind 与 @click 简化为 -> `:visible.sync="visible"` 可实现子组件修改父组件的状态
 */
export default {
  name: "Dialog",
  props: {
    title: {
      type: String,
      default: "消息",
    },
    width: {
      type: String,
      default: "50%",
    },
    top: {
      type: String,
      default: "15vh",
    },
    visible: {
      type: Boolean,
      default: false,
    },
    mashFlag: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    handleMaskClose() {
      if (!this.mashFlag) return false;
      this.$emit("update:visible", false);
    },
    // handleClose() {
    //   this.$emit("update:visible", false);
    // },
    handleCancel() {
      this.$emit("handleCancel");
    },
    handleComfirm() {
      this.$emit("handleComfirm");
    },
  },
  components: {},
  mounted() {
    var vm = this;
    document.onkeydown = function (e) {
      // console.log(e);
      if (e.key == "Escape") {
        vm.handleCancel();
      }
    };
  },
};
</script>
<style lang="scss" scoped>
.dialog-fade-enter-active {
  animation: fade 0.5s;
}
.dialog-fade-leave-active {
  animation: fade 0.5s reverse;
}

@keyframes fade {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
.dialog_wrap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  margin: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);
  .dialog {
    position: relative;
    margin: 15vh auto 50px;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    width: 30%;
    .dialog_header {
      line-height: 24px;
      font-size: 18px;
      color: #303133;
      .dialog_header_btn {
        position: absolute;
        top: 20px;
        right: 20px;
        padding: 0;
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 16px;
      }
      .removes {
        position: absolute;
        right: 0;
        top: 0;
        color: #303133;
        cursor: pointer;
      }
    }
    .dialog_body {
      padding: 10px 20px;
      color: #606266;
      font-size: 14px;
      word-break: break-all;
    }
    .dialog_footer {
      text-align: right;
      box-sizing: border-box;
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
}
</style>
