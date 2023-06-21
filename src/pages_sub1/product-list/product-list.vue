<template>
    <view>
        <view class="goods-list">
            <block v-for="(product, index) in productList" :key="index">
                <view class="goods-item" @click="gotoProductDetail(product)">

                    <!-- 商品左侧图片区域 -->
                    <view class="goods-item-left">
                        <image :src="product.goods_small_logo || defaultImage" class="goods-pic"></image>
                    </view>

                    <!-- 商品右侧信息区域 -->
                    <view class="goods-item-right">
                        <!-- 商品标题 -->
                        <view class="goods-name">{{ product.goods_name }}</view>
                        <view class="goods-info-box">
                            <!-- 商品价格 -->
                            <view class="goods-price">￥{{ product.goods_price | formatNum }}</view>
                        </view>
                    </view>

                </view>
            </block>
        </view>
    </view>
</template>

<script >

export default {

    data() {
        return {
            // 请求参数对象
            params: {
                // 1. 查询关键词
                query: "",

                // 2. 分类Id
                cid: "",

                // 3. 页码
                pagenum: 1,

                // 4. 每页条数
                pagesize: 20,
            },
            // 商品数据
            productList: [],

            // 商品数据总条数，用来实现分页
            total: 0,
            //节流阀状态
            isLoading: false
        }
    },
    // 获取进入商品列表页时 URL 上携带的参数，并放入 params 对象中
    //没有`vue-router`提供`this.$route`获取页面进入的参数, 只能通过`onLoad`
    onLoad(options) {
        this.params.query = options.query || ""
        this.params.cid = options.cid || ""

        // 调用获取商品列表数据的方法
        this.getProductList();
    },
    onReachBottom() {
        //判断是否有更多数据要加载
        if (this.productList.length === this.total) {
            return this.$msg("别拉啦别拉啦，我是有底线滴，我木有数据啦，呜呜呜")
        }


        // 判断是否正在请求其它数据，如果是则不发起额外的请求
        if (this.isLoading) {
            return;
        }

        //达到设置的onReachBottomDistance的距离时触发
        // 页码加 1
        this.params.pagenum += 1;

        // 请求数据
        this.getProductList();
    },
    methods: {
        async getProductList() {

            //打开节流阀
            this.isLoading = true

            const { meta, message } = await this.$http.get("/goods/search", this.params)

            if (meta.status !== 200) {
                return this.$msg
            }
            this.productList = [...this.productList, ...message.goods]
            this.total = message.total

            //关闭节流阀
            this.isLoading = false
        },
        // 下拉刷新的事件
        async onPullDownRefresh() {

            // 1. 重置关键数据
            this.params.pagenum = 1,
                this.productList = []

            // 2. 重新发起请求
            await this.getProductList()

            // 3. 关闭下拉刷新效果
            uni.stopPullDownRefresh()
        }
        , async gotoProductDetail(product) {
            uni.navigateTo({
                url: `/pages_sub1/product-detail/product-detail?pid=${product.goods_id}`
            })
        }
    },
    //过滤器
    // filters: {
    //     formatNum(value) {
    //         return Number(value).toFixed(2)
    //     }
    // }

}
</script>

<style scoped lang="scss">
.goods-item {
    display: flex;
    padding: 20rpx 10rpx;
    border-bottom: 1rpx solid #f0f0f0;

    .goods-item-left {
        margin-right: 10rpx;

        .goods-pic {
            width: 200rpx;
            height: 200rpx;
            display: block;
        }
    }

    .goods-item-right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .goods-name {
            font-size: 26rpx;
        }

        .goods-price {
            font-size: 32rpx;
            color: #c00000;
        }
    }
}
</style>