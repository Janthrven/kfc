<template>
  <div id="login">
      <!-- 导航条 -->
    <van-nav-bar title="登录" left-arrow @click-left="goPage" />

      <!-- 中心logo -->
    <div class="logo_img">
      <img src="../assets/images/icon-kfc.png" alt="" />
      <div class="logo_text">肯德基</div>
    </div>
      <!-- 表单 -->
    <div class="login_form ">
      <van-form>
        <van-field
          placeholder="请输入你的手机号"
          v-model="userLoginInfo.phone"
        />
        <van-field
          :type="isShowLoginPsd ? 'text' : 'password'"
          placeholder="请输入密码"
          v-model="userLoginInfo.password"
          :right-icon="isShowLoginPsd ? 'eye-o' : 'closed-eye'"
          @click-right-icon="showPsd('isShowLoginPsd')"
        />
        <div class="clearfix forgot">
          <span class="fr">忘记密码?</span>
        </div>

        <div class="login_btn">
          <van-button round block color="#ff3b3b" type="info" native-type="submit" @click="login"
            >登&nbsp;&nbsp;录</van-button
          >
        </div>
        <div class="reg_btn">
          <van-button round block native-type="submit"
          @click="openRegister">注&nbsp;&nbsp;册</van-button
          >
        </div>
        </van-form>
        </div>

        <!-- 注册框-->
        <van-popup v-model="isRegister" position="bottom" class="popup-box" closeable>
           
      <div class="register_title">注册</div>
      <van-form>
        <van-field
        label="手机号"
        label-width="1.2rem"
          placeholder="请输入你的手机号"
          v-model="userRegisterInfo.phone"
        />
         <van-field
        label="昵称"
        label-width="1.2rem"
          placeholder="2-10个字符"
          v-model="userRegisterInfo.nickname"
        />
        <van-field
        label="密码"
        label-width="1.2rem"
          :type="isShowRegisterPsd ? 'text' : 'password'"
          placeholder="6-8位且字母开头"
          v-model="userRegisterInfo.password"
          :right-icon="isShowRegisterPsd ? 'eye-o' : 'closed-eye'"
          @click-right-icon="showPsd('isShowRegisterPsd')"
        />
        <div class="login_btn">
          <van-button round block color="#ff3b3b" type="info" native-type="submit" @click="register" >注&nbsp;&nbsp;册</van-button
          >
          </div>
          </van-form>
        </van-popup>  
  </div>
</template>

