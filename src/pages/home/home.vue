<template>
    <view class="home">
        <!-- 自定义事件click，由子组件my-search触发，父组件监听 -->
        <my-search class="home-search" @clickkkk="goToSearchPage"></my-search>

        <view class="home-container">

            <!-- 轮播图区域 -->
            <!-- indicator-dots		是否显示面板指示点
        interval	自动切换时间间隔
        duration    滑动动画时长
        circular	循环单向 -->
            <swiper class="top-swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000"
                :circular="true">
                <swiper-item v-for="(item, index) in swiperList" :key="index">
                    <navigator class="swiper-content"
                        :url="`/pages_sub1/product-detail/product-detail?pid=${item.goods_id}`">
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
                    <!-- 楼层图片区域 -->
                    <view class="floor-img-box">

                        <!-- 左侧 1 个大图 -->
                        <view class="left-img-box">
                            <image :src="item.product_list[0].image_src"
                                :style="{ width: item.product_list[0].image_width + 'rpx' }" mode="widthFix"
                                @click="goToProductList(item.product_list[0])"></image>
                        </view>

                        <!-- 右侧 4 个小图 -->
                        <view class="right-img-box">
                            <block v-for="(product, idx) in item.product_list" :key="idx">
                                <view class="right-img-item" v-if="idx !== 0">
                                    <image :src="product.image_src" :style="{ width: product.image_width + 'rpx' }"
                                        @click="goToProductList(product)" mode="widthFix"></image>
                                </view>
                            </block>
                        </view>

                    </view>
                </view>
            </view>
        </view>
    </view>
</template>


<script>
import mySearch from '../../components/my-search.vue'
import badge from "@/mixins/badge.js";




export default {
    components: { mySearch },
    mixins: [badge],
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
            console.log(this.floorList);

        },
        clickHandler(item) {
            // console.log(item);
            if (item.name === "分类") {
                uni.switchTab({
                    url: "/pages/category/category"
                })
            }
        },
        goToProductList(product) {
            console.log(product);
            //split方法通过分割返回一个数组
            // const hello="哇哈哈啊哇哈哈哈啊哇哈哈哈哈?1"
            // const arr=hello.split("?")  //["哇哈哈啊哇哈哈哈啊哇哈哈哈哈","1"] 
            // console.log(arr[1]);   //1
            const str = product.navigator_url.split("?")[1]
            // console.log(str);
            uni.navigateTo({
                url: "/pages_sub1/product-list/product-list?" + str
            })
        },
        goToSearchPage(){
            console.log("被点了被点了");
            uni.navigateTo({
                url:"/pages_sub1/search/search"
            })
        }

    }

}
</script>

<style lang="scss">
.home {
    position: relative;

    .home-search {

        position: fixed;
        top: 0;
        z-index: 1;

        width: 100%;
        
    }

    .home-container {
        margin-top: 100rpx;

        /* 不显示滚动条 */
        ::-webkit-scrollbar {
            display: none;
        }

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

        .floor-title {
            display: flex;
            width: 100%;
            height: 60rpx;
        }

        .right-img-box {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
        }

        .floor-img-box {
            display: flex;
            padding-left: 10rpx;
        }
    }
}
</style>