<template>
    <div class="edit-container" v-loading.fullscreen.lock="fullscreenLoading">
        <el-form :model="Form" ref="ruleForm" label-position="left" class="card-box admin-form">
            <el-form-item :rules="[{required: true, message: '名称不能为空'}]" label="店铺名称" prop="shop_name" label-width="120px">
                <el-input v-model.trim="Form.shop_name"></el-input>
            </el-form-item>
            <el-form-item :rules="[{required: true, message: '简介不能为空'}]" label="店铺简介" prop="shop_summary" label-width="120px">
                <el-input v-model.trim="Form.shop_summary"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="cms_content" label-width="120px">
                <vue-html5-editor style="margin: 30px 0;" :content="Form.cms_content" :auto-height="true" @change="updateData"></vue-html5-editor>
            </el-form-item>
            <el-form-item label="店铺Logo" prop="uploadLogo" label-width="120px">
                <el-upload action="/api/uploadfile" list-type="picture-card" ref="uploadLogo" :multiple="false" :limit="1"
                :on-success="successUploadLogo" :on-exceed="() => {$message.error('图片不能超过一张')}">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item id="uploadBanner" label="店铺轮播图" label-width="120px">
                <el-upload action="/api/uploadfile" list-type="picture-card" ref="uploadBanner" :multiple="true" :limit="5"
                :file-list="uploadFile.uploadBanner" :on-remove="successUploadBanner" :onSuccess="successUploadBanner" on-onExceed="() => {$message.error('图片不超过五张')}">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button style="width:100%;" type="primary" @click="editGoodsKill" v-loading.fullscreen.lock="fullscreenLoading">添加</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data () {
        return {
            fullscreenLoading: false,
            Form: {},
            uploadFile: {
                // cms_content: '111'
            }
        }
    },
    methods: {
        successUploadLogo (response, file, fileList) {
            this.uploadFile.uploadLogo = file.response.filePath
        },
        successUploadBanner (response, file, fileList) {
            let imgArr = []
            fileList.forEach(function (item) {
                console.log(item.response, 'response')
                if (item.response && item.response.filePath) {
                    imgArr.push(item.response.filePath)
                }
            })
            console.log(fileList, imgArr, 'fileList')
            this.uploadFile.uploadBanner = imgArr
        },
        updateData (data) {
            this.Form.newContent = data
        },
        editGoodsKill () {
            if (!this.Form.shop_name) return this.$message.error('请填写店铺名字')
            if (!this.Form.shop_summary) return this.$message.error('请填写店铺简介')
            if (!this.uploadFile.uploadLogo) return this.$message.error('请上传店铺Logo')
            if (!this.uploadFile.uploadBanner) return this.$message.error('请上传店铺轮播图')
            this.fullscreenLoading = true
            const FormData = {
                shop_name: this.Form.shop_name,
                cms_content: this.Form.cms_content,
                shop_summary: this.Form.shop_summary,
                shop_logo: this.uploadFile.uploadLogo,
                cms_banner: this.uploadFile.uploadBanner
            }
            if (this.Form.newContent) {
                FormData.cms_content = this.Form.newContent
            }
            this.$store.dispatch('CreateShop', FormData).then(res => {
                this.fullscreenLoading = false
                this.$message.success('添加成功')
            })
        }
    }
}
</script>
<style lang="scss" scoped>
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
