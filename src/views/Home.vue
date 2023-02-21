<template>
  <div>
    <figure v-if="InfoShow" class="md:flex rounded-xl p-8 md:p-0">
      <div class="rongqi">
        <div class="col" v-for="(item, index) in list" :key="index">
          <div class="title">
            <div class="title text-lg font-medium text-light-primary dark:text-dark-primary">{{ item.classify }}</div>
            <div>
              <input
                type="search"
                class="block px-4 py-1.5 text-base font-normal text-light-primary dark:text-white bg-light-primary dark:bg-dark-primary bg-clip-padding rounded-md transition ease-in-out m-0 dark:focus:text-white focus:border-sky-blue focus:outline-none"
                placeholder="Search" />
            </div>
          </div>
          <div class="content" :classify="item.id">
            <draggable
              group="site"
              animation="300"
              dragClass="dragClass"
              ghostClass="ghostClass"
              chosenClass="chosenClass"
              style="min-height: 120px; display: block"
              @start="onStart"
              @end="onEnd"
              @add="add">
              <transition-group style="min-height: 500px; display: block">
                <div class="item cardBox" v-for="(child, index) in item.children" :key="child.id" :data-id="child.id" :data-index="index">
                  <Card class="bg-light-primary dark:bg-dark-modifier-active dark:text-dark-modifier-active cardStyl" @click.native="openInfo(child)">
                    <div style="text-align: center">
                      <div>
                        <div class="text-lg font-medium text-light-primary dark:text-dark-primary">{{ child.title }}==={{ child.id }}</div>
                        <div class="font-medium text-light-primary dark:text-dark-primary">
                          {{ child.abstract }}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
                <div v-if="!item.children" class="item cardBox" :data-id="'0'" :data-index="'-1'" :key="-1" style="display: none"></div>
              </transition-group>
            </draggable>
          </div>
        </div>
      </div>
    </figure>
    <figure v-else class="md:flex rounded-xl p-8 md:p-0">
      <Info :articleInfo="articleInfo" @getData="getData" />
    </figure>
  </div>
</template>

<script>
import Info from "@/components/info";
import draggable from "vuedraggable";
import { articleListGet, sortTypePost } from "@/api/articale";
export default {
  name: "Home",
  data() {
    return {
      InfoShow: true,
      needChangeId: null,
      pClassify: "",
      list: [],
      beforId: null,
      afterId: null,
      position: "",
    };
  },
  components: {
    draggable,
    Info,
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      articleListGet(this.searchCriteria()).then((res) => {
        if (res.code == 200) {
          this.list = res.data.list;
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    searchCriteria() {
      let params = "";
      params = "page=1";
      return { params };
    },
    openInfo(item) {
      this.InfoShow = false;
      this.articleInfo = item;
    },
    onStart(e) {
      this.needChangeId = e.item.getAttribute("data-id");
      // console.log("移动的:", this.needChangeId);
      if (!this.needChangeId) return;
    },
    onEnd(e) {
      if (e.oldIndex == null || e.newIndex == null) return;
      if (!this.pClassify && e.oldIndex == e.newIndex) return;
      // console.log("新:", e.newIndex, "旧:", e.oldIndex);
      // console.log("移动的:", this.needChangeId);
      // console.log("类型：", this.pClassify);
      if (e.newIndex == 0) {
        this.position = "FIRST";
        this.beforId = 0;
      } else {
        this.beforId = e.to.childNodes[e.newIndex - 1].getAttribute("data-id");
      }

      if (!e.to.childNodes[e.newIndex + 1]) {
        this.position = "LAST";
        this.afterId = 0;
      } else {
        this.afterId = e.to.childNodes[e.newIndex + 1].getAttribute("data-id");
      }
      // console.log("前一个id：", this.beforId, "后一个id：", this.afterId);
      // console.log("位置：", this.position);

      sortTypePost({
        id: Number(this.needChangeId),
        afterId: Number(this.afterId),
        beforId: Number(this.beforId),
        position: this.position,
        classify: this.pClassify,
      }).then((res) => {
        if (res.code == 200) {
          this.getData();
          this.$Message.success(res.msg);
        } else {
          this.$Message.error(res.msg);
        }
        this.needChangeId = null;
        this.beforId = null;
        this.afterId = null;
        this.position = "";
        this.pClassify = "";
      });
    },
    add(e) {
      this.pClassify = e.to.parentNode.parentNode.getAttribute("classify");
      console.log("f", this.pClassify);
      if (!this.pClassify) return;
    },
  },
};
</script>
<style scoped>
.rongqi {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.cardStyl {
  cursor: pointer;
  width: 320px;
  height: 100%;
}
.col {
  padding-top: 10px;
  width: 330px;
}
.cardBox {
  padding: 10px;
  height: 160px;

  /* min-width: 340px; */
}
.title {
  margin: 0px 8px;
  padding-top: 4px;
  font-size: 20px;
  display: flex;
  align-content: center;
}

.content {
  overflow: hidden;
  height: 670px;
  overflow-y: auto;
}
.content::-webkit-scrollbar {
  width: 6px !important;
  background: #fff !important;
  border-radius: 6px;
  display: none;
}
.content::-webkit-scrollbar-thumb {
  background: #aaa !important;
  height: 6px !important;
  border-radius: 6px;
  display: none;
}
</style>
