<template>
    <view class="my-search-container" :style="{ 'background-color': bgcolor }" @click="searchBarClickHandler">
        <view class="my-search-box" :style="{ 'border-radius': radius }">
            <uni-icons type="search" size="17" color="black"></uni-icons>
            <text>搜索</text>
        </view>
    </view>
</template>

<script>

export default {
    props: {
        bgcolor: {
            type: String,
            default: "#22a7f2"
        },
        radius: {
            type: String,
            default: "30rpx"
        }
    },
    methods: {
        searchBarClickHandler() {
            //子传父，点击搜索框时，将点击事件传到相应父组件，实现父组件被点击，
            this.$emit("clickkkk")
        }
    }

}
</script>

<style scoped lang="scss">
.my-search-container {
    // background-color: #22a7f2;
    height: 100rpx;
    padding: 0 20rpx;
    display: flex;
    align-items: center;

}

.my-search-box {
    height: 72rpx;
    background-color: #ffffff;
    // border-radius: 30rpx;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .placeholder {
        font-size: 30rpx;
        margin-left: 10rpx;
    }

    text {
        margin-left: 10rpx;
    }
}
</style>