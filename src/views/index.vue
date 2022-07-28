<template>
  <div id="main">
    <vue-particles
      color="#dedede"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="star"
      :particleSize="4"
      linesColor="#FFFFFF"
      :linesWidth="2"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="4"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="cash"
    >
    </vue-particles>
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
  width: 100%;
  min-width: 1300px;
}
.cash {
  position: absolute;
  width: 100%;
  height: 99%;
}
.el-header {
  background-color: rgb(84, 92, 100);
  line-height: 40px;
}
.el-main {
  margin: 0 200px;
  padding-top: 30px;
  height: 800px;
}
.el-container {
  margin: 0;
  padding: 0;
}
.el-footer {
  margin: 0 200px;
}
</style>
>
