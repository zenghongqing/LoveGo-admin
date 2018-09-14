<template>
    <div class="menu-wrapper">
        <template v-for="item in routes" v-if="!item.hidden && item.children">
            <!-- 主菜单 -->
            <router-link v-if="item.children.length === 1 && !item.children[0].children" :to="item.path + '/' +item.children[0].path" :key="item.children[0].name">
                <el-menu-item :index="item.path+'/'+item.children[0].path" class="submenu-title-noDropdown">
                    <svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon>
                    <span v-if="item.children[0].meta&&item.children[0].meta.title">{{ item.children[0].meta.title }}</span>
                </el-menu-item>
            </router-link>
            <!-- 拥有子菜单的主菜单 -->
            <el-submenu v-else :index="item.name||item.path" :key="item.name">
                <template slot="title">
                    <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
                    <span v-if="item.meta&&item.meta.title">{{ item.meta.title }}</span>
                </template>
                <template v-for="child in item.children" v-if="!child.hidden">
                    <!-- 对子子路由递归处理 -->
                    <side-bar-item class="nest-menu" v-if="child.children && child.children.length" :routes="[child]" :key="child.path"></side-bar-item>
                    <!-- 添加子菜单 -->
                    <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
                        <el-menu-item :index="item.path+'/'+child.path">
                            <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
                            <span v-if="child.meta&&child.meta.title">{{ child.meta.title }}</span>
                        </el-menu-item>
                    </router-link>
                </template>
            </el-submenu>
        </template>
    </div>
</template>
<script>
export default {
    data () {
        return {
            shopIco1: 'form'
        }
    },
    props: {
        routes: {
            type: Array,
            required: true
        }
    }
}
</script>
