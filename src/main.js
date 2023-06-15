import Vue from "vue";
import App from "./App";
import "./uni.promisify.adaptor";
// 导入 request.js 模块
import http from "@/utils/request";
import {  showToast } from "./utils/message";

// 挂载到 Vue.prototype(vue的原型喜欢$,通过this.$http发送请求)
Vue.prototype.$http = http;
Vue.prototype.$msg = showToast;
Vue.config.productionTip = false;

App.mpType = "app";

const app = new Vue({
  ...App,
});
app.$mount();
