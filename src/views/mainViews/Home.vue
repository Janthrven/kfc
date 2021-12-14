<template>
  <div id="home">
    <!-- 头部 -->
    <van-nav-bar>
      <template #left>
        <div class="home_title">{{ timeText }}</div>
      </template>
      <template #right>
        <van-search placeholder="请输入商品名称" v-model="name" 
        @search="search" shape="round" />
      </template>
    </van-nav-bar>
    <!-- <router-link to="/detail">跳转</router-link> -->

    <!-- 轮播图 -->
    <div class="banner_box">
      <van-swipe :autoplay="3000" lazy-render>
        <van-swipe-item v-for="(image, index) in bannerData" :key="index">
          <img :src="image.bannerImg" class="auto_img" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 畅销商品列表 -->
    <div class="hot_product">
      <div class="hot_product_title">热门推荐</div>

      <div class="product_box clearfix">
        <!-- 单个商品 -->
        <div
          class="popduct_item fl"
          :class="[index % 2 == 0 ? 'pro_left' : 'pro_right']"
          v-for="(item, index) in hotProducts"
          :key="index"
          @click="goDetail(item.pid)"
        >
          <div class="pro_img">
            <img :src="item.smallImg" alt="" class="auto_img" />
          </div>
          <div class="pro_name one_text">{{ item.name }}</div>
          <div class="pro_price">￥{{ item.Price }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      timeText: "",
      bannerData: [],
      hotProducts: [],
      name:""
    };
  },
  created() {
    // 在实例创建完成后被立即调用，但页面还没有开始渲染
    this.getTime(); // 调用函数
    this.getBannerData();
    this.getHotProducts();
  },
  mounted() {

  },
  methods: {
    getTime() {
      // 获取当前时间段
      var hours = new Date().getHours();
      if (hours >= 6 && hours < 12) {
        this.timeText = "早上好";
      } else if (hours >= 12 && hours < 18) {
        this.timeText = "下午好";
      } else if (hours >= 18 && hours < 24) {
        this.timeText = "晚上好";
      } else {
        this.timeText = "深夜好";
      }
    },
    // 获取轮播图数据
    getBannerData() {
      this.axios({
        method: "get",
        url: "/banner",
      })
        .then((res) => {
          console.log(res);
          if (res.data.status == 1102) {
            // 轮播图数据请求成功
            this.bannerData = res.data.data.result;
            // console.log(this.bannerData);
          }
        })
        .catch((err) => { });
    },
    // 获取推荐商品数据
    getHotProducts() {
      this.axios({
        method: "get",
        url: "/product",
        params: {  // 根据传入的参数，获取符合要求的数据
          key: "recommend",
          value: true
        }
      }).then(res => {
        // console.log("推荐商品==》",res)
        if (res.data.status == 1002) {
          // 数据请求成功
          this.hotProducts = res.data.data;
          console.log("this.hotProducts==>", this.hotProducts)
          this.getDetail()

        }
      }).catch(err => {
      })
    },
    goDetail(pid) {
      this.$router.push({
        path: "Detail",
        query: {
          pid
        }
      }
      )
    },
    //测试方法 通过 路由api 进行跳转
    goTo() {
      // 通过路由api 进行 页面跳转
      // 第一种
      // this.$router.push({
      //   name:"Detail",
      //   params:{
      //     id:1
      //   }
      // }
      // )
      // 第二种
      // this.$router.push({
      //   path:"Detail",
      //   query:{
      //     id:1
      //   }
      // }
      // )
    },
    search(){
      console.log(111);
      this.$router.push({
        path:"/search",
        query:{
          name:this.name
        }
      })
    }

  },
};
</script>

<style lang="less">
#home {
  background-color: #f0f0f0;

  .home_title {
    font-size: 18px;
    font-weight: bold;
    color: #B22222;
  }
  .van-nav-bar .van-icon {
    color: #ff3b3b;
  }
  .van-search {
    padding: 0;
  }
  .van-search__content {
    background-color: #f0f0f0;
  }
  .hot_product {
    margin-top: 20px;
    padding: 0 14px;
    .hot_product_title {
      font-size: 18px;
      font-weight: bold;
      text-align: left;
      color: #fff;
      background-color: #ff3b3b;
      padding: 10px;
    }
    .pro_left {
      margin-right: 7px;
    }
    .pro_right {
      margin-left: 7px;
    }
    .popduct_item {
      // calc(): css计算函数
      width: calc(50% - 7px);
      text-align: left;
      background-color: #fff;
      margin-top: 7px;
      margin-bottom: 7px;
      padding: 10px;
      box-sizing: border-box;
      // .pro_img{
      //   // width: 150px;
      //   // height: 150px;
      // }

      .pro_name {
        font-size: 16px;
        font-weight: bold;
        color: #333;
        margin: 5px 0;
      }
      .pro_price {
        font-size: 16px;
        font-weight: bold;
        color: #ff3b3b;
      }
    }
  }
  // 轮播图样式
  .banner_box {
    margin: 0 14px;
    .auto_img {
      width: 100%;
      height: 100%;
    }
    .van-swipe__indicator {
      width: 20px;
      height: 2px;
    }
  }
}
</style> 