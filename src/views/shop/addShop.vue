<template>
    <div class="edit-container">
        <el-form :model="Form" ref="ruleForm" label-position="left" class="card-box admin-form">
            <el-form-item :rules="[{required: true, message: '名称不能为空'}]" label="店铺名称" prop="shop_name" label-width="120px">
                <el-input v-model.trim="Form.shop_name"></el-input>
            </el-form-item>
            <el-form-item :rules="[{required: true, message: '简介不能为空'}]" label="店铺简介" prop="shop_summary" label-width="120px">
                <el-input v-model.trim="Form.shop_name"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="cms_content" label-width="120px">
                <vue-html5-editor style="margin: 30px 0;" :content="Form.cms_content" :auto-height="true" @change="content=>Form.newContent = content"></vue-html5-editor>
            </el-form-item>
            <el-form-item label="店铺Logo" id="uploadLogo" label-width="120px">
                <el-upload action="/" list-type="picture-card" ref="uploadLogo" :multiple="false" :limit="1"
                :file-list="uploadFile.uploadLogo" :autoUpload="false" :on-remove="(file, fileList) => {
                    this.uploadFile.uploadLogo = fileList
                }" :onPreview="handlePictureCardPreview" :onSuccess="(response, file, fileList) => {
                    this.uploadFile.uploadLogo = fileList
                }" :onExceed="() => {$message.error('图片不能超过一张')}">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item id="uploadBanner" label="店铺轮播图" label-width="120px">
                <el-upload action="/" list-type="picture-card" ref="uploadBanner" :multiple="true" :limit="5"
                :file-list="uploadFile.uploadBanner" :autoUpload="false" :on-remove="(file, fileList) => {
                    this.uploadFile.uploadBanner = fileList
                }" :onPreview="handlePictureCardPreview" :onSuccess="(response, file, fileList) => {
                    this.uploadFile.uploadBanner = fileList
                }" on-onExceed="() => {$message.error('图片不超过五张')}">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button style="width:100%;" type="primary" @click="editGoodsKill">添加</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data () {
        return {
            Form: {},
            uploadFile: {
                // cms_content: '111'
            }
        }
    },
    methods: {
        handlePictureCardPreview () {},
        editGoodsKill () {}
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