<script>
//导入验证js文件validForm
import {validForm} from '../assets/js/validForm'
export default {
  data: () => ({
    userLoginInfo: {
        //初始值为空
      phone: "",
      password: ""
    },
     userRegisterInfo: {
         //初始值为空
      phone: "",
      nickname:"",
      password: ""
    },
    //判断是否显示登录密码
    isShowLoginPsd: false,
    //判断是否显示注册密码
    isShowRegisterPsd: false,
    //判断是否弹出注册框
    isRegister:false,
  }),
  methods: {
    goPage() {
      console.log("返回主界面");
    },
    //密码显示事件
    showPsd(type) {
      console.log(type)
      //自身值反取
      this[type]=!this[type];
    //  this.isShowLoginPsd = !this.isShowLoginPsd;
    // this.isShowRegisterPsd = !this.isShowRegisterPsd;
    },
    //弹出注册框事件
    openRegister(){
        this.isRegister = true;
    },
    //注册用户事件
    register(){
    //获取用户注册的信息
    var userInfo = this.userRegisterInfo;

    //正则表达式验证表单
    var o = {
      phone:{
        value:userInfo.phone,
        reg: /^1[3-9]\d{9}$/,
        errMsg:"手机号格式不正确"
      },
      nickname:{
        value:userInfo.nickname,
        reg: /^[\w\u4e00-\u9fa5]{2,10}$/,
        errMsg:"昵称格式不正确"
      },
      password:{
        value:userInfo.password,
        reg: /^[A-z]\w{5,17}$/,
        errMsg:"密码格式不正确"
      }
    }
    if(!validForm.valid(o)){
      return;  //表单验证不成功，则不能执行注册请求
    }

     //显示注册加载框
     this.$toast.loading({
       message: "注册中...",
       forbidClick: true,
       duration: 0,  
       loadingType: "spinner"
     })

     //发送请求
     this.axios({
       method: 'get',
       url: "/register",
       params: {
         user: userInfo.phone,
         nickname: userInfo.nickname,
         password: userInfo.password
       }
     }).then(res => {
       //关闭加载框
       this.$toast.clear();

       //请求成功
       console.log(res)

       //如果注册成功
       if(res.data.status == 200){
         //关闭注册框
         this.isRegister = false;

         //清空注册表单数据
         for(var k in userInfo){
           userInfo[k] = '';
         }
       }else{
         //如果注册失败，则提示
         this.$notify({
           background: "#ff3b3b",
           color: "#fff",
           message: res.data.msg
         })
       }
     }).catch(err => {
       //请求失败
       //关闭加载框
       this.$toast.clear();
     })
   },

   //登录用户事件
    login(){
    //获取用户登录的信息
    var userInfo = this.userLoginInfo;

    //正则表达式验证表单
    var o = {
      phone:{
        value:userInfo.phone,
        reg: /^1[3-9]\d{9}$/,
        errMsg:"手机号格式不正确"
      },
      password:{
        value:userInfo.password,
        reg: /^[A-z]\w{5,17}$/,
        errMsg:"密码格式不正确"
      }
    }
    if(!validForm.valid(o)){
      return;  //表单验证不成功，则不能执行登录请求
    }

     //显示登录加载框
     this.$toast.loading({
       message: "登录中...",
       forbidClick: true,
       duration: 0,  
       loadingType: "spinner"
     })

     //发送请求
     this.axios({
       method: 'get',
       url: "/login",
       params: {
         user: userInfo.phone,
         password: userInfo.password
       }
     }).then(res => {
       //关闭加载框
       this.$toast.clear();

       //请求成功
       console.log(res)

       //如果登录成功
       if(res.data.status == 300){
         
        //将data作为token值保存在本地缓存上 
        localStorage.setItem("CSTK",res.data.data)

         //清空登录表单数据
         for(var k in userInfo){
           userInfo[k] = '';
         };
         //登录成功，跳转到主页面
         this.$router.push({name: 'Home'})
       }else{
         //如果登录失败，则提示
         this.$notify({
           background: "#ff3b3b",
           color: "#fff",
           message: res.data.msg
         });
       }
     }).catch(err => {
       //请求失败
       //关闭加载框
       this.$toast.clear();
     })
   }
  },
};
</script>
<style lang="less">
body{
  background-color: #fff;
}
#login {
    //导航条的标题
  .van-nav-bar__title {
    color: #ff3b3b;
    font-weight: bold;
  }
  //导航条的返回键
  .van-nav-bar .van-icon {
    color: #333;
    font-size: 22px;
  }
  //中心logo 
  .logo_img {
    margin-top: 100px;
    margin-bottom: 50px;
    img {
      width: 115px;
      height: 118px;
      display: block;
      margin: 0 auto;
    }
    .logo_text {
      font-size: 19px;
      color: #aaa;
    }
  }
  //登录表单 
  .login_form {
    padding: 0 15px;
    
    //忘记密码 
    .forgot {
      color: #aaa;
      margin-top: 10px;
    }
    
    //登录页面注册按钮 样式
    .reg_btn {
      .van-button {   
        color: #000;
        width: 65%;
        margin: 0 auto 10px;
        border: none;
      }
    }
  }
}
.popup-box{
    min-height: 200px;
    .register_title{
      margin: 20px 15px;
      text-align: left;
      font-size: 22px;
      font-weight: bold;
    }   
}
    //文本框下划线 登录 弹出窗口里注册文本框通用样式
.van-cell {
      border-bottom: 1px solid #f0f0f0;
    }
    //登录按钮 弹出窗口里注册按钮通用样式
.login_btn {
      width: 65%;
      margin: 30px auto 10px;
    }
</style>
