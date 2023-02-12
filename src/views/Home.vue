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
          <div class="content">
            <draggable
              group="site"
              animation="300"
              dragClass="dragClass"
              ghostClass="ghostClass"
              chosenClass="chosenClass"
              @start="onStart"
              @add="add">
              <transition-group style="min-height: 500px; display: block">
                <div class="item cardBox" v-for="child in item.children" :key="child.id" :classify="item.id" :data-id="child.id">
                  <Card class="bg-light-primary dark:bg-dark-modifier-active dark:text-dark-modifier-active cardStyl" @click.native="openInfo(child)">
                    <div style="text-align: center">
                      <div>
                        <div class="text-lg font-medium text-light-primary dark:text-dark-primary">
                          {{ child.title }}
                        </div>
                        <div class="font-medium text-light-primary dark:text-dark-primary">
                          {{ child.abstract }}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
                <div class="item cardBox" :classify="item.id" :data-id="'0'" :key="-1" style="display: none"></div>
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
import { articleListGet, articleTypePost } from "@/api/articale";
export default {
  name: "Home",
  data() {
    return {
      InfoShow: true,
      pId: null,
      pClassify: null,
      list: [],
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
        console.log(res);
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
      console.log(e);
      this.pId = e.item.getAttribute("data-id");
    },
    add(e) {
      this.pClassify = e.to.firstChild.getAttribute("classify");
      if (this.pId && this.pClassify) {
        articleTypePost({ id: Number(this.pId), classify: this.pClassify }).then((res) => {
          if (res.code == 200) {
            this.$Message.success(res.msg);
            this.pId = null;
            this.pClassify = null;
          } else {
            this.$Message.error(res.msg);
          }
          this.getData();
          this.pId = null;
          this.pClassify = null;
        });
      }
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
