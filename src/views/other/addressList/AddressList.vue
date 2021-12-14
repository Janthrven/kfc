<template>
  <div class="address_list">
    <!-- 导航结构start -->
    <div class="nav">
      <van-nav-bar
        title="地址列表"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <!-- 导航结构end-->
    <div>
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
      />
    </div>
  </div>
</template>
<script>
import { getAddress } from "@/network/url.js"
export default {
  name: "AddressList",
  data() {
    return {
      list: [],
      chosenAddressId:""
    }
  },
  methods: {
    async getAddress() {
      let id = localStorage.getItem("CSTK")
      let result = await getAddress(id)
      console.log(result);
      if (result.status === 200) {
        let arr = result.data.data
        console.log(arr);
        // 通过变量 循环 数据
        arr.forEach(v => {
          // 每一次循环 创建一个新的对象
          let listObj = {
            id: v.addId,
            name: v.name,
            tel: v.phone,
            address: v.area + v.detialArea,
            isDefault: v.defaultAddress,
            postalCode:v.mail,
            addressDetail:v.detialArea,
            addId:v.addId
          }
        //   通过数组的api 将每一次的数据 推进到list属性里
          this.list.push(listObj)
        });
        console.log(this.list);
        // 判断 地址状态 是否为默认 
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].isDefault) {
            //   将默认地址 选中
            this.chosenAddressId=this.list[i].id
            // 通数组的api 将 默认的地址 推到 数据第一项
            this.list.unshift(this.list[i])
            // 通过数组的api 裁切 之前重复的数据
            this.list.splice(i+1,1)
            // 当找到 默认的地址 终止循环
            return
          }
        }
      }
    },
    onClickLeft() {
        // 返回上一级
        this.$router.go(-1)
    },
    onAdd() {
        this.$router.push("/addressEdit")
    },
    onEdit(item) {
        this.$router.push({
            name:"AddressEdit",
            params:{
                option:item,
                index
            }
        })
    }
  },
  created() {
    this.getAddress()
  }
}
</script>
<style lang="less" scoped>
.address_list {
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
}
</style>