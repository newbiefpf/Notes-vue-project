<template>
  <div>
    <el-row :gutter="20" v-if="partShow">
      <el-col :span="6"
        ><div
          class="grid-content bg-purple"
          style="padding-left: 0; padding-right: 0"
        >
          <leftContent /></div
      ></el-col>
      <el-col :span="12"
        ><div class="grid-content bg-purple centerBody">
          <router-view /></div
      ></el-col>
      <el-col :span="6"
        ><div
          class="grid-content bg-purple"
          style="padding-left: 0; padding-right: 0"
        >
          <rightContent /></div
      ></el-col>
    </el-row>
    <el-row :gutter="20" v-else>
      <el-col :span="24"
        ><div class="grid-content bg-purple centerBody">
          <router-view /></div
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import leftContent from "@/components/body/left/personalInformation.vue";
import rightContent from "@/components/body/right/articleInfo.vue";
export default {
  name: "bodyIndex",
  data() {
    return {
      partShow: true,
    };
  },
  components: {
    leftContent,
    rightContent,
  },
  created() {
    console.log(this.$route.path);
    if (this.$route.path == "/publication" || this.$route.path == "/myindex") {
      this.partShow = false;
    } else {
      this.partShow = true;
    }
  },
  methods: {
    changeUnits(type) {
      if (type == "/publication" || type == "/myindex") {
        this.partShow = false;
      } else {
        this.partShow = true;
      }
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
  background: #ffffff;
}

.grid-content {
  border-radius: 4px;
  height: 720px;
  padding-top: 15px;
  padding-bottom: 15px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.centerBody {
  overflow-y: auto;
  text-align: justify;
}
.centerBody::-webkit-scrollbar {
  width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
.centerBody::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.2);
}
.centerBody::-webkit-scrollbar-track {
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
</style>
