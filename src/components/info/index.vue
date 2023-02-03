<template>
  <div class="groubAll">
    <div class="backtrack">
      <Icon type="ios-undo" size="30" @click="backtrack" />
    </div>
    <div class="ql-container ql-snow" style="">
      <div class="ql-editor" data-gramm="false" contenteditable="false" v-html="str"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Info",
  data() {
    return {
      str: `<h1><span class="ql-size-huge">dasd </span></h1><<pre class="ql-syntax" spellcheck="false">撒地方
</pre><p class="ql-align-center"><s>地方撒地方阿斯蒂芬</s></p><p class="ql-align-center">岁的法国的方式给对方灌灌灌灌灌灌灌灌灌灌灌灌灌</p><p class="ql-align-center"><span class="ql-font-monospace" style="background-color: rgb(161, 0, 0);">当时法国的撒告诉对方</span></p><p class="ql-align-center"><span class="ql-font-monospace" style="background-color: rgb(161, 0, 0); color: rgb(102, 102, 0);">岁的法国当时法国</span></p><p class="ql-align-center ql-direction-rtl"></p><p class="ql-align-center ql-direction-rtl">下</p><p class="ql-align-center ql-direction-rtl">xx<sup>x</sup>x</p><p class="ql-align-center ql-direction-rtl"></p><pre class="ql-syntax" spellcheck="false">asdqwe
</pre><h1><span class="ql-size-huge">dasd </span></h1><<pre class="ql-syntax" spellcheck="false">撒地方
</pre><p class="ql-align-center"><s>地方撒地方阿斯蒂芬</s></p><p class="ql-align-center">岁的法国的方式给对方灌灌灌灌灌灌灌灌灌灌灌灌灌</p><p class="ql-align-center"><span class="ql-font-monospace" style="background-color: rgb(161, 0, 0);">当时法国的撒告诉对方</span></p><p class="ql-align-center"><span class="ql-font-monospace" style="background-color: rgb(161, 0, 0); color: rgb(102, 102, 0);">岁的法国当时法国</span></p><p class="ql-align-center ql-direction-rtl"></p><p class="ql-align-center ql-direction-rtl">下</p><p class="ql-align-center ql-direction-rtl">xx<sup>x</sup>x</p><p class="ql-align-center ql-direction-rtl"></p><pre class="ql-syntax" spellcheck="false">asdqwe
</pre><h1><span class="ql-size-huge">dasd </span></h1><<pre class="ql-syntax" spellcheck="false">撒地方
</pre><p class="ql-align-center"><s>地方撒地方阿斯蒂芬</s></p><p class="ql-align-center">岁的法国的方式给对方灌灌灌灌灌灌灌灌灌灌灌灌灌</p><p class="ql-align-center"><span class="ql-font-monospace" style="background-color: rgb(161, 0, 0);">当时法国的撒告诉对方</span></p><p class="ql-align-center"><span class="ql-font-monospace" style="background-color: rgb(161, 0, 0); color: rgb(102, 102, 0);">岁的法国当时法国</span></p><p class="ql-align-center ql-direction-rtl"></p><p class="ql-align-center ql-direction-rtl">下</p><p class="ql-align-center ql-direction-rtl">xx<sup>x</sup>x</p><p class="ql-align-center ql-direction-rtl"></p><pre class="ql-syntax" spellcheck="false">asdqwe 
</pre>`,
    };
  },

  methods: {
    backtrack() {
      this.$parent.InfoShow = true;
      console.log(this.$parent.InfoShow);
    },
  },
};
</script>
<style scoped>
.groubAll {
  height: 700px;
  width: 100%;
  padding-bottom: 60px;
}
.backtrack {
  text-align: center;
  margin-top: -15px;
  cursor: pointer;
}
</style>
