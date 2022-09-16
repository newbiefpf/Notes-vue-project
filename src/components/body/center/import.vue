<template>
  <div class="markdown">
    <MarkdownPreview
      v-model="content"
      :height="1024"
      :isPreview="true"
      :bordered="false"
      :copyCode="true"
      theme="oneDark"
    />
  </div>
</template>

<script>
import MarkdownPreview from "vue-meditor";
export default {
  name: "markDown",
  props: ["content"],

  data() {
    return {};
  },
  computed: {
    HTMLText() {
      return this.content;
    },
  },
  components: {
    MarkdownPreview,
  },
  created() {
    console.log(this.content);
    // 读取本地的Markdown文件
    // this.$axios.get(`/static/file/test.md`).then((response) => {
    //   if (response.data) {
    //     this.content = response.data;
    //     console.log(this.content);
    //   }
    // });
  },
};
</script>
