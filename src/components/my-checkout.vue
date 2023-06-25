<template>
  <!-- 最外层的容器 -->
  <view class="my-checkout-container">

    <!-- 全选区域 -->
    <label class="radio" @click="checkAllHandler">
      <radio color="#c00000" :checked="isCheckedAll" />
      <text>全选</text>
    </label>

    <!-- 合计区域 -->
    <view class="amount-box"> 合计:<text class="amount">￥{{ checkedAmount }}</text> </view>

    <!-- 结算按钮 -->
    <view class="btn-checkout" @click="checkout">结算({{ checkedTotal }})</view>

  </view>
</template>
  
<script>
import { mapGetters, mapState } from 'vuex'
export default {
  computed: {
    ...mapGetters('cart', ['checkedTotal', 'total', 'checkedAmount']),
    ...mapGetters('user', ['fullAddress']),
    ...mapState('user', ['token']),
    //总数量和选中数量相等，即全选，也就是说，当总=选中时，：checked默认选中
    isCheckedAll() {
      return this.checkedTotal === this.total
    },
  },


  data() {
    return {};
  },
  methods: {
    checkAllHandler() {
      this.$store.commit("cart/updateAllState", !this.isCheckedAll);


    },
    checkout() {
      // 1. 是否已勾选要结算的商品
      if (this.checkedTotal === 0) return this.$msg('请先选择要结算的商品')
      // 2. 是否已选择收货地址
      if (!this.fullAddress) return this.$msg('请先选择收货地址')
      // 3. 是否已登录
      // if (!this.token) {

      //   this.$msg('请先登录')
      //   uni.switchTab({
      //     url: '/pages/my/my'
      //   })

      // }
      // 4. 微信支付
      this.payOrder()
    },
    // 微信支付
    async payOrder() {
      // 1. 创建订单
      // 1.1 发送请求
      const { meta, message } = await this.$http.post("/my/orders/create", {
        // 开发期间不填写真实的订单价格，写死订单总价为1分钱
        order_price: 0.01,
        // 收获地址
        consignee_addr: this.fullAddress,
        // 购物车中选中的商品
        goods: this.$store.state.cart.cartItems.filter(x => x.goods_state).map(x => ({
          goods_id: x.goods_id,
          goods_number: x.goods_count,
          goods_price: x.goods_price,
        })),
      });

      if (meta.status !== 200) {
        return this.$msg("创建订单失败！");
      }
      console.log(message);
      console.log(meta);

      // 1.2 得到 “订单编号”
      const orderNumber = message.order_number;
    }
  }
};
</script>
  
<style lang="scss">
.my-checkout-container {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100rpx;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10rpx;
  font-size: 28rpx;

  .radio {
    display: flex;
    align-items: center;
  }

  .amount {
    color: #c00000;
  }

  .btn-checkout {
    height: 100rpx;
    min-width: 200rpx;
    background-color: #c00000;
    color: white;
    line-height: 100rpx;
    text-align: center;
    padding: 0 20rpx;
  }
}
</style>