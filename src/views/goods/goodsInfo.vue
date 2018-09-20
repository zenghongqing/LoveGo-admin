<template>
    <div class="goods-container">
        <el-table highlight-current-row header-align="center" align=center :data="tableData" border style="width: 100%">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="image_url" label="商品图片" width="100">
                <template slot-scope="scope">
                    <img style="width:80px;height:80px;cursor:pointer;" src=""/>
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
                <el-button size="mini" type="default">编辑</el-button>
                <el-button size="mini" type="danger" plain>删除</el-button>
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
