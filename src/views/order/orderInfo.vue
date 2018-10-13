<template>
    <div class="order-container" v-loading.fullscreen.lock="fullscreenLoading">
        <el-row type="flex" justify="center" align="center">
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <div class="title">订单信息</div>
                    <div class="cell">
                        订单号: {{orderData.orderInfo.orderNo || '无'}}
                    </div>
                    <div class="cell">
                        下单时间: {{orderData.orderInfo.createTime || ''}}
                    </div>
                    <div class="cell">
                        支付金额: ￥{{orderData.orderInfo.total_fee || 0}}
                    </div>
                    <div class="cell">
                        订单状态:
                        <font v-if="orderData.orderInfo.cancel_status === 1">[已取消]</font>
                        <font v-if="orderData.orderInfo.confirm_status === 0">[待确认]</font>
                        <font v-if="orderData.orderInfo.finish_status === 1">[已完成]</font>
                        <font v-if="orderData.orderInfo.pay_status === 1 && orderData.orderInfo.finish_status === 0">[已支付]</font>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <div class="title">用户信息</div>
                    <div class="cell">
                        用户标识: {{this.orderData.orderInfo.memberToken}}
                    </div>
                    <div class="cell">
                        下单地址: {{orderData.orderInfo.addressInfo.address}}
                    </div>
                    <div class="cell">
                        下单手机号: {{orderData.orderInfo.addressInfo.phone || 18073236512}}
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center" align="center" style="margin-top:50px;">
            <el-col :span="24">
                <div class="grid-content bg-purple">
                    <div class="title" style="border:none;">商品信息</div>
                    <el-table highlight-current-row header-align="center" align="center" :data="orderData.ProductList" border style="width:100%">
                        <el-table-column prop="image_url" label="商品图片" width="100">
                            <template slot-scope="scope">
                                <img style="width:80px;height:80px;cursor:pointer;" :src="scope.row.image_url" />
                            </template>
                        </el-table-column>
                        <el-table-column prop="productName" label="商品名称"></el-table-column>
                        <el-table-column prop="productNo" label="商品编号"></el-table-column>
                        <el-table-column prop="createTime" label="创建时间" sortable></el-table-column>
                        <el-table-column prop="categoryId" label="所属分类" sortable></el-table-column>
                        <el-table-column prop="counter" label="商品数量" sortable></el-table-column>
                        <el-table-column prop="price" label="商品单价" sortable></el-table-column>
                        <el-table-column prop="total" label="合计" sortable></el-table-column>
                    </el-table>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data () {
        return {
            orderData: {
                orderInfo: {
                    addressInfo: {}
                },
                ProductList: []
            },
            fullscreenLoading: false
        }
    },
    created () {
        this.initData()
    },
    methods: {
        initData () {
            if (!this.$route.params.id) {
                this.$message.error('订单编号有误')
                return
            }
            this.fullscreenLoading = true
            let newData = []
            this.$store.dispatch('GetOrder', {
                OrderNo: this.$route.params.id
            }).then(res => {
                this.fullscreenLoading = false
                this.orderData = res.data
                console.log(this.orderData.orderInfo, '11111')
                this.orderData.orderInfo.addressInfo.address = `${this.orderData.orderInfo.addressInfo.province}-${this.orderData.orderInfo.addressInfo.city}-${this.orderData.orderInfo.addressInfo.area}-${this.orderData.orderInfo.addressInfo.address}`
                this.orderData.ProductList.map(item => {
                    newData.push({
                        image_url: (item.image_url[0] && item.image_url[0].url) || '无',
                        productName: item.productName,
                        productNo: item.productNo || '无',
                        createTime: (item.product && item.product.createTime) || this.orderData.orderInfo.createTime,
                        categoryId: item.categoryId,
                        counter: item.counter || 1,
                        price: (item.product && item.product.price) || 6,
                        total: Math.abs((item.counter || 1) * ((item.product && item.product.price) || 6)).toFixed(2)
                    })
                })
                this.orderData.ProductList = newData
                console.log(this.orderData.ProductList, 'list')
            })
        }
    }
}
</script>
<!-- orderInfo -->
<style lang="scss" scoped>
  .order-container {
    padding: 35px;
    .title {
      padding: 15px 0;
      margin: 0 15px;
      clear: both;
      font-size: 20px;
      border-bottom: 1px solid #eee;
    }
    .cell {
      padding: 10px;
      font-size: 16px;
    }
}
</style>
