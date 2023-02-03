import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import getters from "./getters";

Vue.use(Vuex);

export default new Vuex.Store({

  modules: {
    user,
  },
  // =====配置=====
  state: {
    theme: "",
    layout: "",
  },
  mutations: {
    SetTheme (state, theme) {
      state.theme = theme;
      localStorage.theme = theme;
    },
    SetLayout (state, layout) {
      state.layout = layout;
      localStorage.layout = layout;
    },
  },
  actions: {
    InitTheme ({ commit }) {
      const cachedTheme = localStorage.theme ? localStorage.theme : false;
      // const userPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      // const theme = cachedTheme ? cachedTheme : userPrefersDark ? themes.dark : themes.light;

      const theme = cachedTheme ? cachedTheme : themes.dark;
      commit("SetTheme", theme);
    },
    InitLayout ({ commit }) {
      const cachedLayout = localStorage.layout ? localStorage.layout : false;
      const layout = cachedLayout ? cachedLayout : layouts.landing;

      commit("SetLayout", layout);
    },
    ToggleTheme ({ commit }) {
      const currentTheme = localStorage.theme;
      const newTheme = currentTheme === themes.light ? themes.dark : themes.light;
      commit("SetTheme", newTheme);
    },
  },
  getters,
});

export const themes = {
  light: "light",
  dark: "dark",
};

export const layouts = {
  centered: "centered",
  sidebar: "sidebar",
  landing: "landing",
};
