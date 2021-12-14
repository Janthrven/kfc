<template>
  <div id="main">

    <!-- 二级路由 -->
    <router-view/>

    <!-- 底部标签栏 -->
    <van-tabbar v-model="tabbarIndex" active-color="#d81e06" inactive-color="#a0a0a0" route>
      <van-tabbar-item v-for="(item,index) in tabbarData" :key="index" :to="item.url">
        <span>{{item.title}}</span>
        <template #icon="props">
          <img :src="props.active ? item.icon.active : item.icon.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
    data() {
        return {
            tabbarIndex: 0,
            tabbarData: [
                {
                    title: "首页",
                    icon: {
                        active: require("../assets/images/tabbar/home@act.png"),
                        inactive: require("../assets/images/tabbar/home.png")
                    },
                    url: {
                        name: "Home"
                    }
                },
                {
                    title: "购物车",
                    icon: {
                        active: require("../assets/images/tabbar/shopbag@act.png"),
                        inactive: require("../assets/images/tabbar/shopbag.png")
                    },
                    url: {
                        name: "Shopbag"
                    }
                },
                {
                    title: "订单",
                    icon: {
                        active: require("../assets/images/tabbar/order@act.png"),
                        inactive: require("../assets/images/tabbar/order.png")
                    },
                    url: {
                        name: "Order"
                    }
                },
                {
                    title: "我的",
                    icon: {
                        active: require("../assets/images/tabbar/my@act.png"),
                        inactive: require("../assets/images/tabbar/my.png")
                    },
                    url: {
                        name: "My"
                    }
                }
            ]
        }
    }
}
</script>
<style lang="less">
#main{
    padding-bottom: 50px;
}
</style>