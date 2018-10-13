<template>
    <el-menu class="navbar" mode="horizontal">
        <hamburger-component class="hamburger-container" :toggleClick="toggleSideBar" :isActive="!sidebar.opened"></hamburger-component>
        <bread-crumb-component></bread-crumb-component>
        <el-dropdown class="avatar-container" trigger="click">
            <div class="avatar-wrapper">
                <img class="user-avatar" :src="userData.photo_url">
                <i class="el-icon-caret-bottom"></i>
            </div>
            <el-dropdown-menu class="user-dropdown" slot="dropdown">
                <router-link class="inlineBlock" to="/">
                <el-dropdown-item  style="text-align:center;">
                    首页
                </el-dropdown-item>
                </router-link>
                <router-link class="inlineBlock" to="/">
                <el-dropdown-item divided style="text-align:center;">
                    个人信息
                </el-dropdown-item>
                </router-link>
                <el-dropdown-item divided>
                <span @click="logout" style="display:block;">退出登录</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </el-menu>
</template>
<script>
import HamburgerComponent from '@/components/Hamburger'
import BreadCrumbComponent from '@/components/Breadcrumb'
import { mapGetters } from 'vuex'
export default {
    data () {
        return {}
    },
    computed: {
        ...mapGetters([
            'sidebar',
            'userData'
        ])
    },
    components: {
        HamburgerComponent,
        BreadCrumbComponent
    },
    created () {
    },
    methods: {
        logout () {
            this.$store.dispatch('LogOut').then(() => {
                location.reload()
            })
        },
        toggleSideBar () {
            this.$store.dispatch('ToggleSideBar')
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    .hamburger-container {
        line-height: 58px;
        height: 50px;
        float: left;
        padding: 0 10px;
    }
    .screenfull {
        position: absolute;
        right: 90px;
        top: 16px;
        color: red;
    }
    .avatar-container {
        height: 50px;
        display: inline-block;
        position: absolute;
        right: 35px;
        .avatar-wrapper {
            cursor: pointer;
            margin-top: 5px;
            position: relative;
            .user-avatar {
                width: 40px;
                height: 40px;
                border-radius: 10px;
            }
            .el-icon-caret-bottom {
                position: absolute;
                right: -20px;
                top: 25px;
                font-size: 12px;
            }
        }
    }
}
</style>
