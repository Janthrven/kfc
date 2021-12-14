<template>
  <div id="shopbag">
    <!-- 顶部导航start -->
    <div class="nav">
      <van-nav-bar
        title="购物车"
        left-text="返回"
        :right-text="isflag ? '完成' : '编辑'"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </div>
    <!-- 顶部导航start -->
    <!-- 背景start -->
    <div class="bg">
      <img :src="img" width="100%" />
    </div>
    <!-- 背景end -->
    <!-- 空状态 -->
    <van-empty description="暂无商品" v-show="flag" />
    <!-- 商品结构start -->
    <div class="product_box">
      <div class="product" v-for="(v, i) in product" :key="i">
        <van-swipe-cell>
          <!-- 复选框 -->
          <div>
            <van-checkbox v-model="v.checked" @change="change(v)" />
          </div>
          <van-card
            :price="v.product.Price"
            :title="v.product.name"
            class="goods-card"
            :thumb="v.product.largeImg"
          />
          <template #right>
            <van-button
              square
              text="删除"
              type="danger"
              class="delete-button"
              @click="del(v)"
            />
          </template>
          <!-- 步进器 -->
          <div>
            <van-stepper v-model="v.count" theme="round" button-size="22" />
          </div>
        </van-swipe-cell>
      </div>
      <!-- 商品结构end -->
    </div>
    <!-- 底部导航start -->

    <div class="footer">
      <van-submit-bar
        :price="sumMoney"
        :button-color="isflag ? '#ff6034' : ''"
        :button-text="isflag ? '删除' : '提交订单'"
        @submit="target"
      >
        <van-checkbox v-model="checkAll" @click="checkedAll">全选</van-checkbox>
      </van-submit-bar>
    </div>
    <!-- 底部导航end-->
  </div>
