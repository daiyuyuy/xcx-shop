export default {
  namespaced: true,

  // state: {
  //   token: '',
  //   address: {},
  // },

  state: () => {
    const addressStr = uni.getStorageSync("address");
    let address = {};
    if (addressStr) {
      address = JSON.parse(addressStr);
    }
    const cachedUserInfo = uni.getStorageSync("userInfo");

    return {
      // 登录后的 token 字符串
      token: uni.getStorageSync("token") || "",
      address,
      //用户信息
      userInfo: cachedUserInfo ? JSON.parse(cachedUserInfo) : {},
    };
  },

  getters: {
    fullAddress(state) {
      const { provinceName, cityName, countyName, detailInfo } = state.address;
      if (!provinceName) return "";
      // 拼接 省，市，区，详细地址 的字符串并返回给用户
      return provinceName + cityName + countyName + detailInfo;
    },
  },

  mutations: {
    setAddress(state, address) {
      state.address = address;
      uni.setStorageSync("address", JSON.stringify(state.address));
    },
    // 更新用户的基本信息
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo;

      // 持久化到本地缓存
      uni.setStorageSync("userInfo", JSON.stringify(state.userInfo));
    },
    //token
    setToken(state, token) {
      state.token = token || "";

      uni.setStorageSync("token", state.token);
    },
  },

  actions: {},
};
