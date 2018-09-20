<template>
    <div class="shop-container">
        <el-table highlight-current-row header-align="center" align=center :data="tableData" border style="width: 100%">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="shop_logo" label="店铺LOGO">
                <template slot-scope="scope">
                    <img style="width:80px;cursor:pointer" src=""/>
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
                <template slot-scope="scope"></template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data () {
        return {
            tableData: []
        }
    }
}
</script>
<style lang="scss" scoped>
.shop-container {
    padding: 30px;
}
</style>
