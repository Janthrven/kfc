<template>
  <div class="detail">
    <!-- 导航结构start -->
    <div class="nav">
      <van-nav-bar
        title="详情页"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <!-- 导航结构end -->
    <!-- 商品图片结构start -->
    <div class="detail_img">
      <img :src="product.largeImg" class="img" />
    </div>
    <!-- 商品图片结构end -->
    <!-- 商品详情 结构satrt -->
    <div class="detail_type">
      <!-- 标题 -->
      <div class="title">
        商品名称:
        <div class="title_left">
          {{ product.name }}
        </div>
      </div>
      <!-- 类型 -->
      <div class="type_box">
        商品类型:
        <div class="type" v-for="(item, index) in product.desc" :key="index">
          {{ item }}
        </div>
      </div>

      <!-- 商品金额 -->
      <div class="price">
        商品金额:<span class="sp"
          >￥{{ product.Price
          }}<s
            ><i>￥{{ product.Price * 2 }}</i></s
          ></span
        >
        <div class="step">
          <van-stepper
            v-model="value"
            theme="round"
            button-size="22"
            disable-input
          />
        </div>
      </div>
      <div class="detail_product">
        <van-tabs v-model="active">
          <van-tab title="商品详情">
            <div class="text_box">
              <div
                class="text"
                v-for="(item, index) in product.notice"
                :key="index"
              >
                {{ index + 1 }}.{{ item }}
              </div>
            </div>
          </van-tab>
          <van-tab title="评价">内容 2</van-tab>
        </van-tabs>
      </div>
      <!-- 商品详情 -->
    </div>
    <!-- 商品详情 结构end -->

    <!-- 底部导航start -->
    <div>
      <van-goods-action>
        <van-goods-action-icon
          icon="cart-o"
          text="购物车"
          to="/shopbag"
          :badge="arr.length"
          :color="isShow ? '#ff3b3b' : ''"
        />
        <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
        <van-goods-action-button
          type="warning"
          text="加入购物车"
          @click="addShop"
        />
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
    </div>
    <!-- 底部导航end-->
  </div>
