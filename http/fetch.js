import axios from 'axios'; //引入axios
import store from '../src/store'
import {
  Toast,
  Indicator
} from 'mint-ui'



export function fetch(options) {
  let header = {}
  let imageHeader = {}
  if (localStorage.token) {
    header = {
      'Content-Type': 'application/json',
      'user_token': localStorage.token
    }
    imageHeader = {
      "Content-type": "multipart/form-data",
      'user_token': localStorage.token
    }
  } else {
    header = {
      'Content-Type': 'application/json',
    }
    imageHeader = {
      "Content-type": "multipart/form-data",
    }
  }
  return new Promise((resolve, reject) => {
    const instance = axios.create({ //instance创建一个axios实例，可以自定义配置，可在 axios文档中查看详情
      //所有的请求都会带上这些配置，比如全局都要用的身份信息等。
      headers: header,
      timeout: 30 * 1000 // 30秒超时
    });
    instance.interceptors.request.use((config) => {
      store.state.loading = true
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      return config
    }, error => {
      return Promise.reject(error)

    })
    instance(options).then(response => { //then 请求成功之后进行什么操作
      store.state.loading = false
      Indicator.close()
      resolve(response); //把请求到的数据发到引用请求的地方
    }).catch(error => {
      Toast({
        message: '网络异常，请稍后再试',
        duration: 3000
      })
      Indicator.close()
      reject(error);
    });
  });
}
export function imgFetch(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({ //instance创建一个axios实例，可以自定义配置，可在 axios文档中查看详情
      //所有的请求都会带上这些配置，比如全局都要用的身份信息等。
      headers: imageHeader,
      timeout: 30 * 1000 // 30秒超时
    });
    instance(options).then(response => { //then 请求成功之后进行什么操作
      resolve(response); //把请求到的数据发到引用请求的地方
    }).catch(error => {
      Toast({
        message: '网络异常，请稍后再试',
        duration: 3000
      })
      reject(error);
    });
  });
}