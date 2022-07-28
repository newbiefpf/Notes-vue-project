<template>
  <div id="main">
    <el-container>
      <el-header height="40px">
        <headerIndex @switchUnits="switchUnits" />
      </el-header>
      <el-main><bodyIndex ref="bodyContent" /></el-main>
      <el-footer><footerIndex /></el-footer>
    </el-container>
  </div>
</template>

<script>
import headerIndex from "@/components/header/index.vue";
import bodyIndex from "@/components/body/index.vue";
import footerIndex from "@/components/footer/index.vue";
export default {
  name: "mainBody",
  components: {
    headerIndex,
    bodyIndex,
    footerIndex,
  },
  methods: {
    switchUnits(type) {
      this.$refs.bodyContent.changeUnits(type);
    },
  },
};
</script>

<style lang="less" scoped>
#main {
  background: #d3dce6;
}
.el-header {
  background-color: rgb(84, 92, 100);
  line-height: 40px;
}
.el-main {
  padding-top: 40px;
}
.el-container {
  margin: 0;
  padding: 0;
}
</style>
>
