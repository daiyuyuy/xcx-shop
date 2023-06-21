import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("cart", ["total"]),
  },

  watch: {
    total: {
      handler(newVal) {
        if (newVal > 0) {
          // 大于0的时候才显示徽标
          uni.setTabBarBadge({
            index: 2, // tabBar的按钮索引，也就是第三个按钮
            text: "" + newVal, // 必须是字符串值！！！
          });
        } else {
          // 小于等于0则删除徽标
          uni.removeTabBarBadge({
            index: 2,
          });
        }
      },
      immediate: true,
    },
  },
  onShow() {
    uni.setTabBarBadge({
      index: 2,
      //getters是取值，commit是存，更新
      text: "" + this.$store.getters["cart/total"],
    });
  },
};
