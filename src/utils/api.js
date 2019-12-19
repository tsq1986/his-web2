// 封装我们的api请求
import axios from 'axios'
import {Message} from "element-ui";

// 拦截器-处理响应信息
axios.interceptors.response.use(resp => {
    if (resp.data && resp.status == 200 && resp.data.code == 500) {
        Message.error({message: resp.data.msg});
        return;
    }
    if (resp.data.msg) {
        Message.success({message: resp.data.msg});
    }
    return resp.data;
},error => {
    if (error.response.status == 504 || error.response.status == 404) {
        Message.error({message: '服务器被吃了!o(╯□╰)o'});
    }else if (error.response.status == 403) {
        Message.error({message: '权限不足，请联系管理员'});
    }else if (error.response.status == 405) {
        Message.error({message: '用户请求方式错误'});
    }else if (error.response.status == 401) {
        Message.error({message: '用户未登录，请先登录'});
    }else{
        if (error.response.data.msg) {
            Message.error({message: error.response.data.msg});
        }else{
            Message.error({message: '未知错误'});
        }
    }
    return;
})

let baseUrl = '';

export const getRequest = (url,params)=>{
    return axios({
        method:'get',
        url:`${baseUrl}${url}`,
        params:params
    })
}

export const postRequest = (url,params)=>{
    console.log(`${baseUrl}${url}`);
    return axios({
        method:'post',
        url:`${baseUrl}${url}`,
        data:params
    })
}

export const postKeyValueRequest = (url,params)=>{
    return axios({
        method:'post',
        url:`${baseUrl}${url}`,
        data:params,
        transformRequest:[function (data) {
            let ret = '';
            for (let i in data) {
                ret += encodeURIComponent(i)+"="+encodeURIComponent(data[i])+"&"
            }
            return ret;
        }],
        header:{
            'Content-Type':'application/x-www-form-urlencoded'
        }
    })
}

export const putRequest = (url,params)=>{
    return axios({
        method:'put',
        url:`${baseUrl}${url}`,
        data:params
    })
}

export const delRequest = (url,params)=>{
    return axios({
        method:'delete',
        url:`${baseUrl}${url}`,
        data:params
    })
}