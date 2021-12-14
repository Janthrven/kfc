import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

// HOME页面
const HOME =
    import ("../views/mainViews/Home.vue")
    // 详情页
const DETAIL =
    import ("../views/other/detail/Detail.vue")
    // 地址列表
const ADDRESSLIST =
    import ("../views/other/addressList/AddressList.vue")
    // 编辑地址
const ADDRESSEDIT =
    import ("../views/other/addressEdit/AddressEdit.vue")
    // 提交订单
const SUBMIT =
    import ("../views/other/submit/Submit.vue")
    // 搜索
const SEARCH =
import ("../views/other/search/Search.vue")



const routes = [{
        path: "/",
        redirect: "/home"
    },
    {
        path: "/login",
        name: "Login",
        component: () =>
            import ("../views/Login.vue")
    },
    {
        path: "/detail",
        name: "Detail",
        component: () => DETAIL

    },
    // 地址列表
    {
        path: "/addressList",
        name: "AddressList",
        component: () => ADDRESSLIST

    },
    // 编辑地址
    {
        path: "/addressEdit",
        name: "AddressEdit",
        component: () => ADDRESSEDIT

    },
    // 提交订单
    {
        path: "/submit",
        name: "Submit",
        component: () => SUBMIT
    },
    // 搜索
    {
        path: "/search",
        name: "Search",
        component: () => SEARCH

    },

    {
        path: "/main",
        name: "Main",
        component: () =>
            import ("../views/Main.vue"),
        children: [{
                path: '/home',
                name: "Home",
                component: () => HOME

            },
            {
                path: '/shopbag',
                name: "Shopbag",
                component: () =>
                    import ("../views/mainViews/Shopbag.vue")
            },
            {
                path: '/order',
                name: "Order",
                component: () =>
                    import ("../views/mainViews/Order.vue")
            }, {
                path: '/my',
                name: "My",
                component: () =>
                    import ("../views/mainViews/My.vue")
            }
        ]
    }

]

const router = new VueRouter({
    routes
})

export default router