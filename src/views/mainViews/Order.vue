<template>
  <div id="order">
    <!-- 顶部导航start -->
    <div class="nav">
      <van-nav-bar
        title="查询订单"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <!-- 顶部导航start -->
    <!-- 标签切换 start -->
    <div>
      <van-tabs v-model="active" animated @change="getOrder">
        <van-tab v-for="(item, index) in list" :key="index" :title="item.title">
          <div v-for="(items, index) in productList" :key="index">
            <div class="product_detail">
              <div class="product_nav">
                <div class="product_title">订单编码:{{ items.id }}</div>
                <div class="submit" @click="changeOrder(items)">
                  {{ items.take }}
                </div>
              </div>

              <div
                class="product"
                v-for="(v, index) in items.product"
                :key="index"
              >
                <van-card
                  :num="v.count"
                  :price="v.product.Price"
                  :title="v.product.name"
                  :thumb="v.product.largeImg"
                />
              </div>
            </div>
            <hr class="hr" />
            <div class="product_text">
              <div class="product_time">订单时间:{{ items.created_at }}</div>
              <div class="product_money">
                <div class="left">商品数量:{{ items.sum }}</div>
                <div class="right">总金额:{{ items.allPrice }}</div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 标签切换 end -->
  </div>
</template>
<script>
import { getOrder,delectOrder,take } from "@/network/url.js";
export default {
  name: "Order",
  data() {
    return {
      count: 0,
      active: 0,
      list: [
        {
          id: 1,
          title: "全部",
        },
        {
          id: 2,
          title: "已收货",
        },
        {
          id: 3,
          title: "未收货",
        },
      ],
      productList: [],
    };
  },
  methods: {
    //   获取订单信息
    async getOrder(name) {
      //  数据转换
      let index = -(name - 2);
      let info = {
        id: localStorage.getItem("CSTK"),
        stutas: index,
      };
      let res = await getOrder(info);
      //console.log(res);
      if (res.status === 200) {
        if (res.data.stutas === 1902) {
          // 通过创建 变量 初始化数据
          this.productList = res.data.data;
          //console.log(this.productList);
          this.isShow=false
          //判断当前的状态  重新实现不同的订单功能
          for (let i = 0; i < this.productList.length; i++) {
            //通过不同状态   添加自身不同的属性  实现不同的功能
            if (this.productList[i].stutas === 1) {
              this.productList[i].take = "删除";
              this.productList[i].flag = true;
            } else if (this.productList[i].stutas === 0) {
              this.productList[i].take = "确认收货";
              this.productList[i].flag = false;
            }
          }
        }
        // 数据为空 初始化数据
        if (res.data.stutas === 1901) {
          this.productList = [];
          this.isShow=true
        }
      }
    },
    //点击获取订单id 切换状态
    async changeOrder(item) {
  
        //处理不同的状态  调用不同的接口
        let info = {
          id: localStorage.getItem("CSTK"),
          orderId: item.orderId,
        };
        //判断订单不同的状态  实现不同的功能
        if(item.flag){
          this.$dialog.confirm({
            title:'是否删除订单？',
          })
          .then(() => {
            //调用删除的接口
            delectOrder(info).then(res => {
              if(res.status===200){
                if(res.data.stutas===502){
                  this.$toast.success(res.data.msg)
                  //调用查询订单的接口，重新获取数据
                  this.getOrder(name)
                }else{
                  this.$toast.fail(res.data.msg)
                }
              }
            })
          })
          .catch(() => {
               this.$toast.fail("用户取消删除")
          });
        }else{
          this.$dialog.confirm({
            title:'是否确认收货？',
          })
          .then(() => {
            //调用 修改订单状态的接口
            take(info).then(res => {
              if(res.status===200){
                if(res.data.stutas===1311){
                  this.$toast.success("收货成功")
                  //调用获取订单的接口  重新获取订单状态
                  this.getOrder(name)
                }else{
                  this.$toast.fail(res.data.msg)
                }
              }
            })
          })
          .catch(() => {
               this.$toast.fail("用户取消收货")
          });
        }
            
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
  created() {
    this.getOrder(name);
  },
};
</script>
<style lang="less" scoped>
#order {
  min-height: 100vh;
  padding-bottom: 30px;
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
  }

  // 商品详情
  .product_detail {
    padding: 10px;
    border-radius: 0 0 15px 15px;
    margin: 0 16px;
    margin-top: 20px;
    background-color: #fff;
    overflow: hidden;
    .product_nav {
      font-size: 16px;
      display: flex;
      justify-content: space-between;
      .product_title {
        padding: 10px 0;
      }
      .submit {
        padding: 10px 0;
      }
    }

    .product {
      .van-card {
        background-color: #fff;
      }
    }
  }
  .hr {
    width: 320px;
    border: 1px dotted;
    margin: 0 auto;
  }
  // 订单详情
  .product_text {
    font-size: 16px;
    padding: 10px;
    border-radius: 15px 15px 0 0;
    margin: 0 16px;
    background-color: #fff;
    .product_time {
      padding: 10px 0;
    }
    .product_money {
      display: flex;
      justify-content: space-between;
      align-items: center;
      //.left {
    }
    //.right {
    //}
  }
}
</style>