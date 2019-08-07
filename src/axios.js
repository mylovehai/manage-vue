import axios from 'axios';
import router from './router'

axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';//配置请求头
axios.defaults.baseURL = 'http://127.0.0.1:8003/admin/';   //配置接口地址


