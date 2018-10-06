<template>
    <div class="edit-container" v-loading.fullscreen.lock="fullscreenLoading">
        <el-form :model="Form" ref="ruleForm" label-position="left" class="card-box admin-form">
            <el-form-item :rules="[
            {required: true, message: '商品名称不能为空'},
            {min: 5, message: '商品名称不能小于5位'}
            ]" label="商品名称" prop="productName" label-width="80px">
                <el-input v-model="Form.productName"></el-input>
            </el-form-item>
            <el-form-item :rules="[
            {required: true, message: '商品简介不能为空'},
            {min: 5, message: '商品简介不能小于5位'}
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
                <el-select v-model="Form.status" placeholder="请选择">
                    <el-option v-for="item in Form.GoodsStatus" :key="item.value" :label="item.label" :value="item.value">
                        <span style="float:left;">{{ item.label }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品目录" prop="content" label-width="80px">
                <div class="selectedCategory el-select" @click="()=>categoryData.dialogTreeVisible=true">
                    <div class="el-input el-input--suffix">
                        <input autocomplete="off" v-model="categoryData.defaultCategory.label" placeholder="请选择" size="" readonly="readonly" type="text"
                        rows="2" class="el-input__inner">
                        <span class="el-input__suffix">
                            <span class="el-input__suffix-inner">
                                <i class="el-select__caret el-input__icon el-icon-arrow-up"></i>
                            </span>
                        </span>
                    </div>
                    <div class="resize-triggers">
                        <div class="expand-trigger">
                            <div style="width:201px;height:42px;"></div>
                        </div>
                        <div class="contract-trigger"></div>
                    </div>
                </div>
                <el-dialog style="text-align:center;" title="商品根目录" :visible.sync="categoryData.dialogTreeVisible">
                    <el-tree ref="categoryTree" node-key="id" :default-expanded-keys="[1,2,3]" highlight-current :default-checked-keys="categoryData.defaultCategory.Id"
                    :data="categoryData.categoryTree" accordion @node-click="handleNodeClick"></el-tree>
                    <el-button style="width:100%;margin-top:30px;" type="primary" @click="()=> categoryData.dialogTreeVisible=false">确定</el-button>
                </el-dialog>
            </el-form-item>
            <el-form-item label="商品内容" prop="content" label-width="80px">
                <vue-html5-editor style="margin: 30px 0;" :content="Form.content" :auto-height="true" @change="updateData"></vue-html5-editor>
            </el-form-item>
            <el-form-item label="轮播图" prop="avatar" label-width="80px">
                <el-upload action="/api/uploadfile" list-type="picture-card" ref="uploadAvatar" :multiple="false" :limit="5"
                :file-list="uploadFile.uploadBanner" :on-success="successUploadBanner" :on-exceed="() => {$message.error('图片不能超过五张')}">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button style="width:100%;" type="primary" v-loading.fullscreen.lock="fullscreenLoading" @click="editGoods">修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { getToken } from '@/utils/auth'
export default {
    data () {
        return {
            fullscreenLoading: false,
            uploadFile: {
                dialogImageUrl: '',
                dialogVisible: false,
                uploadBanner: []
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
                    Id: [27786],
                    label: ''
                },
                dialogTreeVisible: false
            },
            Form: {
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
        async initData () {
            if (this.$route.params.Id) {
                return this.$message.error('商品Id有误')
            }
            this.fullscreenLoading = true
            this.$store.dispatch('GetProduct', {
                productNo: this.$route.params.id
            }).then(res => {
                console.log(res)
                this.fullscreenLoading = false
                this.Form.productName = res.data.productName
                this.Form.summary = res.data.summary
                this.Form.stocks = res.data.stocks
                this.Form.price = res.data.price
                this.Form.status = res.data.status
                this.Form.content = res.data.content
                this.uploadFile.uploadBanner = res.data.image_url
            }, err => { console.error(err) })
            let res = await this.$store.dispatch('GetAllCategory')
            const categoryData = res.data
            let List = []
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
        },
        handleNodeClick (data) {
            this.$refs.categorytree.setCheckedKeys([data.id])
            this.categoryData.defaultCategory.label = `${data.label}`
            this.categoryData.defaultCategory.Id = [data.id]
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
            this.Form.content = data
        },
        editGoods () {
            if (!this.Form.status) return this.$message.error('请选择商品状态')
            if (!this.uploadFile.uploadBanner || this.uploadFile.uploadBanner.length === 0) return this.$message.error('请至少上传一张商品轮播图')
            if (!this.Form.productName) return this.$message.error('请填写商品名称')
            if (!this.Form.summary) return this.$message.error('请填写商品详情')
            if (!this.Form.stocks) return this.$message.error('请填写商品库存')
            if (!this.Form.price) return this.$message.error('请填写商品价格')
            this.fullscreenLoading = true
            const FormData = {
                Id: this.$route.params.id,
                status: this.Form.status,
                AdminToken: getToken(),
                productName: this.Form.productName,
                categoryId: this.categoryData.defaultCategory.Id[0],
                summary: this.Form.summary,
                stocks: this.Form.stocks,
                price: this.Form.price,
                image_url: this.uploadFile.uploadBanner,
                content: this.Form.content
            }
            this.$store.dispatch('EditGoods', FormData).then(res => {
                this.fullscreenLoading = false
                this.$message.success('修改成功')
                this.$store.dispatch('GoodsList', {
                    pageIndex: 1,
                    pageSize: 10
                })
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
    width: 100%;
  }

  #editor {
    min-height: 350px;
  }

  .is-checked {
    background: #f0f7ff!important;
  }

</style>
