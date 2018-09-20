<template>
    <div class="edit-container">
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
                <vue-html5-editor style="margin: 30px 0;" :content="Form.content" :auto-height="true" @change="content=>Form.newContent=content"></vue-html5-editor>
            </el-form-item>
            <el-form-item label="轮播图" prop="avatar" label-width="80px">
                <el-upload action="/" list-type="picture-card" ref="uploadImage" :multiple="true" :limit="5"
                :file-list="uploadFile.uploadImageList" :autoUpload="false"
                :on-remove="handleUploadRemove" :onPreview="handlePictureCardPreview"
                :onSuccess="handleUploadSuccess" :onExceed="()=>$message.error('商品轮播图不能超过五张')">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button style="width:100%;" type="primary" @click="editGoods">修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data () {
        return {
            uploadFile: {
                dialogImageUrl: '',
                dialogVisible: false,
                uploadImageList: []
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
    methods: {
        handleNodeClick () {},
        handleUploadRemove () {},
        handlePictureCardPreview () {},
        handleUploadSuccess () {},
        editGoods () {}
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
