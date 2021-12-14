import { request } from "./request.js";

//添加购物车
export const addShopping = (info) => {

    return request({
        url: "/addCar",
        method: "POST",
        data: info
    })
}
// 获取 购物车数据
export const getShop = (id) => {
    return request({
        url: "/findCar",
        params: {
            id
        }
    })
}
// 删除购物车数据
export const delShop = (info) => {
    return request({
        url: "/deleteCar",
        method: "POST",
        data: info
    })
}
// 添加地址
export const address = (info) => {
    return request({
        url: "/address",
        method: "post",
        data: info

    })
}
// 获取地址数据
export const getAddress = (id) => {
    return request({
        url: "/findAddress",
        method: "get",
        params: {
            userId: id
        }
    })
}
// 删除地址
export const deleteAddress = (info) => {
    return request({
        url: "/deleteAddress",
        method: "post",
        data: info
    })
}
// 订单切换状态
export const take = (info) => {
    return request({
        url: "/take",
        method: "get",
        params: info
    })
}

// 查询订单
export const getOrder = (info) => {
    return request({
        url: "/getOrder",
        method: "get",
        params: info
    })
}
// 提交订单
export const order = (info) => {
    return request({
        url: "/order",
        method: "post",
        data: info
    })
}
// 删除订单
export const delectOrder = (info) => {
    return request({
        url: "/delectOrder",
        method: "post",
        data: info
    })
}
// 搜索
export const search = (info) => {
    return request({
        url: "/search",
        method: "get",
        params:{
            key:info
        }
    })
}