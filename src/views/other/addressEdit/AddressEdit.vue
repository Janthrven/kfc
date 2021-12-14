<template>
  <div class="address_edit">
    <!-- 导航结构start -->
    <div class="nav">
      <van-nav-bar
        title="地址编辑"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <!-- 导航结构end-->
    <div>
      <van-address-edit
        :area-list="areaList"
        :address-info="list"
        show-postal
        show-delete
        show-set-default
        show-search-result
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
      />
    </div>
  </div>
</template>
<script>
// 引入封装好的 接口
import { address, deleteAddress } from "@/network/url.js";
// 引入 地区数据列表
import { areaList } from "@vant/area-data";
export default {
  name: "AddressEdit",
  data() {
    return {
      areaList,
      list: "",
      index: "",
      area: "",
    };
  },
  methods: {
    //   通过 同步添加 地址数据
    async address(info) {
      // 调用自定义封装的接口
      let result = await address(info);
      //   判断 接口是否请求成功
      if (result.status === 200) {
        //   判读是否 成功添加地址
        if (result.data.stutas === 1999) {
          //   成功的轻提示
          this.$toast.success(result.data.msg);
        }
      }
      console.log(result);
    },
    // 保存之后 触发此方法 拿到文本数据
    onSave(e) {
      console.log(e);
      //假设数据那里有值  获取 否则进行数据推入存储
      let arr = JSON.parse(localStorage.getItem("code")) || [];
      //进行地区编码的存储
      arr.push(e.areaCode);
      //数据存储完毕 进行本地缓存
      localStorage.setItem("code", JSON.stringify(arr));

      // 处理需要传递的数据
      let info = {
        userId: localStorage.getItem("CSTK"),
        name: e.name,
        phone: e.tel,
        area: e.province + "/" + e.city + "/" + e.county,
        detialArea: e.addressDetail,
        mail: e.postalCode,
        defaultAddress: e.isDefault,
      };
      //   调用 添加地址的方法 传入实参
      this.address(info);
    },
    // 删除之后 触发此方法 提示用户删除成功
    onDelete() {
      let info = {
        userId: localStorage.getItem("CSTK"),
        addId: this.list.addId,
      };
      deleteAddress(info).then((res) => {
        if (res.data.status === 200) {
          if (res.data.stutas === 9901) {
            this.$toast.success(res.data.msg);
            //删除成功  返回地址列表
            this.$router.go(-1);
          }
        }
      });
      //console.log('delete');
    },
    onClickLeft() {
      // 返回上一级
      this.$router.go(-1);
    },
  },
  created() {
    //获取对应地址编码下标
    let index = this.$router.params.index;
    //赋值   初始化页面数据
    let area = JSON.parse(localStorage.getItem("code"));
    //赋值地区编码
    this.list.areaCode = area[index];
    //console.log(this.$route.params.option);
  },
};
</script>
<style lang="less" scoped>
.address_edit {
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