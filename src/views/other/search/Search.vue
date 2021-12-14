<template>
  <div class="search">
    
      <!-- 导航结构start -->
      <div class="nav">
        <van-nav-bar 
        title="搜索页" 
        left-text="返回" 
        left-arrow 
        @click-left="onClickLeft"
        />
      </div>
      <!-- 导航结构end -->
      <!-- 搜索框start -->
      <div class="search_box">
        <van-search
          v-model="value"
          shape="round"
          placeholder="请输入搜索关键词"
          @search="search(value)"
        />
      </div>
      <!-- 搜索框end -->
      <!-- 商品内容start -->
      <div class="product_box">
        <div class="product" v-for="(item, index) in product" :key="index">
          <van-card
            num="1"
            :price="item.Price"
            :title="item.name"
            :thumb="item.largeImg"
          />
        </div>
      </div>
      <!-- 商品内容end -->
    
  </div>
</template>
<script>
import { search } from "@/network/url.js";
export default {
  name: "Search",
  data() {
    return {
      value: "",
      product:{}
    };
  },
  methods: {
      //搜索商品的方法
    async search(key) {
        console.log(key);
        //调用搜索的接口
      let res = await search(key);
      console.log(res);
      if(res.status===200){
          if(res.data.stutas===1902){
              this.product=res.data.data
          }
          if(res.data.status===1901){
              //轻提示
              this.$toast.fail(res.data.msg)//提示返回数据里的msg信息
              this.$toast.fail("没有该商品")//或者提示自己定义的文本
              //初始化
              this.product=res.data.data
              //console.log(res.data.data);
          }
      }
      
    },
    //返回上一个页面
    onClickLeft() {
      this.$router.go(-1);
    },
  },
  created() {
    console.log(this.$route);
    //解构赋值
    let { name } = this.$route.query;
    //将传递过来的值渲染到搜索框里
    this.value=name
    //调用获取搜索商品的方法
    this.search(name);
  },
};
</script>
<style lang="less" scoped>
.search{
    min-height: 100vh;
  background-color: #f0f0f0;
  // 顶部导航
  .nav {
    //   sass  ::v-depp
    // less /deep/
    //  深度设置类名
    /deep/ .van-icon {
      color: #ff3b3b !important;
    }
    //  深度设置类名
    /deep/ .van-nav-bar__text {
      color: #ff3b3b !important;
    }
  }
  .search_box{
      border-radius: 50px;
      margin: 10px;
      overflow: hidden;
      .van-search-content{
          background-color: #fff;
      }
      .van_search{
          padding: 0;
      }
  }
  .product_box{
      margin: 0 10px;
      .product{
          box-shadow: 0 2px 3px 2px rgba(0,0,0,0.1);
          border-radius: 20px;
          margin-bottom: 10px;
          overflow: hidden;
      }
  }
}
</style>