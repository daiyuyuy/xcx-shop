<template>
    <view>
        <view class="search-box">
            <!-- 使用 uni-ui 提供的搜索组件 -->
            <uni-search-bar cancelButton="none" :radius="100" @input="inputHandler"></uni-search-bar>


        </view>
        <!-- 搜索历史 -->
        <view class="history-box" v-if="sugguestions.length === 0">

            <!-- 标题区域 -->
            <view class="history-title">
                <text>搜索历史</text>
                <uni-icons type="trash" size="17" @click="clearHistory"></uni-icons>
            </view>

            <!-- 历史列表 -->
            <view class="history-list">
                <uni-tag v-for="(item, index) in historyList" :key="index" :text="item"
                    @click="gotoProductList(item)"></uni-tag>
            </view>

        </view>
        <view class="sugg-list" v-else>
            <view class="sugg-item" v-for="(item, index) in sugguestions" :key="index" @click="gotoProductDetail(item)">
                <view class="goods-name">{{ item.goods_name }}</view>
                <uni-icons type="forward" size="16"></uni-icons>

            </view>
        </view>


    </view>
</template>

<script>

export default {
    data() {
        return {
            //设计一个定时器(id)
            timer: null,
            //存储用户输入的搜索关键字
            keywords: '',
            //搜索建议数据
            sugguestions: [],
            //搜索历史记录
            historyList: []
        }
    },
    created() {
        //一进入页面，获取本地存储的历史搜索
        const keywords = uni.getStorageSync("keywords")

       
        //判断用户是否用过，防止空
        this.historyList = keywords ? JSON.parse(keywords) : []

    },

    methods: {
        inputHandler(e) {
            //    console.log(e);
            //先清楚定时器
            clearTimeout(this.timer)
            //在开启定时器
            this.timer = setTimeout(() => {
                this.keywords = e.value
                this.getSugguestionList()
                // console.log(e.value);
            }, 500
            )

        },
        async getSugguestionList() {

            if (!this.keywords) {
                this.sugguestions = []
                return
            }
            const { message, meta } = await this.$http.get("/goods/qsearch", {
                query: this.keywords
            })
            if (meta.status !== 200) {
                return this.$msg()
            }
            this.sugguestions = message
            this.updateSearchHistory()
            // console.log(this.sugguestions);
        },
        gotoProductDetail(item) {
            uni.navigateTo({
                url: `/pages_sub1/product-detail/product-detail?pid=${item.goods_id}`
            })
        },
        updateSearchHistory() {
            //在数组前面添加用unshift
            this.historyList.unshift(this.keywords)
            //关键字去重 Set

            const arr = [...new Set(this.historyList)]
            //限制最多标签，方法是删除超出长度的元素，用arr.pop（）方法，末位删除
            if (arr.length > 10) {
                arr.pop()
            }

            this.historyList = arr

            //存入本地
            uni.setStorageSync("keywords", JSON.stringify(arr))

        },
        clearHistory() {
            this.historyList = []
            uni.removeStorageSync("keywords")


        },
        gotoProductList(keywords) {
            console.log(keywords);
            uni.navigateTo({
                url: `/pages_sub1/product-list/product-list?query=${keywords}`
            })
        }

    }

}
</script>

<style scoped lang="scss">
// 使用样式穿透：覆盖 uni-search-bar 组件的 .uni-searchbar 背景色
::v-deep .uni-searchbar {
    background-color: #22a7f2 !important;
}

// 搜索框吸顶
.search-box {
    position: sticky;
    top: 0;
    z-index: 1;

    // 搜索建议列表

}

.sugg-list {
    padding: 0 10rpx;

    .sugg-item {
        font-size: 24rpx;
        padding: 26rpx 0;
        border-bottom: 1rpx solid #efefef;
        display: flex;
        align-items: center; //垂直居中
        justify-content: space-between;

        .goods-name {
            margin-right: 6rpx;

            // 溢出部分隐藏
            overflow: hidden;

            // 文字不允许换行
            white-space: nowrap;

            // 文字溢出后使用省略号表示
            text-overflow: ellipsis;
        }
    }
}

// 搜索历史
.history-box {
    padding: 0 10rpx;

    .history-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 80rpx;
        font-size: 26rpx;
        border-bottom: 2rpx solid #efefef;
    }

    .history-list {
        display: flex;
        flex-wrap: wrap;

        uni-tag {
            margin-top: 10rpx;
            margin-right: 10rpx;
        }
    }
}
</style>