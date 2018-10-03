<template>
    <div class="edit-container" v-loading.fullscreen.lock="fullscreenLoading">
        <el-form :model="Form" ref="ruleForm" label-position="left" class="card-box admin-form">
            <el-form-item label="店铺Id" prop="shopId" label-width="80px" v-if="$route.params.shopId && $route.params.shopId !== ':shopId'">
                <el-input :disabled="true" v-model="Form.shopId"></el-input>
            </el-form-item>
            <el-form-item :rules="[
            {required: true, message: '商品名称不能为空'},
            {min: 5, message: '商品名称不能小于5位'}
            ]" label="商品名称" prop="productName" label-width="80px">
                <el-input v-model="Form.productName"></el-input>
            </el-form-item>
            <el-form-item :rules="[
            {required: true, message: '商品简介不能为空'},
            {min: 5, message: '商品名称不能小于5位'}
            ]" label="商品简介" prop="summary" label-width="80px">
                <el-input v-model="Form.summary"></el-input>
            </el-form-item>
            <el-form-item :rules="[
            {required: true, message: '商品库存不能为空'}
            ]" label="商品库存" prop="stocks" label-width="80px">
                <el-input v-model.number="Form.stocks"></el-input>
            </el-form-item>
            <el-form-item :rules="[
            {required: true, message: '商品价格不能为空'}
            ]" label="商品价格" prop="price" label-width="80px">
                <el-input v-model.number="Form.price"></el-input>
            </el-form-item>
            <el-form-item label="商品状态" prop="status" label-width="80px">
                <el-select @change="selectStatus" :value="Form.status" placeholder="请选择">
                    <el-option v-for="item in Form.GoodsStatus" :key="item.value" :label="item.label" :value="item.value">
                        <span style="float:left;">{{ item.label }}</span>
                        <span style="float:right;color:#8492a6;font-size:13px;">{{ item.value }}</span>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品目录" prop="content" label-width="80px">
                <div class="selectCategory el-select" @click="()=>categoryData.dialogTreeVisible=true">
                    <div class="el-input el-input--suffix">
                        <input autocomplete="off" v-model="categoryData.defaultCategory.label" placeholder="请选择" size="" readonly="readonly" type="text"
                        rows="2" class="el-input__inner">
                        <span class="el-input__suffix">
                            <span class="el-input__suffix-inner">
                                <i class="el-select__caret el-input__icon el-icon-arrow-up"></i>
                            </span>
                        </span>
                    </div>
                    <div class="resize-trigger">
                        <div class="expand-trigger">
                            <div style="width:201px;height:42px;"></div>
                        </div>
                        <div class="contract-trigger"></div>
                    </div>
                </div>
                <el-dialog style="text-align:left;" title="商品根目录" :visible.sync="categoryData.dialogTreeVisible">
                    <el-tree ref="categoryTree" node-key="id" :default-expanded-keys="[1,2,3]" highlight-current :default-checked-keys="categoryData.defaultCategory.Id"
                    :data="categoryData.categoryTree" accordion @node-click="handleNodeClick">
                    </el-tree>
                    <el-button style="width:100%;margin-top:30px;" type="primary" @click="() => categoryData.dialogTreeVisible=false">确定</el-button>
                </el-dialog>
            </el-form-item>
            <el-form-item label="商品内容" prop="content" label-with="80px">
                <vue-html5-editor style="margin: 30px 0;" :content="Form.content" :auto-height="true" @change="updateData"></vue-html5-editor>
            </el-form-item>
            <el-form-item id="uploadBanner" label="店铺轮播图" label-width="120px">
                <el-upload action="/api/uploadfile" list-type="picture-card" ref="uploadBanner" :multiple="true" :limit="5"
                :file-list="uploadFile.uploadBanner" :onSuccess="successUploadBanner" on-onExceed="() => {$message.error('图片不超过五张')}">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button style="width:100%;" type="primary" @click="addGoods">添加</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data () {
        return {
            fullscreenLoading: false,
            uploadFile: {
                // dialogImageUrl: '',
                // dialogVisible: false,
                // uploadBanner: []
            },
            categoryData: {// 商品分类
                categoryTree: [{
                    label: '一级 1',
                    children: [{
                        label: '二级 1-1',
                        children: [{
                            label: '三级 1-1-1'
                        }]
                    }]
                }],
                defaultCategory: {
                    Id: [1],
                    label: ''
                },
                dialogTreeVisible: false
            },
            Form: {
                shopId: '',
                productName: '',
                content: '',
                newContent: '',
                summary: '',
                stocks: '',
                price: '',
                imageUrl: '',
                status: '',
                GoodsStatus: [{
                    value: '1',
                    label: '上架中'
                }, {
                    value: '9',
                    label: '已下架'
                }]
            }
        }
    },
    mounted () {
        this.initData()
    },
    methods: {
        initData () {
            if (!this.$route.params.shopId) {
                this.Message({
                    message: '店铺id不能为空',
                    type: 'error',
                    duration: 2000
                })
                this.$router.go(-1)
            }
            this.Form.shopId = this.$route.params.shopId
            const categoryData = this.$store.dispatch('GetAllCategory')
            let List = []
            if (categoryData && categoryData.length) {
                categoryData.map((item, index, array) => {
                    if (item.Id === this.categoryData.defaultCategory.Id[0]) {
                        this.categoryData.defaultCategory.label = `${item.name} [${item.Id}]`
                    }
                    if (item.parentId === 0) {
                        List.push({
                            label: item.name,
                            id: item.Id,
                            parentId: item.parentId,
                            desc: item.desc,
                            img_url: item.image_url,
                            children: []
                        })
                    }
                })
                List.map((item, index, array) => {
                    categoryData.map((children1, index, array) => {
                        if (children1.parentId === item.id) {
                            item.children.push({
                                label: children1.name,
                                id: children1.Id,
                                parentId: children1.parentId,
                                desc: children1.desc,
                                img_url: children1.image_url,
                                children: []
                            })
                        }
                    })
                    item.children.map((children2, index, array) => {
                        categoryData.map((children3, index1, arr) => {
                            if (children2.id && children3.parentId && children2.id === children3.parentId) {
                                children2.children.push({
                                    id: children3.Id,
                                    label: children3.name,
                                    parentId: children3.parentId,
                                    img_url: children3.image_url,
                                    desc: children3.desc,
                                    children: []
                                })
                            }
                        })
                    })
                })
                this.categoryData.categoryTree = List
            }
        },
        handleNodeClick (data) {
            console.log(data, 'data')
            this.$refs.categoryTree.setCheckedKeys([data.id || ''])
            this.categoryData.defaultCategory.label = `${data.label}  ${data.id || ''}`
            this.categoryData.defaultCategory.Id = [data.id || '']
        },
        updateData (content) {
            this.Form.content = content
        },
        selectStatus (data) {
            this.Form.status = data
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
        addGoods () {
            if (!this.Form.status) return this.$message.error('请选择商品状态')
            if (this.uploadFile.uploadBanner && this.uploadFile.uploadBanner.length === 0) return this.$message.error('请至少上传一张商品轮播图')
            if (!this.Form.productName) return this.$message.error('请填写商品名称')
            if (!this.Form.summary) return this.$message.error('请填写商品详情')
            if (!this.Form.stocks) return this.$message.error('请填写商品库存')
            if (!this.Form.price) return this.$message.error('请填写商品价格')
            this.fullscreenLoading = true
            const FormData = {
                status: this.Form.status,
                productName: this.Form.productName,
                categoryId: this.categoryData.defaultCategory.Id[0],
                shopId: this.Form.shopId,
                image_url: this.uploadFile.uploadBanner,
                content: this.Form.content,
                summary: this.Form.summary,
                stocks: this.Form.stocks,
                price: this.Form.price
            }
            this.fullscreenLoading = true
            this.$store.dispatch('CreateGoods', FormData).then(res => {
                this.fullscreenLoading = false
                this.$message.success('添加成功')
                setTimeout(() => {
                    this.$router.go(-1)
                }, 1000)
            }, err => {
                console.log(err)
                this.fullscreenLoading = false
            })
        }
    }
}
</script>
<!-- 编辑商品 -->
<style lang="scss">
.edit-container {
    padding: 15px;
}
#editor {
    min-height: 350px;
}

.is-checked {
    background: #f0f7ff !important;
}
</style>
