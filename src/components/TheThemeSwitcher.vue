<template>
  <UiIconButton :icon="themeIcon" @click="switchTheme" />
</template>

<script>
import { themes } from "@/store";
import UiIconButton from "@/components/ui/UiIconButton";

export default {
  name: "ThemeSwitcher",
  components: { UiIconButton },

  computed: {
    themeIcon() {
      const theme = this.$store.state.theme;

      return theme === themes.dark ? "moon" : "sun";
    },
  },

  methods: {
    switchTheme() {
      this.$store.dispatch("ToggleTheme");
    },
  },
};
</script>
