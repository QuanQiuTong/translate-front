import axios from 'axios';
import router from '../router';

axios.defaults.timeout = 5000;  //超市时间是5秒
axios.defaults.withCredentials = true;  //允许跨域
//Content-Type 响应头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'//;charset=UTF-8';
//基础url
axios.defaults.baseURL = "http://localhost:8080";
// axios.defaults.headers.common['Authorization'] = localStorage.token
// axios.defaults.headers.common['token'] = localStorage.token

//请求拦截器
axios.interceptors.request.use(
  config => {
    //先从浏览器的回话存储中提取token值
    const tokenStr = localStorage.getItem('token')
    console.log('这里是拿到的token值：' + tokenStr);
    if (tokenStr) {
      config.headers.Authorization = tokenStr
    }
    return config
  })
//响应拦截器
axios.interceptors.response.use(
  response => {
    //如果reponse里面的status是200，说明访问到接口了，否则错误
    console.log(response);
    // if (response.data.state==false){
    //   // alert("账号信息已过期，请重新登录");
    //   location.href = '/'
    //   localStorage.removeItem("token");
    // }
    if (response.status == 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }

  },
  error => {
    if (error.response.status) {
      console.log(error);
      switch (error.response.status) {
        case 401:       //未登录
          router.replace({
            path: '/',
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
          break;
        case 404:   //没找到
          break;
      }
      return Promise.reject(error.response);
    }
  }
);

/**
 * 封装get方法
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: params })
      .then(response => {
        console.log(response.data);
        if (response.data.state == false) {
          // alert("账号信息已过期，请重新登录");
          // location.href = '/'
          // this.notify("账号信息已过期，请重新登录","false");
        }
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      })
  });
}

/**
 * 封装post方法
 */
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    // axios.post(url,data,{headers:{'token': window.localStorage['token']}})
    axios.post(url, data,)
      .then(response => {
        console.log(response.data);
        if (response.data.state == false) {
          // alert("账号信息已过期，请重新登录");
          // location.href = '/'
          // this.notify("账号信息已过期，请重新登录","false");
        }
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      })
  });
}
