<template>
  <div :style="newStyle">
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="(slide, key) in swiperList" :key="key">
        <!-- <img :src="slide" alt="" /> -->
        <img src="@/assets/photo.jpeg" alt="出错了" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev" v-show="option"></div>
      <div class="swiper-button-next" slot="button-next" v-show="option"></div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  name: "Home",
  title: "Pagination",
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    swiperList: {
      type: Array,
      default: function () {
        return [
          "@/assets/photo.jpeg",
          // "https://images.pexels.com/photos/1438994/pexels-photo-1438994.jpeg?auto=compress&cs=tinysrgb&w=1600",
          // "https://images.pexels.com/photos/3466355/pexels-photo-3466355.jpeg?auto=compress&cs=tinysrgb&w=1600",
          // "https://images.pexels.com/photos/775201/pexels-photo-775201.jpeg?auto=compress&cs=tinysrgb&w=1600",
          // "https://images.pexels.com/photos/105075/pexels-photo-105075.jpeg?auto=compress&cs=tinysrgb&w=1600",
          // "https://images.pexels.com/photos/142497/pexels-photo-142497.jpeg?auto=compress&cs=tinysrgb&w=1600",
          // "https://images.pexels.com/photos/338936/pexels-photo-338936.jpeg?auto=compress&cs=tinysrgb&w=1600",
        ];
      },
    },
    option: {
      type: Boolean,
      default: function () {
        return false;
      },
    },
    height: {
      type: String,
      default: function () {
        return "100%";
      },
    },
    width: {
      type: String,
      default: function () {
        return "100%";
      },
    },
    delay: {
      type: Number,
      default: function () {
        return 3000;
      },
    },
  },
  data() {
    return {
      swiperOption: {
        autoplay: {
          disableOnInteraction: false, // 用户操作swiper之后，是否禁止autoplay
          delay: this.delay, // 自动切换的时间间隔（单位ms）
        },
        initialSlide: 0,
        loop: true,
        spaceBetween: 0,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
  computed: {
    newStyle() {
      let style = {};
      style.width = this.width;
      style.height = this.height;
      return style;
    },
  },
};
</script>
<style lang="less" scoped>
.swiper {
  height: 100%;
  width: 100%;
  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-weight: bold;
    font-size: 10px;
    img {
      height: auto;
      width: 100%;
    }
  }
}
</style>
