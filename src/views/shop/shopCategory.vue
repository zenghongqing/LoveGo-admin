<template>
    <div class="goodsCategory-container">
        <el-row type="flex" justify="left" align="center">
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-tree ref="categorytree" node-key="id" highlight-current :default-checked-keys="categoryData.defaultCategory.Id" :data="categoryData.categoryTree"
                    accordion @node-click="handleNodeClick"
                    :render-content="renderCategoryControl">
                    </el-tree>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="grid-content bg-purple-light">
                    <el-form :model="Form" ref="ruleForm" label-position="left" class="card-box admin-form">
                        <el-form-item label="节点Id" prop="id" label-width="80px">
                            <el-input :readonly="true" :disabled="true" v-model="Form.id"></el-input>
                        </el-form-item>
                        <el-form-item :rules="[
                            { required: true, message: '名称不能为空'}
                            ]" label="名称" prop="name" label-width="80px">
                            <el-input v-model="Form.name"></el-input>
                        </el-form-item>
                        <el-form-item :rules="[
                            { required: true, message: 'Id不能为空'}
                            ]" label="父节点Id" prop="parentId" label-width="80px">
                            <el-input v-model="Form.parentId"></el-input>
                        </el-form-item>
                        <el-form-item :rules="[
                            { required: true, message: '描述不能为空'}
                            ]" label="描述" prop="desc" label-width="80px">
                            <el-input v-model="Form.desc"></el-input>
                        </el-form-item>
                        <el-form-item id="uploadBanner" label="轮播图" label-width="120px">
                            <el-upload action="/api/uploadfile" list-type="picture-card" ref="uploadImages" :multiple="true" :limit="3"
                            :file-list="uploadFile.uploadBanner" :on-remove="successUploadBanner" :onSuccess="successUploadBanner" on-onExceed="() => {$message.error('图片不超过五张')}">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item>
                            <el-button style="width:100%;" v-loading.fullscreen.lock="fullscreenLoading" type="primary" @click="editCategory">修改</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data () {
        return {
            Form: {
                id: '',
                name: '',
                parentId: '',
                desc: ''
            },
            uploadFile: {
                dialogImageUrl: '',
                dialogVisible: false,
                uploadImageList: []
            },
            categoryData: { // 商品分类
                categoryTree: [],
                defaultCategory: {
                    Id: [],
                    label: ''
                },
                dialogTreeVisible: false
            },
            fullscreenLoading: false
        }
    },
    methods: {
        handleNodeClick () {},
        renderCategoryControl () {},
        successUploadBanner () {}
    }
}
</script>
