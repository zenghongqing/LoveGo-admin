<template>
    <div class="goods-container">
        <el-table highlight-current-row header-align="center" align=center :data="tableData" border style="width: 100%">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="image_url" label="商品图片" width="100">
                <template slot-scope="scope">
                    <img style="width:80px;height:80px;cursor:pointer;" :src="scope.row.image_url"/>
                </template>
            </el-table-column>
            <el-table-column prop="productName" label="商品名称" width="220"></el-table-column>
            <el-table-column prop="price" label="商品价格" width="120"></el-table-column>
            <el-table-column prop="stocks" label="商品库存" width="80"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="120"></el-table-column>
            <el-table-column prop="categoryId" label="所属分类" width="80"></el-table-column>
            <el-table-column prop="shopId" label="所属店铺" width="80"></el-table-column>
            <el-table-column prop="status" label="状态" width="80"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="()=>$router.push('/goods/editGoods/'+scope.row.productNo)" size="mini" type="default">编辑</el-button>
                    <el-button @click="deleteGoods(scope.row.Id)" size="mini" type="danger" plain>删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
export default {
    data () {
        return {
            tableData: [],
            dataParams: {
                pageIndex: 1,
                pageSize: 100
            }
        }
    },
    computed: {
        ...mapGetters([
            'goodsDataList'
        ])
    },
    mounted () {
        this.initData()
    },
    methods: {
        initData () {
            this.fullscreenLoading = true
            if (!this.goodsListData) return this.updateData()
            this.setData(this.goodsListData)
        },
        async updateData () {
            let { data } = await this.$store.dispatch('GoodsList', this.dataParams)
            console.log(data)
            return this.setData(data)
        },
        setData (res) {
            this.tableData = []
            res.map(i => {
                let imgPath = ''
                if (i.image_url && i.image_url[0] && i.image_url[0].url) {
                    imgPath = i.image_url[0].url
                }
                this.tableData.push({
                    Id: i._id,
                    image_url: imgPath,
                    categoryId: i.categoryId,
                    summary: i.summary,
                    productNo: i.productNo,
                    productName: i.productName,
                    price: i.price,
                    stocks: i.stocks,
                    createTime: i.createTime,
                    status: i.status === 1 ? '上架中' : '已下架',
                    shopId: i.shopId
                })
            })
            this.fullscreenLoading = false
        },
        deleteGoods (Id) {
            this.$confirm('此操作将删除该商品的全部信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.fullscreenLoading = true
                this.$store.dispatch('DeleteGoods', {
                    Id: Id,
                    AdminToken: getToken()
                }).then((res) => {
                    this.$message.success('删除成功')
                    this.updateData()
                    this.fullscreenLoading = false
                }).catch(e => {
                    console.log(e)
                    this.fullscreenLoading = false
                })
            })
        }
    }
}
</script>
