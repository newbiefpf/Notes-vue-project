<template>
  <div class="menu-item hidden-md-and-down">
    <el-row type="flex" justify="center" class="row-bg">
      <el-col
        :span="2"
        v-for="(item, index) in menuList"
        :key="item.id"
        @click.native="handleSelect(item, index)"
      >
        <div class="grid-content">
          <div class="title" :class="activeIndex == index ? 'underline' : ''">
            {{ item.title }}
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "headerIndex",
  components: {
    // loginDialog,
  },
  data() {
    return {
      activeIndex: -1,
      menuList: [
        { id: 1, title: "社区" },
        { id: 2, title: "首页" },
        { id: 3, title: "自己" },
        { id: 4, title: "发表" },
        { id: 5, title: "登录/注册" },
      ],
    };
  },
  methods: {
    handleSelect(item, index) {
      this.activeIndex = index;
      switch (item.id) {
        case 1:
          this.switchUnits("/community");
          break;
        case 2:
          this.switchUnits("/home");
          break;
        case 3:
          this.switchUnits("/myindex");
          break;
        case 4:
          this.switchUnits("/publication");
          break;
        case 5:
          this.switchUnits("/login");
          break;

        default:
          break;
      }
    },
    switchUnits(type) {
      this.$emit("switchUnits", type);
    },
  },
};
</script>
<style lang="less" scoped>
.menu-item {
  height: 100%;
}
.grid-content {
  box-sizing: content-box;
  height: 100%;
  color: antiquewhite;
  white-space: nowrap;
  cursor: pointer;
  &:hover {
    color: red;
  }
  .title {
    height: 90%;
    width: 80%;
  }
}
.underline {
  color: red;
  border-bottom: 2px red solid;
}
</style>
