<template>
    <div class="shop-container" v-loading.fullscreen.lock="fullscreenLoading">
        <el-table highlight-current-row header-align="center" align=center :data="tableData" border style="width: 100%">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="shop_logo" label="店铺LOGO">
                <template slot-scope="scope">
                    <img style="width:80px;cursor:pointer" :src="scope.row.shop_logo"/>
                </template>
            </el-table-column>
            <el-table-column prop="id" label="店铺编号"></el-table-column>
            <el-table-column prop="shop_name" label="店铺名称"></el-table-column>
            <el-table-column prop="shop_summary" label="店铺简介"></el-table-column>
            <el-table-column prop="goods_total_num" label="上架商品数量"></el-table-column>
            <el-table-column prop="like_count" label="收藏人数"></el-table-column>
            <el-table-column prop="shop_score" label="店铺综合评分"></el-table-column>
            <el-table-column prop="shop_create_date" label="创建时间"></el-table-column>
            <el-table-column label="操作" width="300px">
                <template slot-scope="scope">
                    <el-button @click="()=>$router.push('/shop/shopCategory/'+scope.row.id)" size="mini" type="primary">分类管理</el-button>
                    <el-button @click="()=>$router.push('/goods/addGoods/'+scope.row.id)" size="mini" type="primary">添加商品</el-button>
                    <el-button @click="()=>$router.push('/shop/editShop/'+scope.row.id)" size="mini" type="default">编辑</el-button>
                    <el-button @click="deleteShop(scope.row.id)" size="mini" type="danger" plain>删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import { parseTime } from '@/utils'
export default {
    data () {
        return {
            tableData: [],
            fullscreenLoading: false,
            dataParams: {
                pageIndex: 1,
                pageSize: 100
            }
        }
    },
    computed: {
        ...mapGetters([
            'shopData'
        ])
    },
    mounted () {
        this.initData()
    },
    methods: {
        async updateData () {
            let data = await this.$store.dispatch('GetShopList', this.dataParams)
            return this.setData(data)
        },
        setData (res) {
            this.tableData = []
            this.fullscreenLoading = false
            if (res && res.data && res.data.data) {
                res.data.data.map(i => {
                    this.tableData.push({
                        id: i.id,
                        shop_logo: i.shop_logo[0].url,
                        goods_total_num: i.goods_total_num,
                        shop_summary: i.shop_summary,
                        like_count: i.like_count,
                        shop_name: i.shop_name,
                        shop_score: parseFloat((i.shop_score.service + i.shop_score.ship) / 3),
                        shop_create_date: parseTime(i.shop_create_date, '{y}-{m}-{d}')
                    })
                })
            }
        },
        initData () {
            this.fullscreenLoading = true
            if (!this.shopData) return this.updateData()
            this.setData(this.shopData)
        },
        /**
         * @description 删除该店铺
        */
        deleteShop (Id) {
            this.$confirm('此操作将删除该店铺的全部信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.fullscreenLoading = true
                this.$store.dispatch('DeleteShop', {
                    ShopId: Id,
                    AdminToken: getToken()
                }).then(res => {
                    this.updateData()
                    this.fullscreenLoading = false
                }, err => {
                    console.log(err)
                    this.fullscreenLoading = false
                })
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.shop-container {
    padding: 30px;
}
</style>
