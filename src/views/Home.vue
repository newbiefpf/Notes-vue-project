<template>
  <div>
    <figure v-if="InfoShow" class="md:flex rounded-xl p-8 md:p-0">
      <div class="rongqi">
        <div class="col">
          <div class="title">
            <div class="title text-lg font-medium text-light-primary dark:text-dark-primary">新闻</div>
            <div>
              <input
                type="search"
                class="block px-4 py-1.5 text-base font-normal text-light-primary dark:text-white bg-light-primary dark:bg-dark-primary bg-clip-padding rounded-md transition ease-in-out m-0 dark:focus:text-white focus:border-sky-blue focus:outline-none"
                placeholder="Search" />
            </div>
          </div>
          <div class="content">
            <draggable
              v-model="arr1"
              group="site"
              animation="300"
              dragClass="dragClass"
              ghostClass="ghostClass"
              chosenClass="chosenClass"
              @start="onStart"
              @end="onEnd">
              <transition-group style="min-height: 500px; display: block">
                <div class="item cardBox" v-for="item in arr1" :key="item.id">
                  <Card class="bg-light-primary dark:bg-dark-modifier-active dark:text-dark-modifier-active cardStyl" @click.native="openInfo(item)">
                    <div style="text-align: center">
                      <div>
                        <div class="text-lg font-medium text-light-primary dark:text-dark-primary">
                          {{ item.name }}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </transition-group>
            </draggable>
          </div>
        </div>
        <div class="col">
          <div class="title">
            <div class="title text-lg font-medium text-light-primary dark:text-dark-primary">新闻</div>
            <div>
              <input
                type="search"
                class="block px-4 py-1.5 text-base font-normal text-light-primary dark:text-white bg-light-primary dark:bg-dark-primary bg-clip-padding rounded-md transition ease-in-out m-0 dark:focus:text-white focus:border-sky-blue focus:outline-none"
                placeholder="Search" />
            </div>
          </div>
          <div class="content">
            <draggable
              v-model="arr2"
              group="site"
              animation="300"
              dragClass="dragClass"
              ghostClass="ghostClass"
              chosenClass="chosenClass"
              @start="onStart"
              @end="onEnd">
              <transition-group style="min-height: 500px; display: block">
                <div class="item cardBox" v-for="item in arr2" :key="item.id">
                  <Card class="bg-light-primary dark:bg-dark-modifier-active dark:text-dark-modifier-active cardStyl" @click.native="openInfo(item)">
                    <div style="text-align: center">
                      <div>
                        <div class="text-lg font-medium text-light-primary dark:text-dark-primary">
                          {{ item.name }}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </transition-group>
            </draggable>
          </div>
        </div>
        <div class="col">
          <div class="title">
            <div class="title text-lg font-medium text-light-primary dark:text-dark-primary">新闻</div>
            <div>
              <input
                type="search"
                class="block px-4 py-1.5 text-base font-normal text-light-primary dark:text-white bg-light-primary dark:bg-dark-primary bg-clip-padding rounded-md transition ease-in-out m-0 dark:focus:text-white focus:border-sky-blue focus:outline-none"
                placeholder="Search" />
            </div>
          </div>
          <div class="content">
            <draggable
              v-model="arr3"
              group="site"
              animation="300"
              dragClass="dragClass"
              ghostClass="ghostClass"
              chosenClass="chosenClass"
              @start="onStart"
              @end="onEnd">
              <transition-group style="min-height: 500px; display: block">
                <div class="item cardBox" v-for="item in arr3" :key="item.id">
                  <Card class="bg-light-primary dark:bg-dark-modifier-active dark:text-dark-modifier-active cardStyl" @click.native="openInfo(item)">
                    <div style="text-align: center">
                      <div>
                        <div class="text-lg font-medium text-light-primary dark:text-dark-primary">
                          {{ item.name }}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </transition-group>
            </draggable>
          </div>
        </div>
        <div class="col">
          <div class="title">
            <div class="title text-lg font-medium text-light-primary dark:text-dark-primary">新闻</div>
            <div>
              <input
                type="search"
                class="block px-4 py-1.5 text-base font-normal text-light-primary dark:text-white bg-light-primary dark:bg-dark-primary bg-clip-padding rounded-md transition ease-in-out m-0 dark:focus:text-white focus:border-sky-blue focus:outline-none"
                placeholder="Search" />
            </div>
          </div>
          <div class="content">
            <draggable
              v-model="arr4"
              group="site"
              animation="300"
              dragClass="dragClass"
              ghostClass="ghostClass"
              chosenClass="chosenClass"
              @start="onStart"
              @end="onEnd">
              <transition-group style="min-height: 500px; display: block">
                <div class="item cardBox" v-for="item in arr4" :key="item.id">
                  <Card class="bg-light-primary dark:bg-dark-modifier-active dark:text-dark-modifier-active cardStyl" @click.native="openInfo(item)">
                    <div style="text-align: center">
                      <div>
                        <div class="text-lg font-medium text-light-primary dark:text-dark-primary">
                          {{ item.name }}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </transition-group>
            </draggable>
          </div>
        </div>
      </div>
    </figure>
    <figure v-else class="md:flex rounded-xl p-8 md:p-0">
      <Info />
    </figure>
  </div>
</template>

<script>
import Info from "@/components/info";
import draggable from "vuedraggable";
export default {
  name: "Home",
  data() {
    return {
      InfoShow: true,
      arr1: [
        { id: 1, name: "www.itxst.com" },
        { id: 2, name: "www.jd.com" },
        { id: 3, name: "www.baidu.com" },
        { id: 4, name: "www.taobao.com" },
      ],
      arr2: [
        { id: 1, name: "www.google.com" },
        { id: 2, name: "www.msn.com" },
        { id: 3, name: "www.ebay.com" },
        { id: 4, name: "www.yahoo.com" },
      ],
      arr3: [
        { id: 1, name: "www.itxst.com" },
        { id: 2, name: "www.jd.com" },
        { id: 3, name: "www.baidu.com" },
        { id: 4, name: "www.taobao.com" },
      ],
      arr4: [
        { id: 1, name: "www.google.com" },
        { id: 2, name: "www.msn.com" },
        { id: 3, name: "www.ebay.com" },
        { id: 4, name: "www.yahoo.com" },
      ],
    };
  },
  components: {
    draggable,
    Info,
  },
  methods: {
    openInfo(item) {
      this.InfoShow = false;
      console.log(item);
    },
    onStart() {
      this.drag = true;
    },
    onEnd() {
      this.drag = false;
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
