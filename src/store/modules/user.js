export default {
  namespaced: true,

  // state: {
  //   token: '',
  //   address: {},
  // },

  state() {
    const addressStr = uni.getStorageSync("address");
    let address = {};
    if (addressStr) {
      address = JSON.parse(addressStr);
    }

    return {
      token: "",
      address,
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
  },

  actions: {},
};
