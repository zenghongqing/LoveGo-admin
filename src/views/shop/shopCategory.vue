<template>
    <div class="goodsCategory-container" v-loading.fullscreen.lock="fullscreenLoading">
        <el-row type="flex" justify="left" align="center">
            <el-col :span="8">
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
import { getToken } from '@/utils/auth' // 验权
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
                uploadBanner: []
            },
            categoryData: { // 商品分类
                categoryTree: [],
                defaultCategory: {
                    Id: [1],
                    label: ''
                },
                dialogTreeVisible: false
            },
            fullscreenLoading: false
        }
    },
    mounted () {
        this.initData()
    },
    methods: {
        initData () {
            /**
             * @description 填充店铺表单信息，以及重组树形分类数据
            */
            if (!this.$route.params.id) return this.$message.error('Id有误')
            this.fullscreenLoading = true
            this.$store.dispatch('GetShopInfo', {
                ShopId: this.$route.params.id
            }).then(res => {
                this.fullscreenLoading = false
                let categoryData = res.data.category_info
                let List = []
                this.Form.id = res.data.id
                this.Form.name = res.data.shop_name
                this.Form.parentId = res.data.category_info[0].parentId
                this.Form.desc = res.data.shop_summary
                this.uploadFile.uploadBanner = res.data.cms_banner
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
            }, err => { console.log(err) })
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
        /**
         * @description 节点被点击时的回调
        */
        handleNodeClick (data) {
            console.log(data, 'data')
            this.Form.id = data.id
            this.Form.name = data.label
            this.Form.parentId = data.parentId
            this.Form.desc = data.desc
            this.uploadFile.uploadBanner = data.img_url
            // 通过 keys 设置目前勾选的节点，使用此方法必须设置 node-key 属性
            this.$refs.categorytree.setCheckedKeys([data.id])
            this.categoryData.defaultCategory.label = `${data.label}`
            this.categoryData.defaultCategory.Id = [data.id]
        },
        renderCategoryControl (h, { node, data, store }) {
            return (<span style="flex:1;display: flex;align-items:center;justify-content:space-between;font-size:14px;padding-right:8px;">
                <span>{node.label}</span>
                <span>
                    <el-button style="font-size: 12px;" type="text" on-click={ () => this.addCategoryTree(data) }>添加</el-button>
                    { data.parentId !== 0 ? <el-button style="font-size: 12px;" type="text" on-click={ () => this.removeCategoryTree(data) }>删除</el-button> : '' }
                </span>
            </span>)
        },
        addCategoryTree (data) {
            this.$confirm(`确认再${data.label} 节点下添加一个新节点吗？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.fullscreenLoading = true
                this.$store.dispatch('AddShopCategory', {
                    id: this.$route.params.id,
                    category_info: {
                        name: '新的节点',
                        parentId: data.id,
                        image_url: [],
                        desc: '新的节点'
                    }
                }).then(res => {
                    this.fullscreenLoading = false
                    this.$message.success('添加成功')
                    this.initData()
                })
            })
        },
        removeCategoryTree (data) {
            this.$confirm(`此操作将删除${data.label} 节点下的全部信息, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.fullscreenLoading = true
                this.$store.dispatch('DeleteShopCategory', {
                    Id: this.$route.params.id,
                    categoryId: data.id,
                    AdminToken: getToken()
                }).then(res => {
                    this.fullscreenLoading = false
                    this.$message.success('已删除')
                    this.initData()
                })
            })
        },
        /**
         * @description 编辑店铺分类
        */
        editCategory () {
            this.fullscreenLoading = true
            const formData = {
                id: this.$route.params.id,
                categoryId: this.Form.id,
                AdminToken: getToken(),
                category_info: {
                    Id: this.Form.id,
                    name: this.Form.name,
                    image_url: this.uploadFile.uploadBanner,
                    parentId: this.Form.parentId,
                    desc: this.Form.desc
                }
            }
            this.$store.dispatch('EditShopCategory', formData).then(res => {
                this.fullscreenLoading = false
                this.$message.success('修改成功')
                this.initData()
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .goodsCategory-container {
      padding: 15px;
    }
</style>
