<template>
    <div class="orderList-container">
        <el-table highlight-current-row header-align="center" align="center" :data="tableData" border style="width: 100%">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column sortable prop="orderNo" label="订单号"></el-table-column>
            <el-table-column sortable prop="total_fee" label="下单金额"></el-table-column>
            <el-table-column sortable prop="createTime" label="下单时间"></el-table-column>
            <el-table-column sortable label="状态">
                <template slot-scope="scope">
                    <font v-if="scope.row.cancel_status === 1">[已取消]</font>
                    <font v-if="scope.row.confirm_status === 0">[待确认]</font>
                    <font v-if="scope.row.finish_status === 1">[已完成]</font>
                    <font v-if="scope.row.pay_status === 1 && scope.row.finish_status === 0">[已支付]</font>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="()=> $router.push('/order/orderInfo/'+scope.row.orderNo)" size="mini" type="default">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { parseTime } from '@/utils'
// import request from '@/utils/service'
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
            'orderListData'
        ])
    },
    mounted () {
        // 测试添加数据
        // let data = {
        //     orderInfo: {
        //         addressInfo: {
        //             province: '广东省',
        //             city: '深圳市',
        //             county: '南山区',
        //             address: '软件产业基地'
        //         },
        //         total_fee: 28.7,
        //         cancel_status: 0,
        //         confirm_status: 0,
        //         pay_status: 1,
        //         finish_status: 0,
        //         comment_status: 0
        //     },
        //     ProductList: [
        //         {
        //             productName: '豆腐皮麻辣',
        //             categoryId: 11,
        //             image_url: [],
        //             content: '这麻辣真不错，哈赤',
        //             summary: '童年的味道',
        //             price: 6,
        //             stocks: 100,
        //             shopId: 37373,
        //             status: 1
        //         }
        //     ]
        // }
        // request({
        //     url: '/api/CreateOrder',
        //     method: 'post',
        //     data: data
        // }).then(res => {
        //     console.log(res, 'createOrder')
        // })
        this.initData()
    },
    methods: {
        async initData () {
            if (!this.orderListData) {
                return this.updateData()
            }
            this.setData(this.orderListData)
        },
        async updateData () {
            let Data = await this.$store.dispatch('GetOrderList', this.dataParams)
            return this.setData(Data)
        },
        setData (res) {
            this.tableData = []
            res.data.data.map(item => {
                this.tableData.push({
                    Id: item.id,
                    orderNo: item.orderInfo.orderNo,
                    total_fee: item.orderInfo.total_fee || 0,
                    createTime: parseTime(item.orderInfo.createTime, '{y}-{m}-{d}'),
                    cancel_status: item.orderInfo.cancel_status,
                    confirm_status: item.orderInfo.confirm_status,
                    finish_status: item.orderInfo.finish_status,
                    pay_status: item.orderInfo.pay_status
                })
                console.log(item, '11')
            })
        }
    }
}
</script>
<style lang="scss" scoped>
  .orderList-container {
    padding: 10px;
  }
</style>
