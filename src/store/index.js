// 1. 导入 Vue 和 Vuex
import Vue from "vue";
import Vuex from "vuex";
import cart from "./modules/cart";
import user from "./modules/user";

// 2. 将 Vuex 安装为 Vue 的插件
Vue.use(Vuex);

// 3. 创建 Vuex 的 Store 实例
const store = new Vuex.Store({
  // 这里可以存放多个不同的 Vuex 模块
  modules: {
    cart,
    user,
  },
});

// 4. 导出
export default store;
