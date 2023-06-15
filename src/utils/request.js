//封装请求实例
import FlyIO from "flyio/dist/npm/wx";

const http = new FlyIO();
// http.config.baseURL = "https://www.uinav.com";
http.config.baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1'
http.config.timeout = 30000;
http.interceptors.request.use((request) => {
  uni.showLoading({
    title: "加载中",
    mask: true,
  });
  return request;
});
http.interceptors.response.use(
  (response) => {
    uni.hideLoading();
    return response.data;
  },
  (error) => {
    uni.hideLoading();
    return Promise.reject(error);
  }
);

export default http;
