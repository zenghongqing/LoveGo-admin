<template>
    <div>
        <el-menu mode="vertical" unique-opened background-color="#304156" text-color="#fff" active-text-color="#409EFF">
            <side-bar-item :routes="routes"></side-bar-item>
        </el-menu>
    </div>
</template>
<script>
import SideBarItem from './SideBarItem'
export default {
    data () {
        return {
        }
    },
    computed: {
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