</template>
<script>
import { getShop, delShop } from "@/network/url.js"
export default {
  name: "Shopbag",
  data() {
    return {
      img: "	https://kfc.insideria.vip/uploads/attach/2021/06/20210624/c558a101ec068483d2de3d200f98041a.jpg",
      checkAll: false,
      // 商品
      product: [],
      isflag: false,
      // 删除接口的参数
      info: {
        id: "",
        carIdArr: ""
      },
      // 是否显示 空状态
      flag: false,
    }
  },
  // 计算属性 可以监听 其他值的变化
  computed: {
    sumMoney() {
      // 自定义要计算的金额
      let price = 0
      // 通过循环 判断 当前是否勾选了商品
      for (let i = 0; i < this.product.length; i++) {
        if (this.product[i].checked) {
          // 进行价格的累加
          price += this.product[i].product.Price * this.product[i].count
        }
      }
      // 返回最终的结果
      return price * 100
    }
  },
  methods: {
    onClickLeft() {
      // 跳转到上一级页面
      this.$router.go(-1)
    },
    onClickRight() {
      this.isflag = !this.isflag
    },
    target() {
      // 通过自定义的 arr数组 存储数据
      let arr = []
      if (this.isflag) {
        //  布尔值为 true 执行 删除逻辑
        if (this.product.length == 0) {
          this.$toast.fail("请勾选商品")
          return
        }

        // 循环判断 是否有勾选的商品
        this.product.forEach(v => {
          if (v.checked) {
            // 将勾选的商品 carId 进行存储
            arr.push(v.carId)
          }
        })
        // 未勾选商品 则提示用户 需要勾选 并终止后续的代码执行
        if (arr.length === 0) {
          this.$toast.fail("请勾选商品")
          return
        }
        // 配置 相应的参数 进行 传参
        this.info.id = localStorage.getItem("CSTK")
        this.info.carIdArr = arr
        // 调用 删除的接口 传递参数 删除相应商品
        this.delShop(this.info)
      } else {
        //  布尔值为 false 执行 提交订单逻辑
      



        // 存储需要传递的数据
        let arr = []
        // 处理选中的商品 传递到订单页面
        for (let i = 0; i < this.product.length; i++) {
          // 判断商品是否被选中
          if (this.product[i].checked) {
            // 把选中的商品 推进 arr里 进行传递
            arr.push(this.product[i])
          }
        }
        // 判断 数据是否为空
        if (arr.length == 0) {
          this.$toast.fail("请选择需要购买的商品")
          // 终止后续代码执行 阻止路由跳转
          return
        }
          // 年份
        let year = new Date().getFullYear()
        // 月份
        let month = new Date().getMonth() + 1
        // 日期
        let data = new Date().getDate()
        // 小时
        let hours = new Date().getHours()

        // 分钟
        let minutes = new Date().getMinutes()

        // 秒数
        let s = "" + new Date().getMilliseconds()
        let second = s.slice(0, 2)
        // 转换成十位数
        hours = hours < 10 ? "0" + hours : hours
        minutes = minutes < 10 ? "0" + minutes : minutes
        second = second < 10 ? "0" + second : second

        let time = `${year}-${month}-${data} ${hours}:${minutes}:${second}`
        // 将处理好 的时间存储到本地缓存里
        localStorage.setItem("time",time)

        this.$router.push({
          path: "/submit",
          query: {
            // 将数据转换成字符串的形式 进行传递参数
            list:JSON.stringify(arr)
          }
        })
      }
    },
    // 同步获取 数据
    async getShop() {
      // 获取本地缓存的token
      let id = localStorage.getItem("CSTK")
      // 同步获取数据
      let result = await getShop(id)
      if (result.status === 200) {
        if (result.data.stutas === 1302) {
          // 通过 循环 自定义自身的checked 属性 
          let arr = result.data.data
          arr.forEach((item, index) => {
            // 给每一项 添加自身的checked属性
            item.checked = false
          });
          this.product = arr
          console.log(this.product);

        }
        //  判断是否显示 空状态
        // 购物车数据为空 
        if (result.data.stutas === 1301) {
          // 初始化数据
          this.product = ""
          this.checkAll = false
          // 显示空状态
          this.flag = true
        } else {
          // 不显示
          this.flag = false
        }
      }
    },
    // 同步删除 购物车数据
    async delShop(info) {
      let result = await delShop(info)
      console.log(result);
      // 判断 接口 是否请求成功
      if (result.status === 200) {
        // 判断 是否 成功获取数据
        if (result.data.stutas === 1501) {
          // 轻提示
          this.$toast.success(result.data.msg)
          //重新获取数据 渲染页面
          this.getShop()
        }
      }
    },
    del(v) {
      //获取本地缓存 数据
      this.info.id = localStorage.getItem("CSTK")
      // 将carId 以数组形式 进行 传递数据
      this.info.carIdArr = `[${v.carId}]`
      // 调用删除的接口
      this.delShop(this.info)
    },
    // 复选框发生改变时 调用此方法
    change(v) {
      // 当 单选逻辑 改变时 调用 累加金额的方法 并且传递 相应的参数
      this.checkIdea(v)

    },
    // 单选逻辑
    checkIdea(v) {
      for (let i = 0; i < this.product.length; i++) {
        // 判断 商品是否 选中 
        // 如果 checked是 false 进入判断
        if (!this.product[i].checked) {
          // 取消全选
          this.checkAll = false
          return
        }
        // 全选
        this.checkAll = true
      }
    },
    // 全选逻辑
    checkedAll() {
      this.product.forEach(v => {
        // checked属性 根据全选的属性 变化 而变化
        v.checked = this.checkAll
      })
      console.log(this.product);
    },
    // 判断用户是否登录
    select() {
      // 获取登录后的 token
      let CSTK = localStorage.getItem("CSTK")
      // 判断是否登录
      if (!CSTK) {
        // 轻提示 
        this.$toast.fail("请先登录")
        // 未登录 跳转到登录页面
        this.$router.push("/login")
        // 终止后续的代码执行
        return
      }
    }



  },
  created() {
    this.getShop()
    this.select()
  }
}
</script>
<style lang="less" scoped>
#shopbag {
  min-height: 100vh;
  background-color: #f0f0f0;
  // 顶部导航
  .nav {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
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
    ///deep/.van-nav-bar {
    //}
  }
  // 商品样式
  .product_box {
    padding-bottom: 50px;
    .product {
      box-shadow: 0 2px 5px 2px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      margin: 10px;
      background-color: #fff;
      // 溢出的内容隐藏
      overflow: hidden;
      /deep/ .van-swipe-cell__wrapper {
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
      /deep/.van-stepper {
        position: absolute;
        right: 30px;
        bottom: 10px;
      }
      /deep/.van-card {
        background-color: #fff;
        flex: 1;
        text-align: start;
      }
      /deep/ .van-checkbox {
        margin: 0 10px;
      }
      .delete-button {
        height: 100%;
      }
      .van-card__price {
        color: #ee0a24;
        font-size: 14px;
        font-weight: bold;
        
      }
      .van-card__title {
        font-size: 14px;
      }
    }
  }
  // 底部样式
  .footer {
    position: fixed;
    bottom: 0;
    z-index: 99;
    height: 60px;
    font-size: 16px;
    background-color: #fff;
    display: flex;
    // 子元素 保持一定的距离
    // justify-content: space-around;
    // 交叉轴方向 居中
    align-items: center;
    .van-submit-bar {
      bottom: 50px;
    }
    .footer_checkAll {
      display: flex;
      margin-left: 20px;
      .check_text {
        margin-left: 10px;
      }
    }
    .footer_price {
      margin: 0 20px;
      //.price_text {
      //}
      .price_sum {
        color: #ff3b3b;
      }
    }
    .btn_box {
      margin: 0 4px;
      margin-left: 0;
      .btn {
        width: 140px;
        height: 39px;
        color: #fff;
        font-size: 16px;
        border-radius: 30px;
        background-image: linear-gradient(to right;#ff6034, #ee0a24);
      }
    }
  }
}
</style>