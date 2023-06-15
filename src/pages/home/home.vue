<template>
    <view>
        <!-- 轮播图区域 -->
        <!-- indicator-dots		是否显示面板指示点
        interval	自动切换时间间隔
        duration    滑动动画时长
        circular	循环单向 -->
        <swiper class="top-swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000"
            :circular="true">
            <swiper-item v-for="(item, index) in swiperList" :key="index">
                <navigator class="swiper-content" :url="`/pages_sub1/product-detail/product-detail?pid=${item.goods_id}`">
                    <image :src="item.image_src"></image>
                </navigator>
            </swiper-item>
        </swiper>
        <view class="nav-list">
            <view class="nav-item" v-for="(item, index) in navList" :key="index" @click="clickHandler(item)">
                <image :src="item.image_src" class="nav-img"></image>
            </view>
        </view>
        <!-- 楼层区域 -->
        <view class="floor-list">
            <!-- 楼层 item 项 -->
            <view class="floor-item" v-for="(item, index) in floorList" :key="index">
                <!-- 楼层标题 -->
                <image :src="item.floor_title.image_src" class="floor-title"></image>
            </view>
        </view>

    </view>
</template>


<script>

export default {
    data() {
        //在大型项目中 data 需要使用 return来返回数据，
        //不用return这种方式返回的数据在vue实例中是全局可见的，容易造成数据污染。
        //使用return 返回的数据仅在组件内可见，对其他组件不生效。
        return {
            swiperList: [],
            navList: [],
            floorList: []
        }
    },
    created() {
        this.getSwiperList()
        this.getNavList()
        this.getFloorList()
    },
    methods: {
        async getSwiperList() {
            // const { meta, message } = await this.$http.get("api/public/v1/home/swiperdata")
            const { meta, message } = await this.$http.get("/home/swiperdata")

            if (meta.status !== 200) {
                return this.$msg()

            }
            this.swiperList = message
        },
        async getNavList() {
            const { meta, message } = await this.$http.get("/home/catitems")

            if (meta.status !== 200) {
                return this.$msg()
            }
            this.navList = message
        },
        async getFloorList() {
            const { meta, message } = await this.$http.get("/home/floordata")
            if (meta.status !== 200) {
                return this.$msg()
            }
            this.floorList = message
        },
        clickHandler(item) {
            // console.log(item);
            if (item.name === "分类") {
                uni.switchTab({
                    url: "/pages/category/category"
                })
            }
        }

    }

}
</script>

<style lang="scss">
.top-swiper {
    height: 330rpx;

    .swiper-content,
    image {
        width: 100%;
        height: 100%;
    }
}

.nav-list {
    display: flex;
    justify-content: space-around;
    margin: 30rpx 0;

    .nav-img {
        width: 128rpx;
        height: 140rpx;
    }
}
</style>