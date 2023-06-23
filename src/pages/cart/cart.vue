<template>
    <!-- 有两个根view标签时因为，他们两个属于互制关系，有你没他的那种 -->
    <view class="cart-container" v-if="cartItems.length > 0">
        <my-address></my-address>
        <!-- 购物车商品列表的标题区域 -->
        <view class="cart-title">
            <!-- 左侧的图标 -->
            <uni-icons type="shop" size="18"></uni-icons>

            <!-- 描述文本 -->
            <text class="cart-title-text">购物车</text>
        </view>
        <!-- 商品列表区域 -->
        <!-- 滑块，类似左右滑块删除 -->
        <uni-swipe-action>

            <block v-for="product in cartItems" :key="product.goods_id">
                <!-- 右滑 -->
                <uni-swipe-action-item :right-options="swipeOptions" @click="swipeActionClickHandler(product)">
                    <view class="goods-item">

                        <!-- 商品左侧图片区域 -->
                        <view class="goods-item-left">
                            <radio :checked="product.goods_state" color="#C00000" @click="radioChangeHandler(product)">
                            </radio>
                            <image :src="product.goods_small_logo || defaultImage" class="goods-pic"></image>
                        </view>

                        <!-- 商品右侧信息区域 -->
                        <view class="goods-item-right">
                            <!-- 商品标题 -->
                            <view class="goods-name">{{ product.goods_name }}</view>
                            <view class="goods-info-box">
                                <!-- 商品价格 -->
                                <view class="goods-price">￥{{ product.goods_price | formatNum }}</view>

                                <!-- 商品数量 -->
                                <uni-number-box :min="1" :value="product.goods_count"
                                    @change="changeCount(product, $event)"></uni-number-box>
                            </view>
                        </view>

                    </view>
                </uni-swipe-action-item>
            </block>
        </uni-swipe-action>
        <!-- 结算区域 -->
        <my-checkout></my-checkout>
    </view>
    <!-- 购物车无商品时 -->
    <view class="empty-cart" v-else>
        <text class="tip-text">空空如也~</text>
    </view>
</template>
<script>
import { mapState } from 'vuex'
// import { mapState, mapGetters } from 'vuex'
import badge from "@/mixins/badge.js";
import MyAddress from "@/components/my-address.vue"
import MyCheckout from "@/components/my-checkout.vue";

export default {

    mixins: [badge],
    components: {
        MyAddress,
        MyCheckout,
    },
    data() {
        return {
            defaultImage:
                'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
            swipeOptions: [
                {
                    text: "删除", // 显示的按钮文本
                    style: {
                        backgroundColor: "#C00000", // 按钮的背景颜色
                    }
                }
            ]
        }
    },

    computed: {
        ...mapState('cart', ['cartItems']),
        // ...mapGetters('cart', ['total']),
    },

    methods: {
        radioChangeHandler(item) {
            this.$store.commit('cart/updateState', item)
        },
        changeCount(product, e) {
            console.log(product, e)

            this.$store.commit('cart/updateCount', {
                product,
                num: +e,
            })
        },
        // 点击了滑动操作按钮
        swipeActionClickHandler(item) {
            console.log(item);
            // 根据ID删除购物车中的指定商品
            this.$store.commit("cart/removeGoods", item);
        }
    },
    //监听角标移至全局，在store/mixins/badge.js
    // watch: {
    //     total: {
    //         handler(newVal) {
    //             if (newVal > 0) {
    //                 // 大于0的时候才显示徽标
    //                 uni.setTabBarBadge({
    //                     index: 2, // tabBar的按钮索引，也就是第三个按钮
    //                     text: "" + newVal, // 必须是字符串值！！！
    //                 });
    //             } else {
    //                 // 小于等于0则删除徽标
    //                 uni.removeTabBarBadge({
    //                     index: 2
    //                 })
    //             }
    //         },
    //         immediate: true
    //     }
    // }
}
</script>

<style lang="scss" scoped>
.cart-container {
    padding-bottom: 100rpx;
}

.cart-title {
    height: 80rpx;
    display: flex;
    align-items: center;
    font-size: 28rpx;
    padding-left: 10rpx;
    border-bottom: 1rpx solid #efefef;

    .cart-title-text {
        margin-left: 20rpx;
    }
}

.goods-item {
    display: flex;
    padding: 20rpx 10rpx;
    border-bottom: 1rpx solid #f0f0f0;
    width: 750rpx;
    box-sizing: border-box;

    .goods-item-left {
        margin-right: 10rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .goods-pic {
            width: 200rpx;
            height: 200rpx;
            display: block;
        }
    }

    .goods-item-right {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: space-between;

        .goods-name {
            font-size: 26rpx;
        }

        .goods-info-box {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .goods-price {
            font-size: 32rpx;
            color: #c00000;
        }
    }
}

.empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 300rpx;

    .tip-text {
        font-size: 24rpx;
        color: gray;
        margin-top: 30rpx;
    }
}
</style>