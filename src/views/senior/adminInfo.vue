<template>
    <div class="table-container">
        <el-table highlight-current-row header-align="center" align="center" :data="tableData" border style="width: 100%">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="avatar" label="用户头像" width="100">
                <template slot-scope="scope">
                    <img style="width:80px;height:80px;cursor:pointer;" src=""/>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="用户名" width="120"></el-table-column>
            <el-table-column prop="phone" label="手机" width="120"></el-table-column>
            <el-table-column prop="permissions" label="权限" width="120"></el-table-column>
            <el-table-column prop="address" label="地址" width="220"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="120"></el-table-column>
            <el-table-column prop="status" label="状态" width="80"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="default">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data () {
        return {
            tableData: [],
            adminDialog: {// 图片预览
                dialogVisible: false,
                dialogImageUrl: ''
            }
        }
    }
}
</script>
