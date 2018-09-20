<template>
    <div class="app-wrapper" :class="{hideSidebar: !sidebar.opened}">
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
    computed: {
        sidebar () {
            return this.$store.state.app.sidebar
        }
    },
    components: {
        AppMain,
        SideBar,
        NavBar
    }
}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/mixin.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  .sidebar-container {
    -webkit-transition: width 0.28s;
    transition: width 0.28s;
    width: 180px !important;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
}
}
</style>
