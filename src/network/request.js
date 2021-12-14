import axios from 'axios'


// 暴露 自定封装的函数
export const request = (confing) => {
    const instance = axios.create({
            // 设置公共路径
            baseURL: "http://localhost:9000",
        })
        // 返回出 设置好的 数据
    return instance(confing)

}