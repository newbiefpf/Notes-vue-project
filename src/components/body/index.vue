<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6"
        ><div
          class="grid-content bg-purple"
          style="padding-left: 0; padding-right: 0"
        >
          left
        </div></el-col
      >
      <el-col :span="12"
        ><div class="grid-content bg-purple">
          <router-view /></div
      ></el-col>
      <el-col :span="6"
        ><div
          class="grid-content bg-purple"
          style="padding-left: 0; padding-right: 0"
        >
          right
        </div></el-col
      >
    </el-row>
  </div>
</template>

<script>
export default {
  name: "bodyIndex",
  methods: {
    changeUnits(type) {
      this.$router.push(type);
    },
  },
};
</script>
<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}

.bg-purple {
  background: #d3dce6;
}

.grid-content {
  border-radius: 4px;
  min-height: 500px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
