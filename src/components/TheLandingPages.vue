<template>
  <fragment>
    <section class="l max-w-screen-lg mx-auto flex flex-col items-center justify-center" style="padding-top: 12rem">
      <transition name="fade" appear>
        <h1 class="text-7xl text-gray-800 dark:text-white text-center font-semibold leading-none tracking-tighter mb-4 fontColor">
          {{ obj.output }}<span class="typed-cursor">|</span>
        </h1>
      </transition>
      <transition name="fade" appear>
        <h2 class="text-2xl text-gray-600 dark:text-gray-400 opacity-75 font-normal leading-tight mb-8" style="margin-top: 2rem">
          NEWBIEFPF的笔记本记录工作涉及到的技术点
        </h2>
      </transition>
      <transition name="fade" appear>
        <div class="stylBtn">
          <div
            class="flex flex-col gap-1 cursor-pointer"
            :class="{ 'opacity-40': currentLayout !== layouts.landing }"
            @click="switchLayout(layouts.landing)">
            <h1 class="text-light-primary dark:text-dark-primary">封面</h1>
            <section class="flex flex-col w-48 h-48 border-2 border-sky-blue rounded-md p-3 gap-y-1">
              <header class="flex items-center justify-center h-full bg-sky-blue">
                <p class="text-white text-xs">封面页面</p>
              </header>
            </section>
          </div>
          <div
            class="flex flex-col gap-1 cursor-pointer"
            :class="{ 'opacity-40': currentLayout !== layouts.centered }"
            @click="switchLayout(layouts.centered)">
            <h1 class="text-light-primary dark:text-dark-primary">居中布局</h1>
            <section class="flex flex-col w-48 h-48 border-2 border-sky-blue rounded-md p-3 gap-y-1">
              <header class="h-4 w-full bg-sky-blue"></header>
              <div class="flex flex-1 gap-x-1 px-3">
                <nav class="order-first h-8 w-1/4 bg-sky-blue"></nav>
                <main class="h-full w-full bg-sky-blue"></main>
              </div>
            </section>
          </div>
          <div
            class="flex flex-col gap-1 cursor-pointer"
            :class="{ 'opacity-40': currentLayout !== layouts.sidebar }"
            @click="switchLayout(layouts.sidebar)">
            <h1 class="text-light-primary dark:text-dark-primary">展开布局</h1>
            <section class="flex flex-col w-48 h-48 border-2 border-sky-blue rounded-md p-3 gap-y-1">
              <header class="h-4 w-full bg-sky-blue"></header>
              <div class="flex flex-1 gap-x-1">
                <nav class="order-first h-full w-1/4 bg-sky-blue"></nav>
                <main class="h-full w-full bg-sky-blue"></main>
              </div>
            </section>
          </div>
        </div>
      </transition>
      <transition name="fade" appear>
        <button class="bg-sky-blue dark:bg-dark-primary py-3 px-7 rounded-md text-white flex items-center gap-3" @click="navigateToGithub">
          <v-icon name="brands/github" class="fill-current" />
          Github
        </button>
      </transition>
    </section>

    <!-- <div class="hidden md:block absolute left-0 right-0 m-auto p-px transform -translate-y-1/2">
      <transition name="fade" appear>
        <img
          v-if="currentThemeIsDark"
          alt="layout"
          src="@/assets/centered-layout-dark.png"
          class="object-fill max-w-screen-lg mx-auto rounded-md shadow-sm mt-16 shadow-airbnb p-3 bg-dark-primary border border-gray-700" />
        <img
          v-else
          alt="layout"
          src="@/assets/centered-layout-light.png"
          class="object-fill max-w-screen-lg mx-auto rounded-md shadow-sm mt-16 shadow-airbnb p-3 bg-light-primary border border-gray-200" />
      </transition>
    </div> -->

    <!-- <section class="bg-light-primary dark:bg-dark-primary">
      <div class="h-full max-w-screen-lg mx-auto flex flex-col items-center justify-center">
        <h1 class="text-7xl text-gray-800 dark:text-white font-semibold leading-none tracking-tighter mb-4">特性</h1>
        <div class="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none mt-8">
          <UiFeatureCard icon="th-large" header="布局" description="三种样式" />
          <UiFeatureCard icon="tailwind" header="风格" description="基于不同的风格" />
          <UiFeatureCard icon="moon" header="主题" description="黑白主题" />
        </div>
      </div>
    </section> -->
  </fragment>
</template>

<script>
import { themes } from "@/store";
import { layouts } from "@/store";
import { chicken } from "@/api/user";
import UiFeatureCard from "@/components/ui/UiFeatureCard";
import EasyTyper from "easy-typer-js";
export default {
  name: "TheLandingPages",
  components: { UiFeatureCard },
  computed: {
    currentThemeIsDark() {
      return this.$store.state.theme === themes.dark;
    },
  },
  data() {
    return {
      timer: null,
      layouts: layouts,
      text: "............................",
      obj: {
        output: "",
        isEnd: false,
        speed: 180,
        singleBack: false,
        sleep: 100,
        type: "normal",
        backSpeed: 100,
        sentencePause: false,
        // 其他参数省略，实际你需要完整配置哦T^T
      },
    };
  },
  computed: {
    currentLayout() {
      return this.$store.state.layout;
    },
  },
  created() {
    this.getChicken();
  },
  methods: {
    switchLayout(layout) {
      const token = this.$store.getters.access_token;
      if (token && token != "") {
        this.$store.commit("SetLayout", layout);
      } else {
        this.$store.commit("SetLayout", "landing");
        localStorage.removeItem("userInfo");
        localStorage.removeItem("access_token");
        this.$Message.info("请登录哦！！！");
      }
    },
    getChicken() {
      chicken().then((res) => {
        if (res.code == 200) {
          this.text = res.data;
          new EasyTyper(this.obj, this.text);
        } else {
          this.$Message.error(res.msg);
          clearInterval(this.timer);
          this.timer = null;
        }
      });
    },
    navigateToGithub() {
      window.location.href = "https://github.com/newbiefpf/Notes-on-a-project.git";
    },
  },
  mounted() {
    this.timer = setInterval(() => {
      this.getChicken();
    }, 10000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
};
</script>
<style scoped lang="less">
.stylBtn {
  display: flex;
  .flex {
    margin: 10px 10px;
  }
}
.fontColor {
  position: relative;
  -webkit-background-clip: text;
  background-clip: text;
  background-image: linear-gradient(rgb(255, 255, 0), rgb(0, 255, 255));
  -webkit-text-fill-color: transparent;
}

.typed-cursor {
  position: relative;
  -webkit-background-clip: text;
  background-clip: text;
  background-image: linear-gradient(rgb(255, 255, 0), rgb(0, 255, 255));
  -webkit-text-fill-color: transparent;
  margin-left: 10px;
  height: 10px;
  opacity: 1;
  -webkit-animation: blink 1.2s infinite;
  -moz-animation: blink 1.2s infinite;
  animation: blink 1.2s infinite;
}

@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-webkit-keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-moz-keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
