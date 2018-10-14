<template>
    <div class="user-container">
        <el-table :data="tableData" border style="width: 100%;">
            <el-table-column
                prop="avatar"
                label="用户头像"
                width="100">
                <template slot-scope="scope">
                    <img style="width:80px;height:80px;" :src="scope.row.photoUrl"/>
                </template>
            </el-table-column>
            <el-table-column
                prop="username"
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
import { parseTime } from '@/utils'
export default {
    data () {
        return {
            tableData: [],
            dataTotal: 10,
            dataParams: {
                pageIndex: 1,
                pageSize: 10
            }
        }
    },
    mounted () {
        this.initData()
    },
    methods: {
        initData () {
            this.$store.dispatch('GetUserList', this.dataParams).then(res => {
                let datas = res.data
                datas.forEach(item => {
                    if (!item.sex) {
                        item.sex = '无'
                    }
                    item.createTime = parseTime(item.createTime, '{y}-{m}-{d}')
                })
                this.tableData = datas
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.user-container {
    padding: 15px;
}
</style>
