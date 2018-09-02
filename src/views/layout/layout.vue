<template>
    <div class="app-wrapper">
        <side-bar class="sidebar-container"></side-bar>
        <div class="main-container">
            <nav-bar></nav-bar>
            <app-main></app-main>
        </div>
    </div>
</template>
<script>
import { AppMain, SideBar, NavBar } from '@/views/layout/components'
export default {
    data () {
        return {}
    },
    components: {
        AppMain,
        SideBar,
        NavBar
    }
}
</script>
<style lang="scss" scoped>
// 侧边栏
  .sidebar-container {
    transition: width 0.28s;
    width: 180px!important;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    a {
      display: inline-block;
      width: 100%;
    }
    .svg-icon {
      margin-right: 16px;
    }
    .el-menu {
      border: none;
      width: 100%;
    }
  }
</style>

