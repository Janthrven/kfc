//import Vue from 'vue';
//局部注册
import { Notify } from 'vant';
class ValidForm {
    valid(obj) {
        for (var key in obj) {
            if (!obj[key].reg.test(obj[key].value)) {
                //条件成立则说明有表单的值不通过正则验算
                //验证失败
                console.log(obj[key].errMsg);
                //在页面顶部展示消息提示，支持函数调用和组件调用两种方式
                Notify({
                    background: "#ff3b3b",
                    color: "#fff",
                    message: obj[key].errMsg
                });
                return false;
            }
        }
        //验证成功
        console.log("验证成功")
        return true;
    }
}
//公开validForm 方法给页面使用
export const validForm = new ValidForm()