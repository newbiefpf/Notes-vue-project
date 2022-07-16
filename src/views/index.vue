<template>
  <div>
    <el-container>
      <el-header height="40px">
        <headerIndex />
      </el-header>
      <el-main><bodyIndex /></el-main>
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
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: rgb(84, 92, 100);
  line-height: 40px;
}
.el-container {
  margin: 0;
  padding: 0;
}
</style>
>
