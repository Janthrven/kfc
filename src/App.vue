<template>
  <div id="app">
<!-- router-link:通过to目标地址，实现路由跳转；该标签默认为a标签，也可以通过tag属性渲染成别的标签 -->
<!-- router-view标签，提供一个虚拟DOM，显示路由在组件中的位置，可以实现路由切换UI更新  -->
    <!-- 一级路由 -->
    <!-- 路由缓存 -->
    <!-- 不需要缓存的路由 用include引用 需要缓存的路由用exclude -->
    <keep-alive include="/addressEdit">
        <router-view/>
    </keep-alive>
  </div>  
</template>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
//清除浮动
.fr{
  float: right;
}
.fl{
  float: left;
}
.clearfix::after{
  content: "";
  clear: both;
  display: block;
}
/** 图片适应
 .auto_img{
  width: 100%;
  display: block;
}
*/
.one_text{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
