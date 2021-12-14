import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from "vue-axios"

// 导入vant组件
import {
    NavBar,
    Form,
    Field,
    Button,
    Popup,
    Tabbar,
    TabbarItem,
    Notify,
    Toast,
    Search,
    Swipe,
    SwipeItem,
    Stepper,
    GoodsAction,
    GoodsActionIcon,
    GoodsActionButton,
    SwipeCell,
    Card,
    Cell,
    Checkbox,
    CheckboxGroup,
    NoticeBar,
    Tab,
    Tabs,
    SubmitBar,
    Empty,
    AddressEdit,
    AddressList,
    Dialog,
    Tag 


} from 'vant'

import 'lib-flexible/flexible'

// vant全局注册
Vue
    .use(NavBar)
    .use(Form)
    .use(Field)
    .use(Button)
    .use(Popup)
    .use(Tabbar)
    .use(TabbarItem)
    .use(Notify)
    .use(Toast)
    .use(Search)
    .use(Swipe)
    .use(SwipeItem)
    .use(Stepper)
    .use(GoodsAction)
    .use(GoodsActionButton)
    .use(GoodsActionIcon)
    .use(SwipeCell)
    .use(Card)
    .use(Cell)
    .use(Checkbox)
    .use(CheckboxGroup)
    .use(NoticeBar)
    .use(Tab)
    .use(Tabs)
    .use(SubmitBar)
    .use(Empty)
    .use(AddressEdit)
    .use(AddressList)
    .use(Dialog)
    .use(Tag)

Vue.config.productionTip = false

// 用于数据请求
Vue.use(VueAxios, axios)

// 设置请求的基础路径
axios.defaults.baseURL = "http://localhost:9000"

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')