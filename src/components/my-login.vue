<template>
    <view class="login-container">
        <!-- 提示登录的图标 -->
        <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>

        <!-- 登录按钮 -->
        <button type="primary" class="btn-login" @click="getUserInfoHandler">一键登录</button>

        <!-- 登录提示 -->
        <view class="tips-text">登录后尽享更多权益</view>
    </view>
</template>
<script>

// import { async } from '../../dist/dev/mp-weixin/common/vendor';
export default {
    methods: {
        async getUserInfoHandler() {
            // 获取真实的用户信息
            uni.login({
                provider: 'weixin', //使用微信登录
                //     "onlyAuthorize": true,
                success: (loginRes) => {
                    // console.log(code);

                    // 获取 Token
                    this.getToken(loginRes);
                    // uni.getUserInfo({
                    //     // desc: "获取用户基本信息用于登录",
                    //     success: (infoRes) => {
                    //         console.log(infoRes.userInfo);

                    //         const { userInfo } = infoRes

                    //         // 将用户信息更新到 Vuex
                    //         this.$store.commit("user/updateUserInfo", userInfo);

                    //         // 获取 Token
                    //         this.getToken(infoRes);
                    //     }
                    // })
                }
            })
        },
        async getToken(profile) {
            // const { code } = await uni.login({
            //     provider: 'weixin',
            // })
            // if (err) {
            //     return this.$msg('获取用户登录凭证失败')
            // }
            // console.log(res);
            const { code } = profile
            console.log(profile);



            const { message, meta } = await this.$http.post('/users/wxlogin', {
                code,
                encryptedData: 'signature',
                iv: 'iv',
                rawData: ' rawData',
                signature: 'signature',
            })


            // if (meta.status !== 200) return this.$msg()
            console.log(meta);
            console.log(message)

            // 将 token 更新到 vuex 中
            this.$store.commit("user/setToken", message.token);

        },
    }

}
</script>

<style lang="scss" scoped>
.login-container {
    // 登录盒子的样式
    // height: 1067rpx;
    height: 750rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // background-color: #f8f8f8;
    position: relative;
    overflow: hidden;

    // 绘制登录盒子底部的半椭圆造型
    // &::after {
    //     content: ' ';
    //     display: block;
    //     position: absolute;
    //     width: 100%;
    //     height: 80rpx;
    //     left: 0;
    //     bottom: 0;
    //     background-color: white;
    //     border-radius: 100%;
    //     transform: translateY(50%);
    // }

    // 登录按钮的样式
    .btn-login {
        width: 90%;
        border-radius: 200rpx;
        margin: 30rpx 0;
        background-color: #22a7f2;
    }

    // 按钮下方提示消息的样式
    .tips-text {
        font-size: 24rpx;
        color: gray;
    }
}
</style>