</template>
<script>
// 调用 自定义封装好的 接口
import { addShopping, getShop } from "@/network/url.js"
export default {
  name: "Detail",
  data() {
    return {
      active: 0,
      product: "",
      value: 1,
      isfalse: false,
      // 配置接口需要的参数
      info: {
        count: "",
        product: ""
      },
      isShow: false,
      arr: []
    }
  },
  methods: {
    //    获取详情页数据
    getDetail(pid) {
      this.axios({
        url: "/detail",
        method: "get",
        params: {
          pid
        }
      }).then(res => {
        // 判断 接口是否请求成功
        if (res.status === 200) {
          // 判断是否 成功获取数据
          if (res.data.status === 702) {
            this.product = res.data.data[0]
            console.log("商品详情数据=》", this.product);
            // 调用查询购物车 数量的接口
            this.getShop()
          }
        }
      })
    },
    // 添加到购物车
    addShop() {
      // 获取登录后的 token
      let token = localStorage.getItem("CSTK")
      // 判断是否登录
      if (!token) {
        this.$toast.fail("请先登录")
        // 未登录 跳转到登录页面
        this.$router.push("/login")
        // 终止后续的代码执行
        return
      }

      // 配置 接口参数
      this.info = {
        id: localStorage.getItem("CSTK"),
        count: this.value,
        product: this.product
      }
      // 调用 自定义封装的接口
      addShopping(this.info).then(res => {
        console.log(res);
        if (res.status === 200) {
          // 判断是否 成功获取数据
          if (res.data.stutas === 1201) {
            // 成功的轻提示
            this.$toast.success(res.data.msg)
            // 加入购物车 获取 商品的条目数  
            this.getShop()

          } else {
            // 失败的轻提示
            this.$toast.fail(res.data.msg)

          }
        }
      })

    },
    // 获取购物车的数据
    async getShop() {
      // 获取本地缓存的token
      let id = localStorage.getItem("CSTK")
      // 同步获取数据
      let result = await getShop(id)
      if (result.status === 200) {
        if (result.data.stutas === 1302) {
          // 赋值 数据 渲染商品的条目数
          this.arr = result.data.data

          for (let i = 0; i < result.data.data.length; i++) {
            // 判断商品 是否 加入了购物车
            if (result.data.data[i].product.pid === this.product.pid) {
              // 显示高亮
              this.isShow = true
              return
            }
            // 否则 默认的状态
            this.isShow = false

          }

        }
      }
    },

    //    返回上一个页面
    onClickLeft() {
      this.$router.go(-1)
    },

  },
  created() {
    let { pid } = this.$route.query

    // 调用 获取详情页的方法 传递实参
    this.getDetail(pid)
  },
  activated(){//用这个方法获取不了数据
     //   解构赋值
    //let { pid } = this.$route.query

    // 调用 获取详情页的方法 传递实参
    //this.getDetail(pid)
  }
}
</script>
<style lang="less" scoped>
.detail {
  min-height: 100vh;
  background-color: #f0f0f0;
  //  导航样式

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
  //  商品图片样式
  .detail_img {
    width: 100%;
    .img {
      width: 100%;
      height: 100%;
    }
  }
  // 商品详情样式
  // relative(相对定位) absolute;(绝对定位) sticky(黏性定位) fixed(固定定位)
  .detail_type {
    position: relative;
    top: -70px;
    width: 90%;
    padding: 20px 10px;
    border-radius: 10px 10px 0 0;
    margin: 0 auto;
    background-color: rgba(253, 253, 253, 0.5);
    // 背景渐变色
    // background-image: linear-gradient(
    //   rgba(182, 182, 182, 0.5) 200px ;rgba(182, 182, 182, 0.5) 100px
    // );
    // 商品标题
    .title {
      font-size: 18px;
      font-weight: bold;
      text-align: start;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      .title_left {
        width: 100%;
        font-size: 16px;
        font-weight: normal;
      }
      .title_right {
        color: #ff3b3b;
        font-weight: normal;
        line-height: 40px;
      }
    }
    // 商品类型
    .type_box {
      min-height: 80px;
      font-size: 18px;
      font-weight: bold;
      margin: 20px 0;
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      .type:nth-of-type(n + 3) {
        margin-top: 10px;
      }

      .type:nth-of-type(2n + 1) {
        margin-left: 0;
      }
      .type:nth-of-type(5) {
        margin-left: 15px;
      }
      .type {
        min-width: 90px;
        color: #000;
        font-size: 14px;
        font-weight: normal;
        padding: 5px;
        border-radius: 20px;
        margin-left: 15px;
        background-color: #fff;
        text-align: center;
      }
    }
    // 商品金额
    .price {
      font-size: 18px;
      font-weight: bold;
      text-align: start;
      display: flex;
      //交叉轴上的布局  设置 子元素 在交叉轴方向居中
      align-items: center;
      // 水平轴上的布局  设置 子元素 靠到左右两边
      // justify-content: space-between;
      .sp {
        color: #ff3b3b;
      }
      s {
        color: #ccc;
        font-weight: lighter;
        margin-left: 10px;
      }
      .step {
        margin-left: 50px;
        // /deep/ .van-stepper__minus{
        //   background-color: #ccc;
        // }
      }
    }
    .detail_product {
      min-height: 100px;
      margin-top: 20px;
      background-color: #fff;
    }
    // 商品详情
    .text_box {
      display: flex;
      flex-wrap: wrap;
      .text_title {
        width: 100%;
        font-size: 18px;
        font-weight: bold;
        margin: 10px 0;
        text-align: start;
      }
      .text:nth-of-type(1) {
        margin-top: 10px;
      }
      .text {
        font-size: 14px;
        margin-bottom: 10px;
        text-align: start;
      }
    }
  }
}
</style>