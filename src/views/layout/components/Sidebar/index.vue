<template>
    <div>
        <el-menu mode="vertical" unique-opened :deault-active="$route.path" background-color="#304156" :collapse="isCollapse" text-color="#fff" active-text-color="#409EFF">
            <side-bar-item :routes="routes"></side-bar-item>
        </el-menu>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import SideBarItem from './SideBarItem'
export default {
    data () {
        return {
        }
    },
    computed: {
        ...mapGetters([
            'sidebar'
        ]),
        isCollapse () {
            return !this.sidebar.opened
        },
        routes () {
            return this.$router.options.routes
        }
    },
    components: {
        SideBarItem
    },
    created () {
        console.log(this.$router.options.routes)
    }
}
</script>
