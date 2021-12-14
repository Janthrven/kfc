<template>
  <div class="submit">
    <!-- 顶部导航start -->
    <div class="nav">
      <van-nav-bar
        title="订单结算"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <!-- 顶部导航end -->
    <!-- 地址弹出层start -->
    <div>
      <van-cell is-link :lock-scroll="false" @click="showPopup"
        >选择地址</van-cell
      >
      <van-popup
        closeable
        v-model="show"
        position="bottom"
        round
        :style="{ height: '35%', paddingTop: '30px' }"
      >
        <van-address-list
          v-model="chosenAddressId"
          :list="list"
          default-tag-text="默认"
          @add="onAdd"
          @edit="onEdit"
          @select="select"
        />
      </van-popup>
    </div>
    <!-- 地址弹出层end-->
    <!-- 地址信息结构start -->
    <div class="address_text">
      <div class="address_title">
        <div>{{ addresList.name }}</div>
        <div class="addres_item">{{ addresList.tel }}</div>
        <div class="default addres_item" v-show="addresList.isDefault">
          默认
        </div>
      </div>
      <div class="address_detail">
        {{ addresList.address }}
      </div>
    </div>
    <!-- 地址信息结构end-->
    <div class="product_detail">
      <div class="product_title">订单信息</div>
      <div class="product" v-for="(item, index) in productList" :key="index">
        <van-card
          :num="item.count"
          :price="item.product.Price"
          :title="item.product.name"
          :thumb="item.product.largeImg"
        />
      </div>
    </div>
    <hr class="hr" />
    <div class="product_text">
      <div class="product_time">订单时间:{{ time }}</div>
      <div class="product_money">
        <div class="left">商品数量:{{ sum }}</div>
        <div class="right">总金额:{{ sumMoney }}</div>
      </div>
    </div>
    <div class="btn">
      <van-button type="danger" block @click="order">提交订单</van-button>
    </div>
  </div>
</template>
<script>
import { getAddress, order } from "@/network/url.js";
export default {
  name: "Submit",
  data() {
    return {
      show: false,
      list: [],
      chosenAddressId: "",
      addresList: [],
      productList: [],
      sum: 0,
      sumMoney: 0,
      time: "",
    };
  },
  methods: {
    //   获取地址列表数据
    async getAddress() {
      let id = localStorage.getItem("CSTK");
      let result = await getAddress(id);
      //  每次请求初始化 数据
      this.list = [];
      if (result.status === 200) {
        let arr = result.data.data;
        // 通过变量 循环 数据
        arr.forEach((v) => {
          // 每一次循环 创建一个新的对象
          let listObj = {
            id: v.addId,
            name: v.name,
            tel: v.phone,
            address: v.area + v.detialArea,
            isDefault: v.defaultAddress,
          };
          //   通过数组的api 将每一次的数据 推进到list属性里
          this.list.push(listObj);
        });

        console.log(this.list);
        //初始化 赋值数据到地址信息里
        this.addresList = this.list[0];
        // 判断 地址状态 是否为默认
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].isDefault) {
            //   将默认地址 选中
            this.chosenAddressId = this.list[i].id;
            // 通过数组的api 将 默认的地址 推到 数据第一项
            this.list.unshift(this.list[i]);
            // 通过数组的api 裁切 之前重复的数据
            this.list.splice(i + 1, 1);
            // 当找到 默认的地址 终止循环
            return;
          }
        }
      }
    },
    //提交订单,原本写的是async同步获取数据，但是会报错，去掉并改成异步就好了
    order() {
      this.$dialog
        .confirm({
          title: "确认提交订单吗？",
        })
        .then(() => {
          //处理提交订单的参数
          let info = {
            id: localStorage.getItem("CSTK"), //用户id
            product: this.productList, //提交的购物车的产品
            allPrice: this.sumMoney, //总价格
            address: this.list[0].address, //地址
            sum: this.sum,
          };
          //调用提交订单的接口
          order(info).then((res) => {
            if (res.status === 200) {
              if (res.data.status === 1401) {
                this.$toast.success(res.data.msg);
                //跳转到订单页面
                this.$router.push("/order");
              } else {
                this.$toast.fail(res.data.msg);
              }
            }
          });
        })
        .catch(() => {
          this.$toast.fail("用户取消订单");
        });
    },

    //地址编辑
    onAdd() {
      this.$router.push("/addressEdit");
    },
    onEdit(item) {
      this.$router.push({
        name: "AddressEdit",
        params: {
          option: item,
        },
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    showPopup() {
      this.show = true;
      // 调用获取 地址列表数据的方法
      //   this.getAddress()
    },
    // 选择任意地址 触发此方法
    select(item) {
      // 调用 组件
      this.$dialog
        .confirm({
          title: "确认修改地址吗",
        })
        .then(() => {
          // 重新赋值 渲染地址信息
          this.addresList = item;
          // 关闭弹出层
          this.show = false;
        })
        .catch(() => {
          // 初始化 选项框
          this.chosenAddressId = this.list[0].id;
        });
    },
    // 计算商品数量和金额
    computed() {
      // 初始化 数据
      this.sum = 0;
      this.sumMoney = 0;
      // 通过循环 进行 数据的合计
      this.productList.forEach((v) => {
        // 合计总数量
        this.sum += v.count;
        // 合计总金额
        this.sumMoney += v.product.Price * v.count;
      });
    },
  },
  created() {
    //   调用获取地址列表 渲染第一条地址信息
    this.getAddress();
    // 将字符串 转换成对象 赋值
    //query可以改成params  路由也要改
    this.productList = JSON.parse(this.$route.query.list);
    // 调用合计的方法
    this.computed();
    // 获取订单提交的时间
    this.time = localStorage.getItem("time");
  },
  // 当页面处于活跃状态的时候 触发

  //一样 写在activated方法里面获取不到数据，必须写在created里面
  activated() {
    // 将字符串 转换成对象 赋值
    //query可以改成params  路由也要改
    //this.productList = JSON.parse(this.$route.query.list);
    // 调用合计的方法
   // this.computed();
    // 获取订单提交的时间
    //this.time = localStorage.getItem("time");
  },
};
</script>
<style lang="less" scoped>
.submit {
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
    //  深度设置类名 图标
    /deep/ .van-icon {
      color: #ff3b3b !important;
    }
    //  深度设置类名 文本
    /deep/ .van-nav-bar__text {
      color: #ff3b3b !important;
    }
  }
  //  地址信息
  .address_text {
    font-size: 16px;
    padding: 0 16px;
    padding-bottom: 10px;
    background-color: #fff;

    .address_title {
      width: 60%;
      display: flex;
      align-items: center;
      .addres_item {
        margin-left: 10px;
      }
      .default {
        color: #fff;
        font-size: 14px;
        padding: 2px;
        border-radius: 10px;
        background-color: red;
      }
    }
    .address_detail {
      text-align: start;
      
      margin-top: 5px;
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
    .product_title {
      font-size: 16px;
      padding: 10px 0;
    }
    .product {
      .van-card {
        background-color: #fff;
        text-align: start;
        font-size: 13px;
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
    background-color: #fff;
    font-size: 16px;
    padding: 10px;
    border-radius: 15px 15px 0 0;
    margin: 0 16px;
    .product_time {
      padding: 10px 0;
    }
    .product_money {
      display: flex;
      justify-content: space-between;
      align-items: center;
      //.left {
      //}
      //.right {
      //}
    }
  }
  .btn {
    margin: 0 20px;
    position: fixed;
    bottom: 10px;
    width: 335px;
    .van-button {
      border-radius: 50px;
    }
  }
}
</style>