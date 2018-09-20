<template>
    <div class="user-container">
        <el-table :data="tableData" border style="width: 100%;">
            <el-table-column
                prop="avatar"
                label="用户头像"
                width="100">
                <template slot-scope="scope">
                    <img style="width:80px;height:80px;" src=""/>
                </template>
            </el-table-column>
            <el-table-column
                prop="name"
                label="用户名"
                width="100">
            </el-table-column>
            <el-table-column
                prop="nickName"
                label="昵称">
            </el-table-column>
            <el-table-column
                prop="phone"
                label="手机">
            </el-table-column>
            <el-table-column
                prop="sex"
                label="性别">
            </el-table-column>
            <el-table-column
                prop="createTime"
                label="创建时间">
            </el-table-column>
            <el-table-column
                prop="validWalletAmount"
                label="账户余额">
            </el-table-column>
        </el-table>
        <el-pagination
        background
        :total="dataTotal"
        style="position: fixed;left:700px;bottom: 20px;"
        layout="prev, pager, next" :pageSize="100"></el-pagination>
    </div>
</template>
<script>
export default {
    data () {
        return {
            tableData: [],
            dataTotal: 10
        }
    }
}
</script>
<style lang="scss" scoped>
.user-container {
    padding: 15px;
}
</style>
