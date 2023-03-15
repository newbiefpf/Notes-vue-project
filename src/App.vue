<template>
  <div :class="theme" class="bg-dark-secondary">
    <component :is="layout">
      <template #logo>
        <TheLogo />
      </template>
      <template #header>
        <TheHeader />
      </template>
      <template #content>
        <!-- <transition name="fade" appear>
          
        </transition> 动画-->

        <div class="box">
          <router-view class="m-2" />
        </div>
      </template>
      <template #sidebar>
        <TheSidebar />
      </template>
      <template #pages>
        <TheLandingPages />
      </template>
    </component>
  </div>
</template>

<script>
import UiToggleButton from "@/components/ui/UiToggleButton";
import SidebarLayout from "@/layouts/SidebarLayout";
import CenteredLayout from "@/layouts/CenteredLayout";
import LandingLayout from "@/layouts/LandingLayout";
import TheHeader from "@/components/TheHeader";
import TheSidebar from "@/components/TheSidebar";
import TheLogo from "@/components/TheLogo";
import { layouts } from "@/store";
import TheLandingPages from "@/components/TheLandingPages";
import { ping } from "@/api/user";
export default {
  components: {
    TheLandingPages,
    TheSidebar,
    TheHeader,
    TheLogo,
    SidebarLayout,
    CenteredLayout,
    LandingLayout,
    UiToggleButton,
  },

  computed: {
    theme() {
      return this.$store.state.theme;
    },
    layout() {
      const availableLayouts = {
        [layouts.centered]: CenteredLayout,
        [layouts.sidebar]: SidebarLayout,
        [layouts.landing]: LandingLayout,
      };

      const currentLayout = this.$store.state.layout;
      return availableLayouts[currentLayout];
    },
  },
  watch: {
    // 监听websocket返回的信息
    "$store.state.wsData"(data) {
      switch (data.type) {
        case "oneself":
          this.$store.commit("article/handleUnread", data.messageCount);
          break;
        case "test":
          console.log("ping", data);
          break;
        case "discuss":
          this.$store.commit("article/handleUnread", data.messageCount);
          this.$Notice.info({
            title: "评论",
            desc: data.content,
            duration: 30,
            render: (h) => {
              return h("span", [
                `${data.content}  >  `,
                h(
                  "a",
                  {
                    attrs: {
                      href: "messages",
                    },
                  },
                  "查看详情",
                ),
              ]);
            },
          });
          break;
        case "system":
          this.$Notice.warning({
            title: "管理员提醒",
            desc: data.content,
            duration: 0,
          });
          break;
        case "personal_letter":
          this.$Notice.info({
            title: "私信提醒",
            desc: data.content,
            duration: 30,
            render: (h) => {
              return h("span", [
                `${data.content}  >  `,
                h(
                  "a",
                  {
                    attrs: {
                      href: "messages",
                    },
                  },
                  "查看详情",
                ),
              ]);
            },
          });
          break;
        default:
          var data = {
            msg: {
              chat_msg_type: 2,
              data: {
                to_user_id: this.$store.getters.userInfo.ID,
                content: "ping",
                type: "test",
              },
            },
          };
          this.$initWs.send(data);
          break;
      }
    },
  },
  created() {
    this.$store.dispatch("InitTheme");
    let userInfo = this.$store.getters.userInfo;
    if (userInfo && userInfo.ID) {
      ping().then((res) => {
        if (res.code == 200) {
          this.$store.commit("user/getUserInfo");
          this.$store.dispatch("InitLayout");
          this.$initWs.init();
        } else {
          this.$store.commit("SetLayout", layouts.landing);
          this.$store.dispatch("user/refreshToken", "");
        }
      });
    } else {
      this.$store.commit("SetLayout", layouts.landing);
      this.$store.dispatch("user/refreshToken", "");
    }
  },
  beforeDestroy() {
    this.$initWs.close();
  },
};
</script>
<style lang="less">
.box {
  padding-bottom: 20px;
  overflow-y: auto;
}
.box::-webkit-scrollbar {
  width: 6px !important;
  background: #fff !important;
  border-radius: 6px;
}
.box::-webkit-scrollbar-thumb {
  background: #aaa !important;
  height: 6px !important;
  border-radius: 6px;
}
main::-webkit-scrollbar {
  width: 6px !important;
  background: #fff !important;
  border-radius: 6px;
}
main::-webkit-scrollbar-thumb {
  background: #aaa !important;
  height: 6px !important;
  border-radius: 6px;
}
</style>
