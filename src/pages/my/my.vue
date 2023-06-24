<template>
    <view class="my-container">

        <!-- 没有 token 显示登录 -->
        <my-login v-if="!token"></my-login>

        <!-- 有 token 显示用户信息 -->
        <my-userinfo v-else></my-userinfo>

    </view>
</template>
<script>
import { mapState } from 'vuex'
import badge from "@/mixins/badge.js";
import MyLogin from "@/components/my-login.vue";
import MyUserinfo from "@/components/my-userinfo.vue";

export default {
    mixins: [badge],
    components: {
        MyLogin,
        MyUserinfo,
    },

    computed: {
        ...mapState('user', ['token']),
    },
};
</script>

<style lang="scss">
.my-container {
    height: 100%;
}
</style>