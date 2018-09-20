<template>
    <div class="order-container">
        <el-row type="flex" justify="center" align="center">
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <div class="title">订单信息</div>
                    <div class="cell">
                        订单号: 12636364634
                    </div>
                    <div class="cell">
                        下单时间: 2018-09-16
                    </div>
                    <div class="cell">
                        支付金额: ￥233
                    </div>
                    <div class="cell">
                        订单状态:
                        <font>[已完成]</font>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <div class="title">用户信息</div>
                    <div class="cell">
                        用户标识: hdudu2223ehj
                    </div>
                    <div class="cell">
                        下单地址: 软件产业基地1栋B座
                    </div>
                    <div class="cell">
                        下单手机号: 18073236512
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
                                <img style="width:80px;height:80px;cursor:pointer;" src="" />
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
                ProductList: []
            }
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
