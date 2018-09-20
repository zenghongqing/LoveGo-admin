<template>
    <div class="orderList-container">
        <el-table highlight-current-row header-align="center" align="center" :data="tableData" border style="width: 100%">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column sortable prop="OrdertNo" label="订单号"></el-table-column>
            <el-table-column sortable prop="total_fee" label="下单金额"></el-table-column>
            <el-table-column sortable prop="createTime" label="下单时间"></el-table-column>
            <el-table-column sortable label="状态">
                <template slot-scope="scope">
                    <font>[已取消]</font>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="default">详情</el-button>
                </template>
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
