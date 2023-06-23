<template>
  <!-- 最外层的容器 -->
  <view class="my-checkout-container">

    <!-- 全选区域 -->
    <label class="radio" @click="checkAllHandler">
      <radio color="#22a7f2" :checked="isCheckedAll" />
      <text>全选</text>
    </label>

    <!-- 合计区域 -->
    <view class="amount-box"> 合计:<text class="amount">￥{{ checkedAmount }}</text> </view>

    <!-- 结算按钮 -->
    <view class="btn-checkout">结算({{ checkedTotal }})</view>

  </view>
</template>
  
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('cart', ['checkedTotal', 'total', 'checkedAmount']),

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