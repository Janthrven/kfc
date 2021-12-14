<template>
  <div class="My">
    <!-- 顶部导航start -->
    <div class="nav">
      <van-nav-bar title="我的" />
    </div>
    <!-- 顶部导航end -->
    <!-- 背景start -->
    <div class="bg">
      <img :src="img" width="100%" />
    </div>
    <!-- 背景end -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      img: "https://w.wallhaven.cc/full/8o/wallhaven-8o92jo.jpg",
    };
  },
};
</script>