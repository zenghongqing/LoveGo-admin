<template>
    <div class="table-container" v-loading.fullscreen.lock="fullscreenLoading">
        <el-table highlight-current-row header-align="center" align="center" :data="tableData" border style="width: 100%">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="avatar" label="用户头像" width="100">
                <template slot-scope="scope">
                    <img style="width:80px;height:80px;cursor:pointer;" :src="scope.row.avatar"/>
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
                    <el-button @click="() => $router.push('/senior/editAdmin/'+scope.row.Id)" size="mini" type="default" v-if="scope.row.roles !== 'root'">编辑</el-button>
                    <el-button @click="authorizedAdmin(scope.row.Id)" v-if="scope.row.status==='未审核'" size="mini" type="primary" plain>审核</el-button>
                    <el-button @click="deleteAdmin(scope.row.Id)" v-if="scope.row.roles !== 'root'" size="mini" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { parseTime } from '@/utils'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth' // 验权
export default {
    data () {
        return {
            tableData: [],
            adminDialog: {// 图片预览
                dialogVisible: false,
                dialogImageUrl: ''
            },
            fullscreenLoading: false
        }
    },
    computed: {
        ...mapGetters([
            'adminData',
            'userData'
        ])
    },
    mounted () {
        this.initData()
    },
    methods: {
        /**
         * @description 触发设置显示列表管理员的数据
        */
        async updateData () {
            let adminData = await this.$store.dispatch('AdminList', {
                AdminToken: getToken()
            })
            if (adminData.msg) {
                return this.$message.error(adminData.msg)
            } else {
                return this.setData(adminData)
            }
        },
        /**
         * @description 设置列表显示所需的管理员数据
        */
        setData (resData) {
            this.tableData = []
            resData.data.length && resData.data.map(item => {
                switch (item.roles) {
                case 'admin':
                    item.rolesName = '普通管理员[admin]'
                    break
                case 'root':
                    item.rolesName = '超级管理员[root]'
                    break
                case 'test':
                    item.rolesName = '测试员[test]'
                    break
                default:
                    item.rolesName = '未知[null]'
                    break
                }
                this.tableData.push({
                    Id: item._id,
                    avatar: item.photo_url,
                    name: item.username,
                    phone: item.phone || '-',
                    roles: item.roles,
                    permissions: item.rolesName,
                    address: (item.province + item.city + item.area + item.address) || '-',
                    createTime: parseTime(item.create_date, '{y}-{m}-{d}'),
                    status: item.status === 1 ? '已审核' : '未审核'
                })
                this.fullscreenLoading = false
            })
        },
        /**
         * @description 初始化管理员总数据
        */
        initData () {
            this.fullscreenLoading = true
            if (!this.adminData) {
                return this.updateData()
            }
            this.setData(this.adminData)
        },
        /**
         * 审核管理员
        */
        authorizedAdmin (token) {
            this.fullscreenLoading = true
            this.$confirm('是否要审核该管理员(将获得对应的权限), 是否继续', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const formData = {
                    rootId: this.userData._id,
                    othersId: token,
                    status: 1
                }
                this.$store.dispatch('AuthorizedAdmin', formData).then(res => {
                    this.fullscreenLoading = false
                    this.updateData()
                }).catch(e => {
                    this.fullscreenLoading = false
                    console.log(e)
                })
            })
        },
        /**
         * 删除管理员账户
        */
        deleteAdmin (token) {
            this.fullscreenLoading = false
            this.$confirm('此操作将要删除该管理员账户的全部信息, 是否继续', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store.dispatch('DeleteAdmin', {
                    AdminToken: token
                }).then(res => {
                    this.fullscreenLoading = false
                    this.updateData()
                }).catch(e => {
                    console.log(e)
                    this.fullscreenLoading = false
                })
            })
        }
    }
}
</script>
