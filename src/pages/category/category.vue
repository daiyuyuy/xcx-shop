<template>
    <view>
        <!-- 预留出的搜索区域 -->
        <view>
            <my-search @clickkkk="goToSearchPage"></my-search>
        </view>
        <view class="scroll-view-container">
            <!-- 左侧的滚动区域 -->
            <scroll-view class="left-scroll-view" scroll-y :style="{ height: wh + 'px' }">

                <block v-for="(item, index) in categoryList" :key="index">
                    <view class="left-scroll-view-item" :class="{ active: index === selectedCategory }"
                        @click="selectCategoryHandler(index)">{{ item.cat_name }}
                    </view>
                </block>


            </scroll-view>

            <!-- 右侧的滚动区域 -->
            <scroll-view class="right-scroll-view" scroll-y :style="{ height: wh + 'px' }" :scroll-top="scrollTop">

                <!-- 二级路由 -->
                <view class="cate-lv2" v-for="(item2, index2) in categoryList[selectedCategory].children" :key="index2">
                    <view class="cate-lv2-title">/{{ item2.cat_name }}/</view>

                    <!-- 三级路由 -->
                    <view class="cate-lv3-list">
                        <view class="cate-lv3-item" v-for="(item3, index3) in item2.children" :key="index3"
                            @click="gotoProductList(item3)">
                            <image :src="item3.cat_icon"></image>
                            <text>{{ item3.cat_name }}</text>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>
    </view>
</template>
  
<script>
import MySearch from '@/components/my-search.vue'
import badge from "@/mixins/badge.js";

export default {
    components: {
        MySearch
    },
    mixins: [badge],
    data() {
        return {

            wh: 0,

            //存储分类数据
            categoryList: [],

            //存储高亮分类下标
            selectedCategory: 0,

            //滚动条
            scrollTop: 0
        };
    },

    created() {
        // 动态获取窗口可用高度，以便让页面中的左右两块滚动区域的高度撑满屏幕
        // 1. 获取当前系统信息
        const sysInfo = uni.getSystemInfoSync();

        // 2. 从系统信息中获取窗口可用高度并赋值给 wh
        // 窗口的可用高度 = 屏幕高度 - navigationBar高度 - tabBar高度
        // this.wh = sysInfo.windowHeight;
        this.wh = sysInfo.windowHeight - 50;
        this.getCategoryList()


    },
    methods: {
        async getCategoryList() {
            const { message, meta } = await this.$http.get("/categories")
            if (meta.status !== 200) {
                return this.$msg()
            }
            this.categoryList = message
            console.log(this.categoryList);
        },
        selectCategoryHandler(index) {
            console.log(index);
            this.scrollTop = this.scrollTop === 0 ? 1 : 0
            this.selectedCategory = index
        },
        gotoProductList(item3) {
            uni.navigateTo({
                url: `/pages_sub1/product-list/product-list?cid=${item3.cat_id}`
            })
        },
        goToSearchPage() {
            uni.navigateTo({
                url: "/pages_sub1/search/search"
            })
        }
    }
};
</script>
  
<style scoped lang="scss">
.scroll-view-container {
    display: flex;

    .left-scroll-view {
        width: 240rpx;

        .left-scroll-view-item {
            line-height: 120rpx;
            background-color: #f7f7f7;
            text-align: center;
            font-size: 24rpx;

            // 激活项的样式
            &.active {
                background-color: #ffffff;
                position: relative;

                // 渲染激活项左侧的红色指示边线
                &::before {
                    content: " ";
                    display: block;
                    width: 6rpx;
                    height: 60rpx;
                    background-color: #c00000;
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
        }
    }


    .right-scroll-view {

        .cate-lv2-title {
            font-size: 24rpx;
            font-weight: bold;
            text-align: center;
            padding: 30rpx 0;
        }

        .cate-lv3-list {

            display: flex;
            flex-wrap: wrap;

            .cate-lv3-item {
                width: 33.33%;
                margin-bottom: 20rpx;
                display: flex;
                flex-direction: column;
                align-items: center;

                image {
                    width: 120rpx;
                    height: 120rpx;
                }

                text {
                    font-size: 24rpx;
                }
            }
        }
    }
}
</style>