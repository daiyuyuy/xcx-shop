<template>
  <view v-if="info.goods_id" class="goods-detail-container">
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, index) in info.pics" :key="index">
        <image :src="item.pics_big" @click="preview(index)"></image>
      </swiper-item>
    </swiper>
    <!-- 商品信息区域 -->
    <view class="goods-info-box">
      <!-- 商品价格 -->
      <view class="price">￥{{ info.goods_price }}</view>

      <!-- 信息主体区域 -->
      <view class="goods-info-body">
        <!-- 商品名称 -->
        <view class="goods-name">{{ info.goods_name }}</view>

        <!-- 收藏 -->
        <view class="favi">
          <uni-icons type="star" size="18" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>

      <!-- 运费 -->
      <view class="yf">快递：免运费</view>
    </view>

    <!-- 详情页（后端返回数据，前端渲染，vue中的v-html 小程序用rich-text） -->
    <rich-text :nodes="info.goods_introduce"></rich-text>

    <!-- 商品导航工具栏组件 -->
    <view class="goods_nav">

      <!-- fill 控制右侧按钮的样式 -->
      <!-- options 左侧按钮的配置项 -->
      <!-- buttonGroup 右侧按钮的配置项 -->
      <!-- click 左侧按钮的点击事件处理函数 -->
      <!-- buttonClick 右侧按钮的点击事件处理函数 -->
      <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="leftButtonClick"
        @buttonClick="rightButtonClick" />




    </view>
  </view>
</template>

<script>

import { mapGetters } from 'vuex'


export default {
  data() {
    return {
      pid: '',
      info: {

      },
      options: [{
        icon: "headphones",
        text: "客服"
      },
      {
        icon: "shop",
        text: "商铺"
      },
      {
        icon: "cart",
        text: "购物车",
        info: 0
      }],
      buttonGroup: [{
        text: "加入购物车",
        backgroundColor: "#b0bdbd",
        color: "#ffffff"
      },
      {
        text: "立即购买",
        backgroundColor: "#22a7f2",
        color: "#ffffff"
      },
      ]
    }
  },

  //辅助函数，用于获取仓库中的getters
  //使用mapGetters辅助函数拿到total
  computed: {
    ...mapGetters('cart', ['total']),
  },
  onLoad(options) {
    console.log(options);
    this.pid = options.pid | ''
    this.getProductDetail()
  },
  watch: {
    //total(){}这种写法监听简单的，无法应用immediate，无法一进入页面就调用
    total: {
      //进入页面就执行一次
      immediate: true,
      handler(newValue) {
        this.options[2].info = newValue
      }
    }
  },
  methods: {
    async getProductDetail() {
      const { message, meta } = await this.$http.get("goods/detail", {
        goods_id: this.pid
      })
      if (meta.status !== 200) {
        return this.$msg()
      }

      // 解决图片底部空白间隙: 使用 replace() 方法为 img 标签添加行内样式 display: block
      message.goods_introduce = message.goods_introduce.replace(
        /<img/gi,
        '<img style="display:block;"')
      message.goods_introduce = message.goods_introduce.replace(
        /<p>1/g,
        '<p>')
      this.info = message
    },
    // 实现轮播图的预览效果
    preview(index) {
      uni.previewImage({
        // 默认显示图片的索引
        current: index,

        // 图片地址
        urls: this.info.pics.map(pic => pic.pics_big),
      });
    },
    leftButtonClick(e) {
      console.log(e)
      if (e.index === 2) {
        uni.switchTab({
          url: '/pages/cart/cart'
        })
      }
    },
    rightButtonClick(e) {
      console.log(e)
      // 右侧按钮的点击事件处理函数

      // 1. 判断是否点击了按钮：加入购物车
      if (e.index === 0) {

        // 2. 组织一个商品信息对象
        const item = {
          goods_id: this.info.goods_id, // 商品的Id
          goods_name: this.info.goods_name, // 商品的名称
          goods_price: this.info.goods_price, // 商品的价格
          goods_count: 1, // 商品的数量
          goods_small_logo: this.info.goods_small_logo, // 商品的图片
          goods_state: false, // 商品的勾选状态
        }
        // 3. 调用 store 中的 mutations 把商品信息对象存储到购物车中
        this.$store.commit("cart/addToCart", item);

        // 可以简单log 测试一下
        console.log('仓库中的数据: ', this.$store.state.cart.cartItems)

      }

    }
  }
}
</script>

<style lang="scss" scoped>
.goods-detail-container {
  // 给页面外层的容器底部添加 100rpx 的 padding
  // 防止页面内容被底部商品导航组件遮盖
  padding-bottom: 100rpx;
}

.goods_nav {
  // 将工具栏固定在页面底部
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}

swiper {
  height: 750rpx;

  image {
    width: 100%;
    height: 100%;
  }
}

// 商品信息区域的样式
.goods-info-box {
  padding: 20rpx;
  padding-right: 0;

  .price {
    color: #c00000;
    font-size: 40rpx;
    margin: 20rpx 0;
  }

  .goods-info-body {
    display: flex;
    justify-content: space-between;

    .goods-name {
      font-size: 26rpx;
      padding-right: 20rpx;
    }

    // 收藏区域
    .favi {
      width: 240rpx;
      font-size: 24rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-left: 1rpx solid #efefef;
      color: gray;
    }
  }

  // 运费
  .yf {
    margin: 20rpx 0;
    font-size: 24rpx;
    color: gray;
  }
}
</style>