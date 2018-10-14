<template>
    <div class="goodsCategory-container" v-loading.fullscreen.lock="fullscreenLoading">
        <el-row type="flex" jusity="left" align="center">
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-tree ref="categoryTree" node-key="id" highlight-current :default-checked-keys="categoryData.defaultCategory.Id" :data="categoryData.categoryTree"
                    accordion @node-click="handleNodeClick"
                    :render-content="renderCategoryControl">
                    </el-tree>
                </div>
            </el-col>
            <el-col :span="10">
                <el-form :model="Form" ref="ruleForm" label-position="left" class="card-box admin-form">
                    <el-form-item label="节点Id" prop="id" label-width="80px">
                        <el-input :readonly="true" :disabled="true" v-model="Form.id"></el-input>
                    </el-form-item>
                    <el-form-item :rules="[
                    {required: true, message: '名称不能为空'}
                    ]" label="名称" prop="name" label-width="80px">
                        <el-input v-model="Form.name"></el-input>
                    </el-form-item>
                    <el-form-item :rules="[
                    {required: true, message: 'Id不能为空'}
                    ]" label="父节点Id" prop="parentId" label-width="80px">
                        <el-input v-model="Form.parentId"></el-input>
                    </el-form-item>
                    <el-form-item :rules="[
                    {required: true, message: '描述不能为空'}
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
                        <el-button style="width:100%;" type="primary" @click="editCategory">修改</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { getToken } from '@/utils/auth'
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            fullscreenLoading: false,
            Form: {
                id: '',
                name: '',
                parentId: ''
            },
            uploadFile: {
                dialogImageUrl: '',
                dialogVisible: false,
                uploadBnner: []
            },
            // 商品分类
            categoryData: {
                categoryTree: [],
                defaultCategory: {
                    Id: [1],
                    label: ''
                },
                dialogtreeVisible: false
            }
        }
    },
    computed: {
        ...mapGetters([
            'userData'
        ])
    },
    mounted () {
        this.initData()
    },
    methods: {
        async initData () {
            let res = await this.$store.dispatch('GetAllCategory')
            let List = []
            let categoryData = res.data
            // 如果返回的分类数据数组长度为0
            if (categoryData && categoryData.length === 0) {
                categoryData = {
                    label: this.userData.username,
                    parentId: 0,
                    desc: this.userData.username,
                    image_url: [],
                    children: []
                }
                await this.$store.dispatch('CreateCategory', categoryData)
                this.categoryData.defaultCategory.label = this.userData.username
                this.categoryData.categoryTree = [categoryData]
                List.push(categoryData)
                return
            }
            // 如果返回的分类数据返回的数组长度为1，且parentId不为0
            // if (categoryData.length === 0 && categoryData.parentId !== 0) {
            //     await this.$store.dispatch('DeleteCategory', {
            //         Id: categoryData[0].Id,
            //         AdminToken: getToken()
            //     })
            // }
            categoryData.map((item, index, array) => {
                if (item.Id === this.categoryData.defaultCategory.Id) {
                    this.categoryData.defaultCategory.label = `${item.name} [${item.Id}]`
                }
                if (item.parentId === 0) {
                    List.push({
                        label: item.name,
                        Id: item.Id,
                        parentId: item.parentId,
                        desc: item.desc,
                        img_url: item.image_url,
                        children: []
                    })
                }
            })
            List.map((item, index, array) => {
                categoryData.map((children1, index, array) => {
                    if (children1.parentId === item.Id) {
                        item.children.push({
                            label: children1.name,
                            Id: children1.Id,
                            parentId: children1.parentId,
                            desc: children1.desc,
                            img_url: children1.image_url,
                            children: []
                        })
                    }
                })
                item.children.map(children2 => {
                    categoryData.map((children3, index, array) => {
                        if (children3.parentId === children2.Id) {
                            children2.children.push({
                                label: children3.name,
                                parentId: children3.parentId,
                                Id: children3.Id,
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
            this.Form.id = data.Id
            this.Form.name = data.label
            this.Form.parentId = data.parentId
            this.Form.desc = data.label
            this.$refs.categoryTree.setCheckedKeys([data.id])
            this.categoryData.defaultCategory.label = `${data.label}  [${data.id}]`
            this.categoryData.defaultCategory.Id = [data.id]
        },
        renderCategoryControl (h, {node, data, store}) {
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
                console.log(data, 'data')
                this.fullscreenLoading = true
                this.$store.dispatch('CreateCategory', {
                    label: '新的节点',
                    parentId: data.Id,
                    image_url: [],
                    desc: '新的节点',
                    children: []
                }).then(res => {
                    this.fullscreenLoading = false
                    this.$message.success('添加成功')
                    this.initData()
                }, err => {
                    console.error(err)
                    this.fullscreenLoading = false
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
                this.$store.dispatch('DeleteCategory', {
                    Id: data.Id,
                    AdminToken: getToken()
                }).then((res) => {
                    this.fullscreenLoading = false
                    this.$message.success('删除成功')
                    this.initData()
                }, err => {
                    console.error(err)
                    this.fullscreenLoading = false
                })
            })
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
        editCategory () {
            this.fullscreenLoading = true
            const formData = {
                Id: this.Form.id,
                AdminToken: getToken(),
                name: this.Form.name,
                image_url: this.uploadFile.uploadBnner,
                parentId: this.Form.parentId,
                desc: this.Form.desc
            }
            this.$store.dispatch('EditCategory', formData).then(res => {
                this.fullscreenLoading = false
                this.$message.success('修改成功')
                this.initData()
            }, err => {
                console.error(err)
                this.fullscreenLoading = false
            })
        }
    }
}
</script>
