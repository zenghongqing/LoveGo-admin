<template>
    <div class="edit-container" v-loading.fullscreen.lock="fullscreenLoading">
        <el-form :model="Form" ref="ruleForm" label-position="left" class="card-box admin-form">
            <el-form-item label="店铺Id" prop="id" label-width="120px">
                <el-input v-model="Form.id" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item :rules="[
            {required: true, message: '简介不能为空'}
            ]" label="店铺简介" prop="shop_summary" label-width="120px">
                <el-input v-model="Form.shop_summary"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="cms_content" label-width="120px">
                <vue-html5-editor style="margin: 30px 0;" :content="Form.cms_content" :auto-height="true" @change="updateData"></vue-html5-editor>
            </el-form-item>
            <el-form-item label="店铺Logo" prop="uploadLogo" label-width="120px">
                <el-upload action="/api/uploadfile" list-type="picture-card" ref="uploadLogo" :multiple="false" :limit="1"
                :file-list="uploadFile.uploadLogo" :on-success="successUploadLogo" :on-exceed="() => {$message.error('图片不能超过一张')}">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item id="uploadBanner" label="店铺轮播图" label-width="120px">
                <el-upload action="/api/uploadfile" list-type="picture-card" ref="uploadBanner" :multiple="true" :limit="5"
                :file-list="uploadFile.uploadBanner" :onSuccess="successUploadBanner" on-onExceed="() => {$message.error('图片不超过五张')}">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="商品列表" label-width="120px">
                <el-table highlight-current-row header-align="center" align="center" :data="Form.goods_list" border style="width:100%">
                    <el-table-column prop="image_url" label="商品图片" width="100">
                        <template slot-scope="scope">
                            <img style="width:80px;height: 80px;cursor:pointer" src="">
                        </template>
                    </el-table-column>
                    <el-table-column prop="productName" label="商品名称">
                    </el-table-column>
                    <el-table-column prop="productNo" label="商品编号">
                    </el-table-column>
                    <el-table-column prop="createTime" label="创建时间" sortable>
                    </el-table-column>
                    <el-table-column prop="categoryId" label="所属分类" sortable>
                    </el-table-column>
                    <el-table-column prop="price" label="商品单价" sortable>
                    </el-table-column>
                    <el-table-column prop="stocks" label="商品库存" sortable>
                    </el-table-column>
                </el-table>
                <el-button style="width:100%;" type="default" @click="$router.push({name:'addGoods',params:{shopId:$route.params.id}})">添加商品</el-button>
            </el-form-item>
            <el-form-item>
                <el-button style="width:100%;" type="primary" @click="editGoodsKill">修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { getToken } from '@/utils/auth' // 验权
export default {
    data () {
        return {
            fullscreenLoading: false,
            Form: {},
            uploadFile: {}
        }
    },
    mounted () {
        // 获取店铺id
        this.fullscreenLoading = true
        if (!this.$route.params.id) return this.$message.error('用户标识错误')
        const ShopId = this.$route.params.id
        this.fullscreenLoading = true
        this.$store.dispatch('GetShopInfo', {
            ShopId: ShopId
        }).then(res => {
            this.Form = res.data
            this.uploadFile.uploadLogo = res.data.shop_logo
            this.uploadFile.uploadBanner = res.data.cms_banner
            this.fullscreenLoading = false
            console.log(this.uploadFile)
        }).catch(e => {
            console.log(e)
            this.fullscreenLoading = false
        })
    },
    methods: {
        successUploadLogo (response, file, fileList) {
            this.uploadFile.uploadLogo = [{url: file.response.filePath}]
        },
        successUploadBanner (response, file, fileList) {
            let imgArr = []
            fileList.forEach(function (item) {
                if (item.response && item.response.filePath) {
                    imgArr.push({url: item.response.filePath})
                }
            })
            this.uploadFile.uploadBanner = imgArr
        },
        updateData (data) {
            this.Form.cms_content = data
        },
        editGoodsKill () {
            if (!this.Form.shop_name) return this.$message.error('请填写店铺名字')
            if (!this.Form.shop_summary) return this.$message.error('请填写店铺简介')
            this.fullscreenLoading = true
            const FormData = {
                Id: this.Form.id,
                shop_name: this.Form.shop_name,
                AdminToken: getToken(),
                category_info: this.Form.category_info,
                goods_list: this.Form.goods_list,
                cms_content: this.Form.cms_content,
                shop_summary: this.Form.shop_summary,
                shop_logo: this.uploadFile.uploadLogo,
                cms_banner: this.uploadFile.uploadBanner
            }
            this.$store.dispatch('EditShop', FormData).then(res => {
                this.$message.success('修改成功')
                this.$store.dispatch('GetShopList', {
                    pageIndex: 1,
                    pageSize: 100
                })
                setTimeout(() => {
                    this.$router.go(-1)
                }, 1000)
                this.fullscreenLoading = false
            }).catch(e => {
                this.fullscreenLoading = false
            })
        }
    }
}
</script>
<style lang="scss">
  .edit-container {
    padding: 15px;
    width: 100%;
  }

  #editor {
    min-height: 350px;
  }

  .is-checked {
    background: #f0f7ff !important;
  }
</style>
