<template>
    <view>
        <!-- 选择收货地址的盒子 -->
        <view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
            <button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">
                请选择收货地址+
            </button>
        </view>

        <!-- 渲染收货信息的盒子 -->
        <view class="address-info-box" v-else @click="chooseAddress">

            <view class="row1">
                <view class="row1-left">
                    <view class="username">收货人：{{ address.userName }}<text></text></view>
                </view>
                <view class="row1-right">
                    <view class="phone">电话：{{ address.telNumber }}<text></text></view>
                    <uni-icons type="arrowright" size="16"></uni-icons>
                </view>
            </view>

            <view class="row2">
                <view class="row2-left">收货地址：{{ fullAddress }}</view>
                <view class="row2-right">

                </view>
            </view>

        </view>

        <!-- 底部的边框线 -->
        <view class="address-border"></view>
    </view>
</template>
<script>

import { mapGetters, mapState } from 'vuex'
export default {
    data() {
        return {
            // 收货地址
            // address: {},
        }
    },
    methods: {

        // 选择收货地址
         chooseAddress() {
            // 1. 调用小程序提供的 chooseAddress() 方法，即可使用选择收货地址的功能
            //    返回值是一个数组：
            //        - 第 1 项为错误对象
            //        - 第 2 项为成功之后的收货地址对象
            const res =  uni.chooseAddress(
                {
                    success: (res) => {
                        // 为 data 里面的收货地址对象赋值

                        this.$store.commit('user/setAddress', res)

                    },
                    fail: () => {
                        return this.$msg('选择收货地址失败')
                    }
                }
            );
            console.log(res);
            // // 如果有错误, 提示用户
            // if (res.errMsg) {
            //     return this.$msg('选择收货地址失败')
            // }
        }

    },
    computed: {
        ...mapState('user', ['address']),
        //计算属性是函数
        // 收货详细地址的计算属性
        ...mapGetters('user', ['fullAddress'])
    }

}
</script>


<style scoped lang="scss">
// 底部边框线的样式
.address-border {
    display: block;
    width: 100%;
    height: 10rpx;
    border-bottom: 1rpx solid #efefef;
}

// 选择收货地址的盒子
.address-choose-box {
    height: 180rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}

// 渲染收货信息的盒子
.address-info-box {
    font-size: 24rpx;
    height: 180rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 10rpx;

    // 第一行
    .row1 {
        display: flex;
        justify-content: space-between;

        .row1-right {
            display: flex;
            align-items: center;

            .phone {
                margin-right: 10rpx;
            }
        }
    }

    // 第二行
    .row2 {
        display: flex;
        align-items: center;
        margin-top: 20rpx;

        .row2-left {
            white-space: nowrap;
        }
    }
}
</style>