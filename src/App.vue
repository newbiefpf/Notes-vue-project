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
        <transition name="fade" appear>
          <div class="box" style="height: 700px">
            <router-view class="m-2" />
          </div>
        </transition>
      </template>
      <template #sidebar>
        <transition name="fade" appear>
          <TheSidebar />
        </transition>
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

  created() {
    this.$store.dispatch("InitTheme");
    this.$store.dispatch("InitLayout");
  },
};
</script>
<style lang="less">
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
</style>
