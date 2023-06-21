//用于存储购物车相关的数据

export default {
  //命名空间=>先找模块名，再找下面其他的
  namespaced: true,

  // state: {
  //   cartItems: [],
  // },
  state: () => {
    // 购物车的数组，用来存储购物车中每个商品的信息对象
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }

    // 从本地缓存获取购物车信息
    const cachedCartItems = uni.getStorageSync("cart");
    return {
      // 如果缓存中有数据，转换回JSON对象数组，否则设置为空数组
      cartItems: cachedCartItems ? JSON.parse(cachedCartItems) : [],
    };
  },

  getters: {
    total(state) {
      let result = 0;
      state.cartItems.forEach((item) => {
        result += item.goods_count;
      });
      return result;
    },
  },

  //改数据状态
  mutations: {
    addToCart(state, item) {
      // 根据 商品id 查询购物车中是否存在这件商品
      const existedItem = state.cartItems.find(
        (x) => x.goods_id === item.goods_id
      );

      if (existedItem) {
        // 如果购物车中已经有这件商品，则更新数量
        existedItem.goods_count++;
      } else {
        // 如果购物车中没有这件商品，则添加进去
        state.cartItems.push(item);
      }

      //数据持久化（存本地）
      uni.setStorageSync("cart", JSON.stringify(state.cartItems));
    },

    updateState(state, item) {
      // 在 store 中查找对应的商品数据
      const result = state.cartItems.find((x) => x.goods_id === item.goods_id);

      if (result) {
        // 更新查找到的商品数据的选中状态
        result.goods_state = !result.goods_state;

        // 持久化到本地存储
        uni.setStorageSync("cart", JSON.stringify(state.cartItems));
      }
    },
    //购物车商品数量+1
    updateCount(state, { product, num }) {
      const findItem = state.cartItems.find(
        (x) => x.goods_id === product.goods_id
      );

      if (findItem) {
        findItem.goods_count = num;
        uni.setStorageSync("cart", JSON.stringify(state.cartItems));
      }
    },
    //删除购物车
    removeGoods(state, item) {
      state.cartItems = state.cartItems.filter(
        (x) => x.goods_id !== item.goods_id
      )
  
      uni.setStorageSync('cart', JSON.stringify(state.cartItems))
    },
  },

  actions: {},
};
